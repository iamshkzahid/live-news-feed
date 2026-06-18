/* ============================================
   THEME.JS — Dark/Light Mode Toggle
   ============================================ */
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;
  
  // Check local storage for theme
  const currentTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
  toggleBtn.textContent = currentTheme === "light" ? "Dark" : "Light";

  toggleBtn.addEventListener("click", function () {
    const newTheme = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    toggleBtn.textContent = newTheme === "light" ? "Dark" : "Light";
  });
});
