/* Mapa e formulário de contato */
/* mapa: só aparece (e só carrega) quando SITE.mapsEmbed está preenchido */
const map = $("#map");
if (SITE.mapsEmbed && map) {
  map.hidden = false;
  new IntersectionObserver((es, o) => {
    if (es[0].isIntersecting) {
      map.innerHTML =
        '<iframe loading="lazy" title="Mapa com a localização do escritório em Patos-PB" src="' +
        SITE.mapsEmbed +
        '"></iframe>';
      o.disconnect();
    }
  }).observe(map);
}
/* formulário */
const wp = $("#wp"),
  pageLoadedAt = Date.now();
wp.addEventListener("input", () => {
  let d = wp.value.replace(/\D/g, "").slice(0, 11);
  wp.value =
    d.length > 6
      ? `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
      : d.length > 2
        ? `(${d.slice(0, 2)}) ${d.slice(2)}`
        : d;
});
const setError = (id, message) => {
  $("#e-" + id).textContent = message;
  $("#" + id).setAttribute("aria-invalid", !!message);
};
$("#f").addEventListener("submit", (e) => {
  e.preventDefault();
  const nm = $("#nm").value.trim(),
    checks = [
      ["nm", nm.length < 3, "Escreva o seu nome."],
      [
        "wp",
        wp.value.replace(/\D/g, "").length < 10,
        "Confira o número: coloque o DDD e o número, por exemplo (83) 99999-9999.",
      ],
      ["lg", !$("#lg").checked, "Marque a caixinha acima para podermos responder você."],
    ];
  checks.forEach(([id, bad, message]) => setError(id, bad ? message : ""));
  const firstInvalid = $("[aria-invalid=true]");
  if (firstInvalid) {
    firstInvalid.focus();
    return;
  }
  // anti-spam: campo invisível preenchido ou envio instantâneo
  if ($("#hp").value || Date.now() - pageLoadedAt < 2000) return;
  const area = $("#ar").value,
    note = $("#ms").value.trim(),
    txt = `Olá! Meu nome é ${nm}. Assunto: ${area}. Meu WhatsApp: ${wp.value}.${note ? " " + note : ""}`;
  // abre o WhatsApp antes de qualquer espera, senão o navegador bloqueia a nova aba
  window.open(buildWhatsAppLink({ texto: txt }), "_blank", "noopener");
  if (SITE.formEndpoint) {
    fetch(SITE.formEndpoint, {
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: nm, whatsapp: wp.value, area, mensagem: note }),
    }).catch(() => {});
  }
  trackEvent("form_submit");
  $("#st").textContent =
    "Pronto! O WhatsApp abriu em outra aba com a sua mensagem. Toque em enviar para concluir.";
});
