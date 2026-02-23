(function () {
    'use strict';

    function Kinobase(object) {
        var network = new Lampa.RegExp();
        var scroll = new Lampa.Scroll({mask: true, over: true});
        var items = [];
        var html = $('<div></div>');
        
        // Основная функция поиска
        this.search = function (data) {
            // Kinobase обычно требует поиска по названию или ID
            var url = 'https://kinobase.org' + encodeURIComponent(data.title);
            
            network.silent(url, function (str) {
                // Здесь должна быть логика парсинга HTML страницы Kinobase
                // Извлекаем ссылки на плеер или видеофайлы
                var result = parsePage(str); 
                if (result) {
                    this.build(result);
                } else {
                    Lampa.Noty.show('Контент на Kinobase не найден');
                }
            }.bind(this));
        };

        this.create = function () {
            // Инициализация интерфейса плагина внутри Lampa
            return scroll.render();
        };

        // Вспомогательная функция парсинга (упрощенно)
        function parsePage(html_str) {
            // Тут должна быть регулярка или поиск по DOM для извлечения .mp4 или iframe
            // ВАЖНО: Kinobase часто меняет селекторы, поэтому парсер нужно обновлять
            return [{ title: 'Смотреть в 1080p', url: '...' }];
        }
    }

    // Регистрация плагина в системе Lampa
    function startPlugin() {
        window.plugin_kinobase_ready = true;
        Lampa.Component.add('kinobase', Kinobase); // Добавляем компонент
        
        // Добавляем кнопку в карточку фильма
        Lampa.Listener.follow('full', function (e) {
            if (e.type == 'complite') {
                var btn = $('<div class="full-start__button button--secondary">Kinobase</div>');
                btn.on('click', function () {
                    Lampa.Component.item('kinobase', {
                        title: e.data.movie.title,
                        kp_id: e.data.movie.kinopoisk_id
                    });
                });
                e.render.find('.full-start__buttons').append(btn);
            }
        });
    }

    if (!window.plugin_kinobase_ready) startPlugin();

})();
