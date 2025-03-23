document.addEventListener('DOMContentLoaded', function() {
    // Удаляем класс preload для запуска анимаций после загрузки
    document.body.classList.remove('preload');
    
    // Показать/скрыть секцию с модами
    const showModsButton = document.getElementById('show-mods');
    const modsSection = document.getElementById('mods-section');
    const closeModsButton = document.getElementById('close-mods');
    const mainContent = document.querySelector('.main-content');
    
    // Анимация появления основного контента
    setTimeout(() => {
        mainContent.style.opacity = '1';
    }, 300);
    
    showModsButton.addEventListener('click', function(e) {
        e.preventDefault();
        modsSection.classList.add('active');
        mainContent.classList.add('hide');
        
        // Анимация появления карточек модов
        animateModCards();
    });
    
    closeModsButton.addEventListener('click', function() {
        modsSection.classList.remove('active');
        setTimeout(function() {
            mainContent.classList.remove('hide');
        }, 300);
    });
    
    // Обработка кликов на кликабельные карточки
    const clickableCards = document.querySelectorAll('.mod-card-clickable');
    
    clickableCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const href = this.getAttribute('data-href');
            
            // Не переходим по ссылке, если клик был на .mod-link или его дочерних элементах
            if (e.target.closest('.mod-link')) {
                return;
            }
            
            if (href) {
                window.open(href, '_blank');
            }
        });
        
        card.style.cursor = 'pointer';
    });
    
    // Анимация карточек модов при открытии секции
    function animateModCards() {
        const cards = document.querySelectorAll('.mod-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 + index * 100);
        });
    }
    
    // Аудио эффект для кнопок
    const clickSound = new Audio('assets/click.mp3');
    
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('click', () => {
            if (clickSound) {
                clickSound.currentTime = 0;
                clickSound.play().catch(e => {
                    console.log('Audio playback failed:', e);
                });
            }
        });
    });
}); 