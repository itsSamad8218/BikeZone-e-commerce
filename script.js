// Bike details inline functionality
const bikeCards = document.querySelectorAll('.bike-card');
const bikeDetailsInline = document.getElementById('bikeDetailsInline');
const favoriteBtns = document.querySelectorAll('.favorite-btn');
const quickViewBtns = document.querySelectorAll('.quick-view-btn');

const bikeData = {
    mountain: {
        title: 'Mountain Bike Pro',
        desc: 'Professional grade mountain bike with full suspension and rugged tires for all terrains.',
        price: '$799 - $1,499',
        size: 'S, M, L, XL',
        gears: '21-speed',
        material: 'Aluminum Frame',
        type: 'Mountain Bike',
        model: 'MTB-2024',
        images: [
            'images/img7.jpg',
            'images/img2.jpg',
            'images/img3.webp',
          
            'images/img5.jpg',
            'images/img6.jpg',
            'images/img8.jpg',
            'images/img9.jpg',
            'images/img10.jpg',
            'images/img11.jpg',
        ]
    },
    road: {
        title: 'Road Racer Pro',
        desc: 'Ultra-lightweight road bike with aerodynamic design for maximum speed on paved roads.',
        price: '$599 - $1,299',
        size: 'M, L',
        gears: '18-speed',
        material: 'Carbon Fiber',
        type: 'Road Bike',
        model: 'RBP-2025',
        images: [
            'images/img19.jpeg',
            'images/img16.jpg',
            'images/img17.jpg',
            'images/img20.jpg',
            'images/img21.jpeg',
            
        ]
    },
    racing: {
        title: 'Racing Bike Elite',
        desc: 'High-performance racing machine with aerodynamic frame and premium components.',
        price: '$1,299 - $2,999',
        size: 'XS, S, M, L',
        gears: '22-speed',
        material: 'Titanium Alloy',
        type: 'Racing Bike',
        model: 'RCE-2025',
        images: [
           'images/img30.jpg',
           'images/img33.jpg',
           'images/img36.jpg',
           'images/img35.jpg',
        ]
    },
    electric: {
        title: 'Electric Commuter',
        desc: 'Motor-assisted e-bike perfect for urban commuting with long battery life.',
        price: '$1,199 - $2,499',
        size: 'M, L, XL',
        gears: '7-speed',
        material: 'Aluminum',
        type: 'Electric Bike',
        model: 'ECO-2025',
        images: [
            'images/img28.jpeg',
            'images/img24.jpg',
            'images/img25.jpg',
            'images/img22.jpg',
            
            
        ]
    }
};

bikeCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        const bikeTypes = ['mountain', 'road', 'racing', 'electric'];
        const bikeType = bikeTypes[index];
        showBikeDetailsInline(bikeData[bikeType]);
    });
});

