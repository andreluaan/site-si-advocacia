/* Banner de cookies (LGPD) */
/* cookies */
const cookieBanner = $("#ck");
let savedChoice = null;
try {
  savedChoice = localStorage.getItem("ck");
} catch (_) {}
if (savedChoice === null) {
  cookieBanner.hidden = false;
  document.body.classList.add("cb");
}
$$("[data-c]", cookieBanner).forEach(
  (b) =>
    (b.onclick = () => {
      try {
        localStorage.setItem("ck", b.dataset.c);
      } catch (_) {}
      cookieBanner.hidden = true;
      document.body.classList.remove("cb");
    }),
);
