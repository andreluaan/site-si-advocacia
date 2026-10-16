/* Utilitários, WhatsApp e preenchimento de dados */
const $ = (s, r = document) => r.querySelector(s),
  $$ = (s, r = document) => [...r.querySelectorAll(s)];
const trackEvent = (e, p) => {
  try {
    if (localStorage.getItem("ck") === "1") {
      (window.dataLayer = window.dataLayer || []).push({ event: e, ...p });
    }
  } catch (_) {}
};
/* WhatsApp */
function buildWhatsAppLink({ area, texto } = {}) {
  const n = "55" + SITE.phone.replace(/\D/g, "").replace(/^0+/, "");
  const m = texto || "Olá! Gostaria de atendimento" + (area ? " sobre " + area : "") + ".";
  return "https://wa.me/" + n + "?text=" + encodeURIComponent(m);
}
$$("a.wa").forEach((a) => {
  a.href = buildWhatsAppLink({ area: a.dataset.area, texto: a.dataset.msg });
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.addEventListener("click", () => trackEvent("click_whatsapp", { position: a.dataset.pos }));
});
$$("[data-ev]").forEach((a) => a.addEventListener("click", () => trackEvent(a.dataset.ev)));
/* dados */
const getByPath = (p) => p.split(".").reduce((o, k) => o && o[k], SITE);
$$("[data-s]").forEach((el) => {
  const k = el.dataset.s;
  const v = k === "addr" ? SITE.address : k === "mail" ? SITE.email : getByPath(k);
  el.textContent = v;
  if (k === "mail" && !/\[/.test(v)) el.href = "mailto:" + v;
});
($("#mapl") || {}).href =
  SITE.mapsUrl ||
  "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("R. do Prado, 981, Liberdade, Patos, PB");
$("#yr").textContent = new Date().getFullYear();

/* unidades e redes sociais (vêm de site.js) */
$$("[data-offices]").forEach(
  (el) =>
    (el.innerHTML = SITE.offices
      .map((o) => `<li><b>${o.city} – ${o.uf}</b><br>${o.addr}</li>`)
      .join("")),
);
const SOCIAL_ICONS = {
  Instagram:
    '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6"/>',
  Facebook: '<path d="M14 8h2V5h-2a3 3 0 0 0-3 3v2H9v3h2v6h3v-6h2l1-3h-3V8z"/>',
};
$$("[data-social]").forEach((el) => {
  const iconOnly = el.dataset.social === "icon"; // header/menu: só o ícone
  el.innerHTML = Object.entries(SITE.social)
    .map(
      ([n, u]) =>
        `<a href="${u}" data-net="${n}"${iconOnly ? ` aria-label="${n}" title="${n}"` : ""} target="_blank" rel="noopener noreferrer"><svg class="ico" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">${SOCIAL_ICONS[n] || ""}</svg>${iconOnly ? "" : n}</a>`,
    )
    .join("");
  $$("a", el).forEach((a) =>
    a.addEventListener("click", () => trackEvent("click_social", { network: a.dataset.net })),
  );
});
