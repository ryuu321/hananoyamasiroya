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
  { id: 'c-white', name: '白・グリーン系', img: '/color_white.png', desc: '静謐で清らかな祈りの色' },
  { id: 'c-pink', name: 'ピンク・パステル系', img: '/color_pink.png', desc: '穏やかで優しい慈しみの色' },
  { id: 'c-red', name: '暖色・オレンジ系', img: '/color_red.png', desc: '温かく活気に満ちた感謝の色' },
  { id: 'c-purple', name: '紫・ブルー系', img: '/color_purple.png', desc: '凛として気高い尊敬の色' }
];

let cart = [];
let currentPurpose = 'celebration';
let currentProduct = null;
let currentColor = null;
let currentStep = 1;

// --- STEP CONTROL (LAYERED NAVIGATION) ---
function updateStepper() {
    for (let i = 1; i <= 4; i++) {
        const circle = document.getElementById(`step-c-${i}`);
        const node = document.querySelector(`.step-node[data-step="${i}"]`);
        if (!circle) continue;
        
        node.style.cursor = 'pointer';
        node.onclick = () => { if (i < currentStep || (i === 2 && currentPurpose) || (i === 3 && currentProduct)) showStep(i); };

        if (i < currentStep) {
            circle.innerHTML = '<span class="material-symbols-outlined text-[16px]">check</span>';
            circle.className = 'w-10 h-10 rounded-full flex items-center justify-center bg-secondary text-white shadow-sm';
        } else if (i === currentStep) {
            circle.innerText = i;
            circle.className = 'w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white scale-110 shadow-xl ring-4 ring-primary/10';
        } else {
            circle.innerText = i;
            circle.className = 'w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-high text-on-surface-variant/30';
        }
    }
}

function showStep(step) {
    currentStep = step;
    
    // Switch Screen
    document.getElementById('landing-screen').classList.add('layer-hidden');
    document.getElementById('order-screen').classList.remove('layer-hidden');
    
    // Fully divide pages by hiding all sections
    document.querySelectorAll('.step-view').forEach(view => {
        view.classList.add('layer-hidden');
    });

    const targetArea = document.getElementById(`step-${step}-area`);
    if (targetArea) {
        targetArea.classList.remove('layer-hidden');
    }
    
    updateStepper();
    if (step === 2) renderProducts();
    if (step === 3) renderColors();
    window.scrollTo({ top: 0, behavior: 'instant' });
}

