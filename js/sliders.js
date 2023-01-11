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
  const slider = document.querySelector('.offer__slider');
  const slidesWrapper = document.querySelector('.offer__slider-wrapper');
  const width = window.getComputedStyle(slidesWrapper).width;
  const slidesField = document.querySelector('.offer__slider-inner');
  const dots = [];

  function addZero(num) {
    return num < 10 ? `0${num}` : num;
  }

  function deleteNotDigits(str) {
    return +str.replace(/\D/g, '');
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
    if (offset == deleteNotDigits(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += deleteNotDigits(width);
    }
    
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    current.textContent = addZero(slideIndex);
    toggleDotOpacity();
  });

  prev.addEventListener('click', () => {
    if (offset == 0) {
      offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
      offset -= deleteNotDigits(width);
    }
    
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    current.textContent = addZero(slideIndex);
    toggleDotOpacity();
  });

  // Slides navigation

  slider.style.position = 'relative';

  const indicators = document.createElement('ol');
  indicators.classList.add('carousel-indicators');
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('li');
      dot.setAttribute('data-slide-to', i + 1);
      dot.classList.add('dot');
      
      if (i == 0) {
        dot.style.opacity = 1;
      }
      
      indicators.append(dot);
      dots.push(dot);
  }

  function toggleDotOpacity() {
    dots.forEach(dot => dot.style.opacity = 0.5);
    dots[slideIndex - 1].style.opacity = 1;
  }

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      current.textContent = addZero(slideIndex);
      toggleDotOpacity();
    });
  });

});