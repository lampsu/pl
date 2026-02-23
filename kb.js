(function () {
    'use strict';

    function startPlugin() {
        // Подписываемся на событие отрисовки карточки
        Lampa.Listener.follow('full', function (e) {
            if (e.type == 'complite') {
                var container = e.container.find('.full-start__buttons');
                
                // Если контейнер не найден (бывает в некоторых версиях), ищем альтернативный
                if (!container.length) container = e.container.find('.full-buttons');

                if (container.length && !container.find('.view--kinobase').length) {
                    var btn = $(`
                        <div class="full-start__button selector view--kinobase">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org">
                                <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" stroke-width="2"/>
                                <path d="M10 8L15 12L10 16V8Z" fill="white"/>
                            </svg>
                            <span>Kinobase</span>
                        </div>
                    `);

                    btn.on('hover:enter', function () {
                        var movie = e.data.movie;
                        var kp_id = movie.kinopoisk_id;
                        var title = movie.title || movie.name;

                        if (kp_id) {
                            // Самый надежный способ для Kinobase — переход по ID Кинопоиска
                            window.open('https://kinobase.org' + kp_id, '_blank');
                        } else {
                            window.open('https://kinobase.org' + encodeURIComponent(title), '_blank');
                        }
                    });

                    // Вставляем кнопку ПЕРЕД кнопкой "Трейлер" или в конец
                    var trailer = container.find('.view--trailer');
                    if (trailer.length) trailer.before(btn);
                    else container.append(btn);
                    
                    // Форсируем обновление навигации, чтобы кнопка стала активной
                    Lampa.Controller.enable('full');
                }
            }
        });
    }

    // Запуск
    if (window.appready) startPlugin();
    else Lampa.Listener.follow('app', function (e) {
        if (e.type == 'ready') startPlugin();
    });
})();