function showBikeDetailsInline(bike) {
    bikeDetailsInline.innerHTML = `
        <div class="w-full max-w-lg bg-gray-800 rounded-lg shadow-xl p-6 animate-fadeIn">
            <div class="image-slider mb-2 bg-gray-900 rounded-lg p-4 flex flex-col items-center">
                <div class="slider-images flex items-center justify-center overflow-hidden rounded-lg bg-orange-500" style="height: 220px;">
                    <img src="${bike.images[0]}" class="w-full h-full object-contain" id="sliderMainImg" />
                </div>
                <div class="slider-nav flex justify-between items-center mt-2 w-full">
                    <button class="prev-btn bg-gray-700 hover:bg-orange-500 text-white px-2 py-1 rounded">&larr;</button>
                    <button class="next-btn bg-gray-700 hover:bg-orange-500 text-white px-2 py-1 rounded">&rarr;</button>
                </div>
                <div class="flex justify-center gap-4 mt-2 mb-2">
                    <button class="buy-now-btn bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-semibold transition duration-300">Buy Now</button>
                    <button class="add-cart-btn bg-gray-800 hover:bg-orange-500 text-white px-4 py-2 rounded font-semibold transition duration-300">Add to Cart</button>
                </div>
            </div>
            <h2 class="text-2xl font-bold mb-1 text-center">${bike.title}</h2>
            <p class="text-gray-300 mb-2 text-center">${bike.desc}</p>
            <div class="bike-specs grid grid-cols-2 gap-3 text-sm bg-gray-900 rounded-lg p-3">
                <div class="spec-item flex items-center"><span class="spec-icon">💰</span><span>Price: ${bike.price}</span></div>
                <div class="spec-item flex items-center"><span class="spec-icon">📏</span><span>Size: ${bike.size}</span></div>
                <div class="spec-item flex items-center"><span class="spec-icon">⚙️</span><span>Gears: ${bike.gears}</span></div>
                <div class="spec-item flex items-center"><span class="spec-icon">🔩</span><span>Material: ${bike.material}</span></div>
                <div class="spec-item flex items-center"><span class="spec-icon">🔄</span><span>Type: ${bike.type}</span></div>
                <div class="spec-item flex items-center"><span class="spec-icon">🏷️</span><span>Model: ${bike.model}</span></div>
            </div>
        </div>
    `;
    // Slider logic
    let currentIndex = 0;
    const mainImg = document.getElementById('sliderMainImg');
    const prevBtn = bikeDetailsInline.querySelector('.prev-btn');
    const nextBtn = bikeDetailsInline.querySelector('.next-btn');
    prevBtn.onclick = () => {
        currentIndex = (currentIndex - 1 + bike.images.length) % bike.images.length;
        mainImg.src = bike.images[currentIndex];
    };
    nextBtn.onclick = () => {
        currentIndex = (currentIndex + 1) % bike.images.length;
        mainImg.src = bike.images[currentIndex];
    };
    // Button actions
    bikeDetailsInline.querySelector('.buy-now-btn').onclick = () => alert('login first');
    bikeDetailsInline.querySelector('.add-cart-btn').onclick = () => alert('item added to cart');
}

window.addEventListener('click', (e) => {
    if (e.target === bikeDetailsInline) {
        bikeDetailsInline.innerHTML = ''; // Clear inline details
    }
});

// Favorite logic with localStorage
function getFavorites() {
    return JSON.parse(localStorage.getItem('bikeFavorites') || '{}');
}
function setFavorites(favs) {
    localStorage.setItem('bikeFavorites', JSON.stringify(favs));
}
function updateFavoriteIcons() {
    const favs = getFavorites();
    favoriteBtns.forEach(btn => {
        const type = btn.getAttribute('data-type');
        if (favs[type]) {
            btn.classList.add('favorited');
            btn.querySelector('.heart').innerHTML = '&#10084;'; // solid heart
        } else {
            btn.classList.remove('favorited');
            btn.querySelector('.heart').innerHTML = '&#9825;'; // outline heart
        }
    });
}
favoriteBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        e.stopPropagation();
        const type = btn.getAttribute('data-type');
        const favs = getFavorites();
        favs[type] = !favs[type];
        setFavorites(favs);
        updateFavoriteIcons();
    });
});
updateFavoriteIcons();

// Quick View logic
quickViewBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        e.stopPropagation();
        const type = btn.getAttribute('data-type');
        showBikeDetailsInline(bikeData[type]);
        bikeDetailsInline.scrollIntoView({behavior: 'smooth'});
    });
});

