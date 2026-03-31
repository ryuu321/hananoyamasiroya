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
  { id: 'c-white', name: '白・グリーン系', img: '/color_white.png' },
  { id: 'c-pink', name: 'ピンク・パステル系', img: '/color_pink.png' },
  { id: 'c-red', name: '暖色・オレンジ系', img: '/color_red.png' },
  { id: 'c-purple', name: '紫・ブルー系', img: '/color_purple.png' }
];

let cart = [];
let currentPurpose = 'celebration';
let currentProduct = null;
let currentColor = null;
let currentStep = 1;

// --- DYNAMIC NAVIGATION ---
function updateStepper() {
    for (let i = 1; i <= 4; i++) {
        const circle = document.getElementById(`step-c-${i}`);
        const node = document.querySelector(`.step-node[data-step="${i}"]`);
        if (!circle) continue;
        
        node.style.cursor = 'pointer';
        node.onclick = () => { if (i !== currentStep) showStep(i); };

        if (i < currentStep) {
            circle.innerHTML = '<span class="material-symbols-outlined text-[16px]">check</span>';
            circle.className = 'w-10 h-10 rounded-full flex items-center justify-center bg-secondary text-white shadow-sm';
            node.querySelector('span').className = 'text-[10px] uppercase font-bold text-secondary';
        } else if (i === currentStep) {
            circle.innerText = i;
            circle.className = 'w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white scale-125 shadow-xl ring-8 ring-primary/5';
            node.querySelector('span').className = 'text-[10px] uppercase font-bold text-primary';
        } else {
            circle.innerText = i;
            circle.className = 'w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-high text-on-surface-variant/30';
            node.querySelector('span').className = 'text-[10px] uppercase font-bold text-on-surface-variant/30';
        }
    }
}

function showStep(step) {
    currentStep = step;
    document.getElementById('landing-screen').classList.add('layer-hidden');
    document.getElementById('order-screen').classList.remove('layer-hidden');
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`step-${i}-area`).classList.add('layer-hidden');
    }
    const targetArea = document.getElementById(`step-${step}-area`);
    targetArea.classList.remove('layer-hidden');
    
    updateStepper();
    if (step === 2) renderProducts();
    if (step === 3) renderColors();
    window.scrollTo({ top: 100, behavior: 'smooth' });
}

