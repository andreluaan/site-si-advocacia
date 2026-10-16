/* Fotos: usa a imagem de assets/img se o arquivo existir; se faltar, some com o espaço da foto.
   A seção "O escritório" começa visível para a página não "pular" depois que as fotos carregam. */
(() => {
  document.querySelectorAll("[data-photo]").forEach((slot) => {
    const probe = new Image();
    probe.onload = () => {
      slot.style.backgroundImage = `url("${slot.dataset.photo}")`;
      slot.classList.add("has-photo");
    };
    probe.onerror = () => {
      if (!slot.classList.contains("shot")) return;
      slot.remove();
      const section = document.getElementById("escritorio");
      if (section && !section.querySelector(".shot")) section.hidden = true;
    };
    probe.src = slot.dataset.photo;
  });
})();
