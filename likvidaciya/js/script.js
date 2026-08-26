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
  var mform = document.getElementById('mform');
  var mok = document.getElementById('mok');
  var last = null;

  function open(intent){
    last = document.activeElement;
    mtitle.textContent = intent;
    msub.textContent = intent === 'Забронировать'
      ? 'Оставьте контакты — закрепим за вами место и пришлём условия.'
      : 'Оставьте контакты — пришлём ссылку на оплату и доступ к программе.';
    mform.style.display = '';
    mok.style.display = 'none';
    document.getElementById('form').reset();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(function(){ var f = modal.querySelector('input'); if (f) f.focus(); }, 40);
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

  document.getElementById('form').addEventListener('submit', function(e){
    e.preventDefault();
    var f = e.target;
    var bad = false;
    Array.prototype.forEach.call(f.elements, function(el){
      if (el.required && !el.checkValidity()){ bad = true; }
    });
    if (bad){ f.reportValidity(); return; }
    mform.style.display = 'none';
    mok.style.display = '';
  });
})();
