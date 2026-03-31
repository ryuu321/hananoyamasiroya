const PRODUCTS = [
  {
    id: 'bouquets',
    title: '花束 (Bouquets)',
    purposes: ['celebration', 'offering'],
    items: [
      { id: 'YH-F001-7-01', name: 'お祝い用花束', price: 7000, img: 'https://yamashiroya.easy-myshop.jp/item-image/YH-F001-7-01.jpg', desc: '門出を祝う華やかなブーケ。' },
      { id: '16B-501', name: '季節の花束', price: 5500, img: 'https://yamashiroya.easy-myshop.jp/item-image/16B-501.jpg', desc: '旬の花材をあしらった花束。' }
    ]
  },
  {
    id: 'arrangement',
    title: 'アレンジメント (Arrangements)',
    purposes: ['celebration', 'offering'],
    items: [
      { id: 'YH-F002-4-01', name: 'お祝い用アレンジ (S)', price: 4000, img: 'https://yamashiroya.easy-myshop.jp/item-image/YH-F002-4-01.jpg', desc: '飾りやすいサイズのギフト。' },
      { id: 'YH-F003-11-01', name: 'お祝い用アレンジ (L)', price: 11000, img: 'https://yamashiroya.easy-myshop.jp/item-image/YH-F003-11-01.jpg', desc: '豪華な贈り物として。' },
      { id: 'YH-F004-11-01', name: '開店祝アレンジ', price: 11000, img: 'https://yamashiroya.easy-myshop.jp/item-image/YH-F004-11-01.jpg', desc: '店舗の成功を願って。' },
      { id: 'YH-F012-7-01', name: 'お供えアレンジ', price: 7000, img: 'https://yamashiroya.easy-myshop.jp/item-image/YH-F012-7-01.jpg', desc: 'しめやかな法要の場に. ' }
    ]
  },
  {
    id: 'standing',
    title: 'スタンド花 (Standing Flowers)',
    purposes: ['offering'],
    items: [
      { id: '12S-121', name: '供花スタンド(1段)', price: 16500, img: 'https://yamashiroya.easy-myshop.jp/item-image/12S-121.jpg', desc: 'お通夜・ご葬儀の会場へ。' },
      { id: '12S-201', name: '供花スタンド(2段)', price: 22000, img: 'https://yamashiroya.easy-myshop.jp/item-image/12S-201.jpg', desc: '最高位の弔いの場に。' }
    ]
  },
  {
    id: 'preserved',
    title: 'プリザーブド・造花 (Preserved/Silk)',
    purposes: ['celebration', 'offering'],
    items: [
      { id: 'YH-Z008-5-01', name: 'プリザーブド入り造花', price: 5000, img: 'https://yamashiroya.easy-myshop.jp/item-image/YH-Z008-5-01.jpg', desc: '長く飾れるメモリアルギフト。' },
      { id: 'YH-Z011-4-01', name: 'BOX プリザーブド造花', price: 4000, img: 'https://yamashiroya.easy-myshop.jp/item-image/YH-Z011-4-01.jpg', desc: 'インテリアに馴染むボックス。' },
      { id: 'YH-Z013-3-01', name: '念珠付きアレンジ', price: 3000, img: 'https://yamashiroya.easy-myshop.jp/item-image/YH-Z013-3-01.jpg', desc: '心のこもった供え物。' }
    ]
  },
  {
      id: 'pet',
      title: 'ペット用 (For Pets)',
      purposes: ['offering'],
      items: [
          { id: '16P-301', name: 'ペット用アレンジ(S)', price: 3850, img: 'https://yamashiroya.easy-myshop.jp/item-image/16P-301.jpg', desc: '愛した家族へのお供えに。' },
          { id: '16P-401', name: 'ペット用アレンジ(M)', price: 4400, img: 'https://yamashiroya.easy-myshop.jp/item-image/16P-401.jpg', desc: '優しかった日々を彩る花。' }
      ]
  }
];

const COLORS = [
  { id: 'c-white', name: '白・グリーン系', img: '/color_white.png', mode: 'gradient', colors: ['#ffffff', '#2e7d32'] },
  { id: 'c-pink', name: 'ピンク・パステル系', img: '/color_pink.png', mode: 'gradient', colors: ['#d63384', '#f8bbd0'] },
  { id: 'c-red', name: '暖色・オレンジ系', img: '/color_red.png', mode: 'gradient', colors: ['#c62828', '#ff8a65'] },
  { id: 'c-purple', name: '紫・ブルー系', img: '/color_purple.png', mode: 'multi', colors: ['#2196F3', '#9C27B0', '#3F51B5', '#1A237E'] }
];

let cart = [];
let currentPurpose = 'celebration';
let currentProduct = null;
let currentColor = null;
let currentStep = 1;

