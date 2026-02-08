(function () {
    'use strict';

    function init() {
        setInterval(function() {
            var watchBtn = document.querySelector('.full-start__button.selector');
            if (watchBtn && !watchBtn.parentElement.querySelector('.kb-list-btn')) {
                var btn = document.createElement('div');
                btn.className = 'full-start__button selector kb-list-btn';
                btn.style.backgroundColor = '#d35400';
                btn.innerHTML = '<span>Выбор на Kinobase</span>';
                watchBtn.parentNode.insertBefore(btn, watchBtn.nextSibling);

                btn.onclick = function() {
                    var card = Lampa.Activity.active().card;
                    searchInside(card);
                };
            }
        }, 2000);
    }

    function searchInside(card) {
        var title = (card.title || card.name).replace(/[:.,!?-]/g, " ").trim();
        var url = 'https://kinobase.org/search?query=' + encodeURIComponent(title);
        var proxy = 'https://cors-anywhere.herokuapp.com/';

        Lampa.Noty.show('Поиск вариантов...');

        fetch(proxy + url)
            .then(r => r.text())
            .then(html => {
                var parser = new DOMParser();
                var doc = parser.parseFromString(html, 'text/html');
                // Ищем все блоки с фильмами в выдаче Kinobase
                var items = doc.querySelectorAll('.v-card-list__item, .item');
                var results = [];

                items.forEach(function(item) {
                    var link = item.querySelector('a');
                    var name = item.querySelector('.v-card-list__title, .title, h4');
                    if (link && name) {
                        results.push({
                            title: name.innerText.trim(),
                            url: 'https://kinobase.org' + link.getAttribute('href')
                        });
                    }
                });

                if (results.length > 0) {
                    showResultsMenu(results, card);
                } else {
                    Lampa.Noty.show('Ничего не найдено');
                }
            })
            .catch(() => Lampa.Noty.show('Ошибка доступа (проверьте прокси)'));
    }

    function showResultsMenu(results, card) {
        // Создаем встроенный список Lampa
        Lampa.Select.show({
            title: 'Результаты Kinobase',
            items: results,
            onSelect: function(item) {
                Lampa.Noty.show('Загрузка: ' + item.title);
                // Здесь вызываем функцию запуска видео из предыдущих шагов
                extractVideoDirect(item.url, item.title, card);
            },
            onBack: function() {
                Lampa.Controller.toggle('full');
            }
        });
    }

    function extractVideoDirect(url, title, card) {
        var proxy = 'https://cors-anywhere.herokuapp.com/';
        fetch(proxy + url)
            .then(r => r.text())
            .then(html => {
                var fileMatch = html.match(/["']file["']\s*:\s*["']([^"']+)["']/);
                var videoUrl = "";
                if (fileMatch) {
                    var data = fileMatch[1];
                    videoUrl = data.includes('#mw') ? atob(data.split('#mw')[1]) : data;
                    videoUrl = videoUrl.split(',')[0].replace(/\\\//g, '/');
                }

                if (videoUrl && videoUrl.startsWith('http')) {
                    Lampa.Player.play({ url: videoUrl, title: title, movie: card });
                    Lampa.Player.playlist([{ url: videoUrl, title: title }]);
                } else {
                    Lampa.Noty.show('Не удалось извлечь поток');
                }
            });
    }

    if (window.appready) init();
    else document.addEventListener('appready', init);
})();
