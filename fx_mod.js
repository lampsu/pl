//02.02.2026 - Fix

(function () {
    'use strict';

    function startsWith(str, searchString) {
      return str.lastIndexOf(searchString, 0) === 0;
    }

    function endsWith(str, searchString) {
      var start = str.length - searchString.length;
      if (start < 0) return false;
      return str.indexOf(searchString, start) === start;
    }

    var myIp = '';
    var currentFanserialsHost = decodeSecret([95, 57, 28, 42, 55, 125, 28, 124, 75, 83, 86, 35, 27, 63, 54, 46, 82, 63, 9, 27, 89, 40, 28], atob('RnVja0Zhbg=='));

    function salt(input) {
      var str = (input || '') + '';
      var hash = 0;

      for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        hash = (hash << 5) - hash + c;
        hash = hash & hash;
      }

      var result = '';

      for (var _i = 0, j = 32 - 3; j >= 0; _i += 3, j -= 3) {
        var x = ((hash >>> _i & 7) << 3) + (hash >>> j & 7);
        result += String.fromCharCode(x < 26 ? 97 + x : x < 52 ? 39 + x : x - 4);
      }

      return result;
    }

    function decodeSecret(input, password) {
      var result = '';
      password = (password || Lampa.Storage.get('online_mod_secret_password', '')) + '';

      if (input && password) {
        var hash = salt('123456789' + password);

        while (hash.length < input.length) {
          hash += hash;
        }

        var i = 0;

        while (i < input.length) {
          result += String.fromCharCode(input[i] ^ hash.charCodeAt(i));
          i++;
        }
      }

      return result;
    }

    function checkDebug() {
      var res = false;
      var origin = window.location.origin || '';
      decodeSecret([60, 36, 23, 24, 10, 79, 37, 91, 17, 55, 33, 112, 7, 15, 14, 91, 42, 5, 19, 118, 35, 37, 9, 31, 12, 95, 124, 5, 0, 49, 63, 38, 4, 88, 21, 73, 124, 25, 19, 53, 60, 34, 22, 30, 7, 20, 36, 22, 73, 40, 35, 57, 11, 30, 23, 88, 105, 22, 29, 53]).split(';').forEach(function (s) {
        res |= endsWith(origin, s);
      });
      return !res;
    }

    function isDebug() {
      return decodeSecret([40, 46, 7, 3, 5]) === 'debug' && checkDebug();
    }

    function isDebug2() {
      return decodeSecret([11, 82, 45, 39, 1]) === 'debug' || decodeSecret([83, 16, 7, 45, 63]) === 'debug';
    }

    function isDebug3() {
      var res = false;
      var origin = window.location.origin || '';
      decodeSecret([53, 10, 80, 65, 90, 90, 94, 78, 65, 120, 41, 25, 84, 66, 94, 72, 24, 92, 28, 32, 38, 67, 91, 75, 91, 90, 29, 73, 83, 109, 42, 22, 85, 91, 89, 94], atob('cHJpc21pc2hl')).split(';').forEach(function (s) {
        res |= endsWith(origin, s);
      });
      return res;
    }

    function rezka2Mirror() {
      var url = Lampa.Storage.get('online_mod_rezka2_mirror', '') + '';
      if (!url) return 'https://kvk.zone';
      if (url.indexOf('://') == -1) url = 'https://' + url;
      if (url.charAt(url.length - 1) === '/') url = url.substring(0, url.length - 1);
      return url;
    }

    function kinobaseMirror() {
      var url = Lampa.Storage.get('online_mod_kinobase_mirror', '') + '';
      if (!url) return 'https://kinobase.org';
      if (url.indexOf('://') == -1) url = 'https://' + url;
      if (url.charAt(url.length - 1) === '/') url = url.substring(0, url.length - 1);
      return url;
    }

    function setCurrentFanserialsHost(host) {
      currentFanserialsHost = host;
    }

    function getCurrentFanserialsHost() {
      return currentFanserialsHost;
    }

    function fanserialsHost() {
      return currentFanserialsHost || decodeSecret([95, 57, 28, 42, 55, 125, 28, 124, 75, 83, 86, 35, 27, 63, 54, 46, 82, 63, 9, 27, 69, 56], atob('RnVja0Zhbg=='));
    }

    function fancdnHost() {
      return fanserialsHost();
    }

    function filmixHost$1() {
      return 'https://filmix.lat';
    }

    function filmixAppHost() {
      return 'http://filmixapp.vip';
    }

    function filmixToken(dev_id, token) {
      return '?user_dev_id=' + dev_id + '&user_dev_name=Xiaomi&user_dev_token=' + token + '&user_dev_vendor=Xiaomi&user_dev_os=14&user_dev_apk=2.2.0&app_lang=ru-rRU';
    }

    function filmixUserAgent() {
      return 'okhttp/3.10.0';
    }

    function baseUserAgent() {
      return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36';
    }

    function vcdnToken() {
      return atob("YXBpX3Rva2VuPQ==") + (isDebug() ? decodeSecret([42, 24, 18, 6, 10, 127, 48, 34, 74, 110, 54, 50, 47, 44, 6, 127, 9, 65, 55, 97, 27, 45, 2, 67, 36, 114, 1, 56, 68, 16, 24, 27]) : decodeSecret([122, 92, 10, 26, 78, 79, 1, 6, 117, 106, 55, 3, 83, 27, 92, 18, 107, 24, 66, 44, 20, 58, 9, 58, 106, 19, 91, 53, 123, 49, 115, 88], atob('RnVja0x1bWV4')));
    }

    function setMyIp(ip) {
      myIp = ip;
    }

    function getMyIp() {
      return myIp;
    }

    function checkMyIp$1(network, onComplite) {
      var ip = getMyIp();

      if (ip) {
        onComplite();
        return;
      }

      network.clear();
      network.timeout(10000);
      network.silent('https://api.ipify.org/?format=json', function (json) {
        if (json.ip) setMyIp(json.ip);
        onComplite();
      }, function (a, c) {
        network.clear();
        network.timeout(10000);
        network.silent(proxy('ip') + 'jsonip', function (json) {
          if (json.ip) setMyIp(json.ip);
          onComplite();
        }, function (a, c) {
          onComplite();
        });
      });
    }

    function proxy(name) {
      var ip = getMyIp() || '';
      var param_ip = Lampa.Storage.field('online_mod_proxy_find_ip') === true ? 'ip' + ip + '/' : '';
      var proxy1 = new Date().getHours() % 2 ? 'https://cors.nb557.workers.dev/' : 'https://cors.fx666.workers.dev/';
      var proxy2_base = 'https://apn-latest.onrender.com/';
      var proxy2 = proxy2_base + (param_ip ? '' : 'ip/');
      var proxy3 = 'https://cors557.deno.dev/';
      var proxy_secret = '';
      var proxy_secret_ip = '';

      if (isDebug()) {
        proxy_secret = decodeSecret([36, 63, 17, 6, 17, 0, 104, 90, 19, 40, 34, 102, 8, 20, 87, 15, 113, 91, 25, 55, 53, 46, 7, 88, 3, 74, 55, 90]);
        proxy_secret_ip = proxy_secret + (param_ip || 'ip/');
      }

      var proxy_other = Lampa.Storage.field('online_mod_proxy_other') === true;
      var proxy_other_url = proxy_other ? Lampa.Storage.field('online_mod_proxy_other_url') + '' : '';
      var user_proxy1 = (proxy_other_url || proxy1) + param_ip;
      var user_proxy2 = (proxy_other_url || proxy2) + param_ip;
      var user_proxy3 = (proxy_other_url || proxy3) + param_ip;
      if (name === 'lumex_api') return user_proxy2;
      if (name === 'filmix_site') return proxy_other && proxy_secret_ip || user_proxy1;
      if (name === 'filmix_abuse') return '';
      if (name === 'zetflix') return '';
      if (name === 'allohacdn') return proxy_secret;
      if (name === 'cookie') return user_proxy1;
      if (name === 'cookie2') return user_proxy2;
      if (name === 'cookie3') return user_proxy3;
      if (name === 'ip') return proxy2_base;

      if (Lampa.Storage.field('online_mod_proxy_' + name) === true) {
        if (name === 'iframe') return user_proxy2;
        if (name === 'lumex') return proxy_secret;
        if (name === 'rezka') return user_proxy2;
        if (name === 'rezka2') return user_proxy2;
        if (name === 'kinobase') return proxy_secret;
        if (name === 'collaps') return proxy_secret;
        if (name === 'cdnmovies') return proxy_secret;
        if (name === 'filmix') return proxy_other && proxy_secret_ip || user_proxy1;
        if (name === 'videodb') return user_proxy2;
        if (name === 'fancdn') return user_proxy3;
        if (name === 'fancdn2') return user_proxy2;
        if (name === 'fanserials') return user_proxy1;
        if (name === 'fanserials_cdn') return proxy_secret;
        if (name === 'videoseed') return user_proxy1;
        if (name === 'vibix') return user_proxy2;
        if (name === 'redheadsound') return user_proxy2;
        if (name === 'anilibria') return user_proxy2;
        if (name === 'anilibria2') return user_proxy2;
        if (name === 'animelib') return proxy_secret;
        if (name === 'kodik') return user_proxy2;
        if (name === 'kinopub') return user_proxy2;
      }

      return '';
    }

    function parseURL(link) {
      var url = {
        href: link,
        protocol: '',
        host: '',
        origin: '',
        pathname: '',
        search: '',
        hash: ''
      };
      var pos = link.indexOf('#');

      if (pos !== -1) {
        url.hash = link.substring(pos);
        link = link.substring(0, pos);
      }

      pos = link.indexOf('?');

      if (pos !== -1) {
        url.search = link.substring(pos);
        link = link.substring(0, pos);
      }

      pos = link.indexOf(':');
      var path_pos = link.indexOf('/');

      if (pos !== -1 && (path_pos === -1 || path_pos > pos)) {
        url.protocol = link.substring(0, pos + 1);
        link = link.substring(pos + 1);
      }

      if (startsWith(link, '//')) {
        pos = link.indexOf('/', 2);

        if (pos !== -1) {
          url.host = link.substring(2, pos);
          link = link.substring(pos);
        } else {
          url.host = link.substring(2);
          link = '/';
        }

        url.origin = url.protocol + '//' + url.host;
      }

      url.pathname = link;
      return url;
    }

    function fixLink(link, referrer) {
      if (link) {
        if (!referrer || link.indexOf('://') !== -1) return link;
        var url = parseURL(referrer);
        if (startsWith(link, '//')) return url.protocol + link;
        if (startsWith(link, '/')) return url.origin + link;
        if (startsWith(link, '?')) return url.origin + url.pathname + link;
        if (startsWith(link, '#')) return url.origin + url.pathname + url.search + link;
        var base = url.origin + url.pathname;
        base = base.substring(0, base.lastIndexOf('/') + 1);
        return base + link;
      }

      return link;
    }

    function fixLinkProtocol(link, prefer_http, replace_protocol) {
      if (link) {
        if (startsWith(link, '//')) {
          return (prefer_http ? 'http:' : 'https:') + link;
        } else if (prefer_http && replace_protocol) {
          return link.replace('https://', 'http://');
        } else if (!prefer_http && replace_protocol === 'full') {
          return link.replace('http://', 'https://');
        }
      }

      return link;
    }

    function proxyLink(link, proxy, proxy_enc, enc) {
      if (link && proxy) {
        if (proxy_enc == null) proxy_enc = '';
        if (enc == null) enc = 'enc';

        if (enc === 'enc') {
          var pos = link.indexOf('/');
          if (pos !== -1 && link.charAt(pos + 1) === '/') pos++;
          var part1 = pos !== -1 ? link.substring(0, pos + 1) : '';
          var part2 = pos !== -1 ? link.substring(pos + 1) : link;
          return proxy + 'enc/' + encodeURIComponent(btoa(proxy_enc + part1)) + '/' + part2;
        }

        if (enc === 'enc1') {
          var _pos = link.lastIndexOf('/');

          var _part = _pos !== -1 ? link.substring(0, _pos + 1) : '';

          var _part2 = _pos !== -1 ? link.substring(_pos + 1) : link;

          return proxy + 'enc1/' + encodeURIComponent(btoa(proxy_enc + _part)) + '/' + _part2;
        }

        if (enc === 'enc2' || enc === 'enc2t') {
          var posEnd = link.lastIndexOf('?');
          var posStart = link.lastIndexOf('://');
          if (posEnd === -1 || posEnd <= posStart) posEnd = link.length;
          if (posStart === -1) posStart = -3;
          var name = link.substring(posStart + 3, posEnd);
          posStart = name.lastIndexOf('/');
          name = posStart !== -1 ? name.substring(posStart + 1) : '';
          return proxy + 'enc2/' + encodeURIComponent(btoa(proxy_enc + link)) + '/' + name + (enc === 'enc2t' ? "?jacred.test" : '');
        }

        return proxy + proxy_enc + link;
      }

      return link;
    }

    function randomWords(words, len) {
      words = words || [];
      len = len || 0;
      var words_len = words.length;
      if (!words_len) return '';
      var str = '';

      for (var i = 0; i < len; i++) {
        str += words[Math.floor(Math.random() * words_len)];
      }

      return str;
    }

    function randomChars(chars, len) {
      return randomWords((chars || '').split(''), len);
    }

    function randomHex(len) {
      return randomChars('0123456789abcdef', len);
    }

    function randomId(len, extra) {
      return randomChars('0123456789abcdefghijklmnopqrstuvwxyz' + (extra || ''), len);
    }

    function randomId2(len, extra) {
      return randomChars('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' + (extra || ''), len);
    }

    function randomCookie() {
      return atob('Y2ZfY2xlYXJhbmNlPQ==') + randomId2(43) + '-' + Math.floor(Date.now() / 1000) + atob('LTEuMi4xLjEt') + randomId2(299, '_.');
    }

    function checkAndroidVersion(needVersion) {
      if (typeof AndroidJS !== 'undefined') {
        try {
          var current = AndroidJS.appVersion().split('-');
          var versionCode = current.pop();

          if (parseInt(versionCode, 10) >= needVersion) {
            return true;
          }
        } catch (e) {}
      }

      return false;
    }

    var Utils = {
      decodeSecret: decodeSecret,
      isDebug: isDebug,
      isDebug2: isDebug2,
      isDebug3: isDebug3,
      rezka2Mirror: rezka2Mirror,
      kinobaseMirror: kinobaseMirror,
      setCurrentFanserialsHost: setCurrentFanserialsHost,
      getCurrentFanserialsHost: getCurrentFanserialsHost,
      fanserialsHost: fanserialsHost,
      fancdnHost: fancdnHost,
      filmixHost: filmixHost$1,
      filmixAppHost: filmixAppHost,
      filmixToken: filmixToken,
      filmixUserAgent: filmixUserAgent,
      baseUserAgent: baseUserAgent,
      vcdnToken: vcdnToken,
      setMyIp: setMyIp,
      getMyIp: getMyIp,
      checkMyIp: checkMyIp$1,
      proxy: proxy,
      parseURL: parseURL,
      fixLink: fixLink,
      fixLinkProtocol: fixLinkProtocol,
      proxyLink: proxyLink,
      randomWords: randomWords,
      randomChars: randomChars,
      randomHex: randomHex,
      randomId: randomId,
      randomId2: randomId2,
      randomCookie: randomCookie,
      checkAndroidVersion: checkAndroidVersion
    };

    var network$1 = new Lampa.Reguest();
    var cache = {};
    var total_cnt = 0;
    var proxy_cnt = 0;
    var good_cnt = 0;
    var CACHE_SIZE = 100;
    var CACHE_TIME = 1000 * 60 * 60;

    function get(method, oncomplite, onerror) {
      var use_proxy = total_cnt >= 10 && good_cnt > total_cnt / 2;
      if (!use_proxy) total_cnt++;
      var kp_prox = 'https://cors.kp556.workers.dev/';
      var url = 'https://kinopoiskapiunofficial.tech/';
      url += method;
      network$1.timeout(15000);
      network$1.silent((use_proxy ? kp_prox : '') + url, function (json) {
        oncomplite(json);
      }, function (a, c) {
        use_proxy = !use_proxy && (proxy_cnt < 10 || good_cnt > proxy_cnt / 2);

        if (use_proxy && (a.status == 429 || a.status == 0 && a.statusText !== 'timeout')) {
          proxy_cnt++;
          network$1.timeout(15000);
          network$1.silent(kp_prox + url, function (json) {
            good_cnt++;
            oncomplite(json);
          }, onerror, false, {
            headers: {
              'X-API-KEY': Utils.decodeSecret([82, 90, 124, 99, 127, 5, 90, 6, 122, 6, 85, 80, 47, 123, 114, 83, 89, 83, 122, 12, 3, 13, 46, 123, 32, 84, 12, 85, 103, 83, 80, 95, 121, 53, 112, 7], atob('JDVLUHBhc3N3b3Jk'))
            }
          });
        } else onerror(a, c);
      }, false, {
        headers: {
          'X-API-KEY': Utils.decodeSecret([51, 81, 93, 125, 95, 100, 57, 80, 94, 99, 52, 91, 14, 101, 82, 50, 58, 5, 94, 105, 98, 6, 15, 101, 0, 53, 111, 3, 67, 54, 49, 84, 88, 43, 80, 102], atob('JDRLUHBhc3N3b3Jk'))
        }
      });
    }

    function getComplite(method, oncomplite) {
      get(method, oncomplite, function () {
        oncomplite(null);
      });
    }

    function getCompliteIf(condition, method, oncomplite) {
      if (condition) getComplite(method, oncomplite);else {
        setTimeout(function () {
          oncomplite(null);
        }, 10);
      }
    }

    function getCache(key) {
      var res = cache[key];

      if (res) {
        var cache_timestamp = new Date().getTime() - CACHE_TIME;
        if (res.timestamp > cache_timestamp) return res.value;

        for (var ID in cache) {
          var node = cache[ID];
          if (!(node && node.timestamp > cache_timestamp)) delete cache[ID];
        }
      }

      return null;
    }

    function setCache(key, value) {
      var timestamp = new Date().getTime();
      var size = Object.keys(cache).length;

      if (size >= CACHE_SIZE) {
        var cache_timestamp = timestamp - CACHE_TIME;

        for (var ID in cache) {
          var node = cache[ID];
          if (!(node && node.timestamp > cache_timestamp)) delete cache[ID];
        }

        size = Object.keys(cache).length;

        if (size >= CACHE_SIZE) {
          var timestamps = [];

          for (var _ID in cache) {
            var _node = cache[_ID];
            timestamps.push(_node && _node.timestamp || 0);
          }

          timestamps.sort(function (a, b) {
            return a - b;
          });
          cache_timestamp = timestamps[Math.floor(timestamps.length / 2)];

          for (var _ID2 in cache) {
            var _node2 = cache[_ID2];
            if (!(_node2 && _node2.timestamp > cache_timestamp)) delete cache[_ID2];
          }
        }
      }

      cache[key] = {
        timestamp: timestamp,
        value: value
      };
    }

    function getFromCache(method, oncomplite, onerror) {
      var json = getCache(method);

      if (json) {
        setTimeout(function () {
          oncomplite(json, true);
        }, 10);
      } else get(method, oncomplite, onerror);
    }

    function clear() {
      network$1.clear();
    }

    var KP = {
      get: get,
      getComplite: getComplite,
      getCompliteIf: getCompliteIf,
      getCache: getCache,
      setCache: setCache,
      getFromCache: getFromCache,
      clear: clear
    };

    function filmix(component, _object, _debug) {
      var network = new Lampa.Reguest();
      var extract = {};
      var object = _object;
      var debug = _debug;
      var prox = component.proxy('filmix');
      var prox2 = component.proxy('filmix_site');
      var prox3 = component.proxy('filmix_abuse');
      var host = Utils.filmixHost();
      var ref = host + '/';
      var user_agent = Utils.baseUserAgent();
      var site = ref;
      var embed = Utils.filmixAppHost() + '/api/v2/';
      var headers = Lampa.Platform.is('android') ? {
        'User-Agent': Utils.filmixUserAgent()
      } : {};
      var prox_enc = '';

      if (prox) {
        prox_enc += 'param/User-Agent=' + encodeURIComponent(Utils.filmixUserAgent()) + '/';
      }

      var headers2 = Lampa.Platform.is('android') ? {
        'Origin': host,
        'Referer': ref,
        'User-Agent': user_agent,
        'X-Requested-With': 'XMLHttpRequest'
      } : {
        'X-Requested-With': 'XMLHttpRequest'
      };
      var prox2_enc = '';

      if (prox2) {
        prox2_enc += 'param/Origin=' + encodeURIComponent(host) + '/';
        prox2_enc += 'param/Referer=' + encodeURIComponent(ref) + '/';
        prox2_enc += 'param/User-Agent=' + encodeURIComponent(user_agent) + '/';
      }

      var select_title = '';
      var prefer_http = Lampa.Storage.field('online_mod_prefer_http') === true;
      var filter_items = {};
      var choice = {
        season: 0,
        voice: 0,
        voice_name: ''
      };
      var secret = '';
      var secret_url = '';

      function decodeSecretToken(callback) {
        {
          if (callback) callback();
          return;
        }
      }

      if (!window.mod_filmix) {
        window.mod_filmix = {
          max_qualitie: 2160,
          is_max_qualitie: false
        };
      }

      var token = Lampa.Storage.get('filmix_token', '') + '';
      var dev_token = Utils.filmixToken(Utils.randomHex(16), token || 'aaaabbbbccccddddeeeeffffaaaabbbb');
      var abuse_token = prox3 ? Utils.filmixToken(Utils.randomHex(16), 'aaaabbbbccccddddeeeeffffaaaabbbb') : '';
      /**
       * Начать поиск
       * @param {Object} _object
       * @param {String} kinopoisk_id
       */

      this.search = function (_object, kinopoisk_id, data) {
        var _this = this;

        object = _object;
        select_title = object.search || object.movie.title;
        if (this.wait_similars && data && data[0].is_similars) return find(data[0].id);
        var search_date = object.search_date || !object.clarification && (object.movie.release_date || object.movie.first_air_date || object.movie.last_air_date) || '0000';
        var search_year = parseInt((search_date + '').slice(0, 4));
        var orig_titles = [];

        if (object.movie.alternative_titles && object.movie.alternative_titles.results) {
          orig_titles = object.movie.alternative_titles.results.map(function (t) {
            return t.title;
          });
        }

        if (object.movie.original_title) orig_titles.push(object.movie.original_title);
        if (object.movie.original_name) orig_titles.push(object.movie.original_name);
        var clean_title = component.cleanTitle(select_title).replace(/\b(\d\d\d\d+)\b/g, '+$1');
        var object_date = object.movie.release_date || object.movie.first_air_date || object.movie.last_air_date || '0000';
        var object_year = parseInt((object_date + '').slice(0, 4));

        if (object_year) {
          clean_title = clean_title.replace(new RegExp(' \\+(' + object_year + ')$'), ' $1');
        }

        var display = function display(json) {
          if (json && json.length && json.forEach) {
            var is_sure = false;
            json.forEach(function (c) {
              if (!c.orig_title) c.orig_title = c.original_title || c.original_name;
              if (!c.year && c.alt_name) c.year = parseInt(c.alt_name.split('-').pop());
            });
            var cards = json;

            if (cards.length) {
              if (orig_titles.length) {
                var tmp = cards.filter(function (c) {
                  return component.containsAnyTitle([c.orig_title, c.title], orig_titles);
                });

                if (tmp.length) {
                  cards = tmp;
                  is_sure = true;
                }
              }

              if (select_title) {
                var _tmp = cards.filter(function (c) {
                  return component.containsAnyTitle([c.title, c.orig_title], [select_title]);
                });

                if (_tmp.length) {
                  cards = _tmp;
                  is_sure = true;
                }
              }

              if (cards.length > 1 && search_year) {
                var _tmp2 = cards.filter(function (c) {
                  return c.year == search_year;
                });

                if (!_tmp2.length) _tmp2 = cards.filter(function (c) {
                  return c.year && c.year > search_year - 2 && c.year < search_year + 2;
                });
                if (_tmp2.length) cards = _tmp2;
              }
            }

            if (cards.length == 1 && is_sure) {
              if (search_year && cards[0].year) {
                is_sure = cards[0].year > search_year - 2 && cards[0].year < search_year + 2;
              }

              if (is_sure) {
                is_sure = false;

                if (orig_titles.length) {
                  is_sure |= component.equalAnyTitle([cards[0].orig_title, cards[0].title], orig_titles);
                }

                if (select_title) {
                  is_sure |= component.equalAnyTitle([cards[0].title, cards[0].orig_title], [select_title]);
                }
              }
            }

            if (cards.length == 1 && is_sure) find(cards[0].id);else if (json.length) {
              _this.wait_similars = true;
              json.forEach(function (c) {
                c.is_similars = true;
                c.seasons_count = c.last_episode && c.last_episode.season;
                c.episodes_count = c.last_episode && c.last_episode.episode;
              });
              component.similars(json);
              component.loading(false);
            } else component.emptyForQuery(select_title);
          } else component.emptyForQuery(select_title);
        };

        var siteSearch = function siteSearch() {
          var url = site + 'api/v2/suggestions?search_word=' + encodeURIComponent(clean_title);
          network.clear();
          network.timeout(15000);
          network["native"](component.proxyLink(url, prox2, prox2_enc), function (json) {
            display(json && json.posts || []);
          }, function (a, c) {
            component.empty(network.errorDecode(a, c));
          }, false, {
            headers: headers2
          });
        };

        var apiSearch = function apiSearch(abuse) {
          var url = embed + 'search' + (abuse ? abuse_token : dev_token);
          url = Lampa.Utils.addUrlComponent(url, 'story=' + encodeURIComponent(clean_title));
          url = abuse ? component.proxyLink(url, prox3, '', '') : component.proxyLink(url, prox, prox_enc, 'enc2t');
          network.clear();
          network.timeout(15000);
          network["native"](url, function (json) {
            if (json && json.length && json.forEach) display(json);else siteSearch();
          }, function (a, c) {
            if (!abuse && abuse_token) apiSearch(true);else siteSearch();
          }, false, {
            headers: headers
          });
        };

        decodeSecretToken(function () {
          return apiSearch();
        });
      };

      function find(filmix_id, abuse, abuse_error, low_quality) {
        if (!debug && !window.mod_filmix.is_max_qualitie) {
          window.mod_filmix.is_max_qualitie = true;
          token = Lampa.Storage.get('filmix_token', '') + '';
          dev_token = Utils.filmixToken(Utils.randomHex(16), token || 'aaaabbbbccccddddeeeeffffaaaabbbb');

          if (token) {
            var url = embed + 'user_profile' + dev_token;
            network.clear();
            network.timeout(15000);
            network["native"](component.proxyLink(url, prox, prox_enc, 'enc2'), function (found) {
              if (found && found.user_data) {
                window.mod_filmix.max_qualitie = 2160;
                if (found.user_data.is_pro) window.mod_filmix.max_qualitie = 1080;
                if (found.user_data.is_pro_plus) window.mod_filmix.max_qualitie = 2160;
              }

              end_search();
            }, function (a, c) {
              end_search();
            }, false, {
              headers: headers
            });
          } else end_search();
        } else end_search();

        function end_search() {
          var url = embed + 'post/' + filmix_id + (abuse ? abuse_token : dev_token);
          url = abuse ? component.proxyLink(url, prox3, '', '') : component.proxyLink(url, prox, prox_enc, 'enc2');

          var not_found = function not_found(str) {
            if (abuse && abuse_error) success(abuse_error);else if (!abuse && abuse_token) find(filmix_id, true, null, true);else if (str) component.empty(str);else component.emptyForQuery(select_title);
          };

          network.clear();
          network.timeout(15000);
          network["native"](url, function (found) {
            var pl_links = found && found.player_links || {};

            if (pl_links.movie && Object.keys(pl_links.movie).length > 0 || pl_links.playlist && Object.keys(pl_links.playlist).length > 0) {
              if (!abuse && abuse_token && checkAbuse(found)) find(filmix_id, true, found);else success(found, low_quality);
            } else {
              console.log('Filmix', 'not found:', filmix_id, pl_links.movie, pl_links.playlist);
              not_found();
            }
          }, function (a, c) {
            console.log('Filmix', 'error:', filmix_id, network.errorDecode(a, c));
            not_found(network.errorDecode(a, c));
          }, false, {
            headers: headers
          });
        }
      }

      this.extendChoice = function (saved) {
        Lampa.Arrays.extend(choice, saved, true);
      };
      /**
       * Сброс фильтра
       */


      this.reset = function () {
        component.reset();
        choice = {
          season: 0,
          voice: 0,
          voice_name: ''
        };
        filter();
        append(filtred());
        component.saveChoice(choice);
      };
      /**
       * Применить фильтр
       * @param {*} type
       * @param {*} a
       * @param {*} b
       */


      this.filter = function (type, a, b) {
        choice[a.stype] = b.index;
        if (a.stype == 'voice') choice.voice_name = filter_items.voice[b.index];
        component.reset();
        filter();
        append(filtred());
        component.saveChoice(choice);
      };
      /**
       * Уничтожить
       */


      this.destroy = function () {
        network.clear();
        extract = null;
      };
      /**
       * Успешно, есть данные
       * @param {Object} json
       */


      function success(json, low_quality) {
        component.loading(false);
        extractData(json, low_quality);
        filter();
        append(filtred());
      }

      function checkAbuse(data) {
        var pl_links = data.player_links || {};

        if (pl_links.movie && Object.keys(pl_links.movie).length > 0) {

          for (var ID in pl_links.movie) {
            var file = pl_links.movie[ID];
            var stream_url = file.link || '';

            if (file.translation === 'Заблокировано правообладателем!' && stream_url.indexOf('/abuse_') !== -1) {
              var found = stream_url.match(/https?:\/\/[^\/]+(\/s\/[^\/]*\/)/);

              if (found) {
                {
                  secret = '$1' + found[1];
                  secret_url = '';
                }

                console.log('Filmix', 'abuse:', data.id, Object.keys(pl_links.movie).length);
                return true;
              }
            }
          }
        }

        return false;
      }
      /**
       * Получить информацию о фильме
       * @param {Arrays} data
       */


      function extractData(data, low_quality) {
        extract = {};
        var filmix_max_qualitie = low_quality ? 480 : debug ? 2160 : window.mod_filmix.max_qualitie;
        var pl_links = data.player_links || {};

        if (pl_links.playlist && Object.keys(pl_links.playlist).length > 0) {
          var seasons = [];
          var seas_num = 0;

          for (var season_id in pl_links.playlist) {
            var season = pl_links.playlist[season_id];
            var voices = [];
            ++seas_num;

            for (var voice_id in season) {
              var episodes = season[voice_id];
              var items = [];
              var epis_num = 0;

              for (var episode_id in episodes) {
                var file = episodes[episode_id];
                ++epis_num;
                var quality_eps = file.qualities.filter(function (qualitys) {
                  return !isNaN(qualitys) && qualitys <= filmix_max_qualitie;
                });
                quality_eps.sort(function (a, b) {
                  return b - a;
                });
                var max_quality = quality_eps[0];

                if (max_quality) {
                  var stream_url = file.link || '';
                  stream_url = component.fixLinkProtocol(stream_url, prefer_http, true);

                  if (secret) {
                    stream_url = stream_url.replace(/(https?:\/\/[^\/]+)\/s\/[^\/]*\//, secret);
                    if (secret_url) stream_url = stream_url.replace(/^https?:\/\//, secret_url);
                  }

                  var seas_id = parseInt(season_id);
                  var epis_id = parseInt(episode_id);

                  if (isNaN(seas_id) || isNaN(epis_id)) {
                    var s_e = stream_url.substring(stream_url.lastIndexOf('/'));
                    var str_s_e = s_e.match(/s(\d+)e(\d+)_%s\.mp4/i);

                    if (str_s_e) {
                      seas_id = parseInt(str_s_e[1]);
                      epis_id = parseInt(str_s_e[2]);
                    }
                  }

                  if (isNaN(seas_id)) seas_id = seas_num;
                  if (isNaN(epis_id)) epis_id = epis_num;
                  items.push({
                    season: seas_id,
                    episode: epis_id,
                    file: stream_url,
                    quality: max_quality,
                    qualities: quality_eps
                  });
                }
              }

              if (items.length) {
                voices.push({
                  id: voice_id,
                  items: items
                });
              }
            }

            if (voices.length) {
              seasons.push({
                id: season_id,
                title: Lampa.Lang.translate('torrent_serial_season') + ' ' + (isNaN(season_id) ? seas_num : season_id),
                voices: voices
              });
            }
          }

          extract.seasons = seasons;
        } else if (pl_links.movie && Object.keys(pl_links.movie).length > 0) {
          var movies = [];

          for (var ID in pl_links.movie) {
            var _file = pl_links.movie[ID];
            var _max_quality = filmix_max_qualitie;

            var _stream_url = _file.link || '';

            _stream_url = component.fixLinkProtocol(_stream_url, prefer_http, true);

            if (secret) {
              _stream_url = _stream_url.replace(/(https?:\/\/[^\/]+)\/s\/[^\/]*\//, secret);
              if (secret_url) _stream_url = _stream_url.replace(/^https?:\/\//, secret_url);
            }

            var _quality_eps = _stream_url.match(/\[([\d,]*)\]\.mp4/i);

            if (_quality_eps) {
              _quality_eps = _quality_eps[1].split(',').map(function (quality) {
                return parseInt(quality);
              }).filter(function (quality) {
                return !isNaN(quality) && quality <= filmix_max_qualitie;
              });

              _quality_eps.sort(function (a, b) {
                return b - a;
              });

              _max_quality = _quality_eps[0];
            }

            if (_max_quality) {
              var file_url = _stream_url.replace(/\[[\d,]*\](\.mp4)/i, '%s$1');

              movies.push({
                translation: _file.translation,
                file: file_url,
                quality: _max_quality,
                qualities: _quality_eps
              });
            }
          }

          extract.movies = movies;
        }
      }
      /**
       * Найти поток
       * @param {Object} element
       * @returns string
       */


function getFile(element) {
  var media = element.media || {};
  var file = media.file;
  var quality = false;


  var linkRegex = /(\/s\/)[^\/]+/;

  if (file) {
    quality = {};

    if (media.qualities) {
      media.qualities.forEach(function (q) {
        var qFile = file.replace(/%s(\.mp4)/i, q + '$1');
        
        qFile = qFile.replace('nl03.werkecdn.me', 'nl101.werkecdn.me');
        
        quality[q + 'p'] = qFile.replace(linkRegex, '$1FHxFRj2iBEItyjvePlAQx4GkFBQUFBQXhnT1VFUlpDTUVBQ0FwNERSRUdGRTdZa0RNUnc9PQ.xY_FyANasp-s_KcNQm3jZvbHFOymvKNJNAnQ-g');
      });

      file = file.replace(/%s(\.mp4)/i, media.qualities[0] + '$1');
    }
    
    if (file) {
      file = file.replace('nl03.werkecdn.me', 'nl101.werkecdn.me');
      file = file.replace(linkRegex, '$1FHxFRj2iBEItyjvePlAQx4GkFBQUFBQXhnT1VFUlpDTUVBQ0FwNERSRUdGRTdZa0RNUnc9PQ.xY_FyANasp-s_KcNQm3jZvbHFOymvKNJNAnQ-g');
    }
  }

  return {
    file: file,
    quality: quality
  };
}
      /**
       * Построить фильтр
       */


      function filter() {
        filter_items = {
          season: extract.seasons ? extract.seasons.map(function (s) {
            return s.title;
          }) : [],
          voice: []
        };
        if (!filter_items.season[choice.season]) choice.season = 0;

        if (extract.seasons && extract.seasons[choice.season]) {
          filter_items.voice = extract.seasons[choice.season].voices.map(function (v) {
            return v.id;
          });
        }

        if (!filter_items.voice[choice.voice]) choice.voice = 0;

        if (choice.voice_name) {
          var inx = filter_items.voice.indexOf(choice.voice_name);
          if (inx == -1) choice.voice = 0;else if (inx !== choice.voice) {
            choice.voice = inx;
          }
        }

        component.filter(filter_items, choice);
      }
      /**
       * Отфильтровать файлы
       * @returns array
       */


      function filtred() {
        var filtred = [];

        if (extract.seasons) {
          var season = extract.seasons[choice.season] || {};
          var voices = season.voices || [];
          var voice = voices[choice.voice] || {};
          var voice_name = Lampa.Utils.shortText(filter_items.voice[choice.voice] || '', 50);
          var items = voice.items || [];
          items.forEach(function (media) {
            filtred.push({
              title: component.formatEpisodeTitle(media.season, media.episode),
              quality: media.quality + 'p',
              info: voice_name ? ' / ' + voice_name : '',
              season: media.season,
              episode: media.episode,
              media: media
            });
          });
        } else if (extract.movies) {
          extract.movies.forEach(function (media) {
            filtred.push({
              title: media.translation || select_title,
              quality: media.quality + 'p',
              info: '',
              media: media
            });
          });
        }

        return filtred;
      }
      /**
       * Добавить видео
       * @param {Array} items
       */


      function append(items) {
        component.reset();
        var viewed = Lampa.Storage.cache('online_view', 5000, []);
        var last_episode = component.getLastEpisode(items);
        items.forEach(function (element) {
          if (element.season) {
            element.translate_episode_end = last_episode;
            element.translate_voice = filter_items.voice[choice.voice];
          }

          var hash = Lampa.Utils.hash(element.season ? [element.season, element.season > 10 ? ':' : '', element.episode, object.movie.original_title].join('') : object.movie.original_title);
          var view = Lampa.Timeline.view(hash);
          var item = Lampa.Template.get('online_mod', element);
          var hash_file = Lampa.Utils.hash(element.season ? [element.season, element.season > 10 ? ':' : '', element.episode, object.movie.original_title, filter_items.voice[choice.voice]].join('') : object.movie.original_title + element.title);
          element.timeline = view;
          item.append(Lampa.Timeline.render(view));

          if (Lampa.Timeline.details) {
            item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
          }

          if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
          item.on('hover:enter', function () {
            if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
            var extra = getFile(element);

            if (extra.file) {
              var playlist = [];
              var first = {
                url: component.getDefaultQuality(extra.quality, extra.file),
                quality: component.renameQualityMap(extra.quality),
                timeline: element.timeline,
                title: element.season ? element.title : select_title + (element.title == select_title ? '' : ' / ' + element.title)
              };

              if (element.season) {
                items.forEach(function (elem) {
                  var ex = getFile(elem);
                  playlist.push({
                    url: component.getDefaultQuality(ex.quality, ex.file),
                    quality: component.renameQualityMap(ex.quality),
                    timeline: elem.timeline,
                    title: elem.title
                  });
                });
              } else {
                playlist.push(first);
              }

              if (playlist.length > 1) first.playlist = playlist;
              Lampa.Player.play(first);
              Lampa.Player.playlist(playlist);

              if (viewed.indexOf(hash_file) == -1) {
                viewed.push(hash_file);
                item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                Lampa.Storage.set('online_view', viewed);
              }
            } else Lampa.Noty.show(Lampa.Lang.translate('online_mod_nolink'));
          });
          component.append(item);
          component.contextmenu({
            item: item,
            view: view,
            viewed: viewed,
            hash_file: hash_file,
            element: element,
            file: function file(call) {
              call(getFile(element));
            }
          });
        });
        component.start(true);
      }
    }

    var proxyInitialized = {};
    var proxyWindow = {};
    var proxyCalls = {};
    var default_balanser = 'filmix';

    function component(object) {
      var network = new Lampa.Reguest();
      var scroll = new Lampa.Scroll({
        mask: true,
        over: true
      });
      var files = new Lampa.Explorer(object);
      var filter = new Lampa.Filter(object);
      var balanser = Lampa.Storage.get('online_mod_balanser', default_balanser) + '';
      var last_bls = Lampa.Storage.field('online_mod_save_last_balanser') === true ? Lampa.Storage.cache('online_mod_last_balanser', 200, {}) : {};
      var use_stream_proxy = Lampa.Storage.field('online_mod_use_stream_proxy') === true;
      var rezka2_prx_ukr = '//' + (Lampa.Storage.field('online_mod_rezka2_prx_ukr') || 'prx.ukrtelcdn.net') + '/';
      var rezka2_fix_stream = Lampa.Storage.field('online_mod_rezka2_fix_stream') === true;
      var prefer_http = Lampa.Storage.field('online_mod_prefer_http') === true;
      var forcedQuality = '';
      var qualityFilter = {
        title: Lampa.Lang.translate('settings_player_quality'),
        subtitle: '',
        items: [],
        stype: 'quality'
      };
      var contextmenu_all = [];

      if (last_bls[object.movie.id]) {
        balanser = last_bls[object.movie.id];
      }

      this.proxy = function (name) {
        return Utils.proxy(name);
      };

      this.fixLink = function (link, referrer) {
        return Utils.fixLink(link, referrer);
      };

      this.fixLinkProtocol = function (link, prefer_http, replace_protocol) {
        return Utils.fixLinkProtocol(link, prefer_http, replace_protocol);
      };

      this.proxyLink = function (link, proxy, proxy_enc, enc) {
        return Utils.proxyLink(link, proxy, proxy_enc, enc);
      };

      this.proxyStream = function (url, name) {
        if (url && use_stream_proxy) {
          if (name === 'lumex') return url;

          if (name === 'rezka2') {
            return url.replace(/\/\/(stream\.voidboost\.(cc|top|link|club)|[^\/]*.ukrtelcdn.net|vdbmate.org|sambray.org|rumbegg.org|laptostack.org|frntroy.org|femeretes.org)\//, rezka2_prx_ukr);
          }

          return (prefer_http ? 'http://apn.cfhttp.top/' : 'https://apn.watch/') + url;
        }

        if (url && rezka2_fix_stream && name === 'rezka2') {
          return url.replace(/\/\/(stream\.voidboost\.(cc|top|link|club)|[^\/]*.ukrtelcdn.net)\//, '//femeretes.org/');
        }

        return url;
      };

      this.processSubs = function (url) {
        return url;
      };

      this.proxyStreamSubs = function (url, name) {
        if (name === 'lumex') return url;
        var srtUrl = this.processSubs(url);
        if (srtUrl !== url) return srtUrl;
        return this.proxyStream(url, name);
      };

      this.checkMyIp = function (onComplite) {
        Utils.checkMyIp(network, onComplite);
      };

      var last;
      var extended;
      var selected_id;
      var filter_translate = {
        season: Lampa.Lang.translate('torrent_serial_season'),
        voice: Lampa.Lang.translate('torrent_parser_voice'),
        source: Lampa.Lang.translate('settings_rest_source')
      };
      var disable_dbg = !Utils.isDebug();
      var isAndroid = Lampa.Platform.is('android');
      isAndroid && Utils.checkAndroidVersion(339);
      var collapsBlocked = (!startsWith(window.location.protocol, 'http') || window.location.hostname.indexOf('lampa') !== -1) && disable_dbg;
      var all_sources = [{
        name: 'filmix',
        title: 'Filmix',
        source: new filmix(this, object),
        search: true,
        kp: false,
        imdb: false
      }];
      var obj_filter_sources = all_sources.filter(function (s) {
        return !s.disabled;
      });
      var filter_sources = obj_filter_sources.map(function (s) {
        return s.name;
      });
      var sources = {};
      obj_filter_sources.forEach(function (s) {
        sources[s.name] = s.source;
      });
      var search_sources = all_sources.filter(function (s) {
        return s.search;
      }).map(function (s) {
        return s.name;
      });
      var kp_sources = all_sources.filter(function (s) {
        return s.kp;
      }).map(function (s) {
        return s.name;
      });
      var imdb_sources = all_sources.filter(function (s) {
        return s.imdb;
      }).map(function (s) {
        return s.name;
      }); // шаловливые ручки

      if (filter_sources.indexOf(balanser) == -1) {
        balanser = default_balanser;

        if (filter_sources.indexOf(balanser) == -1) {
          balanser = filter_sources[0];
        }

        Lampa.Storage.set('online_mod_balanser', balanser);
      }

      scroll.body().addClass('torrent-list');
      scroll.minus(files.render().find('.explorer__files-head'));
      /**
       * Подготовка
       */

      this.create = function () {
        var _this = this;

        this.activity.loader(true);

        filter.onSearch = function (value) {
          Lampa.Activity.replace({
            search: value,
            search_date: '',
            clarification: true
          });
        };

        filter.onBack = function () {
          _this.start();
        };

        filter.onSelect = function (type, a, b) {
          if (type == 'filter') {
            if (a.reset) {
              if (extended) sources[balanser].reset();else _this.start();
            } else if (a.stype == 'source') {
              _this.changeBalanser(filter_sources[b.index]);
            } else if (a.stype == 'quality') {
              forcedQuality = b.title;

              _this.updateQualityFilter();
            } else {
              sources[balanser].filter(type, a, b);
            }
          } else if (type == 'sort') {
            _this.changeBalanser(a.source);
          }
        };

        filter.render().find('.filter--sort span').text(Lampa.Lang.translate('online_mod_balanser'));
        files.appendHead(filter.render());
        files.appendFiles(scroll.render());
        this.search();
        return this.render();
      };

      this.changeBalanser = function (balanser_name) {
        balanser = balanser_name;
        Lampa.Storage.set('online_mod_balanser', balanser);
        last_bls[object.movie.id] = balanser;

        if (Lampa.Storage.field('online_mod_save_last_balanser') === true) {
          Lampa.Storage.set('online_mod_last_balanser', last_bls);
        }

        this.search();
        setTimeout(this.closeFilter, 10);
      };

      this.updateQualityFilter = function () {
        var preferably = forcedQuality;

        if (!preferably) {
          preferably = Lampa.Storage.get('video_quality_default', '1080') + 'p';
          if (preferably === '1080p') preferably = '1080p Ultra';
        }

        var items = ['2160p', '1440p', '1080p Ultra', '1080p', '720p', '480p'].map(function (quality, i) {
          return {
            title: quality,
            selected: quality === preferably,
            index: i
          };
        });
        qualityFilter.subtitle = preferably;
        qualityFilter.items = items;
        setTimeout(this.closeFilter, 10);
      };
      /**
       * Начать поиск
       */


      this.search = function () {
        this.activity.loader(true);
        this.filter({
          source: filter_sources
        }, {
          source: 0
        });
        this.reset();
        this.find();
      };

      this.cleanTitle = function (str) {
        return str.replace(/[\s.,:;’'`!?]+/g, ' ').trim();
      };

      this.kpCleanTitle = function (str) {
        return this.cleanTitle(str).replace(/^[ \/\\]+/, '').replace(/[ \/\\]+$/, '').replace(/\+( *[+\/\\])+/g, '+').replace(/([+\/\\] *)+\+/g, '+').replace(/( *[\/\\]+ *)+/g, '+');
      };

      this.normalizeTitle = function (str) {
        return this.cleanTitle(str.toLowerCase().replace(/[\-\u2010-\u2015\u2E3A\u2E3B\uFE58\uFE63\uFF0D]+/g, '-').replace(/ё/g, 'е'));
      };

      this.equalTitle = function (t1, t2) {
        return typeof t1 === 'string' && typeof t2 === 'string' && this.normalizeTitle(t1) === this.normalizeTitle(t2);
      };

      this.containsTitle = function (str, title) {
        return typeof str === 'string' && typeof title === 'string' && this.normalizeTitle(str).indexOf(this.normalizeTitle(title)) !== -1;
      };

      this.equalAnyTitle = function (strings, titles) {
        var _this2 = this;

        return titles.some(function (title) {
          return title && strings.some(function (str) {
            return str && _this2.equalTitle(str, title);
          });
        });
      };

      this.containsAnyTitle = function (strings, titles) {
        var _this3 = this;

        return titles.some(function (title) {
          return title && strings.some(function (str) {
            return str && _this3.containsTitle(str, title);
          });
        });
      };

      this.uniqueNamesShortText = function (names, limit) {
        var unique = [];
        names.forEach(function (name) {
          if (name && unique.indexOf(name) == -1) unique.push(name);
        });

        if (limit && unique.length > 1) {
          var length = 0;
          var limit_index = -1;
          var last_index = unique.length - 1;
          unique.forEach(function (name, index) {
            length += name.length;
            if (limit_index == -1 && length > limit - (index == last_index ? 0 : 5)) limit_index = index;
            length += 2;
          });

          if (limit_index != -1) {
            unique = unique.splice(0, Math.max(limit_index, 1));
            unique.push('...');
          }
        }

        return unique.join(', ');
      };

      this.decodeHtml = function (html) {
        var text = document.createElement("textarea");
        text.innerHTML = html;
        return text.value;
      };

      this.vcdn_api_search = function (api, data, callback, error) {
        var prox = this.proxy('lumex_api');
        var url = 'https://portal.lumex.host/api/';
        network.clear();
        network.timeout(1000 * 20);
        network["native"](this.proxyLink(url + api, prox, '', 'enc2'), function (json) {
          if (json.data && json.data.length) data = data.concat(json.data);
          if (callback) callback(data);
        }, function (a, c) {
          if (a.status == 404 && a.responseJSON && a.responseJSON.result === false || a.status == 0 && a.statusText !== 'timeout') {
            if (callback) callback(data);
          } else if (error) error(network.errorDecode(a, c));
        });
      };

      this.kp_api_search = function (api, callback, error) {
        KP.clear();
        KP.getFromCache(api, function (json, cached) {
          var items = [];
          if (json.items && json.items.length) items = json.items;else if (json.films && json.films.length) items = json.films;
          if (!cached && items.length) KP.setCache(api, json);
          if (callback) callback(items);
        }, function (a, c) {
          if (error) error(network.errorDecode(a, c));
        });
      };

      this.find = function () {
        var _this4 = this;

        var query = object.search || object.movie.title;
        var search_date = object.search_date || !object.clarification && (object.movie.release_date || object.movie.first_air_date || object.movie.last_air_date) || '0000';
        var search_year = parseInt((search_date + '').slice(0, 4));
        var orig_titles = [];

        if (object.movie.alternative_titles && object.movie.alternative_titles.results) {
          orig_titles = object.movie.alternative_titles.results.map(function (t) {
            return t.title;
          });
        }

        if (object.movie.original_title) orig_titles.push(object.movie.original_title);
        if (object.movie.original_name) orig_titles.push(object.movie.original_name);

        var display = function display(items) {
          if (items && items.length && items.forEach) {
            var is_sure = false;
            var is_imdb = false;
            items.forEach(function (c) {
              if (c.start_date === '1969-12-31') c.start_date = '';
              if (c.year === '1969-12-31') c.year = '';
              var year = c.start_date || c.year || '0000';
              c.tmp_year = parseInt((year + '').slice(0, 4));
            });

            if (!object.clarification && (object.movie.imdb_id || +object.movie.kinopoisk_id)) {
              var imdb_id = object.movie.imdb_id;
              var kp_id = +object.movie.kinopoisk_id;
              var tmp = items.filter(function (c) {
                return imdb_id && (c.imdb_id || c.imdbId) == imdb_id || kp_id && (c.kp_id || c.kinopoisk_id || c.kinopoiskId || c.filmId) == kp_id;
              });

              if (tmp.length) {
                items = tmp;
                is_sure = true;
                is_imdb = true;
              }
            }

            var cards = items;

            if (cards.length) {
              if (orig_titles.length) {
                var _tmp = cards.filter(function (c) {
                  return _this4.containsAnyTitle([c.orig_title || c.nameOriginal, c.en_title || c.nameEn, c.title || c.ru_title || c.nameRu], orig_titles);
                });

                if (_tmp.length) {
                  cards = _tmp;
                  is_sure = true;
                }
              }

              if (query) {
                var _tmp2 = cards.filter(function (c) {
                  return _this4.containsAnyTitle([c.title || c.ru_title || c.nameRu, c.en_title || c.nameEn, c.orig_title || c.nameOriginal], [query]);
                });

                if (_tmp2.length) {
                  cards = _tmp2;
                  is_sure = true;
                }
              }

              if (cards.length > 1 && search_year) {
                var _tmp3 = cards.filter(function (c) {
                  return c.tmp_year == search_year;
                });

                if (!_tmp3.length) _tmp3 = cards.filter(function (c) {
                  return c.tmp_year && c.tmp_year > search_year - 2 && c.tmp_year < search_year + 2;
                });
                if (_tmp3.length) cards = _tmp3;
              }
            }

            if (cards.length == 1 && is_sure && !is_imdb) {
              if (search_year && cards[0].tmp_year) {
                is_sure = cards[0].tmp_year > search_year - 2 && cards[0].tmp_year < search_year + 2;
              }

              if (is_sure) {
                is_sure = false;

                if (orig_titles.length) {
                  is_sure |= _this4.equalAnyTitle([cards[0].orig_title || cards[0].nameOriginal, cards[0].en_title || cards[0].nameEn, cards[0].title || cards[0].ru_title || cards[0].nameRu], orig_titles);
                }

                if (query) {
                  is_sure |= _this4.equalAnyTitle([cards[0].title || cards[0].ru_title || cards[0].nameRu, cards[0].en_title || cards[0].nameEn, cards[0].orig_title || cards[0].nameOriginal], [query]);
                }
              }
            }

            if (cards.length == 1 && is_sure) {
              _this4.extendChoice();

              sources[balanser].search(object, cards[0].kp_id || cards[0].kinopoisk_id || cards[0].kinopoiskId || cards[0].filmId || cards[0].imdb_id, cards);
            } else {
              items.forEach(function (c) {
                if (c.episodes) {
                  var season_count = 1;
                  c.episodes.forEach(function (episode) {
                    if (episode.season_num > season_count) {
                      season_count = episode.season_num;
                    }
                  });
                  c.seasons_count = season_count;
                  c.episodes_count = c.episodes.length;
                }
              });

              _this4.similars(items);

              _this4.loading(false);
            }
          } else _this4.emptyForQuery(query);
        };

        var vcdn_search_by_title = function vcdn_search_by_title(callback, error) {
          var params = Lampa.Utils.addUrlComponent('', Utils.vcdnToken());
          params = Lampa.Utils.addUrlComponent(params, 'query=' + encodeURIComponent(query));
          params = Lampa.Utils.addUrlComponent(params, 'field=title');

          _this4.vcdn_api_search('movies' + params, [], function (data) {
            _this4.vcdn_api_search('animes' + params, data, function (data) {
              _this4.vcdn_api_search('tv-series' + params, data, function (data) {
                _this4.vcdn_api_search('anime-tv-series' + params, data, function (data) {
                  _this4.vcdn_api_search('show-tv-series' + params, data, callback, error);
                }, error);
              }, error);
            }, error);
          }, error);
        };

        var vcdn_search_by_id = function vcdn_search_by_id(callback, error) {
          if (!object.clarification && (object.movie.imdb_id || +object.movie.kinopoisk_id)) {
            var params = Lampa.Utils.addUrlComponent('', Utils.vcdnToken());
            var imdb_params = object.movie.imdb_id ? Lampa.Utils.addUrlComponent(params, 'imdb_id=' + encodeURIComponent(object.movie.imdb_id)) : '';
            var kp_params = +object.movie.kinopoisk_id ? Lampa.Utils.addUrlComponent(params, 'kinopoisk_id=' + encodeURIComponent(+object.movie.kinopoisk_id)) : '';

            _this4.vcdn_api_search('short' + (imdb_params || kp_params), [], function (data) {
              if (data && data.length) callback(data);else if (imdb_params && kp_params) {
                _this4.vcdn_api_search('short' + kp_params, [], callback, error);
              } else callback([]);
            }, error);
          } else callback([]);
        };

        var vcdn_search = function vcdn_search(fallback) {
          var error = function error() {
            if (fallback) fallback();else display([]);
          };

          vcdn_search_by_id(function (data) {
            if (data && data.length && data.forEach) display(data);else vcdn_search_by_title(function (data) {
              if (data && data.length && data.forEach) display(data);else error();
            }, error);
          }, error);
        };

        var kp_search_by_title = function kp_search_by_title(callback, error) {
          var url = 'api/v2.1/films/search-by-keyword?keyword=' + encodeURIComponent(_this4.kpCleanTitle(query));

          _this4.kp_api_search(url, callback, error);
        };

        var kp_search_by_id = function kp_search_by_id(callback, error) {
          if (!object.clarification && object.movie.imdb_id) {
            var url = 'api/v2.2/films?imdbId=' + encodeURIComponent(object.movie.imdb_id);

            _this4.kp_api_search(url, callback, error);
          } else callback([]);
        };

        var kp_search = function kp_search(fallback) {
          var error = function error() {
            if (fallback) fallback();else display([]);
          };

          kp_search_by_id(function (data) {
            if (data && data.length && data.forEach) display(data);else kp_search_by_title(function (data) {
              if (data && data.length && data.forEach) display(data);else error();
            }, error);
          }, error);
        };

        var vcdn_search_imdb = function vcdn_search_imdb() {
          var error = function error() {
            if (imdb_sources.indexOf(balanser) >= 0) {
              _this4.extendChoice();

              sources[balanser].search(object, object.movie.imdb_id);
            } else if (search_sources.indexOf(balanser) >= 0) {
              _this4.extendChoice();

              sources[balanser].search(object);
            } else {
              var error2 = function error2() {
                display([]);
              };

              kp_search_by_title(function (data) {
                if (data && data.length && data.forEach) display(data);else error2();
              }, error2);
            }
          };

          vcdn_search_by_id(function (data) {
            if (data && data.length && data.forEach) display(data);else error();
          }, error);
        };

        var kp_search_imdb = function kp_search_imdb() {
          kp_search_by_id(function (data) {
            if (data && data.length && data.forEach) display(data);else vcdn_search_imdb();
          }, vcdn_search_imdb);
        };

        var letgo = function letgo() {
          if (!object.clarification && +object.movie.kinopoisk_id && kp_sources.indexOf(balanser) >= 0) {
            _this4.extendChoice();

            sources[balanser].search(object, +object.movie.kinopoisk_id);
          } else if (!object.clarification && object.movie.imdb_id && kp_sources.indexOf(balanser) >= 0) {
            kp_search_imdb();
          } else if (search_sources.indexOf(balanser) >= 0) {
            _this4.extendChoice();

            sources[balanser].search(object);
          } else {
            if (balanser == 'lumex' || balanser == 'lumex2') {
              var fallback = function fallback() {
                if (!object.clarification && (+object.movie.kinopoisk_id || object.movie.imdb_id)) {
                  _this4.extendChoice();

                  sources[balanser].search(object, +object.movie.kinopoisk_id || object.movie.imdb_id);
                } else if (Lampa.Storage.field('online_mod_skip_kp_search') !== true) kp_search();else display([]);
              };

              vcdn_search(fallback);
            } else kp_search(vcdn_search);
          }
        };

        if (!object.movie.imdb_id && (object.movie.source == 'tmdb' || object.movie.source == 'cub') && (imdb_sources.indexOf(balanser) >= 0 || kp_sources.indexOf(balanser) >= 0)) {
          var tmdburl = (object.movie.name ? 'tv' : 'movie') + '/' + object.movie.id + '/external_ids?api_key=4ef0d7355d9ffb5151e987764708ce96&language=ru';
          var baseurl = typeof Lampa.TMDB !== 'undefined' ? Lampa.TMDB.api(tmdburl) : 'http://api.themoviedb.org/3/' + tmdburl;
          network.clear();
          network.timeout(1000 * 15);
          network.silent(baseurl, function (ttid) {
            object.movie.imdb_id = ttid.imdb_id;
            letgo();
          }, function (a, c) {
            letgo();
          });
        } else {
          letgo();
        }
      };

      this.parsePlaylist = function (str) {
        var pl = [];

        try {
          if (startsWith(str, '[')) {
            str.substring(1).split(/, *\[/).forEach(function (item) {
              item = item.trim();
              if (endsWith(item, ',')) item = item.substring(0, item.length - 1).trim();
              var label_end = item.indexOf(']');

              if (label_end >= 0) {
                var label = item.substring(0, label_end).trim();

                if (item.charAt(label_end + 1) === '{') {
                  item.substring(label_end + 2).split(/; *\{/).forEach(function (voice_item) {
                    voice_item = voice_item.trim();
                    if (endsWith(voice_item, ';')) voice_item = voice_item.substring(0, voice_item.length - 1).trim();
                    var voice_end = voice_item.indexOf('}');

                    if (voice_end >= 0) {
                      var voice = voice_item.substring(0, voice_end).trim();
                      pl.push({
                        label: label,
                        voice: voice,
                        links: voice_item.substring(voice_end + 1).split(' or ').map(function (link) {
                          return link.trim();
                        }).filter(function (link) {
                          return link;
                        })
                      });
                    }
                  });
                } else {
                  pl.push({
                    label: label,
                    links: item.substring(label_end + 1).split(' or ').map(function (link) {
                      return link.trim();
                    }).filter(function (link) {
                      return link;
                    })
                  });
                }
              }
            });
            pl = pl.filter(function (item) {
              return item.links.length;
            });
          }
        } catch (e) {}

        return pl;
      };

      this.parseM3U = function (str) {
        var pl = [];

        try {
          var xstream = false;
          var bandwidth = 0;
          var width = 0;
          var height = 0;
          var codecs = '';
          str.split('\n').forEach(function (line) {
            line = line.trim();

            if (startsWith(line, '#')) {
              if (startsWith(line, '#EXT-X-STREAM-INF')) {
                xstream = true;
                var BANDWIDTH = line.match(/\bBANDWIDTH=(\d+)\b/);

                if (BANDWIDTH) {
                  bandwidth = BANDWIDTH[1];
                }

                var RESOLUTION = line.match(/\bRESOLUTION=(\d+)x(\d+)\b/);

                if (RESOLUTION) {
                  width = parseInt(RESOLUTION[1]);
                  height = parseInt(RESOLUTION[2]);
                }

                var CODECS = line.match(/\bCODECS="([^"]+)"/);

                if (CODECS) {
                  codecs = CODECS[1];
                }
              }
            } else if (line.length) {
              pl.push({
                xstream: xstream,
                bandwidth: bandwidth,
                width: width,
                height: height,
                codecs: codecs,
                link: line
              });
              xstream = false;
              bandwidth = 0;
              width = 0;
              height = 0;
              codecs = '';
            }
          });
        } catch (e) {}

        return pl;
      };

      this.formatEpisodeTitle = function (s_num, e_num, name) {
        var title = '';
        var full = Lampa.Storage.field('online_mod_full_episode_title') === true;

        if (s_num != null && s_num !== '') {
          title = (full ? Lampa.Lang.translate('torrent_serial_season') + ' ' : 'S') + s_num + ' / ';
        }

        if (name == null || name === '') name = Lampa.Lang.translate('torrent_serial_episode') + ' ' + e_num;else if (e_num != null && e_num !== '') name = Lampa.Lang.translate('torrent_serial_episode') + ' ' + e_num + ' - ' + name;
        title += name;
        return title;
      };

      this.proxyUrlCall = function (proxy_url, method, url, timeout, post_data, call_success, call_fail, withCredentials) {
        proxy_url = this.proxy('iframe') + proxy_url;

        var process = function process() {
          if (proxyWindow[proxy_url]) {
            timeout = timeout || 60 * 1000;
            var message_id;

            try {
              message_id = crypto.getRandomValues(new Uint8Array(16)).toString();
            } catch (e) {}

            if (!message_id) message_id = Math.random().toString();
            proxyCalls[message_id] = {
              success: call_success,
              fail: call_fail
            };
            proxyWindow[proxy_url].postMessage({
              message: 'proxyMessage',
              message_id: message_id,
              method: method,
              url: url,
              timeout: timeout,
              post_data: post_data,
              withCredentials: withCredentials
            }, '*');
            setTimeout(function () {
              var call = proxyCalls[message_id];

              if (call) {
                delete proxyCalls[message_id];
                if (call.fail) call.fail({
                  status: 0,
                  statusText: 'timeout',
                  responseText: ''
                }, 'timeout');
              }
            }, timeout + 1000);
          } else {
            if (call_fail) call_fail({
              status: 0,
              statusText: 'abort',
              responseText: ''
            }, 'abort');
          }
        };

        if (!proxyInitialized[proxy_url]) {
          proxyInitialized[proxy_url] = true;
          var proxyOrigin = proxy_url.replace(/(https?:\/\/[^\/]+)\/.*/, '$1');
          var proxyIframe = document.createElement('iframe');
          proxyIframe.setAttribute('src', proxy_url);
          proxyIframe.setAttribute('width', '0');
          proxyIframe.setAttribute('height', '0');
          proxyIframe.setAttribute('tabindex', '-1');
          proxyIframe.setAttribute('title', 'empty');
          proxyIframe.setAttribute('style', 'display:none');
          proxyIframe.addEventListener('load', function () {
            proxyWindow[proxy_url] = proxyIframe.contentWindow;
            window.addEventListener('message', function (event) {
              var data = event.data;

              if (event.origin === proxyOrigin && data && data.message === 'proxyResponse' && data.message_id) {
                var call = proxyCalls[data.message_id];

                if (call) {
                  delete proxyCalls[data.message_id];

                  if (data.status === 200) {
                    if (call.success) call.success(data.responseText);
                  } else {
                    if (call.fail) call.fail({
                      status: data.status,
                      statusText: data.statusText,
                      responseText: data.responseText
                    });
                  }
                }
              }
            });
            if (process) process();
            process = null;
          });
          document.body.appendChild(proxyIframe);
          setTimeout(function () {
            if (process) process();
            process = null;
          }, 10000);
        } else {
          process();
        }
      };

      this.proxyCall = function (method, url, timeout, post_data, call_success, call_fail, withCredentials) {
        var proxy_url = (window.location.protocol === 'https:' ? 'https://' : 'http://') + 'nb557.surge.sh/proxy.html';
        this.proxyUrlCall(proxy_url, method, url, timeout, post_data, call_success, call_fail, withCredentials);
      };

      this.proxyCall2 = function (method, url, timeout, post_data, call_success, call_fail, withCredentials) {
        var proxy_url = (window.location.protocol === 'https:' ? 'https://' : 'http://') + 'lampa.stream/proxy.html';
        this.proxyUrlCall(proxy_url, method, url, timeout, post_data, call_success, call_fail, withCredentials);
      };

      this.proxyCall3 = function (method, url, timeout, post_data, call_success, call_fail, withCredentials) {
        var proxy_url = 'https://nb557.github.io/plugins/proxy.html';
        this.proxyUrlCall(proxy_url, method, url, timeout, post_data, call_success, call_fail, withCredentials);
      };

      this.extendChoice = function () {
        var data = Lampa.Storage.cache('online_mod_choice_' + balanser, 500, {});
        var save = data[selected_id || object.movie.id] || {};
        extended = true;
        sources[balanser].extendChoice(save);
      };

      this.saveChoice = function (choice) {
        var data = Lampa.Storage.cache('online_mod_choice_' + balanser, 500, {});
        data[selected_id || object.movie.id] = choice;
        Lampa.Storage.set('online_mod_choice_' + balanser, data);
      };
      /**
       * Есть похожие карточки
       * @param {Object} json
       */


      this.similars = function (json, search_more, more_params) {
        var _this5 = this;

        json.forEach(function (elem) {
          var title = elem.title || elem.ru_title || elem.nameRu || elem.en_title || elem.nameEn || elem.orig_title || elem.nameOriginal;
          var orig_title = elem.orig_title || elem.nameOriginal || elem.en_title || elem.nameEn;
          var year = elem.start_date || elem.year || '';
          var info = [];
          if (orig_title && orig_title != elem.title) info.push(orig_title);
          if (elem.seasons_count) info.push(Lampa.Lang.translate('online_mod_seasons_count') + ': ' + elem.seasons_count);
          if (elem.episodes_count) info.push(Lampa.Lang.translate('online_mod_episodes_count') + ': ' + elem.episodes_count);
          elem.title = title;
          elem.quality = year ? (year + '').slice(0, 4) : '----';
          elem.info = info.length ? ' / ' + info.join(' / ') : '';
          var item = Lampa.Template.get('online_mod_folder', elem);
          item.on('hover:enter', function () {
            _this5.activity.loader(true);

            _this5.reset();

            object.search = elem.title;
            object.search_date = year;
            selected_id = elem.id;

            _this5.extendChoice();

            sources[balanser].search(object, elem.kp_id || elem.kinopoisk_id || elem.kinopoiskId || elem.filmId || elem.imdb_id, [elem]);
          });

          _this5.append(item);
        });

        if (search_more) {
          var elem = {
            title: Lampa.Lang.translate('online_mod_show_more'),
            quality: '...',
            info: ''
          };
          var item = Lampa.Template.get('online_mod_folder', elem);
          item.on('hover:enter', function () {
            _this5.activity.loader(true);

            _this5.reset();

            search_more(more_params);
          });
          this.append(item);
        }
      };
      /**
       * Очистить список файлов
       */


      this.reset = function () {
        contextmenu_all = [];
        last = filter.render().find('.selector').eq(0)[0];
        scroll.render().find('.empty').remove();
        scroll.clear();
        scroll.reset();
      };

      this.inActivity = function () {
        var body = $('body');
        return !(body.hasClass('settings--open') || body.hasClass('menu--open') || body.hasClass('keyboard-input--visible') || body.hasClass('selectbox--open') || body.hasClass('search--open') || body.hasClass('ambience--enable') || $('div.modal').length);
      };
      /**
       * Загрузка
       */


      this.loading = function (status) {
        if (status) this.activity.loader(true);else {
          this.activity.loader(false);
          if (Lampa.Activity.active().activity === this.activity && this.inActivity()) this.activity.toggle();
        }
      };

      this.getDefaultQuality = function (qualityMap, defValue) {
        {
          var needHackHlsLink = function needHackHlsLink(link) {
            return link && endsWith(link, '.m3u8') && link.lastIndexOf('?') <= link.lastIndexOf('/');
          };

          if (qualityMap) {
            for (var ID in qualityMap) {
              if (needHackHlsLink(qualityMap[ID])) {
                qualityMap[ID] += '?';
              }
            }
          }

          if (needHackHlsLink(defValue)) {
            defValue += '?';
          }
        }

        if (qualityMap) {
          var preferably = forcedQuality;

          if (!preferably) {
            preferably = Lampa.Storage.get('video_quality_default', '1080') + 'p';
            if (preferably === '1080p') preferably = '1080p Ultra';
          }

          var items = ['2160p', '2160', '4K', '1440p', '1440', '2K', '1080p Ultra', '1080p', '1080', '720p', '720', '480p', '480', '360p', '360', '240p', '240'];
          var idx = items.indexOf(preferably);

          if (idx !== -1) {
            for (var i = idx; i < items.length; i++) {
              var item = items[i];
              if (qualityMap[item]) return qualityMap[item];
            }

            for (var _i = idx - 1; _i >= 0; _i--) {
              var _item = items[_i];
              if (qualityMap[_item]) return qualityMap[_item];
            }
          }
        }

        return defValue;
      };

      this.renameQualityMap = function (qualityMap) {
        if (!qualityMap) return qualityMap;
        var renamed = {};

        for (var label in qualityMap) {
          renamed["\u200B" + label] = qualityMap[label];
        }

        return renamed;
      };
      /**
       * Построить фильтр
       */


      this.filter = function (filter_items, choice) {
        var select = [];

        var add = function add(type, title) {
          var need = Lampa.Storage.get('online_mod_filter', '{}');
          var items = filter_items[type];
          var subitems = [];
          var value = need[type];
          items.forEach(function (name, i) {
            subitems.push({
              title: name,
              selected: value == i,
              index: i
            });
          });
          select.push({
            title: title,
            subtitle: items[value],
            items: subitems,
            stype: type
          });
        };

        choice.source = filter_sources.indexOf(balanser);
        Lampa.Storage.set('online_mod_filter', choice);
        select.push({
          title: Lampa.Lang.translate('torrent_parser_reset'),
          reset: true
        });
        filter_items.source = obj_filter_sources.map(function (s) {
          return s.title;
        });
        add('source', Lampa.Lang.translate('online_mod_balanser'));
        if (filter_items.voice && filter_items.voice.length) add('voice', Lampa.Lang.translate('torrent_parser_voice'));
        if (filter_items.season && filter_items.season.length) add('season', Lampa.Lang.translate('torrent_serial_season'));
        if (filter_items.server && filter_items.server.length) add('server', Lampa.Lang.translate('online_mod_server'));
        this.updateQualityFilter();
        select.push(qualityFilter);
        filter.set('filter', select);
        filter.set('sort', obj_filter_sources.map(function (e) {
          return {
            source: e.name,
            title: e.title,
            selected: e.name === balanser
          };
        }));
        this.selected(filter_items);
      };
      /**
       * Закрыть фильтр
       */


      this.closeFilter = function () {
        if ($('body').hasClass('selectbox--open')) Lampa.Select.close();
      };
      /**
       * Показать что выбрано в фильтре
       */


      this.selected = function (filter_items) {
        var need = Lampa.Storage.get('online_mod_filter', '{}'),
            select = [];

        for (var i in need) {
          if (i !== 'source' && filter_translate[i] && filter_items[i] && filter_items[i].length > 1) {
            select.push(filter_translate[i] + ': ' + filter_items[i][need[i]]);
          }
        }

        var source_obj = obj_filter_sources.filter(function (e) {
          return e.name === balanser;
        })[0];
        filter.chosen('filter', select);
        filter.chosen('sort', [source_obj ? source_obj.title : balanser]);
      };
      /**
       * Добавить файл
       */


      this.append = function (item) {
        item.on('hover:focus', function (e) {
          last = e.target;
          scroll.update($(e.target), true);
        });
        scroll.append(item);
      };
      /**
       * Меню
       */


      this.contextmenu = function (params) {
        contextmenu_all.push(params);
        params.item.on('hover:long', function () {
          function selectQuality(title, callback) {
            return function (extra) {
              if (extra.quality) {
                var qual = [];

                for (var i in extra.quality) {
                  qual.push({
                    title: i,
                    file: extra.quality[i]
                  });
                }

                Lampa.Select.show({
                  title: title,
                  items: qual,
                  onBack: function onBack() {
                    Lampa.Controller.toggle(enabled);
                  },
                  onSelect: callback
                });
              } else callback(null, extra);
            };
          }

          var enabled = Lampa.Controller.enabled().name;
          var menu = [{
            title: Lampa.Lang.translate('torrent_parser_label_title'),
            mark: true
          }, {
            title: Lampa.Lang.translate('torrent_parser_label_cancel_title'),
            clearmark: true
          }, {
            title: Lampa.Lang.translate('online_mod_clearmark_all'),
            clearmark_all: true
          }, {
            title: Lampa.Lang.translate('time_reset'),
            timeclear: true
          }, {
            title: Lampa.Lang.translate('online_mod_timeclear_all'),
            timeclear_all: true
          }];

          if (Lampa.Platform.is('webos')) {
            menu.push({
              title: Lampa.Lang.translate('player_lauch') + ' - Webos',
              player: 'webos'
            });
          }

          if (Lampa.Platform.is('android')) {
            menu.push({
              title: Lampa.Lang.translate('player_lauch') + ' - Android',
              player: 'android'
            });
          }

          menu.push({
            title: Lampa.Lang.translate('player_lauch') + ' - Lampa',
            player: 'lampa'
          });

          if (params.file) {
            menu.push({
              title: Lampa.Lang.translate('copy_link'),
              copylink: true
            });
          }

          if (Lampa.Account.working() && params.element && typeof params.element.season !== 'undefined' && Lampa.Account.subscribeToTranslation) {
            menu.push({
              title: Lampa.Lang.translate('online_mod_voice_subscribe'),
              subscribe: true
            });
          }

          Lampa.Select.show({
            title: Lampa.Lang.translate('title_action'),
            items: menu,
            onBack: function onBack() {
              Lampa.Controller.toggle(enabled);
            },
            onSelect: function onSelect(a) {
              if (a.clearmark) {
                Lampa.Arrays.remove(params.viewed, params.hash_file);
                Lampa.Storage.set('online_view', params.viewed);
                params.item.find('.torrent-item__viewed').remove();
              }

              if (a.clearmark_all) {
                contextmenu_all.forEach(function (params) {
                  Lampa.Arrays.remove(params.viewed, params.hash_file);
                  Lampa.Storage.set('online_view', params.viewed);
                  params.item.find('.torrent-item__viewed').remove();
                });
              }

              if (a.mark) {
                if (params.viewed.indexOf(params.hash_file) == -1) {
                  params.viewed.push(params.hash_file);
                  params.item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                  Lampa.Storage.set('online_view', params.viewed);
                }
              }

              if (a.timeclear) {
                params.view.percent = 0;
                params.view.time = 0;
                params.view.duration = 0;
                Lampa.Timeline.update(params.view);
              }

              if (a.timeclear_all) {
                contextmenu_all.forEach(function (params) {
                  params.view.percent = 0;
                  params.view.time = 0;
                  params.view.duration = 0;
                  Lampa.Timeline.update(params.view);
                });
              }

              Lampa.Controller.toggle(enabled);

              if (a.player) {
                Lampa.Player.runas(a.player);
                params.item.trigger('hover:enter', {
                  runas: a.player
                });
              }

              if (a.copylink) {
                params.file(selectQuality('Ссылки', function (b, extra) {
                  Lampa.Utils.copyTextToClipboard(b && b.file || extra && extra.file, function () {
                    Lampa.Noty.show(Lampa.Lang.translate('copy_secuses'));
                  }, function () {
                    Lampa.Noty.show(Lampa.Lang.translate('copy_error'));
                  });
                }));
              }

              if (a.subscribe) {
                Lampa.Account.subscribeToTranslation({
                  card: object.movie,
                  season: params.element.season,
                  episode: params.element.translate_episode_end,
                  voice: params.element.translate_voice
                }, function () {
                  Lampa.Noty.show(Lampa.Lang.translate('online_mod_voice_success'));
                }, function () {
                  Lampa.Noty.show(Lampa.Lang.translate('online_mod_voice_error'));
                });
              }
            }
          });
        }).on('hover:focus', function () {
          if (Lampa.Helper) Lampa.Helper.show('online_file', Lampa.Lang.translate('online_mod_file_helper'), params.item);
        });
      };
      /**
       * Показать пустой результат
       */


      this.empty = function (msg) {
        var empty = Lampa.Template.get('list_empty');
        if (msg) empty.find('.empty__descr').text(msg);
        scroll.append(empty);
        this.loading(false);
      };
      /**
       * Показать пустой результат по ключевому слову
       */


      this.emptyForQuery = function (query) {
        this.empty(Lampa.Lang.translate('online_mod_query_start') + ' (' + query + ') ' + Lampa.Lang.translate('online_mod_query_end'));
      };

      this.getLastEpisode = function (items) {
        var last_episode = 0;
        items.forEach(function (e) {
          if (typeof e.episode !== 'undefined') last_episode = Math.max(last_episode, parseInt(e.episode));
        });
        return last_episode;
      };
      /**
       * Начать навигацию по файлам
       */


      this.start = function (first_select) {
        if (Lampa.Activity.active().activity !== this.activity) return; //обязательно, иначе наблюдается баг, активность создается но не стартует, в то время как компонент загружается и стартует самого себя.

        if (first_select) {
          var last_views = scroll.render().find('.selector.online').find('.torrent-item__viewed').parent().last();
          if (object.movie.number_of_seasons && last_views.length) last = last_views.eq(0)[0];else last = scroll.render().find('.selector').eq(0)[0];
        }

        Lampa.Background.immediately(Lampa.Utils.cardImgBackground(object.movie));
        Lampa.Controller.add('content', {
          toggle: function toggle() {
            Lampa.Controller.collectionSet(scroll.render(), files.render());
            Lampa.Controller.collectionFocus(last || false, scroll.render());
          },
          up: function up() {
            if (Navigator.canmove('up')) {
              Navigator.move('up');
            } else Lampa.Controller.toggle('head');
          },
          down: function down() {
            Navigator.move('down');
          },
          right: function right() {
            if (Navigator.canmove('right')) Navigator.move('right');else filter.show(Lampa.Lang.translate('title_filter'), 'filter');
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Lampa.Controller.toggle('menu');
          },
          back: this.back
        });
        if (this.inActivity()) Lampa.Controller.toggle('content');
      };

      this.render = function () {
        return files.render();
      };

      this.back = function () {
        Lampa.Activity.backward();
      };

      this.pause = function () {};

      this.stop = function () {};

      this.destroy = function () {
        network.clear();
        files.destroy();
        scroll.destroy();
        network = null;
        all_sources.forEach(function (s) {
          s.source.destroy();
        });
      };
    }

    var mod_version = '02.02.2026';
    var isMSX = !!(window.TVXHost || window.TVXManager);
    var isTizen = navigator.userAgent.toLowerCase().indexOf('tizen') !== -1;
    var isIFrame = window.parent !== window;
    var isLocal = !startsWith(window.location.protocol, 'http');
    var androidHeaders = Lampa.Platform.is('android') && Utils.checkAndroidVersion(339);
    var filmixHost = Utils.filmixHost();
    var network = new Lampa.Reguest();
    var online_loading = false;

    function logApp() {
      console.log('App', 'start address:', window.location.href);
      console.log('App', 'is MSX:', isMSX);
      console.log('App', 'is Tizen:', isTizen);
      console.log('App', 'is iframe:', isIFrame);
      console.log('App', 'is local:', isLocal);
      console.log('App', 'supports headers:', androidHeaders);
    }

    function initStorage() {
      if (!Utils.isDebug()) {
        Lampa.Storage.set('online_mod_proxy_lumex', 'false');
        Lampa.Storage.set('online_mod_proxy_rezka2', 'false');
        Lampa.Storage.set('online_mod_proxy_kinobase', 'false');
        Lampa.Storage.set('online_mod_proxy_collaps', 'false');
        Lampa.Storage.set('online_mod_proxy_cdnmovies', 'false');
        Lampa.Storage.set('online_mod_proxy_fancdn', 'false');
        Lampa.Storage.set('online_mod_proxy_fancdn2', 'false');
        Lampa.Storage.set('online_mod_proxy_fanserials', 'false');
        Lampa.Storage.set('online_mod_proxy_fanserials_cdn', 'false');
        Lampa.Storage.set('online_mod_proxy_animelib', 'false');
      } else if (!Lampa.Platform.is('android')) {
        Lampa.Storage.set('online_mod_proxy_lumex', 'true');
        Lampa.Storage.set('online_mod_proxy_cdnmovies', 'true');
        Lampa.Storage.set('online_mod_proxy_fancdn', 'true');
        Lampa.Storage.set('online_mod_proxy_fancdn2', 'true');

        if (!isLocal) {
          Lampa.Storage.set('online_mod_proxy_fanserials', 'true');
        }
      }

      if (!Lampa.Platform.is('android')) {
        Lampa.Storage.set('online_mod_proxy_filmix', 'true');
      }

      Lampa.Storage.set('online_mod_proxy_videoseed', Lampa.Platform.is('android') || isLocal ? 'false' : 'true');
      Lampa.Storage.set('online_mod_proxy_vibix', Lampa.Platform.is('android') ? 'false' : 'true');
      Lampa.Storage.set('online_mod_proxy_redheadsound', Lampa.Platform.is('android') ? 'false' : 'true');
      Lampa.Storage.set('online_mod_proxy_videodb', 'false');
      Lampa.Storage.set('online_mod_proxy_zetflix', 'false');
      Lampa.Storage.set('online_mod_proxy_kinopub', 'true');
      Lampa.Storage.set('online_mod_proxy_alloha', 'false');
      Lampa.Storage.set('online_mod_proxy_hdvb', 'false');
      Lampa.Storage.set('online_mod_proxy_kp', 'false');
      Lampa.Params.trigger('online_mod_iframe_proxy', !isTizen || isLocal);
      Lampa.Params.trigger('online_mod_proxy_iframe', false);
      Lampa.Params.trigger('online_mod_use_stream_proxy', false);
      Lampa.Params.trigger('online_mod_proxy_find_ip', false);
      Lampa.Params.trigger('online_mod_proxy_other', false);
      Lampa.Params.trigger('online_mod_proxy_lumex', false);
      Lampa.Params.trigger('online_mod_proxy_rezka', false);
      Lampa.Params.trigger('online_mod_proxy_rezka2', false);
      Lampa.Params.trigger('online_mod_proxy_rezka2_mirror', false);
      Lampa.Params.trigger('online_mod_proxy_kinobase', false);
      Lampa.Params.trigger('online_mod_proxy_collaps', false);
      Lampa.Params.trigger('online_mod_proxy_cdnmovies', false);
      Lampa.Params.trigger('online_mod_proxy_filmix', false);
      Lampa.Params.trigger('online_mod_proxy_videodb', false);
      Lampa.Params.trigger('online_mod_proxy_zetflix', false);
      Lampa.Params.trigger('online_mod_proxy_fancdn', false);
      Lampa.Params.trigger('online_mod_proxy_fancdn2', false);
      Lampa.Params.trigger('online_mod_proxy_fanserials', false);
      Lampa.Params.trigger('online_mod_proxy_fanserials_cdn', false);
      Lampa.Params.trigger('online_mod_proxy_videoseed', false);
      Lampa.Params.trigger('online_mod_proxy_vibix', false);
      Lampa.Params.trigger('online_mod_proxy_redheadsound', false);
      Lampa.Params.trigger('online_mod_proxy_cdnvideohub', false);
      Lampa.Params.trigger('online_mod_proxy_anilibria', false);
      Lampa.Params.trigger('online_mod_proxy_anilibria2', false);
      Lampa.Params.trigger('online_mod_proxy_animelib', false);
      Lampa.Params.trigger('online_mod_proxy_kodik', false);
      Lampa.Params.trigger('online_mod_proxy_kinopub', false);
      Lampa.Params.trigger('online_mod_proxy_alloha', false);
      Lampa.Params.trigger('online_mod_proxy_hdvb', false);
      Lampa.Params.trigger('online_mod_proxy_kp', false);
      Lampa.Params.trigger('online_mod_skip_kp_search', false);
      Lampa.Params.trigger('online_mod_prefer_http', window.location.protocol !== 'https:');
      Lampa.Params.trigger('online_mod_prefer_mp4', true);
      Lampa.Params.trigger('online_mod_prefer_dash', false);
      Lampa.Params.trigger('online_mod_collaps_lampa_player', false);
      Lampa.Params.trigger('online_mod_full_episode_title', false);
      Lampa.Params.trigger('online_mod_av1_support', true);
      Lampa.Params.trigger('online_mod_save_last_balanser', false);
      Lampa.Params.trigger('online_mod_rezka2_fix_stream', false);
      Lampa.Params.select('online_mod_kinobase_mirror', '', '');
      Lampa.Params.select('online_mod_kinobase_cookie', '', '');
      Lampa.Params.select('online_mod_rezka2_mirror', '', '');
      Lampa.Params.select('online_mod_rezka2_name', '', '');
      Lampa.Params.select('online_mod_rezka2_password', '', '');
      Lampa.Params.select('online_mod_rezka2_cookie', '', '');
      Lampa.Params.select('online_mod_rezka2_prx_ukr', {
        'prx.ukrtelcdn.net': 'prx.ukrtelcdn.net',
        'prx-cogent.ukrtelcdn.net': 'prx-cogent.ukrtelcdn.net',
        'prx2-cogent.ukrtelcdn.net': 'prx2-cogent.ukrtelcdn.net',
        'prx3-cogent.ukrtelcdn.net': 'prx3-cogent.ukrtelcdn.net',
        'prx4-cogent.ukrtelcdn.net': 'prx4-cogent.ukrtelcdn.net',
        'prx-ams.ukrtelcdn.net': 'prx-ams.ukrtelcdn.net',
        'prx2-ams.ukrtelcdn.net': 'prx2-ams.ukrtelcdn.net'
      }, 'prx.ukrtelcdn.net');
      Lampa.Params.select('online_mod_fancdn_name', '', '');
      Lampa.Params.select('online_mod_fancdn_password', '', '');
      Lampa.Params.select('online_mod_fancdn_cookie', '', '');
      Lampa.Params.select('online_mod_fancdn_token', '', '');
      Lampa.Params.select('online_mod_proxy_other_url', '', '');
      Lampa.Params.select('online_mod_secret_password', '', '');

      if (window.location.protocol === 'https:') {
        Lampa.Storage.set('online_mod_prefer_http', 'false');
      }

      if (Lampa.Storage.get('online_mod_proxy_reset', '') != 7) {
        Lampa.Storage.set('online_mod_proxy_lumex', 'true');
        Lampa.Storage.set('online_mod_proxy_reset', '7');
      }
    }

    function initLang() {
      if (!Lampa.Lang) {
        var lang_data = {};
        Lampa.Lang = {
          add: function add(data) {
            lang_data = data;
          },
          translate: function translate(key) {
            return lang_data[key] ? lang_data[key].ru : key;
          }
        };
      }

      Lampa.Lang.add({
        online_mod_watch: {
          ru: 'Смотреть онлайн',
          uk: 'Дивитися онлайн',
          be: 'Глядзець анлайн',
          en: 'Watch online',
          zh: '在线观看'
        },
        online_mod_nolink: {
          ru: 'Не удалось извлечь ссылку',
          uk: 'Неможливо отримати посилання',
          be: 'Не ўдалося атрымаць спасылку',
          en: 'Failed to fetch link',
          zh: '获取链接失败'
        },
        online_mod_blockedlink: {
          ru: 'К сожалению, это видео не доступно в вашем регионе',
          uk: 'На жаль, це відео не доступне у вашому регіоні',
          be: 'Нажаль, гэта відэа не даступна ў вашым рэгіёне',
          en: 'Sorry, this video is not available in your region',
          zh: '抱歉，您所在的地区无法观看该视频'
        },
        online_mod_blockedlink_copyright: {
          ru: 'К сожалению, это видео не доступно по запросу правообладателей',
          uk: 'На жаль, це відео не доступне за запитом правовласників',
          be: 'Нажаль, гэта відэа не даступна па запыце праваўладальнікаў',
          en: 'Sorry, this video is not available due to copyright holder request',
          zh: '抱歉，由于版权所有者的要求，该视频无法播放。'
        },
        online_mod_waitlink: {
          ru: 'Работаем над извлечением ссылки, подождите...',
          uk: 'Працюємо над отриманням посилання, зачекайте...',
          be: 'Працуем над выманнем спасылкі, пачакайце...',
          en: 'Working on extracting the link, please wait...',
          zh: '正在提取链接，请稍候...'
        },
        online_mod_captcha_address: {
          ru: 'Требуется пройти капчу по адресу: ',
          uk: 'Потрібно пройти капчу за адресою: ',
          be: 'Патрабуецца прайсці капчу па адрасе: ',
          en: 'It is required to pass the captcha at: ',
          zh: '您需要完成验证码： '
        },
        online_mod_captcha_proxy: {
          ru: 'Требуется пройти капчу. Попробуйте использовать зеркало вместо прокси',
          uk: 'Потрібно пройти капчу. Спробуйте використовувати дзеркало замість проксі',
          be: 'Патрабуецца прайсці капчу. Паспрабуйце выкарыстоўваць люстэрка замест проксі',
          en: 'It is required to pass the captcha. Try to use a mirror instead of a proxy',
          zh: '您需要通过验证码。 尝试使用镜子而不是代理'
        },
        online_mod_balanser: {
          ru: 'Балансер',
          uk: 'Балансер',
          be: 'Балансер',
          en: 'Balancer',
          zh: '平衡器'
        },
        online_mod_file_helper: {
          ru: 'Удерживайте клавишу "ОК" для вызова контекстного меню',
          uk: 'Утримуйте клавішу "ОК" для виклику контекстного меню',
          be: 'Утрымлівайце клавішу "ОК" для выкліку кантэкстнага меню',
          en: 'Hold the "OK" key to bring up the context menu',
          zh: '按住“确定”键调出上下文菜单'
        },
        online_mod_clearmark_all: {
          ru: 'Снять отметку у всех',
          uk: 'Зняти позначку у всіх',
          be: 'Зняць адзнаку ва ўсіх',
          en: 'Uncheck all',
          zh: '取消所有'
        },
        online_mod_timeclear_all: {
          ru: 'Сбросить тайм-код у всех',
          uk: 'Скинути тайм-код у всіх',
          be: 'Скінуць тайм-код ва ўсіх',
          en: 'Reset timecode for all',
          zh: '为所有人重置时间码'
        },
        online_mod_query_start: {
          ru: 'По запросу',
          uk: 'На запит',
          be: 'Па запыце',
          en: 'On request',
          zh: '根据要求'
        },
        online_mod_query_end: {
          ru: 'нет результатов',
          uk: 'немає результатів',
          be: 'няма вынікаў',
          en: 'no results',
          zh: '没有结果'
        },
        online_mod_title: {
          ru: 'FILMIX MOD',
          uk: 'FILMIX MOD',
          be: 'FILMIX MOD',
          en: 'FILMIX MOD',
          zh: '在线的'
        },
        online_mod_title_full: {
          ru: 'Онлайн Мод',
          uk: 'Онлайн Мод',
          be: 'Анлайн Мод',
          en: 'Online Mod',
          zh: '在线的 Mod'
        },
        online_mod_use_stream_proxy: {
          ru: 'Проксировать видеопоток (Укр)',
          uk: 'Проксирувати відеопотік (Укр)',
          be: 'Праксіраваць відэаструмень (Укр)',
          en: 'Proxy video stream (Ukr)',
          zh: '代理视频流 （乌克兰）'
        },
        online_mod_proxy_find_ip: {
          ru: 'Передавать свой IP прокси',
          uk: 'Передавати свій IP проксі',
          be: 'Перадаваць свой IP проксі',
          en: 'Send your IP to proxy',
          zh: '将您的 IP 发送给代理'
        },
        online_mod_proxy_other: {
          ru: 'Использовать альтернативный прокси',
          uk: 'Використовувати альтернативний проксі',
          be: 'Выкарыстоўваць альтэрнатыўны проксі',
          en: 'Use an alternative proxy',
          zh: '使用备用代理'
        },
        online_mod_proxy_other_url: {
          ru: 'Альтернативный прокси',
          uk: 'Альтернативний проксі',
          be: 'Альтэрнатыўны проксі',
          en: 'Alternative proxy',
          zh: '备用代理'
        },
        online_mod_proxy_balanser: {
          ru: 'Проксировать',
          uk: 'Проксирувати',
          be: 'Праксіраваць',
          en: 'Proxy',
          zh: '代理'
        },
        online_mod_proxy_kp: {
          ru: 'Проксировать КиноПоиск',
          uk: 'Проксирувати КиноПоиск',
          be: 'Праксіраваць КиноПоиск',
          en: 'Proxy KinoPoisk',
          zh: '代理 KinoPoisk'
        },
        online_mod_skip_kp_search: {
          ru: 'Не искать в КиноПоиск',
          uk: 'Не шукати у КиноПоиск',
          be: 'Не шукаць у КиноПоиск',
          en: 'Skip search in KinoPoisk',
          zh: '在 KinoPoisk 中跳过搜索'
        },
        online_mod_iframe_proxy: {
          ru: 'Использовать iframe-прокси',
          uk: 'Використовувати iframe-проксі',
          be: 'Выкарыстоўваць iframe-проксі',
          en: 'Use iframe proxy',
          zh: '使用 iframe 代理'
        },
        online_mod_prefer_http: {
          ru: 'Предпочитать поток по HTTP',
          uk: 'Віддавати перевагу потіку по HTTP',
          be: 'Аддаваць перавагу патоку па HTTP',
          en: 'Prefer stream over HTTP',
          zh: '优先于 HTTP 流式传输'
        },
        online_mod_prefer_mp4: {
          ru: 'Предпочитать поток MP4',
          uk: 'Віддавати перевагу потіку MP4',
          be: 'Аддаваць перавагу патоку MP4',
          en: 'Prefer MP4 stream',
          zh: '更喜欢 MP4 流'
        },
        online_mod_prefer_dash: {
          ru: 'Предпочитать DASH вместо HLS',
          uk: 'Віддавати перевагу DASH замість HLS',
          be: 'Аддаваць перавагу DASH замест HLS',
          en: 'Prefer DASH over HLS',
          zh: '更喜欢 DASH 而不是 HLS'
        },
        online_mod_collaps_lampa_player: {
          ru: 'Collaps: Встроенный плеер',
          uk: 'Collaps: Вбудований плеєр',
          be: 'Collaps: Убудаваны плэер',
          en: 'Collaps: Lampa player',
          zh: 'Collaps： Lampa播放器'
        },
        online_mod_full_episode_title: {
          ru: 'Полный формат названия серии',
          uk: 'Повний формат назви серії',
          be: 'Поўны фармат назвы серыі',
          en: 'Full episode title format',
          zh: '完整剧集标题格式'
        },
        online_mod_av1_support: {
          ru: 'AV1 поддерживается',
          uk: 'AV1 підтримується',
          be: 'AV1 падтрымліваецца',
          en: 'AV1 supported',
          zh: 'AV1 支持'
        },
        online_mod_save_last_balanser: {
          ru: 'Сохранять историю балансеров',
          uk: 'Зберігати історію балансерів',
          be: 'Захоўваць гісторыю балансараў',
          en: 'Save history of balancers',
          zh: '保存平衡器的历史记录'
        },
        online_mod_clear_last_balanser: {
          ru: 'Очистить историю балансеров',
          uk: 'Очистити історію балансерів',
          be: 'Ачысціць гісторыю балансараў',
          en: 'Clear history of balancers',
          zh: '清除平衡器的历史记录'
        },
        online_mod_kinobase_mirror: {
          ru: 'Зеркало для Kinobase',
          uk: 'Дзеркало для Kinobase',
          be: 'Люстэрка для Kinobase',
          en: 'Mirror for Kinobase',
          zh: 'Kinobase的镜子'
        },
        online_mod_kinobase_cookie: {
          ru: 'Куки для Kinobase',
          uk: 'Кукі для Kinobase',
          be: 'Кукі для Kinobase',
          en: 'Cookie for Kinobase',
          zh: 'Kinobase 的 Cookie'
        },
        online_mod_rezka2_mirror: {
          ru: 'Зеркало для HDrezka',
          uk: 'Дзеркало для HDrezka',
          be: 'Люстэрка для HDrezka',
          en: 'Mirror for HDrezka',
          zh: 'HDrezka的镜子'
        },
        online_mod_proxy_rezka2_mirror: {
          ru: 'Проксировать зеркало HDrezka',
          uk: 'Проксирувати дзеркало HDrezka',
          be: 'Праксіраваць люстэрка HDrezka',
          en: 'Proxy HDrezka mirror',
          zh: '代理HDrezka镜子'
        },
        online_mod_rezka2_name: {
          ru: 'Логин или email для HDrezka',
          uk: 'Логін чи email для HDrezka',
          be: 'Лагін ці email для HDrezka',
          en: 'Login or email for HDrezka',
          zh: 'HDrezka的登录名或电子邮件'
        },
        online_mod_rezka2_password: {
          ru: 'Пароль для HDrezka',
          uk: 'Пароль для HDrezka',
          be: 'Пароль для HDrezka',
          en: 'Password for HDrezka',
          zh: 'HDrezka的密码'
        },
        online_mod_rezka2_login: {
          ru: 'Войти в HDrezka',
          uk: 'Увійти до HDrezka',
          be: 'Увайсці ў HDrezka',
          en: 'Log in to HDrezka',
          zh: '登录HDrezka'
        },
        online_mod_rezka2_logout: {
          ru: 'Выйти из HDrezka',
          uk: 'Вийти з HDrezka',
          be: 'Выйсці з HDrezka',
          en: 'Log out of HDrezka',
          zh: '注销HDrezka'
        },
        online_mod_rezka2_cookie: {
          ru: 'Куки для HDrezka',
          uk: 'Кукі для HDrezka',
          be: 'Кукі для HDrezka',
          en: 'Cookie for HDrezka',
          zh: 'HDrezka 的 Cookie'
        },
        online_mod_rezka2_fill_cookie: {
          ru: 'Заполнить куки для HDrezka',
          uk: 'Заповнити кукі для HDrezka',
          be: 'Запоўніць кукі для HDrezka',
          en: 'Fill cookie for HDrezka',
          zh: '为HDrezka填充Cookie'
        },
        online_mod_rezka2_fix_stream: {
          ru: 'Фикс видеопотока для HDrezka',
          uk: 'Фікс відеопотоку для HDrezka',
          be: 'Фікс відэаструменю для HDrezka',
          en: 'Fix video stream for HDrezka',
          zh: '修复 HDrezka 的视频流'
        },
        online_mod_rezka2_prx_ukr: {
          ru: 'Прокси-сервер для HDrezka (Укр)',
          uk: 'Проксі-сервер для HDrezka (Укр)',
          be: 'Проксі-сервер для HDrezka (Укр)',
          en: 'Proxy server for HDrezka (Ukr)',
          zh: 'HDrezka 的代理服务器 （乌克兰）'
        },
        online_mod_fancdn_name: {
          ru: 'Логин для FanSerials',
          uk: 'Логін для FanSerials',
          be: 'Лагін для FanSerials',
          en: 'Login for FanSerials',
          zh: 'FanSerials的登录名'
        },
        online_mod_fancdn_password: {
          ru: 'Пароль для FanSerials',
          uk: 'Пароль для FanSerials',
          be: 'Пароль для FanSerials',
          en: 'Password for FanSerials',
          zh: 'FanSerials的密码'
        },
        online_mod_fancdn_cookie: {
          ru: 'Куки для FanSerials',
          uk: 'Кукі для FanSerials',
          be: 'Кукі для FanSerials',
          en: 'Cookie for FanSerials',
          zh: 'FanSerials 的 Cookie'
        },
        online_mod_fancdn_fill_cookie: {
          ru: 'Заполнить куки для FanSerials',
          uk: 'Заповнити кукі для FanSerials',
          be: 'Запоўніць кукі для FanSerials',
          en: 'Fill cookie for FanSerials',
          zh: '为FanSerials填充Cookie'
        },
        online_mod_fancdn_token: {
          ru: 'Токен для FanCDN',
          uk: 'Токен для FanCDN',
          be: 'Токен для FanCDN',
          en: 'Token for FanCDN',
          zh: 'FanCDN 代币'
        },
        online_mod_authorization_required: {
          ru: 'Требуется авторизация',
          uk: 'Потрібна авторизація',
          be: 'Патрабуецца аўтарызацыя',
          en: 'Authorization required',
          zh: '需要授权'
        },
        online_mod_unsupported_mirror: {
          ru: 'Неподдерживаемое зеркало',
          uk: 'Непідтримуване дзеркало',
          be: 'Непадтрымоўванае люстэрка',
          en: 'Unsupported mirror',
          zh: '不支持的镜子'
        },
        online_mod_secret_password: {
          ru: 'Секретный пароль',
          uk: 'Секретний пароль',
          be: 'Сакрэтны пароль',
          en: 'Secret password',
          zh: '秘密密码'
        },
        online_mod_seasons_count: {
          ru: 'Сезонов',
          uk: 'Сезонів',
          be: 'Сезонаў',
          en: 'Seasons',
          zh: '季'
        },
        online_mod_episodes_count: {
          ru: 'Эпизодов',
          uk: 'Епізодів',
          be: 'Эпізодаў',
          en: 'Episodes',
          zh: '集'
        },
        online_mod_show_more: {
          ru: 'Показать ещё',
          uk: 'Показати ще',
          be: 'Паказаць яшчэ',
          en: 'Show more',
          zh: '展示更多'
        },
        online_mod_server: {
          ru: 'Сервер',
          uk: 'Сервер',
          be: 'Сервер',
          en: 'Server',
          zh: '服务器'
        },
        online_mod_filmix_param_add_title: {
          ru: 'Добавить ТОКЕН от Filmix',
          uk: 'Додати ТОКЕН від Filmix',
          be: 'Дадаць ТОКЕН ад Filmix',
          en: 'Add TOKEN from Filmix',
          zh: '从 Filmix 添加 TOKEN'
        },
        online_mod_filmix_param_add_descr: {
          ru: 'Добавьте ТОКЕН для подключения подписки',
          uk: 'Додайте ТОКЕН для підключення передплати',
          be: 'Дадайце ТОКЕН для падлучэння падпіскі',
          en: 'Add a TOKEN to connect a subscription',
          zh: '添加 TOKEN 以连接订阅'
        },
        online_mod_filmix_param_placeholder: {
          ru: 'Например: nxjekeb57385b..',
          uk: 'Наприклад: nxjekeb57385b..',
          be: 'Напрыклад: nxjekeb57385b..',
          en: 'For example: nxjekeb57385b..',
          zh: '例如： nxjekeb57385b..'
        },
        online_mod_filmix_param_add_device: {
          ru: 'Добавить устройство на Filmix',
          uk: 'Додати пристрій на Filmix',
          be: 'Дадаць прыладу на Filmix',
          en: 'Add Device to Filmix',
          zh: '将设备添加到 Filmix'
        },
        online_mod_filmix_modal_text: {
          ru: 'Введите его на странице ' + filmixHost + '/consoles в вашем авторизованном аккаунте!',
          uk: 'Введіть його на сторінці ' + filmixHost + '/consoles у вашому авторизованому обліковому записі!',
          be: 'Увядзіце яго на старонцы ' + filmixHost + '/consoles у вашым аўтарызаваным акаўнце!',
          en: 'Enter it at ' + filmixHost + '/consoles in your authorized account!',
          zh: '在您的授权帐户中的 ' + filmixHost + '/consoles 中输入！'
        },
        online_mod_filmix_modal_wait: {
          ru: 'Ожидаем код',
          uk: 'Очікуємо код',
          be: 'Чакаем код',
          en: 'Waiting for the code',
          zh: '等待代码'
        },
        online_mod_filmix_copy_secuses: {
          ru: 'Код скопирован в буфер обмена',
          uk: 'Код скопійовано в буфер обміну',
          be: 'Код скапіяваны ў буфер абмену',
          en: 'Code copied to clipboard',
          zh: '代码复制到剪贴板'
        },
        online_mod_filmix_copy_fail: {
          ru: 'Ошибка при копировании',
          uk: 'Помилка при копіюванні',
          be: 'Памылка пры капіяванні',
          en: 'Copy error',
          zh: '复制错误'
        },
        online_mod_filmix_nodevice: {
          ru: 'Устройство не авторизовано',
          uk: 'Пристрій не авторизований',
          be: 'Прылада не аўтарызавана',
          en: 'Device not authorized',
          zh: '设备未授权'
        },
        online_mod_filmix_status: {
          ru: 'Статус',
          uk: 'Статус',
          be: 'Статус',
          en: 'Status',
          zh: '状态'
        },
        online_mod_voice_subscribe: {
          ru: 'Подписаться на перевод',
          uk: 'Підписатися на переклад',
          be: 'Падпісацца на пераклад',
          en: 'Subscribe to translation',
          zh: '订阅翻译'
        },
        online_mod_voice_success: {
          ru: 'Вы успешно подписались',
          uk: 'Ви успішно підписалися',
          be: 'Вы паспяхова падпісаліся',
          en: 'You have successfully subscribed',
          zh: '您已成功订阅'
        },
        online_mod_voice_error: {
          ru: 'Возникла ошибка',
          uk: 'Виникла помилка',
          be: 'Узнікла памылка',
          en: 'An error has occurred',
          zh: '发生了错误'
        }
      });
    }

    function resetTemplates() {
      Lampa.Template.add('online_mod', "<div class=\"online selector\">\n        <div class=\"online__body\">\n            <div style=\"position: absolute;left: 0;top: -0.3em;width: 2.4em;height: 2.4em\">\n                <svg style=\"height: 2.4em; width:  2.4em;\" viewBox=\"0 0 128 128\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <circle cx=\"64\" cy=\"64\" r=\"56\" stroke=\"white\" stroke-width=\"16\"/>\n                    <path d=\"M90.5 64.3827L50 87.7654L50 41L90.5 64.3827Z\" fill=\"white\"/>\n                </svg>\n            </div>\n            <div class=\"online__title\" style=\"padding-left: 2.1em;\">{title}</div>\n            <div class=\"online__quality\" style=\"padding-left: 3.4em;\">{quality}{info}</div>\n        </div>\n    </div>");
      Lampa.Template.add('online_mod_folder', "<div class=\"online selector\">\n        <div class=\"online__body\">\n            <div style=\"position: absolute;left: 0;top: -0.3em;width: 2.4em;height: 2.4em\">\n                <svg style=\"height: 2.4em; width:  2.4em;\" viewBox=\"0 0 128 112\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect y=\"20\" width=\"128\" height=\"92\" rx=\"13\" fill=\"white\"/>\n                    <path d=\"M29.9963 8H98.0037C96.0446 3.3021 91.4079 0 86 0H42C36.5921 0 31.9555 3.3021 29.9963 8Z\" fill=\"white\" fill-opacity=\"0.23\"/>\n                    <rect x=\"11\" y=\"8\" width=\"106\" height=\"76\" rx=\"13\" fill=\"white\" fill-opacity=\"0.51\"/>\n                </svg>\n            </div>\n            <div class=\"online__title\" style=\"padding-left: 2.1em;\">{title}</div>\n            <div class=\"online__quality\" style=\"padding-left: 3.4em;\">{quality}{info}</div>\n        </div>\n    </div>");
    }

    function checkMyIp(onComplite) {
      if (Lampa.Storage.field('online_mod_proxy_find_ip') !== true) {
        onComplite();
        return;
      }

      Utils.checkMyIp(network, onComplite);
    }

    function checkCurrentFanserialsHost(onComplite) {
      var host = Utils.getCurrentFanserialsHost();

      if (host || !Utils.isDebug()) {
        onComplite();
        return;
      }

      var prox = Utils.proxy('cookie');
      var prox_enc = '';
      var returnHeaders = androidHeaders;

      if (!prox && !returnHeaders) {
        onComplite();
        return;
      }

      var user_agent = Utils.baseUserAgent();
      var headers = Lampa.Platform.is('android') ? {
        'User-Agent': user_agent
      } : {};

      if (prox) {
        prox_enc += 'param/User-Agent=' + encodeURIComponent(user_agent) + '/';
        prox_enc += 'cookie_plus/param/Cookie=/head/';
        returnHeaders = false;
      }

      var url = Utils.fanserialsHost() + '/';
      network.clear();
      network.timeout(10000);
      network["native"](Utils.proxyLink(url, prox, prox_enc), function (json) {
        if (json && json.currentUrl) {
          var _url = Utils.parseURL(json.currentUrl);

          Utils.setCurrentFanserialsHost(_url.origin);
        }

        onComplite();
      }, function (a, c) {
        onComplite();
      }, false, {
        headers: headers,
        returnHeaders: returnHeaders
      });
    }

    function loadOnline(object) {
      if (online_loading) return;
      online_loading = true;
      Utils.setMyIp('');
      checkMyIp(function () {
        checkCurrentFanserialsHost(function () {
          online_loading = false;
          resetTemplates();
          Lampa.Component.add('online_mod', component);
          Lampa.Activity.push({
            url: '',
            title: Lampa.Lang.translate('online_mod_title_full'),
            component: 'online_mod',
            search: object.title,
            search_one: object.title,
            search_two: object.original_title,
            movie: object,
            page: 1
          });
        });
      });
    }

    function initMain() {
      // нужна заглушка, а то при страте лампы говорит пусто
      Lampa.Component.add('online_mod', component); //то же самое

      resetTemplates();
      var manifest = {
        type: 'video',
        version: mod_version,
        name: Lampa.Lang.translate('online_mod_title_full') + ' - ' + mod_version,
        description: Lampa.Lang.translate('online_mod_watch'),
        component: 'online_mod',
        onContextMenu: function onContextMenu(object) {
          return {
            name: Lampa.Lang.translate('online_mod_watch'),
            description: ''
          };
        },
        onContextLauch: function onContextLauch(object) {
          online_loading = false;
          loadOnline(object);
        }
      };
      Lampa.Manifest.plugins = manifest;
      var button = "<div class=\"full-start__button selector view--online_mod\" data-subtitle=\"online_mod " + mod_version + "\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:svgjs=\"http://svgjs.com/svgjs\" version=\"1.1\" width=\"512\" height=\"512\" x=\"0\" y=\"0\" viewBox=\"0 0 244 260\" style=\"enable-background:new 0 0 512 512\" xml:space=\"preserve\" class=\"\">\n        <g xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M242,88v170H10V88h41l-38,38h37.1l38-38h38.4l-38,38h38.4l38-38h38.3l-38,38H204L242,88L242,88z M228.9,2l8,37.7l0,0 L191.2,10L228.9,2z M160.6,56l-45.8-29.7l38-8.1l45.8,29.7L160.6,56z M84.5,72.1L38.8,42.4l38-8.1l45.8,29.7L84.5,72.1z M10,88 L2,50.2L47.8,80L10,88z\" fill=\"currentColor\"/>\n        </g></svg>\n\n        <span>#{online_mod_title}</span>\n        </div>";
      Lampa.Listener.follow('full', function (e) {
        if (e.type == 'complite') {
          var btn = $(Lampa.Lang.translate(button));
          online_loading = false;
          btn.on('hover:enter', function () {
            loadOnline(e.data.movie);
          });
          e.object.activity.render().find('.view--torrent').after(btn);
        }
      });

      if (Lampa.Storage.get('online_mod_use_stream_proxy', '') === '') {
        $.ajax({
          url: (window.location.protocol === 'https:' ? 'https://' : 'http://') + 'ipwho.is/?fields=ip,country_code',
          jsonp: 'callback',
          dataType: 'jsonp'
        }).done(function (json) {
          if (json && json.country_code) {
            Lampa.Storage.set('online_mod_use_stream_proxy', '' + (json.country_code === 'UA'));
          }
        });
      }

      if (Lampa.VPN && (Utils.isDebug() || Utils.isDebug2())) {
        if (Lampa.VPN.region) {
          Lampa.VPN.region = function (call) {
            if (call) call('de');
          };
        }

        if (Lampa.VPN.code) {
          Lampa.VPN.code = function () {
            return 'de';
          };
        }
      }
    } ///////FILMIX/////////


    var filmix_headers = Lampa.Platform.is('android') ? {
      'User-Agent': Utils.filmixUserAgent()
    } : {};
    var api_url = Utils.filmixAppHost() + '/api/v2/';
    var dev_id = Utils.randomHex(16);
    var ping_auth;

    function addSettingsFilmix() {
      if (Lampa.Settings.main && Lampa.Settings.main() && !Lampa.Settings.main().render().find('[data-component="filmix"]').length) {
        var field = $("<div class=\"settings-folder selector\" data-component=\"filmix\">\n            <div class=\"settings-folder__icon\">\n                <svg height=\"57\" viewBox=\"0 0 58 57\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <path d=\"M20 20.3735V45H26.8281V34.1262H36.724V26.9806H26.8281V24.3916C26.8281 21.5955 28.9062 19.835 31.1823 19.835H39V13H26.8281C23.6615 13 20 15.4854 20 20.3735Z\" fill=\"white\"/>\n                <rect x=\"2\" y=\"2\" width=\"54\" height=\"53\" rx=\"5\" stroke=\"white\" stroke-width=\"4\"/>\n                </svg>\n            </div>\n            <div class=\"settings-folder__name\">Filmix</div>\n        </div>");
        Lampa.Settings.main().render().find('[data-component="more"]').after(field);
        Lampa.Settings.main().update();
      }
    }

    function showStatus() {
      var status = Lampa.Storage.get("filmix_status", '{}');
      var info = Lampa.Lang.translate('online_mod_filmix_nodevice');

      if (status.login) {
        if (status.is_pro) info = status.login + ' - PRO ' + Lampa.Lang.translate('filter_rating_to') + ' - ' + status.pro_date;else if (status.is_pro_plus) info = status.login + ' - PRO_PLUS ' + Lampa.Lang.translate('filter_rating_to') + ' - ' + status.pro_date;else info = status.login + ' - NO PRO';
      }

      var field = $(Lampa.Lang.translate("\n        <div class=\"settings-param\" data-name=\"filmix_status\" data-static=\"true\">\n            <div class=\"settings-param__name\">#{online_mod_filmix_status}</div>\n            <div class=\"settings-param__value\">".concat(info, "</div>\n        </div>")));
      $('.settings [data-name="filmix_status"]').remove();
      $('.settings [data-name="filmix_add"]').after(field);
    }

    function checkPro(token, call) {
      var filmix_prox = Utils.proxy('filmix');
      var filmix_prox_enc = '';

      if (filmix_prox) {
        filmix_prox_enc += 'param/User-Agent=' + encodeURIComponent(Utils.filmixUserAgent()) + '/';
      }

      network.clear();
      network.timeout(8000);
      network["native"](Utils.proxyLink(api_url + 'user_profile' + Utils.filmixToken(dev_id, token), filmix_prox, filmix_prox_enc, 'enc2'), function (json) {
        if (json) {
          if (json.user_data) {
            Lampa.Storage.set("filmix_status", json.user_data);
            if (call) call();
          } else {
            Lampa.Storage.set("filmix_status", {});
          }

          showStatus();
        }
      }, function (a, c) {
        Lampa.Noty.show(network.errorDecode(a, c));
      }, false, {
        headers: filmix_headers
      });
    }

    function initFilmix() {
      Lampa.Params.select('filmix_token', '', '');
      Lampa.Template.add('settings_filmix', "<div>\n        <div class=\"settings-param selector\" data-name=\"filmix_token\" data-type=\"input\" placeholder=\"#{online_mod_filmix_param_placeholder}\">\n            <div class=\"settings-param__name\">#{online_mod_filmix_param_add_title}</div>\n            <div class=\"settings-param__value\"></div>\n            <div class=\"settings-param__descr\">#{online_mod_filmix_param_add_descr}</div>\n        </div>\n        <div class=\"settings-param selector\" data-name=\"filmix_add\" data-static=\"true\">\n            <div class=\"settings-param__name\">#{online_mod_filmix_param_add_device}</div>\n        </div>\n    </div>");
      Lampa.Storage.listener.follow('change', function (e) {
        if (e.name == 'filmix_token') {
          window.mod_filmix = {
            max_qualitie: 2160,
            is_max_qualitie: false
          };
          if (e.value) checkPro(e.value);else {
            Lampa.Storage.set("filmix_status", {});
            showStatus();
          }
        }
      });
      if (window.appready) addSettingsFilmix();else {
        Lampa.Listener.follow('app', function (e) {
          if (e.type == 'ready') addSettingsFilmix();
        });
      }
      Lampa.Settings.listener.follow('open', function (e) {
        if (e.name == 'filmix') {
          e.body.find('[data-name="filmix_add"]').unbind('hover:enter').on('hover:enter', function () {
            var user_code = '';
            var user_token = '';
            var filmix_prox = Utils.proxy('filmix');
            var filmix_prox_enc = '';

            if (filmix_prox) {
              filmix_prox_enc += 'param/User-Agent=' + encodeURIComponent(Utils.filmixUserAgent()) + '/';
            }

            var modal = $('<div><div class="broadcast__text">' + Lampa.Lang.translate('online_mod_filmix_modal_text') + '</div><div class="broadcast__device selector" style="text-align: center">' + Lampa.Lang.translate('online_mod_filmix_modal_wait') + '...</div><br><div class="broadcast__scan"><div></div></div></div></div>');
            Lampa.Modal.open({
              title: '',
              html: modal,
              onBack: function onBack() {
                clearInterval(ping_auth);
                Lampa.Modal.close();
                Lampa.Controller.toggle('settings_component');
              },
              onSelect: function onSelect() {
                Lampa.Utils.copyTextToClipboard(user_code, function () {
                  Lampa.Noty.show(Lampa.Lang.translate('online_mod_filmix_copy_secuses'));
                }, function () {
                  Lampa.Noty.show(Lampa.Lang.translate('online_mod_filmix_copy_fail'));
                });
              }
            });
            ping_auth = setInterval(function () {
              checkPro(user_token, function () {
                clearInterval(ping_auth);
                Lampa.Modal.close();
                Lampa.Storage.set("filmix_token", user_token);
                e.body.find('[data-name="filmix_token"] .settings-param__value').text(user_token);
                Lampa.Controller.toggle('settings_component');
              });
            }, 10000);
            network.clear();
            network.timeout(10000);
            network["native"](Utils.proxyLink(api_url + 'token_request' + Utils.filmixToken(dev_id, ''), filmix_prox, filmix_prox_enc, 'enc2'), function (found) {
              if (found && found.status == 'ok') {
                user_token = found.code;
                user_code = found.user_code;
                modal.find('.selector').text(user_code); //modal.find('.broadcast__scan').remove()
              } else {
                clearInterval(ping_auth);
                modal.find('.selector').text(Lampa.Lang.translate('network_401'));
                modal.find('.broadcast__scan').remove();
                Lampa.Noty.show(Lampa.Lang.translate('network_401'));
              }
            }, function (a, c) {
              clearInterval(ping_auth);
              modal.find('.selector').text(Lampa.Lang.translate('network_noconnect') + ': ' + network.errorCode(a));
              modal.find('.broadcast__scan').remove();
              Lampa.Noty.show(network.errorDecode(a, c));
            }, false, {
              headers: filmix_headers
            });
          });
          showStatus();
        }
      });
    } ///////Rezka2/////////


    function rezka2Login(success, error) {
      var host = Utils.rezka2Mirror();
      var url = host + '/ajax/login/';
      var postdata = 'login_name=' + encodeURIComponent(Lampa.Storage.get('online_mod_rezka2_name', ''));
      postdata += '&login_password=' + encodeURIComponent(Lampa.Storage.get('online_mod_rezka2_password', ''));
      postdata += '&login_not_save=0';
      network.clear();
      network.timeout(8000);
      network.silent(url, function (json) {
        if (json && (json.success || json.message == 'Уже авторизован на сайте. Необходимо обновить страницу!')) {
          Lampa.Storage.set('online_mod_rezka2_status', 'true');
          network.clear();
          network.timeout(8000);
          network.silent(host + '/', function (str) {
            str = (str || '').replace(/\n/g, '');
            var error_form = str.match(/(<div class="error-code">[^<]*<div>[^<]*<\/div>[^<]*<\/div>)\s*(<div class="error-title">[^<]*<\/div>)/);

            if (error_form) {
              Lampa.Noty.show(error_form[0]);
              if (error) error();
              return;
            }

            var verify_form = str.match(/<span>MIRROR<\/span>.*<button type="submit" onclick="\$\.cookie(\([^)]*\))/);

            if (verify_form) {
              Lampa.Noty.show(Lampa.Lang.translate('online_mod_unsupported_mirror') + ' HDrezka');
              rezka2Logout(error, error);
              return;
            }

            if (success) success();
          }, function (a, c) {
            if (success) success();
          }, false, {
            dataType: 'text',
            withCredentials: true
          });
        } else {
          Lampa.Storage.set('online_mod_rezka2_status', 'false');
          if (json && json.message) Lampa.Noty.show(json.message);
          if (error) error();
        }
      }, function (a, c) {
        Lampa.Noty.show(network.errorDecode(a, c));
        if (error) error();
      }, postdata, {
        withCredentials: true
      });
    }

    function rezka2Logout(success, error) {
      var url = Utils.rezka2Mirror() + '/logout/';
      network.clear();
      network.timeout(8000);
      network.silent(url, function (str) {
        Lampa.Storage.set('online_mod_rezka2_status', 'false');
        if (success) success();
      }, function (a, c) {
        Lampa.Storage.set('online_mod_rezka2_status', 'false');
        Lampa.Noty.show(network.errorDecode(a, c));
        if (error) error();
      }, false, {
        dataType: 'text',
        withCredentials: true
      });
    }

    function rezka2FillCookie(success, error) {
      var prox = Utils.proxy('rezka2');
      var prox_enc = '';
      var returnHeaders = androidHeaders;
      var proxy_mirror = Lampa.Storage.field('online_mod_proxy_rezka2_mirror') === true;
      var host = prox && !proxy_mirror ? 'https://rezka.ag' : Utils.rezka2Mirror();
      if (!prox && !returnHeaders) prox = Utils.proxy('cookie');

      if (!prox && !returnHeaders) {
        if (error) error();
        return;
      }

      var user_agent = Utils.baseUserAgent();
      var headers = Lampa.Platform.is('android') ? {
        'User-Agent': user_agent
      } : {};

      if (prox) {
        prox_enc += 'param/User-Agent=' + encodeURIComponent(user_agent) + '/';
        prox_enc += 'cookie_plus/param/Cookie=/';
        returnHeaders = false;
      }

      var url = host + '/ajax/login/';
      var postdata = 'login_name=' + encodeURIComponent(Lampa.Storage.get('online_mod_rezka2_name', ''));
      postdata += '&login_password=' + encodeURIComponent(Lampa.Storage.get('online_mod_rezka2_password', ''));
      postdata += '&login_not_save=0';
      network.clear();
      network.timeout(8000);
      network["native"](Utils.proxyLink(url, prox, prox_enc), function (json) {
        var cookie = '';
        var values = {};
        var sid = '';
        var body = json && json.body || {};
        body = typeof body === 'string' ? Lampa.Arrays.decodeJson(body, {}) : body;

        if (!body.success) {
          if (body.message) Lampa.Noty.show(body.message);
          if (error) error();
          return;
        }

        var cookieHeaders = json && json.headers && json.headers['set-cookie'] || null;

        if (cookieHeaders && cookieHeaders.forEach) {
          cookieHeaders.forEach(function (param) {
            var parts = param.split(';')[0].split('=');

            if (parts[0]) {
              if (parts[1] === 'deleted') delete values[parts[0]];else values[parts[0]] = parts[1] || '';
            }
          });
          sid = values['PHPSESSID'];
          delete values['PHPSESSID'];
          var cookies = [];

          for (var name in values) {
            cookies.push(name + '=' + values[name]);
          }

          cookie = cookies.join('; ');
        }

        if (cookie) {
          Lampa.Storage.set('online_mod_rezka2_cookie', cookie);
          if (cookie.indexOf('PHPSESSID=') == -1) cookie = 'PHPSESSID=' + (sid || Utils.randomId(26)) + (cookie ? '; ' + cookie : '');
          var prox_enc2 = prox_enc;

          if (prox) {
            prox_enc2 += 'param/Cookie=' + encodeURIComponent(cookie) + '/';
          } else {
            headers['Cookie'] = cookie;
          }

          network.clear();
          network.timeout(8000);
          network["native"](Utils.proxyLink(host + '/', prox, prox_enc2), function (str) {
            var json = typeof str === 'string' ? Lampa.Arrays.decodeJson(str, {}) : str;
            var body = (json && json.body || '').replace(/\n/g, '');
            var error_form = body.match(/(<div class="error-code">[^<]*<div>[^<]*<\/div>[^<]*<\/div>)\s*(<div class="error-title">[^<]*<\/div>)/);

            if (error_form) {
              Lampa.Noty.show(error_form[0]);
              if (error) error();
              return;
            }

            var cookieHeaders = json && json.headers && json.headers['set-cookie'] || null;

            if (cookieHeaders && cookieHeaders.forEach) {
              cookieHeaders.forEach(function (param) {
                var parts = param.split(';')[0].split('=');

                if (parts[0]) {
                  if (parts[1] === 'deleted') delete values[parts[0]];else values[parts[0]] = parts[1] || '';
                }
              });
              sid = values['PHPSESSID'] || sid;
              delete values['PHPSESSID'];
              var _cookies = [];

              for (var _name in values) {
                _cookies.push(_name + '=' + values[_name]);
              }

              cookie = _cookies.join('; ');
              if (cookie) Lampa.Storage.set('online_mod_rezka2_cookie', cookie);
            }

            var verify_form = body.match(/<span>MIRROR<\/span>.*<button type="submit" onclick="\$\.cookie(\([^)]*\))/);

            if (verify_form) {
              var verify_cookie;

              try {
                verify_cookie = (0, eval)('"use strict"; (function(name, value){ return {name: name, value: value}; })' + verify_form[1] + ';');
              } catch (e) {}

              if (verify_cookie) {
                values[verify_cookie.name] = verify_cookie.value;
                var _cookies2 = [];

                for (var _name2 in values) {
                  _cookies2.push(_name2 + '=' + values[_name2]);
                }

                cookie = _cookies2.join('; ');
                if (cookie) Lampa.Storage.set('online_mod_rezka2_cookie', cookie);
                if (cookie.indexOf('PHPSESSID=') == -1) cookie = 'PHPSESSID=' + (sid || Utils.randomId(26)) + (cookie ? '; ' + cookie : '');
                var prox_enc3 = prox_enc;

                if (prox) {
                  prox_enc3 += 'param/Cookie=' + encodeURIComponent(cookie) + '/';
                } else {
                  headers['Cookie'] = cookie;
                }

                network.clear();
                network.timeout(8000);
                network["native"](Utils.proxyLink(host + '/', prox, prox_enc3), function (str) {
                  var json = typeof str === 'string' ? Lampa.Arrays.decodeJson(str, {}) : str;
                  var body = (json && json.body || '').replace(/\n/g, '');
                  var error_form = body.match(/(<div class="error-code">[^<]*<div>[^<]*<\/div>[^<]*<\/div>)\s*(<div class="error-title">[^<]*<\/div>)/);

                  if (error_form) {
                    Lampa.Noty.show(error_form[0]);
                    if (error) error();
                    return;
                  }

                  var verify_form = body.match(/<span>MIRROR<\/span>.*<button type="submit" onclick="\$\.cookie(\([^)]*\))/);

                  if (verify_form) {
                    Lampa.Storage.set('online_mod_rezka2_cookie', '');
                    Lampa.Noty.show(Lampa.Lang.translate('online_mod_unsupported_mirror') + ' HDrezka');
                    if (error) error();
                    return;
                  }

                  var cookieHeaders = json && json.headers && json.headers['set-cookie'] || null;

                  if (cookieHeaders && cookieHeaders.forEach) {
                    cookieHeaders.forEach(function (param) {
                      var parts = param.split(';')[0].split('=');

                      if (parts[0]) {
                        if (parts[1] === 'deleted') delete values[parts[0]];else values[parts[0]] = parts[1] || '';
                      }
                    });
                    sid = values['PHPSESSID'] || sid;
                    delete values['PHPSESSID'];
                    var _cookies3 = [];

                    for (var _name3 in values) {
                      _cookies3.push(_name3 + '=' + values[_name3]);
                    }

                    cookie = _cookies3.join('; ');
                    if (cookie) Lampa.Storage.set('online_mod_rezka2_cookie', cookie);
                  }

                  if (success) success();
                }, function (a, c) {
                  if (success) success();
                }, false, {
                  dataType: 'text',
                  headers: headers,
                  returnHeaders: returnHeaders
                });
                return;
              }
            }

            if (success) success();
          }, function (a, c) {
            if (success) success();
          }, false, {
            dataType: 'text',
            headers: headers,
            returnHeaders: returnHeaders
          });
        } else {
          if (error) error();
        }
      }, function (a, c) {
        Lampa.Noty.show(network.errorDecode(a, c));
        if (error) error();
      }, postdata, {
        headers: headers,
        returnHeaders: returnHeaders
      });
    }

    function fancdnFillCookie(success, error) {
      var prox = Utils.proxy('fancdn');
      var prox_enc = '';
      var returnHeaders = androidHeaders;

      if (!prox && !returnHeaders) {
        if (error) error();
        return;
      }

      var host = Utils.fanserialsHost();
      var user_agent = Utils.baseUserAgent();
      var headers = Lampa.Platform.is('android') ? {
        'User-Agent': user_agent
      } : {};

      if (prox) {
        prox_enc += 'param/User-Agent=' + encodeURIComponent(user_agent) + '/';
        prox_enc += 'cookie_plus/param/Cookie=/';
        returnHeaders = false;
      }

      var url = host + '/';
      var postdata = 'login_name=' + encodeURIComponent(Lampa.Storage.get('online_mod_fancdn_name', ''));
      postdata += '&login_password=' + encodeURIComponent(Lampa.Storage.get('online_mod_fancdn_password', ''));
      postdata += '&login=submit';
      network.clear();
      network.timeout(8000);
      network["native"](Utils.proxyLink(url, prox, prox_enc), function (str) {
        var cookie = '';
        var values = {};
        var sid = '';
        var json = typeof str === 'string' ? Lampa.Arrays.decodeJson(str, {}) : str;
        var body = (json && json.body || '').replace(/\n/g, '');
        var error_form = body.match(/(<div class="berrors-inner">[^<]*<b class="berrors-title">[^<]*<\/b>[^<]*<\/div>)/);

        if (error_form) {
          Lampa.Noty.show(error_form[0]);
          if (error) error();
          return;
        }

        var cookieHeaders = json && json.headers && json.headers['set-cookie'] || null;

        if (cookieHeaders && cookieHeaders.forEach) {
          cookieHeaders.forEach(function (param) {
            var parts = param.split(';')[0].split('=');

            if (parts[0]) {
              if (parts[1] === 'deleted') delete values[parts[0]];else values[parts[0]] = parts[1] || '';
            }
          });
          sid = values['PHPSESSID'];
          delete values['PHPSESSID'];
          var cookies = [];

          for (var name in values) {
            cookies.push(name + '=' + values[name]);
          }

          cookie = cookies.join('; ');
        }

        if (cookie) {
          Lampa.Storage.set('online_mod_fancdn_cookie', cookie);
          if (cookie.indexOf('PHPSESSID=') == -1) cookie = 'PHPSESSID=' + (sid || Utils.randomHex(32)) + (cookie ? '; ' + cookie : '');
          var prox_enc2 = prox_enc;

          if (prox) {
            prox_enc2 += 'param/Cookie=' + encodeURIComponent(cookie) + '/';
          } else {
            headers['Cookie'] = cookie;
          }

          network.clear();
          network.timeout(8000);
          network["native"](Utils.proxyLink(host + '/', prox, prox_enc2), function (str) {
            var json = typeof str === 'string' ? Lampa.Arrays.decodeJson(str, {}) : str;
            var body = (json && json.body || '').replace(/\n/g, '');
            var error_form = body.match(/(<div class="berrors-inner">[^<]*<b class="berrors-title">[^<]*<\/b>[^<]*<\/div>)/);

            if (error_form) {
              Lampa.Noty.show(error_form[0]);
              if (error) error();
              return;
            }

            var cookieHeaders = json && json.headers && json.headers['set-cookie'] || null;

            if (cookieHeaders && cookieHeaders.forEach) {
              cookieHeaders.forEach(function (param) {
                var parts = param.split(';')[0].split('=');

                if (parts[0]) {
                  if (parts[1] === 'deleted') delete values[parts[0]];else values[parts[0]] = parts[1] || '';
                }
              });
              delete values['PHPSESSID'];
              var _cookies4 = [];

              for (var _name4 in values) {
                _cookies4.push(_name4 + '=' + values[_name4]);
              }

              cookie = _cookies4.join('; ');
              if (cookie) Lampa.Storage.set('online_mod_fancdn_cookie', cookie);
            }

            if (success) success();
          }, function (a, c) {
            if (success) success();
          }, false, {
            dataType: 'text',
            headers: headers,
            returnHeaders: returnHeaders
          });
        } else {
          if (error) error();
        }
      }, function (a, c) {
        Lampa.Noty.show(network.errorDecode(a, c));
        if (error) error();
      }, postdata, {
        dataType: 'text',
        headers: headers,
        returnHeaders: returnHeaders
      });
    } ///////Онлайн Мод/////////


    function addSettingsOnlineMod() {
      if (Lampa.Settings.main && Lampa.Settings.main() && !Lampa.Settings.main().render().find('[data-component="online_mod"]').length) {
        var field = $(Lampa.Lang.translate("<div class=\"settings-folder selector\" data-component=\"online_mod\">\n            <div class=\"settings-folder__icon\">\n                <svg height=\"260\" viewBox=\"0 0 244 260\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <path d=\"M242,88v170H10V88h41l-38,38h37.1l38-38h38.4l-38,38h38.4l38-38h38.3l-38,38H204L242,88L242,88z M228.9,2l8,37.7l0,0 L191.2,10L228.9,2z M160.6,56l-45.8-29.7l38-8.1l45.8,29.7L160.6,56z M84.5,72.1L38.8,42.4l38-8.1l45.8,29.7L84.5,72.1z M10,88 L2,50.2L47.8,80L10,88z\" fill=\"white\"/>\n                </svg>\n            </div>\n            <div class=\"settings-folder__name\">#{online_mod_title_full}</div>\n        </div>"));
        Lampa.Settings.main().render().find('[data-component="more"]').after(field);
        Lampa.Settings.main().update();
      }
    }

    function initSettings() {
      var template = "<div>";

      if (Utils.isDebug()) {
        template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_proxy_lumex\" data-type=\"toggle\">\n            <div class=\"settings-param__name\">#{online_mod_proxy_balanser} Lumex</div>\n            <div class=\"settings-param__value\"></div>\n        </div>";
      }

      if (Utils.isDebug()) {
        template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_proxy_rezka2\" data-type=\"toggle\">\n            <div class=\"settings-param__name\">#{online_mod_proxy_balanser} HDrezka</div>\n            <div class=\"settings-param__value\"></div>\n        </div>";
        template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_proxy_kinobase\" data-type=\"toggle\">\n            <div class=\"settings-param__name\">#{online_mod_proxy_balanser} Kinobase</div>\n            <div class=\"settings-param__value\"></div>\n        </div>";
        template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_proxy_collaps\" data-type=\"toggle\">\n            <div class=\"settings-param__name\">#{online_mod_proxy_balanser} Collaps</div>\n            <div class=\"settings-param__value\"></div>\n        </div>";
        template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_proxy_cdnmovies\" data-type=\"toggle\">\n            <div class=\"settings-param__name\">#{online_mod_proxy_balanser} CDNMovies</div>\n            <div class=\"settings-param__value\"></div>\n        </div>";
      }

      template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_proxy_filmix\" data-type=\"toggle\">\n            <div class=\"settings-param__name\">#{online_mod_proxy_balanser} Filmix</div>\n            <div class=\"settings-param__value\"></div>\n        </div>";

      if (Utils.isDebug()) {
        template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_proxy_fancdn\" data-type=\"toggle\">\n            <div class=\"settings-param__name\">#{online_mod_proxy_balanser} FanCDN</div>\n            <div class=\"settings-param__value\"></div>\n        </div>";
        template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_proxy_fancdn2\" data-type=\"toggle\">\n            <div class=\"settings-param__name\">#{online_mod_proxy_balanser} FanCDN (ID)</div>\n            <div class=\"settings-param__value\"></div>\n        </div>";
        template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_proxy_fanserials\" data-type=\"toggle\">\n            <div class=\"settings-param__name\">#{online_mod_proxy_balanser} FanSerials</div>\n            <div class=\"settings-param__value\"></div>\n        </div>";
        template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_proxy_fanserials_cdn\" data-type=\"toggle\">\n            <div class=\"settings-param__name\">#{online_mod_proxy_balanser} FanSerials CDN</div>\n            <div class=\"settings-param__value\"></div>\n        </div>";
        template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_proxy_videoseed\" data-type=\"toggle\">\n            <div class=\"settings-param__name\">#{online_mod_proxy_balanser} VideoSeed</div>\n            <div class=\"settings-param__value\"></div>\n        </div>";
        template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_proxy_vibix\" data-type=\"toggle\">\n            <div class=\"settings-param__name\">#{online_mod_proxy_balanser} Vibix</div>\n            <div class=\"settings-param__value\"></div>\n        </div>";
        template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_proxy_redheadsound\" data-type=\"toggle\">\n            <div class=\"settings-param__name\">#{online_mod_proxy_balanser} RedHeadSound</div>\n            <div class=\"settings-param__value\"></div>\n        </div>";
      }

      template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_proxy_anilibria\" data-type=\"toggle\">\n            <div class=\"settings-param__name\">#{online_mod_proxy_balanser} AniLibria</div>\n            <div class=\"settings-param__value\"></div>\n        </div>";
      template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_proxy_anilibria2\" data-type=\"toggle\">\n            <div class=\"settings-param__name\">#{online_mod_proxy_balanser} AniLibria.top</div>\n            <div class=\"settings-param__value\"></div>\n        </div>";

      if (Utils.isDebug()) {
        template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_proxy_animelib\" data-type=\"toggle\">\n            <div class=\"settings-param__name\">#{online_mod_proxy_balanser} AnimeLib</div>\n            <div class=\"settings-param__value\"></div>\n        </div>";
      }

      template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_proxy_kodik\" data-type=\"toggle\">\n            <div class=\"settings-param__name\">#{online_mod_proxy_balanser} Kodik</div>\n            <div class=\"settings-param__value\"></div>\n        </div>";
      template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_skip_kp_search\" data-type=\"toggle\">\n            <div class=\"settings-param__name\">#{online_mod_skip_kp_search}</div>\n            <div class=\"settings-param__value\"></div>\n        </div>";
      template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_iframe_proxy\" data-type=\"toggle\">\n            <div class=\"settings-param__name\">#{online_mod_iframe_proxy}</div>\n            <div class=\"settings-param__value\"></div>\n        </div>";
      template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_proxy_iframe\" data-type=\"toggle\">\n            <div class=\"settings-param__name\">#{online_mod_proxy_balanser} iframe</div>\n            <div class=\"settings-param__value\"></div>\n        </div>";
      template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_prefer_http\" data-type=\"toggle\">\n            <div class=\"settings-param__name\">#{online_mod_prefer_http}</div>\n            <div class=\"settings-param__value\"></div>\n        </div>";
      template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_prefer_mp4\" data-type=\"toggle\">\n            <div class=\"settings-param__name\">#{online_mod_prefer_mp4}</div>\n            <div class=\"settings-param__value\"></div>\n        </div>";

      {
        template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_collaps_lampa_player\" data-type=\"toggle\">\n            <div class=\"settings-param__name\">#{online_mod_collaps_lampa_player}</div>\n            <div class=\"settings-param__value\"></div>\n        </div>";
      }

      template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_full_episode_title\" data-type=\"toggle\">\n            <div class=\"settings-param__name\">#{online_mod_full_episode_title}</div>\n            <div class=\"settings-param__value\"></div>\n        </div>";
      template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_save_last_balanser\" data-type=\"toggle\">\n            <div class=\"settings-param__name\">#{online_mod_save_last_balanser}</div>\n            <div class=\"settings-param__value\"></div>\n        </div>\n        <div class=\"settings-param selector\" data-name=\"online_mod_clear_last_balanser\" data-static=\"true\">\n            <div class=\"settings-param__name\">#{online_mod_clear_last_balanser}</div>\n            <div class=\"settings-param__status\"></div>\n        </div>";

      if (Utils.isDebug()) {
        template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_kinobase_mirror\" data-type=\"input\" placeholder=\"#{settings_cub_not_specified}\">\n            <div class=\"settings-param__name\">#{online_mod_kinobase_mirror}</div>\n            <div class=\"settings-param__value\"></div>\n        </div>";
        template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_kinobase_cookie\" data-type=\"input\" placeholder=\"#{settings_cub_not_specified}\">\n            <div class=\"settings-param__name\">#{online_mod_kinobase_cookie}</div>\n            <div class=\"settings-param__value\"></div>\n        </div>";
      }

      template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_rezka2_mirror\" data-type=\"input\" placeholder=\"#{settings_cub_not_specified}\">\n            <div class=\"settings-param__name\">#{online_mod_rezka2_mirror}</div>\n            <div class=\"settings-param__value\"></div>\n        </div>";

      if (Utils.isDebug()) {
        template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_proxy_rezka2_mirror\" data-type=\"toggle\">\n            <div class=\"settings-param__name\">#{online_mod_proxy_rezka2_mirror}</div>\n            <div class=\"settings-param__value\"></div>\n        </div>";
      }

      template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_rezka2_name\" data-type=\"input\" placeholder=\"#{settings_cub_not_specified}\">\n            <div class=\"settings-param__name\">#{online_mod_rezka2_name}</div>\n            <div class=\"settings-param__value\"></div>\n        </div>\n        <div class=\"settings-param selector\" data-name=\"online_mod_rezka2_password\" data-type=\"input\" data-string=\"true\" placeholder=\"#{settings_cub_not_specified}\">\n            <div class=\"settings-param__name\">#{online_mod_rezka2_password}</div>\n            <div class=\"settings-param__value\"></div>\n        </div>";

      if (Lampa.Platform.is('android')) {
        Lampa.Storage.set("online_mod_rezka2_status", 'false');
      } else {
        template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_rezka2_login\" data-static=\"true\">\n            <div class=\"settings-param__name\">#{online_mod_rezka2_login}</div>\n            <div class=\"settings-param__status\"></div>\n        </div>\n        <div class=\"settings-param selector\" data-name=\"online_mod_rezka2_logout\" data-static=\"true\">\n            <div class=\"settings-param__name\">#{online_mod_rezka2_logout}</div>\n            <div class=\"settings-param__status\"></div>\n        </div>";
      }

      if (Utils.isDebug() || Lampa.Platform.is('android')) {
        template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_rezka2_cookie\" data-type=\"input\" data-string=\"true\" placeholder=\"#{settings_cub_not_specified}\">\n            <div class=\"settings-param__name\">#{online_mod_rezka2_cookie}</div>\n            <div class=\"settings-param__value\"></div>\n        </div>\n        <div class=\"settings-param selector\" data-name=\"online_mod_rezka2_fill_cookie\" data-static=\"true\">\n            <div class=\"settings-param__name\">#{online_mod_rezka2_fill_cookie}</div>\n            <div class=\"settings-param__status\"></div>\n        </div>";
      }

      {
        template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_rezka2_fix_stream\" data-type=\"toggle\">\n            <div class=\"settings-param__name\">#{online_mod_rezka2_fix_stream}</div>\n            <div class=\"settings-param__value\"></div>\n        </div>";
      }

      if (Utils.isDebug()) {
        template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_fancdn_name\" data-type=\"input\" placeholder=\"#{settings_cub_not_specified}\">\n            <div class=\"settings-param__name\">#{online_mod_fancdn_name}</div>\n            <div class=\"settings-param__value\"></div>\n        </div>\n        <div class=\"settings-param selector\" data-name=\"online_mod_fancdn_password\" data-type=\"input\" data-string=\"true\" placeholder=\"#{settings_cub_not_specified}\">\n            <div class=\"settings-param__name\">#{online_mod_fancdn_password}</div>\n            <div class=\"settings-param__value\"></div>\n        </div>";
      }

      if (Utils.isDebug()) {
        template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_fancdn_cookie\" data-type=\"input\" data-string=\"true\" placeholder=\"#{settings_cub_not_specified}\">\n            <div class=\"settings-param__name\">#{online_mod_fancdn_cookie}</div>\n            <div class=\"settings-param__value\"></div>\n        </div>";
      }

      if (Utils.isDebug()) {
        template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_fancdn_fill_cookie\" data-static=\"true\">\n            <div class=\"settings-param__name\">#{online_mod_fancdn_fill_cookie}</div>\n            <div class=\"settings-param__status\"></div>\n        </div>";
      }

      if (Utils.isDebug()) {
        template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_fancdn_token\" data-type=\"input\" data-string=\"true\" placeholder=\"#{settings_cub_not_specified}\">\n            <div class=\"settings-param__name\">#{online_mod_fancdn_token}</div>\n            <div class=\"settings-param__value\"></div>\n        </div>";
      }

      template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_use_stream_proxy\" data-type=\"toggle\">\n            <div class=\"settings-param__name\">#{online_mod_use_stream_proxy}</div>\n            <div class=\"settings-param__value\"></div>\n        </div>";
      template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_rezka2_prx_ukr\" data-type=\"select\">\n            <div class=\"settings-param__name\">#{online_mod_rezka2_prx_ukr}</div>\n            <div class=\"settings-param__value\"></div>\n        </div>";
      template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_proxy_find_ip\" data-type=\"toggle\">\n            <div class=\"settings-param__name\">#{online_mod_proxy_find_ip}</div>\n            <div class=\"settings-param__value\"></div>\n        </div>\n        <div class=\"settings-param selector\" data-name=\"online_mod_proxy_other\" data-type=\"toggle\">\n            <div class=\"settings-param__name\">#{online_mod_proxy_other}</div>\n            <div class=\"settings-param__value\"></div>\n        </div>\n        <div class=\"settings-param selector\" data-name=\"online_mod_proxy_other_url\" data-type=\"input\" placeholder=\"#{settings_cub_not_specified}\">\n            <div class=\"settings-param__name\">#{online_mod_proxy_other_url}</div>\n            <div class=\"settings-param__value\"></div>\n        </div>\n        <div class=\"settings-param selector\" data-name=\"online_mod_secret_password\" data-type=\"input\" data-string=\"true\" placeholder=\"#{settings_cub_not_specified}\">\n            <div class=\"settings-param__name\">#{online_mod_secret_password}</div>\n            <div class=\"settings-param__value\"></div>\n        </div>";

      if (Utils.isDebug()) {
        template += "\n        <div class=\"settings-param selector\" data-name=\"online_mod_av1_support\" data-type=\"toggle\">\n            <div class=\"settings-param__name\">#{online_mod_av1_support}</div>\n            <div class=\"settings-param__value\"></div>\n        </div>";
      }

      template += "\n    </div>";
      Lampa.Template.add('settings_online_mod', template);
      if (window.appready) addSettingsOnlineMod();else {
        Lampa.Listener.follow('app', function (e) {
          if (e.type == 'ready') addSettingsOnlineMod();
        });
      }
      Lampa.Settings.listener.follow('open', function (e) {
        if (e.name == 'online_mod') {
          var clear_last_balanser = e.body.find('[data-name="online_mod_clear_last_balanser"]');
          clear_last_balanser.unbind('hover:enter').on('hover:enter', function () {
            Lampa.Storage.set('online_last_balanser', {});
            Lampa.Storage.set('online_balanser', '');
            Lampa.Storage.set('online_mod_last_balanser', {});
            Lampa.Storage.set('online_mod_balanser', '');
            $('.settings-param__status', clear_last_balanser).removeClass('active error wait').addClass('active');
          });
          var rezka2_login = e.body.find('[data-name="online_mod_rezka2_login"]');
          rezka2_login.unbind('hover:enter').on('hover:enter', function () {
            var rezka2_login_status = $('.settings-param__status', rezka2_login).removeClass('active error wait').addClass('wait');
            rezka2Login(function () {
              rezka2_login_status.removeClass('active error wait').addClass('active');
            }, function () {
              rezka2_login_status.removeClass('active error wait').addClass('error');
            });
          });
          var rezka2_logout = e.body.find('[data-name="online_mod_rezka2_logout"]');
          rezka2_logout.unbind('hover:enter').on('hover:enter', function () {
            var rezka2_logout_status = $('.settings-param__status', rezka2_logout).removeClass('active error wait').addClass('wait');
            rezka2Logout(function () {
              rezka2_logout_status.removeClass('active error wait').addClass('active');
            }, function () {
              rezka2_logout_status.removeClass('active error wait').addClass('error');
            });
          });
          var rezka2_fill_cookie = e.body.find('[data-name="online_mod_rezka2_fill_cookie"]');
          rezka2_fill_cookie.unbind('hover:enter').on('hover:enter', function () {
            var rezka2_fill_cookie_status = $('.settings-param__status', rezka2_fill_cookie).removeClass('active error wait').addClass('wait');
            rezka2FillCookie(function () {
              rezka2_fill_cookie_status.removeClass('active error wait').addClass('active');
              Lampa.Params.update(e.body.find('[data-name="online_mod_rezka2_cookie"]'), [], e.body);
            }, function () {
              rezka2_fill_cookie_status.removeClass('active error wait').addClass('error');
              Lampa.Params.update(e.body.find('[data-name="online_mod_rezka2_cookie"]'), [], e.body);
            });
          });
          var fancdn_fill_cookie = e.body.find('[data-name="online_mod_fancdn_fill_cookie"]');
          fancdn_fill_cookie.unbind('hover:enter').on('hover:enter', function () {
            var fancdn_fill_cookie_status = $('.settings-param__status', fancdn_fill_cookie).removeClass('active error wait').addClass('wait');
            fancdnFillCookie(function () {
              fancdn_fill_cookie_status.removeClass('active error wait').addClass('active');
              Lampa.Params.update(e.body.find('[data-name="online_mod_fancdn_cookie"]'), [], e.body);
            }, function () {
              fancdn_fill_cookie_status.removeClass('active error wait').addClass('error');
              Lampa.Params.update(e.body.find('[data-name="online_mod_fancdn_cookie"]'), [], e.body);
            });
          });
        }
      });
    }

    function startPlugin() {
      if (Utils.isDebug3()) return;
      logApp();
      initStorage();
      initLang();
      initMain();
      initFilmix();
      initSettings();
    }

    startPlugin();

})();
