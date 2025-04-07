document.addEventListener("DOMContentLoaded", function () {
  // ---------------------
  // Loading Screen Functionality (if applicable)
  // ---------------------
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

  // ---------------------
  // Popup Functions (for Info page, if applicable)
  // ---------------------
  window.openPopup = function (popupId) {
    const popup = document.getElementById(popupId);
    if (popup) popup.style.display = "flex";
  };

  window.closePopup = function (popupId) {
    const popup = document.getElementById(popupId);
    if (popup) popup.style.display = "none";
  };

  // ---------------------
  // Sidebar Scroll Hide/Show
  // ---------------------
  let scrollTimeout;
  const sidebar = document.querySelector(".sidebar");
  window.addEventListener("scroll", function () {
    if (sidebar) sidebar.classList.add("hide");
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (sidebar) sidebar.classList.remove("hide");
    }, 300);
  });

  // ---------------------
  // Slider Functionality for Team Members (move one item per click)
  // ---------------------
  const sliderWrapper = document.querySelector(".slider-wrapper");
  const sliderItems = document.querySelectorAll(".slider-item");
  const teamSlider = document.querySelector(".team-slider"); // visible container
  const prevBtn = document.querySelector(".slider-btn.prev");
  const nextBtn = document.querySelector(".slider-btn.next");

  if (!sliderWrapper || sliderItems.length === 0 || !prevBtn || !nextBtn || !teamSlider) {
    console.error("Slider elements not found. Please check the HTML structure.");
    return;
  }

  let currentIndex = 0;
  
  // Calculate the distance to move per click (item width plus gap)
  const gap = parseFloat(getComputedStyle(sliderWrapper).getPropertyValue("gap")) || 0;
  const itemWidth = sliderItems[0].offsetWidth;
  const scrollDistance = itemWidth + gap;

  // Dynamically compute the maximum scrollable index:
  // visibleWidth: width of the slider container
  // totalWidth: total width of the slider wrapper (sum of all items plus internal gaps)
  const visibleWidth = teamSlider.offsetWidth;
  const totalWidth = sliderWrapper.scrollWidth;
  const maxScrollDistance = totalWidth - visibleWidth;
  const maxIndex = Math.ceil(maxScrollDistance / scrollDistance);

  // Move left
  prevBtn.addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex--;
      sliderWrapper.style.transform = `translateX(-${currentIndex * scrollDistance}px)`;
    }
  });

  // Move right
  nextBtn.addEventListener("click", function () {
    if (currentIndex < maxIndex) {
      currentIndex++;
      sliderWrapper.style.transform = `translateX(-${currentIndex * scrollDistance}px)`;
    }
  });
});
