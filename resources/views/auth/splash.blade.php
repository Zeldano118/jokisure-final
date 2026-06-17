<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>JokiSure • Mobile Splash</title>

  <!-- Bootstrap -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <!-- CSS kamu -->
  <link rel="stylesheet" href="{{ asset('css/styles.css') }}?v={{ filemtime(public_path('css/styles.css')) }}">
  <link href="{{ asset('css/dark-mode.css') }}?v={{ filemtime(public_path('css/dark-mode.css')) }}" rel="stylesheet">
  <link rel="icon" type="image/png" href="{{ asset('assets/logo.png') }}">

  <style>
    /* Optional: efek fade-out saat pindah */
    .fade-out { animation: fadeOut .35s ease forwards; }
    @keyframes fadeOut { to { opacity: 0; transform: scale(.98); } }

    /* Biar keliatan bisa di-tap */
    .device-frame { cursor: pointer; }
  </style>
</head>
<body class="preview-center">
  <script>
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark');
    }
  </script>
  <main id="splash" class="device-frame" role="main" aria-label="Mobile splash preview" tabindex="0">
    <!-- Status bar (mock iOS) -->
    <div class="status-bar d-flex align-items-center justify-content-between px-3">
      <div class="time">9:41</div>
      <div class="status-icons d-flex align-items-center gap-2">
        <svg width="20" height="12" viewBox="0 0 20 12" fill="none" aria-hidden="true">
          <rect x="1" y="7" width="2" height="4" rx="0.75" fill="white" opacity="0.9"/>
          <rect x="5" y="5" width="2" height="6" rx="0.75" fill="white" opacity="0.9"/>
          <rect x="9" y="3" width="2" height="8" rx="0.75" fill="white" opacity="0.9"/>
          <rect x="13" y="1" width="2" height="10" rx="0.75" fill="white" opacity="0.9"/>
        </svg>
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true">
          <path d="M9 9.5c.7 0 1.25.55 1.25 1.25S9.7 12 9 12 7.75 11.45 7.75 10.75 8.3 9.5 9 9.5z" fill="white" opacity="0.95"/>
          <path d="M3 6.5c3.9-3.2 8.1-3.2 12 0" stroke="white" stroke-width="1.6" stroke-linecap="round" opacity="0.9"/>
          <path d="M5.6 8c2.53-2.05 4.27-2.05 6.8 0" stroke="white" stroke-width="1.6" stroke-linecap="round" opacity="0.9"/>
        </svg>
        <svg width="26" height="12" viewBox="0 0 26 12" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="20" height="10" rx="2" stroke="white" stroke-width="1.5" opacity="0.9"/>
          <rect x="3" y="3" width="16" height="6" rx="1.5" fill="white" opacity="0.95"/>
          <rect x="22" y="4" width="3" height="4" rx="1" fill="white" opacity="0.9"/>
        </svg>
      </div>
    </div>

    <!-- SAFE AREA -->
    <div class="safe-area d-flex align-items-center justify-content-center">
      <img class="brand" src="{{ asset('assets/logo.png') }}" alt="JokiSure logo">
    </div>

    <!-- Home indicator -->
    <div class="home-indicator" aria-hidden="true"></div>
  </main>

  <script>
    (function () {
      // Target pindah ke halaman login
      const targetUrl = @json(route('login'));
      const splash = document.getElementById('splash');

      // Hapus auto redirect. Splash akan stay sampai user tap.
      function go() {
        splash.classList.add('fade-out');
        setTimeout(() => { window.location.href = targetUrl; }, 280);
      }

      // User bisa tap / click / tekan enter
      ['click', 'pointerdown', 'keydown'].forEach(evt => {
        splash.addEventListener(evt, (e) => {
          if (evt === 'keydown' && !['Enter', ' '].includes(e.key)) return;
          go();
        });
      });
    })();
  </script>

  <!-- Dark Mode Toggle -->
  <button class="dark-toggle" onclick="toggleDark(event)" id="darkToggleBtn">
    <svg id="darkIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  </button>

  <script>
    function toggleDark(event) {
      if (event) event.stopPropagation();
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');
      localStorage.setItem('darkMode', isDark);
      const icon = document.getElementById('darkIcon');
      if (isDark) {
        icon.innerHTML = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
      } else {
        icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
      }
    }
    if (localStorage.getItem('darkMode') === 'true') {
      const icon = document.getElementById('darkIcon');
      if (icon) {
        icon.innerHTML = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
      }
    }
  </script>
</body>
</html>
