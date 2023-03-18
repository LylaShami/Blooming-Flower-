const bg = [
     src="images/slides1.png",
     src="images/slides2.png",
     src="images/slides3.png",
     src="images/slides4.png"
  ]
  
  const slides = document.querySelectorAll(".slide");
  
  slides.forEach((slide, idx) => {
    slide.style.backgroundImage = `url("${bg[idx]}")`;
  
    slide.addEventListener("click", (e) => {
      slides.forEach((slide) => {
        slide.classList.remove("active");
      });
      e.currentTarget.classList.add("active");
    });
  });
  