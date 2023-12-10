document.addEventListener("DOMContentLoaded", function() {
    const slider = document.querySelector(".slider");
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const slideButtons = document.querySelectorAll(".slide-button"); // Dodane przyciski wyboru slajdu

    let currentIndex = 0;

    function goToSlide(index) {
        currentIndex = index;
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function nextSlide() {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        goToSlide(currentIndex);
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = slides.length - 1;
        }
        goToSlide(currentIndex);
    }

    function goToSlideByButton() {
        const slideIndex = parseInt(this.getAttribute("data-slide-index"), 10);
        goToSlide(slideIndex);
    }

    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    slideButtons.forEach(button => {
        button.addEventListener("click", goToSlideByButton);
    });

    let intervalId = setInterval(nextSlide, 3000);

    slider.addEventListener("mouseenter", () => {
        clearInterval(intervalId);
    });

    slider.addEventListener("mouseleave", () => {
        intervalId = setInterval(nextSlide, 3000);
    });
});