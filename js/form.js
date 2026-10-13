/* Mapa e formulário de contato */
/* mapa lazy */
if (SITE.mapsEmbed) {
  new IntersectionObserver((es, o) => {
    if (es[0].isIntersecting) {
      $("#map").innerHTML =
        '<iframe loading="lazy" title="Mapa com a localização do escritório em Patos-PB" src="' +
        SITE.mapsEmbed +
        '"></iframe>';
      o.disconnect();
    }
  }).observe($("#map"));
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
$("#f").addEventListener("submit", async (e) => {
  e.preventDefault();
  const set = (id, m) => {
    $("#e-" + id).textContent = m;
    const i = $("#" + { nm: "nm", wp: "wp", lg: "lg" }[id]);
    i.setAttribute("aria-invalid", !!m);
  };
  let ok = true;
  const nm = $("#nm").value.trim();
  if (nm.length < 3) {
    set("nm", "Informe seu nome completo.");
    ok = false;
  } else set("nm", "");
  if (wp.value.replace(/\D/g, "").length < 10) {
    set("wp", "Informe o WhatsApp com DDD, por exemplo (83) 99999-9999.");
    ok = false;
  } else set("wp", "");
  if (!$("#lg").checked) {
    set("lg", "Para enviar, marque a concordância com a Política de Privacidade.");
    ok = false;
  } else set("lg", "");
  if (!ok) {
    $("[aria-invalid=true]").focus();
    return;
  }
  if ($("#hp").value || Date.now() - pageLoadedAt < 3000) return;
  const area = $("#ar").value,
    txt = `Olá! Meu nome é ${nm}. Área de interesse: ${area}. WhatsApp: ${wp.value}. ${$("#ms").value.trim()}`;
  const statusEl = $("#st");
  statusEl.textContent = "Enviando…";
  if (SITE.formEndpoint) {
    try {
      await fetch(SITE.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nm, whatsapp: wp.value, area, mensagem: $("#ms").value }),
      });
    } catch (_) {}
  }
  trackEvent("form_submit");
  window.open(buildWhatsAppLink({ texto: txt }), "_blank", "noopener");
  statusEl.textContent = "Pronto! Abrimos o WhatsApp para você concluir o envio.";
});
