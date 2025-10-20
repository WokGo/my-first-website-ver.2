
// js/header.js - update header UI based on login state
document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const currentUser = localStorage.getItem("currentUser") || "";

  // elements may be in header fragment - use querySelector across document
  const loginBtn = document.querySelector("#login-btn");
  const logoutBtn = document.querySelector("#logout-btn");
  const signupBtn = document.querySelector("#signup-btn");
  const userLabel = document.querySelector("#user-label");

  if (isLoggedIn && currentUser) {
    if (loginBtn) loginBtn.style.display = "none";
    if (signupBtn) signupBtn.style.display = "none";
    if (logoutBtn) { logoutBtn.style.display = "inline-block"; }
    if (userLabel) userLabel.textContent = currentUser + "님";
  } else {
    if (loginBtn) loginBtn.style.display = "inline-block";
    if (signupBtn) signupBtn.style.display = "inline-block";
    if (logoutBtn) logoutBtn.style.display = "none";
    if (userLabel) userLabel.textContent = "";
  }
});
