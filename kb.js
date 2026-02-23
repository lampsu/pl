(function () {
    'use strict';

    // Проверка загрузки (зеленое уведомление)
    setTimeout(function() {
        if (window.Lampa) Lampa.Noty.show('Kinobase 3.1.6: Подключено', {status: 'success'});
    }, 1500);

    function inject() {
        // Ищем контейнер кнопок (универсальный селектор для 3.1.6)
        var container = $('.full-start__buttons, .full-buttons, .buttons--list');
        
        if (container.length && !container.find('.view--kinobase').length) {
            var btn = $('<div class="full-start__button selector view--kinobase" style="background: #fb5121 !important; color: #fff !important; border-radius: 5px; margin-right: 10px; display: inline-flex; align-items: center; justify-content: center; padding: 0 15px; height: 3.5em; cursor: pointer;"><span>Kinobase</span></div>');

            btn.on('hover:enter click', function () {
                var active = Lampa.Activity.active();
                var movie = active.card || active.data.movie;
                var kp = movie.kinopoisk_id || '';
                var title = movie.title || movie.name;
                var url = kp ? 'https://kinobase.org' + kp : 'https://kinobase.org' + encodeURIComponent(title);
                
                Lampa.Noty.show('Переход на Kinobase...');
                window.open(url, '_blank');
            });

            // Вставляем первой
            container.prepend(btn);
            
            // Регистрируем кнопку в контроллере фокуса
            if (Lampa.Controller.enabled().name == 'full') {
                Lampa.Controller.enable('full');
            }
        }
    }

    // Слушаем события Lampa
    Lampa.Listener.follow('full', function (e) {
        if (e.type == 'complite' || e.type == 'ready') {
            setTimeout(inject, 300);
        }
    });

    // Резервный таймер (если события блокируются)
    setInterval(function() {
        if (window.location.hash.indexOf('full') > -1) inject();
    }, 1500);

})();
