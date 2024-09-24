var currentIndex = 0; 

var images = [
"assets/img/img2.jpg",
"assets/img/img3.jpg",
"assets/img/img1.jpg",
];

function nextSlide() {
    currentIndex++; 

    if (currentIndex >= images.length) {
    currentIndex = 0; 
    }

    document.querySelector('.slideshow-image').src = images[currentIndex];
}