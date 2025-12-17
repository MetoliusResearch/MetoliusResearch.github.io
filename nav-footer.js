document.addEventListener('DOMContentLoaded', function() {
  // Load navigation
  fetch('nav.html')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load navigation');
      return response.text();
    })
    .then(data => {
      const nav = document.getElementById('nav-placeholder');
      nav.innerHTML = data;
      nav.classList.add('loaded');
      // Highlight active menu item
      const lastSegment = window.location.pathname.split('/').pop();
      const path = lastSegment && lastSegment.length > 0 ? lastSegment : 'index.html';
      document.querySelectorAll('.menu-item').forEach(link => {
        if(link.getAttribute('href') === path) {
          link.classList.add('active');
        }
      });
    })
    .catch(() => {
      const nav = document.getElementById('nav-placeholder');
      nav.innerHTML = '<nav><ul><li>Navigation unavailable</li></ul></nav>';
    });

  // Load footer
  fetch('footer.html')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load footer');
      return response.text();
    })
    .then(data => {
      const footer = document.getElementById('footer-placeholder');
      footer.innerHTML = data;
    })
    .catch(() => {
      const footer = document.getElementById('footer-placeholder');
      footer.innerHTML = '<footer>Footer unavailable</footer>';
    });
});