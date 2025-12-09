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
});