// --- UPTIME CLOCK LOGIC ---
const born = new Date("1984-08-29T00:00:00");

function updateAlive() {
  const diff = Math.floor((Date.now() - born.getTime()) / 1000);
  
  const aliveDaysEl = document.getElementById("aliveDays");
  const aliveHoursEl = document.getElementById("aliveHours");
  const aliveSecsEl = document.getElementById("aliveSecs");

  if (aliveDaysEl && aliveHoursEl && aliveSecsEl) {
    aliveDaysEl.textContent = Math.floor(diff / 86400).toLocaleString();
    aliveHoursEl.textContent = Math.floor(diff / 3600).toLocaleString();
    aliveSecsEl.textContent = diff.toLocaleString();
  }
}

// Only start the interval if we are on a page that actually has the uptime clock
if (document.getElementById("aliveDays")) {
  updateAlive();
  setInterval(updateAlive, 1000);
}

// --- DYNAMIC EMAIL LOGIC ---
// Obfuscate email dynamically mapped to UI
const titleEmailEl = document.getElementById("titleEmail");
if (titleEmailEl) {
  const user = "hello";
  const domain = "e-ng.in";
  
  // Only set the text content to the email if the element doesn't already have text
  // (like "e-ng.in/blog" on the blog page)
  if (!titleEmailEl.textContent) {
      titleEmailEl.textContent = `${user}@${domain}`;
  }
}

// --- MODAL LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add click event on trigger links
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modalId = $trigger.dataset.target;
    const $target = document.getElementById(modalId);

    if ($target) {
      $trigger.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent page jump when clicking <a>
        openModal($target);
      });
    }
  });

  // Close modal on close button click
  (document.querySelectorAll('.js-modal-close') || []).forEach(($close) => {
    const $target = $close.closest('.modal');
    if ($target) {
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    }
  });

  // Close modal on ESC key
  document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape') {
      closeAllModals();
    }
  });

// Close modal when clicking the dark background overlay
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
       closeModal(event.target);
    }
  });
});

// --- THEME LOGIC ---
const themeToggleBtn = document.getElementById("themeToggle");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark" || currentTheme === null) {
  document.documentElement.setAttribute("data-theme", "dark");
  if (themeToggleBtn) themeToggleBtn.textContent = "☀️";
} else {
  if (themeToggleBtn) themeToggleBtn.textContent = "🌙";
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    let theme = document.documentElement.getAttribute("data-theme");
    if (theme === "dark") {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
      themeToggleBtn.textContent = "🌙";
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      themeToggleBtn.textContent = "☀️";
    }
  });
}
