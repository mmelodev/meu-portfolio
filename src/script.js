document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".btn-header");

  buttons.forEach((button) => {
    const video = button.querySelector(".btn-video");

    // Pré-carrega o vídeo
    video.load();

    button.addEventListener("mouseenter", function () {
      video.currentTime = 0; // Reinicia o vídeo
      video.play().catch((e) => console.log("Erro ao reproduzir:", e));
    });

    button.addEventListener("mouseleave", function () {
      video.pause();
    });
  });
});