// --- FAIRY ANIMATION ---
function spawnFairy(fromElement, toElement) {
    const fromRect = fromElement.getBoundingClientRect();
    const toRect = toElement.getBoundingClientRect();

    const fairy = document.createElement('div');
    fairy.className = "fixed pointer-events-none z-[200] flex items-center justify-center text-primary";
    fairy.style.left = `${fromRect.left + fromRect.width / 2}px`;
    fairy.style.top = `${fromRect.top + fromRect.height / 2}px`;
    fairy.innerHTML = `<span class="material-symbols-outlined animate-spin text-3xl" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>`;
    document.body.appendChild(fairy);

    const animation = fairy.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${(toRect.left + toRect.width / 2) - (fromRect.left + fromRect.width / 2)}px, ${(toRect.top + toRect.height / 2) - (fromRect.top + fromRect.height / 2)}px) scale(0.5)`, opacity: 0.8 }
    ], {
        duration: 1200,
        easing: 'cubic-bezier(0.45, 0.05, 0.55, 0.95)'
    });

    animation.onfinish = () => {
        fairy.remove();
        // Feedback on cart icon
        toElement.classList.add('scale-125', 'rotate-12');
        setTimeout(() => toElement.classList.remove('scale-125', 'rotate-12'), 200);
        updateCartUI(); // Update count and badge
    };
}

// --- LOGIC ---
function selectPurpose(purpose) {
    currentPurpose = purpose;
    showStep(2);
}

function selectProduct(product) {
    currentProduct = product;
    document.getElementById('selection-summary').innerText = `商品: ${product.name} (${currentPurpose === 'offering' ? 'お供え' : 'お祝い'})`;
    showStep(3);
}

function selectColor(color) {
    currentColor = color;
    renderColors();
    document.getElementById('add-to-cart-container').classList.remove('opacity-0');
}

function renderProducts() {
    const list = document.getElementById('product-list');
    list.innerHTML = '';
    const filtered = PRODUCTS.filter(cat => cat.purposes.includes(currentPurpose));
    
    filtered.forEach(cat => {
        const div = document.createElement('div');
        div.innerHTML = `<h3 class="text-3xl font-headline font-bold text-primary mb-8 border-b-2 border-primary/5 pb-4">${cat.title}</h3>
                         <div class="flex gap-10 overflow-x-auto no-scrollbar pb-8" id="cat-${cat.id}"></div>`;
        list.appendChild(div);
        const catList = document.getElementById(`cat-${cat.id}`);
        cat.items.forEach(item => {
            const isSel = currentProduct?.id === item.id;
            const card = document.createElement('div');
            card.className = `min-w-[340px] bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all cursor-pointer border-2 ${isSel ? 'border-primary ring-4 ring-primary/5' : 'border-transparent'}`;
            card.innerHTML = `
                <div class="aspect-[4/5] overflow-hidden"><img src="${item.img}" class="w-full h-full object-cover"/></div>
                <div class="p-8"><h4 class="text-2xl font-bold mb-3">${item.name}</h4><p class="text-3xl font-bold text-primary">¥${item.price.toLocaleString()}</p></div>
            `;
            card.onclick = () => selectProduct(item);
            catList.appendChild(card);
        });
    });
}

function renderColors() {
    const grid = document.getElementById('color-grid');
    grid.innerHTML = '';
    COLORS.forEach(color => {
        const isSelected = currentColor?.id === color.id;
        const div = document.createElement('div');
        div.className = `p-6 bg-white rounded-3xl shadow-sm border-2 cursor-pointer ${isSelected ? 'border-primary ring-8 ring-primary/5' : 'border-transparent'}`;
        div.innerHTML = `<div class="aspect-square rounded-2xl overflow-hidden mb-4"><img src="${color.img}" class="w-full h-full object-cover"/></div><p class="text-center font-bold text-sm">${color.name}</p>`;
        div.onclick = () => selectColor(color);
        grid.appendChild(div);
    });
}

function addToCart() {
    if (!currentProduct || !currentColor) return;
    
    const existing = cart.find(i => i.product.id === currentProduct.id && i.color.id === currentColor.id && i.purpose === currentPurpose);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: Date.now(),
            purpose: currentPurpose,
            product: { ...currentProduct },
            color: { ...currentColor },
            quantity: 1
        });
    }

    // Trigger Fairy
    const btn = document.getElementById('add-to-cart-btn');
    const target = document.getElementById('cart-icon-btn');
    spawnFairy(btn, target);

    // Reset current selection for next potential add
    currentColor = null;
    renderColors();
    document.getElementById('add-to-cart-container').classList.add('opacity-0');
}

function updateCartUI() {
    const list = document.getElementById('cart-items-list');
    const badge = document.getElementById('cart-badge-count');
    const totalDisplay = document.getElementById('cart-total-display');
    list.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.product.price * item.quantity;
        const div = document.createElement('div');
        div.className = "flex items-center gap-8 bg-white p-6 rounded-3xl shadow-sm border border-primary/10";
        div.innerHTML = `
            <div class="flex gap-2 w-28 flex-shrink-0">
                <img src="${item.product.img}" class="w-14 h-14 rounded-xl object-cover shadow-sm"/>
                <img src="${item.color.img}" class="w-14 h-14 rounded-xl object-cover shadow-sm border"/>
            </div>
            <div class="flex-grow">
                <p class="text-[10px] font-bold text-primary/40 uppercase tracking-[0.2em]">${item.purpose === 'offering' ? 'お供え' : 'お祝い'}</p>
                <h4 class="text-xl font-bold">${item.product.name}</h4>
                <p class="text-sm opacity-60">${item.color.name}</p>
            </div>
            <div class="flex items-center gap-6">
                <div class="flex items-center bg-surface-container rounded-full p-2 border border-primary/5">
                    <button class="w-8 h-8 rounded-full hover:bg-white flex items-center justify-center font-bold" onclick="changeQty(${index}, -1)">-</button>
                    <span class="w-10 text-center font-black">${item.quantity}</span>
                    <button class="w-8 h-8 rounded-full hover:bg-white flex items-center justify-center font-bold" onclick="changeQty(${index}, 1)">+</button>
                </div>
                <p class="text-xl font-black w-32 text-right text-primary">¥${(item.product.price * item.quantity).toLocaleString()}</p>
            </div>
        `;
        list.appendChild(div);
    });

    badge.innerText = cart.length;
    badge.classList.toggle('hidden', cart.length === 0);
    totalDisplay.innerText = `¥${total.toLocaleString()}`;
}

window.changeQty = (index, delta) => {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    updateCartUI();
};

function toggleCart(open) {
    document.getElementById('cart-screen').style.transform = open ? 'translateX(0)' : 'translateX(100%)';
}

// --- HANDLERS ---
document.getElementById('start-shopping').onclick = () => showStep(1);
document.getElementById('nav-shop').onclick = (e) => { e.preventDefault(); showStep(1); };
document.getElementById('nav-home').onclick = (e) => {
    e.preventDefault();
    document.getElementById('order-screen').classList.add('layer-hidden');
    document.getElementById('landing-screen').classList.remove('layer-hidden');
};
document.getElementById('logo-link').onclick = (e) => {
    e.preventDefault();
    location.reload();
};
document.querySelectorAll('.purpose-card').forEach(card => card.onclick = () => selectPurpose(card.dataset.purpose));
document.getElementById('add-to-cart-btn').onclick = addToCart;
document.getElementById('cart-icon-btn').onclick = () => toggleCart(true);
document.getElementById('close-cart').onclick = () => toggleCart(false);
document.getElementById('checkout-btn').onclick = () => { toggleCart(false); showStep(4); };

// --- INIT ---
function playIntro(callback) {
  const overlay = document.getElementById('intro-overlay');
  sessionStorage.setItem('yamashiroya_intro_played', 'true');
  overlay.classList.remove('hidden');
  overlay.style.opacity = '1';
  document.getElementById('intro-image-container').style.opacity = '1';
  document.getElementById('intro-image-container').style.transform = 'scale(1.1)';
  document.getElementById('intro-text').style.opacity = '1';
  document.getElementById('intro-text').style.transform = 'translateY(0)';
  setTimeout(() => { overlay.style.opacity = '0'; setTimeout(() => overlay.classList.add('hidden'), 1000); }, 4500);
}

const introPlayed = sessionStorage.getItem('yamashiroya_intro_played');
if (!introPlayed) playIntro();
updateStepper();
updateCartUI();
