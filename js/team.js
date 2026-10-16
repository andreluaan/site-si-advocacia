/* Cards da equipe (dados em site.js). Roda antes do core.js, por isso não usa $ */
(() => {
  const g = document.getElementById("team");
  if (!g) return;
  g.innerHTML = SITE.team
    .map(
      (m, i) =>
        `<article class="mem rv"><div class="ph mask" data-photo="${m.photo || "assets/img/equipe-" + (i + 1) + ".webp"}" role="img" aria-label="Foto de ${m.name}"></div><h2>${m.name}</h2><p class="oabl">${m.oab}</p><p class="ar">${m.areas.join(" · ")}</p><p>${m.bio}</p><a class="btn wa" data-pos="team" data-msg="Olá! Gostaria de falar com ${m.name}." href="#"><svg class="ico"><use href="#wa"/></svg>Falar no WhatsApp</a></article>`,
    )
    .join("");
})();
