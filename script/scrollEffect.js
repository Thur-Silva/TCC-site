// Efeitos da meia lua (mantém o que você já tinha)
window.addEventListener("scroll", () => {
  const moon = document.getElementById("half-moon");
  const scroll = window.scrollY;

  moon.style.height = `${900 + scroll * 1.02}px`;

  const percent = Math.min(scroll / 500, 1);
  const startColor = [37, 99, 235];
  const endColor = [96, 165, 250];
  const currentColor = startColor.map((start, i) => {
    return Math.round(start + (endColor[i] - start) * percent);
  });

  moon.style.background = `linear-gradient(to top right, rgb(${currentColor.join(",")}), #dbeafe)`;

  const initialPadding = 40;
  const newPadding = Math.max(initialPadding - scroll * 0.1, 0);
  moon.style.setProperty('--moon-padding', `${newPadding}px`);
});

// Header flutuante: aparece e desaparece ao scroll
let lastScrollTop = 0;
let header = null;

// Garante que o header foi carregado antes de aplicar evento
function activateHeaderScroll() {
  header = document.getElementById("site-header");

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScrollTop && currentScroll > 50) {
      // Scroll para baixo
      header.classList.add("hide");
    } else {
      // Scroll para cima
      header.classList.remove("hide");
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });
}

// Aguarda o header carregar via fetch
fetch("components/Header.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("header-placeholder").innerHTML = data;
    activateHeaderScroll(); // ativa depois que o header está no DOM
  });
