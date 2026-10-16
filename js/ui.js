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
/* botão de tema: alterna claro/escuro e guarda a escolha neste navegador */
const themeButton = $("#tg"),
  systemDark = matchMedia("(prefers-color-scheme: dark)");
const currentTheme = () =>
  document.documentElement.dataset.theme || (systemDark.matches ? "dark" : "light");
const syncThemeButton = () => {
  const dark = currentTheme() === "dark";
  themeButton.setAttribute("aria-pressed", dark);
  themeButton.setAttribute("aria-label", dark ? "Usar tema claro" : "Usar tema escuro");
  themeButton.title = themeButton.getAttribute("aria-label");
};
themeButton.onclick = () => {
  const next = currentTheme() === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("tema", next);
  } catch (_) {}
  syncThemeButton();
};
systemDark.addEventListener("change", syncThemeButton);
syncThemeButton();
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
/* reveal (.mask nasce 100% recortado e nunca "intersecta", por isso observamos o pai dele) */
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealObserver = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        const els = e.target.matches(".rv:not(.mask)") ? [e.target] : [];
        els.push(...e.target.querySelectorAll(":scope > .mask"));
        els.forEach((el) => {
          const position = [...el.parentElement.children].indexOf(el);
          el.style.transitionDelay = Math.min(position, 3) * 90 + "ms";
          el.classList.add("in");
        });
        revealObserver.unobserve(e.target);
      }
    }),
  { threshold: 0.12 },
);
$$(".rv, .mask").forEach((el) =>
  reducedMotion
    ? el.classList.add("in")
    : revealObserver.observe(el.classList.contains("mask") ? el.parentElement : el),
);
/* Dúvidas: abre e fecha com animação e mantém só uma resposta aberta por vez */
const faqItems = $$(".faq details");
const animateAnswer = (item, open) => {
  const answer = item.querySelector("p");
  item.dataset.state = open ? "open" : "closed";
  if (item.anim) item.anim.cancel();
  if (reducedMotion || !answer.animate) {
    item.open = open;
    return;
  }
  item.open = true;
  const closed = { height: "0px", paddingBottom: "0px", opacity: 0 },
    full = { height: answer.offsetHeight + "px", paddingBottom: getComputedStyle(answer).paddingBottom, opacity: 1 };
  answer.style.overflow = "hidden";
  item.anim = answer.animate(open ? [closed, full] : [full, closed], {
    duration: 300,
    easing: "cubic-bezier(0.2, 0.7, 0.2, 1)",
  });
  item.anim.onfinish = () => {
    answer.style.overflow = "";
    item.open = open;
    item.anim = null;
  };
};
faqItems.forEach((item) =>
  item.querySelector("summary").addEventListener("click", (e) => {
    e.preventDefault();
    const willOpen = item.dataset.state !== "open";
    if (willOpen)
      faqItems.forEach((other) => other !== item && other.open && animateAnswer(other, false));
    animateAnswer(item, willOpen);
  }),
);
/* Vindo de outra página com #seção: realinha depois que fotos e fontes carregam */
addEventListener("load", () => {
  const target = location.hash.length > 1 && document.getElementById(location.hash.slice(1));
  if (target) target.scrollIntoView({ behavior: "instant" });
});
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
