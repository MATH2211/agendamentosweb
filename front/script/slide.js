//const { timeStamp } = require("console");
var diaHorarios = [];
const today = new Date();

let dayOfWeek = today.getDay();
// Array de dias da semana

let c = dayOfWeek;



/*
document.querySelectorAll('.time-slot').forEach(slot => {
    slot.addEventListener('click', () => {
        // Remove a classe 'active' de todas as divs
        document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('active'));
        
        // Adiciona a classe 'active' à div clicada
        slot.classList.add('active');
        updateHorario(checkDayAtivate());
    });
});
*/
/*
document.querySelectorAll('.time-slot').forEach(slot => {
    slot.addEventListener('click', () => {
        // Remove a classe 'active' de todas as divs
        document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('active'));
        
        // Adiciona a classe 'active' à div clicada
        slot.classList.add('active');
    });
});
*/

let diacontador = new Date().getDay();
let novaData = new Date();
let mes = data.getMonth();
spans[2].innerText = mes;
//console.log(mes);
[...semanaDiv.getElementsByClassName("slide")].forEach(el => {
    el.addEventListener("click", (s) => {
        [...semanaDiv.getElementsByClassName("slide")].forEach(s => {
            s.classList.remove('active');

        });
        el.classList.add("active");
        updateHorario(checkDayAtivate());
        appendHorarios(updateHorasDiv(el));

    });

    el.innerHTML = `<span>${days[diacontador]}</span> <hr> <span>${novaData.getDate()}</span>`;

    let text = `${new Date().getFullYear()}-${novaData.getMonth() + 1}-${novaData.getDate()}`;
    console.log("Texto: " + text);
    //diasObj.push(getHoras(text));
    armazenarHorarios(text);
    el.setAttribute("id", text);
    novaData.setDate(novaData.getDate() + 1);
    diacontador += 1;
});
[...semanaDiv.getElementsByClassName("slide")][0].classList.add("active");
//updateHorario(checkAtivate());

//const horarios = document.getElementsByClassName("time-slot");
function checkAtivate() {
    return [...document.getElementsByClassName("slider")[0].getElementsByClassName("slide")].filter(slide =>
        slide.classList.contains("active")
    );
}

function checkDayAtivate() {
    return [...semanaDiv.getElementsByClassName("slide")].find(d => d.classList.contains("active"));
}


function checkHorario() {
    //console.log(timeSlots);
    return [...document.querySelectorAll(".time-slot")].find(el => el.classList.contains("active"));
}

function getMaxDiaDoMes(ano, mes) {
    // Lembre-se: o mês é 0-indexado em JavaScript (0 para janeiro, 1 para fevereiro, etc.)
    return new Date(ano, mes, 0).getDate();
}

function updateHorario() {
    //console.log("updtate:"+dia);
    let dia = checkDayAtivate();
    console.log(dia);
    let text = checkDayAtivate().innerText;
    spans[0].innerText = text;
    let span1 = checkDayAtivate().querySelectorAll("span")[1].innerText;
    let stringSplit = dia.getAttribute("id").split("-")[1]
    spans[1].innerText = meses[parseInt(stringSplit) - 1];
    let ano = new Date(data.getFullYear());
    spans[2].innerText = data.getFullYear();
    if (checkHorario()) {

        spans[3].innerText = checkHorario().innerText;
    }
    //document.getElementsByClassName("grid-container")
    //console.log(meses.indexOf(spans[1].innerText))
}

function updateHorasDiv(el) {
    document.getElementsByClassName("grid-container")[0].innerHTML = "";
    //<div class="time-slot">08:00</div>
    let id = el.getAttribute("id");
    let listaAtualizada = diaHorarios.find(obj => obj.dia === id);
    return listaAtualizada;
}
function formatTime(input) {
    // Converte o input para string, caso não seja
    let str = String(input);
    // Verifica se a string tem o formato esperado
    if (str.length !== 4 || isNaN(str)) {
      return "Formato inválido";
    }
    return str.slice(0, 2) + ":" + str.slice(2);
}

  

function appendHorarios(lista) {
    let grid = document.getElementsByClassName("grid-container")[0];
    console.log(lista)

    for (const horario of lista.horarios) {
        //<div class="time-slot">08:00</div>
        let div = document.createElement("div");
        div.setAttribute("class", "time-slot");
        div.innerText = formatTime(horario.horas);
        grid.appendChild(div);
        console.log(horario.horas);
    }
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.addEventListener('click', () => {
            // Remove a classe 'active' de todas as divs
            document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('active'));

            // Adiciona a classe 'active' à div clicada
            slot.classList.add('active');
            updateHorario();
        });
    });
}


