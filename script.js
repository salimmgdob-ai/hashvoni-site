(function () {
  const supported = ['ar', 'he', 'en'];
  const stored = localStorage.getItem('hashvoni-lang');
  const browser = (navigator.language || 'ar').slice(0, 2);
  let current = supported.includes(stored) ? stored : (supported.includes(browser) ? browser : 'ar');

  function applyLanguage(lang) {
    current = supported.includes(lang) ? lang : 'ar';
    localStorage.setItem('hashvoni-lang', current);
    document.documentElement.lang = current;
    document.documentElement.dir = current === 'en' ? 'ltr' : 'rtl';

    document.querySelectorAll('[data-lang-section]').forEach(el => {
      el.classList.toggle('active', el.dataset.langSection === current);
    });
    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.langBtn === current);
      btn.setAttribute('aria-pressed', btn.dataset.langBtn === current ? 'true' : 'false');
    });
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const value = el.dataset[current];
      if (value) el.textContent = value;
    });
  }

  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    btn.addEventListener('click', () => applyLanguage(btn.dataset.langBtn));
  });

  const menu = document.querySelector('.menu-button');
  const links = document.querySelector('.nav-links');
  if (menu && links) {
    menu.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      menu.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  const deleteForm = document.querySelector('#delete-request-form');
  if (deleteForm) {
    deleteForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = deleteForm.querySelector('[name="account_email"]').value.trim();
      const note = deleteForm.querySelector('[name="note"]').value.trim();
      const subject = encodeURIComponent('Hashvoni account deletion request');
      const body = encodeURIComponent(
        `Account email/phone: ${email}\n\nRequest details:\n${note || 'Please delete my Hashvoni account and associated data.'}`
      );
      window.location.href = `mailto:Slem_mgdob@hotmail.com?subject=${subject}&body=${body}`;
    });
  }

  applyLanguage(current);
})();
