"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@localhost");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Falha no login.");
      }

      router.push("/admin");
      router.refresh();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Falha no login.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-sky-100 to-blue-100 border border-sky-200">
            <span className="text-2xl font-bold text-sky-700">RG</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-[-0.06em] text-slate-900">
              Renan Gomes
            </h1>
            <p className="text-sm text-slate-500">
              Editorial Admin
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
        >
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-[-0.05em] text-slate-900">
              Acesso administrativo
            </h2>
            <p className="text-sm leading-6 text-slate-600">
              Use suas credenciais para acessar o painel editorial.
            </p>
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none ring-0 transition placeholder:text-slate-400 focus:border-sky-300 focus:shadow-[0_0_0_4px_rgba(14,165,233,0.12)]"
              placeholder="admin@localhost"
              required
              disabled={loading}
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none ring-0 transition placeholder:text-slate-400 focus:border-sky-300 focus:shadow-[0_0_0_4px_rgba(14,165,233,0.12)]"
              placeholder="••••••••"
              required
              disabled={loading}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          {/* Info Box */}
          <div className="rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-4 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
              Informações de acesso
            </p>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex gap-2">
                <span className="inline-block w-1 h-1 rounded-full bg-sky-600 mt-1.5 flex-shrink-0" />
                <span>Banco de dados local em SQLite</span>
              </li>
              <li className="flex gap-2">
                <span className="inline-block w-1 h-1 rounded-full bg-sky-600 mt-1.5 flex-shrink-0" />
                <span>Sessão protegida com token JWT</span>
              </li>
              <li className="flex gap-2">
                <span className="inline-block w-1 h-1 rounded-full bg-sky-600 mt-1.5 flex-shrink-0" />
                <span>Todas as rotas admin requerem autenticação</span>
              </li>
            </ul>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center space-y-3">
          <p className="text-sm text-slate-500">
            Voltar para{" "}
            <Link
              href="/"
              className="font-medium text-sky-600 transition hover:text-sky-700 hover:underline"
            >
              portfólio público
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
