document.addEventListener("DOMContentLoaded", function () {
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
});
