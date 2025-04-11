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
});

function openPopup(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) {
    popup.style.display = 'flex';
  }
}

function closePopup(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) {
    popup.style.display = 'none';
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const board = document.querySelector(".board");
  const details = document.querySelector(".details-section");

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.1 }
  );

  if (board) observer.observe(board);
  if (details) observer.observe(details);

  // Handle "Read full article" links
  document.querySelectorAll('.read-more').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      // Close the nearest popup
      const popup = link.closest('.popup');
      if (popup) {
        popup.style.display = 'none';
      }

      // Scroll to the linked section smoothly
      const targetId = link.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
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