// Gallery Section Logic
const galleryImages = [
  // Mountain
  {src: 'images/img4.jpg', type: 'mountain'},
  {src: 'images/img5.jpg', type: 'mountain'},
  {src: 'images/img6.jpg', type: 'mountain'},
  {src: 'images/img7.jpg', type: 'mountain'},
  {src: 'images/img8.jpg', type: 'mountain'},
  {src: 'images/img9.jpg', type: 'mountain'},
  {src: 'images/img10.jpg', type: 'mountain'},
  {src: 'images/img12.jpg', type: 'mountain'},
  {src: 'images/img13.jpg', type: 'mountain'},
  // Road
  {src: 'images/img19.jpeg', type: 'road'},
  {src: 'images/img16.jpg', type: 'road'},
  {src: 'images/img17.jpg', type: 'road'},
  {src: 'images/img20.jpg', type: 'road'},
  {src: 'images/img21.jpeg', type: 'road'},
  // Racing
  {src: 'images/img30.jpg', type: 'racing'},
  {src: 'images/img33.jpg', type: 'racing'},
  {src: 'images/img36.jpg', type: 'racing'},
  {src: 'images/img35.jpg', type: 'racing'},
  {src: 'images/img39.jpg', type: 'racing'},
  {src: 'images/img37.jpg', type: 'racing'},
  


  // Electric
  {src: 'images/img28.jpeg', type: 'electric'},
  {src: 'images/img24.jpg', type: 'electric'},
  {src: 'images/img26.jpg', type: 'electric'},
  {src: 'images/img27.jpg', type: 'electric'},
  {src: 'images/img29.jpg', type: 'electric'},
  {src: 'images/img40.jpg', type: 'electric'},
  {src: 'images/img22.jpg', type: 'electric'},
  {src: 'images/img23.jpg', type: 'electric'},
  
  
];
const galleryGrid = document.getElementById('galleryGrid');
const filterBtns = document.querySelectorAll('.gallery-filter-btn');
let currentGallery = [...galleryImages];
let currentFilter = 'all';
let lightboxIndex = 0;

function renderGallery() {
  galleryGrid.innerHTML = '';
  currentGallery.forEach((img, idx) => {
    const imgEl = document.createElement('img');
    imgEl.src = img.src;
    imgEl.alt = 'Bike gallery image';
    imgEl.className = 'rounded-lg shadow-lg cursor-pointer hover:scale-105 transition duration-300 animate-fadeIn';
    imgEl.style.height = '180px';
    imgEl.style.width = '100%';
    imgEl.setAttribute('data-idx', idx);
    imgEl.onclick = () => openLightbox(idx);
    galleryGrid.appendChild(imgEl);
  });
}
function filterGallery(type) {
  currentFilter = type;
  if (type === 'all') {
    currentGallery = [...galleryImages];
  } else {
    currentGallery = galleryImages.filter(img => img.type === type);
  }
  renderGallery();
}
filterBtns.forEach(btn => {
  btn.onclick = () => {
    filterBtns.forEach(b => b.classList.remove('bg-orange-500', 'hover:bg-orange-600'));
    btn.classList.add('bg-orange-500', 'hover:bg-orange-600');
    filterGallery(btn.getAttribute('data-filter'));
  };
});
filterGallery('all');

// Lightbox logic
const galleryLightbox = document.getElementById('galleryLightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
function openLightbox(idx) {
  lightboxIndex = idx;
  lightboxImg.src = currentGallery[lightboxIndex].src;
  galleryLightbox.classList.remove('hidden');
}
function closeLightbox() {
  galleryLightbox.classList.add('hidden');
}
function prevLightbox() {
  lightboxIndex = (lightboxIndex - 1 + currentGallery.length) % currentGallery.length;
  lightboxImg.src = currentGallery[lightboxIndex].src;
}
function nextLightbox() {
  lightboxIndex = (lightboxIndex + 1) % currentGallery.length;
  lightboxImg.src = currentGallery[lightboxIndex].src;
}
galleryLightbox.onclick = e => { if (e.target === galleryLightbox) closeLightbox(); };
lightboxClose.onclick = closeLightbox;
lightboxPrev.onclick = prevLightbox;
lightboxNext.onclick = nextLightbox;
document.addEventListener('keydown', e => {
  if (!galleryLightbox.classList.contains('hidden')) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevLightbox();
    if (e.key === 'ArrowRight') nextLightbox();
  }
});

