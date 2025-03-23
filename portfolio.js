document.addEventListener('DOMContentLoaded', function() {
    // Эффект прилипающего хедера
    const header = document.querySelector('header');
    const observer = new IntersectionObserver(
        ([entry]) => {
            header.classList.toggle('scrolled', !entry.isIntersecting);
        },
        { threshold: 0, rootMargin: '-20px 0px 0px 0px' }
    );
    observer.observe(header);

    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Аудио эффект для кнопок
    const clickSound = new Audio('assets/click.mp3');
    clickSound.volume = 0.2;

    const buttons = document.querySelectorAll('a, .mod-card');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            clickSound.currentTime = 0;
            clickSound.play().catch(e => console.log('Аудио не загружено:', e));
        });
    });

    // Анимация появления элементов при прокрутке
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.mod-card, .section-title, .intro-text, .contact-link');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Начальное состояние для анимации
    document.querySelectorAll('.mod-card, .section-title, .intro-text, .contact-link').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Запуск анимации при загрузке и прокрутке
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('resize', animateOnScroll);
    
    // Запускаем анимацию после загрузки страницы
    setTimeout(animateOnScroll, 200);

    // Счетчик статистики для анимации
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // мс
        const stepTime = 50; // мс
        const totalSteps = duration / stepTime;
        const stepValue = target / totalSteps;
        let current = 0;
        
        const updateCounter = setInterval(() => {
            current += stepValue;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(updateCounter);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, stepTime);
    });

    // Эффект параллакса для фона
    window.addEventListener('mousemove', e => {
        const background = document.querySelector('.background');
        const moveX = (e.clientX - window.innerWidth / 2) * 0.005;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.005;
        
        background.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    // Визуальный эффект для карточек модов
    document.querySelectorAll('.mod-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const cards = document.querySelectorAll('.mod-card');
            cards.forEach(c => {
                if (c !== card) c.style.opacity = '0.5';
            });
        });
        
        card.addEventListener('mouseleave', () => {
            document.querySelectorAll('.mod-card').forEach(c => {
                c.style.opacity = '1';
            });
        });
    });
}); 