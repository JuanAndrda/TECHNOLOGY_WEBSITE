// JavaScript to change the image source on scroll
document.addEventListener("scroll", function() {
    console.log("Scrolling detected"); // Debugging statement
  
    var placeholderImage = document.getElementById("placeholder-image");
  
    if (window.scrollY > 100) { // Adjust the scroll position as needed
      console.log("Scroll position > 100px, changing image to bridge.png"); // Debugging statement
      placeholderImage.src = "bridge.png";
    } else {
      console.log("Scroll position < 100px, changing image to pic1.png"); // Debugging statement
      placeholderImage.src = "pic1.png";
    }
  });
  