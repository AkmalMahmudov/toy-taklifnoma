// Countdown timer to the wedding date
(function () {
  var el = document.getElementById('countdown');
  if (!el) return;
  var target = new Date(el.getAttribute('data-target')).getTime();

  var daysEl = document.getElementById('cd-days');
  var hoursEl = document.getElementById('cd-hours');
  var minsEl = document.getElementById('cd-mins');
  var secsEl = document.getElementById('cd-secs');

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    var now = Date.now();
    var diff = target - now;

    if (diff <= 0) {
      daysEl.textContent = hoursEl.textContent = minsEl.textContent = secsEl.textContent = '00';
      clearInterval(timer);
      return;
    }

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    var mins = Math.floor((diff / (1000 * 60)) % 60);
    var secs = Math.floor((diff / 1000) % 60);

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minsEl.textContent = pad(mins);
    secsEl.textContent = pad(secs);
  }

  tick();
  var timer = setInterval(tick, 1000);
})();

// Decorative falling petals background
(function () {
  var container = document.querySelector('.petals');
  if (!container) return;
  var count = window.innerWidth < 640 ? 10 : 18;

  for (var i = 0; i < count; i++) {
    var petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.left = Math.random() * 100 + '%';
    petal.style.width = petal.style.height = (6 + Math.random() * 8) + 'px';
    petal.style.animationDuration = (12 + Math.random() * 14) + 's';
    petal.style.animationDelay = (Math.random() * -20) + 's';
    petal.style.opacity = 0.25 + Math.random() * 0.35;
    container.appendChild(petal);
  }
})();

// Reveal elements as they scroll into view
(function () {
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  items.forEach(function (el) { observer.observe(el); });
})();
