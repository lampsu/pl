(function () {
    'use strict';

    // Подтверждение работы
    Lampa.Noty.show('Kinobase: Плагин готов к работе', {status: 'success'});

    function injectButton() {
        // Ищем все возможные варианты контейнеров кнопок в Lampa
        var container = $('.full-start__buttons, .full-buttons, .buttons__list, [data-component="full_start_buttons"]');
        
        if (container.length && !container.find('.view--kinobase').length) {
            console.log('Kinobase: Контейнер найден, добавляю кнопку');
            
            var btn = $(`
                <div class="full-start__button selector view--kinobase" style="background: #e64a19 !important; color: #fff !important; display: flex; align-items: center; justify-content: center; border-radius: 4px; margin-right: 10px; cursor: pointer;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org" style="margin-right: 8px;">
                        <path d="M10 16.5V7.5L16 12L10 16.5Z" fill="white"/>
                        <circle cx="12" cy="12" r="9" stroke="white" stroke-width="2"/>
                    </svg>
                    <span>Kinobase</span>
                </div>
            `);

            // Логика нажатия (совместимая с пультом и мышкой)
            btn.on('hover:enter click', function (e) {
                e.preventDefault();
                var movie = Lampa.Activity.active().card;
                if (!movie) return;

                var kp_id = movie.kinopoisk_id;
                var title = movie.title || movie.name;
                var url = kp_id ? 'https://kinobase.org' + kp_id : 'https://kinobase.org' + encodeURIComponent(title);
                
                Lampa.Noty.show('Переход на Kinobase...');
                window.open(url, '_blank');
            });

            // Вставляем кнопку первой в список
            container.prepend(btn);
            
            // Важно: сообщаем Lampa, что в меню появились новые элементы для фокуса
            Lampa.Controller.enable('full');
        }
    }

    // Слушаем стандартное событие Lampa при открытии карточки
    Lampa.Listener.follow('full', function (e) {
        if (e.type == 'complite') {
            setTimeout(injectButton, 200); // Небольшая задержка для рендеринга
        }
    });

    // Дополнительная проверка через MutationObserver (если Listener не сработал)
    var observer = new MutationObserver(function() {
        if (window.location.hash.indexOf('full') > -1) {
            injectButton();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

})();
