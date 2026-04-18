import { AdminModulePage } from "@/components/admin/AdminModulePage";

export default function AdminMediaPage() {
  return (
    <AdminModulePage
      routeLabel="Admin / Mídia"
      title="Biblioteca de mídia"
      description="Centralizar upload, metadados e relacionamento com conteúdo editorial em uma entidade própria."
      checklist={[
        "Criar MediaAsset com url, alt, mimeType, size, width e height.",
        "Conectar mídia a projetos, about e outros blocos editoriais.",
        "Definir provider de storage externo antes de popular o banco.",
      ]}
      nextStep="Separar mídia de conteúdo para evitar anexos improvisados no CRUD."
    />
  );
}
