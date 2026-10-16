/* Vídeo do hero: só carrega se SITE.heroVideo estiver preenchido (evita erros 404 no console) */
(() => {
  const video = $("#hv"),
    pauseButton = $("#vbtn");
  if (!video) return;
  const sources = SITE.heroVideo,
    reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches,
    connection = navigator.connection || {};
  const canPlay =
    sources &&
    matchMedia("(min-width:768px)").matches &&
    !reducedMotion &&
    !connection.saveData &&
    (!connection.effectiveType || connection.effectiveType === "4g");
  if (!canPlay) {
    video.remove();
    return;
  }
  ["webm", "mp4"].forEach((t) => {
    if (!sources[t]) return;
    const s = document.createElement("source");
    s.src = sources[t];
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
    pauseButton.textContent = video.paused ? "Continuar vídeo" : "Pausar vídeo";
  };
  video.load();
  const playPromise = video.play();
  if (playPromise && playPromise.catch) playPromise.catch(() => {});
})();
