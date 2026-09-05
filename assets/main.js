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

  /* Мобильное меню — выезжающая панель с подложкой */
  var toggle = document.querySelector('.nav-toggle');
  var toggleLabel = document.querySelector('.nav-toggle-label');
  var nav = document.querySelector('.mainnav');
  var backdrop = document.getElementById('nav-backdrop');

  function setMenu(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (toggleLabel) toggleLabel.textContent = open ? 'Закрыть' : 'Меню';
    if (backdrop) {
      backdrop.hidden = false;
      backdrop.classList.toggle('open', open);
      if (!open) {
        window.setTimeout(function () {
          if (!nav.classList.contains('open')) backdrop.hidden = true;
        }, 320);
      }
    }
    document.body.classList.toggle('nav-open', open);
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setMenu(!nav.classList.contains('open'));
    });
    if (backdrop) backdrop.addEventListener('click', function () { setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) setMenu(false);
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
