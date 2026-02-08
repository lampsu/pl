(function () {
    'use strict';

    function init() {
        // Используем MutationObserver - это надежнее, чем setInterval
        // Он следит за изменением DOM и срабатывает сразу, как появляется кнопка
        var observer = new MutationObserver(function (mutations) {
            var buttons = document.querySelectorAll('.selector, .button, .full-start__button');
            
            buttons.forEach(function (btn) {
                // Ищем кнопку по тексту "Смотреть" и проверяем, не добавили ли мы уже свою кнопку
                if (btn.innerText && btn.innerText.toLowerCase().indexOf('смотреть') !== -1 && 
                    !btn.parentElement.querySelector('.kb-internal')) {
                    
                    createPluginButton(btn);
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    function createPluginButton(targetBtn) {
        var kbBtn = document.createElement('div');
        // Копируем классы оригинала, чтобы кнопка выглядела родной и работала с пульта
        kbBtn.className = targetBtn.className + ' kb-internal';
        
        // Стилизация
        kbBtn.style.backgroundColor = '#d35400';
        kbBtn.style.color = '#fff';
        kbBtn.style.marginLeft = '10px';
        kbBtn.style.padding = '0 20px';
        kbBtn.style.display = 'inline-flex';
        kbBtn.style.alignItems = 'center';
        kbBtn.style.justifyContent = 'center';
        kbBtn.style.cursor = 'pointer';
        kbBtn.innerHTML = '<span>Kinobase</span>';

        targetBtn.parentNode.insertBefore(kbBtn, targetBtn.nextSibling);

        kbBtn.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();
            
            var card = Lampa.Activity.active().card;
            if (card) runInternalSearch(card);
            else Lampa.Noty.show('Данные фильма не найдены');
        };
    }

    function runInternalSearch(card) {
        var title = (card.title || card.name).replace(/[:.,!?-]/g, " ").trim();
        var proxy = 'https://cors-anywhere.herokuapp.com/';
        var searchUrl = proxy + 'https://kinobase.org/search?query=' + encodeURIComponent(title);

        Lampa.Noty.show('Поиск на Kinobase...');

        fetch(searchUrl)
            .then(r => r.text())
            .then(html => {
                var parser = new DOMParser();
                var doc = parser.parseFromString(html, 'text/html');
                var items = doc.querySelectorAll('.v-card-list__item'); 
                
                var results = [];
                items.forEach(function(item) {
                    var a = item.querySelector('a');
                    var t = item.querySelector('.v-card-list__title, .title, h4');
                    if (a && t) {
                        results.push({
                            title: t.innerText.trim(),
                            url: 'https://kinobase.org' + a.getAttribute('href')
                        });
                    }
                });

                if (results.length > 0) {
                    Lampa.Select.show({
                        title: 'Результаты для: ' + title,
                        items: results,
                        onSelect: function(item) {
                            Lampa.Noty.show('Открываю страницу...');
                            window.open(item.url, '_blank');
                        },
                        onBack
