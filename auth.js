
// js/auth.js - localStorage based auth with SHA-256 password hashing

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2,'0')).join('');
}

async function signup(event) {
  event.preventDefault();
  const id = document.getElementById("signup-id").value.trim();
  const pw = document.getElementById("signup-password").value.trim();
  if (!id || !pw) { alert("아이디와 비밀번호를 입력하세요."); return; }
  const users = JSON.parse(localStorage.getItem("users")) || {};
  if (users[id]) { alert("이미 존재하는 아이디입니다."); return; }
  const hashed = await hashPassword(pw);
  users[id] = { password: hashed, posts: [] };
  localStorage.setItem("users", JSON.stringify(users));
  alert("회원가입 성공! 로그인 페이지로 이동합니다.");
  // if signup page is under /auth/, go to login relative
  const cur = window.location.pathname;
  if (cur.includes("/auth/")) {
    window.location.href = "login.html";
  } else {
    window.location.href = "auth/login.html";
  }
}

async function login(event) {
  event.preventDefault();
  const id = document.getElementById("login-id").value.trim();
  const pw = document.getElementById("login-password").value.trim();
  const users = JSON.parse(localStorage.getItem("users")) || {};
  if (!users[id]) { alert("존재하지 않는 아이디입니다."); return; }
  const hashed = await hashPassword(pw);
  if (users[id].password !== hashed) { alert("비밀번호가 틀립니다."); return; }
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("currentUser", id);
  alert(id + "님 환영합니다!");
  // redirect to index (consider relative path)
  const cur = window.location.pathname;
  if (cur.includes("/auth/")) {
    window.location.href = "../index.html";
  } else {
    window.location.href = "index.html";
  }
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");
  const cur = window.location.pathname;
  if (cur.includes("/auth/")) {
    window.location.href = "../index.html";
  } else {
    window.location.href = "index.html";
  }
}
