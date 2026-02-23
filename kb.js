(function () {
    'use strict';

    // 1. Регистрируем компонент, чтобы Lampa знала, что делать при клике
    Lampa.Component.add('kinobase_plugin', function() {
        this.create = function() { return null; };
        this.open = function(data) {
            Lampa.Noty.show('Поиск на Kinobase: ' + data.title);
            // Здесь будет логика парсера
        };
    });

    // 2. Функция создания кнопки
    function createBtn(data) {
        if ($('.plugin--kinobase').length) return; // Если уже есть, не дублируем

        var btn = $(`<div class="full-start__button button--secondary plugin--kinobase" style="background: #2c3e50; color: #fff; margin-left: 10px;">
            <svg height="24" viewBox="0 0 24 24" width="24" fill="currentColor" style="vertical-align: middle; margin-right: 5px;">
                <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            </svg>
            <span>Kinobase</span>
        </div>`);

        btn.on('click', function () {
            Lampa.Component.item('kinobase_plugin', data);
        });

        // Пытаемся найти любое место для вставки в блоке кнопок
        var container = $('.full-start__buttons, .full-buttons, .view--movie .full-start__buttons');
        if (container.length) {
            container.append(btn);
            console.log('Kinobase: Кнопка успешно добавлена');
        }
    }

    // 3. "Грязный" хак: следим за изменением DOM (MutationObserver)
    // Это сработает, даже если стандартные события Lampa не доходят
    var observer = new MutationObserver(function() {
        if ($('.full-start__buttons').length && !$('.plugin--kinobase').length) {
            // Пытаемся достать данные о фильме из глобального стейка Lampa
            var movieData = Lampa.Activity.active().card || {};
            createBtn({
                title: movieData.title || movieData.name,
                id: movieData.id
            });
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    console.log('Kinobase: Плагин запущен и следит за интерфейсом');

})();
