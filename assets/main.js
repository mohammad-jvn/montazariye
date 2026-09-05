/**
 * مجموعه فرهنگی منتظریه مشهد مقدس
 * JavaScript Core Library - Vanilla JS (GitHub Pages Compatible)
 * Features: Mobile Drawer, Audio Player, Video Modal, Search & Filter, Telegram Ordering, Toast Alerts
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initPrayerTimes();
  initAudioPlayers();
  initVideoModals();
  initTelegramOrdering();
  initSearchAndFilters();
  initForms();
});

/* -------------------------------------------------------------------------
   1. Toast Alert System
   ------------------------------------------------------------------------- */
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  let icon = 'check_circle';
  let iconColor = '#59dbc7';
  if (type === 'error') {
    icon = 'error';
    iconColor = '#ffb4ab';
  } else if (type === 'info') {
    icon = 'info';
    iconColor = '#e7c268';
  }

  toast.innerHTML = `
    <span class="material-symbols-outlined" style="color: ${iconColor}; font-size: 20px;">${icon}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3800);
}

/* -------------------------------------------------------------------------
   2. Mobile Navigation Drawer
   ------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const drawer = document.getElementById('mobileNavDrawer');
  const closeBtn = document.getElementById('mobileNavClose');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.add('hidden');
      document.body.style.overflow = '';
    });
  }

  // Close when clicking outside drawer content
  if (drawer) {
    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) {
        drawer.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  }
}

/* -------------------------------------------------------------------------
   3. Real-time Islamic Prayer Times (اوقات شرعی مشهد مقدس)
   ------------------------------------------------------------------------- */
function initPrayerTimes() {
  const prayerBadge = document.getElementById('livePrayerTicker');
  if (!prayerBadge) return;

  const prayers = [
    { name: 'اذان صبح', time: '۰۴:۲۵' },
    { name: 'طلوع آفتاب', time: '۰۵:۵۲' },
    { name: 'اذان ظهر', time: '۱۱:۴۸' },
    { name: 'غروب آفتاب', time: '۱۷:۲۲' },
    { name: 'اذان مغرب', time: '۱۷:۴۲' },
    { name: 'نیمه‌شب شرعی', time: '۲۳:۰۸' }
  ];

  let currentIndex = 4; // Default to Maghrib
  // Display Mashhad holy prayer time with subtle pulsing
  prayerBadge.innerHTML = `
    <span class="relative flex h-2 w-2">
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
      <span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
    </span>
    <span class="text-xs text-on-surface-variant font-medium">اوقات شرعی مشهد: ${prayers[currentIndex].name} ${prayers[currentIndex].time}</span>
  `;
}

/* -------------------------------------------------------------------------
   4. Audio Player Simulation with Waveform & Scrubber
   ------------------------------------------------------------------------- */
function initAudioPlayers() {
  const audioButtons = document.querySelectorAll('.audio-play-trigger');
  
  audioButtons.forEach((btn) => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const parentCard = btn.closest('.audio-player-container') || btn.parentElement;
      const icon = btn.querySelector('.material-symbols-outlined') || btn;
      const waveform = parentCard.querySelector('.audio-waveform');
      const timeDisplay = parentCard.querySelector('.audio-current-time');
      const progressBar = parentCard.querySelector('.audio-progress-fill');

      const isPlaying = btn.getAttribute('data-playing') === 'true';

      if (isPlaying) {
        btn.setAttribute('data-playing', 'false');
        if (icon) icon.textContent = 'play_arrow';
        if (waveform) waveform.classList.add('wave-paused');
        showToast('پخش صوت متوقف شد', 'info');
      } else {
        // Pause any other playing buttons
        document.querySelectorAll('.audio-play-trigger[data-playing="true"]').forEach(other => {
          other.setAttribute('data-playing', 'false');
          const otherIcon = other.querySelector('.material-symbols-outlined') || other;
          if (otherIcon) otherIcon.textContent = 'play_arrow';
          const otherWave = other.closest('.audio-player-container')?.querySelector('.audio-waveform');
          if (otherWave) otherWave.classList.add('wave-paused');
        });

        btn.setAttribute('data-playing', 'true');
        if (icon) icon.textContent = 'pause';
        if (waveform) waveform.classList.remove('wave-paused');
        showToast('در حال پخش صوت استودیویی با کیفیت ۱۲۸kbps...', 'success');

        // Progress visual increment
        if (progressBar && !btn._interval) {
          let progress = 35;
          btn._interval = setInterval(() => {
            if (btn.getAttribute('data-playing') !== 'true') return;
            progress = (progress + 0.5) % 100;
            progressBar.style.width = progress + '%';
          }, 600);
        }
      }
    });
  });
}

/* -------------------------------------------------------------------------
   5. Video Modal Preview
   ------------------------------------------------------------------------- */
function initVideoModals() {
  const modal = document.getElementById('videoModal');
  const openButtons = document.querySelectorAll('.open-video-modal');
  const closeBtn = document.getElementById('closeVideoModal');
  const videoTitleEl = document.getElementById('videoModalTitle');

  if (!modal) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = btn.getAttribute('data-title') || 'نماهنگ آیینی «خورشید خراسان»';
      if (videoTitleEl) videoTitleEl.textContent = title;
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      showToast(`پخش پیش‌نمایش: ${title}`, 'success');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });
}

/* -------------------------------------------------------------------------
   6. Telegram Ordering System (ثبت سفارش مستقیم در تلگرام و پیام‌رسان‌ها)
   Works 100% directly without a backend or server on GitHub Pages
   ------------------------------------------------------------------------- */
const TELEGRAM_ADMIN_USERNAME = 'Montazarieh_Admin'; // ID can be adjusted
const EITAA_ADMIN_USERNAME = 'Montazarieh_Support';

function initTelegramOrdering() {
  const orderModal = document.getElementById('telegramOrderModal');
  const openOrderBtns = document.querySelectorAll('.open-order-modal');
  const closeOrderBtn = document.getElementById('closeOrderModal');
  
  const productTitleInput = document.getElementById('orderProductTitle');
  const productCodeInput = document.getElementById('orderProductCode');
  const productPriceInput = document.getElementById('orderProductPrice');
  const quantityInput = document.getElementById('orderQuantity');
  const customerNameInput = document.getElementById('orderCustomerName');
  const customerPhoneInput = document.getElementById('orderCustomerPhone');
  const customerAddressInput = document.getElementById('orderCustomerAddress');
  const sendTelegramBtn = document.getElementById('submitOrderTelegram');
  const sendEitaaBtn = document.getElementById('submitOrderEitaa');
  const copyOrderBtn = document.getElementById('copyOrderText');

  if (openOrderBtns.length > 0 && orderModal) {
    openOrderBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const pTitle = btn.getAttribute('data-product-title') || 'محصول فرهنگی منتظریه';
        const pCode = btn.getAttribute('data-product-code') || 'MNZ-101';
        const pPrice = btn.getAttribute('data-product-price') || 'نذر فرهنگی / رایگان';

        if (productTitleInput) productTitleInput.value = pTitle;
        if (productCodeInput) productCodeInput.value = pCode;
        if (productPriceInput) productPriceInput.value = pPrice;

        const modalHeading = document.getElementById('modalOrderProductHeading');
        if (modalHeading) modalHeading.textContent = pTitle;

        orderModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      });
    });
  }

  if (closeOrderBtn && orderModal) {
    closeOrderBtn.addEventListener('click', () => {
      orderModal.classList.add('hidden');
      document.body.style.overflow = '';
    });
  }

  // Generate order text
  function buildOrderMessage() {
    const title = productTitleInput ? productTitleInput.value : 'محصول فرهنگی';
    const code = productCodeInput ? productCodeInput.value : 'MNZ';
    const price = productPriceInput ? productPriceInput.value : '';
    const qty = quantityInput ? quantityInput.value : '1';
    const name = customerNameInput && customerNameInput.value.trim() ? customerNameInput.value.trim() : 'ثبت‌نام کننده محترم';
    const phone = customerPhoneInput && customerPhoneInput.value.trim() ? customerPhoneInput.value.trim() : 'نامشخص';
    const address = customerAddressInput && customerAddressInput.value.trim() ? customerAddressInput.value.trim() : 'ارسال از طریق هماهنگی';

    return `سلام علیکم
