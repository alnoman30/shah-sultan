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