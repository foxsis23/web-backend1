(function () {
  'use strict';

  var header = document.getElementById('header');
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  var overlay = document.createElement('div');
  overlay.classList.add('nav-overlay');
  document.body.appendChild(overlay);

  function openMenu() {
    burger.classList.add('active');
    burger.setAttribute('aria-expanded', 'true');
    nav.classList.add('open');
    overlay.classList.add('active');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    burger.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
    overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  burger.addEventListener('click', function () {
    if (nav.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlay.addEventListener('click', closeMenu);

  nav.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
      burger.focus();
    }
  });

  var ticking = false;

  function updateHeader() {
    var scrollY = window.scrollY || window.pageYOffset;
    if (scrollY > 60) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  updateHeader();

  var revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  document.querySelectorAll('.btn--cart').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var button = this;
      button.innerHTML =
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">' +
        '<polyline points="20 6 9 17 4 12"/>' +
        '</svg>';

      setTimeout(function () {
        button.innerHTML =
          '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
          '<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>' +
          '<line x1="3" y1="6" x2="21" y2="6"/>' +
          '<path d="M16 10a4 4 0 01-8 0"/>' +
          '</svg>';
      }, 1500);
    });
  });

  var ctaForm = document.querySelector('.cta__form');
  if (ctaForm) {
    ctaForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = this.querySelector('.cta__input');
      var btn = this.querySelector('.cta__btn');
      var originalText = btn.textContent;

      btn.textContent = 'Дякуємо!';
      btn.style.pointerEvents = 'none';
      input.value = '';

      setTimeout(function () {
        btn.textContent = originalText;
        btn.style.pointerEvents = '';
      }, 2500);
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        closeMenu();

        var headerOffset = parseInt(
          getComputedStyle(document.documentElement)
            .getPropertyValue('--header-height')
        ) || 72;

        var offsetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
})();
