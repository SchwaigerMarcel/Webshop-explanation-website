function isDarkMode() {
  return document.body.classList.contains('dark-theme');
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }
}

function toggleTheme(event) {
  if (event) {
    event.preventDefault();
  }
  const nextTheme = isDarkMode() ? 'light' : 'dark';
  applyTheme(nextTheme);
  localStorage.setItem('site-theme', nextTheme);
}

function loadSavedTheme() {
  const saved = localStorage.getItem('site-theme');
  if (saved) {
    applyTheme(saved);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  loadSavedTheme();

  document.addEventListener('click', function (event) {
    if (event.target.closest('#themeToggle')) {
      toggleTheme(event);
    }
  });
});
