document.addEventListener('DOMContentLoaded', function() {
  const images = [
    'img/cerradura.jpeg',
    'img/maq.jpeg',
    'img/porton.jpeg',
    'img/cerrojosSAG.jpeg',
    'img/maq2.jpeg',
    'img/porton2.jpeg',
    'img/llaves.jpeg',
    'img/porton3.jpeg',
    'img/maq3.jpeg'
  ];

  const carouselInner = document.getElementById('carouselInner');

  function createCarousel() {
    carouselInner.innerHTML = ''; // limpiar contenido

    let width = window.innerWidth;
    let slidesPerView = 1; // default móvil

    if (width >= 992) slidesPerView = 3; // desktop
    else if (width >= 576) slidesPerView = 2; // tablet

    // Crear slides
    for (let i = 0; i < images.length; i += slidesPerView) {
      const carouselItem = document.createElement('div');
      carouselItem.classList.add('carousel-item');
      if (i === 0) carouselItem.classList.add('active');

      const row = document.createElement('div');
      row.classList.add('row', 'g-3');

      // Insertar imágenes en este slide
      for (let j = i; j < i + slidesPerView && j < images.length; j++) {
        const col = document.createElement('div');
        col.classList.add('col-12');
        if (slidesPerView === 2) col.classList.add('col-sm-6');
        if (slidesPerView === 3) col.classList.add('col-md-4');

        const img = document.createElement('img');
        img.src = images[j];
        img.classList.add('d-block', 'w-100', 'foto-carrusel');
        img.alt = `Trabajo de cerrajería ${j + 1} en Tecnillaves`;

        col.appendChild(img);
        row.appendChild(col);
      }

      carouselItem.appendChild(row);
      carouselInner.appendChild(carouselItem);
    }
  }

  // Inicializar carrusel
  createCarousel();

  // Recalcular si se cambia el tamaño de la ventana
  window.addEventListener('resize', createCarousel);

  // ---- Animación de secciones al hacer scroll ----
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Para que no vuelva a desaparecer:
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  revealElements.forEach(el => observer.observe(el));

  // ---- Scroll suave con easing y offset para el navbar ----
  const navLinks = document.querySelectorAll('.navbar .nav-link[href^="#"]');

  function smoothScrollTo(targetY, duration = 600) {
    const startY = window.pageYOffset;
    const diff = targetY - startY;
    const startTime = performance.now();

    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function step(now) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = easeInOutQuad(t);
      window.scrollTo(0, startY + diff * eased);
      if (t < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const id = href.slice(1);
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();

      const navHeight = document.querySelector('.navbar')?.offsetHeight || 70;
      const rect = target.getBoundingClientRect();
      const targetY = rect.top + window.pageYOffset - navHeight;

      smoothScrollTo(targetY, 650);

      // cerrar menú en móvil
      const navbarCollapse = document.getElementById('navMenu');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        bsCollapse && bsCollapse.hide();
      }
    });
  });
});