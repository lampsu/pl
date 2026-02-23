(function () {
    'use strict';

    // Функция отрисовки кнопки
    function inject() {
        var container = $('.full-start__buttons, .full-buttons');
        if (container.length && !container.find('.view--kinobase').length) {
            var btn = $('<div class="full-start__button selector view--kinobase" style="background: #ff5722 !important; color: #fff !important; margin-right: 10px;"><span>Kinobase</span></div>');
            
            btn.on('hover:enter', function () {
                var movie = Lampa.Activity.active().card;
                var url = movie.kinopoisk_id ? 'https://kinobase.org' + movie.kinopoisk_id : 'https://kinobase.org' + encodeURIComponent(movie.title || movie.name);
                window.open(url, '_blank');
            });

            container.prepend(btn);
            Lampa.Controller.enable('full');
        }
    }

    // Запуск через глобальный таймер (обход всех защит)
    setInterval(function () {
        if (window.location.hash.indexOf('full') > -1) {
            inject();
        }
    }, 1000);

    // Вывод в лог (проверьте в Настройки -> Инфо -> Лог)
    console.log('Kinobase Plugin: Инициализация выполнена');
    setTimeout(function() {
        if (window.Lampa) Lampa.Noty.show('Kinobase готов');
    }, 3000);

})();
