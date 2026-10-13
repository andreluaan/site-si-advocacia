/* Vídeo do hero (carregamento condicional) e título com movimento no scroll */
(() => {
  const video = $("#hv"),
    pauseButton = $("#vbtn");
  if (!video) return;
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches,
    connection = navigator.connection || {};
  if (
    matchMedia("(min-width:768px)").matches &&
    !reducedMotion &&
    !connection.saveData &&
    (!connection.effectiveType || connection.effectiveType === "4g")
  ) {
    ["webm", "mp4"].forEach((t) => {
      const s = document.createElement("source");
      s.src = video.dataset[t];
      s.type = "video/" + t;
      video.append(s);
    });
    video.lastChild.addEventListener("error", () => {
      video.remove();
      pauseButton.hidden = true;
    });
    video.addEventListener("playing", () => {
      video.classList.add("on");
      pauseButton.hidden = false;
    });
    pauseButton.onclick = () => {
      video.paused ? video.play() : video.pause();
      pauseButton.setAttribute("aria-pressed", video.paused);
    };
    video.load();
    const playPromise = video.play();
    if (playPromise && playPromise.catch) playPromise.catch(() => {});
  }
  /* Título sobe e some devagar com o scroll (1 atualização por quadro) */
  const title = $("#h1");
  if (title && !reducedMotion) {
    let waiting = false;
    const updateTitle = () => {
      const y = Math.min(scrollY, innerHeight);
      title.style.transform = `translate3d(0,${(y * 0.12).toFixed(1)}px,0)`;
      title.style.opacity = (1 - (y / innerHeight) * 0.6).toFixed(2);
      waiting = false;
    };
    addEventListener(
      "scroll",
      () => {
        if (!waiting) {
          waiting = true;
          requestAnimationFrame(updateTitle);
        }
      },
      { passive: true },
    );
  }
})();
