/* =============================================
   ARCHVIZ STUDIO — app.js
   ============================================= */

// ---------- Portfolio Data ----------
const PORTFOLIO_DATA = [
  {
    id: 1,
    src: './res/freelance Work Evening View.jpg',
    category: 'Commercial',
    title: 'Vasant Harmony Business Park',
    description: 'Striking modern glass facade office building captured beautifully at dusk.'
  },
  {
    id: 2,
    src: './res/Overcast Villa Late Evening View.jpg',
    category: 'Exterior',
    title: 'The Modern Villa',
    description: 'A luxurious three-story contemporary villa captured at twilight.'
  },
  {
    id: 3,
  src: './res/Crescent Wtc Day View.jpg',
    category: 'Commercial',
    title: 'Crescent WTC Aerial',
    description: 'High-angle view of a premium commercial hub adjacent to the airport terminals.'
  },
  {
    id: 4,
    src: './res/Leving room.jpg',
    category: 'Interior',
    title: 'Luxury Living Room',
    description: 'Spacious modern living area featuring marble accents and warm lighting.'
  },
  {
    id: 5,
    src: './res/Crescent Wtc Evening View.jpg',
    category: 'Commercial',
    title: 'Crescent WTC Street View',
    description: 'Elegant glass and steel commercial building viewed from street level.'
  },
  {
    id: 6,
    src: './res/Nicco Vanashri Evening View.jpg',
    category: 'Exterior',
    title: 'Nicco Vanashri Tower (Dusk)',
    description: 'A striking commercial and residential high-rise at dusk.'
  },
  {
    id: 7,
    src: './res/Bedroom.jpg',
    category: 'Interior',
    title: 'Contemporary Bedroom',
    description: 'Elegant master bedroom with bespoke wall paneling and a dedicated wardrobe space.'
  },
  {
    id: 8,
    src: './res/Crescent Wtc Night View.jpg',
    category: 'Commercial',
    title: 'Crescent WTC Night',
    description: 'Dramatic nighttime illumination highlighting the structural facade.'
  },
  {
    id: 9,
    src: './res/Sai Galaxy Day View.jpeg',
    category: 'Exterior',
    title: 'Sai Galaxy',
    description: 'A beautifully designed contemporary residential tower in daylight.'
  },
  {
    id: 10,
    src: './res/freelance Work Day View.jpg',
    category: 'Exterior',
    title: 'Urban Residential Tower',
    description: 'Tall residential building featuring a vibrant retail podium at ground level.'
  },
  {
    id: 11,
    src: './res/Satra nexus Night View.jpg',
    category: 'Exterior',
    title: 'Satra Nexus Aerial',
    description: "Bird's-eye view showcasing extensive rooftop amenities and architectural layout."
  },
  {
    id: 12,
    src: './res/freelance Work  Night View.jpg',
    category: 'Exterior',
    title: 'Twilight Towers',
    description: 'Looking up at towering residential blocks against a clear dusk sky.'
  },
  {
    id: 13,
    src: './res/freelance Work Day View Front.jpg',
    category: 'Exterior',
    title: 'Grand Residential Complex',
    description: 'Massive multi-wing residential estate with integrated greenery.'
  },
  {
    id: 14,
    src: './res/Nicco Vanashri Late Evening View.jpg',
    category: 'Amenities',
    title: 'Rooftop Play Area',
    description: "Vibrant and safe children's play zone located on the podium rooftop."
  },
  {
    id: 15,
    src: './res/Nicco Vanashri Day View.jpg',
    category: 'Exterior',
    title: 'Nicco Vanashri Estate (Day)',
    description: 'Detailed view of Wings A, B, and C with perforated facade elements.'
  },
  {
    id: 16,
    src: './res/Satra nexus.jpg',
    category: 'Exterior',
    title: 'Satra Nexus Entrance',
    description: 'A sleek, welcoming ground-floor entrance and drop-off zone.'
  },
  {
    id: 17,
    src: './res/The Edge.jpg',
    category: 'Exterior',
    title: 'Urban Block',
    description: 'A well-integrated residential block situated next to a transit corridor.'
  }
];

const CATEGORIES = ['All', 'Exterior', 'Commercial', 'Interior', 'Amenities'];

// ---------- State ----------
let activeCategory = 'All';
let selectedImage = null;

// ---------- DOM Refs ----------
const navbar       = document.getElementById('navbar');
const menuToggle   = document.getElementById('menuToggle');
const menuIcon     = document.getElementById('menuIcon');
const mobileMenu   = document.getElementById('mobileMenu');
const filtersEl    = document.getElementById('filters');
const gridEl       = document.getElementById('portfolioGrid');
const lightbox     = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxImg  = document.getElementById('lightboxImg');
const lightboxCat  = document.getElementById('lightboxCat');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDesc = document.getElementById('lightboxDesc');
const yearEl       = document.getElementById('year');

// ---------- Initialise Lucide Icons ----------
lucide.createIcons();

// ---------- Footer Year ----------
yearEl.textContent = new Date().getFullYear();

// ---------- Navbar Scroll ----------
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ---------- Mobile Menu ----------
menuToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  // Swap icon between menu and X
  menuIcon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
  lucide.createIcons();
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuIcon.setAttribute('data-lucide', 'menu');
    lucide.createIcons();
  });
});

// ---------- Build Filter Buttons ----------
function buildFilters() {
  filtersEl.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (cat === activeCategory ? ' active' : '');
    btn.textContent = cat;
    btn.addEventListener('click', () => {
      activeCategory = cat;
      buildFilters();
      buildGrid();
    });
    filtersEl.appendChild(btn);
  });
}

// ---------- Build Portfolio Grid ----------
function buildGrid() {
  const filtered = activeCategory === 'All'
    ? PORTFOLIO_DATA
    : PORTFOLIO_DATA.filter(item => item.category === activeCategory);

  gridEl.innerHTML = '';

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'grid-item';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `View ${item.title}`);

    card.innerHTML = `
      <img src="${item.src}" alt="${item.title}" loading="lazy" />
      <div class="grid-overlay">
        <div class="overlay-inner">
          <p class="overlay-cat">${item.category}</p>
          <h3 class="overlay-title">${item.title}</h3>
          <div class="overlay-expand">
            <i data-lucide="maximize-2"></i>
            <span>View Fullscreen</span>
          </div>
        </div>
      </div>
    `;

    card.addEventListener('click', () => openLightbox(item));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openLightbox(item); });

    gridEl.appendChild(card);
  });

  // Re-create Lucide icons inside new DOM nodes
  lucide.createIcons();
}

// ---------- Lightbox ----------
function openLightbox(item) {
  selectedImage = item;
  lightboxImg.src = item.src;
  lightboxImg.alt = item.title;
  lightboxCat.textContent = item.category;
  lightboxTitle.textContent = item.title;
  lightboxDesc.textContent = item.description;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  selectedImage = null;
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);

// Close when clicking backdrop (outside the inner content)
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
});

// ---------- Init ----------
buildFilters();
buildGrid();
