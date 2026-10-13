(function () {
  var root = document.documentElement;
  var themeBtn = document.querySelector('.theme-toggle');
  var navBtn = document.querySelector('.nav-toggle');
  var nav = document.querySelector('#primary-nav');

  var KEY = 'theme';

  function readStored() {
    try {
      var v = localStorage.getItem(KEY);
      if (v === 'dark' || v === 'light') return v;
    } catch (e) {}
    return null;
  }

  function writeStored(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }

  function currentTheme() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function renderTheme() {
    if (!themeBtn) return;
    var isDark = currentTheme() === 'dark';
    themeBtn.textContent = isDark ? 'Light' : 'Dark';
    themeBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    themeBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
  }

  var stored = readStored();
  if (stored) {
    root.setAttribute('data-theme', stored);
  }

  renderTheme();

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      writeStored(next);
      renderTheme();
    });
  }

  function closeNav() {
    if (!nav || !navBtn) return;
    nav.classList.remove('open');
    navBtn.setAttribute('aria-expanded', 'false');
    navBtn.setAttribute('aria-label', 'Open menu');
  }

  function openNav() {
    if (!nav || !navBtn) return;
    nav.classList.add('open');
    navBtn.setAttribute('aria-expanded', 'true');
    navBtn.setAttribute('aria-label', 'Close menu');
  }

  if (nav && navBtn) {
    navBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (nav.classList.contains('open')) {
        closeNav();
      } else {
        openNav();
      }
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeNav();
    });

    document.addEventListener('click', function (e) {
      if (!nav.classList.contains('open')) return;
      if (nav.contains(e.target) || navBtn.contains(e.target)) return;
      closeNav();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    var mq = window.matchMedia('(min-width: 721px)');
    var onChange = function (e) { if (e.matches) closeNav(); };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }
})();
