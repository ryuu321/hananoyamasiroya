const PRODUCTS = [
  {
    id: 'bouquets',
    title: '花束 (Bouquets)',
    items: [
      {
        id: 'lily-memorial',
        name: '白百合のメモリアル花束',
        price: '¥8,800',
        desc: '気品ある白百合を主役にした正統派の花束です。',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6UBR-PvP6XGHqMmJwNOu4mseTA_n6occ46d0RcbCDDBhtvLtrEL4jQluReXDBwW2MRb1BsYGaTIGE4ftLVU7XNrYMQhshhuHjXO44hyo9IeISVefpGFwq_Edz4pZLPHW4Lx5yzoxEnEJW5Fj0kehlLDQ63q75AAzkl3V8wxS1fGZ5JfA3O7yWGGpv9pnNgCmjOVAWQl13yxaKxJPoMImsJEkLYn5xgsetNJZXvQBD2LHHdQxMNjas4Y_a3rxn-A70uIq1SkqRqg',
        recommended: true
      },
      {
        id: 'seasonal-pale',
        name: '季節の供花花束（淡色）',
        price: '¥5,500',
        desc: '穏やかな色合いの季節の花を優しく束ねました。',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYhHYOD220ToezOAmPQKdfGJEBsgwrcLnIwTLMMOXynyBi7Z0op84jyKpcqi_hFY_tZHxLuwHXUGeLr5Wih58Ocjk0wCjBifImrwPk8mqWx3Jku5gilZ8i3AZPl4yphtgyF0B_soH9gfTKTHspOEw_mBhUu5qeoi14QN8WOoNaRR-TvDlKcBH1BJcHbnun4-VxDU4sOosQMz17eeQy-Jvtmc6atrCkTLR30YLqEIvEdXAPpmNS8JNI95oGWne8xtvv31MiTjqgcg'
      },
      {
        id: 'traditional-white',
        name: '伝統的な白菊の花束',
        price: '¥4,400',
        desc: '凛とした立ち姿の白菊を使用した伝統的なスタイル。',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLfCy5WMHv5b5EBWyF9GE56kYaf7BJ3Jf1FK2Kkdz8Bpy50Ii6YQURgMfGdc80IFQpi8xWMLdy9hK1OhRmariR40ARmVbORALFAqCH5FCG5wZALvAIaA9b60v1i7ejUi1ypbPDBBpFISUuPXi0sBhQgoLgQ4muwMAkOmIGq1o41EBQ__HikYwLcb9Y0sNmrt7FQkSgDbQga7bzU-LpPFSNwX6JxPnGyIvXvQPxS-MUa57CS2B9VrDTzBsznPZpN7U95Cln-unDTQ'
      }
    ]
  },
  {
    id: 'arrangements',
    title: 'アレンジ (Arrangements)',
    items: [
      {
        id: 'peaceful-arrangement',
        name: 'やすらぎのアレンジメント',
        price: '¥7,700',
        desc: '穏やかな心が宿る、繊細なアレンジです。',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkKJKkw4KgWKifggJkq87KF2ICLVds9kONAz5ve4vxj9pvACAjxEdVQYyj4d5q4IGhKXMm4vMohCdkZCQwKLpnSQsLDdq2akrE2g_6Tbz7MchxtJngJT-rj3DcY3IjtMxgz0WOqJUqK2AjjQbdF0FinszwfB3_kthsGItisAKzRsLZZzFxSEsEcq_jtbf-ZggefKVGiGRn5l_fSIZQTfe8jWyu4jDDd66EFNBx0jHdVrhLEPScomVp8UwQzDqbWM0_rNb2SAkeEQ'
      },
      {
        id: 'pure-white',
        name: '清浄の白アレンジ',
        price: '¥11,000',
        desc: '純白の花々が奏でる、気高き祈りの形。',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLIzk4UYU9mRyz4SVL3gzGcHIpR6c3APM3sMFyTz9bd1oNew1RK29VodqvTnKqnbSAoTkuzibK2YfsbcTeJVkkWUbsSvOeRoc78LtxdQce8pWUorhBX1gpLmP3IMidML_BDVUe_I6cZAqA94DkTnmD5q-ZZbSYJcWusZnK5UTSGrfaheBYE7HBoPohJrgwmGYWe76gR2ZaGJdM5J6y8hBundTh1x0WuN7OncihCF8WeKFUEKodKWc8Wf5OJzN3MfIkxzQqMLVYUg'
      }
    ]
  }
];

let currentScreen = 'landing'; // 'landing' or 'order'
let currentStep = 1;
let selectedProduct = null;

