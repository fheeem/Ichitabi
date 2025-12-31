// map.js

window.onload = function () {
  const carouselItem = document.querySelector('.carousel-item');
  const carouselLi = carouselItem.querySelectorAll('li');

  const cloneFirstItem = carouselLi[0].cloneNode(true);
  carouselItem.appendChild(cloneFirstItem);

  let currentIndex = 0;
  let translate = 0;
  let liWidth = carouselLi[0].clientWidth; // 슬라이드 하나의 이미지 너비

  const carouselItemCloneLis = carouselItem.querySelectorAll('li');
  const slideTransition = 500;
  const carouselItemWidth = liWidth * carouselItemCloneLis.length;
  carouselItem.style.width = `${carouselItemWidth}px`;
  carouselItem.style.transform = `translateX(${translate}px)`;

  window.addEventListener('resize', () => {
    liWidth = carouselLi[0].clientWidth;
    translate = -liWidth;
  });

  // 슬라이드 진행
  function slideToNext() {
    currentIndex += 1;
    translate -= liWidth;
    carouselItem.style.transform = `translateX(${translate}px)`;
    carouselItem.style.transition = `all ${slideTransition}ms ease`;
  }

  function slide() {
    slideToNext();
    if (currentIndex === carouselItemCloneLis.length - 1) {
      setTimeout(() => {
        carouselItem.style.transition = 'none';
        currentIndex = 0;
        translate = 0;
        carouselItem.style.transform = `translateX(${translate}px)`;
      }, slideTransition);
    }
  }

  function slideAuto(slideInterval) {
    setInterval(slide, slideInterval);
  }

  slideAuto(3000);
};
