window.addEventListener("scroll", () => {
  const moon = document.getElementById("half-moon");
  let scroll = window.scrollY;
  moon.style.height = `${300 + scroll * 1.2}px`;
});
