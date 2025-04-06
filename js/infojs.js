document.addEventListener("DOMContentLoaded", function () {
  // ---------------------
  // Loading Screen Functionality
  // ---------------------
  const loadingScreen = document.getElementById("loading-screen");
  // Select all sidebar links
  const navLinks = document.querySelectorAll(".sidebar a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Prevent default navigation
      e.preventDefault();
      // Show the loading screen
      if (loadingScreen) {
        loadingScreen.style.display = "flex";
      }
      // Delay navigation briefly to reveal the loading spinner
      setTimeout(() => {
        window.location.href = this.href;
      }, 500); // Adjust delay (milliseconds) as needed
    });
  });

  // ---------------------
  // Popup Functions (for Info page)
  // ---------------------
  // Make openPopup and closePopup functions globally accessible
  window.openPopup = function (popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
      popup.style.display = "flex";
    }
  };

  window.closePopup = function (popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
      popup.style.display = "none";
    }
  };
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
  let scrollTimeout;
  const sidebar = document.querySelector(".sidebar");
  window.addEventListener("scroll", function () {
    if (sidebar) {
      // Add the 'hide' class immediately when scrolling starts
      sidebar.classList.add("hide");
    }
    // Clear any previous timeout to detect when scrolling stops
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (sidebar) {
        // Remove the 'hide' class when scrolling stops
        sidebar.classList.remove("hide");
      }
    }, 300); // Adjust the timeout delay (ms) as needed
  });
  // (If you have additional JS code for your popups on the About Us page, you can include it here.)
});

