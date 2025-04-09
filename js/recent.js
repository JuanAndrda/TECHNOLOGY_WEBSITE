document.addEventListener("DOMContentLoaded", function () {
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

  // --- Slider Functionality ---
  const slider = document.querySelector(".slider");
  const slideWidth = 500; // Must match the CSS .slide width
  const cloneCount = 3;   // Number of slides to clone at each end

  // Get original slides (should be 6)
  const originalSlides = Array.from(slider.children);
  const originalCount = originalSlides.length;

  // Clone last cloneCount slides and prepend them
  for (let i = originalCount - cloneCount; i < originalCount; i++) {
    const clone = originalSlides[i].cloneNode(true);
    clone.classList.add("clone");
    slider.insertBefore(clone, slider.firstChild);
  }

  // Clone first cloneCount slides and append them
  for (let i = 0; i < cloneCount; i++) {
    const clone = originalSlides[i].cloneNode(true);
    clone.classList.add("clone");
    slider.appendChild(clone);
  }

  // Update NodeList including clones
  let slides = document.querySelectorAll(".slider .slide");

  // Set initial currentIndex so that original slides are visible
  let currentIndex = cloneCount;

  // Set initial transform without animation, then enable transition
  slider.style.transition = "none";
  slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  slider.getBoundingClientRect(); // force reflow
  slider.style.transition = "transform 0.5s ease";

  // Function to update active slide (center of the three visible)
  function updateActiveSlide() {
    slides.forEach(slide => slide.classList.remove("active"));
    let activeIndex = currentIndex + 1;
    if (slides[activeIndex]) {
      slides[activeIndex].classList.add("active");
    }
  }
  updateActiveSlide();

  // Function to move slider and update active slide
  function moveToSlide(index) {
    currentIndex = index;
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    updateActiveSlide();
  }

  document.getElementById("next").addEventListener("click", function () {
    moveToSlide(currentIndex + 1);
  });

  document.getElementById("prev").addEventListener("click", function () {
    moveToSlide(currentIndex - 1);
  });

  // After transition, if currentIndex is in the cloned zone, jump to corresponding original slide
  slider.addEventListener("transitionend", function () {
    if (currentIndex >= cloneCount + originalCount) {
      slider.style.transition = "none";
      currentIndex = currentIndex - originalCount;
      slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      slider.getBoundingClientRect();
      slider.style.transition = "transform 0.5s ease";
      updateActiveSlide();
    }
    if (currentIndex < cloneCount) {
      slider.style.transition = "none";
      currentIndex = currentIndex + originalCount;
      slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      slider.getBoundingClientRect();
      slider.style.transition = "transform 0.5s ease";
      updateActiveSlide();
    }
  });

  // --- Popchat Modal for Portfolio and Slider Details ---
  // Create a global popchat container for details
  const popchatContainer = document.createElement("div");
  popchatContainer.classList.add("popchat-container");
  popchatContainer.style.display = "none";
  popchatContainer.innerHTML = `
    <div class="popchat-content">
      <button class="popchat-close">&times;</button>
      <p id="popchat-text"></p>
    </div>
  `;
  document.body.appendChild(popchatContainer);

  // Open the popchat modal for portfolio items when any detail button is clicked.
  document.querySelectorAll(".portfolio-item").forEach(function (item) {
    const detailBtn = item.querySelector(".detail-btn");
    detailBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const infoText = detailBtn.getAttribute("data-detail") || "Details coming soon.";
      document.getElementById("popchat-text").innerHTML = infoText;
      popchatContainer.style.display = "flex"; // show modal (flex for centering)
    });
  });

  // Open the popchat modal for slider details when any slider detail button is clicked.
  document.querySelectorAll(".slide-detail-btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const slide = btn.closest(".slide");
      const detailText = slide.querySelector(".slide-definition").innerHTML || "Details coming soon.";
      document.getElementById("popchat-text").innerHTML = detailText;
      popchatContainer.style.display = "flex";
    });
  });

  // Close the popchat modal when the close button is clicked.
  popchatContainer.querySelector(".popchat-close").addEventListener("click", function (e) {
    e.preventDefault();
    popchatContainer.style.display = "none";
  });

  // --- Prevent Widow Lines in Slider Text ---
  function preventWidow(element) {
    let text = element.innerHTML.trim();
    const lastSpaceIndex = text.lastIndexOf(" ");
    if (lastSpaceIndex !== -1) {
      element.innerHTML =
        text.substring(0, lastSpaceIndex) +
        "&nbsp;" +
        text.substring(lastSpaceIndex + 1);
    }
  }

  // Apply preventWidow to slider text elements
  document.querySelectorAll(".slide-info, .slide-definition").forEach(elem => {
    preventWidow(elem);
  });
});

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
