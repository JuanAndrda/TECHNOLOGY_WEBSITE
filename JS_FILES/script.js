document.addEventListener("DOMContentLoaded", function () {
  // ------------------------
  // Loading Screen for Page Transitions
  // ------------------------
  const loadingScreen = document.getElementById("loading-screen");
  // Apply click event to all sidebar links for page transitioning
  const navLinks = document.querySelectorAll(".sidebar a");
  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      // Show loading screen
      loadingScreen.style.display = "flex";
      // Use a slight delay then navigate to the clicked URL
      setTimeout(() => {
        window.location.href = this.href;
      }, 500); // Adjust delay (milliseconds) as needed
    });
  });
  
  // ------------------------
  // Hover Video Functionality for Collage Items
  // ------------------------
  const gridItems = document.querySelectorAll(".collage .grid-item");
  gridItems.forEach((item) => {
    const video = item.querySelector(".hover-video");
    if (video) {
      item.addEventListener("mouseenter", function () {
        video.style.display = "block";
        video.play();
      });
      item.addEventListener("mouseleave", function () {
        video.pause();
        video.currentTime = 0;
        video.style.display = "none";
      });
    }
  });
  
  // ------------------------
  // Sidebar Hide on Scroll
  // ------------------------
  let scrollTimeout;
  window.addEventListener("scroll", function () {
    document.querySelector(".sidebar").classList.add("hide");
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      document.querySelector(".sidebar").classList.remove("hide");
    }, 300);
  });
  
  // ------------------------
  // Intersection Observer for Animate-Scroll Elements
  // ------------------------
  const animateElements = document.querySelectorAll(".animate-scroll");
  const thresholds = Array.from({ length: 11 }, (_, i) => i / 10);
  const observerOptions = { threshold: thresholds };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.style.opacity = entry.intersectionRatio;
      const translateY = 20 * (1 - entry.intersectionRatio);
      entry.target.style.transform = `translateY(${translateY}px)`;
    });
  }, observerOptions);
  animateElements.forEach((el) => observer.observe(el));
  
  // ------------------------
  // Category Popups and Chat Popup Functionality (Click to Preview)
  // ------------------------
  
  // Cache new section categories container.
  const newSectionCategories = document.querySelector(".new-section-categories");
  
  // Helper function to update popup position.
  function updatePopupPosition(popupContent) {
    const containerRect = newSectionCategories.getBoundingClientRect();
    const popupWidth = popupContent.offsetWidth;
    const popupHeight = popupContent.offsetHeight;
    popupContent.style.top = containerRect.top - popupHeight - 10 + "px";
    popupContent.style.left =
      containerRect.left + containerRect.width / 2 - popupWidth / 2 + "px";
    popupContent.style.transform = "";
  }
  
  // Helper function to hide overlay if no popups are visible.
  function checkOverlayVisibility() {
    const infoDisplay = infoPopup ? infoPopup.style.display : "none";
    const aboutDisplay = aboutPopup ? aboutPopup.style.display : "none";
    const chatDisplay = chatPopup ? chatPopup.style.display : "none";
    if (infoDisplay !== "block" && aboutDisplay !== "block" && chatDisplay !== "block") {
      document.getElementById("overlay").style.display = "none";
    }
  }
  
  // Info Boards Popup
  const infoCategory = document.getElementById("infoCategory");
  const infoPopup = document.getElementById("category-popup-info");
  if (infoCategory && infoPopup) {
    infoCategory.addEventListener("click", function (e) {
      e.stopPropagation();
      if (infoPopup.style.display === "block") {
        infoPopup.style.display = "none";
        checkOverlayVisibility();
      } else {
        if (aboutPopup && aboutPopup.style.display === "block") {
          aboutPopup.style.display = "none";
        }
        document.getElementById("overlay").style.display = "block";
        infoPopup.style.display = "block";
        const popupContent = infoPopup.querySelector(".popup-content");
        updatePopupPosition(popupContent);
      }
    });
  }
  
  // About Us Popup
  const aboutCategory = document.getElementById("aboutCategory");
  const aboutPopup = document.getElementById("category-popup-about");
  if (aboutCategory && aboutPopup) {
    aboutCategory.addEventListener("click", function (e) {
      e.stopPropagation();
      if (aboutPopup.style.display === "block") {
        aboutPopup.style.display = "none";
        checkOverlayVisibility();
      } else {
        if (infoPopup && infoPopup.style.display === "block") {
          infoPopup.style.display = "none";
        }
        document.getElementById("overlay").style.display = "block";
        aboutPopup.style.display = "block";
        const popupContent = aboutPopup.querySelector(".popup-content");
        updatePopupPosition(popupContent);
      }
    });
  }
  
  // Chat Popup for MORE DETAILS
  const moreDetailsBtn = document.getElementById("more-details-btn");
  const chatPopup = document.getElementById("chatPopup");
  if (moreDetailsBtn && chatPopup) {
    moreDetailsBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      document.getElementById("overlay").style.display = "block";
      chatPopup.style.display = "block";
    });
  }
  const closeChatBtn = document.getElementById("close-chat-btn");
  if (closeChatBtn) {
    closeChatBtn.addEventListener("click", function () {
      chatPopup.style.display = "none";
      checkOverlayVisibility();
    });
  }
  
  // Hide popups when clicking on overlay or outside.
  const overlayEl = document.getElementById("overlay");
  overlayEl.addEventListener("click", function () {
    if (infoPopup) infoPopup.style.display = "none";
    if (aboutPopup) aboutPopup.style.display = "none";
    if (chatPopup) chatPopup.style.display = "none";
    overlayEl.style.display = "none";
  });
  
  // Prevent clicks inside popups from propagating to overlay.
  const popups = document.querySelectorAll(".category-popup, .chat-popup");
  popups.forEach((popup) => {
    popup.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  });
});