function updateNavUI() {
    const isL = !document.getElementById('landing-screen').classList.contains('layer-hidden');
    const hN = document.getElementById('nav-home');
    const sN = document.getElementById('nav-shop');
    const active = "nav-link font-medium tracking-wide text-primary border-b-2 border-primary pb-1";
    const inactive = "nav-link font-medium tracking-wide opacity-60 hover:opacity-100 transition-opacity";
    if (hN && sN) { if(isL){ hN.className=active; sN.className=inactive; } else { hN.className=inactive; sN.className=active; } }
}

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
    } else { if(el) el.classList.add('layer-hidden'); }
  });
  if (step === 1) window.scrollTo({ top: 0, behavior: 'smooth' }); // Return top for purpose
  if (step === 2) renderProducts();
  if (step === 3) renderColors();
  updateStepper();
  updateNavUI();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function updateStepper() {
  for (let i = 1; i <= 4; i++) {
    const c = document.getElementById(`step-c-${i}`);
    const n = document.querySelector(`.step-node[data-step="${i}"]`);
    const label = n.querySelector('span');
    if (!c || !label) continue;

    n.onclick = () => { if (i < currentStep || (i === 2 && currentPurpose) || (i === 3 && currentProduct)) showStep(i); };

    if (i < currentStep) {
      c.innerHTML = '<span class="material-symbols-outlined text-[16px]">check</span>';
      c.className = 'w-10 h-10 rounded-full flex items-center justify-center bg-secondary text-white shadow-sm';
      label.className = "text-[10px] font-bold text-secondary tracking-tighter opacity-80";
    } else if (i === currentStep) {
      c.innerText = i;
      c.className = 'w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white scale-110 shadow-xl';
      label.className = "text-[10px] font-bold text-primary tracking-tighter opacity-100";
    } else {
      c.innerText = i;
      c.className = 'w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-high text-on-surface-variant/30 text-sm';
      label.className = "text-[10px] font-bold opacity-30 tracking-tighter";
    }
  }
}

function spawnPetals(selectedTheme) {
    const fromBtn = document.getElementById('add-to-cart-btn');
    const toIcon = document.getElementById('cart-icon-btn');
    if (!fromBtn || !toIcon || !selectedTheme) return;
    const fromR = fromBtn.getBoundingClientRect();
    const toR = toIcon.getBoundingClientRect();
    const count = 12;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = "fixed pointer-events-none z-[1000] rotate-45";
        p.style.width = `${Math.random() * 8 + 12}px`;
        p.style.height = `${Math.random() * 5 + 8}px`;
        p.style.borderRadius = "100% 15% 100% 15%";
        p.style.left = `${fromR.left + fromR.width / 2}px`;
        p.style.top = `${fromR.top + fromR.height / 2}px`;
        if (selectedTheme.mode === 'gradient') { p.style.background = `linear-gradient(135deg, ${selectedTheme.colors[0]}, ${selectedTheme.colors[1]})`; } 
        else { p.style.backgroundColor = selectedTheme.colors[i % selectedTheme.colors.length]; }
        p.style.boxShadow = `0 0 10px rgba(255,255,255,0.7), 0 0 2px rgba(0,0,0,0.2)`;
        p.style.border = `1px solid rgba(255,255,255,0.2)`;
        document.body.appendChild(p);
        const delay = i * 60;
        const dx = (toR.left + toR.width/2) - (fromR.left + fromR.width/2);
        const dy = (toR.top + toR.height/2) - (fromR.top + fromR.height/2);
        const anim = p.animate([
            { transform: 'translate(0, 0) rotate(0deg) scale(0)', opacity: 0 },
            { transform: `translate(${(Math.random()-0.5)*100}px, -60px) rotate(45deg) scale(1.5)`, opacity: 1, offset: 0.1 },
            { transform: `translate(${dx / 2}px, -150px) rotate(180deg) scale(1.8)`, opacity: 1, offset: 0.4 },
            { transform: `translate(${dx - 40}px, ${dy - 20}px) rotate(360deg) scale(1.5)`, opacity: 1, offset: 0.7 },
            { transform: `translate(${dx + 40}px, ${dy - 40}px) rotate(540deg) scale(1.5)`, opacity: 1, offset: 0.85 },
            { transform: `translate(${dx}px, ${dy - 80}px) rotate(630deg) scale(1.2)`, opacity: 1, offset: 0.92 },
            { transform: `translate(${dx}px, ${dy}px) rotate(720deg) scale(0.1)`, opacity: 0, offset: 1 }
        ], { duration: 2200, delay: delay, easing: 'cubic-bezier(0.25, 1, 0.5, 1)' });
        anim.onfinish = () => { p.remove(); if (i === count - 1) { toIcon.classList.add('animate-bounce'); setTimeout(() => toIcon.classList.remove('animate-bounce'), 800); updateCartUI(); } };
    }
}

