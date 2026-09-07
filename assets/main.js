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

  /* Accessible drawer and native disclosure navigation. */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.mainnav');
  var backdrop = document.getElementById('nav-backdrop');
  var mobile = window.matchMedia('(max-width:760px)');
  function setMenu(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    backdrop.hidden = !open;
    backdrop.classList.toggle('open', open);
    document.body.classList.toggle('nav-open', open);
    nav.inert = mobile.matches && !open;
    if (open) nav.querySelector('summary').focus();
    else toggle.focus();
  }
  if (nav && toggle) {
    nav.inert = mobile.matches;
    toggle.addEventListener('click', function(){ setMenu(!nav.classList.contains('open')); });
    backdrop.addEventListener('click', function(){ setMenu(false); });
    nav.querySelectorAll('details').forEach(function(d){
      d.addEventListener('toggle', function(){ if(d.open) nav.querySelectorAll('details').forEach(function(other){ if(other!==d) other.open=false; }); });
    });
    document.addEventListener('click', function(e){ if(!nav.contains(e.target)) nav.querySelectorAll('details').forEach(function(d){ d.open=false; }); });
    document.addEventListener('keydown', function(e){
      if(e.key==='Escape') { if(nav.classList.contains('open')) setMenu(false); nav.querySelectorAll('details').forEach(function(d){d.open=false;}); }
      if(e.key==='Tab' && nav.classList.contains('open')) {
        var items=Array.from(nav.querySelectorAll('a,summary')).filter(function(el){return el.getClientRects().length;});
        var first=items[0], last=items[items.length-1];
        if(e.shiftKey && document.activeElement===first){e.preventDefault();last.focus();}
        else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first.focus();}
      }
    });
    mobile.addEventListener('change', function(){setMenu(false);nav.inert=mobile.matches;});
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
      alert('Онлайн-запись готовится к запуску. Позвоните нам: +7 932 440 65 38.');
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
