(function () {
    'use strict';

    function init() {
        setInterval(function() {
            var watchBtn = document.querySelector('.full-start__button.selector');
            if (watchBtn && !watchBtn.parentElement.querySelector('.kb-search-inside')) {
                var btn = document.createElement('div');
                btn.className = 'full-start__button selector kb-search-inside';
                btn.style.backgroundColor = '#d35400';
                btn.style.marginLeft = '10px';
                btn.innerHTML = '<span>Поиск на Kinobase</span>';
                watchBtn.parentNode.insertBefore(btn, watchBtn.nextSibling);

                btn.onclick = function() {
                    var card = Lampa.Activity.active().card;
                    runInternalSearch(card);
                };
            }
        }, 2000);
    }

    function runInternalSearch(card) {
        var title = (card.title || card.name).replace(/[:.,!?-]/g, " ").trim();
        var proxy = 'https://cors-anywhere.herokuapp.com/';
        var searchUrl = proxy + 'https://kinobase.org/search?query=' + encodeURIComponent(title);

        Lampa.Noty.show('Ищу результаты...');

        fetch(searchUrl)
            .then(r => r.text())
            .then(html => {
                var parser = new DOMParser();
                var doc = parser.parseFromString(html, 'text/html');
                var items = doc.querySelectorAll('.v-card-list__item'); // Селектор карточек на Kinobase
                
                var results = [];

                items.forEach(function(item) {
                    var link = item.querySelector('a');
                    var img = item.querySelector('img');
                    var name = item.querySelector('.v-card-list__title, .title');

                    if (link && name) {
                        results.push({
                            title: name.innerText.trim(),
                            url: 'https://kinobase.org' + link.getAttribute('href'),
                            img: img ? img.getAttribute('src') : ''
                        });
                    }
                });

                if (results.length > 0) {
                    showResultsMenu(results, card);
                } else {
                    Lampa.Noty.show('Ничего не найдено');
                }
            })
            .catch(function() {
                Lampa.Noty.show('Ошибка доступа (проверьте прокси)');
            });
    }

    function showResultsMenu(results, originalCard) {
        // Создаем список для выбора
        Lampa.Select.show({
            title: 'Результаты Kinobase',
            items: results,
            onSelect: function(item) {
                // При выборе открываем страницу или пытаемся играть
                Lampa.Noty.show('Открываю: ' + item.title);
                // Здесь можно либо вызвать переход по ссылке, либо запустить парсинг видео
                window.open(item.url, '_blank'); 
            },
            onBack: function() {
                Lampa.Controller.toggle('full');
            }
        });
    }

    if (window.appready) init();
    else document.addEventListener('appready', init);
})();
