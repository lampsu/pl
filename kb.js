(function () {
    'use strict';

    function Kinobase() {
        // Логика открытия поиска Kinobase
        this.open = function (data) {
            Lampa.Noty.show('Поиск на Kinobase: ' + data.title);
            // Здесь должна быть логика перехода к результатам
        };
    }

    function startPlugin() {
        // Регистрация компонента
        Lampa.Component.add('kinobase', Kinobase);

        // Слушатель открытия карточки фильма
        Lampa.Listener.follow('full', function (e) {
            if (e.type === 'complite') { 
                // Даем небольшую задержку, чтобы DOM успел отрисоваться
                setTimeout(function() {
                    renderButton(e);
                }, 10);
            }
        });
    }

    function renderButton(e) {
        var container = e.render.find('.full-start__buttons');
        
        // Проверяем, не добавлена ли кнопка уже (чтобы избежать дублей)
        if (container.find('.plugin--kinobase').length > 0) return;

        var button = $(`<div class="full-start__button button--secondary plugin--kinobase">
            <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org"><path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/></svg>
            <span>Kinobase</span>
        </div>`);

        button.on('hover:enter click', function () {
            Lampa.Component.item('kinobase', {
                title: e.data.movie.title || e.data.movie.name,
                id: e.data.movie.id
            });
        });

        container.append(button);
    }

    // Запуск при готовности Lampa
    if (window.appready) startPlugin();
    else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') startPlugin();
        });
    }
})();
