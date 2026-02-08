(function () {
    'use strict';

    function init() {
        // Запускаем проверку каждые 1.5 секунды
        setInterval(function() {
            // 1. Находим все элементы, которые могут быть кнопками
            var allElements = document.querySelectorAll('.selector, .full-start__button, .button');
            var watchBtn = null;

            // 2. Ищем среди них ту, где написано "Смотреть"
            for (var i = 0; i < allElements.length; i++) {
                var el = allElements[i];
                if (el.innerText && el.innerText.toLowerCase().indexOf('смотреть') !== -1) {
                    watchBtn = el;
                    break;
                }
            }

            // 3. Если кнопка "Смотреть" есть, а нашей кнопки рядом нет — добавляем
            if (watchBtn && !watchBtn.parentElement.querySelector('.kb-fixed-btn')) {
                var kbBtn = document.createElement('div');
                
                // Копируем внешний вид основной кнопки
                kbBtn.className = watchBtn.className + ' kb-fixed-btn';
                
                // Стили
                kbBtn.style.backgroundColor = '#e67e22';
                kbBtn.style.color = '#fff';
                kbBtn.style.marginLeft = '10px';
                kbBtn.style.display = 'inline-flex';
                kbBtn.innerHTML = '<span>Kinobase</span>';

                // Вставляем после кнопки "Смотреть"
                watchBtn.parentNode.insertBefore(kbBtn, watchBtn.nextSibling);

                // Логика нажатия
                kbBtn.onclick = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    var active = Lampa.Activity.active();
                    var card = active ? active.card : null;
                    
                    if (!card) {
                        Lampa.Noty.show('Не удалось получить данные фильма');
                        return;
                    }

                    var title = card.title || card.name;
                    var cleanTitle = title.replace(/[:.,!?-]/g, " ").trim();
                    var searchUrl = 'https://kinobase.org/search?query=' + encodeURIComponent(cleanTitle);

                    Lampa.Noty.show('Ищу фильм на Kinobase...');

                    // Открываем поиск в новой вкладке — это 100% рабочий метод на ПК
                    var newWindow = window.open(searchUrl, '_blank');
                    
                    if (newWindow) {
                        newWindow.focus();
                    } else {
                        Lampa.Noty.show('Браузер заблокировал окно. Разрешите всплывающие окна!');
                    }
                };
            }
        }, 1500);
    }

    // Безопасный запуск
    if (window.appready) {
        init();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') init();
        });
    }
})();