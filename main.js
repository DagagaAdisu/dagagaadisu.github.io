(function () {
  var root = document.documentElement;
  var btn = document.querySelector('.theme-toggle');
  if (!btn) return;

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

  function current() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function render() {
    var isDark = current() === 'dark';
    btn.textContent = isDark ? 'Light' : 'Dark';
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
  }

  var stored = readStored();
  if (stored) {
    root.setAttribute('data-theme', stored);
  }

  render();

  btn.addEventListener('click', function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    writeStored(next);
    render();
  });
})();
