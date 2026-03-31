const PRODUCTS = [
  {
    id: 'bouquets',
    title: '花束 (ブーケ)',
    purposes: ['celebration', 'offering'],
    items: [
      { id: 'YH-F001-7-01', name: 'お祝い用花束', price: 7000, img: 'https://yamashiroya.easy-myshop.jp/item-image/YH-F001-7-01.jpg', desc: '門出を祝う華やかなブーケ。' },
      { id: '16B-501', name: '季節の花束', price: 5500, img: 'https://yamashiroya.easy-myshop.jp/item-image/16B-501.jpg', desc: '旬の花材をあしらった花束。' }
    ]
  },
  {
    id: 'arrangement',
    title: 'アレンジメント',
    purposes: ['celebration', 'offering'],
    items: [
      { id: 'YH-F002-4-01', name: 'お祝い用アレンジ (S)', price: 4000, img: 'https://yamashiroya.easy-myshop.jp/item-image/YH-F002-4-01.jpg', desc: '飾りやすいサイズのギフト。' },
      { id: 'YH-F003-11-01', name: 'お祝い用アレンジ (L)', price: 11000, img: 'https://yamashiroya.easy-myshop.jp/item-image/YH-F003-11-01.jpg', desc: '豪華な贈り物として。' },
      { id: 'YH-F004-11-01', name: '開店祝アレンジ', price: 11000, img: 'https://yamashiroya.easy-myshop.jp/item-image/YH-F004-11-01.jpg', desc: '店舗の成功を願って。' },
      { id: 'YH-F012-7-01', name: 'お供えアレンジ', price: 7000, img: 'https://yamashiroya.easy-myshop.jp/item-image/YH-F012-7-01.jpg', desc: 'しめやかな法要の場に。' }
    ]
  },
  {
    id: 'standing',
    title: 'スタンド花',
    purposes: ['offering'],
    items: [
      { id: '12S-121', name: '供花スタンド(1段)', price: 16500, img: 'https://yamashiroya.easy-myshop.jp/item-image/12S-121.jpg', desc: 'お通夜・ご葬儀の会場へ。' },
      { id: '12S-201', name: '供花スタンド(2段)', price: 22000, img: 'https://yamashiroya.easy-myshop.jp/item-image/12S-201.jpg', desc: '最高位の弔いの場に。' }
    ]
  },
  {
    id: 'preserved',
    title: 'プリザーブドフラワー・造花',
    purposes: ['celebration', 'offering'],
    items: [
      { id: 'YH-Z008-5-01', name: 'プリザーブド入り造花', price: 5000, img: 'https://yamashiroya.easy-myshop.jp/item-image/YH-Z008-5-01.jpg', desc: '長く飾れるメモリアルギフト。' },
      { id: 'YH-Z011-4-01', name: 'BOX プリザーブド造花', price: 4000, img: 'https://yamashiroya.easy-myshop.jp/item-image/YH-Z011-4-01.jpg', desc: 'インテリアに馴染むボックス。' },
      { id: 'YH-Z013-3-01', name: '念珠付きアレンジ', price: 3000, img: 'https://yamashiroya.easy-myshop.jp/item-image/YH-Z013-3-01.jpg', desc: '心のこもった供え物。' }
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
    const l = document.getElementById('landing-screen');
    const hN = document.getElementById('nav-home');
    const sN = document.getElementById('nav-shop');
    if (!l || !hN || !sN) return;
    const isL = !l.classList.contains('layer-hidden');
    const active = "nav-link font-medium tracking-wide text-primary border-b-2 border-primary pb-1";
    const inactive = "nav-link font-medium tracking-wide opacity-60 hover:opacity-100 transition-opacity";
    hN.className = isL ? active : inactive;
    sN.className = isL ? inactive : active;
}

function showStep(step) {
  const prevStep = currentStep;
  currentStep = step;
  document.getElementById('landing-screen').classList.add('layer-hidden');
  document.getElementById('order-screen').classList.remove('layer-hidden');

  [1, 2, 3, 4].forEach(num => {
    const el = document.getElementById(`step-${num}-area`);
    if (!el) return;
    if (num === step) {
      el.classList.remove('layer-hidden');
      el.animate([{ opacity: 0, transform: `translateX(${step > prevStep ? 30 : -30}px)` }, { opacity: 1, transform: 'translateX(0)' }], { duration: 450, easing: 'ease-out' });
    } else el.classList.add('layer-hidden');
  });

  if (step === 2) renderProducts();
  if (step === 3) renderColors();
  updateStepper();
  updateNavUI();
  window.scrollTo({ top: 0, behavior: 'instant' });
}
window.showStep = showStep;

function updateStepper() {
  for (let i = 1; i <= 4; i++) {
    const c = document.getElementById(`step-c-${i}`);
    const n = document.querySelector(`.step-node[data-step="${i}"]`);
    if (!c || !n) continue;
    const label = n.querySelector('span');

    n.onclick = () => { if (i < currentStep || (i === 2 && currentPurpose) || (i === 3 && currentProduct)) showStep(i); };

    if (i < currentStep) {
      c.innerHTML = '<span class="material-symbols-outlined text-[16px]">check</span>';
      c.className = 'w-10 h-10 rounded-full flex items-center justify-center bg-secondary text-white shadow-sm';
      if(label) label.className = "text-[10px] font-bold text-secondary tracking-tighter opacity-80";
    } else if (i === currentStep) {
      c.innerText = i;
      c.className = 'w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white scale-110 shadow-xl';
      if(label) label.className = "text-[10px] font-bold text-primary tracking-tighter opacity-100";
    } else {
      c.innerText = i;
      c.className = 'w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-high text-on-surface-variant/30 text-sm';
      if(label) label.className = "text-[10px] font-bold opacity-30 tracking-tighter";
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
        p.className = "fixed pointer-events-none z-[2000] rotate-45";
        p.style.width = `${Math.random() * 8 + 12}px`; p.style.height = `${Math.random() * 5 + 8}px`;
        p.style.borderRadius = "100% 15% 100% 15%";
        p.style.left = `${fromR.left + fromR.width / 2}px`; p.style.top = `${fromR.top + fromR.height / 2}px`;
        if (selectedTheme.mode === 'gradient') p.style.background = `linear-gradient(135deg, ${selectedTheme.colors[0]}, ${selectedTheme.colors[1]})`;
        else p.style.backgroundColor = selectedTheme.colors[i % selectedTheme.colors.length];
        p.style.boxShadow = `0 0 10px rgba(255,255,255,0.7), 0 0 2px rgba(0,0,0,0.2)`;
        p.style.border = `1px solid rgba(255,255,255,0.2)`;
        document.body.appendChild(p);
        const delay = i * 60;
        const dx = (toR.left + toR.width/2) - (fromR.left + fromR.width/2);
        const dy = (toR.top + toR.height/2) - (fromR.top + fromR.height / 2);
        const anim = p.animate([
            { transform: 'translate(0, 0) rotate(0deg) scale(0)', opacity: 0 },
            { transform: `translate(${(Math.random()-0.5)*120}px, -80px) rotate(45deg) scale(1.5)`, opacity: 1, offset: 0.1 },
            { transform: `translate(${dx / 2}px, -200px) rotate(180deg) scale(1.8)`, opacity: 1, offset: 0.4 },
            { transform: `translate(${dx - 40}px, ${dy - 20}px) rotate(360deg) scale(1.5)`, opacity: 1, offset: 0.7 },
            { transform: `translate(${dx + 40}px, ${dy - 40}px) rotate(540deg) scale(1.5)`, opacity: 1, offset: 0.85 },
            { transform: `translate(${dx}px, ${dy - 100}px) rotate(630deg) scale(1.2)`, opacity: 1, offset: 0.92 },
            { transform: `translate(${dx}px, ${dy}px) rotate(720deg) scale(0.1)`, opacity: 0, offset: 1 }
        ], { duration: 2200, delay: delay, easing: 'cubic-bezier(0.25, 1, 0.5, 1)' });
        anim.onfinish = () => { p.remove(); if (i === count - 1) { toIcon.classList.add('animate-bounce'); setTimeout(() => toIcon.classList.remove('animate-bounce'), 800); updateCartUI(); } };
    }
}

function renderProducts() {
    const list = document.getElementById('product-list');
    if(!list) return;
    list.innerHTML = '';
    const filtered = PRODUCTS.filter(c => c.purposes.includes(currentPurpose));
    filtered.forEach(cat => {
        const div = document.createElement('div');
        div.className = "mb-16";
        div.innerHTML = `<h4 class="text-2xl font-headline font-bold text-primary mb-8 border-b-2 border-primary/10 pb-4 text-center md:text-left">${cat.title}</h4><div class="grid grid-cols-1 md:grid-cols-3 gap-10" id="cat-${cat.id}"></div>`;
        list.appendChild(div);
        cat.items.forEach(item => {
            const card = document.createElement('div');
            card.className = "bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all cursor-pointer group border border-primary/5";
            card.innerHTML = `<div class="aspect-[4/5] overflow-hidden"><img src="${item.img}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onerror="this.src='https://placehold.jp/101254/ffffff/400x500.png?text=Florist%20Yamashiroya'"/></div><div class="p-8"><h5 class="text-2xl font-bold mb-2">${item.name}</h5><p class="text-xl font-bold font-label text-primary">¥${item.price.toLocaleString()}</p></div>`;
            card.onclick = (e) => { e.stopPropagation(); currentProduct = item; showStep(3); };
            const container = document.getElementById(`cat-${cat.id}`);
            if(container) container.appendChild(card);
        });
    });
}

function renderColors() {
    const grid = document.getElementById('color-grid');
    const summ = document.getElementById('selection-summary');
    if(!grid) return;
    if(summ && currentProduct) summ.innerText = `「${currentProduct.name}」を選択しています。`;
    grid.innerHTML = '';
    COLORS.forEach(color => {
        const card = document.createElement('div');
        const isS = currentColor?.id === color.id;
        card.className = `p-6 bg-white rounded-[2rem] shadow-sm border-2 cursor-pointer transition-all ${isS ? 'border-primary ring-8 ring-primary/5' : 'border-transparent'}`;
        card.innerHTML = `<div class="aspect-square rounded-2xl overflow-hidden mb-6 shadow-inner"><img src="${color.img}" class="w-full h-full object-cover"/></div><p class="text-center font-bold text-lg">${color.name}</p>`;
        card.onclick = () => { currentColor = color; renderColors(); const ac = document.getElementById('add-to-cart-container'); if(ac) ac.classList.remove('opacity-0'); };
        grid.appendChild(card);
    });
}

function updateCartUI() {
    const list = document.getElementById('cart-items-list');
    const badge = document.getElementById('cart-badge-count');
    const disp = document.getElementById('cart-total-display');
    const headerTot = document.getElementById('header-cart-total');
    const headerTotCont = document.getElementById('header-cart-total-container');
    if(!list) return;
    list.innerHTML = '';
    let t = 0;
    cart.forEach((it, idx) => {
        t += it.product.price * it.quantity;
        const div = document.createElement('div');
        div.className = "flex items-center gap-6 bg-white p-6 rounded-3xl border border-primary/5 shadow-sm";
        div.innerHTML = `<div class="flex gap-1 w-20 flex-shrink-0"><img src="${it.product.img}" class="w-10 h-10 rounded-lg object-cover"/><img src="${it.color.img}" class="w-10 h-10 rounded-lg object-cover border"/></div><div class="flex-grow"><h5 class="text-lg font-bold leading-tight">${it.product.name}</h5><p class="text-xs opacity-60">${it.color.name}</p></div><div class="flex items-center gap-4"><div class="flex items-center bg-surface-container rounded-full p-1 border"><button class="w-8 h-8 flex items-center justify-center font-bold" onclick="changeQty(${idx}, -1)">-</button><span class="w-6 text-center font-bold">${it.quantity}</span><button class="w-8 h-8 flex items-center justify-center font-bold" onclick="changeQty(${idx}, 1)">+</button></div><p class="font-bold w-20 text-right text-sm">¥${(it.product.price*it.quantity).toLocaleString()}</p></div>`;
        list.appendChild(div);
    });
    if(badge){ badge.innerText = cart.length; badge.classList.toggle('hidden', cart.length === 0); }
    if(disp) disp.innerText = `¥${t.toLocaleString()}`;
    if(headerTot) headerTot.innerText = `¥${t.toLocaleString()}`;
    if(headerTotCont) headerTotCont.classList.toggle('hidden', cart.length === 0);
}

window.changeQty = (idx, d) => { cart[idx].quantity += d; if(cart[idx].quantity <= 0) cart.splice(idx, 1); updateCartUI(); };
window.toggleCart = (open) => { const cs = document.getElementById('cart-screen'); if(cs) cs.style.transform = open ? 'translateX(0)' : 'translateX(100%)'; };

document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-shopping'); if(startBtn) startBtn.onclick = () => showStep(1);
    const cards = document.querySelectorAll('.purpose-card');
    cards.forEach(card => card.onclick = () => { currentPurpose = card.dataset.purpose; showStep(2); });
    const addBtn = document.getElementById('add-to-cart-btn');
    if(addBtn) addBtn.onclick = () => {
        if (!currentProduct || !currentColor) return;
        const e = cart.find(i=>i.product.id===currentProduct.id&&i.color.id===currentColor.id&&i.purpose===currentPurpose);
        if(e) e.quantity++; else cart.push({id:Date.now(),purpose:currentPurpose,product:{...currentProduct},color:{...currentColor},quantity:1});
        spawnPetals(currentColor);
        const acc = document.getElementById('add-to-cart-container'); if(acc) acc.classList.add('opacity-0');
        updateCartUI();
    };
    const cartOpen = document.getElementById('cart-icon-btn'); if(cartOpen) cartOpen.onclick = () => window.toggleCart(true);
    const cartClose = document.getElementById('close-cart'); if(cartClose) cartClose.onclick = () => window.toggleCart(false);
    const checkout = document.getElementById('checkout-btn'); if(checkout) checkout.onclick = () => { window.toggleCart(false); showStep(4); };
    const navHome = document.getElementById('nav-home'); const logoLink = document.getElementById('logo-link');
    const goHome = (e) => { e.preventDefault(); document.getElementById('order-screen').classList.add('layer-hidden'); document.getElementById('landing-screen').classList.remove('layer-hidden'); updateNavUI(); };
    if(navHome) navHome.onclick = goHome; if(logoLink) logoLink.onclick = goHome;
    const navShop = document.getElementById('nav-shop'); if(navShop) navShop.onclick = (e) => { e.preventDefault(); showStep(1); };
    updateStepper(); updateCartUI(); updateNavUI();
});
