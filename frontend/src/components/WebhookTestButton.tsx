import React from "react";

const WebhookTestButton: React.FC = () => {
  const enviarParaN8N = async () => {
    try {
      const response = await fetch(
        "fetch('http://localhost:5678/webhook/inserir-usuario', {\n",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usucodigo: 987654321,
            usunome: "Maria Oliveira",
            usunommae: "Ana Oliveira",
            usucpf: "987.654.321-00",
            usucns: "987654321012345",
            usuregger: "654321",
            usutelefo: "19999999988",
            usutelcel: "19988888888",
            usutelcon: "19977777777",
            usuinclus: "2025-05-26",
            usualtera: "2025-05-27",
          }),
        },
      );

      const data = await response.json();
      console.log("Resposta do n8n:", data);
    } catch (error) {
      console.error("Erro ao enviar para n8n:", error);
    }
  };

  return (
    <button
      onClick={enviarParaN8N}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Testar Webhook
    </button>
  );
};

export default WebhookTestButton;
