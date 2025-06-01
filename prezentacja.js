
 const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
      }
      if (e.key === 'ArrowLeft') {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
      }
    });

    setInterval(() => {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}, 6000);