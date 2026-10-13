/* Fotos opcionais: usa a imagem se o arquivo existir em assets/img; senão mantém o espaço reservado */
(() => {
  document.querySelectorAll("[data-photo]").forEach((slot) => {
    const probe = new Image();
    probe.onload = () => {
      slot.style.backgroundImage = `url("${slot.dataset.photo}")`;
      slot.classList.add("has-photo");
      const hiddenSection = slot.closest("section[hidden]");
      if (hiddenSection) hiddenSection.hidden = false;
    };
    probe.src = slot.dataset.photo;
  });
})();
