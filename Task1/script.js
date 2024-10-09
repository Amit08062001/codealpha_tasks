// Array to hold the image sources and descriptions
var images = [
    { src: 'image1.avif', description: 'This is the first image description' },
    { src: 'image2.avif', description: 'This is the second image description' },
    { src: 'image3.avif', description: 'This is the third image description' }
    // Add more images as needed
  ];
  
  var currentIndex = 0;
  
  // Function to open the modal and display the image with description
  function openModal(index) {
    currentIndex = index;
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("modalImage");
    var captionText = document.getElementById("modalCaption");
  
    modal.style.display = "block"; // Display modal
    modalImg.src = images[currentIndex].src; // Set image source
    captionText.innerHTML = images[currentIndex].description; // Set description
  }
  
  // Function to close the modal
  function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none"; // Hide modal
  }
  
  // Function to change the image when next/previous buttons are clicked
  function changeImage(direction) {
    currentIndex += direction;
  
    // If currentIndex exceeds the range, wrap around
    if (currentIndex >= images.length) {
      currentIndex = 0; // Loop back to the first image
    } else if (currentIndex < 0) {
      currentIndex = images.length - 1; // Go to the last image
    }
  
    var modalImg = document.getElementById("modalImage");
    var captionText = document.getElementById("modalCaption");
  
    modalImg.src = images[currentIndex].src; // Update image source
    captionText.innerHTML = images[currentIndex].description; // Update description
  }
  