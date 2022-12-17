window.addEventListener('DOMContentLoaded', () => {
    // Slider Version #1

  const prev = document.querySelector('.offer__slider-prev');
  const next = document.querySelector('.offer__slider-next');
  const slides = document.querySelectorAll('.offer__slide');
  const current = document.querySelector('#current');
  const total = document.querySelector('#total');
  let slideIndex = 1;

  showSlide(slideIndex);

  function addZero(num) {
    return num < 10 ? `0${num}` : num;
  }

  total.innerHTML = addZero(slides.length);

  function showSlide(n) {
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }

    current.innerHTML = addZero(slideIndex);

    slides.forEach((slide, i) => slide.classList.add('hide'));

    (slides[slideIndex - 1]).classList.remove('hide');
    
  }

  function plusSlides(n) {
    showSlide(slideIndex += n);
  }

  next.addEventListener('click', () => {
    plusSlides(1);
    current.innerHTML = addZero(slideIndex);
  });

  prev.addEventListener('click', () => {
    plusSlides(-1);
    current.innerHTML = addZero(slideIndex);
  });

});