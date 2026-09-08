// ============================================
// Video page: hero reel fades out on scroll
// ============================================
const hero = document.getElementById('hero');
if (hero) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const vh = window.innerHeight;
    const progress = Math.min(y / (vh * 0.8), 1);
    hero.style.opacity = 1 - progress;
    // TODO when real <video> is in place: pause it once progress reaches 1
    // (use an IntersectionObserver on the hero video element) so it isn't
    // playing/using bandwidth while scrolled out of view.
  });
}

// ============================================
// Photo page: featured slideshow
// autoplay by default, stops permanently on any user interaction
// ============================================
const slideshow = document.getElementById('slideshow');
if (slideshow) {
  let current = 0;
  // REPLACE with real photo captions/images
  const captions = [
    "Caption goes here — subject, location, date",
    "Second featured photo caption",
    "Third featured photo caption"
  ];
  const total = captions.length;
  let autoplayTimer = null;
  let autoplayActive = true;

  function renderDots() {
    const dotsEl = document.getElementById('dots');
    dotsEl.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const d = document.createElement('div');
      d.className = 'dot' + (i === current ? ' active' : '');
      d.onclick = () => { userInteract(); current = i; update(); };
      dotsEl.appendChild(d);
    }
  }
  function update() {
    document.getElementById('slide-caption').textContent = captions[current];
    renderDots();
  }
  window.nextSlide = function () { userInteract(); current = (current + 1) % total; update(); };
  window.prevSlide = function () { userInteract(); current = (current - 1 + total) % total; update(); };

  function startAutoplay() {
    autoplayTimer = setInterval(() => {
      current = (current + 1) % total;
      update();
    }, 3500);
  }
  function userInteract() {
    if (autoplayActive) {
      autoplayActive = false;
      clearInterval(autoplayTimer);
    }
  }

  update();
  startAutoplay();
}

// ============================================
// Video / Photo pages: filter chips
// ============================================
const filters = document.getElementById('filters');
if (filters) {
  const chips = filters.querySelectorAll('.chip');
  const grid = document.getElementById('video-grid') || document.getElementById('photo-grid');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filterValue = chip.dataset.filter;
      const items = grid.querySelectorAll('.video-item, .photo-item, .card');
      items.forEach(item => {
        if (filterValue === 'all' || item.dataset.category === filterValue) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}