function renderProducts() {
  const list = document.getElementById('product-list');
  list.innerHTML = '';
  PRODUCTS.filter(c => c.purposes.includes(currentPurpose)).forEach(cat => {
    const div = document.createElement('div');
    div.className = "mb-16";
    div.innerHTML = `<h4 class="text-2xl font-headline font-bold text-primary mb-8 border-b-2 border-primary/10 pb-4">${cat.title}</h4><div class="grid grid-cols-1 md:grid-cols-3 gap-10" id="cat-${cat.id}"></div>`;
    list.appendChild(div);
    cat.items.forEach(item => {
        const card = document.createElement('div');
        card.className = "bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all cursor-pointer group border border-primary/5";
        card.innerHTML = `<div class="aspect-[4/5] overflow-hidden"><img src="${item.img}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onerror="this.src='https://placehold.jp/101254/ffffff/400x500.png?text=Florist%20Yamashiroya'"/></div><div class="p-8"><h5 class="text-2xl font-bold mb-2">${item.name}</h5><p class="text-2xl font-bold font-label text-primary">¥${item.price.toLocaleString()}</p></div>`;
        card.onclick = () => { currentProduct = item; showStep(3); };
        document.getElementById(`cat-${cat.id}`).appendChild(card);
    });
  });
}

function renderColors() {
  const grid = document.getElementById('color-grid');
  const summary = document.getElementById('selection-summary');
  if(summary && currentProduct) summary.innerText = `${currentProduct.name} をお選びいただきました。`;
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
  spawnPetals(currentColor);
  currentColor = null;
  document.getElementById('add-to-cart-container').classList.add('opacity-0');
}

function updateCartUI() {
  const list = document.getElementById('cart-items-list');
  const badge = document.getElementById('cart-badge-count');
  const totalDisp = document.getElementById('cart-total-display');
  list.innerHTML = '';
  let total = 0;
  if(list) {
    cart.forEach((item, index) => {
        total += item.product.price * item.quantity;
        const div = document.createElement('div');
        div.className = "flex items-center gap-8 bg-white p-6 rounded-3xl border border-primary/5";
        div.innerHTML = `<div class="flex gap-2 w-24 flex-shrink-0"><img src="${item.product.img}" class="w-12 h-12 rounded-xl object-cover"/><img src="${item.color.img}" class="w-12 h-12 rounded-xl object-cover border"/></div><div class="flex-grow"><h5 class="text-xl font-bold leading-tight">${item.product.name}</h5><p class="text-sm opacity-60">${item.color.name}</p></div><div class="flex items-center gap-6"><div class="flex items-center bg-surface-container rounded-full p-1 border"><button class="w-8 h-8 flex items-center justify-center font-bold" onclick="changeQty(${index}, -1)">-</button><span class="w-8 text-center font-bold">${item.quantity}</span><button class="w-8 h-8 flex items-center justify-center font-bold" onclick="changeQty(${index}, 1)">+</button></div><p class="text-xl font-bold w-28 text-right">¥${(item.product.price * item.quantity).toLocaleString()}</p></div>`;
        list.appendChild(div);
    });
  }
  if(badge) {
    badge.innerText = cart.length; badge.classList.toggle('hidden', cart.length === 0);
  }
  if(totalDisp) totalDisp.innerText = `¥${total.toLocaleString()}`;
}

window.changeQty = (index, delta) => { cart[index].quantity += delta; if (cart[index].quantity <= 0) cart.splice(index, 1); updateCartUI(); };
function toggleCart(open) { document.getElementById('cart-screen').style.transform = open ? 'translateX(0)' : 'translateX(100%)'; }

function playIntro(callback) {
  const overlay = document.getElementById('intro-overlay');
  if (!overlay) return;
  sessionStorage.setItem('yamashiroya_intro_played', 'true');
  overlay.classList.remove('hidden');
  setTimeout(() => { overlay.style.opacity = '1'; document.getElementById('intro-image-container').style.opacity = '1'; document.getElementById('intro-image-container').style.transform = 'scale(1.1)'; document.getElementById('intro-text').style.opacity = '1'; document.getElementById('intro-text').style.transform = 'translateY(0)'; }, 100);
  setTimeout(() => { overlay.style.opacity = '0'; setTimeout(() => { overlay.classList.add('hidden'); if (callback) callback(); updateNavUI(); }, 1000); }, 4500);
}
const introPlayed = sessionStorage.getItem('yamashiroya_intro_played');
if (!introPlayed) playIntro(); else updateNavUI();

document.getElementById('start-shopping').onclick = () => showStep(1);
document.getElementById('nav-shop').onclick = (e) => { e.preventDefault(); showStep(1); };
document.getElementById('nav-home').onclick = (e) => { e.preventDefault(); document.getElementById('order-screen').classList.add('layer-hidden'); document.getElementById('landing-screen').classList.remove('layer-hidden'); updateNavUI(); };
document.getElementById('add-to-cart-btn').onclick = addToCart;
document.getElementById('cart-icon-btn').onclick = () => toggleCart(true);
document.getElementById('close-cart').onclick = () => toggleCart(false);
document.getElementById('checkout-btn').onclick = () => { toggleCart(false); showStep(4); };
updateStepper(); updateCartUI();
