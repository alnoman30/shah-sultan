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


// Stats Counter js
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const statsSection = document.querySelector("#stats-section");

  // Stop if stats section doesn't exist on this page
  if (!statsSection) return;

  const counters = statsSection.querySelectorAll(".stat-counter");
  const statColumns = statsSection.querySelectorAll(".flex-col");


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


      // Fade + scale animation
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
gsap.registerPlugin(SplitText, ScrollTrigger);

const split = new SplitText(".text-color-change", {
  type: "words",
  wordsClass: "split-word"
});

gsap.to(split.words, {
  color: "#020914",
  stagger: 0.08,
  ease: "none",
  scrollTrigger: {
    trigger: ".text-color-change",
    start: "top 80%",
    end: "bottom 40%",
    scrub: 1,
  }
});

// Testimonial splidejs 
document.addEventListener('DOMContentLoaded', function () {
  const splide = new Splide('#testimonial-slider', {
    type: 'loop',
    drag: 'free',
    focus: 'center',
    perPage: 3,
    gap: '32px',
    arrows: false,
    pagination: true,

    breakpoints: {
      1024: {
        perPage: 2,
        gap: "24px"
      },
      640: {
        perPage: 1,
      }
    }
  });

  // Only enable AutoScroll on screens larger than 640px
  if (window.innerWidth > 640) {
    splide.mount({
      AutoScroll: window.splide.Extensions.AutoScroll
    });
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


// 
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const allProjectItems = Array.from(document.querySelectorAll(".project-item"));
  const featuredItem = document.getElementById("featured-project-item");
  const featuredNotFound = document.getElementById("featured-not-found");
  const gridNotFound = document.getElementById("grid-not-found");
  
  // Pagination Settings
  const itemsPerPage = 6;
  let currentPage = 1;
  let activeFilter = "all";

  // Create or select a pagination container for the grid
  let paginationContainer = document.getElementById("pagination-container");
  const gridElement = document.querySelector(".grid");
  
  if (!paginationContainer) {
    paginationContainer = document.createElement("div");
    paginationContainer.id = "pagination-container";
    paginationContainer.className = "flex justify-center items-center gap-2 mt-8 lg:mt-12";
    const gridSection = gridElement?.parentElement || gridNotFound?.parentElement;
    if (gridSection) gridSection.appendChild(paginationContainer);
  }

  // Prevent layout shift (collapsing height) by locking the grid container's minimum height
  function setGridMinHeight() {
    if (!gridElement || allProjectItems.length === 0) return;
    
    const sampleItems = allProjectItems.filter(item => item !== featuredItem).slice(0, itemsPerPage);
    if (sampleItems.length === 0) return;

    const previousStates = sampleItems.map(item => item.style.display);
    sampleItems.forEach(item => { item.style.display = "block"; });

    const measuredHeight = gridElement.offsetHeight;
    if (measuredHeight > 0) {
      gridElement.style.minHeight = `${measuredHeight}px`;
    }

    sampleItems.forEach((item, index) => { item.style.display = previousStates[index]; });
  }

  setTimeout(setGridMinHeight, 50);

  function updateView() {
    // 1. Filter items for the "All works" grid (excluding featured item)
    const filteredGridItems = allProjectItems.filter((item) => {
      if (item === featuredItem) return false;
      const categories = (item.getAttribute("data-category") || "").toLowerCase();
      return activeFilter === "all" || categories.includes(activeFilter.toLowerCase());
    });

    // 2. Handle Featured Work Section visibility & its own Not Found message
    if (featuredItem) {
      const featuredCategories = (featuredItem.getAttribute("data-category") || "").toLowerCase();
      const isFeaturedMatch = activeFilter === "all" || featuredCategories.includes(activeFilter.toLowerCase());

      if (isFeaturedMatch) {
        featuredItem.style.display = "grid";
        if (featuredNotFound) featuredNotFound.classList.add("hidden");
      } else {
        featuredItem.style.display = "none";
        if (featuredNotFound) {
          featuredNotFound.classList.remove("hidden");
          gsap.fromTo(featuredNotFound, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 });
        }
      }
    }

    // 3. Calculate pagination slices for grid items
    const totalPages = Math.ceil(filteredGridItems.length / itemsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      currentPage = totalPages;
    } else if (currentPage < 1) {
      currentPage = 1;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItemsToShow = filteredGridItems.slice(startIndex, endIndex);

    // 4. Separate grid items for GSAP hide/show transition
    let itemsToHide = allProjectItems.filter(item => item !== featuredItem && !currentItemsToShow.includes(item));
    let itemsToShow = currentItemsToShow;

    // 5. Handle "All works" Grid Not Found message independently
    if (filteredGridItems.length === 0) {
      if (gridNotFound) {
        gridNotFound.classList.remove("hidden");
        gsap.fromTo(gridNotFound, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 });
      }
      paginationContainer.innerHTML = "";
    } else {
      if (gridNotFound) gridNotFound.classList.add("hidden");
      renderPaginationControls(totalPages);
    }

    // 6. Run GSAP Animations for grid cards
    if (itemsToHide.length > 0) {
      gsap.to(itemsToHide, {
        opacity: 0,
        scale: 0.95,
        duration: 0.2,
        onComplete: function() {
          itemsToHide.forEach(item => { item.style.display = "none"; });
        }
      });
    }

    if (itemsToShow.length > 0) {
      itemsToShow.forEach(item => { item.style.display = "block"; });
      gsap.fromTo(
        itemsToShow,
        { opacity: 0, scale: 0.95, y: 15 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          overwrite: "auto",
          ease: "power2.out"
        }
      );
    }
  }

  function renderPaginationControls(totalPages) {
    if (totalPages <= 1) {
      paginationContainer.innerHTML = "";
      return;
    }

    let html = "";
    // Previous Button
    html += `<button class="px-4 py-2 rounded-full bg-gray-100 text-[#020914] font-medium disabled:opacity-40" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1}, event)">Prev</button>`;

    // Page Numbers
    for (let i = 1; i <= totalPages; i++) {
      const isActive = i === currentPage;
      const btnClass = isActive ? "bg-[#FF6F42] text-white" : "bg-gray-100 text-[#020914]";
      html += `<button class="w-10 h-10 rounded-full font-medium ${btnClass} transition-colors" onclick="changePage(${i}, event)">${i}</button>`;
    }

    // Next Button
    html += `<button class="px-4 py-2 rounded-full bg-gray-100 text-[#020914] font-medium disabled:opacity-40" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1}, event)">Next</button>`;

    paginationContainer.innerHTML = html;
  }

  // Seamless page change: prevents browser jumps and maintains smooth height lock
  window.changePage = function(page, event) {
    if (event) event.preventDefault();
    currentPage = page;
    updateView();
  };

  // Filter Button Click Handlers
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => {
        btn.classList.remove("bg-[#FF6F42]", "text-white");
        btn.classList.add("bg-[#E9E9E9]", "text-[#020914]");
      });
      
      this.classList.remove("bg-[#E9E9E9]", "text-[#020914]");
      this.classList.add("bg-[#FF6F42]", "text-white");

      activeFilter = this.getAttribute("data-filter") || "all";
      currentPage = 1; // Reset to page 1 on filter change
      updateView();
    });
  });

  // Initial load execution
  updateView();
});