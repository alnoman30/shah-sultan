gsap.registerPlugin(ScrollTrigger);


// ──======================================= Smooth scroll (Lenis)======================================== ──
if (typeof Lenis !== 'undefined') {
  const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.3,
    infinite: false,
  });

  if (typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
  }

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}

// Header JS
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const hamburgerIcon = document.getElementById('hamburgerIcon');
  const closeIcon = document.getElementById('closeIcon');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  let isOpen = false;

  // Initial states
  gsap.set(mobileLinks, {
    y: 20,
    opacity: 0
  });

  gsap.set(closeIcon, {
    opacity: 0,
    scale: 0.75
  });

  // Menu toggle
  menuToggle.addEventListener('click', () => {
    isOpen = !isOpen;

    if (isOpen) {
      // Open menu
      mobileMenu.style.pointerEvents = 'auto';

      gsap.to(mobileMenu, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      });

      gsap.to(mobileLinks, {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.4,
        ease: 'power2.out',
        delay: 0.1
      });

      // Hamburger → Close
      gsap.to(hamburgerIcon, {
        opacity: 0,
        scale: 0.75,
        duration: 0.2
      });

      gsap.to(closeIcon, {
        opacity: 1,
        scale: 1,
        duration: 0.2,
        delay: 0.1
      });

    } else {
      // Close menu
      gsap.to(mobileMenu, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          mobileMenu.style.pointerEvents = 'none';
        }
      });

      gsap.to(mobileLinks, {
        y: 20,
        opacity: 0,
        duration: 0.2
      });

      // Close → Hamburger
      gsap.to(closeIcon, {
        opacity: 0,
        scale: 0.75,
        duration: 0.2
      });

      gsap.to(hamburgerIcon, {
        opacity: 1,
        scale: 1,
        duration: 0.2,
        delay: 0.1
      });
    }
  });
});

// Desktop on Scroll header sticky
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // 1. Logo / CTA vanish animation
  if (window.innerWidth >= 768) {
    gsap.to("#siteLogo, #desktopCta", {
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "+=150",
        scrub: true,
      },
      opacity: 0,
      y: -15,
      pointerEvents: "none",
      ease: "power1.out"
    });
  }

  // 2. Dynamic theme switcher
  document.querySelectorAll("section[data-theme='dark']").forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top 15%",
      end: "bottom 15%",
      toggleClass: {
        targets: "#desktopNav",
        className: "nav-dark-theme"
      }
    });
  });

  ScrollTrigger.refresh();
});


// Desktop magnetic CTA btn
document.addEventListener("DOMContentLoaded", () => {
  const cta = document.querySelector("#desktopCta");
  const ctaIcon = document.querySelector("#ctaIcon");

  if (cta && window.innerWidth >= 768) {

    // 1. Subtle continuous attention-grabbing pulse
    gsap.to(cta, {
      scale: 1.03,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "power1.inOut"
    });

    // 2. Magnetic Hover Effect
    cta.addEventListener("mousemove", (e) => {
      const rect = cta.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(cta, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out"
      });

      if (ctaIcon) {
        gsap.to(ctaIcon, {
          rotation: 15,
          scale: 1.1,
          duration: 0.3
        });
      }
    });

    // 3. Reset position on mouse leave
    cta.addEventListener("mouseleave", () => {
      gsap.to(cta, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.4)"
      });

      if (ctaIcon) {
        gsap.to(ctaIcon, {
          rotation: 0,
          scale: 1,
          duration: 0.5,
          ease: "elastic.out(1, 0.4)"
        });
      }
    });
  }
});


// 
// 1. Button Div Cloning
const elems = document.querySelectorAll(".text-shift-btn .ct");

elems.forEach((elem) => {
  const clone = elem.cloneNode(true);
  clone.classList.add("clone");
  clone.classList.remove("ct");
  elem.after(clone);
});

// 2. SplitText (Requires GSAP Club / SplitText plugin)
var btnSplitText = new SplitText(".text-shift-btn .ct, .text-shift-btn .clone", {
  type: "chars"
});

// 3. Timeline Animation
const buttons = document.querySelectorAll(".text-shift-btn");

buttons.forEach(function (item) {
  const tl = gsap
    .timeline({
      paused: true
    })
    .fromTo(
      item.querySelectorAll(".ct div"),
      {
        yPercent: 0,
        autoAlpha: 1
      },
      {
        yPercent: -200,
        stagger: 0.02,
        duration: 0.8,
        autoAlpha: 0,
        ease: "power1.inOut"
      }
    )
    .fromTo(
      item.querySelectorAll(".clone div"),
      {
        yPercent: 200,
        autoAlpha: 0
      },
      {
        yPercent: 0,
        stagger: 0.02,
        duration: 0.8,
        autoAlpha: 1,
        ease: "power1.inOut"
      },
      "<"
    );

  item.addEventListener("mouseenter", () => tl.play());
  item.addEventListener("mouseleave", () => tl.reverse());
});


// 
  document.addEventListener('DOMContentLoaded', function () {
    new Splide('#brand-slider', {
      type: 'loop',
      drag: 'free',
      focus: 'center',
      perPage: 7,
      autoWidth: true,
      gap: '16px',
      arrows: false,
      pagination: false,
      autoScroll: {
        speed: 1, // Adjust scrolling speed here (positive values scroll right-to-left)
        pauseOnHover: false,
        pauseOnFocus: false,
      },
    }).mount(window.splide.Extensions);
  });