import { AdminModulePage } from "@/components/admin/AdminModulePage";

export default function AdminSettingsPage() {
  return (
    <AdminModulePage
      routeLabel="Admin / Configurações"
      title="Configurações globais"
      description="Unificar branding, SEO, navegação, rodapé e preferências do sistema em uma entidade singleton."
      checklist={[
        "Criar SiteSettings como singleton.",
        "Persistir branding, SEO global e links sociais.",
        "Garantir que o site público leia essas preferências sem hardcode.",
      ]}
      nextStep="Usar esta entidade como base para navegação e metadados no site público."
    />
  );
}
