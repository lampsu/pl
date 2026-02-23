(function () {
    'use strict';

    function startPlugin() {
        console.log('Kinobase: Plugin initialization start');

        // Регистрация компонента
        Lampa.Component.add('kinobase_plugin', function() {
            this.create = function() { return null; };
            this.open = function(data) {
                Lampa.Noty.show('Поиск на Kinobase: ' + data.title);
                window.open('https://kinobase.org' + encodeURIComponent(data.title), '_blank');
            };
        });

        // Функция вставки кнопки
        function injectButton() {
            // Ищем контейнеры кнопок в карточке
            var footer = $('.full-start__buttons');
            
            if (footer.length > 0 && !$('.plugin--kinobase').length) {
                console.log('Kinobase: Found container, injecting button...');
                
                var btn = $(`<div class="full-start__button button--secondary plugin--kinobase" style="background: #e67e22 !important; color: #fff !important;">
                    <span>Kinobase</span>
                </div>`);

                btn.on('click', function () {
                    var movie = Lampa.Activity.active().card;
                    Lampa.Component.item('kinobase_plugin', {
                        title: movie.title || movie.name
                    });
                });

                footer.append(btn);
            }
        }

        // Таймер для проверки DOM каждые 500мс (самый надежный метод для ПК)
        setInterval(injectButton, 500);
    }

    // Ожидание полной загрузки движка Lampa
    var waitLampa = setInterval(function() {
        if (typeof Lampa !== 'undefined' && Lampa.Component) {
            clearInterval(waitLampa);
            startPlugin();
        }
    }, 200);

})();
