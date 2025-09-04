


  
   





const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
    mobileMenu.classList.add('opacity-100');
});

closeBtn.addEventListener('click', () => {
    mobileMenu.classList.add('opacity-0', 'pointer-events-none');
    mobileMenu.classList.remove('opacity-100');
});


const slider = document.getElementById('lodges-slider');
const prevBtn = document.getElementById('lodges-prev');
const nextBtn = document.getElementById('lodges-next');

// Scroll by exactly one card (width + gap)
function stepSize() {
    const card = slider.querySelector('[data-card]');
    if (!card) return 320;
    const gap = parseInt(getComputedStyle(slider).gap || 0, 10);
    return Math.round(card.getBoundingClientRect().width + gap);
}

function updateArrows() {
    const maxLeft = slider.scrollWidth - slider.clientWidth - 1;
    prevBtn.disabled = slider.scrollLeft <= 0;
    nextBtn.disabled = slider.scrollLeft >= maxLeft;
}

nextBtn.addEventListener('click', () => {
    slider.scrollBy({ left: stepSize(), behavior: 'smooth' });
});

prevBtn.addEventListener('click', () => {
    slider.scrollBy({ left: -stepSize(), behavior: 'smooth' });
});

slider.addEventListener('scroll', updateArrows);
window.addEventListener('resize', updateArrows);
// init
document.addEventListener('DOMContentLoaded', () => setTimeout(updateArrows, 0));


const slider1 = document.getElementById("slider");
const next = document.getElementById("next");
const prev = document.getElementById("prev");

let currentIndex = 0;
const totalSlides = slider1.children.length;

// Function to detect visible slides based on screen size
function getVisibleSlides() {
    if (window.innerWidth < 640) return 1; // mobile
    if (window.innerWidth < 1024) return 2; // tablet
    return 3; // desktop
}

function updateSlider() {
    const visibleSlides = getVisibleSlides();
    slider1.style.transform = `translateX(-${(100 / visibleSlides) * currentIndex}%)`;
}

next.addEventListener("click", () => {
    const visibleSlides = getVisibleSlides();
    if (currentIndex < totalSlides - visibleSlides) {
        currentIndex++;
        updateSlider();
    }
});

prev.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
    }
});

window.addEventListener("resize", updateSlider);



(() => {
    // Scope everything to this widget to avoid conflicts with other sliders
    const widget = document.getElementById('tours-widget');
    const viewport = widget.querySelector('#tours-viewport');   // scroll container
    const track = widget.querySelector('#tours-track');         // flex track
    const btnPrev = widget.querySelector('#tours-prev');
    const btnNext = widget.querySelector('#tours-next');
    const dots = widget.querySelectorAll('.tours-dot');

    // Calculate one step = card width + gap
    function getStep() {
        const card = track.querySelector('[data-card]');
        if (!card) return 320;
        const cardRect = card.getBoundingClientRect();
        const gap = parseInt(getComputedStyle(track).gap || 0, 9);
        return Math.round(cardRect.width + gap);
    }

    // How many are visible right now?
    function getVisibleCount() {
        return Math.max(1, Math.floor(viewport.clientWidth / getStep()));
    }

    function getActiveIndex() {
        return Math.round(viewport.scrollLeft / getStep());
    }

    function setActiveDot() {
        const idx = Math.min(getActiveIndex(), dots.length - 1);
        dots.forEach((d, i) => d.style.opacity = i === idx ? '1' : '0.5');
    }

    function toggleArrows() {
        const maxLeft = viewport.scrollWidth - viewport.clientWidth - 1;
        btnPrev.disabled = viewport.scrollLeft <= 0;
        btnNext.disabled = viewport.scrollLeft >= maxLeft;
    }

    function goBy(step) {
        viewport.scrollBy({ left: step * getStep(), behavior: 'smooth' });
    }

    // Events
    btnNext.addEventListener('click', () => goBy(1));
    btnPrev.addEventListener('click', () => goBy(-1));

    viewport.addEventListener('scroll', () => {
        toggleArrows();
        setActiveDot();
    });

    window.addEventListener('resize', () => {
        // Keep alignment on resize
        viewport.scrollTo({ left: getActiveIndex() * getStep(), behavior: 'instant' });
        toggleArrows();
        setActiveDot();
    });

    // Dots click -> jump
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            const maxIdx = Math.max(0, track.querySelectorAll('[data-card]').length - getVisibleCount());
            const target = Math.min(i, maxIdx);
            viewport.scrollTo({ left: target * getStep(), behavior: 'smooth' });
        });
    });

    // Init
    setTimeout(() => {
        toggleArrows();
        setActiveDot();
    }, 0);
})();