// Testimonials Carousel Logic
const testimonials = [
  // {
  //   avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  //   name: 'Arjun Patel',
  //   quote: 'BikeZone helped me find the perfect trail bike. The community is amazing and the site is super easy to use! Must try'
  // },
  {
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    name: 'Priya Sharma',
    quote: 'I love the variety of bikes and the quick view feature. The gallery is stunning and the support is top-notch. Nice work'
  },
  {
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    name: 'Rahul Singh',
    quote: 'The testimonials and reviews gave me confidence to buy. I recommend BikeZone developer to all my friends!'
  },
  {
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    name: 'Sneha Verma',
    quote: 'The section were perfectly distributed and easy to choose the varity of bikes'
  },
  {
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'Abdul Samad',
    quote: 'Crafted with care by me-A passionate developer ready join your team'
  },
  
    

];
let testimonialIndex = 0;
const testimonialCarousel = document.getElementById('testimonialCarousel');
const testimonialPrev = document.getElementById('testimonialPrev');
const testimonialNext = document.getElementById('testimonialNext');
function renderTestimonial(idx) {
  const t = testimonials[idx];
  testimonialCarousel.innerHTML = `
    <img src="${t.avatar}" class="testimonial-avatar animate-fadeIn" alt="${t.name}">
    <h3 class="text-xl font-semibold mb-2">${t.name}</h3>
    <p class="text-lg italic text-gray-200 animate-fadeIn">“${t.quote}”</p>
  `;
}
function nextTestimonial() {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  renderTestimonial(testimonialIndex);
}
function prevTestimonial() {
  testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
  renderTestimonial(testimonialIndex);
}
testimonialNext.onclick = nextTestimonial;
testimonialPrev.onclick = prevTestimonial;
renderTestimonial(testimonialIndex);
let testimonialInterval = setInterval(nextTestimonial, 5000);
testimonialCarousel.onmouseenter = () => clearInterval(testimonialInterval);
testimonialCarousel.onmouseleave = () => testimonialInterval = setInterval(nextTestimonial, 5000);

// Contact Form Logic
const contactForm = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contactSuccess');
contactForm.onsubmit = function(e) {
  e.preventDefault();
  // Simple validation (HTML5)
  contactSuccess.classList.remove('hidden');
  setTimeout(() => contactSuccess.classList.add('hidden'), 4000);
  contactForm.reset();
};
// Newsletter Signup Logic
const newsletterForm = document.getElementById('newsletterForm');
const newsletterSuccess = document.getElementById('newsletterSuccess');
newsletterForm.onsubmit = function(e) {
  e.preventDefault();
  // Simple validation (HTML5 )
  newsletterSuccess.classList.remove('hidden');
  setTimeout(() => newsletterSuccess.classList.add('hidden'), 4000);
  newsletterForm.reset();
};

// Mobile menu toggle and smooth scrolling
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('nav button');
    const mobileMenu = document.querySelector('.md\\:hidden.fixed');

    menuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('flex');
    });

    const closeButton = mobileMenu.querySelector('button');
    closeButton.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#about' || targetId === '#home') {
                e.preventDefault();
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Show login/signup modals when links are clicked
    document.querySelectorAll('a[href="#login"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('login').classList.remove('hidden');
        });
    });

    document.querySelectorAll('a[href="#signup"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('signup').classList.remove('hidden');
        });
    });

    // Form handling
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        alert(`Login sucecssful ${email}.`);
        document.getElementById('login').classList.add('hidden');
    });

    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirm = document.getElementById('signupConfirm').value;

        if (password !== confirm) {
            alert("Passwords don't match!");
            return;
        }

        alert(`New account for ${name} (${email}) created.`);
        document.getElementById('signup').classList.add('hidden');
    });
});