// --- FAIRY ANIMATION ---
function spawnFairy() {
    const fromBtn = document.getElementById('add-to-cart-btn');
    const toIcon = document.getElementById('cart-icon-btn');
    if (!fromBtn || !toIcon) return;
    const fromR = fromBtn.getBoundingClientRect();
    const toR = toIcon.getBoundingClientRect();
    const f = document.createElement('div');
    f.className = "fixed pointer-events-none z-[1000] text-[#ffb596]";
    f.style.left = `${fromR.left + fromR.width/2}px`; f.style.top = `${fromR.top}px`;
    f.innerHTML = `<span class="material-symbols-outlined text-4xl drop-shadow-[0_0_20px_#ffb596]" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>`;
    document.body.appendChild(f);
    const anim = f.animate([
        { transform: 'translate(0, 0) scale(1) rotate(0)', opacity: 1 },
        { transform: `translate(${(toR.left + toR.width/2) - (fromR.left + fromR.width/2)}px, ${(toR.top + toR.height/2) - fromR.top}px) scale(0.1) rotate(1080deg)`, opacity: 0 }
    ], { duration: 1400, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' });
    anim.onfinish = () => { f.remove(); toIcon.classList.add('animate-bounce'); setTimeout(() => toIcon.classList.remove('animate-bounce'), 800); updateCartUI(); };
}

// --- RENDERING ---
function renderProducts() {
    const list = document.getElementById('product-list');
    list.innerHTML = '';
    PRODUCTS.filter(c => c.purposes.includes(currentPurpose)).forEach(cat => {
        const div = document.createElement('div');
        div.className = "mb-16";
        div.innerHTML = `<h3 class="text-3xl font-headline font-bold text-primary mb-10 border-b border-primary/5 pb-4">${cat.title}</h3>
                         <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="cat-${cat.id}"></div>`;
        list.appendChild(div);
        cat.items.forEach(item => {
            const card = document.createElement('div');
            card.className = "bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group";
            card.innerHTML = `<div class="aspect-[4/5] overflow-hidden"><img src="${item.img}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/></div>
                              <div class="p-8"><h4 class="text-2xl font-bold mb-2">${item.name}</h4><p class="text-2xl font-bold font-label text-primary">¥${item.price.toLocaleString()}</p></div>`;
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
        div.className = `p-6 bg-white rounded-3xl shadow-sm border-2 cursor-pointer transition-all ${isSel ? 'border-primary ring-8 ring-primary/5' : 'border-transparent'}`;
        div.innerHTML = `<div class="aspect-square rounded-2xl overflow-hidden mb-6"><img src="${color.img}" class="w-full h-full object-cover"/></div>
                         <h4 class="text-center font-bold text-lg mb-2">${color.name}</h4><p class="text-[10px] opacity-40 text-center uppercase tracking-widest">${color.desc}</p>`;
        div.onclick = () => { currentColor = color; renderColors(); document.getElementById('add-to-cart-container').classList.remove('opacity-0'); };
        grid.appendChild(div);
    });
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
        div.className = "flex items-center gap-6 bg-white p-6 rounded-3xl border border-primary/5";
        div.innerHTML = `
            <div class="flex gap-2 w-24 flex-shrink-0"><img src="${item.product.img}" class="w-10 h-10 rounded-lg object-cover shadow-sm"/><img src="${item.color.img}" class="w-10 h-10 rounded-lg object-cover shadow-sm border"/></div>
            <div class="flex-grow">
                <p class="text-[8px] font-bold text-primary/40 uppercase tracking-[0.2em]">${item.purpose==='offering'?'お供え':'お祝い'}</p>
                <h4 class="text-lg font-bold leading-tight">${item.product.name}</h4>
                <p class="text-xs opacity-60">${item.color.name}</p>
            </div>
            <div class="flex items-center gap-4">
                <div class="flex items-center bg-surface-container rounded-full p-1 border">
                    <button class="w-8 h-8 rounded-full hover:bg-white text-sm" onclick="changeQty(${index}, -1)">-</button>
                    <span class="w-8 text-center font-bold">${item.quantity}</span>
                    <button class="w-8 h-8 rounded-full hover:bg-white text-sm" onclick="changeQty(${index}, 1)">+</button>
                </div>
                <p class="text-lg font-bold w-24 text-right">¥${(item.product.price * item.quantity).toLocaleString()}</p>
            </div>`;
        list.appendChild(div);
    });
    badge.innerText = cart.length; badge.classList.toggle('hidden', cart.length === 0);
    totalDisp.innerText = `¥${total.toLocaleString()}`;
}

window.changeQty = (index, delta) => {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    updateCartUI();
};

function addToCart() {
    if (!currentProduct || !currentColor) return;
    const exists = cart.find(i => i.product.id === currentProduct.id && i.color.id === currentColor.id && i.purpose === currentPurpose);
    if (exists) exists.quantity++; else cart.push({id:Date.now(),purpose:currentPurpose,product:{...currentProduct},color:{...currentColor},quantity:1});
    spawnFairy();
}

function toggleCart(open) { document.getElementById('cart-screen').style.transform = open ? 'translateX(0)' : 'translateX(100%)'; }

// --- INIT & HANDLERS ---
document.getElementById('start-shopping').onclick = () => showStep(1);
document.getElementById('nav-shop').onclick = (e) => { e.preventDefault(); showStep(1); };
document.getElementById('nav-home').onclick = (e) => { e.preventDefault(); location.reload(); };
document.querySelectorAll('.purpose-card').forEach(card => card.onclick = () => { currentPurpose = card.dataset.purpose; showStep(2); });
document.getElementById('add-to-cart-btn').onclick = addToCart;
document.getElementById('cart-icon-btn').onclick = () => toggleCart(true);
document.getElementById('close-cart').onclick = () => toggleCart(false);
document.getElementById('checkout-btn').onclick = () => { toggleCart(false); showStep(4); };

updateStepper(); updateCartUI();
