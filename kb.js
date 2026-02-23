(function () {
    'use strict';

    function init() {
        Lampa.Listener.follow('full', function (e) {
            if (e.type == 'complite') {
                // Ждем отрисовки кнопок в 3.1.6
                setTimeout(function() {
                    var container = e.container.find('.full-start__buttons');
                    
                    if (container.length && !container.find('.view--kinobase').length) {
                        var btn = $('<div class="full-start__button selector view--kinobase" style="background: #e64a19 !important; color: #fff !important; margin-right: 10px; border-radius: 5px;"><span>Kinobase</span></div>');
                        
                        btn.on('hover:enter', function () {
                            var movie = e.data.movie;
                            var kp = movie.kinopoisk_id || '';
                            var url = kp ? 'https://kinobase.org' + kp : 'https://kinobase.org' + encodeURIComponent(movie.title || movie.name);
                            
                            Lampa.Noty.show('Переход на Kinobase');
                            window.open(url, '_blank');
                        });

                        container.prepend(btn);
                        
                        // Сообщаем Lampa, что кнопки обновились (для пульта)
                        Lampa.Controller.enable('full');
                    }
                }, 400);
            }
        });
    }

    // Безопасный запуск без Script Error
    if (window.Lampa) {
        init();
    } else {
        document.addEventListener('window:ready', init);
    }
})();