document.querySelectorAll(".accordion-btn").forEach(button => {
    button.addEventListener("click", () => {
        const content = button.nextElementSibling;
        const isOpen = !content.classList.contains("hidden");

        // Close all others
        document.querySelectorAll(".accordion-content").forEach(c => c.classList.add("hidden"));
        document.querySelectorAll(".accordion-btn span").forEach(s => s.textContent = "+");

        // Toggle this one
        if (!isOpen) {
            content.classList.remove("hidden");
            button.querySelector("span").textContent = "−";
        }
    });
});




  const loaderTl = gsap.timeline({ defaults: { ease: "power2.out" } });

  loaderTl
    // Animate logo pieces (only animate circle borders + main logo)
    .from("#logo-wrapper > div", {
      scale: 0,
      rotate: 180,
      opacity: 0,
      duration: 1,
      stagger: 0.2
    })

    // Progress bar fill
    .to("#progress-bar", {
      width: "100%",
      duration: 2
    })

    // Loading text blinking
    .to("#loading-text", {
      opacity: 0.3,
      duration: 0.6,
      yoyo: true,
      repeat: 3
    })

    // Fade out loader
    .to("#loading-section", {
      opacity: 0,
      duration: 1,
      delay: 0.5,
      onComplete: () => {
        document.getElementById("loading-section").style.display = "none";
        if (typeof playHeroAnimation === "function") {
          playHeroAnimation(); // Run hero animation if it exists
        }
      }
    });




gsap.registerPlugin(ScrollTrigger);

const facilityTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".facilities-wrapper",
        start: "top 80%", // animation starts when section is 80% visible
    }
});

facilityTl
    .from(".subtitle", { y: 30, opacity: 0, duration: 0.8 })
    .from(".title", { y: 40, opacity: 0, duration: 0.8 }, "-=0.5")
    .from(".facility-card", {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out(1.7)"
    }, "-=0.2")
    .from(".explore-btn", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "bounce.out"
    }, "-=0.3");



gsap.registerPlugin(ScrollTrigger);


gsap.from(".africa-shape", {
    opacity: 0,
    scale: 0.5,
    duration: 1.5,
    ease: "back.out(1.7)",
    scrollTrigger: {
        trigger: ".custom-section",
        start: "top 80%",
    }
});

// Headings
gsap.from(".content h2, .content h1", {
    opacity: 0,
    y: 40,
    duration: 1,
    stagger: 0.3,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".custom-section",
        start: "top 70%",
    }
});

// Paragraph
gsap.from(".content p", {
    opacity: 0,
    y: 30,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".content p",
        start: "top 85%",
    }
});

// Facilities List
gsap.from(".facility-item", {
    opacity: 0,
    x: -50,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".facility-item",
        start: "top 80%",
    }
});

// Button
gsap.from(".uni-button", {
    opacity: 0,
    scale: 0.8,
    duration: 1,
    ease: "elastic.out(1, 0.5)",
    scrollTrigger: {
        trigger: ".uni-button",
        start: "top 90%",
    }
});




gsap.registerPlugin(ScrollTrigger);

// Contact headings
gsap.from(".contact-safari h2, .contact-safari h1", {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".contact-safari",
        start: "top 85%",
    }
});

// Input fields animation
gsap.from(".form-row input", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.15,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".form-row",
        start: "top 85%",
    }
});



  const teamSlider = document.getElementById('team-slider');
  const prevBtnTeam = document.getElementById('team-prev');
  const nextBtnTeam = document.getElementById('team-next');

  function stepSizeTeam() {
    const card = teamSlider.querySelector('[data-card]');
    if (!card) return 320;
    const gap = parseInt(getComputedStyle(teamSlider).gap || 0, 10);
    return Math.round(card.getBoundingClientRect().width + gap);
  }

  function updateArrowsTeam() {
    const maxLeft = teamSlider.scrollWidth - teamSlider.clientWidth - 1;
    prevBtnTeam.disabled = teamSlider.scrollLeft <= 0;
    nextBtnTeam.disabled = teamSlider.scrollLeft >= maxLeft;
  }

  nextBtnTeam.addEventListener('click', () => {
    teamSlider.scrollBy({ left: stepSizeTeam(), behavior: 'smooth' });
  });

  prevBtnTeam.addEventListener('click', () => {
    teamSlider.scrollBy({ left: -stepSizeTeam(), behavior: 'smooth' });
  });

  teamSlider.addEventListener('scroll', updateArrowsTeam);
  window.addEventListener('resize', updateArrowsTeam);

  document.addEventListener('DOMContentLoaded', () => setTimeout(updateArrowsTeam, 0));
