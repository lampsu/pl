(function () {
    'use strict';

    function init() {
        // Уведомление для проверки загрузки
        Lampa.Noty.show('Kinobase: Плагин активирован');

        // Функция вставки кнопки
        function inject() {
            var container = $('.full-start__buttons, .full-buttons');
            if (container.length && !container.find('.view--kinobase').length) {
                var movie = Lampa.Activity.active().card;
                if (!movie) return;

                var btn = $(`
                    <div class="full-start__button selector view--kinobase" style="background: #e64a19 !important; color: #fff !important; border-radius: 4px; margin-right: 10px; display: flex; align-items: center; padding: 0 15px;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org" style="margin-right: 8px;">
                            <path d="M10 16.5V7.5L16 12L10 16.5Z" fill="white"/>
                            <circle cx="12" cy="12" r="9" stroke="white" stroke-width="2"/>
                        </svg>
                        <span>Kinobase</span>
                    </div>
                `);

                btn.on('hover:enter', function () {
                    var kp = movie.kinopoisk_id || '';
                    var title = movie.title || movie.name;
                    var url = kp ? 'https://kinobase.org' + kp : 'https://kinobase.org' + encodeURIComponent(title);
                    
                    Lampa.Noty.show('Переход на Kinobase...');
                    window.open(url, '_blank');
                });

                container.prepend(btn);
                Lampa.Controller.enable('full');
            }
        }

        // Следим за изменениями на странице (самый надежный метод для браузера)
        var observer = new MutationObserver(function() {
            if (window.location.hash.indexOf('full') > -1) inject();
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    // Запуск с проверкой готовности Lampa
    if (window.Lampa) {
        init();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') init();
        });
    }
})();
