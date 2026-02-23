(function () {
    'use strict';

    function initKinobase() {
        Lampa.Listener.follow('full', function (e) {
            if (e.type == 'complite') {
                var btn = $(`
                    <div class="full-start__button selector view--kinobase" style="background: #fb5121 !important; color: #fff !important;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org" style="margin-right: 8px; vertical-align: bottom;">
                            <path d="M10 16.5V7.5L16 12L10 16.5Z" fill="white"/>
                            <circle cx="12" cy="12" r="9" stroke="white" stroke-width="2"/>
                        </svg>
                        <span>Kinobase</span>
                    </div>
                `);

                btn.on('hover:enter', function () {
                    var m = e.data.movie;
                    var url = m.kinopoisk_id ? 'https://kinobase.org' + m.kinopoisk_id : 'https://kinobase.org' + encodeURIComponent(m.title || m.name);
                    window.open(url, '_blank');
                });

                // Ждем отрисовки интерфейса и вставляем
                setTimeout(function(){
                    var container = e.container.find('.full-start__buttons');
                    if (container.length && !container.find('.view--kinobase').length) {
                        container.prepend(btn);
                        Lampa.Controller.enable('full');
                    }
                }, 200);
            }
        });
    }

    // Безопасный запуск
    try {
        initKinobase();
    } catch (e) {
        console.error('Kinobase error:', e);
    }
})();