function updateUI() {
  const landing = document.getElementById('landing-screen');
  const order = document.getElementById('order-screen');
  const footerNav = document.getElementById('footer-nav');

  if (currentScreen === 'landing') {
    landing.classList.remove('hidden');
    order.classList.add('hidden');
    footerNav.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'instant' });
  } else {
    landing.classList.add('hidden');
    order.classList.remove('hidden');
    // Footer nav only visible in step 2
    footerNav.classList.toggle('hidden', currentStep !== 2);
    updateStepUI();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function updateStepUI() {
  const contents = [
    document.getElementById('step-1-content'),
    document.getElementById('step-2-content'),
    document.getElementById('step-3-content')
  ];

  contents.forEach((el, i) => {
    el.classList.toggle('hidden', i + 1 !== currentStep);
    if (i + 1 === currentStep) {
        el.style.opacity = '0';
        setTimeout(() => { el.style.opacity = '1'; }, 50);
    }
  });

  // Stepper Visuals
  for (let i = 1; i <= 3; i++) {
    const circle = document.getElementById(`step-circle-${i}`);
    const label = document.getElementById(`step-label-${i}`);
    
    if (i < currentStep) {
      circle.innerHTML = '<span class="material-symbols-outlined">check</span>';
      circle.className = 'w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-300 bg-secondary-fixed text-primary';
      label.className = 'text-sm font-medium opacity-100 text-primary';
    } else if (i === currentStep) {
      circle.innerText = i;
      circle.className = 'w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-300 bg-primary-container text-white shadow-xl ring-8 ring-primary-container/10';
      label.className = 'text-sm font-bold text-primary';
    } else {
      circle.innerText = i;
      circle.className = 'w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-300 bg-surface-container-highest text-on-surface-variant opacity-60';
      label.className = 'text-sm font-medium opacity-40';
    }
  }

  // Update Cart Widget Label
  const badge = document.getElementById('cart-badge');
  if (selectedProduct) {
      badge.classList.remove('hidden');
      badge.innerText = '1';
      document.getElementById('selected-items-label').innerText = 'Next';
      document.getElementById('next-step-button').disabled = false;
  } else {
      badge.classList.add('hidden');
      document.getElementById('next-step-button').disabled = true;
  }
}

function renderProducts() {
  const container = document.getElementById('product-sections');
  if (!container) return;
  container.innerHTML = '';

  PRODUCTS.forEach(category => {
    const section = document.createElement('section');
    section.innerHTML = `
      <div class="flex items-center justify-between mb-8 border-b border-primary/10 pb-4">
        <h2 class="text-3xl font-headline font-bold text-primary">${category.title}</h2>
        <a class="text-primary font-bold text-lg flex items-center hover:opacity-70 transition-opacity" href="#">
          View All <span class="material-symbols-outlined ml-2">arrow_forward</span>
        </a>
      </div>
      <div class="flex overflow-x-auto no-scrollbar gap-8 pb-4" id="cat-list-${category.id}"></div>
    `;
    container.appendChild(section);

    const list = document.getElementById(`cat-list-${category.id}`);
    category.items.forEach(item => {
      const isSelected = selectedProduct?.id === item.id;
      const card = document.createElement('div');
      card.className = `min-w-[340px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer group border-2 ${isSelected ? 'border-primary-container ring-4 ring-primary-container/10' : 'border-transparent'}`;
      card.innerHTML = `
        <div class="aspect-[4/5] relative overflow-hidden bg-primary/5">
          <img src="${item.img}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"/>
          ${item.recommended ? '<div class="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded text-xs font-bold tracking-widest font-label uppercase">Recommended</div>' : ''}
          ${isSelected ? '<div class="absolute inset-0 bg-primary-container/20 backdrop-blur-[2px] flex items-center justify-center"><span class="material-symbols-outlined text-7xl text-white drop-shadow-2xl">check_circle</span></div>' : ''}
        </div>
        <div class="p-8">
          <h3 class="text-2xl font-headline font-bold mb-2 group-hover:text-primary transition-colors">${item.name}</h3>
          <p class="text-on-surface-variant mb-6 h-12 overflow-hidden text-sm leading-relaxed">${item.desc}</p>
          <div class="flex items-center justify-between mt-auto">
            <span class="text-2xl font-bold font-label text-primary">${item.price}</span>
            <span class="material-symbols-outlined ${isSelected ? 'text-primary' : 'text-on-surface-variant/30'}">shopping_cart_checkout</span>
          </div>
        </div>
      `;
      card.onclick = () => {
        selectedProduct = item;
        renderProducts();
        updateStepUI();
      };
      list.appendChild(card);
    });
  });
}

// Intro Logic
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
  }, 5000);
}

// Initial Launch
function init() {
  const introPlayed = sessionStorage.getItem('yamashiroya_intro_played');
  if (!introPlayed) {
    playIntro(() => {
      currentScreen = 'landing';
      updateUI();
    });
  } else {
    currentScreen = 'landing';
    updateUI();
  }
}

// Event Listeners
document.getElementById('start-shopping').addEventListener('click', () => {
  currentScreen = 'order';
  currentStep = 1;
  updateUI();
  renderProducts();
});

document.getElementById('logo-link').addEventListener('click', (e) => {
  e.preventDefault();
  currentScreen = 'landing';
  updateUI();
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    if (link.dataset.screen === 'landing') {
        e.preventDefault();
        currentScreen = 'landing';
        updateUI();
    }
  });
});

document.querySelectorAll('.purpose-card').forEach(card => {
  card.addEventListener('click', () => {
    currentStep = 2;
    updateStepUI();
    renderProducts();
  });
});

document.getElementById('next-step-button').addEventListener('click', () => {
  currentStep = 3;
  updateStepUI();
});

init();
renderProducts();
