(function () {
    'use strict';

    function init() {
        setInterval(function() {
            // Используем стандартный селектор Lampa для кнопок
            var buttons = document.querySelectorAll('.full-start__button');
            var watchBtn = null;

            for (var i = 0; i < buttons.length; i++) {
                if (buttons[i].innerText.toLowerCase().indexOf('смотреть') !== -1) {
                    watchBtn = buttons[i];
                    break;
                }
            }

            if (watchBtn && !watchBtn.parentElement.querySelector('.kb-android')) {
                var kbBtn = document.createElement('div');
                // Добавляем класс selector, чтобы кнопка подсвечивалась пультом
                kbBtn.className = 'full-start__button selector kb-android';
                kbBtn.style.backgroundColor = '#d35400';
                kbBtn.style.marginLeft = '10px';
                kbBtn.innerHTML = '<span>Kinobase</span>';

                watchBtn.parentNode.insertBefore(kbBtn, watchBtn.nextSibling);

                // Используем Lampa.Listener или прямой обработчик
                kbBtn.onclick = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    var card = Lampa.Activity.active().card;
                    if (!card) return;

                    var title = card.title || card.name;
                    var query = title.replace(/[:.,!?-]/g, " ").trim();
                    var url = 'https://kinobase.org/search?query=' + encodeURIComponent(query);

                    // Специальный метод Lampa для открытия ссылок в Android
                    if (window.Lampa && Lampa.Platform && Lampa.Platform.is('android')) {
                        Lampa.Platform.openLink(url);
                    } else {
                        // Резервный метод
                        window.location.href = url;
                    }
                };
                
                // Чтобы кнопка работала с пульта, нужно обновить контроллер
                if(window.Lampa && Lampa.Controller) Lampa.Controller.toggle('full');
            }
        }, 2000);
    }

    // Ждем полной готовности приложения
    if (window.appready) init();
    else {
        document.addEventListener('appready', init);
    }
})();