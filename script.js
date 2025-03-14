document.addEventListener("DOMContentLoaded", function () {
  // Hover Video Functionality for Collage Items
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

  // Header behavior: Hide header while scrolling and show after scrolling stops
  let scrollTimeout;
  window.addEventListener("scroll", function () {
    // Immediately hide the header while scrolling
    document.querySelector('.sidebar').classList.add('hide');
    clearTimeout(scrollTimeout);
    // When scrolling stops for 300ms, show the header
    scrollTimeout = setTimeout(() => {
      document.querySelector('.sidebar').classList.remove('hide');
    }, 300);
  });

  // Intersection Observer for dynamic fade on scroll for collage & new section
  const animateElements = document.querySelectorAll('.animate-scroll');
  const thresholds = Array.from({ length: 11 }, (_, i) => i / 10);
  const observerOptions = {
    threshold: thresholds
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Use the intersection ratio to set the opacity
      entry.target.style.opacity = entry.intersectionRatio;
      // Adjust vertical position based on visibility
      const translateY = 20 * (1 - entry.intersectionRatio);
      entry.target.style.transform = `translateY(${translateY}px)`;
    });
  }, observerOptions);

  animateElements.forEach(el => {
    observer.observe(el);
  });
});
