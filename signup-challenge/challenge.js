// Replace only this PUBLIC site key when hosting. Never put a secret here.
const SITE_KEY = "0x4AAAAAAFABaa6jYQvVsMVy";
const state = new URLSearchParams(location.hash.slice(1)).get("state");
// Remove transient state from browser history after reading it.
history.replaceState(null, "", location.pathname);
window.onTurnstileReady = () => {
  const status = document.getElementById("status");
  const link = document.getElementById("continue");
  if (!state || !/^[0-9a-f-]{36}$/.test(state) || SITE_KEY.startsWith("OWNER_")) {
    status.textContent = "Please return to the app and try again shortly.";
    return;
  }
  window.turnstile.render("#challenge", {
    sitekey: SITE_KEY, action: "signup", cData: state,
    callback: token => {
      link.href = "raidapp://signup#" + new URLSearchParams({ state, token });
      link.hidden = false;
      status.textContent = "Security check complete. Tap below to return to the app.";
    },
    "expired-callback": () => { link.hidden = true; link.removeAttribute("href"); status.textContent = "Security check expired. Please try again."; window.turnstile.reset(); },
    "error-callback": () => { link.hidden = true; link.removeAttribute("href"); status.textContent = "Please return to the app and try again shortly."; },
  });
};
