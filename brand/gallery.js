const button = document.getElementById("theme");
button.addEventListener("click", () => {
  const dark = document.documentElement.dataset.theme !== "dark";
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  button.setAttribute("aria-pressed", String(dark));
  button.textContent = dark ? "Light canvas" : "Dark canvas";
});
