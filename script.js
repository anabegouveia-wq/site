document.addEventListener('DOMContentLoaded', function () {

    const slider = document.querySelector('.testimonials-slider');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentIndex = 0;
    const totalSlides = cards.length;
    const slideWidth = cards[0].clientWidth; // Largura de um slide

    // Função para mover para um slide específico
    function goToSlide(index) {
        if (index < 0) {
            index = totalSlides - 1;
        } else if (index >= totalSlides) {
            index = 0;
        }
        slider.style.transform = `translateX(-${index * slideWidth}px)`;
        currentIndex = index;
    }

    // Navegação pelo botão "Próximo"
    nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
        resetInterval(); // Reinicia o temporizador ao clicar
    });

    // Navegação pelo botão "Anterior"
    prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
        resetInterval(); // Reinicia o temporizador ao clicar
    });

    // Função para avançar o slide automaticamente
    let autoSlideInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000); // Muda a cada 5 segundos (5000 milissegundos)

    // Reinicia o intervalo do carrossel
    function resetInterval() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    }

    // Pausa o carrossel quando o mouse está sobre ele
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    // Retoma o carrossel quando o mouse sai
    slider.addEventListener('mouseleave', () => {
        resetInterval();
    });
    
    // Recalcula a largura do slide se a janela for redimensionada
    window.addEventListener('resize', () => {
        const newSlideWidth = cards[0].clientWidth;
        slider.style.transform = `translateX(-${currentIndex * newSlideWidth}px)`;
    });
});// JavaScript Document


