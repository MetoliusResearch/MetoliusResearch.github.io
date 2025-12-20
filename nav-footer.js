document.addEventListener('DOMContentLoaded', () => {
  const parseFragment = (html) => {
    const parsed = new DOMParser().parseFromString(html, 'text/html');
    parsed.querySelectorAll('script').forEach((el) => el.remove());
    return parsed.body;
  };

  const setPlaceholderContent = (placeholderId, html) => {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) return;
    const body = parseFragment(html);
    placeholder.replaceChildren(...Array.from(body.childNodes));
  };

  const markActiveNavLink = () => {
    const lastSegment = window.location.pathname.split('/').pop();
    const path = lastSegment && lastSegment.length > 0 ? lastSegment : 'index.html';
    document.querySelectorAll('.menu-item').forEach((link) => {
      if (link.getAttribute('href') === path) link.classList.add('active');
    });
  };

  fetch('nav.html')
    .then((response) => {
      if (!response.ok) throw new Error('Failed to load navigation');
      return response.text();
    })
    .then((html) => {
      setPlaceholderContent('nav-placeholder', html);
      const nav = document.getElementById('nav-placeholder');
      if (nav) nav.classList.add('loaded');
      markActiveNavLink();
    })
    .catch(() => {
      const nav = document.getElementById('nav-placeholder');
      if (nav) nav.textContent = 'Navigation unavailable';
    });

  fetch('footer.html')
    .then((response) => {
      if (!response.ok) throw new Error('Failed to load footer');
      return response.text();
    })
    .then((html) => {
      setPlaceholderContent('footer-placeholder', html);
    })
    .catch(() => {
      const footer = document.getElementById('footer-placeholder');
      if (footer) footer.textContent = 'Footer unavailable';
    });
});