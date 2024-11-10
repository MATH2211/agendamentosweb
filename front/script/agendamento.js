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

document.getElementById('cellphone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2'); // Adiciona os parênteses e espaço após DDD
    value = value.replace(/(\d{5})(\d)/, '$1-$2'); // Adiciona o hífen após os primeiros 5 dígitos
    e.target.value = value;
});



let btns = document.querySelectorAll(".input.final button");

btns[0].addEventListener("click",(e) => {
    // Redireciona para o link desejado
    e.preventDefault();
    mainSection.style.display = 'none';
    agendamentosSection.style.display = 'block';
});


function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

// Função para exibir os agendamentos na tabela
function displayAgendamentos(id) {
    const tableBody = document.getElementById('agendamentos-list');
    tableBody.innerHTML = '';  // Limpa qualquer conteúdo anterior
    //let agendamentos = getAgendamentosById(id);
    getAgendamentosById(id)
        .then(agendamentos => {
            console.log(typeof agendamentos);

            // Verifica se agendamentos não é um array
            if (!Array.isArray(agendamentos)) {
                // Caso não seja um array, transforma em um array
                agendamentos = [agendamentos];
            }

            // Itera sobre o array de agendamentos
            agendamentos.forEach(agendamento => {
                const row = document.createElement('tr');

                // Cria as células da tabela
                const cellId = document.createElement('td');
                cellId.textContent = agendamento.id;
                console.log(cellId);
                row.appendChild(cellId);

                const cellNome = document.createElement('td');
                cellNome.textContent = agendamento.nome;
                row.appendChild(cellNome);

                const cellCelular = document.createElement('td');
                cellCelular.textContent = agendamento.celular;
                row.appendChild(cellCelular);

                const cellDia = document.createElement('td');
                cellDia.textContent = formatDate(agendamento.dia);
                row.appendChild(cellDia);

                const cellHoras = document.createElement('td');
                cellHoras.textContent = agendamento.horas;
                row.appendChild(cellHoras);

                const cellServico = document.createElement('td');
                cellServico.classList.add('servico');
                cellServico.textContent = agendamento.serviconome;
                row.appendChild(cellServico);

                // Adiciona a linha à tabela
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Erro ao obter agendamentos:', error);
        });
}

async function sendEmail(to,subject,text) {
    try {
      const response = await fetch('http://localhost:3000/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: to,
          subject: subject,
          text: text
        })
      });
  
      const data = await response.json();
      console.log('Resposta do servidor:', data);
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
    }
  }