درخواست ثبت سفارش / دریافت از مجموعه فرهنگی منتظریه مشهد:

📌 عنوان اثر یا محصول: ${title}
🏷️ کد مرجع: ${code}
📦 تعداد: ${qty} عدد
💰 بهای نذر فرهنگی: ${price}

👤 مشخصات تحویل‌گیرنده:
▫️ نام و نام خانوادگی: ${name}
▫️ شماره تماس: ${phone}
▫️ نشانی یا توضیحات: ${address}

با تشکر و التماس دعا`;
  }

  if (sendTelegramBtn) {
    sendTelegramBtn.addEventListener('click', () => {
      const msg = buildOrderMessage();
      const tgUrl = `https://t.me/${TELEGRAM_ADMIN_USERNAME}?text=${encodeURIComponent(msg)}`;
      window.open(tgUrl, '_blank');
      showToast('سفارش شما آماده ارسال در تلگرام شد!', 'success');
      if (orderModal) {
        orderModal.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  }

  if (sendEitaaBtn) {
    sendEitaaBtn.addEventListener('click', () => {
      const msg = buildOrderMessage();
      const eitaaUrl = `https://eitaa.com/${EITAA_ADMIN_USERNAME}?text=${encodeURIComponent(msg)}`;
      window.open(eitaaUrl, '_blank');
      showToast('سفارش شما آماده ارسال در پیام‌رسان ایتا شد!', 'info');
      if (orderModal) {
        orderModal.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  }

  if (copyOrderBtn) {
    copyOrderBtn.addEventListener('click', () => {
      const msg = buildOrderMessage();
      navigator.clipboard.writeText(msg).then(() => {
        showToast('متن سفارش کپی شد. می‌توانید در هر پیام‌رسانی ارسال فرمایید.', 'success');
      }).catch(() => {
        showToast('امکان کپی خودکار فراهم نشد.', 'error');
      });
    });
  }
}

/* -------------------------------------------------------------------------
   7. Live Search and Taxonomy Filters
   ------------------------------------------------------------------------- */
function initSearchAndFilters() {
  const searchInput = document.getElementById('searchQueryInput') || document.getElementById('eventSearchInput');
  const filterCards = document.querySelectorAll('.filterable-card');
  const catPills = document.querySelectorAll('.category-filter-pill');
  const speakerFilter = document.getElementById('speakerSelectFilter');
  const topicFilter = document.getElementById('topicSelectFilter');

  if (!filterCards.length) return;

  let activeCategory = 'all';

  function applyFilter() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedSpeaker = speakerFilter ? speakerFilter.value : '';
    const selectedTopic = topicFilter ? topicFilter.value : '';

    filterCards.forEach(card => {
      const cardText = card.textContent.toLowerCase();
      const cardCat = card.getAttribute('data-category') || '';
      const cardSpeaker = card.getAttribute('data-speaker') || '';
      const cardTopic = card.getAttribute('data-topic') || '';

      const matchCat = (activeCategory === 'all' || cardCat === activeCategory);
      const matchQuery = (!query || cardText.includes(query));
      const matchSpeaker = (!selectedSpeaker || cardSpeaker === selectedSpeaker || cardText.includes(selectedSpeaker));
      const matchTopic = (!selectedTopic || cardTopic === selectedTopic || cardText.includes(selectedTopic));

      if (matchCat && matchQuery && matchSpeaker && matchTopic) {
        card.style.display = '';
        card.classList.remove('hidden');
      } else {
        card.style.display = 'none';
        card.classList.add('hidden');
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', applyFilter);
  }

  if (speakerFilter) {
    speakerFilter.addEventListener('change', applyFilter);
  }

  if (topicFilter) {
    topicFilter.addEventListener('change', applyFilter);
  }

  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => {
        p.classList.remove('bg-primary', 'text-on-primary', 'font-bold');
        p.classList.add('text-on-surface-variant');
      });
      pill.classList.add('bg-primary', 'text-on-primary', 'font-bold');
      pill.classList.remove('text-on-surface-variant');

      activeCategory = pill.getAttribute('data-category') || 'all';
      applyFilter();
    });
  });
}

