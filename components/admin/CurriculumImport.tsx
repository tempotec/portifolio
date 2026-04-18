"use client";

import { useRef, useState } from "react";

interface CurriculumImportProps {
  onImportSuccess?: () => void;
}

export function CurriculumImport({ onImportSuccess }: CurriculumImportProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);
  const [importType, setImportType] = useState<"json" | "csv">("json");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["application/json", "text/csv", "text/plain"];
      if (!validTypes.includes(file.type)) {
        setMessage({
          type: "error",
          text: "Por favor, escolha um arquivo JSON ou CSV válido.",
        });
        return;
      }
      setSelectedFile(file);
      setMessage(null);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setProfileImage(file);
      setMessage(null);
    }
  };

  const handleImport = async () => {
    if (!selectedFile) {
      setMessage({
        type: "error",
        text: "Por favor, selecione um arquivo para importar.",
      });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("importType", importType);

      if (profileImage) {
        formData.append("image_profileImage", profileImage);
      }

      const response = await fetch("/api/admin/curriculum/import", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao importar currículo");
      }

      const data = await response.json();

      setMessage({
        type: "success",
        text: data.message || "Currículo importado com sucesso!",
      });

      setSelectedFile(null);
      setProfileImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      setTimeout(() => {
        if (onImportSuccess) {
          onImportSuccess();
        }
        window.location.reload();
      }, 2000);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error instanceof Error ? error.message : "Erro ao importar currículo",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadTemplate = () => {
    const template = {
      fullName: "João da Silva",
      email: "joao@exemplo.com",
      phone: "+55 11 98765-4321",
      location: "São Paulo, SP",
      profileImageAlt: "Foto de perfil",
      professionalSummary:
        "Desenvolvedor full-stack com mais de 5 anos de experiência em desenvolvimento web.",
      nationalId: "123.456.789-00",
      linkedinUrl: "https://linkedin.com/in/joao",
      portfolioUrl: "https://joao.dev",
      githubUrl: "https://github.com/joao",
      status: "DRAFT",
      experiences: [
        {
          company: "Tech Company",
          position: "Senior Developer",
          description: "Lideranço de projetos de grande escala",
          startDate: "2020-01",
          endDate: null,
          isCurrent: true,
          skills: ["React", "TypeScript", "Node.js"],
        },
        {
          company: "Startup XYZ",
          position: "Full Stack Developer",
          description: "Desenvolvimento de aplicações web",
          startDate: "2018-06",
          endDate: "2019-12",
          isCurrent: false,
          skills: ["Vue.js", "Python", "PostgreSQL"],
        },
      ],
      educations: [
        {
          institution: "Universidade Federal",
          course: "Ciência da Computação",
          degree: "Bacharelado",
          area: "Tecnologia",
          startDate: "2014-01",
          endDate: "2018-12",
          isCurrent: false,
          description: "Formação em engenharia de software",
        },
      ],
      certifications: [
        {
          title: "AWS Solutions Architect",
          issuer: "Amazon",
          credentialUrl: "https://aws.amazon.com/verification",
          issueDate: "2021-05",
          expiryDate: "2024-05",
        },
      ],
      languages: [
        {
          name: "Português",
          proficiency: "Nativo",
        },
        {
          name: "Inglês",
          proficiency: "Fluente",
        },
      ],
    };

    const blob = new Blob([JSON.stringify(template, null, 2)], {
      type: "application/json",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "curriculum-template.json";
    link.click();
  };

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6">
      <h2 className="mb-6 text-lg font-semibold text-slate-900">
        📤 Importar Currículo
      </h2>

      <div className="space-y-6">
        {message && (
          <div
            className={`rounded-[20px] border px-6 py-4 text-sm ${
              message.type === "success"
                ? "border-green-200 bg-green-50 text-green-700"
                : message.type === "error"
                  ? "border-red-200 bg-red-50 text-red-700"
                  : "border-blue-200 bg-blue-50 text-blue-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="space-y-3">
          <p className="text-sm text-slate-600">
            Selecione o formato do arquivo e importe seus dados de currículo. Todos os campos serão preenchidos automaticamente.
          </p>

          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="importType"
                value="json"
                checked={importType === "json"}
                onChange={(e) => setImportType(e.target.value as "json" | "csv")}
                className="h-4 w-4"
              />
              <span className="text-sm text-slate-600">JSON</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="importType"
                value="csv"
                checked={importType === "csv"}
                onChange={(e) => setImportType(e.target.value as "json" | "csv")}
                className="h-4 w-4"
              />
              <span className="text-sm text-slate-600">CSV</span>
            </label>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="space-y-2 text-sm text-slate-600">
              <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">
                Arquivo de Currículo *
              </span>
              <div className="flex items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,.csv"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600 transition hover:border-cyan-400/50 hover:bg-cyan-50/30"
                >
                  Escolher arquivo
                </button>
                {selectedFile && (
                  <span className="text-sm text-green-600">✓ {selectedFile.name}</span>
                )}
              </div>
            </label>
          </div>

          <div>
            <label className="space-y-2 text-sm text-slate-600">
              <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">
                Foto de Perfil (Opcional)
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                  id="profileImageInput"
                />
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("profileImageInput")?.click()
                  }
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600 transition hover:border-cyan-400/50 hover:bg-cyan-50/30"
                >
                  Escolher imagem
                </button>
                {profileImage && (
                  <span className="text-sm text-green-600">✓ {profileImage.name}</span>
                )}
              </div>
            </label>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={downloadTemplate}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-3 text-sm font-medium text-slate-600 transition hover:border-cyan-400/50 hover:bg-cyan-50/30"
          >
            📄 Baixar Template
          </button>
          <button
            type="button"
            onClick={handleImport}
            disabled={loading || !selectedFile}
            className="rounded-2xl border border-cyan-400/50 bg-cyan-50 px-6 py-3 text-sm font-medium text-cyan-700 transition hover:bg-cyan-100 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-400"
          >
            {loading ? "Importando..." : "Importar Currículo"}
          </button>
        </div>

        <div className="rounded-[20px] border border-blue-200 bg-blue-50 p-4">
          <p className="text-xs text-blue-700">
            <strong>💡 Dica:</strong> Clique no botão "Baixar Template" para obter um arquivo de exemplo com a estrutura correta.
            Preencha os dados e importe para popular seu currículo automaticamente.
          </p>
        </div>
      </div>
    </div>
  );
}
