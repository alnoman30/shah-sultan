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
  const siteHeader = document.getElementById('siteHeader');

  let isOpen = false;

  // Initial states for dropdown animation
  gsap.set(mobileMenu, {
    scaleY: 0.9,
    y: -10
  });

  gsap.set(mobileLinks, {
    y: 10,
    opacity: 0
  });

  gsap.set(closeIcon, {
    opacity: 0,
    scale: 0.75
  });

  // Menu toggle (Dropdown animation)
  menuToggle.addEventListener('click', () => {
    isOpen = !isOpen;

    if (isOpen) {
      mobileMenu.style.pointerEvents = 'auto';

      gsap.to(mobileMenu, {
        opacity: 1,
        scaleY: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });

      gsap.to(mobileLinks, {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.3,
        ease: 'power2.out',
        delay: 0.05
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
        scaleY: 0.9,
        y: -10,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          mobileMenu.style.pointerEvents = 'none';
        }
      });

      gsap.to(mobileLinks, {
        y: 10,
        opacity: 0,
        duration: 0.15
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

  // Mobile Header Backdrop & Top Pinning on Scroll (Mobile Only)
  window.addEventListener('scroll', () => {
    if (window.innerWidth < 768) {
      if (window.scrollY > 15) {
        // Pin to top 0 and add background/padding
        siteHeader.style.top = '0px';
        siteHeader.style.marginTop = '0px';
        siteHeader.style.backgroundColor = 'rgba(2, 9, 20, 0.9)';
        siteHeader.style.backdropFilter = 'blur(12px)';
        siteHeader.style.webkitBackdropFilter = 'blur(12px)';
        siteHeader.style.paddingTop = '0.75rem';
        siteHeader.style.paddingBottom = '0.75rem';
      } else {
        // Revert to original layout spacing
        siteHeader.style.top = '0px';
        siteHeader.style.marginTop = '';
        siteHeader.style.backgroundColor = 'transparent';
        siteHeader.style.backdropFilter = 'none';
        siteHeader.style.webkitBackdropFilter = 'none';
        siteHeader.style.paddingTop = '0px';
        siteHeader.style.paddingBottom = '0px';
      }
    }
  });
});

// Desktop on Scroll header sticky & animations (Desktop Only)
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

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
document.querySelectorAll(".text-shift-btn .ct").forEach((ct) => {

  const clone = ct.cloneNode(true);

  clone.classList.remove("ct");
  clone.classList.add("clone");

  ct.appendChild(clone);

  new SplitText(ct, {
    type: "chars",
    charsClass: "char"
  });
});

// Text wave animation on hover
document.querySelectorAll(".text-shift-btn").forEach((button) => {

  const original = button.querySelector(".ct");
  const clone = button.querySelector(".clone");

  const tl = gsap.timeline({
    paused: true
  });

  tl.to(original.querySelectorAll(":scope > .char"), {
    yPercent: -100,
    autoAlpha: 0,
    duration: 0.6,
    stagger: 0.025,
    ease: "power2.inOut"
  })

    .fromTo(
      clone.querySelectorAll(".char"), {
      yPercent: 100,
      autoAlpha: 0
    }, {
      yPercent: 0,
      autoAlpha: 1,
      duration: 0.6,
      stagger: 0.025,
      ease: "power2.inOut"
    },
      "<"
    );

  button.addEventListener("mouseenter", () => tl.play());
  button.addEventListener("mouseleave", () => tl.reverse());
});


// Brand marquee slider
document.addEventListener("DOMContentLoaded", () => {
  try {
    const slider = document.querySelector("#brand-slider");

    if (!slider || typeof Splide === "undefined") return;
    if (!window.splide?.Extensions) return;

    new Splide(slider, {
      type: "loop",
      drag: "free",
      focus: "center",
      perPage: 7,
      autoWidth: true,
      gap: "16px",
      arrows: false,
      pagination: false,
      autoScroll: {
        speed: 1,
        pauseOnHover: false,
        pauseOnFocus: false,
      },
    }).mount(window.splide.Extensions);

  } catch (error) {
    console.warn("Brand slider could not be initialized:", error);
  }
});


// Stats Counter js
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const statsSection = document.querySelector("#stats-section");

  // Stop if stats section doesn't exist on this page
  if (!statsSection) return;

  const counters = statsSection.querySelectorAll(".stat-counter");
  
  // Updated selector to target only the 4 stat cards inside the grid
  const statColumns = statsSection.querySelectorAll(".grid > div");

  ScrollTrigger.create({
    trigger: statsSection,
    start: "top 80%",
    once: true,

    onEnter: () => {

      // Counter animation
      counters.forEach((counter) => {

        const target = Number(
          counter.getAttribute("data-target")
        );

        gsap.to(counter, {
          innerText: target,
          duration: 2,
          ease: "power2.out",
          snap: {
            innerText: 1
          },

          onUpdate: function () {
            counter.innerText = Math.floor(
              Number(counter.innerText)
            );
          }
        });

      });

      // Fade + scale animation for the stat cards
      gsap.from(statColumns, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
      });

    }
  });

});


