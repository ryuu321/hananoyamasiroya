const PRODUCTS = [
  { id: 'bouquets', title: '花束 (ブーケ)', purposes: ['celebration', 'offering'], items: [
      { id: 'YH-F001-7-01', name: 'お祝い用花束', price: 7000, img: 'https://yamashiroya.easy-myshop.jp/item-image/YH-F001-7-01.jpg', desc: '門出を祝う華やかなブーケ。' },
      { id: '16B-501', name: '季節の花束', price: 5500, img: 'https://yamashiroya.easy-myshop.jp/item-image/16B-501.jpg', desc: '旬の花材をあしらった花束。' }
  ]},
  { id: 'arrangement', title: 'アレンジメント', purposes: ['celebration', 'offering'], items: [
      { id: 'YH-F002-4-01', name: 'お祝い用アレンジ (S)', price: 4000, img: 'https://yamashiroya.easy-myshop.jp/item-image/YH-F002-4-01.jpg', desc: '飾りやすいサイズのギフト。' },
      { id: 'YH-F004-11-01', name: '開店祝アレンジ', price: 11000, img: 'https://yamashiroya.easy-myshop.jp/item-image/YH-F004-11-01.jpg', desc: '店舗の成功を願って。' }
  ]}
];

const COLORS = [
  { id: 'c-white', name: '白・グリーン系', img: '/color_white.png', mode: 'gradient', colors: ['#ffffff', '#2e7d32'] },
  { id: 'c-pink', name: 'ピンク・パステル系', img: '/color_pink.png', mode: 'gradient', colors: ['#d63384', '#f8bbd0'] },
  { id: 'c-purple', name: '紫・ブルー系', img: '/color_purple.png', mode: 'multi', colors: ['#2196F3', '#9C27B0', '#3F51B5', '#1A237E'] }
];

let cart = []; let currentPurpose = 'celebration'; let currentProduct = null; let currentColor = null; let currentStep = 1;

function updateNavUI(activeId) {
    const navs = ['nav-home', 'nav-shop', 'nav-history'];
    navs.forEach(id => { 
        const el = document.getElementById(id); 
        if (el) {
            el.classList.toggle('is-active', id === activeId);
            // Non-active ones stay elegant but semi-transparent
            if(id !== activeId) el.classList.add('opacity-40'); else el.classList.remove('opacity-40');
        }
    });
}

function resetAllScreens() {
    ['landing-screen', 'order-screen', 'history-screen'].forEach(id => {
        const el = document.getElementById(id); if (el) el.classList.add('layer-hidden');
    });
}

function showLanding() {
    resetAllScreens(); document.getElementById('landing-screen').classList.remove('layer-hidden');
    updateNavUI('nav-home'); window.scrollTo({ top: 0, behavior: 'instant' });
}

function showHistory() {
    resetAllScreens(); document.getElementById('history-screen').classList.remove('layer-hidden');
    updateNavUI('nav-history'); window.scrollTo({ top: 0, behavior: 'instant' });
}

function showStep(step) {
  const ps = currentStep; currentStep = step;
  resetAllScreens(); document.getElementById('order-screen').classList.remove('layer-hidden');
  [1, 2, 3, 4].forEach(num => {
    const el = document.getElementById(`step-${num}-area`); if (!el) return;
    if (num === step) { el.classList.remove('layer-hidden'); el.animate([{ opacity: 0, transform: `translateX(${step > ps ? 30 : -30}px)` }, { opacity: 1, transform: 'translateX(0)' }], { duration: 450, easing: 'ease-out' }); } 
    else el.classList.add('layer-hidden');
  });
  if (step === 2) renderProducts(); if (step === 3) renderColors();
  updateStepper(); updateNavUI('nav-shop'); window.scrollTo({ top: 0, behavior: 'instant' });
}
window.showStep = showStep;

function updateStepper() {
  for (let i = 1; i <= 4; i++) {
    const c = document.getElementById(`step-c-${i}`); const n = document.querySelector(`.step-node[data-step="${i}"]`); if (!c || !n) continue;
    n.onclick = () => { if (i < currentStep || (i === 2 && currentPurpose) || (i === 3 && currentProduct)) showStep(i); };
    if (i < currentStep) { c.innerHTML = '<span class="material-symbols-outlined text-sm">check</span>'; c.className = 'w-10 h-10 rounded-full flex items-center justify-center bg-secondary text-white shadow-sm'; } 
    else if (i === currentStep) { c.innerText = i; c.className = 'w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white scale-110 shadow-xl'; } 
    else { c.innerText = i; c.className = 'w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-high text-on-surface-variant/30 text-sm'; }
  }
}

function spawnPetals(selectedTheme) {
    const fromBtn = document.getElementById('add-to-cart-btn'); const toIcon = document.getElementById('cart-icon-btn'); if (!fromBtn || !toIcon || !selectedTheme) return;
    const fromR = fromBtn.getBoundingClientRect(); const toR = toIcon.getBoundingClientRect(); const count = 10;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div'); p.className = "fixed pointer-events-none z-[2000] rotate-45 w-4 h-3 rounded-[100%_15%_100%_15%]";
        p.style.left = `${fromR.left + fromR.width/2}px`; p.style.top = `${fromR.top}px`;
        if (selectedTheme.mode === 'gradient') p.style.background = `linear-gradient(135deg, ${selectedTheme.colors[0]}, ${selectedTheme.colors[1]})`;
        else p.style.backgroundColor = selectedTheme.colors[i % selectedTheme.colors.length];
        document.body.appendChild(p);
        const dx = (toR.left + toR.width/2) - (fromR.left + fromR.width/2); const dy = (toR.top + toR.height/2) - fromR.top;
        const anim = p.animate([
            { transform: 'translate(0, 0) rotate(0deg) scale(0)', opacity: 0 }, { transform: `translate(${(Math.random()-0.5)*100}px, -60px) scale(1.5)`, opacity: 1, offset: 0.1 }, { transform: `translate(${dx/2}px, -150px) rotate(180deg) scale(1.8)`, opacity: 1, offset: 0.5 }, { transform: `translate(${dx}px, ${dy}px) rotate(720deg) scale(0)`, opacity: 0 }
        ], { duration: 2000, delay: i*60, easing: 'cubic-bezier(0.25, 1, 0.5, 1)' });
        anim.onfinish = () => { p.remove(); if (i === count - 1) { toIcon.classList.add('animate-bounce'); setTimeout(() => toIcon.classList.remove('animate-bounce'), 800); updateCartUI(); } };
    }
}

