/* Header, menu, reveal e parallax */
/* header + flutuante */
const header = $("#hd"),
  floatButton = $("#fl"),
  hero = $(".hero") || { offsetHeight: 300 };
const onScroll = () => {
  header.classList.toggle("solid", scrollY > 40);
  floatButton.classList.toggle("on", scrollY > hero.offsetHeight * 0.7);
};
addEventListener("scroll", onScroll, { passive: true });
onScroll();
/* menu mobile com focus trap */
const menuPanel = $("#mp"),
  menuButton = $("#mbtn");
function toggleMenu(o) {
  menuPanel.hidden = !o;
  menuButton.setAttribute("aria-expanded", o);
  document.body.style.overflow = o ? "hidden" : "";
  (o ? $("#mx") : menuButton).focus();
}
menuButton.onclick = () => toggleMenu(true);
$("#mx").onclick = () => toggleMenu(false);
$$("a", menuPanel).forEach((a) => (a.onclick = () => toggleMenu(false)));
addEventListener("keydown", (e) => {
  if (menuPanel.hidden) return;
  if (e.key === "Escape") toggleMenu(false);
  if (e.key === "Tab") {
    const f = $$("button,a", menuPanel),
      a = f[0],
      z = f[f.length - 1];
    if (e.shiftKey && document.activeElement === a) {
      e.preventDefault();
      z.focus();
    } else if (!e.shiftKey && document.activeElement === z) {
      e.preventDefault();
      a.focus();
    }
  }
});
/* reveal */
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealObserver = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        const position = [...e.target.parentElement.children].indexOf(e.target);
        e.target.style.transitionDelay = Math.min(position, 3) * 90 + "ms";
        e.target.classList.add("in");
        revealObserver.unobserve(e.target);
      }
    }),
  { threshold: 0.12 },
);
$$(".rv").forEach((el) => (reducedMotion ? el.classList.add("in") : revealObserver.observe(el)));
/* parallax (desativado em mobile e com movimento reduzido) */
if (!reducedMotion && matchMedia("(min-width:768px)").matches) {
  const layers = $$("[data-px]").map((el) => ({
    el,
    box: el.parentElement,
    v: false,
    k: +el.dataset.px,
  }));
  const layerObserver = new IntersectionObserver((es) =>
    es.forEach((e) =>
      layers.forEach((p) => {
        if (p.box === e.target) p.v = e.isIntersecting;
      }),
    ),
  );
  layers.forEach((p) => layerObserver.observe(p.box));
  let t = 0;
  const onParallaxScroll = () => {
    if (!t) {
      t = 1;
      requestAnimationFrame(() => {
        t = 0;
        layers.forEach((p) => {
          if (p.v) {
            const r = p.box.getBoundingClientRect();
            p.el.style.transform = "translate3d(0," + (-r.top * p.k).toFixed(1) + "px,0)";
          }
        });
      });
    }
  };
  addEventListener("scroll", onParallaxScroll, { passive: true });
}

/* esconde o botão flutuante enquanto a faixa de CTA ou o contato estão na tela */
const sectionsWithOwnButton = $$(".cta, #contato");
if (sectionsWithOwnButton.length) {
  const visibleSections = new Set();
  const floatObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) =>
      e.isIntersecting ? visibleSections.add(e.target) : visibleSections.delete(e.target),
    );
    floatButton.classList.toggle("away", visibleSections.size > 0);
  });
  sectionsWithOwnButton.forEach((section) => floatObserver.observe(section));
}
