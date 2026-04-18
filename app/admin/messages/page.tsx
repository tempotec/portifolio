import { AdminModulePage } from "@/components/admin/AdminModulePage";

export default function AdminMessagesPage() {
  return (
    <AdminModulePage
      routeLabel="Admin / Mensagens"
      title="Inbox de mensagens"
      description="Painel para acompanhar os leads recebidos pelo contato e operar status interno."
      checklist={[
        "Criar ContactMessage com status new, read e archived.",
        "Permitir triagem interna sem apagar mensagens.",
        "Adicionar campos de resposta e follow-up quando houver necessidade real.",
      ]}
      nextStep="Implementar o formulário público somente depois do modelo de persistência estar definido."
    />
  );
}
