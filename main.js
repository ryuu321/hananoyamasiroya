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
  },
  {
      id: 'pets',
      title: 'ペット用 (For Pets)',
      items: [
          {
              id: 'rainbow-bridge',
              name: '虹の橋アレンジメント',
              price: '¥3,850',
              img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-iKgizyG3VHi7uUnVnWxQLhvzchHsqm7WOa4DMSS81ixojlgMNwm2oMzAG3oSpmIqxiUt8cKqgV_ynmf30ThOf4u4hbJI72gDV8pLxCQLHfij18XIPou8LySaKsjNHAcMIurDoBy_wAaX_djtIVh25mitMl8DzYiMZ63YweGm2k1G4cA2RMgPzJwa4cs2yP4vWeW-fYhZ2MfSE_EdlP0M9gb2-bs8rTjTuJS6mKjEur7UTHkdaQhI7OvkrmFXyeS0jMRUrMVhXA'
          },
          {
              id: 'angel-bouquet',
              name: '天使の小花束',
              price: '¥2,750',
              img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCy0Wk5n0JQkL3I_od6tEDcHoc-73NQpWo7hScdbbAo-4SFEUYb2pDlZU_Uohk88QVhjYpw8OBXMss9fro3iOFT_lqiWPH_z47DYHvhUTsci83G3SIjEsrb92Q1TRsCbZ6gBJDgNrH409uweHte-Ns9eyEbwnthXXVCokb9yDRPG8rpV4a4ZUTp_lur--koCXqV1bAm3z9UjKFchapgFsYoC36fjoA4JzzLybpmsohTW84F49ZZOmc0qvLr-Y5kv9ALbcc1Jhm8WQ'
          }
      ]
  }
];

let currentStep = 1;
let selectedProduct = null;

const screens = [
  document.getElementById('step-1-screen'),
  document.getElementById('step-2-screen'),
  document.getElementById('step-3-screen')
];

function updateStepUI() {
  screens.forEach((screen, i) => {
    if (i + 1 === currentStep) {
      screen.classList.remove('hidden');
      screen.style.opacity = '1';
      screen.style.transform = 'translateY(0)';
    } else {
      screen.classList.add('hidden');
      screen.style.opacity = '0';
      screen.style.transform = 'translateY(20px)';
    }
  });

  // Update Stepper Nodes
  for (let i = 1; i <= 3; i++) {
    const circle = document.getElementById(`step-circle-${i}`);
    const label = document.getElementById(`step-label-${i}`);
    
    if (i < currentStep) {
      circle.innerHTML = '<span class="material-symbols-outlined">check</span>';
      circle.className = 'w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-300 bg-secondary-container text-secondary';
      label.className = 'font-medium text-secondary';
    } else if (i === currentStep) {
      circle.innerText = i;
      circle.className = 'w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-300 bg-primary-container text-on-primary ring-8 ring-primary-container/10';
      label.className = 'font-bold text-primary';
    } else {
      circle.innerText = i;
      circle.className = 'w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl transition-all duration-300 bg-surface-container-highest text-on-surface-variant';
      label.className = 'opacity-60 text-on-surface-variant';
    }
  }

  // Footer Button State
  const nextBtn = document.getElementById('next-step-button');
  if (currentStep === 1) {
      nextBtn.disabled = true;
      document.getElementById('footer-nav').style.opacity = '0';
      document.getElementById('footer-nav').style.pointerEvents = 'none';
  } else if (currentStep === 2) {
      document.getElementById('footer-nav').style.opacity = '1';
      document.getElementById('footer-nav').style.pointerEvents = 'auto';
      nextBtn.disabled = !selectedProduct;
      document.getElementById('selected-items-label').innerText = selectedProduct ? selectedProduct.name : '未選択';
  } else {
    document.getElementById('footer-nav').classList.add('hidden');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderProducts() {
  const container = document.getElementById('product-sections');
  container.innerHTML = '';

  PRODUCTS.forEach(category => {
    const section = document.createElement('section');
    section.innerHTML = `
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl md:text-3xl font-headline font-bold text-on-surface">${category.title}</h2>
        <a class="text-primary font-bold text-lg flex items-center hover:underline decoration-primary underline-offset-8 transition-all" href="#">
          すべて表示
          <span class="material-symbols-outlined ml-2" data-icon="arrow_forward">arrow_forward</span>
        </a>
      </div>
      <div class="flex overflow-x-auto no-scrollbar gap-8 pb-4 -mx-6 px-6 md:mx-0 md:px-0" id="cat-${category.id}">
      </div>
    `;
    container.appendChild(section);

    const list = document.getElementById(`cat-${category.id}`);
    category.items.forEach(item => {
      const card = document.createElement('div');
      const isSelected = selectedProduct?.id === item.id;
      
      card.className = `min-w-[320px] bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group border-2 ${isSelected ? 'border-primary ring-4 ring-primary/10' : 'border-transparent'}`;
      card.innerHTML = `
        <div class="aspect-[4/5] bg-surface-variant relative overflow-hidden">
          <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="${item.img}" alt="${item.name}"/>
          ${item.recommended ? '<div class="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded-lg text-sm font-label font-bold">Recommended</div>' : ''}
          ${isSelected ? '<div class="absolute inset-0 bg-primary/20 flex items-center justify-center"><span class="material-symbols-outlined text-6xl text-white drop-shadow-lg">check_circle</span></div>' : ''}
        </div>
        <div class="p-6">
          <h3 class="text-2xl font-headline font-bold mb-2">${item.name}</h3>
          <p class="text-on-surface-variant text-lg mb-4">${item.desc || ''}</p>
          <div class="flex items-center justify-between">
            <p class="text-2xl font-bold text-primary font-label">${item.price} <span class="text-sm font-normal text-on-surface-variant">(税込)</span></p>
            <button class="w-10 h-10 rounded-full ${isSelected ? 'bg-primary text-on-primary' : 'bg-surface-container-highest text-primary'} flex items-center justify-center transition-colors">
                 <span class="material-symbols-outlined">${isSelected ? 'check' : 'add_shopping_cart'}</span>
            </button>
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

// Event Listeners
document.querySelectorAll('.purpose-card').forEach(card => {
    card.onclick = () => {
        currentStep = 2;
        updateStepUI();
        renderProducts();
    };
});

document.getElementById('next-step-button').onclick = () => {
    currentStep = 3;
    updateStepUI();
};

// --- Animation Logic ---

function playIntro(callback) {
  const overlay = document.getElementById('intro-overlay');
  const container = document.getElementById('intro-image-container');
  const text = document.getElementById('intro-text');
  
  // Show overlay
  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  
  // Trigger animations
  setTimeout(() => {
    overlay.style.opacity = '1';
    container.style.opacity = '1';
    container.style.transform = 'scale(1.1)'; // Passing forward effect
    text.style.opacity = '1';
    text.style.transform = 'translateY(0)';
  }, 100);

  // Complete and transition out
  setTimeout(() => {
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.classList.add('hidden');
      document.body.style.overflow = '';
      // Reset for next time
      container.style.opacity = '0';
      container.style.transform = 'scale(0.9)';
      text.style.opacity = '0';
      text.style.transform = 'translateY(1rem)';
      if (callback) callback();
    }, 1000);
  }, 5000); // Animation duration
}

// Event Listeners for Intro
document.querySelectorAll('a[href="#"], .text-2xl.font-bold').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    playIntro(() => {
        currentStep = 1;
        updateStepUI();
    });
  });
});

// Initial state
updateStepUI();
renderProducts();
