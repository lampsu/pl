(function () {
    'use strict';

    function Kinobase() {
        this.open = function (data) {
            Lampa.Noty.show('Поиск контента на Kinobase для: ' + data.title);
            // Ссылка на результаты поиска (через прокси, если нужно)
            var searchUrl = 'https://kinobase.org' + encodeURIComponent(data.title);
            console.log('Kinobase search:', searchUrl);
        };
    }

    function addKinobaseButton(e) {
        // Проверяем наличие контейнера кнопок (учитываем разные версии интерфейса)
        var container = e.render.find('.full-start__buttons, .full-buttons');
        
        if (container.length > 0 && !container.find('.plugin--kinobase').length) {
            var button = $(`
                <div class="full-start__button button--secondary plugin--kinobase" style="margin-left: 10px;">
                    <svg height="24" viewBox="0 0 24 24" width="24" fill="currentColor">
                        <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    </svg>
                    <span>Kinobase</span>
                </div>
            `);

            button.on('click', function () {
                Lampa.Component.item('kinobase', {
                    title: e.data.movie.title || e.data.movie.name,
                    id: e.data.movie.id
                });
            });

            container.append(button);
        }
    }

    function startPlugin() {
        window.kinobase_plugin_loaded = true;
        Lampa.Component.add('kinobase', Kinobase);

        // Слушаем событие завершения рендеринга карточки
        Lampa.Listener.follow('full', function (e) {
            if (e.type === 'complite' || e.type === 'ready') {
                // Используем задержку, так как кнопки могут догружаться динамически
                setTimeout(function() { addKinobaseButton(e); }, 100);
            }
        });
    }

    // Проверка готовности системы
    if (window.Lampa) {
        startPlugin();
    } else {
        document.addEventListener('app:ready', startPlugin);
    }
})();