// 
//  Project showcase cursor pointer
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".project-card");

  cards.forEach((card) => {
    const cursor = card.querySelector(".custom-cursor");
    if (!cursor) return;

    // Smooth physics configuration (0.7s duration for smooth trailing)
    const xTo = gsap.quickTo(cursor, "x", {
      duration: 0.7,
      ease: "power2.out"
    });
    const yTo = gsap.quickTo(cursor, "y", {
      duration: 0.7,
      ease: "power2.out"
    });

    let prevX = 0;

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();

      // Center badge on mouse position relative to card boundaries
      const mouseX = e.clientX - rect.left - cursor.offsetWidth / 2;
      const mouseY = e.clientY - rect.top - cursor.offsetHeight / 2;

      xTo(mouseX);
      yTo(mouseY);

      // Dynamic tilt during movement
      const deltaX = e.clientX - prevX;
      const tilt = Math.min(Math.max(deltaX * 0.15, -12), 12);
      gsap.to(cursor, {
        rotation: -6 + tilt,
        duration: 0.4,
        ease: "power1.out"
      });

      prevX = e.clientX;
    });

    // Reveal badge on enter
    card.addEventListener("mouseenter", () => {
      gsap.to(cursor, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.5)",
      });
    });

    // Hide badge on leave
    card.addEventListener("mouseleave", () => {
      gsap.to(cursor, {
        opacity: 0,
        scale: 0.4,
        duration: 0.3,
        ease: "power2.in",
      });
    });
  });
});


// Global H1, H2 reveal animation
gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll("h1:not(.heading-exit), h2:not(.heading-exit)").forEach((heading) => {
  const split = new SplitText(heading, {
    type: "lines",
    linesClass: "split-line",
  });

  gsap.from(split.lines, {
    yPercent: 120,
    opacity: 0,
    scale: 0.96,
    filter: "blur(8px)",
    duration: 1.1,
    ease: "power4.out",
    stagger: 0.1,
    scrollTrigger: {
      trigger: heading,
      start: "top 85%",
      once: true,
    },
  });
});


//  Text colro change animation
document.addEventListener("DOMContentLoaded", () => {
  const text = document.querySelector(".text-color-change");

  // Stop if this element isn't on the page
  if (!text) return;

  // Stop if GSAP/plugins aren't loaded
  if (
    typeof gsap === "undefined" ||
    typeof SplitText === "undefined" ||
    typeof ScrollTrigger === "undefined"
  ) {
    return;
  }

  gsap.registerPlugin(SplitText, ScrollTrigger);

  const split = new SplitText(text, {
    type: "words",
    wordsClass: "split-word",
  });

  gsap.to(split.words, {
    color: "#020914",
    stagger: 0.08,
    ease: "none",

    scrollTrigger: {
      trigger: text,
      start: "top 80%",
      end: "bottom 40%",
      scrub: 1,
    },
  });
});

