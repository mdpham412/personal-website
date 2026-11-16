(() => {
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let savedTheme;

  try {
    savedTheme = localStorage.getItem('theme');
  } catch {
    
  }

  let hasPreference = savedTheme === 'light' || savedTheme === 'dark';
  document.documentElement.dataset.theme = hasPreference
    ? savedTheme
    : systemTheme.matches ? 'dark' : 'light';

  document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.theme-toggle');

    function updateButton() {
      const isDark = document.documentElement.dataset.theme === 'dark';
      const label = `Switch to ${isDark ? 'light' : 'dark'} theme`;
      button.setAttribute('aria-label', label);
      button.title = label;
    }

    updateButton();
    button.hidden = false;

    button.addEventListener('click', () => {
      const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = nextTheme;
      hasPreference = true;
      updateButton();

      try {
        localStorage.setItem('theme', nextTheme);
      } catch {
        
      }
    });

    systemTheme.addEventListener('change', (event) => {
      if (!hasPreference) {
        document.documentElement.dataset.theme = event.matches ? 'dark' : 'light';
        updateButton();
      }
    });
  });
})();
