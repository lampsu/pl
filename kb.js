(function () {
    'use strict';

    function initKinobase() {
        Lampa.Listener.follow('full', function (e) {
            if (e.type == 'complite') {
                var render = function() {
                    var container = e.container.find('.full-start__buttons');
                    if (container.length && !container.find('.view--kinobase').length) {
                        var btn = $(`
                            <div class="full-start__button selector view--kinobase" style="background: #fb5121 !important; color: #fff !important; display: flex; align-items: center; justify-content: center;">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org" style="margin-right: 8px;">
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

                        container.prepend(btn);
                        Lampa.Controller.enable('full');
                    }
                };
                // Задержка для корректного рендеринга на веб-версии
                setTimeout(render, 250);
            }
        });
    }

    if (window.Lampa) {
        try { initKinobase(); } catch(e) { console.error(e); }
    }
})();
