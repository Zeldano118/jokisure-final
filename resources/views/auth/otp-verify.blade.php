<!-- 5026231003 | Kanayya Shafa Amelia (kanayya shafa) -->

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>JokiSure • Verify Code</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="{{ asset('css/otp-verify.css') }}?v={{ filemtime(public_path('css/otp-verify.css')) }}">
  <link href="{{ asset('css/dark-mode.css') }}?v={{ filemtime(public_path('css/dark-mode.css')) }}" rel="stylesheet">
  <link rel="icon" type="image/png" href="{{ asset('assets/logo.png') }}">
</head>
<body class="preview-center">
  <script>
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark');
    }
  </script>
  <main class="device-frame" role="main" aria-label="OTP Verify">
    <div class="status-bar d-flex align-items-center justify-content-between px-3">
      <div class="time">9:41</div>
      <div class="status-icons d-flex align-items-center gap-2">
        <svg width="20" height="12" viewBox="0 0 20 12" fill="none"><rect x="1" y="7" width="2" height="4" rx="0.75" fill="#0a0a0a"/><rect x="5" y="5" width="2" height="6" rx="0.75" fill="#0a0a0a"/><rect x="9" y="3" width="2" height="8" rx="0.75" fill="#0a0a0a"/><rect x="13" y="1" width="2" height="10" rx="0.75" fill="#0a0a0a"/></svg>
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none"><path d="M9 9.5c.7 0 1.25.55 1.25 1.25S9.7 12 9 12 7.75 11.45 7.75 10.75 8.3 9.5 9 9.5z" fill="#0a0a0a"/><path d="M3 6.5c3.9-3.2 8.1-3.2 12 0" stroke="#0a0a0a" stroke-width="1.6" stroke-linecap="round"/><path d="M5.6 8c2.53-2.05 4.27-2.05 6.8 0" stroke="#0a0a0a" stroke-width="1.6" stroke-linecap="round"/></svg>
      </div>
    </div>

    <section class="safe-area container-fluid d-flex flex-column">
      <div class="row align-items-center g-0 pt-2 pb-2">
        <div class="col-2 d-flex justify-content-start ps-2">
          <a href="{{ route('signup') }}" class="btn-back" aria-label="Back">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="#0a0a0a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>
        <div class="col-8"></div><div class="col-2"></div>
      </div>

      <form method="POST" action="{{ route('otp.verify') }}">
        @csrf
      <div class="row">
        <div class="col-12 px-4">
          <h1 class="h4 fw-bold mb-2">Verify Code</h1>
          <p class="text-muted mb-3 small">Check your SMS message. We've sent you the code at
            <span class="text-dark fw-semibold">+62{{ session('signup.data.phone', '********0000') }}</span>
          </p>

          @if(session('signup.data'))
            <div class="alert alert-light border small mb-3">
              <div><strong>Username:</strong> {{ session('signup.data.username') }}</div>
              <div><strong>Email:</strong> {{ session('signup.data.email') }}</div>
              <div><strong>Phone:</strong> +62{{ session('signup.data.phone') }}</div>
            </div>
          @endif

          @if($errors->has('otp'))
            <div class="alert alert-danger small">{{ $errors->first('otp') }}</div>
          @endif
          @if(session('otp_code'))
            <div class="alert alert-info small">Demo OTP: <strong>{{ session('otp_code') }}</strong></div>
          @endif
        </div>
      </div>

      <div class="row">
        <div class="col-12 d-flex justify-content-center">
          <div class="otp-group" aria-label="Enter 4 digit code">
            <input type="text" inputmode="numeric" maxlength="1" name="d1" class="otp-input" aria-label="Digit 1">
            <input type="text" inputmode="numeric" maxlength="1" name="d2" class="otp-input" aria-label="Digit 2">
            <input type="text" inputmode="numeric" maxlength="1" name="d3" class="otp-input" aria-label="Digit 3">
            <input type="text" inputmode="numeric" maxlength="1" name="d4" class="otp-input" aria-label="Digit 4">
          </div>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-12 text-center">
          <span class="text-muted small">Send code</span>
          <a href="#" class="link-underline small ms-1">again</a>
          <br>
          <a href="{{ route('otp.demo.verify') }}" id="demoOTP" class="btn btn-link small mt-2">Demo: verify now (skip OTP)</a>
        </div>
      </div>

      <div class="flex-grow-1"></div>

      <div class="row">
        <div class="col-12 px-4">
          <input type="hidden" name="otp" id="otp-value">
          <button id="verifyCode" type="submit" class="btn btn-cta w-100">Verify Code</button>
        </div>
      </div>
      </form>

      <script>
        const inputs = document.querySelectorAll('.otp-input');
        const otpHidden = document.getElementById('otp-value');
        inputs.forEach((input, idx) => {
          input.addEventListener('input', () => {
            if (input.value.length === 1 && idx < inputs.length -1) inputs[idx+1].focus();
            otpHidden.value = Array.from(inputs).map(i=>i.value||'').join('');
          });
        });
      </script>
    </section>

    <div class="home-indicator" aria-hidden="true"></div>
  </main>

  <!-- Dark Mode Toggle -->
  <button class="dark-toggle" onclick="toggleDark()" id="darkToggleBtn">
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
  </script>
</body>
</html>