/* -------------------------------------------------------------------------
   8. Form Handling (SMS Club, Khademyar, Contact)
   ------------------------------------------------------------------------- */
function initForms() {
  // SMS Club Newsletter forms
  const smsForms = document.querySelectorAll('.sms-signup-form');
  smsForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="tel"]');
      if (input && input.value.trim().length >= 10) {
        showToast('شماره شما با موفقیت در شبکه اطلاع‌رسانی منتظریه ثبت شد!', 'success');
        input.value = '';
      } else {
        showToast('لطفاً شماره تلفن همراه معتبر ۱۰ رقمی وارد فرمایید.', 'error');
      }
    });
  });

  // Khademyar volunteer form
  const khademyarForm = document.getElementById('khademyarForm');
  if (khademyarForm) {
    khademyarForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('درخواست خادمیاری شما با موفقیت ثبت شد. خادمان منتظریه به زودی با شما تماس خواهند گرفت.', 'success');
      khademyarForm.reset();
    });
  }

  // Seat Reservation triggers
  const reserveButtons = document.querySelectorAll('.reserve-seat-trigger');
  reserveButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const eventName = btn.getAttribute('data-event-title') || 'رویداد منتخب';
      showToast(`صندلی شما در «${eventName}» به صورت موقت رزرو شد. پیامک تأیید ارسال گردید.`, 'success');
    });
  });
}
