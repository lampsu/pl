(function () {
    'use strict';

    function startPlugin() {
        // Следим за открытием карточки фильма
        Lampa.Listener.follow('full', function (e) {
            if (e.type == 'complite') {
                var container = e.container.find('.full-start__buttons');
                
                // Проверяем, не добавлена ли уже кнопка
                if (container.find('.view--kinobase').length > 0) return;

                // Создаем кнопку
                var btn = $(`
                    <div class="full-start__button selector view--kinobase">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org" style="margin-right: 10px;">
                            <path d="M10 16.5V7.5L16 12L10 16.5Z" fill="currentColor"/>
                            <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
                        </svg>
                        <span>Kinobase</span>
                    </div>
                `);

                // Логика нажатия
                btn.on('hover:enter', function () {
                    var movie = e.data.movie;
                    var query = encodeURIComponent(movie.title || movie.name);
                    var kp_id = movie.kinopoisk_id || '';
                    
                    // Формируем ссылку (Kinobase обычно поддерживает поиск по KP ID в URL)
                    var url = kp_id ? 'https://kinobase.org' + kp_id : 'https://kinobase.org' + query;
                    
                    Lampa.Noty.show('Переход на Kinobase...');
                    
                    // В Lampa для открытия внешних ссылок/плееров используем:
                    window.open(url, '_blank');
                });

                // Добавляем в начало или после первой кнопки
                container.append(btn);
                
                // Обновляем навигацию Lampa, чтобы кнопка стала кликабельной
                Lampa.Controller.enable('full');
            }
        });
    }

    // Регистрация плагина в системе
    if (window.appready) startPlugin();
    else Lampa.Listener.follow('app', function (e) {
        if (e.type == 'ready') startPlugin();
    });
})();
