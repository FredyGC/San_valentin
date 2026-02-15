// Configuración - ¡CAMBIAR ESTA FECHA!
const LOVE_START_DATE = new Date("2022-01-30T00:00:00");
const SECRET_MESSAGE = "Tengo un proceso bioquímico en el hipotalamo debido a la segregación de dopamina";

// Elementos DOM
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const secretBtn = document.getElementById('secretBtn');
const secretModal = document.getElementById('secretModal');
const closeModal = document.querySelector('.close-modal');
const currentDateElement = document.getElementById('currentDate');
const secretMessageElement = document.getElementById('secretMessage');

// Actualizar contador de amor
function updateLoveCounter() {
    const now = new Date();
    const diff = now - LOVE_START_DATE;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // Aplicar animación si los números cambian
    animateNumberChange(daysElement, days);
    animateNumberChange(hoursElement, hours);
    animateNumberChange(minutesElement, minutes);
    animateNumberChange(secondsElement, seconds);
    
    // Formatear números con ceros a la izquierda
    daysElement.textContent = days.toString().padStart(3, '0');
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
}

// Animación para cambios de número
function animateNumberChange(element, newValue) {
    if (element.textContent !== newValue.toString()) {
        element.classList.add('changing');
        setTimeout(() => {
            element.classList.remove('changing');
        }, 300);
    }
}

// Actualizar fecha actual
function updateCurrentDate() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const dateString = now.toLocaleDateString('es-ES', options);
    currentDateElement.textContent = dateString;
}

// Crear corazones flotantes
function createFloatingHearts() {
    const heartsBackground = document.querySelector('.hearts-background');
    
    for (let i = 0; i < 100; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.fontSize = `${Math.random() * 20 + 15}px`;
        heart.style.opacity = Math.random() * 0.2 + 0.05;
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;
        heart.style.animation = `float ${Math.random() * 30 + 20}s infinite linear`;
        heart.style.animationDelay = `${Math.random() * 10}s`;
        
        heartsBackground.appendChild(heart);
    }
}

// Efecto de escritura para el mensaje secreto
function typeWriterEffect() {
    secretMessageElement.textContent = '';
    let i = 0;
    const speed = 30; // Velocidad en milisegundos
    
    function typeWriter() {
        if (i < SECRET_MESSAGE.length) {
            secretMessageElement.textContent += SECRET_MESSAGE.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    typeWriter();
}

// Mostrar modal con mensaje secreto
function showSecretModal() {
    secretModal.style.display = 'flex';
    typeWriterEffect();
    document.body.style.overflow = 'hidden';
}

// Cerrar modal
function closeSecretModal() {
    secretModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Efecto hover en memorias
function setupMemoryHover() {
    const memories = document.querySelectorAll('.memory');
    
    memories.forEach(memory => {
        memory.addEventListener('mouseenter', () => {
            const color = getComputedStyle(memory).getPropertyValue('--color');
            memory.style.boxShadow = `0 15px 40px ${color}80`;
        });
        
        memory.addEventListener('mouseleave', () => {
            memory.style.boxShadow = 'none';
        });
    });
}

// Click en memorias (abre modal como botón secreto)
function setupMemoryClick() {
    const memories = document.querySelectorAll('.memory');

    memories.forEach(memory => {
        memory.addEventListener('click', () => {
            const images = memory.dataset.images.split(',');
            const title = memory.dataset.title;
            const text = memory.dataset.text;

            let currentIndex = 0;

            function renderCarousel() {
                secretMessageElement.innerHTML = `
                    <h3 style="margin-bottom:15px;">${title}</h3>

                    <div class="carousel">
                        <button class="carousel-btn prev">❮</button>

                        <img src="${images[currentIndex]}" class="carousel-img">

                        <button class="carousel-btn next">❯</button>
                    </div>

                    <p style="font-size:1.2rem; margin-top:15px;">
                        ${text}
                    </p>

                    <small style="opacity:0.8;">
                        ${currentIndex + 1} / ${images.length}
                    </small>
                `;

                secretMessageElement.querySelector('.prev').onclick = () => {
                    currentIndex = (currentIndex - 1 + images.length) % images.length;
                    renderCarousel();
                };

                secretMessageElement.querySelector('.next').onclick = () => {
                    currentIndex = (currentIndex + 1) % images.length;
                    renderCarousel();
                };
            }

            secretModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';

            playHeartbeatSound();
            renderCarousel();
        });
    });
}



// Efecto de confeti al hacer clic en el botón secreto
function createConfetti() {
    const colors = ['#ff6b8b', '#6b5bff', '#ffa726', '#3ac569'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.innerHTML = '❤️';
        confetti.style.position = 'fixed';
        confetti.style.fontSize = `${Math.random() * 20 + 10}px`;
        confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.top = '-50px';
        confetti.style.zIndex = '1001';
        confetti.style.pointerEvents = 'none';
        
        document.body.appendChild(confetti);
        
        // Animación
        const animation = confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
        });
        
        // Eliminar después de la animación
        animation.onfinish = () => confetti.remove();
    }
}

// Reproducir sonido de corazón (opcional)
let heartbeatAudio;

function playHeartbeatSound() 
{
    if (!heartbeatAudio) {
        heartbeatAudio = new Audio('');
        heartbeatAudio.volume = 0.5;
    }

    heartbeatAudio.currentTime = 0;
    heartbeatAudio.play().catch(() => {
        console.log("🔇 Sonido bloqueado por el navegador");
    });
}

// Inicializar eventos  
function initEvents() {
    // Botón secreto
    secretBtn.addEventListener('click', () => {
        showSecretModal();
        createConfetti();
        
    });
    
    // Cerrar modal
    closeModal.addEventListener('click', closeSecretModal);
    
    // Cerrar modal al hacer clic fuera
    secretModal.addEventListener('click', (e) => {
        if (e.target === secretModal) {
            closeSecretModal();
        }
    });
    
    // Cerrar modal con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && secretModal.style.display === 'flex') {
            closeSecretModal();
        }
    });
}

// Inicializar la aplicación
function initApp() {
    updateLoveCounter();
    updateCurrentDate();
    createFloatingHearts();
    setupMemoryHover();
    setupMemoryClick();
    initEvents();
    
    // Actualizar contador cada segundo
    setInterval(updateLoveCounter, 1000);
    
    // Actualizar fecha cada minuto
    setInterval(updateCurrentDate, 60000);
    
    // Añadir estilos dinámicos para animación
    const style = document.createElement('style');
    style.textContent = `
        .changing {
            animation: numberChange 0.3s ease;
        }
        
        @keyframes numberChange {
            0% { transform: scale(1); }
            50% { transform: scale(1.3); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
    
    console.log("❤️ Página de San Valentín cargada con amor ❤️");
    console.log(`Amor desde: ${LOVE_START_DATE.toLocaleDateString()}`);
}

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', initApp);

// Mostrar mensaje de bienvenida en consola
console.log(`
╔══════════════════════════════════════╗
║       🎀 SAN VALENTÍN 🎀             ║
║     Página creada con amor           ║
╚══════════════════════════════════════╝
`);
