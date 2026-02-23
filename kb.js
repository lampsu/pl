(function () {
    'use strict';

    // 1. Уведомление о том, что плагин вообще загрузился
    setTimeout(function() {
        Lampa.Noty.show('Плагин Kinobase загружен');
    }, 2000);

    function addKinobaseButton(container, data) {
        if (container.find('.view--kinobase').length > 0) return;

        var btn = $(`
            <div class="full-start__button selector view--kinobase" style="background: #e64a19 !important; color: #fff !important;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org" style="margin-right: 8px; vertical-align: middle;">
                    <path d="M10 16.5V7.5L16 12L10 16.5Z" fill="white"/>
                    <circle cx="12" cy="12" r="9" stroke="white" stroke-width="2"/>
                </svg>
                <span>Kinobase</span>
            </div>
        `);

        btn.on('hover:enter', function () {
            var movie = data.movie;
            var kp_id = movie.kinopoisk_id;
            var url = kp_id ? 'https://kinobase.org' + kp_id : 'https://kinobase.org' + encodeURIComponent(movie.title || movie.name);
            
            Lampa.Noty.show('Открываю Kinobase...');
            window.open(url, '_blank');
        });

        // Вставляем кнопку первой в список
        container.prepend(btn);
        
        // Принудительно обновляем навигацию Lampa
        Lampa.Controller.enable('full');
    }

    // 2. Универсальный слушатель через перехват событий Lampa
    Lampa.Listener.follow('full', function (e) {
        if (e.type == 'complite') {
            var iter = 0;
            // Пробуем найти контейнер несколько раз (интервал для отрисовки DOM)
            var timer = setInterval(function() {
                var container = e.container.find('.full-start__buttons, .full-buttons');
                if (container.length) {
                    addKinobaseButton(container, e.data);
                    clearInterval(timer);
                }
                if (iter > 20) clearInterval(timer); // Стоп через 2 сек
                iter++;
            }, 100);
        }
    });

})();
