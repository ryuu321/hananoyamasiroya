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

// --- STEP CONTROL ---
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
        } else if (i === currentStep) {
            circle.innerText = i;
            circle.className = 'w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white scale-125 shadow-xl ring-8 ring-primary/5';
        } else {
            circle.innerText = i;
            circle.className = 'w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-high text-on-surface-variant/30';
        }
    }
}

function showStep(step) {
    currentStep = step;
    document.getElementById('landing-screen').classList.add('layer-hidden');
    document.getElementById('order-screen').classList.remove('layer-hidden');
    document.querySelectorAll('.step-view').forEach(view => view.classList.add('layer-hidden'));
    const target = document.getElementById(`step-${step}-area`);
    if (target) target.classList.remove('layer-hidden');
    
    updateStepper();
    if (step === 2) renderProducts();
    if (step === 3) renderColors();
    window.scrollTo({ top: 100, behavior: 'smooth' });
}

// --- FAIRY SUPREME ANIMATION ---
function spawnFairy() {
    const fromBtn = document.getElementById('add-to-cart-btn');
    const toIcon = document.getElementById('cart-icon-btn');
    if (!fromBtn || !toIcon) return;

    const fromRect = fromBtn.getBoundingClientRect();
    const toRect = toIcon.getBoundingClientRect();

    const fairy = document.createElement('div');
    fairy.className = "fixed pointer-events-none z-[1000] text-[#ffb596]";
    fairy.style.left = `${fromRect.left + fromRect.width / 2}px`;
    fairy.style.top = `${fromRect.top}px`;
    fairy.innerHTML = `<span class="material-symbols-outlined text-4xl drop-shadow-[0_0_15px_rgba(255,181,150,0.8)]" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>`;
    document.body.appendChild(fairy);

    // Dynamic flight trajectory with quadratic ease
    const player = fairy.animate([
        { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1 },
        { transform: 'translate(-50px, -100px) scale(1.5) rotate(180deg)', opacity: 1, offset: 0.3 },
        { transform: `translate(${(toRect.left + toRect.width/2) - (fromRect.left + fromRect.width/2)}px, ${(toRect.top + toRect.height/2) - fromRect.top}px) scale(0.2) rotate(720deg)`, opacity: 0 }
    ], {
        duration: 1500,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
    });

    player.onfinish = () => {
        fairy.remove();
        toIcon.classList.add('animate-bounce');
        setTimeout(() => toIcon.classList.remove('animate-bounce'), 800);
        updateCartUI(); // Update display
    };
}

// --- LOGIC ---
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
            card.className = `min-w-[340px] bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border-2 ${isSel ? 'border-primary' : 'border-transparent'}`;
            card.innerHTML = `<div class="aspect-[4/5] overflow-hidden"><img src="${item.img}" class="w-full h-full object-cover"/></div>
                              <div class="p-8"><h4 class="text-2xl font-bold mb-3">${item.name}</h4><p class="text-3xl font-bold text-primary">¥${item.price.toLocaleString()}</p></div>`;
            card.onclick = () => { currentProduct = item; showStep(3); };
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
        div.onclick = () => { currentColor = color; renderColors(); document.getElementById('add-to-cart-container').classList.remove('opacity-0'); };
        grid.appendChild(div);
    });
}

function addToCart() {
    cart.push({ id: Date.now(), purpose: currentPurpose, product: { ...currentProduct }, color: { ...currentColor }, quantity: 1 });
    spawnFairy(); // Start the flying animation
    currentColor = null;
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
                <p class="text-[10px] uppercase font-bold text-primary/40 tracking-widest">${item.purpose === 'offering' ? 'お供え' : 'お祝い'}</p>
                <h4 class="text-xl font-bold">${item.product.name}</h4>
                <p class="text-sm opacity-60">${item.color.name}</p>
            </div>
            <div class="flex items-center gap-6">
                <div class="flex items-center bg-surface-container rounded-full p-2 border border-primary/5">
                    <button class="w-8 h-8 rounded-full font-bold" onclick="changeQty(${index}, -1)">-</button>
                    <span class="w-10 text-center font-bold">${item.quantity}</span>
                    <button class="w-8 h-8 rounded-full font-bold" onclick="changeQty(${index}, 1)">+</button>
                </div>
                <p class="text-xl font-bold w-32 text-right">¥${(item.product.price * item.quantity).toLocaleString()}</p>
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
document.getElementById('nav-home').onclick = (e) => { e.preventDefault(); location.reload(); };
document.querySelectorAll('.purpose-card').forEach(card => card.onclick = () => { currentPurpose = card.dataset.purpose; showStep(2); });
document.getElementById('add-to-cart-btn').onclick = addToCart;
document.getElementById('cart-icon-btn').onclick = () => toggleCart(true);
document.getElementById('close-cart').onclick = () => toggleCart(false);
document.getElementById('checkout-btn').onclick = () => { toggleCart(false); showStep(4); };

updateStepper();
updateCartUI();
