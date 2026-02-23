(function () {
    'use strict';

    function start() {
        Lampa.Listener.follow('full', function (e) {
            if (e.type == 'complite') {
                var container = e.container.find('.full-start__buttons');
                if (container.length && !container.find('.view--kinobase').length) {
                    var btn = $('<div class="full-start__button selector view--kinobase" style="background: #f44336 !important; color: #fff !important; border-radius: 5px; margin-right: 10px;"><span>Kinobase</span></div>');
                    
                    btn.on('hover:enter', function () {
                        var m = e.data.movie;
                        var kp = m.kinopoisk_id;
                        var query = encodeURIComponent(m.title || m.name);
                        var url = kp ? 'https://kinobase.org' + kp : 'https://kinobase.org' + query;
                        
                        Lampa.Noty.show('Открываю Kinobase...');
                        window.open(url, '_blank');
                    });

                    container.prepend(btn);
                    // Обновляем контроллер, чтобы кнопка стала кликабельной
                    Lampa.Controller.enable('full');
                }
            }
        });
    }

    // Ждем полной готовности Lampa
    if (window.Lampa) {
        start();
    } else {
        document.addEventListener('window:ready', start);
    }
})();