// Testimonial splidejs 
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector("#testimonial-slider");

  // Stop if this page doesn't have the testimonial slider
  if (!slider) return;

  // Stop if Splide isn't loaded
  if (typeof Splide === "undefined") return;

  const splide = new Splide(slider, {
    type: "loop",
    drag: "free",
    focus: "center",
    perPage: 3,
    gap: "32px",
    arrows: false,
    pagination: true,

    breakpoints: {
      1024: {
        perPage: 2,
        gap: "24px",
      },
      640: {
        perPage: 1,
        drag: true, 
      },
    },
  });

  // AutoScroll only on screens larger than 640px
  if (window.innerWidth > 640) {
    const autoScroll = window.splide?.Extensions?.AutoScroll;

    if (autoScroll) {
      splide.mount({
        AutoScroll: autoScroll,
      });
    } else {
      // Mount normally if AutoScroll isn't available
      splide.mount();
    }
  } else {
    splide.mount();
  }
});

// Footer big name crsor follow

document.addEventListener("DOMContentLoaded", () => {
  const watermarkContainer = document.getElementById("ctaCursorArea");
  const floatingCursor = document.getElementById("floating-cursor");

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let isInside = false;

  watermarkContainer.addEventListener("mouseenter", (e) => {
    watermarkContainer.style.cursor = "none";
    isInside = true;

    mouseX = e.clientX;
    mouseY = e.clientY;

    // Snap instantly on entry so it doesn't glide in from a corner
    cursorX = e.clientX;
    cursorY = e.clientY;

    floatingCursor.style.opacity = "1";
  });

  watermarkContainer.addEventListener("mouseleave", () => {
    watermarkContainer.style.cursor = "default";
    isInside = false;
    floatingCursor.style.opacity = "0";
  });

  watermarkContainer.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  watermarkContainer.addEventListener("click", () => {
    isInside = false;
    floatingCursor.style.opacity = "0";
    watermarkContainer.style.cursor = "default";
  });

  function animate() {
    // Smooth trailing effect using viewport coordinates
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;

    // Offset slightly so it floats nicely next to the native cursor spot
    floatingCursor.style.left = `${cursorX + 15}px`;
    floatingCursor.style.top = `${cursorY - 25}px`;

    requestAnimationFrame(animate);
  }

  animate();
});


// Works page filtersJS
document.addEventListener("DOMContentLoaded", () => {
  const items = [...document.querySelectorAll(".project-item")];
  const featured = document.querySelector("#featured-project-item");
  const filters = document.querySelectorAll(".filter-btn");
  const gridNotFound = document.querySelector("#grid-not-found");
  const featuredNotFound = document.querySelector("#featured-not-found");
  const pagination = document.querySelector("#pagination-container");

  const itemsPerPage = 6;
  let currentPage = 1;
  let activeFilter = "all";

  function matchesFilter(item) {
    if (activeFilter === "all") return true;

    return (item.dataset.category || "")
      .toLowerCase()
      .includes(activeFilter.toLowerCase());
  }

  function updateView() {
    // Grid items
    const gridItems = items.filter(item => item !== featured);
    const filteredItems = gridItems.filter(matchesFilter);

    // Featured project
    if (featured) {
      const featuredMatches = matchesFilter(featured);

      featured.style.display = featuredMatches ? "grid" : "none";

      if (featuredNotFound) {
        featuredNotFound.classList.toggle("hidden", featuredMatches);
      }
    }

    // No results
    if (gridNotFound) {
      gridNotFound.classList.toggle(
        "hidden",
        filteredItems.length > 0
      );
    }

    // Pagination
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    currentPage = Math.min(currentPage, Math.max(totalPages, 1));

    const start = (currentPage - 1) * itemsPerPage;
    const visibleItems = filteredItems.slice(start, start + itemsPerPage);

    // Show/hide projects
    gridItems.forEach(item => {
      const shouldShow = visibleItems.includes(item);

      item.style.display = shouldShow ? "block" : "none";
    });

    renderPagination(totalPages);
  }

  function renderPagination(totalPages) {
    if (!pagination || totalPages <= 1) {
      if (pagination) pagination.innerHTML = "";
      return;
    }

    pagination.innerHTML = `
      <button
        class="px-4 py-2 rounded-full bg-gray-100 text-[#020914] font-medium"
        ${currentPage === 1 ? "disabled" : ""}
        data-page="${currentPage - 1}"
      >
        Prev
      </button>

      ${Array.from({ length: totalPages }, (_, i) => {
      const page = i + 1;
      const active = page === currentPage;

      return `
          <button
            class="w-10 h-10 rounded-full font-medium ${active
          ? "bg-[#FF6F42] text-white"
          : "bg-gray-100 text-[#020914]"
        }"
            data-page="${page}"
          >
            ${page}
          </button>
        `;
    }).join("")}

      <button
        class="px-4 py-2 rounded-full bg-gray-100 text-[#020914] font-medium"
        ${currentPage === totalPages ? "disabled" : ""}
        data-page="${currentPage + 1}"
      >
        Next
      </button>
    `;
  }

  // Pagination clicks
  pagination?.addEventListener("click", e => {
    const button = e.target.closest("[data-page]");
    if (!button || button.disabled) return;

    currentPage = Number(button.dataset.page);
    updateView();
  });

  // Filter clicks
  filters.forEach(button => {
    button.addEventListener("click", () => {
      filters.forEach(btn => {
        btn.classList.remove("bg-[#FF6F42]", "text-white");
        btn.classList.add("bg-[#E9E9E9]", "text-[#020914]");
      });

      button.classList.add("bg-[#FF6F42]", "text-white");
      button.classList.remove("bg-[#E9E9E9]", "text-[#020914]");

      activeFilter = button.dataset.filter || "all";
      currentPage = 1;

      updateView();
    });
  });

  updateView();
});


