/* "Qual é a sua situação?": cada botão abre um painel com os documentos e o WhatsApp do assunto */
(() => {
  const root = document.getElementById("situacao");
  if (!root) return;
  const choose = root.querySelector(".sit-choose");
  const panelBox = root.querySelector(".sit-panels");

  choose.innerHTML = SITE.situations
    .map(
      (s) =>
        `<button type="button" class="sit-btn" data-id="${s.id}" aria-pressed="false" aria-controls="sit-${s.id}"><b>${s.title}</b><span>${s.hint}</span><i aria-hidden="true">→</i></button>`,
    )
    .join("");

  panelBox.innerHTML = SITE.situations
    .map(
      (s) => `<article class="sit-panel" id="sit-${s.id}">
        <h3>${s.title}</h3>
        <p>${s.text}</p>
        <h4>O que levar na primeira conversa</h4>
        <ul>${s.docs.map((d) => `<li>${d}</li>`).join("")}</ul>
        <a class="btn wa" data-pos="situacao" data-msg="${s.msg}" href="#"><svg class="ico"><use href="#wa"/></svg>Falar no WhatsApp sobre isso</a>
      </article>`,
    )
    .join("");

  const buttons = [...choose.querySelectorAll(".sit-btn")];
  const panels = [...panelBox.querySelectorAll(".sit-panel")];
  const select = (id) => {
    buttons.forEach((b) => b.setAttribute("aria-pressed", b.dataset.id === id));
    // os painéis ficam empilhados no mesmo lugar e trocam com fade (sem a página pular)
    panels.forEach((p) => {
      const active = p.id === "sit-" + id;
      p.classList.toggle("on", active);
      p.inert = !active;
      p.setAttribute("aria-hidden", !active);
    });
  };
  // no celular o painel fica abaixo dos botões: rolamos até ele para a pessoa ver a resposta
  const stacked = matchMedia("(max-width: 899px)");
  choose.addEventListener("click", (e) => {
    const button = e.target.closest(".sit-btn");
    if (!button) return;
    select(button.dataset.id);
    if (stacked.matches) document.getElementById("sit-" + button.dataset.id).scrollIntoView({ block: "start" });
  });
  select(SITE.situations[0].id);
})();