function renderProducts() {
    const list = document.getElementById('product-list'); if(!list) return; list.innerHTML = '';
    PRODUCTS.forEach(cat => {
        const div = document.createElement('div'); div.className = "mb-16"; div.innerHTML = `<h4 class="text-2xl font-bold text-primary mb-8 border-b-2 border-primary/10 pb-4">${cat.title}</h4><div class="grid grid-cols-1 md:grid-cols-3 gap-10" id="cat-${cat.id}"></div>`;
        list.appendChild(div);
        cat.items.forEach(item => {
            const card = document.createElement('div'); card.className = "bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all cursor-pointer group border border-primary/5";
            card.innerHTML = `<div class="aspect-[4/5] overflow-hidden"><img src="${item.img}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/></div><div class="p-8"><h5 class="text-2xl font-bold mb-2">${item.name}</h5><p class="text-xl font-bold font-label text-primary">¥${item.price.toLocaleString()}</p></div>`;
            card.onclick = (e) => { e.stopPropagation(); currentProduct = item; showStep(3); };
            const container = document.getElementById(`cat-${cat.id}`); if(container) container.appendChild(card);
        });
    });
}
function renderColors() {
    const grid = document.getElementById('color-grid'); const summ = document.getElementById('selection-summary'); if(!grid) return;
    if(summ && currentProduct) summ.innerText = `「${currentProduct.name}」を選択中。`;
    grid.innerHTML = '';
    COLORS.forEach(color => {
        const card = document.createElement('div'); const isS = currentColor?.id === color.id;
        card.className = `p-6 bg-white rounded-[2rem] shadow-sm border-2 cursor-pointer transition-all ${isS ? 'border-primary ring-8 ring-primary/5' : 'border-transparent'}`;
        card.innerHTML = `<div class="aspect-square rounded-2xl overflow-hidden mb-6"><img src="${color.img}" class="w-full h-full object-cover"/></div><p class="text-center font-bold">${color.name}</p>`;
        card.onclick = () => { currentColor = color; renderColors(); document.getElementById('add-to-cart-container').classList.remove('opacity-0'); };
        grid.appendChild(card);
    });
}

function updateCartUI() {
    const list = document.getElementById('cart-items-list'); const badge = document.getElementById('cart-badge-count'); const disp = document.getElementById('cart-total-display'); const headerTot = document.getElementById('header-cart-total'); const headerTotCont = document.getElementById('header-cart-total-container');
    if(!list) return; list.innerHTML = ''; let t = 0;
    cart.forEach((it, idx) => {
        t += it.product.price * it.quantity; const div = document.createElement('div'); div.className = "flex items-center gap-6 bg-white p-6 rounded-3xl border border-primary/5";
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
    const map = { 'nav-home': showLanding, 'logo-link': showLanding, 'footer-logo-link': showLanding, 'nav-shop': () => showStep(1), 'start-shopping': () => showStep(1), 'footer-shop-link': () => showStep(1), 'nav-history': showHistory, 'footer-history-link': showHistory };
    Object.keys(map).forEach(id => { const el = document.getElementById(id); if (el) el.onclick = (e) => { e.preventDefault(); map[id](); }; });
    document.querySelectorAll('.purpose-card').forEach(card => card.onclick = () => { currentPurpose = card.dataset.purpose; showStep(2); });
    const addBtn = document.getElementById('add-to-cart-btn'); if(addBtn) addBtn.onclick = () => {
        if (!currentProduct || !currentColor) return;
        const e = cart.find(i=>i.product.id===currentProduct.id&&i.color.id===currentColor.id);
        if(e) e.quantity++; else cart.push({id:Date.now(),product:{...currentProduct},color:{...currentColor},quantity:1});
        spawnPetals(currentColor); document.getElementById('add-to-cart-container').classList.add('opacity-0'); updateCartUI();
    };
    const cartOpen = document.getElementById('cart-icon-btn'); if(cartOpen) cartOpen.onclick = () => window.toggleCart(true);
    const cartClose = document.getElementById('close-cart'); if(cartClose) cartClose.onclick = () => window.toggleCart(false);
    const checkout = document.getElementById('checkout-btn'); if(checkout) checkout.onclick = () => { window.toggleCart(false); showStep(4); };
    const overlay = document.getElementById('intro-overlay');
    if (overlay) { overlay.classList.remove('hidden'); setTimeout(() => { document.getElementById('intro-image-container').style.opacity = '1'; document.getElementById('intro-text').style.opacity = '1'; }, 100); setTimeout(() => { overlay.style.opacity = '0'; setTimeout(() => { overlay.classList.add('hidden'); document.body.classList.remove('is-loading'); }, 1000); }, 3500); }
    updateStepper(); updateCartUI(); updateNavUI('nav-home');
});
