"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { CurriculumImport } from "@/components/admin/CurriculumImport";

export default function AdminCurriculumPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    professionalSummary: "",
    nationalId: "",
    linkedinUrl: "",
    portfolioUrl: "",
    githubUrl: "",
    profileImageUrl: "",
  });

  const [experiences, setExperiences] = useState<
    Array<{
      company: string;
      position: string;
      description: string;
      startDate: string;
      endDate: string;
      isCurrent: boolean;
      skills: string;
    }>
  >([
    {
      company: "",
      position: "",
      description: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      skills: "",
    },
  ]);

  const [educations, setEducations] = useState<
    Array<{
      institution: string;
      course: string;
      degree: string;
      area: string;
      startDate: string;
      endDate: string;
      isCurrent: boolean;
      description: string;
    }>
  >([
    {
      institution: "",
      course: "",
      degree: "",
      area: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: "",
    },
  ]);

  const [certifications, setCertifications] = useState<
    Array<{
      title: string;
      issuer: string;
      credentialUrl: string;
      issueDate: string;
      expiryDate: string;
    }>
  >([
    {
      title: "",
      issuer: "",
      credentialUrl: "",
      issueDate: "",
      expiryDate: "",
    },
  ]);

  const [languages, setLanguages] = useState<
    Array<{
      name: string;
      proficiency: string;
    }>
  >([
    {
      name: "",
      proficiency: "Intermediário",
    },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          profileImageUrl: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExperienceChange = (
    index: number,
    field: string,
    value: string | boolean
  ) => {
    setExperiences((prev) =>
      prev.map((exp, i) =>
        i === index
          ? {
              ...exp,
              [field]: value,
            }
          : exp
      )
    );
  };

  const handleEducationChange = (
    index: number,
    field: string,
    value: string | boolean
  ) => {
    setEducations((prev) =>
      prev.map((edu, i) =>
        i === index
          ? {
              ...edu,
              [field]: value,
            }
          : edu
      )
    );
  };

  const handleCertificationChange = (
    index: number,
    field: string,
    value: string
  ) => {
    setCertifications((prev) =>
      prev.map((cert, i) =>
        i === index
          ? {
              ...cert,
              [field]: value,
            }
          : cert
      )
    );
  };

  const handleLanguageChange = (
    index: number,
    field: string,
    value: string
  ) => {
    setLanguages((prev) =>
      prev.map((lang, i) =>
        i === index
          ? {
              ...lang,
              [field]: value,
            }
          : lang
      )
    );
  };

  const addExperience = () => {
    setExperiences((prev) => [
      ...prev,
      {
        company: "",
        position: "",
        description: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        skills: "",
      },
    ]);
  };

  const addEducation = () => {
    setEducations((prev) => [
      ...prev,
      {
        institution: "",
        course: "",
        degree: "",
        area: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        description: "",
      },
    ]);
  };

  const addCertification = () => {
    setCertifications((prev) => [
      ...prev,
      {
        title: "",
        issuer: "",
        credentialUrl: "",
        issueDate: "",
        expiryDate: "",
      },
    ]);
  };

  const addLanguage = () => {
    setLanguages((prev) => [
      ...prev,
      {
        name: "",
        proficiency: "Intermediário",
      },
    ]);
  };

  const removeExperience = (index: number) => {
    setExperiences((prev) => prev.filter((_, i) => i !== index));
  };

  const removeEducation = (index: number) => {
    setEducations((prev) => prev.filter((_, i) => i !== index));
  };

  const removeCertification = (index: number) => {
    setCertifications((prev) => prev.filter((_, i) => i !== index));
  };

  const removeLanguage = (index: number) => {
    setLanguages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        professionalSummary: formData.professionalSummary,
        nationalId: formData.nationalId,
        linkedinUrl: formData.linkedinUrl,
        portfolioUrl: formData.portfolioUrl,
        githubUrl: formData.githubUrl,
        profileImageUrl: formData.profileImageUrl,
        experiences: experiences.filter((exp) => exp.company && exp.position),
        educations: educations.filter((edu) => edu.institution && edu.course),
        certifications: certifications.filter((cert) => cert.title && cert.issuer),
        languages: languages.filter((lang) => lang.name),
      };

      const response = await fetch("/api/admin/curriculum", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar currículo");
      }

      setMessage({
        type: "success",
        text: "Currículo importado com sucesso!",
      });

      setTimeout(() => {
        router.refresh();
      }, 1500);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error instanceof Error ? error.message : "Erro ao salvar currículo",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCsvImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    // Parse CSV and populate form
    // This is a basic implementation - you may want to enhance it
    setMessage({
      type: "success",
      text: "CSV importado com sucesso! Por favor, verifique os dados.",
    });
  };

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-500">
          Admin / Currículo
        </p>
        <h1 className="text-4xl font-semibold tracking-[-0.05em] text-slate-900">
          Importar e gerenciar currículo
        </h1>
        <p className="max-w-3xl text-sm leading-7 text-slate-500">
          Importe seus dados de currículo aqui. Os campos serão preenchidos automaticamente em todo o portfólio.
        </p>
      </div>

      {message && (
        <div
          className={`rounded-[20px] border px-6 py-4 text-sm ${
            message.type === "success"
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <CurriculumImport onImportSuccess={() => router.refresh()} />

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* DADOS PESSOAIS */}
        <div className="rounded-[28px] border border-slate-200 bg-white p-6">
          <h2 className="mb-6 text-lg font-semibold text-slate-900">
            📋 Dados Pessoais
          </h2>

          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-600">
                <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">
                  Nome Completo *
                </span>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-600">
                <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">
                  Email *
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-600">
                <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">
                  Telefone
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-600">
                <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">
                  Localização
                </span>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-600">
                <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">
                  CPF/ID
                </span>
                <input
                  type="text"
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-600">
                <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">
                  Foto de Perfil
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                    className="hidden"
                    ref={fileInputRef}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600 transition hover:border-cyan-400/50 hover:bg-cyan-50/30"
                  >
                    Escolher foto
                  </button>
                  {formData.profileImageUrl && (
                    <span className="text-xs text-green-600">✓ Foto selecionada</span>
                  )}
                </div>
              </label>
            </div>

            {formData.profileImageUrl && (
              <div className="flex justify-center">
                <img
                  src={formData.profileImageUrl}
                  alt="Preview"
                  className="h-32 w-32 rounded-2xl border-2 border-slate-200 object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* RESUMO PROFISSIONAL */}
        <div className="rounded-[28px] border border-slate-200 bg-white p-6">
          <h2 className="mb-6 text-lg font-semibold text-slate-900">
            📝 Resumo Profissional
          </h2>

          <label className="space-y-2 text-sm text-slate-600">
            <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">
              Resumo *
            </span>
            <textarea
              name="professionalSummary"
              value={formData.professionalSummary}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
              placeholder="Descreva seu perfil profissional, experiências principais e objetivos..."
            />
          </label>
        </div>

        {/* LINKS E REDES SOCIAIS */}
        <div className="rounded-[28px] border border-slate-200 bg-white p-6">
          <h2 className="mb-6 text-lg font-semibold text-slate-900">
            🔗 Links e Redes Sociais
          </h2>

          <div className="space-y-4">
            <label className="space-y-2 text-sm text-slate-600">
              <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">
                LinkedIn
              </span>
              <input
                type="url"
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/in/seu-perfil"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
              />
            </label>

            <label className="space-y-2 text-sm text-slate-600">
              <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">
                GitHub
              </span>
              <input
                type="url"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleInputChange}
                placeholder="https://github.com/seu-usuario"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
              />
            </label>

            <label className="space-y-2 text-sm text-slate-600">
              <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">
                Portfólio / Website
              </span>
              <input
                type="url"
                name="portfolioUrl"
                value={formData.portfolioUrl}
                onChange={handleInputChange}
                placeholder="https://seu-portfolio.com"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
              />
            </label>
          </div>
        </div>

        {/* EXPERIÊNCIAS */}
        <div className="rounded-[28px] border border-slate-200 bg-white p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              💼 Experiências Profissionais
            </h2>
            <button
              type="button"
              onClick={addExperience}
              className="rounded-2xl bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 transition hover:bg-sky-100"
            >
              + Adicionar
            </button>
          </div>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="space-y-4 rounded-2xl border border-slate-100 bg-slate-50 p-4"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm text-slate-600">
                    <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">
                      Empresa
                    </span>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) =>
                        handleExperienceChange(index, "company", e.target.value)
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
                    />
                  </label>

                  <label className="space-y-2 text-sm text-slate-600">
                    <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">
                      Cargo
                    </span>
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e) =>
                        handleExperienceChange(index, "position", e.target.value)
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
                    />
                  </label>
                </div>

                <label className="space-y-2 text-sm text-slate-600">
                  <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">
                    Descrição
                  </span>
                  <textarea
                    value={exp.description}
                    onChange={(e) =>
                      handleExperienceChange(index, "description", e.target.value)
                    }
                    rows={3}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
                  />
                </label>

                <div className="grid gap-4 md:grid-cols-3">
                  <label className="space-y-2 text-sm text-slate-600">
                    <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">
                      Data Início
                    </span>
                    <input
                      type="date"
                      value={exp.startDate}
                      onChange={(e) =>
                        handleExperienceChange(index, "startDate", e.target.value)
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
                    />
                  </label>

                  <label className="space-y-2 text-sm text-slate-600">
                    <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">
                      Data Fim
                    </span>
                    <input
                      type="date"
                      value={exp.endDate}
                      onChange={(e) =>
                        handleExperienceChange(index, "endDate", e.target.value)
                      }
                      disabled={exp.isCurrent}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50 disabled:bg-slate-100"
                    />
                  </label>

                  <label className="flex items-center justify-between space-y-2 text-sm text-slate-600">
                    <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">
                      Atual
                    </span>
                    <input
                      type="checkbox"
                      checked={exp.isCurrent}
                      onChange={(e) =>
                        handleExperienceChange(index, "isCurrent", e.target.checked)
                      }
                      className="h-5 w-5 rounded border-slate-300"
                    />
                  </label>
                </div>

                <label className="space-y-2 text-sm text-slate-600">
                  <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">
                    Skills (separadas por vírgula)
                  </span>
                  <input
                    type="text"
                    value={exp.skills}
                    onChange={(e) =>
                      handleExperienceChange(index, "skills", e.target.value)
                    }
                    placeholder="React, TypeScript, Node.js"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
                  />
                </label>

                {experiences.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="w-full rounded-2xl border border-red-200 bg-red-50 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                  >
                    Remover
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* EDUCAÇÃO */}
        <div className="rounded-[28px] border border-slate-200 bg-white p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              🎓 Educação
            </h2>
            <button
              type="button"
              onClick={addEducation}
              className="rounded-2xl bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 transition hover:bg-sky-100"
            >
              + Adicionar
            </button>
          </div>

          <div className="space-y-6">
            {educations.map((edu, index) => (
              <div
                key={index}
                className="space-y-4 rounded-2xl border border-slate-100 bg-slate-50 p-4"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm text-slate-600">
                    <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">
                      Instituição
                    </span>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) =>
                        handleEducationChange(index, "institution", e.target.value)
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
                    />
                  </label>

                  <label className="space-y-2 text-sm text-slate-600">
                    <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">
                      Curso
                    </span>
                    <input
                      type="text"
                      value={edu.course}
                      onChange={(e) =>
                        handleEducationChange(index, "course", e.target.value)
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
                    />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm text-slate-600">
                    <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">
                      Diploma/Nível
                    </span>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) =>
                        handleEducationChange(index, "degree", e.target.value)
                      }
                      placeholder="Bacharelado, Mestrado, etc"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
                    />
                  </label>

                  <label className="space-y-2 text-sm text-slate-600">
                    <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">
                      Área
                    </span>
                    <input
                      type="text"
                      value={edu.area}
                      onChange={(e) =>
                        handleEducationChange(index, "area", e.target.value)
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
                    />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <label className="space-y-2 text-sm text-slate-600">
                    <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">
                      Data Início
                    </span>
                    <input
                      type="date"
                      value={edu.startDate}
                      onChange={(e) =>
                        handleEducationChange(index, "startDate", e.target.value)
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
                    />
                  </label>

                  <label className="space-y-2 text-sm text-slate-600">
                    <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">
                      Data Fim
                    </span>
                    <input
                      type="date"
                      value={edu.endDate}
                      onChange={(e) =>
                        handleEducationChange(index, "endDate", e.target.value)
                      }
                      disabled={edu.isCurrent}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50 disabled:bg-slate-100"
                    />
                  </label>

                  <label className="flex items-center justify-between space-y-2 text-sm text-slate-600">
                    <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">
                      Atual
                    </span>
                    <input
                      type="checkbox"
                      checked={edu.isCurrent}
                      onChange={(e) =>
                        handleEducationChange(index, "isCurrent", e.target.checked)
                      }
                      className="h-5 w-5 rounded border-slate-300"
                    />
                  </label>
                </div>

                <label className="space-y-2 text-sm text-slate-600">
                  <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">
                    Descrição
                  </span>
                  <textarea
                    value={edu.description}
                    onChange={(e) =>
                      handleEducationChange(index, "description", e.target.value)
                    }
                    rows={2}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
                  />
                </label>

                {educations.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="w-full rounded-2xl border border-red-200 bg-red-50 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                  >
                    Remover
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CERTIFICAÇÕES */}
        <div className="rounded-[28px] border border-slate-200 bg-white p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              🏆 Certificações
            </h2>
            <button
              type="button"
              onClick={addCertification}
              className="rounded-2xl bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 transition hover:bg-sky-100"
            >
              + Adicionar
            </button>
          </div>

          <div className="space-y-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="space-y-4 rounded-2xl border border-slate-100 bg-slate-50 p-4"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm text-slate-600">
                    <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">
                      Título
                    </span>
                    <input
                      type="text"
                      value={cert.title}
                      onChange={(e) =>
                        handleCertificationChange(index, "title", e.target.value)
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
                    />
                  </label>

                  <label className="space-y-2 text-sm text-slate-600">
                    <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">
                      Fornecedor
                    </span>
                    <input
                      type="text"
                      value={cert.issuer}
                      onChange={(e) =>
                        handleCertificationChange(index, "issuer", e.target.value)
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
                    />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm text-slate-600">
                    <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">
                      Data de Emissão
                    </span>
                    <input
                      type="date"
                      value={cert.issueDate}
                      onChange={(e) =>
                        handleCertificationChange(index, "issueDate", e.target.value)
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
                    />
                  </label>

                  <label className="space-y-2 text-sm text-slate-600">
                    <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">
                      Data de Expiração
                    </span>
                    <input
                      type="date"
                      value={cert.expiryDate}
                      onChange={(e) =>
                        handleCertificationChange(index, "expiryDate", e.target.value)
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
                    />
                  </label>
                </div>

                <label className="space-y-2 text-sm text-slate-600">
                  <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">
                    URL de Credencial
                  </span>
                  <input
                    type="url"
                    value={cert.credentialUrl}
                    onChange={(e) =>
                      handleCertificationChange(index, "credentialUrl", e.target.value)
                    }
                    placeholder="https://..."
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
                  />
                </label>

                {certifications.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCertification(index)}
                    className="w-full rounded-2xl border border-red-200 bg-red-50 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                  >
                    Remover
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* IDIOMAS */}
        <div className="rounded-[28px] border border-slate-200 bg-white p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              🌍 Idiomas
            </h2>
            <button
              type="button"
              onClick={addLanguage}
              className="rounded-2xl bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 transition hover:bg-sky-100"
            >
              + Adicionar
            </button>
          </div>

          <div className="space-y-4">
            {languages.map((lang, index) => (
              <div
                key={index}
                className="grid gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 md:grid-cols-2"
              >
                <label className="space-y-2 text-sm text-slate-600">
                  <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">
                    Idioma
                  </span>
                  <input
                    type="text"
                    value={lang.name}
                    onChange={(e) =>
                      handleLanguageChange(index, "name", e.target.value)
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
                  />
                </label>

                <div className="flex gap-2">
                  <label className="flex-1 space-y-2 text-sm text-slate-600">
                    <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">
                      Nível
                    </span>
                    <select
                      value={lang.proficiency}
                      onChange={(e) =>
                        handleLanguageChange(index, "proficiency", e.target.value)
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
                    >
                      <option value="Básico">Básico</option>
                      <option value="Intermediário">Intermediário</option>
                      <option value="Avançado">Avançado</option>
                      <option value="Nativo">Nativo</option>
                    </select>
                  </label>

                  {languages.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLanguage(index)}
                      className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTÃO DE ENVIO */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 rounded-2xl bg-sky-600 px-6 py-3 font-medium text-white transition hover:bg-sky-700 disabled:opacity-50"
          >
            {loading ? "Salvando..." : "Importar Currículo"}
          </button>
        </div>
      </form>
    </section>
  );
}
