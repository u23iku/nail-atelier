document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const toggle = document.querySelector('.menu-toggle');
  const drawer = document.querySelector('.nav-drawer');
  const closeBtn = document.querySelector('.nav-drawer-close');
  if (toggle && drawer) {
    const closeDrawer = () => {
      toggle.classList.remove('open');
      drawer.classList.remove('open');
    };
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      drawer.classList.toggle('open');
    });
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    drawer.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', closeDrawer);
    });
  }

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => io.observe(el));

  // Back to top
  const toTop = document.querySelector('.to-top');
  if (toTop) {
    window.addEventListener('scroll', () => {
      toTop.classList.toggle('show', window.scrollY > 500);
    });
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Placeholder-link buttons: this is a demo site, so show a notice instead of navigating
  const setupNoticeModal = (selector, { idPrefix, icon, title, text }) => {
    const btns = document.querySelectorAll(selector);
    if (!btns.length) return;

    const overlay = document.createElement('div');
    overlay.className = 'reserve-modal-overlay';
    overlay.innerHTML = `
      <div class="reserve-modal" role="dialog" aria-modal="true" aria-labelledby="${idPrefix}Title">
        <button type="button" class="reserve-modal-close" aria-label="閉じる">&times;</button>
        <div class="reserve-modal-icon">${icon}</div>
        <p class="reserve-modal-title" id="${idPrefix}Title">${title}</p>
        <p class="reserve-modal-text">${text}</p>
        <button type="button" class="btn btn-primary reserve-modal-ok">閉じる</button>
      </div>`;
    document.body.appendChild(overlay);

    const closeModal = () => overlay.classList.remove('open');
    const openModal = () => overlay.classList.add('open');

    btns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    });
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
    overlay.querySelector('.reserve-modal-close').addEventListener('click', closeModal);
    overlay.querySelector('.reserve-modal-ok').addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  };

  setupNoticeModal('.reserve-btn', {
    idPrefix: 'reserveModal',
    icon: '📅',
    title: 'ご予約について',
    text: 'これはポートフォリオ用に作成したテストサイトです。<br>実際に公開する際は、このボタンからご予約ページへ遷移します。',
  });

  setupNoticeModal('.insta-btn', {
    idPrefix: 'instaModal',
    icon: '📷',
    title: 'Instagramについて',
    text: 'これはポートフォリオ用に作成したテストサイトです。<br>実際に公開する際は、このボタンからInstagramへ遷移します。',
  });
});
