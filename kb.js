(function () {
    'use strict';

    // Уведомление о старте на 3.1.6
    Lampa.Noty.show('Kinobase 3.1.6 активирован', {status: 'success'});

    function addKinobaseButton(e) {
        // Пробуем найти контейнер в разных местах (зависит от версии интерфейса)
        var container = e.container.find('.full-start__buttons, .full-buttons, .buttons--list, .full-start-buttons');
        
        if (container.length && !container.find('.view--kinobase').length) {
            var btn = $(`
                <div class="full-start__button selector view--kinobase" style="background: #ff4500 !important; color: #fff !important; border-radius: 6px; margin-right: 12px; display: flex; align-items: center; justify-content: center; min-width: 140px;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org" style="margin-right: 8px;">
                        <path d="M10 16.5V7.5L16 12L10 16.5Z" fill="white"/>
                        <circle cx="12" cy="12" r="9" stroke="white" stroke-width="2"/>
                    </svg>
                    <span style="font-weight: bold; font-size: 1.1em;">Kinobase</span>
                </div>
            `);

            btn.on('hover:enter click', function (event) {
                event.stopPropagation();
                var movie = e.data.movie;
                var kp = movie.kinopoisk_id || '';
                var title = movie.title || movie.name;
                var url = kp ? 'https://kinobase.org' + kp : 'https://kinobase.org' + encodeURIComponent(title);
                
                Lampa.Noty.show('Открываю Kinobase...');
                window.open(url, '_blank');
            });

            // Вставляем В НАЧАЛО (перед кнопкой "Смотреть")
            container.prepend(btn);
            
            // Важно для 3.1.6: обновляем навигацию, чтобы кнопка получила фокус пульта
            if (Lampa.Controller.enabled().name == 'full') {
                Lampa.Controller.enable('full');
            }
        }
    }

    // Слушатель событий карточки
    Lampa.Listener.follow('full', function (e) {
        if (e.type == 'complite' || e.type == 'ready') {
            // Повторяем поиск трижды с задержкой (для слабых устройств)
            setTimeout(function() { addKinobaseButton(e); }, 100);
            setTimeout(function() { addKinobaseButton(e); }, 500);
            setTimeout(function() { addKinobaseButton(e); }, 1500);
        }
    });

    // Резервный метод на случай, если Listener не перехватил отрисовку
    setInterval(function() {
        if (window.location.hash.includes('full')) {
            var active = Lampa.Activity.active();
            if (active && active.component == 'full' && active.content) {
                addKinobaseButton({
                    container: active.content,
                    data: { movie: active.card }
                });
            }
        }
    }, 2000);

})();
