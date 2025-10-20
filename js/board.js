
// js/board.js - simple per-user board using localStorage
document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const currentUser = localStorage.getItem("currentUser");
  const postForm = document.getElementById("post-form");
  const postList = document.getElementById("post-list");

  // load global posts (all users) for viewing
  const users = JSON.parse(localStorage.getItem("users")) || {};
  const allPosts = [];
  for (const uid in users) {
    const ups = users[uid].posts || [];
    ups.forEach(p => allPosts.push(p));
  }
  allPosts.sort((a,b)=> new Date(b.date) - new Date(a.date));
  if (postList) {
    postList.innerHTML = allPosts.map(p => 
      `<div class="post"><h4>${escapeHtml(p.title)}</h4><p>${escapeHtml(p.content)}</p><small>${p.author} | ${p.date}</small></div>`
    ).join('');
  }

  if (!postForm) return;

  if (!isLoggedIn) {
    postForm.innerHTML = '<p>로그인 후 게시글을 작성할 수 있습니다. <a href="auth/login.html">로그인</a></p>';
    return;
  }

  postForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("post-title").value.trim();
    const content = document.getElementById("post-content").value.trim();
    if (!title || !content) { alert("제목과 내용을 입력하세요."); return; }
    const users = JSON.parse(localStorage.getItem("users")) || {};
    const post = { title, content, author: currentUser, date: new Date().toISOString() };
    users[currentUser].posts = users[currentUser].posts || [];
    users[currentUser].posts.push(post);
    localStorage.setItem("users", JSON.stringify(users));
    // prepend to postList
    if (postList) {
      postList.insertAdjacentHTML('afterbegin', `<div class="post"><h4>${escapeHtml(post.title)}</h4><p>${escapeHtml(post.content)}</p><small>${post.author} | ${new Date(post.date).toLocaleString()}</small></div>`);
    }
    postForm.reset();
  });
});

function escapeHtml(str){ return String(str).replace(/[&<>"']/g, m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
