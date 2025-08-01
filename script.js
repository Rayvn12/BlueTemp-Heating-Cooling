let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-slide");
const dots = document.querySelectorAll(".dot");
let autoSlideInterval;
let isPaused = false;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
    dots[i].classList.toggle("active", i === index);
  });
  currentSlide = index;
}

function goToSlide(index) {
  showSlide(index);
}

function changeSlide(step) {
  let newIndex = (currentSlide + step + slides.length) % slides.length;
  showSlide(newIndex);
}

function autoSlide() {
  if (!isPaused) {
    changeSlide(1);
  }
}

function startAutoSlide() {
  autoSlideInterval = setInterval(autoSlide, 6000);
}

function pauseAutoSlide() {
  isPaused = true;
}

function resumeAutoSlide() {
  isPaused = false;
}

startAutoSlide();

// Auto-pause on hover
const carousel = document.getElementById("testimonial-carousel");
carousel.addEventListener("mouseenter", pauseAutoSlide);
carousel.addEventListener("mouseleave", resumeAutoSlide);

// Swipe Support
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener("touchstart", e => {
  touchStartX = e.changedTouches[0].screenX;
});

carousel.addEventListener("touchend", e => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  if (touchEndX < touchStartX - 40) {
    changeSlide(1); // swipe left
  } else if (touchEndX > touchStartX + 40) {
    changeSlide(-1); // swipe right
  }
}
