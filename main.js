const PRODUCTS = [
  {
    id: 'bouquets',
    title: '花束 (Bouquets)',
    items: [
      { id: '101', name: '白百合のメモリアル', price: 8800, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6UBR-PvP6XGHqMmJwNOu4mseTA_n6occ46d0RcbCDDBhtvLtrEL4jQluReXDBwW2MRb1BsYGaTIGE4ftLVU7XNrYMQhshhuHjXO44hyo9IeISVefpGFwq_Edz4pZLPHW4Lx5yzoxEnEJW5Fj0kehlLDQ63q75AAzkl3V8wxS1fGZ5JfA3O7yWGGpv9pnNgCmjOVAWQl13yxaKxJPoMImsJEkLYn5xgsetNJZXvQBD2LHHdQxMNjas4Y_a3rxn-A70uIq1SkqRqg', desc: '気品ある白百合の正統派。' },
      { id: '102', name: '季節の供花（淡色）', price: 5500, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYhHYOD220ToezOAmPQKdfGJEBsgwrcLnIwTLMMOXynyBi7Z0op84jyKpcqi_hFY_tZHxLuwHXUGeLr5Wih58Ocjk0wCjBifImrwPk8mqWx3Jku5gilZ8i3AZPl4yphtgyF0B_soH9gfTKTHspOEw_mBhUu5qeoi14QN8WOoNaRR-TvDlKcBH1BJcHbnun4-VxDU4sOosQMz17eeQy-Jvtmc6atrCkTLR30YLqEIvEdXAPpmNS8JNI95oGWne8xtvv31MiTjqgcg', desc: '穏やかな季節の花々の共鳴。' }
    ]
  },
  {
    id: 'arrangements',
    title: 'アレンジ (Arrangements)',
    items: [
      { id: '201', name: 'やすらぎのアレンジ', price: 7700, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkKJKkw4KgWKifggJkq87KF2ICLVds9kONAz5ve4vxj9pvACAjxEdVQYyj4d5q4IGhKXMm4vMohCdkZCQwKLpnSQsLDdq2akrE2g_6Tbz7MchxtJngJT-rj3DcY3IjtMxgz0WOqJUqK2AjjQbdF0FinszwfB3_kthsGItisAKzRsLZZzFxSEsEcq_jtbf-ZggefKVGiGRn5l_fSIZQTfe8jWyu4jDDd66EFNBx0jHdVrhLEPScomVp8UwQzDqbWM0_rNb2SAkeEQ', desc: '繊細な美しさが宿るアレンジ。' },
      { id: '202', name: '清浄の白アレンジ', price: 11000, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLIzk4UYU9mRyz4SVL3gzGcHIpR6c3APM3sMFyTz9bd1oNew1RK29VodqvTnKqnbSAoTkuzibK2YfsbcTeJVkkWUbsSvOeRoc78LtxdQce8pWUorhBX1gpLmP3IMidML_BDVUe_I6cZAqA94DkTnmD5q-ZZbSYJcWusZnK5UTSGrfaheBYE7HBoPohJrgwmGYWe76gR2ZaGJdM5J6y8hBundTh1x0WuN7OncihCF8WeKFUEKodKWc8Wf5OJzN3MfIkxzQqMLVYUg', desc: '純白の美が奏でる祈り。' }
    ]
  }
];

const COLORS = [
  { id: 'c-white', name: '白・グリーン系（静謐）', img: '/color_white.png' },
  { id: 'c-pink', name: 'ピンク・パステル系（慈しみ）', img: '/color_pink.png' },
  { id: 'c-red', name: '暖色・オレンジ系（感謝）', img: '/color_red.png' },
  { id: 'c-purple', name: '紫・ブルー系（高貴）', img: '/color_purple.png' }
];

let cart = [];
let currentPurpose = 'offering'; // Default to offering for initial view
let currentProduct = null;
let currentColor = null;
let currentStep = 2; // Default to step 2 (Products) when entering shop

// --- STEP NAVIGATION ---
function updateStepper() {
  for (let i = 1; i <= 4; i++) {
    const circle = document.getElementById(`step-c-${i}`);
    if (!circle) continue;
    if (i < currentStep) {
        circle.innerHTML = '<span class="material-symbols-outlined text-[16px]">check</span>';
        circle.className = 'w-10 h-10 rounded-full flex items-center justify-center bg-secondary text-white shadow-inner';
    } else if (i === currentStep) {
        circle.innerText = i;
        circle.className = 'w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white scale-125 shadow-xl ring-8 ring-primary/10';
    } else {
        circle.innerText = i;
        circle.className = 'w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-high text-on-surface-variant/40';
    }
  }
}

function showScreen(screenId) {
    document.getElementById('landing-screen').classList.add('hidden');
    document.getElementById('order-screen').classList.remove('hidden');
    
    // Auto show Step 2 (Products)
    document.getElementById('step-1-area').classList.remove('hidden-content');
    document.getElementById('step-2-area').classList.remove('hidden-content');
    currentStep = 2;
    updateStepper();
    renderProducts();
}

function renderProducts() {
    const container = document.getElementById('product-list');
    container.innerHTML = '';
    
    // Add Purpose Toggle at top of list
    const filterDiv = document.createElement('div');
    filterDiv.className = "flex justify-center gap-4 mb-12";
    filterDiv.innerHTML = `
        <button class="filter-btn px-8 py-3 rounded-full font-bold transition-all ${currentPurpose === 'offering' ? 'bg-primary text-white shadow-lg' : 'bg-surface-container-high'}" data-p="offering">お供え・お悔やみ</button>
        <button class="filter-btn px-8 py-3 rounded-full font-bold transition-all ${currentPurpose === 'celebration' ? 'bg-primary text-white shadow-lg' : 'bg-surface-container-high'}" data-p="celebration">お祝い・ギフト</button>
    `;
    container.appendChild(filterDiv);
    
    filterDiv.querySelectorAll('.filter-btn').forEach(btn => {
        btn.onclick = () => {
            currentPurpose = btn.dataset.p;
            renderProducts();
        };
    });

    PRODUCTS.forEach(cat => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h3 class="text-2xl font-headline font-bold text-primary mb-6 border-b border-primary/5 pb-2">${cat.title}</h3>
            <div class="flex gap-8 overflow-x-auto no-scrollbar pb-6" id="list-${cat.id}"></div>
        `;
        container.appendChild(div);
        const list = document.getElementById(`list-${cat.id}`);
        cat.items.forEach(item => {
            const card = document.createElement('div');
            card.className = `min-w-[320px] bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group border-2 ${currentProduct?.id === item.id ? 'border-primary' : 'border-transparent'}`;
            card.innerHTML = `
                <div class="aspect-[4/5] overflow-hidden bg-primary/5">
                    <img src="${item.img}" class="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"/>
                </div>
                <div class="p-6">
                    <h4 class="text-xl font-bold mb-2">${item.name}</h4>
                    <p class="text-2xl font-bold font-label text-primary">¥${item.price.toLocaleString()}</p>
                </div>
            `;
            card.onclick = () => selectProduct(item);
            list.appendChild(card);
        });
    });
}

function renderColors() {
    const grid = document.getElementById('color-grid');
    grid.innerHTML = '';
    COLORS.forEach(color => {
        const div = document.createElement('div');
        const isSelected = currentColor?.id === color.id;
        div.className = `p-4 bg-white rounded-2xl shadow-sm cursor-pointer border-2 transition-all hover:shadow-md ${isSelected ? 'border-primary ring-4 ring-primary/5' : 'border-transparent'}`;
        div.innerHTML = `
            <div class="aspect-square rounded-xl overflow-hidden mb-4">
                <img src="${color.img}" class="w-full h-full object-cover"/>
            </div>
            <p class="text-center font-bold text-sm">${color.name}</p>
        `;
        div.onclick = () => selectColor(color);
        grid.appendChild(div);
    });
}

// --- LOGIC ---
function selectProduct(item) {
    currentProduct = item;
    renderProducts();
    document.getElementById('step-3-area').classList.remove('hidden-content');
    currentStep = 3;
    updateStepper();
    renderColors();
    document.getElementById('context-selection').innerText = `選んだお花: ${item.name}`;
    const target = document.getElementById('step-3-area');
    window.scrollTo({ top: target.offsetTop - 120, behavior: 'smooth' });
}

function selectColor(color) {
    currentColor = color;
    renderColors();
    const bar = document.getElementById('add-to-cart-bar');
    bar.style.opacity = '1';
    bar.style.transform = 'translateY(0)';
    bar.style.pointerEvents = 'auto';
}

function addToCart() {
    const existing = cart.find(i => i.product.id === currentProduct.id && i.color.id === currentColor.id && i.purpose === currentPurpose);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            purpose: currentPurpose,
            product: { ...currentProduct },
            color: { ...currentColor },
            quantity: 1
        });
    }
    updateCartUI();
    toggleCart(true); 
}

function updateCartUI() {
    const list = document.getElementById('cart-items');
    const badge = document.getElementById('cart-badge-count');
    const totalLabel = document.getElementById('cart-total-price');
    list.innerHTML = '';
    
    let total = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.product.price * item.quantity;
        total += itemTotal;
        const div = document.createElement('div');
        div.className = "flex gap-6 items-center bg-white p-6 rounded-2xl shadow-sm border border-primary/5";
        div.innerHTML = `
            <div class="flex gap-2 w-24 flex-shrink-0">
                <img src="${item.product.img}" class="w-12 h-12 object-cover rounded-lg shadow-sm"/>
                <img src="${item.color.img}" class="w-12 h-12 object-cover rounded-lg shadow-sm border border-primary/10"/>
            </div>
            <div class="flex-grow">
                <p class="text-xs uppercase opacity-40 font-bold tracking-widest">${item.purpose === 'offering' ? 'お供え' : 'お祝い'}</p>
                <h4 class="font-bold text-lg">${item.product.name}</h4>
                <p class="text-sm opacity-60">${item.color.name}</p>
            </div>
            <div class="flex items-center gap-4">
                <div class="flex items-center bg-surface rounded-full p-1 border border-primary/10">
                    <button class="w-8 h-8 flex items-center justify-center hover:bg-primary/5 rounded-full" onclick="changeQty(${index}, -1)">-</button>
                    <span class="w-8 text-center font-bold">${item.quantity}</span>
                    <button class="w-8 h-8 flex items-center justify-center hover:bg-primary/5 rounded-full" onclick="changeQty(${index}, 1)">+</button>
                </div>
                <p class="font-bold w-20 text-right">¥${itemTotal.toLocaleString()}</p>
            </div>
        `;
        list.appendChild(div);
    });

    badge.innerText = cart.length;
    badge.classList.toggle('hidden', cart.length === 0);
    totalLabel.innerText = `¥${total.toLocaleString()}`;
    document.getElementById('empty-cart-msg').classList.toggle('hidden', cart.length > 0);
}

window.changeQty = (index, delta) => {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    updateCartUI();
};

function toggleCart(open) {
    document.getElementById('cart-screen').style.transform = open ? 'translateX(0)' : 'translateX(100%)';
}

// --- EVENT HANDLERS ---
document.getElementById('start-shopping').onclick = () => {
    showScreen('order');
};

document.getElementById('add-to-cart-btn').onclick = addToCart;
document.getElementById('cart-icon-btn').onclick = () => toggleCart(true);
document.getElementById('close-cart').onclick = () => toggleCart(false);

document.getElementById('go-to-step-4').onclick = () => {
    toggleCart(false);
    document.getElementById('step-4-area').classList.remove('hidden-content');
    currentStep = 4;
    updateStepper();
    window.scrollTo({ top: document.getElementById('step-4-area').offsetTop - 120, behavior: 'smooth' });
};

document.getElementById('logo-link').onclick = (e) => {
    e.preventDefault();
    location.reload(); 
};

// --- INITIALIZE ---
function playIntro(callback) {
  const overlay = document.getElementById('intro-overlay');
  const container = document.getElementById('intro-image-container');
  const text = document.getElementById('intro-text');
  sessionStorage.setItem('yamashiroya_intro_played', 'true');
  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    overlay.style.opacity = '1';
    container.style.opacity = '1';
    container.style.transform = 'scale(1.1)';
    text.style.opacity = '1';
    text.style.transform = 'translateY(0)';
  }, 100);
  setTimeout(() => {
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.classList.add('hidden');
      document.body.style.overflow = '';
      if (callback) callback();
    }, 1000);
  }, 4500);
}

const introPlayed = sessionStorage.getItem('yamashiroya_intro_played');
if (!introPlayed) {
    playIntro(() => {});
}

updateStepper();
renderProducts();
renderColors();
updateCartUI();
