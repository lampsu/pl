(function () {
    'use strict';

    function addKinobase() {
        // Проверяем, есть ли уже кнопка или контейнер
        const container = document.querySelector('.full-start__buttons, .full-buttons');
        if (container && !container.querySelector('.view--kinobase')) {
            const btn = document.createElement('div');
            btn.className = 'full-start__button selector view--kinobase';
            btn.style.cssText = 'background: #ff5722 !important; color: #fff !important; margin-right: 10px; padding: 10px 20px; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center;';
            btn.innerHTML = '<span>Kinobase</span>';

            btn.addEventListener('click', () => {
                const movie = Lampa.Activity.active().card;
                const url = movie.kinopoisk_id 
                    ? `https://kinobase.org{movie.kinopoisk_id}` 
                    : `https://kinobase.org{encodeURIComponent(movie.title || movie.name)}`;
                window.open(url, '_blank');
            });

            // Для работы пульта (hover:enter в Lampa)
            $(btn).on('hover:enter', () => {
                btn.click();
            });

            container.prepend(btn);
            if (window.Lampa && Lampa.Controller) Lampa.Controller.enable('full');
        }
    }

    // Запуск через MutationObserver (самый надежный метод 2026)
    const observer = new MutationObserver(() => {
        if (location.hash.includes('full')) {
            setTimeout(addKinobase, 500);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    
    console.log('Kinobase Plugin Loaded');
    setTimeout(() => { if(window.Lampa) Lampa.Noty.show('Kinobase плагин активен'); }, 2000);
})();
