/* =========================================================================
   NewMed Skills — V2 Interaction Engine (GSAP + Lenis)
   High-performance scrolling, pinning, and physics cursor.
========================================================================= */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lenis Smooth Scroll
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  // Sync Lenis with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // 2. Custom Physics Cursor (GSAP quickTo)
  const cursor = document.getElementById('v2-cursor');
  if (cursor) {
    let xTo = gsap.quickTo(cursor, "x", {duration: 0.2, ease: "power3"}, "-50%");
    let yTo = gsap.quickTo(cursor, "y", {duration: 0.2, ease: "power3"}, "-50%");

    window.addEventListener("mousemove", (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    });

    const clickables = document.querySelectorAll('a, button, input, select, .logo-tile, .swatch');
    clickables.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
  }

  // 3. GSAP Pinned Hero Animation
  const heroSection = document.querySelector('#v2-hero');
  const heroText = document.querySelector('.v2-hero-text');
  const heroGradient = document.querySelector('.v2-hero-gradient');

  if (heroSection && heroText && heroGradient) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: "+=150%", // Pin for 150% of viewport height
        pin: true,
        scrub: 1,
      }
    });

    // Scale down the text and fade it out
    tl.to(heroText, {
      scale: 0.2,
      opacity: 0,
      ease: "power2.inOut"
    }, 0);

    // Expand the gradient to engulf the screen
    tl.to(heroGradient, {
      scale: 5,
      opacity: 0.8,
      ease: "power2.inOut"
    }, 0);
  }

  // 4. GSAP Sticky Stack (Brand Values)
  const stackCards = gsap.utils.toArray('.v2-stack-card');
  if (stackCards.length > 0) {
    stackCards.forEach((card, i) => {
      if (i === stackCards.length - 1) return; // Don't pin the last card

      ScrollTrigger.create({
        trigger: card,
        start: "top top",
        endTrigger: stackCards[stackCards.length - 1],
        end: "top top",
        pin: true,
        pinSpacing: false,
      });

      gsap.to(card, {
        scale: 0.9,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: stackCards[i + 1],
          start: "top bottom",
          end: "top top",
          scrub: true,
        }
      });
    });
  }

  // 5. Floating Nav Hide/Show Logic
  const nav = document.getElementById('v2-nav');
  let lastScrollY = window.scrollY;
  
  lenis.on('scroll', (e) => {
    if (!nav) return;
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      nav.classList.add('nav-hidden');
    } else {
      nav.classList.remove('nav-hidden');
    }
    lastScrollY = currentScrollY;
  });

  // Smooth anchor scrolling via Lenis
  document.querySelectorAll('.v2-nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      lenis.scrollTo(targetId, {
        offset: -80,
        duration: 1.5,
      });
    });
  });
});
