const PRODUCTS = [
  {
    id: 'bouquets',
    title: '花束 (Bouquets)',
    purposes: ['offering', 'celebration'],
    items: [
      { id: '101', name: '白百合のメモリアル', price: 8800, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6UBR-PvP6XGHqMmJwNOu4mseTA_n6occ46d0RcbCDDBhtvLtrEL4jQluReXDBwW2MRb1BsYGaTIGE4ftLVU7XNrYMQhshhuHjXO44hyo9IeISVefpGFwq_Edz4pZLPHW4Lx5yzoxEnEJW5Fj0kehlLDQ63q75AAzkl3V8wxS1fGZ5JfA3O7yWGGpv9pnNgCmjOVAWQl13yxaKxJPoMImsJEkLYn5xgsetNJZXvQBD2LHHdQxMNjas4Y_a3rxn-A70uIq1SkqRqg', desc: '気品ある白百合の正統派。' },
      { id: '102', name: '季節の供花（淡色）', price: 5500, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYhHYOD220ToezOAmPQKdfGJEBsgwrcLnIwTLMMOXynyBi7Z0op84jyKpcqi_hFY_tZHxLuwHXUGeLr5Wih58Ocjk0wCjBifImrwPk8mqWx3Jku5gilZ8i3AZPl4yphtgyF0B_soH9gfTKTHspOEw_mBhUu5qeoi14QN8WOoNaRR-TvDlKcBH1BJcHbnun4-VxDU4sOosQMz17eeQy-Jvtmc6atrCkTLR30YLqEIvEdXAPpmNS8JNI95oGWne8xtvv31MiTjqgcg', desc: '穏やかな季節の花々の共鳴。' }
    ]
  },
  {
    id: 'gift',
    title: 'ギフト作品 (Gifts)',
    purposes: ['celebration'],
    items: [
      { id: '301', name: 'ハピネス・ブーケ', price: 12000, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLIzk4UYU9mRyz4SVL3gzGcHIpR6c3APM3sMFyTz9bd1oNew1RK29VodqvTnKqnbSAoTkuzibK2YfsbcTeJVkkWUbsSvOeRoc78LtxdQce8pWUorhBX1gpLmP3IMidML_BDVUe_I6cZAqA94DkTnmD5q-ZZbSYJcWusZnK5UTSGrfaheBYE7HBoPohJrgwmGYWe76gR2ZaGJdM5J6y8hBundTh1x0WuN7OncihCF8WeKFUEKodKWc8Wf5OJzN3MfIkxzQqMLVYUg', desc: '門出を祝う色彩のパレード。' }
    ]
  }
];

const COLORS = [
  { id: 'c-white', name: '白・グリーン系', img: '/color_white.png', petalColor: '#2d5a27', glowColor: 'rgba(255,255,255,0.9)' },
  { id: 'c-pink', name: 'ピンク・パステル系', img: '/color_pink.png', petalColor: '#d63384', glowColor: 'rgba(255,180,200,0.9)' },
  { id: 'c-red', name: '暖色・オレンジ系', img: '/color_red.png', petalColor: '#c62828', glowColor: 'rgba(255,140,80,0.9)' },
  { id: 'c-purple', name: '紫・ブルー系', img: '/color_purple.png', petalColor: '#4a148c', glowColor: 'rgba(180,140,255,0.9)' }
];

let cart = [];
let currentPurpose = 'celebration';
let currentProduct = null;
let currentColor = null;
let currentStep = 1;

// --- DYNAMIC LAYER TRANSITIONS ---
function showStep(step) {
  const prevStep = currentStep;
  currentStep = step;
  document.getElementById('landing-screen').classList.add('layer-hidden');
  document.getElementById('order-screen').classList.remove('layer-hidden');

  [1, 2, 3, 4].forEach(num => {
    const el = document.getElementById(`step-${num}-area`);
    if (num === step) {
      el.classList.remove('layer-hidden');
      el.animate([{ opacity: 0, transform: `translateX(${step > prevStep ? 40 : -40}px)` }, { opacity: 1, transform: 'translateX(0)' }], { duration: 500, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
    } else { el.classList.add('layer-hidden'); }
  });

  if (step === 2) renderProducts();
  if (step === 3) renderColors();
  updateStepper();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function updateStepper() {
  for (let i = 1; i <= 4; i++) {
    const c = document.getElementById(`step-c-${i}`);
    const n = document.querySelector(`.step-node[data-step="${i}"]`);
    if (!c) continue;
    n.onclick = () => { if (i < currentStep || (i === 2 && currentPurpose) || (i === 3 && currentProduct)) showStep(i); };
    if (i < currentStep) {
      c.innerHTML = '<span class="material-symbols-outlined text-[16px]">check</span>';
      c.className = 'w-10 h-10 rounded-full flex items-center justify-center bg-secondary text-white shadow-sm transition-all';
    } else if (i === currentStep) {
      c.innerText = i;
      c.className = 'w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white scale-110 shadow-xl ring-4 ring-primary/10 transition-all';
    } else {
      c.innerText = i;
      c.className = 'w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-high text-on-surface-variant/30 text-sm transition-all';
    }
  }
}

// --- PETAL FLIGHT ANIMATION ---
function spawnPetals(selectedColor) {
  const fromBtn = document.getElementById('add-to-cart-btn');
  const toIcon = document.getElementById('cart-icon-btn');
  if (!fromBtn || !toIcon || !selectedColor) return;
  const fromRect = fromBtn.getBoundingClientRect();
  const toRect = toIcon.getBoundingClientRect();
  const count = 10;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    const color = selectedColor.petalColor;
    const glow = selectedColor.glowColor;
    p.className = "fixed pointer-events-none z-[1000] rotate-45";
    p.style.width = `${Math.random() * 8 + 10}px`;
    p.style.height = `${Math.random() * 5 + 5}px`;
    p.style.borderRadius = "100% 20%";
    p.style.backgroundColor = color;
    p.style.left = `${fromRect.left + fromRect.width / 2}px`;
    p.style.top = `${fromRect.top + fromRect.height / 2}px`;
    p.style.boxShadow = `0 0 12px ${glow}, 0 0 3px rgba(0,0,0,0.4)`;
    p.style.border = `1px solid rgba(255,255,255,0.2)`;
    document.body.appendChild(p);

    const delay = i * 50;
    const anim = p.animate([
      { transform: `translate(0, 0) rotate(0deg) scale(0)`, opacity: 0 },
      { transform: `translate(${Math.random()*60-30}px, -40px) rotate(45deg) scale(1.5)`, opacity: 1, offset: 0.1 },
      { transform: `translate(${(Math.random()-0.5)*300}px, -180px) rotate(180deg) scale(2)`, opacity: 1, offset: 0.5 },
      { transform: `translate(${(toRect.left+toRect.width/2)-(fromRect.left+fromRect.width/2)}px, ${(toRect.top+toRect.height/2)-(fromRect.top+fromRect.height/2)}px) rotate(720deg) scale(0.1)`, opacity: 0 }
    ], { duration: 1600, delay: delay, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' });

    anim.onfinish = () => {
      p.remove();
      if (i === count - 1) {
        toIcon.classList.add('animate-bounce');
        setTimeout(() => toIcon.classList.remove('animate-bounce'), 800);
        updateCartUI();
      }
    };
  }
}

// --- RENDERING ---
function renderProducts() {
  const list = document.getElementById('product-list');
  list.innerHTML = '';
  PRODUCTS.filter(c => c.purposes.includes(currentPurpose)).forEach(cat => {
    const div = document.createElement('div');
    div.className = "mb-16";
    div.innerHTML = `<h4 class="text-2xl font-headline font-bold text-primary mb-8 border-b-2 border-primary/10 pb-4">${cat.title}</h4>
                     <div class="grid grid-cols-1 md:grid-cols-3 gap-10" id="cat-${cat.id}"></div>`;
    list.appendChild(div);
    cat.items.forEach(item => {
      const card = document.createElement('div');
      card.className = "bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all cursor-pointer group border border-primary/5";
      card.innerHTML = `<div class="aspect-[4/5] overflow-hidden"><img src="${item.img}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/></div>
                        <div class="p-8"><h5 class="text-2xl font-bold mb-2">${item.name}</h5><p class="text-2xl font-bold font-label text-primary">¥${item.price.toLocaleString()}</p></div>`;
      card.onclick = () => { currentProduct = item; showStep(3); };
      document.getElementById(`cat-${cat.id}`).appendChild(card);
    });
  });
}

function renderColors() {
  const grid = document.getElementById('color-grid');
  grid.innerHTML = '';
  COLORS.forEach(color => {
    const isSel = currentColor?.id === color.id;
    const div = document.createElement('div');
    div.className = `p-8 bg-white rounded-[2rem] shadow-sm border-2 cursor-pointer transition-all ${isSel ? 'border-primary ring-8 ring-primary/5' : 'border-transparent'}`;
    div.innerHTML = `<div class="aspect-square rounded-2xl overflow-hidden mb-6 shadow-inner"><img src="${color.img}" class="w-full h-full object-cover"/></div><p class="text-center font-bold text-lg">${color.name}</p>`;
    div.onclick = () => { currentColor = color; renderColors(); document.getElementById('add-to-cart-container').classList.remove('opacity-0'); };
    grid.appendChild(div);
  });
}

function addToCart() {
  if (!currentProduct || !currentColor) return;
  const exists = cart.find(i => i.product.id === currentProduct.id && i.color.id === currentColor.id && i.purpose === currentPurpose);
  if (exists) exists.quantity++; else cart.push({id:Date.now(),purpose:currentPurpose,product:{...currentProduct},color:{...currentColor},quantity:1});
  
  // Start animation immediately with current color
  spawnPetals(currentColor);
  
  // Cleanup current choice for next one
  const temp = currentColor;
  currentColor = null;
  document.getElementById('add-to-cart-container').classList.add('opacity-0');
}

function updateCartUI() {
  const list = document.getElementById('cart-items-list');
  const badge = document.getElementById('cart-badge-count');
  const totalDisp = document.getElementById('cart-total-display');
  list.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    total += item.product.price * item.quantity;
    const div = document.createElement('div');
    div.className = "flex items-center gap-8 bg-white p-6 rounded-3xl border border-primary/5";
    div.innerHTML = `<div class="flex gap-2 w-24 flex-shrink-0"><img src="${item.product.img}" class="w-12 h-12 rounded-xl object-cover"/><img src="${item.color.img}" class="w-12 h-12 rounded-xl object-cover border"/></div>
                    <div class="flex-grow"><h5 class="text-xl font-bold leading-tight">${item.product.name}</h5><p class="text-sm opacity-60">${item.color.name}</p></div>
                    <div class="flex items-center gap-6"><div class="flex items-center bg-surface-container rounded-full p-1 border"><button class="w-8 h-8 flex items-center justify-center font-bold" onclick="changeQty(${index}, -1)">-</button><span class="w-8 text-center font-bold">${item.quantity}</span><button class="w-8 h-8 flex items-center justify-center font-bold" onclick="changeQty(${index}, 1)">+</button></div><p class="text-xl font-bold w-28 text-right">¥${(item.product.price * item.quantity).toLocaleString()}</p></div>`;
    list.appendChild(div);
  });
  badge.innerText = cart.length; badge.classList.toggle('hidden', cart.length === 0);
  totalDisp.innerText = `¥${total.toLocaleString()}`;
}

window.changeQty = (index, delta) => { cart[index].quantity += delta; if (cart[index].quantity <= 0) cart.splice(index, 1); updateCartUI(); };
function toggleCart(open) { document.getElementById('cart-screen').style.transform = open ? 'translateX(0)' : 'translateX(100%)'; }

// --- INITIALIZE & INTRO ---
function playIntro(callback) {
  const overlay = document.getElementById('intro-overlay');
  if (!overlay) return;
  sessionStorage.setItem('yamashiroya_intro_played', 'true');
  overlay.classList.remove('hidden');
  setTimeout(() => {
    overlay.style.opacity = '1';
    document.getElementById('intro-image-container').style.opacity = '1';
    document.getElementById('intro-image-container').style.transform = 'scale(1.1)';
    document.getElementById('intro-text').style.opacity = '1';
    document.getElementById('intro-text').style.transform = 'translateY(0)';
  }, 100);
  setTimeout(() => {
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.classList.add('hidden');
      if (callback) callback();
    }, 1000);
  }, 4500);
}

const introPlayed = sessionStorage.getItem('yamashiroya_intro_played');
if (!introPlayed) {
    playIntro();
}

// --- HANDLERS ---
document.getElementById('start-shopping').onclick = () => showStep(1);
document.getElementById('nav-shop').onclick = (e) => { e.preventDefault(); showStep(1); };
document.getElementById('nav-home').onclick = (e) => { e.preventDefault(); location.reload(); };
document.querySelectorAll('.purpose-card').forEach(card => card.onclick = () => { currentPurpose = card.dataset.purpose; showStep(2); });
document.getElementById('add-to-cart-btn').onclick = addToCart;
document.getElementById('cart-icon-btn').onclick = () => toggleCart(true);
document.getElementById('close-cart').onclick = () => toggleCart(false);
document.getElementById('checkout-btn').onclick = () => { toggleCart(false); showStep(4); };

updateStepper(); updateCartUI();
