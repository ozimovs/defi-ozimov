(function () {
  /* accordion */
  document.querySelectorAll('.acc-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      var item = btn.closest('.acc-item');
      var open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  /* reveal on scroll */
  var rvs = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, {rootMargin:'0px 0px -8% 0px', threshold:0.05});
    rvs.forEach(function(el){ io.observe(el); });
  } else {
    rvs.forEach(function(el){ el.classList.add('in'); });
  }
  setTimeout(function(){ rvs.forEach(function(el){ el.classList.add('in'); }); }, 1200);

  /* sticky mobile CTA */
  var sticky = document.getElementById('sticky');
  var hero = document.querySelector('.hero');
  if (window.matchMedia('(max-width:820px)').matches){
    document.body.classList.add('has-sticky');
    if ('IntersectionObserver' in window){
      new IntersectionObserver(function(es){
        sticky.classList.toggle('on', !es[0].isIntersecting);
      }, {threshold:0.02}).observe(hero);
    }
  }

  /* modal */
  var modal = document.getElementById('modal');
  var mtitle = document.getElementById('mtitle');
  var msub = modal.querySelector('.m-sub');
  var wPay = document.getElementById('w-pay');
  var wBook = document.getElementById('w-book');
  var last = null;

  function open(intent){
    last = document.activeElement;
    var booking = intent === 'Забронировать';
    mtitle.textContent = intent;
    msub.textContent = booking
      ? 'Оставьте контакты — закрепим за вами место и пришлём условия.'
      : 'Оставьте контакты — пришлём ссылку на оплату и доступ к программе.';
    wPay.style.display = booking ? 'none' : '';
    wBook.style.display = booking ? '' : 'none';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close(){
    modal.classList.remove('open');
    document.body.style.overflow = '';
    if (last && last.focus) last.focus();
  }

  document.querySelectorAll('[data-open]').forEach(function(b){
    b.addEventListener('click', function(){ open(b.getAttribute('data-open')); });
  });
  modal.querySelectorAll('[data-close]').forEach(function(b){
    b.addEventListener('click', close);
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && modal.classList.contains('open')) close();
  });

})();
