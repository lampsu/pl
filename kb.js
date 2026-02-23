(function () {
    'use strict';

    function kinobase(object) {
        var network = new Lampa.Reguest();
        var scroll  = Lampa.Template.get('scroll');
        var items   = [];
        
        // Поиск фильма на сайте Kinobase по названию и году
        this.search = function (data) {
            var url = 'https://kinobase.org' + encodeURIComponent(data.title);
            
            network.silent(url, function (html) {
                // Здесь логика парсинга страницы поиска (упрощенно)
                // Kinobase часто требует обхода CORS, поэтому рекомендуется использовать прокси
                var link = 'https://kinobase.org' + data.kp_id; // Пример прямой ссылки через ID
                
                if (link) {
                    var video = {
                        url: link,
                        title: data.title
                    };
                    Lampa.Player.play(video);
                    Lampa.Player.playlist([video]);
                } else {
                    Lampa.Noty.show('Файл не найден на Kinobase');
                }
            });
        };
    }

    // Интеграция кнопки в карточку фильма
    function startPlugin() {
        window.kinobase_plugin = true;

        Lampa.Listener.follow('full', function (e) {
            if (e.type == 'complite') {
                var btn = $('<div class="full-start__button selector view--kinobase">' +
                    '<svg height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org"><path d="M8 5v14l11-7z"/><path d="M0 0h24v24H0z" fill="none"/></svg>' +
                    '<span>Kinobase</span>' +
                    '</div>');

                btn.on('hover:enter', function () {
                    var movie = e.data.movie;
                    var search = new kinobase();
                    search.search({
                        title: movie.title || movie.name,
                        year: movie.release_date ? movie.release_date.split('-')[0] : '',
                        kp_id: movie.kinopoisk_id
                    });
                });

                e.container.find('.full-start__buttons').append(btn);
            }
        });
    }

    if (window.appready) startPlugin();
    else Lampa.Listener.follow('app', function (e) {
        if (e.type == 'ready') startPlugin();
    });
})();
