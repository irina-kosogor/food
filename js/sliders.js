window.addEventListener('DOMContentLoaded', () => {
  // Slider Version #1
  
  // const prev = document.querySelector('.offer__slider-prev');
  // const next = document.querySelector('.offer__slider-next');
  // const slides = document.querySelectorAll('.offer__slide');
  // const current = document.querySelector('#current');
  // const total = document.querySelector('#total');
  // let slideIndex = 1;

  // showSlide(slideIndex);

  // function addZero(num) {
  //   return num < 10 ? `0${num}` : num;
  // }

  // total.innerHTML = addZero(slides.length);

  // function showSlide(n) {
  //   if (n > slides.length) {
  //     slideIndex = 1;
  //   }
  //   if (n < 1) {
  //     slideIndex = slides.length;
  //   }

  //   current.innerHTML = addZero(slideIndex);

  //   slides.forEach((slide, i) => slide.classList.add('hide'));

  //   (slides[slideIndex - 1]).classList.remove('hide');
    
  // }

  // function plusSlides(n) {
  //   showSlide(slideIndex += n);
  // }

  // next.addEventListener('click', () => {
  //   plusSlides(1);
  //   current.innerHTML = addZero(slideIndex);
  // });

  // prev.addEventListener('click', () => {
  //   plusSlides(-1);
  //   current.innerHTML = addZero(slideIndex);
  // });

  // Slider Version #2

  let offset = 0;
  let slideIndex = 1;

  const slides = document.querySelectorAll('.offer__slide');
  const prev = document.querySelector('.offer__slider-prev');
  const next = document.querySelector('.offer__slider-next');
  const total = document.querySelector('#total');
  const current = document.querySelector('#current');
  const slidesWrapper = document.querySelector('.offer__slider-wrapper');
  const width = window.getComputedStyle(slidesWrapper).width;
  const slidesField = document.querySelector('.offer__slider-inner');


  function addZero(num) {
    return num < 10 ? `0${num}` : num;
  }

  total.textContent = addZero(slides.length);
  current.textContent = addZero(slideIndex);

  slidesField.style.cssText = `
    width: ${100 * slides.length}%;
    display: flex;
    transition: 0.5s all;
  `;

  slidesWrapper.style.overflow = 'hidden';

  slides.forEach(slide => slide.style.width = width);

  next.addEventListener('click', () => {
    if (offset == +width.slice(0, -2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, -2);
    }

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    slidesField.style.transform = `translateX(-${offset}px)`;
    current.textContent = addZero(slideIndex);
  });

  prev.addEventListener('click', () => {
    if (offset == 0) {
      offset = +width.slice(0, -2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, -2);
    }
    
    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    slidesField.style.transform = `translateX(-${offset}px)`;
    current.textContent = addZero(slideIndex);
  });

});