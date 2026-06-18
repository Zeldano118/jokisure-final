<!-- 5026231003 | Kanayya Shafa Amelia (kanayya shafa) -->

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>JokiSure • Reset Password</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="{{ asset('css/reset-password.css') }}?v={{ filemtime(public_path('css/reset-password.css')) }}">
  {{-- <link href="{{ asset('css/dark-mode.css') }}?v={{ filemtime(public_path('css/dark-mode.css')) }}" rel="stylesheet"> --}}
  <link rel="icon" type="image/png" href="{{ asset('assets/logo.png') }}">
</head>
<body class="preview-center">
  {{-- <script>
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark');
    }
  </script> --}}
  <main class="device-frame" role="main" aria-label="Reset password">
    <div class="status-bar d-flex align-items-center justify-content-between px-3">
      <div class="time">9:41</div>
      <div class="status-icons d-flex align-items-center gap-2">
        <svg width="20" height="12" viewBox="0 0 20 12" fill="none"><rect x="1" y="7" width="2" height="4" rx="0.75" fill="#0a0a0a"/><rect x="5" y="5" width="2" height="6" rx="0.75" fill="#0a0a0a"/><rect x="9" y="3" width="2" height="8" rx="0.75" fill="#0a0a0a"/><rect x="13" y="1" width="2" height="10" rx="0.75" fill="#0a0a0a"/></svg>
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none"><path d="M9 9.5c.7 0 1.25.55 1.25 1.25S9.7 12 9 12 7.75 11.45 7.75 10.75 8.3 9.5 9 9.5z" fill="#0a0a0a"/><path d="M3 6.5c3.9-3.2 8.1-3.2 12 0" stroke="#0a0a0a" stroke-width="1.6" stroke-linecap="round"/><path d="M5.6 8c2.53-2.05 4.27-2.05 6.8 0" stroke="#0a0a0a" stroke-width="1.6" stroke-linecap="round"/></svg>
      </div>
    </div>

    <section class="safe-area d-flex flex-column">
      <header class="header container-fluid">
        <div class="row align-items-center">
          <div class="col-2">
            <a href="{{ route('login') }}" class="btn-back" aria-label="Back">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="#0a0a0a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
          </div>
          <div class="col-8 d-flex justify-content-center">
            <img src="{{ asset('assets/logo.png') }}" class="brand" alt="JokiSure logo">
          </div>
          <div class="col-2"></div>
        </div>
      </header>

      <div class="content-wrap">
        <div class="container">
          <h1 class="h4 fw-bold mb-3">Reset Password</h1>

          <form method="POST" action="{{ route('password.reset.perform') }}" style="display: none;">
            @csrf
            <input type="text" name="identity" value="{{ old('identity') }}">
            <input type="password" name="password">
            <input type="password" name="password_confirmation">
          </form>

          <label class="form-label mb-1">New Password</label>
          <input type="password" id="new-password" class="form-control mb-3" placeholder="Enter Your Password">

          <label class="form-label mb-1">Confirm New Password</label>
          <input type="password" id="confirm-password" class="form-control mb-4" placeholder="Confirm Your Password">

          <button onclick="submitPasswordReset()" class="btn btn-cta w-100 mt-2">Change Password</button>

          @if(session('success'))
            <div class="alert alert-success mt-3">{{ session('success') }}</div>
          @endif

          @error('identity')
            <div class="text-danger small mt-2">{{ $message }}</div>
          @enderror

          @error('password')
            <div class="text-danger small mt-2">{{ $message }}</div>
          @enderror
        </div>
      </div>

      <script>
        // Get identity from session storage when page loads
        let storedIdentity = '';
        document.addEventListener('DOMContentLoaded', function() {
          storedIdentity = sessionStorage.getItem('resetIdentity') || '';
          if (storedIdentity) {
            // Clear session storage after use
            sessionStorage.removeItem('resetIdentity');
          }
        });

        function submitPasswordReset() {
          const newPassword = document.getElementById('new-password').value;
          const confirmPassword = document.getElementById('confirm-password').value;

          if (!newPassword || !confirmPassword) {
            alert('Please fill in all fields');
            return;
          }

          if (newPassword !== confirmPassword) {
            alert('Passwords do not match');
            return;
          }

          if (newPassword.length < 6) {
            alert('Password must be at least 6 characters');
            return;
          }

          // Use stored identity or ask for it
          let identity = storedIdentity;
          if (!identity) {
            identity = prompt('Enter your username or email for password reset:');
            if (!identity) {
              return;
            }
          }

          // Fill hidden form and submit
          const form = document.querySelector('form');
          form.querySelector('input[name="identity"]').value = identity;
          form.querySelector('input[name="password"]').value = newPassword;
          form.querySelector('input[name="password_confirmation"]').value = confirmPassword;
          form.submit();
        }
      </script>
    </section>

    <div class="home-indicator" aria-hidden="true"></div>
  </main>

  <!-- Dark Mode Toggle -->
  {{-- <button class="dark-toggle" onclick="toggleDark()" id="darkToggleBtn">
    <svg id="darkIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  </button>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script>
    function toggleDark() {
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
  </script> --}}
</body>
</html>
