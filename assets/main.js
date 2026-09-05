(function () {
  'use strict';

  /* Приветствия в шапке — только на главной, единственная анимация на сайте */
  var track = document.querySelector('.greet-track');
  if (track && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var total = track.children.length; // последний дублирует первый
    var i = 0;
    track.style.transform = 'translateY(0)';
    setInterval(function () {
      i++;
      track.style.transition = 'transform .55s cubic-bezier(.66,0,.2,1)';
      track.style.transform = 'translateY(-' + (i * (100 / total)) + '%)';
      if (i === total - 1) {
        setTimeout(function () {
          track.style.transition = 'none';
          track.style.transform = 'translateY(0)';
          i = 0;
        }, 600);
      }
    }, 2200);
  }

  /* Мобильное меню */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.mainnav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('.has-sub > a').forEach(function (a) {
      a.addEventListener('click', function (e) {
        if (window.innerWidth > 980) return;
        var li = a.parentElement;
        if (!li.classList.contains('sub-open')) {
          e.preventDefault();
          nav.querySelectorAll('.sub-open').forEach(function (o) { o.classList.remove('sub-open'); });
          li.classList.add('sub-open');
        }
      });
    });
  }

  /* Единый список курсов на сайте: если пришли со страницы курса, подставляем его в форму заявки */
  var courseSelect = document.getElementById('course');
  if (courseSelect) {
    var params = new URLSearchParams(window.location.search);
    var key = params.get('course');
    if (key) {
      var opt = courseSelect.querySelector('option[data-k="' + key + '"]');
      if (opt) {
        courseSelect.value = opt.value;
      }
    }
  }

  /* Заявка: демо-обработчик. Реальная интеграция (CRM/Telegram/почта) — отдельная задача, см. CLAUDE.md */
  var lead = document.getElementById('lead');
  if (lead) {
    lead.addEventListener('submit', function (e) {
      e.preventDefault();
      var phone = document.getElementById('phone');
      alert('Демо-версия формы: заявка пока никуда не отправляется. Нужно подключить приём заявок (CRM, Telegram-бот или почта) — см. пункт 5 в CLAUDE.md.');
      if (phone) phone.focus();
    });
  }

  var lead2 = document.getElementById('lead-2');
  if (lead2) {
    lead2.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Демо-версия формы: заявка пока никуда не отправляется.');
    });
  }
})();