// FAQ System
document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");

  const plusPath = "M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z";
  const crossPath = "M11.9968 10.5904L16.9466 5.64062L18.3608 7.05483L13.411 12.0046L18.3608 16.9543L16.9466 18.3685L11.9968 13.4188L7.04703 18.3685L5.63281 16.9543L10.5826 12.0046L5.63281 7.05483L7.04703 5.64062L11.9968 10.5904Z";

  faqItems.forEach((item) => {
    const toggleBtn = item.querySelector(".faq-toggle");
    const content = item.querySelector(".faq-content");
    const border = item.querySelector(".faq-border");
    const icon = item.querySelector(".faq-icon");
    const path = item.querySelector(".faq-path");

    toggleBtn.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      if (isOpen) {
        // Collapse current item
        gsap.to(content, { height: 0, opacity: 0, filter: "blur(8px)", duration: 0.4, ease: "power2.inOut" });
        gsap.to(border, { opacity: 0, duration: 0.3 });
        item.style.background = "#FFFFFF";
        item.style.boxShadow = "0 0px 0px 0 rgba(0, 0, 0, 0)";
        path.setAttribute("d", plusPath);
        gsap.fromTo(icon, { rotation: 360, opacity: 0.5 }, { rotation: 0, opacity: 1, duration: 0.6, ease: "power2.inOut" });
        item.classList.remove("active");
      } else {
        // Close all other items first (Exclusive Accordion)
        faqItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains("active")) {
            const otherContent = otherItem.querySelector(".faq-content");
            const otherBorder = otherItem.querySelector(".faq-border");
            const otherIcon = otherItem.querySelector(".faq-icon");
            const otherPath = otherItem.querySelector(".faq-path");

            gsap.to(otherContent, { height: 0, opacity: 0, filter: "blur(8px)", duration: 0.4, ease: "power2.inOut" });
            gsap.to(otherBorder, { opacity: 0, duration: 0.3 });
            otherItem.style.background = "#FFFFFF";
            otherItem.style.boxShadow = "0 0px 0px 0 rgba(0, 0, 0, 0)";
            otherPath.setAttribute("d", plusPath);
            gsap.set(otherIcon, { rotation: 0, opacity: 1 });
            otherItem.classList.remove("active");
          }
        });

        // Open clicked item
        gsap.to(content, { height: "auto", opacity: 1, filter: "blur(0px)", duration: 0.45, ease: "power2.out" });
        gsap.to(border, { opacity: 1, duration: 0.3 });
        item.style.background = "linear-gradient(122deg, #FFF 78.5%, #FF9574 99.02%)";
        item.style.boxShadow = "0 20px 60px 0 rgba(0, 0, 0, 0.08)";
        path.setAttribute("d", crossPath);
        gsap.fromTo(icon, { rotation: -360, opacity: 0.5 }, { rotation: 0, opacity: 1, duration: 0.6, ease: "power2.out" });
        item.classList.add("active");
      }
    });
  });
});