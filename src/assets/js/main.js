document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // Reveal waypoints on the home page route line as they enter view
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var waypoints = document.querySelectorAll('.waypoint');
  if (waypoints.length && !reduceMotion && 'IntersectionObserver' in window) {
    waypoints.forEach(function (w) { w.style.opacity = 0; w.style.transform = 'translateY(18px)'; w.style.transition = 'opacity .6s ease, transform .6s ease'; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    waypoints.forEach(function (w) { io.observe(w); });
  }
});
