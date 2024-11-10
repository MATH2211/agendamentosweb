// Seleciona os elementos
const mainSection = document.querySelector('.main');
const agendamentosSection = document.querySelector('.agendamentos');
const linkAgendamentos = document.querySelector('.link-agendamentos');
const linkMain = document.querySelector('.link-main');

// Função para mostrar a seção de agendamentos e esconder a main
linkAgendamentos.addEventListener('click', (e) => {
    e.preventDefault();
    mainSection.style.display = 'none';
    agendamentosSection.style.display = 'block';
});

// Função para voltar para a seção main e esconder agendamentos
linkMain.addEventListener('click', (e) => {
    e.preventDefault();
    agendamentosSection.style.display = 'none';
    mainSection.style.display = 'block';
});


// Função assíncrona para enviar a requisição com fetch
const enviarAgendamento = async () => {
    const agendamentoData = {
        idcliente: 12,
        idhorario: 696,
        servicos: '18'
    };

    try {
        // Realizando a requisição POST com fetch
        const response = await fetch('http://localhost:3000/api/agendamento', {
            method: 'POST', // O método HTTP será POST
            headers: {
                'Content-Type': 'application/json' // Cabeçalho indicando que estamos enviando um JSON
            },
            body: JSON.stringify(agendamentoData) // Convertendo o objeto para string JSON
        });

        // Verificando se a resposta foi bem-sucedida (status 2xx)
        if (response.ok) {
            const data = await response.json(); // Extraindo o corpo da resposta como JSON
            console.log('Agendamento criado com sucesso:', data);
        } else {
            console.error('Erro ao criar o agendamento:', response.statusText);
        }
    } catch (error) {
        // Capturando erros de rede ou outros erros
        console.error('Erro na requisição:', error);
    }
};

// Chamada da função para enviar o agendamento
enviarAgendamento();

