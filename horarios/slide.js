const today = new Date();
let dayOfWeek = today.getDay();
// Array de dias da semana
const days = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
// Obtendo o nome do dia da semana
const dayName = days[dayOfWeek];




let c = dayOfWeek;
document.querySelectorAll('.slide').forEach(slide => {
    slide.innerText = days[c];
    c+= 1
    //if c > days.length
    
    slide.addEventListener('click', (event) => {
        console.log(event.target.innerText)
        // Remove a classe 'active' de todas as slides
        document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
        
        // Adiciona a classe 'active' apenas na slide clicada
        slide.classList.add('active');
    });
});

document.querySelectorAll('.time-slot').forEach(slot => {
    slot.addEventListener('click', () => {
        // Remove a classe 'active' de todas as divs
        document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('active'));
        
        // Adiciona a classe 'active' à div clicada
        slot.classList.add('active');
    });
});