async function getHoras(dia, tentativas = 3) {
    try {
        const response = await fetch(`http://localhost:3000/api/horarios?dia=${dia}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Erro ao buscar horários disponíveis');
        }
        const data = await response.json();
        console.log("Horários disponíveis:", data);
        return data;
    } catch (error) {
        console.error("Erro:", error.message);
        if (tentativas > 0) {
            console.log(`Tentando novamente... (${4 - tentativas} de 3 tentativas restantes)`);
            await gerarHorarios(dia);
            return await getHoras(dia, tentativas - 1);
        } else {
            console.error("Número máximo de tentativas alcançado. Verifique a conexão ou o servidor.");
            throw error; // Repassa o erro após o limite de tentativas
        }
    }
}


// Declara diaHorarios no escopo global, para que esteja disponível em toda a função


async function armazenarHorarios(dia) {
    try {
        const horarios = await getHoras(dia);
        if (horarios) {
            diaHorarios.push({ "dia": dia, "horarios": horarios }); // Adiciona os horários disponíveis à lista
        }
        //console.log("Lista atual de horários:", diaHorarios);
    } catch (error) {
        console.log(false);
    }
}
async function gerarHorarios(dia) {
    try {
        const response = await fetch(`http://localhost:3000/api/gerarHorarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ dia }) // Passa o dia no corpo da requisição
        });

        if (!response.ok) {
            throw new Error('Erro ao gerar horários');
        }

        const result = await response.json();
        console.log(result.message); // Exibe mensagem de sucesso ao gerar horários
    } catch (error) {
        console.error("Erro ao gerar horários:", error);
    }
}

async function fetchServices() {
    try {
        const response = await fetch('http://localhost:3000/api/servicos', { // Substitua '/api/services' pelo endpoint correto
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            if (response.status === 404) {
                console.log("Nenhum serviço encontrado.");
            } else {
                console.log("Erro ao buscar serviços:", response.statusText);
            }
            return;
        }
        const services = await response.json();
        return services;
    } catch (error) {
        console.error("Erro ao consumir a API:", error);
    }
}

async function createUser(nome, input, email) {
    const data = {
        nome: nome,
        celular: input,
        email: email
    };
    try {
        const response = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Erro ao criar usuário');
        }

        const result = await response.json();
        console.log('Usuário criado com sucesso:', result);
        const clienteId = result.id; // Atualiza clienteId aqui
        return result; // Retorna os dados recebidos da resposta
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        return await putUser(nome, input, email); // Chama putUser e espera a resposta
    }
}

async function putUser(nome, celular, email) {
    const url = 'http://localhost:3000/api/users/cell';
    const data = {
        nome: nome,
        celular: celular,
        email: email
    };

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.statusText}`);
        }

        const dataResponse = await response.json();
        console.log('Resposta do servidor:', dataResponse);
        return dataResponse; // Retorna os dados de resposta para uso posterior
    } catch (error) {
        console.error('Erro ao fazer a requisição PUT:', error);
    }
}

async function postNewAgendamento(idcliente, idhorario, servicos) {
    const url = 'http://localhost:3000/api/agendamento';
    const data = {
        idcliente: idcliente,
        idhorario: idhorario,
        servicos: servicos // Servicos é tratado como uma string
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Erro ao criar agendamento: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Agendamento criado com sucesso:', result);
        return result;
    } catch (error) {
        console.error('Erro ao criar agendamento:', error);
    }
}

async function handleUserCreation(nome, input, email) {
    console.log("Celuluar: "+input)
    try {
        const result = await createUser(nome, input, email);

        if (result) {
            const clienteId = result.id;
            console.log("ID do cliente: " + clienteId);

            // Evita manipulação excessiva do DOM em loop
            let inputPut = document.querySelector(".input.put");
            if (inputPut) {
                inputPut.style.display = "none";
            }

            let userPut = document.querySelector(".user.put");
            if (userPut) {
                userPut.innerHTML = `<p class="name">${email} - ${input}</p>`;
                userPut.style.display = "flex";
            }

            let servicosPut = checkAtivate().map(el => el.getAttribute("id")).join("-");
            console.log(clienteId, horarioId);

            let servicosGet = document.querySelector(".name.getServices")?.innerText || "Serviço não especificado";
            let horariosGet = document.querySelector(".name.getHorario")?.innerText || "Horário não especificado";

            let final = document.querySelector(".bot.final");
            if (final) {
                final.innerHTML = `<p>Perfeito...</p><p id = "textEmail">Agendamento realizado: ${servicosGet}, ${horariosGet}. Local: Rua Beta, 1489, Bacuri</p><p>Muito obrigado, até mais!</p>`;
                let text = document.getElementById("textEmail").innerText;
                let email = document.getElementById("email").value;
                sendEmail(email,"barbearia black",text);
                final.style.display = "block";
            }

            // Certifique-se de que `horarioId` está definido corretamente
            if (clienteId && horarioId) {
                try {
                    let old = clienteId;
                    agendamentoId = await postNewAgendamento(clienteId, horarioId, servicosPut);
                    console.log("ID do agendamento criado:", agendamentoId);
                    displayAgendamentos(old);
                } catch (error) {
                    console.error("Erro ao criar agendamento:", error);
                }
            }
        }
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
    }
}


async function getAgendamentosById(idCliente) {
    const url = `http://localhost:3000/api/agendamentos/id/${idCliente}`
  //const url = `http://localhost:3000/agendamentos/id/${idCliente}`;
    
    try {
        const response = await fetch(url, {
            method: 'GET', // Método GET
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Erro ao buscar agendamentos para o cliente ${idCliente}`);
        }
        
        const data = await response.json(); // Supondo que a resposta seja um JSON
        console.log('Agendamentos:', data);
        return data; // Retorna os dados dos agendamentos
    } catch (error) {
        console.error('Erro:', error);
    }
}