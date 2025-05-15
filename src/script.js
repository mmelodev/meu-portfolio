document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".btn-header");

  buttons.forEach((button) => {
    const video = button.querySelector(".btn-video");

    video.load();

    button.addEventListener("mouseenter", function () {
      video.currentTime = 0;
      video.play().catch((e) => console.log("Erro ao reproduzir:", e));
    });

    button.addEventListener("mouseleave", function () {
      video.pause();
    });
  });
});

document.querySelectorAll(".carousel").forEach((carousel, i) => {
  const items = carousel.querySelectorAll(".item");
  const dotsContainer = carousel.parentElement.querySelector(".dots");

  items.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.dataset.index = index;
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll(".dot");

  function showItem(index) {
    items.forEach((item, idx) => {
      item.classList.toggle("active", idx === index);
      dots[idx].classList.toggle("active", idx === index);
    });
  }

  carousel.parentElement.querySelector(".prev").addEventListener("click", () => {
    let index = [...items].findIndex((item) => item.classList.contains("active"));
    showItem((index - 1 + items.length) % items.length);
  });

  carousel.parentElement.querySelector(".next").addEventListener("click", () => {
    let index = [...items].findIndex((item) => item.classList.contains("active"));
    showItem((index + 1) % items.length);
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      let index = parseInt(dot.dataset.index);
      showItem(index);
    });
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const stacks = document.querySelectorAll(".stack");

  stacks.forEach((stack) => {
    const particlesContainer = stack.querySelector(".particles-container");
    const particleCount = Math.floor(stack.clientWidth / 10);

    function initParticles() {
      particlesContainer.innerHTML = "";
      for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
      }
    }

    function createParticle(container) {
      const particle = document.createElement("div");
      particle.className = "particle";

      const size = Math.random() * 3 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;

      container.appendChild(particle);
      animateParticle(particle, container);
    }

    function animateParticle(particle, container) {
      const duration = Math.random() * 10 + 10;
      const endX = `${Math.random() * 100}%`;
      const endY = `${Math.random() * 100}%`;

      particle.style.transition = "none";
      particle.style.opacity = "0";
      particle.style.transform = "translate(-50%, -50%) scale(0)";

      void particle.offsetWidth;

      particle.style.transition = `all ${duration}s linear`;
      particle.style.opacity = (Math.random() * 0.5 + 0.1).toFixed(2);
      particle.style.transform = "translate(-50%, -50%) scale(1)";
      particle.style.left = endX;
      particle.style.top = endY;

      setTimeout(() => {
        particle.style.transition = "none";
        particle.style.opacity = "0";
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        animateParticle(particle, container);
      }, duration * 1000);
    }

    stack.addEventListener("mousemove", (e) => {
      const rect = stack.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      createInteractiveParticle(particlesContainer, x, y);
    });

    function createInteractiveParticle(container, x, y) {
      const particle = document.createElement("div");
      particle.className = "particle interactive";
      particle.style.width = `${Math.random() * 4 + 2}px`;
      particle.style.height = particle.style.width;
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      particle.style.opacity = "0.8";
      particle.style.backgroundColor = "rgba(255, 255, 255, 0.9)";

      container.appendChild(particle);

      setTimeout(() => {
        particle.style.transition = "all 1.5s ease-out, opacity 1.5s ease-in";
        particle.style.left = `${x + (Math.random() * 20 - 10)}%`;
        particle.style.top = `${y + (Math.random() * 20 - 10)}%`;
        particle.style.opacity = "0";

        setTimeout(() => particle.remove(), 1500);
      }, 10);
    }

    initParticles();
  });

  window.addEventListener("resize", () => {
    document.querySelectorAll(".stack").forEach((stack) => {
      const particlesContainer = stack.querySelector(".particles-container");
      particlesContainer.innerHTML = "";
      const particleCount = Math.floor(stack.clientWidth / 10);
      for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
      }
    });
  });
});
