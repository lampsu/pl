(function () {
    'use strict';

    // 1. Определение компонента поиска
    function KinobaseComponent(object) {
        this.create = function () {
            var movie = object.movie;
            var title = movie.title || movie.name;
            // Прямой переход на поиск Kinobase
            var url = 'https://kinobase.org' + encodeURIComponent(title);
            window.open(url, '_blank');
            return null;
        };
    }

    function startPlugin() {
        Lampa.Component.add('kinobase', KinobaseComponent);

        // 2. Слушатель отрисовки карточки
        Lampa.Listener.follow('full', function (e) {
            if (e.type == 'complite') {
                render(e);
            }
        });

        function render(e) {
            // Ищем контейнер кнопок. В lampa.mx это .full-start__buttons
            var container = e.render.find('.full-start__buttons');
            
            // Если кнопка уже есть, выходим
            if (container.find('.button--kinobase').length) return;

            // Создаем кнопку в стиле Lampa
            var button = $(`
                <div class="full-start__button button--secondary button--kinobase">
                    <svg height="24" viewBox="0 0 24 24" width="24" fill="currentColor">
                        <path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"/>
                    </svg>
                    <span>Kinobase</span>
                </div>
            `);

            button.on('click', function () {
                Lampa.Component.item('kinobase', {
                    movie: e.data.movie
                });
            });

            // Вставляем кнопку после кнопки "Трейлер" или в конец
            container.append(button);
        }
    }

    // Ожидание готовности Lampa
    var wait = setInterval(function() {
        if (typeof Lampa !== 'undefined' && Lampa.Listener) {
            clearInterval(wait);
            startPlugin();
        }
    }, 100);

})();
