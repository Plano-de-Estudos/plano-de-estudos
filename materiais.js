// 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

// Função para enviar uma solicitação para a API do ChatGPT
async function sendChatRequest() {
    const apiKey = 'SUA_CHAVE_DE_API'; // Substitua pela sua chave de API real
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const prompt = 'Oi, GPT-3! Como você está hoje?';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'system', content: 'Você é um assistente de bate-papo.' }, { role: 'user', content: prompt }],
            }),
        });

        const data = await response.json();
        const reply = data.choices[0].message.content;
        displayChat(reply);
    } catch (error) {
        console.error('Erro ao enviar a solicitação:', error);
    }
}

// Função para exibir a resposta no site
function displayChat(message) {
    const chatContainer = document.getElementById('chat-container');
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    chatContainer.appendChild(messageDiv);
}

// Chame a função para enviar a solicitação ao carregar a página
sendChatRequest();