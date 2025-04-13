document.addEventListener("DOMContentLoaded", function () {
  // --- Optional: Loading Screen & Popup Functions ---
  const loadingScreen = document.getElementById("loading-screen");
  const navLinks = document.querySelectorAll(".sidebar a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      if (loadingScreen) {
        loadingScreen.style.display = "flex";
      }
      setTimeout(() => {
        window.location.href = this.href;
      }, 500);
    });
  });

  window.openPopup = function (popupId) {
    const popup = document.getElementById(popupId);
    if (popup) popup.style.display = "flex";
  };
  window.closePopup = function (popupId) {
    const popup = document.getElementById(popupId);
    if (popup) popup.style.display = "none";
  };

  // --- Sidebar Hide/Show on Scroll ---
  let scrollTimeout;
  const sidebar = document.querySelector(".sidebar");
  window.addEventListener("scroll", function () {
    if (sidebar) sidebar.classList.add("hide");
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (sidebar) sidebar.classList.remove("hide");
    }, 300);
  });

  // --- Infinite Circular Slider Setup ---
  const sliderWrapper = document.querySelector(".slider-wrapper");
  const teamSlider = document.querySelector(".team-slider");

  // Get the real slider items
  let realSliderItems = Array.from(sliderWrapper.querySelectorAll(".slider-item"));

  // If there are fewer than 3, duplicate them until there are at least 3.
  if (realSliderItems.length < 3) {
    const count = realSliderItems.length;
    const needed = 3 - count;
    for (let i = 0; i < needed; i++) {
      sliderWrapper.appendChild(realSliderItems[i % count].cloneNode(true));
    }
    realSliderItems = Array.from(sliderWrapper.querySelectorAll(".slider-item"));
  }

  // For smooth, endless looping with 3 visible slides, prepend 2 clones (the last two real slides)
  // and append 2 clones (the first two real slides)
  const cloneCount = 2;
  // Prepend clones from the end (in order)
  for (let i = realSliderItems.length - cloneCount; i < realSliderItems.length; i++) {
    const clone = realSliderItems[i].cloneNode(true);
    sliderWrapper.insertBefore(clone, sliderWrapper.firstChild);
  }
  // Append clones from the beginning
  for (let i = 0; i < cloneCount; i++) {
    const clone = realSliderItems[i].cloneNode(true);
    sliderWrapper.appendChild(clone);
  }

  // After cloning, update our slider items list.
  let sliderItems = Array.from(sliderWrapper.querySelectorAll(".slider-item"));

  // The real slides are now located from index = cloneCount to index = cloneCount + realSliderItems.length - 1.
  const realStart = cloneCount;
  const realCount = realSliderItems.length;

  // Set currentIndex to the first real slide.
  let currentIndex = realStart;
  sliderWrapper.style.transition = "transform 0.5s ease-in-out";

  // Update slider: centers the active slide and highlights it.
  const updateSlider = () => {
    sliderItems.forEach((item, index) => {
      item.classList.toggle("active", index === currentIndex);
    });
    const containerWidth = teamSlider.offsetWidth;
    const activeItem = sliderItems[currentIndex];
    const offset = activeItem.offsetLeft - (containerWidth - activeItem.offsetWidth) / 2;
    sliderWrapper.style.transform = `translateX(-${offset}px)`;
  };

  // Unified function to move slides.
  const moveSlide = (direction) => {
    if (direction === "next") {
      currentIndex++;
    } else if (direction === "prev") {
      currentIndex--;
    }
    updateSlider();
  };

  // Auto slide every 3 seconds.
  const autoSlide = () => moveSlide("next");
  let autoSlideInterval = setInterval(autoSlide, 3000);

  // On transition end, check for clones at boundaries and reset seamlessly.
  sliderWrapper.addEventListener("transitionend", function () {
    if (currentIndex >= realStart + realCount) {
      sliderWrapper.style.transition = "none";
      currentIndex = currentIndex - realCount;
      updateSlider();
      void sliderWrapper.offsetWidth; // force reflow
      sliderWrapper.style.transition = "transform 0.5s ease-in-out";
    } else if (currentIndex < realStart) {
      sliderWrapper.style.transition = "none";
      currentIndex = currentIndex + realCount;
      updateSlider();
      void sliderWrapper.offsetWidth;
      sliderWrapper.style.transition = "transform 0.5s ease-in-out";
    }
  });

  // Navigation buttons.
  const prevBtn = document.querySelector(".slider-btn.prev");
  const nextBtn = document.querySelector(".slider-btn.next");
  prevBtn.addEventListener("click", function () {
    clearInterval(autoSlideInterval);
    moveSlide("prev");
    autoSlideInterval = setInterval(autoSlide, 3000);
  });
  nextBtn.addEventListener("click", function () {
    clearInterval(autoSlideInterval);
    moveSlide("next");
    autoSlideInterval = setInterval(autoSlide, 3000);
  });

  // Swipe functionality.
  let touchStartX = 0, touchEndX = 0;
  const swipeThreshold = 50;
  teamSlider.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });
  teamSlider.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX;
    clearInterval(autoSlideInterval);
    if (diff > swipeThreshold) {
      moveSlide("prev");
    } else if (diff < -swipeThreshold) {
      moveSlide("next");
    }
    autoSlideInterval = setInterval(autoSlide, 3000);
  });

  // Update slider on window resize.
  window.addEventListener("resize", updateSlider);

  // Initialize positioning.
  updateSlider();
});
