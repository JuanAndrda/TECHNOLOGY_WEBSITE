document.addEventListener("DOMContentLoaded", function () {
  // ---------------------
  // Loading Screen Functionality
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
  // Hover Video Functionality for Collage Items
  // ---------------------
  const gridItems = document.querySelectorAll(".collage .grid-item");
  gridItems.forEach((item) => {
    const video = item.querySelector(".hover-video");
    if (video) {
      item.addEventListener("mouseenter", function () {
        video.style.display = "block";
        video.play().catch(e => console.log("Video play error:", e));
      });
      item.addEventListener("mouseleave", function () {
        video.pause();
        video.currentTime = 0;
        video.style.display = "none";
      });
    }
  });

  // ---------------------
  // Sidebar Hide on Scroll Animation
  // ---------------------
  let scrollTimeout;
  const sidebar = document.querySelector(".sidebar");
  window.addEventListener("scroll", function () {
    if (sidebar) {
      sidebar.classList.add("hide");
    }
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (sidebar) {
        sidebar.classList.remove("hide");
      }
    }, 300);
  });

  // ---------------------
  // Intersection Observer for Animate-Scroll Elements
  // ---------------------
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

  // ---------------------
  // Category Popups and Chat Popup Functionality
  // ---------------------
  // Info Boards Popup
  const infoCategory = document.getElementById("infoCategory");
  const infoPopup = document.getElementById("category-popup-info");
  if (infoCategory && infoPopup) {
    infoCategory.addEventListener("click", function (e) {
      e.stopPropagation();
      if (infoPopup.style.display === "block") {
        infoPopup.style.display = "none";
        document.getElementById("overlay").style.display = "none";
      } else {
        const aboutPopup = document.getElementById("category-popup-about");
        const recentPopup = document.getElementById("category-popup-recent");
        const reflectionPopup = document.getElementById("category-popup-reflection");
        if (aboutPopup && aboutPopup.style.display === "block") {
          aboutPopup.style.display = "none";
        }
        if (recentPopup && recentPopup.style.display === "block") {
          recentPopup.style.display = "none";
        }
        if (reflectionPopup && reflectionPopup.style.display === "block") {
          reflectionPopup.style.display = "none";
        }
        document.getElementById("overlay").style.display = "block";
        infoPopup.style.display = "block";
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
        document.getElementById("overlay").style.display = "none";
      } else {
        const infoPopup = document.getElementById("category-popup-info");
        const recentPopup = document.getElementById("category-popup-recent");
        const reflectionPopup = document.getElementById("category-popup-reflection");
        if (infoPopup && infoPopup.style.display === "block") {
          infoPopup.style.display = "none";
        }
        if (recentPopup && recentPopup.style.display === "block") {
          recentPopup.style.display = "none";
        }
        if (reflectionPopup && reflectionPopup.style.display === "block") {
          reflectionPopup.style.display = "none";
        }
        document.getElementById("overlay").style.display = "block";
        aboutPopup.style.display = "block";
      }
    });
  }

  // Recent Happenings Popup
  const recentCategory = document.getElementById("recentCategory");
  const recentPopup = document.getElementById("category-popup-recent");
  if (recentCategory && recentPopup) {
    recentCategory.addEventListener("click", function (e) {
      e.stopPropagation();
      const infoPopup = document.getElementById("category-popup-info");
      const aboutPopup = document.getElementById("category-popup-about");
      const reflectionPopup = document.getElementById("category-popup-reflection");
      if (infoPopup && infoPopup.style.display === "block") {
        infoPopup.style.display = "none";
      }
      if (aboutPopup && aboutPopup.style.display === "block") {
        aboutPopup.style.display = "none";
      }
      if (reflectionPopup && reflectionPopup.style.display === "block") {
        reflectionPopup.style.display = "none";
      }
      document.getElementById("overlay").style.display = "block";
      recentPopup.style.display = "block";
    });
  }

  // Reflection Popup
  const reflectionCategory = document.getElementById("reflectionCategory");
  const reflectionPopup = document.getElementById("category-popup-reflection");
  if (reflectionCategory && reflectionPopup) {
    reflectionCategory.addEventListener("click", function (e) {
      e.stopPropagation();
      const infoPopup = document.getElementById("category-popup-info");
      const aboutPopup = document.getElementById("category-popup-about");
      const recentPopup = document.getElementById("category-popup-recent");
      if (infoPopup && infoPopup.style.display === "block") {
        infoPopup.style.display = "none";
      }
      if (aboutPopup && aboutPopup.style.display === "block") {
        aboutPopup.style.display = "none";
      }
      if (recentPopup && recentPopup.style.display === "block") {
        recentPopup.style.display = "none";
      }
      document.getElementById("overlay").style.display = "block";
      reflectionPopup.style.display = "block";
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
      document.getElementById("overlay").style.display = "none";
    });
  }

  // Hide popups when clicking on the overlay
  const overlayEl = document.getElementById("overlay");
  overlayEl.addEventListener("click", function () {
    const infoPopup = document.getElementById("category-popup-info");
    const aboutPopup = document.getElementById("category-popup-about");
    const recentPopup = document.getElementById("category-popup-recent");
    const reflectionPopup = document.getElementById("category-popup-reflection");
    if (infoPopup) infoPopup.style.display = "none";
    if (aboutPopup) aboutPopup.style.display = "none";
    if (recentPopup) recentPopup.style.display = "none";
    if (reflectionPopup) reflectionPopup.style.display = "none";
    if (chatPopup) chatPopup.style.display = "none";
    overlayEl.style.display = "none";
  });
});
