document.addEventListener('DOMContentLoaded', () => {
    // 모바일 메뉴 토글
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // 컨택트 폼 제출 처리
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 로그인 상태 확인 (로그인 필요 시 모달 열기)
            const auth = getAuth();
            if (!auth) {
                alert('메시지 전송을 위해 로그인이 필요합니다.');
                showLoginModal();
                return;
            }
            
            // 폼 데이터 수집
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // 폼 제출 메시지 (실제로는 서버로 전송해야 함)
            alert('메시지가 전송되었습니다!\n\n' + 
                  `이름: ${formData.name}\n` +
                  `이메일: ${formData.email}\n` +
                  `메시지: ${formData.message}`);
            
            // 폼 초기화
            contactForm.reset();
        });
    }

    // --- 로그인 / 로그아웃 기능 추가 ---
    const AUTH_KEY = 'authUser';
    const loginBtn = document.querySelector('.btn-login');
    const logoutBtn = document.querySelector('.btn-logout');
    const userDisplay = document.querySelector('.user-display');
    const loginModal = document.getElementById('login-modal');
    const loginForm = document.getElementById('login-form');

    function getAuth() {
        const raw = localStorage.getItem(AUTH_KEY);
        return raw ? JSON.parse(raw) : null;
    }

    function setAuth(user) {
        localStorage.setItem(AUTH_KEY, JSON.stringify(user));
        renderAuthUI();
    }

    function clearAuth() {
        localStorage.removeItem(AUTH_KEY);
        renderAuthUI();
    }

    function renderAuthUI() {
        const user = getAuth();
        if (user) {
            if (loginBtn) loginBtn.style.display = 'none';
            if (logoutBtn) logoutBtn.style.display = 'inline-block';
            if (userDisplay) userDisplay.textContent = `안녕하세요, ${user.name}`;
        } else {
            if (loginBtn) loginBtn.style.display = 'inline-block';
            if (logoutBtn) logoutBtn.style.display = 'none';
            if (userDisplay) userDisplay.textContent = '';
        }
        // 닫기 가능한 모달이 열려 있으면 닫기
        if (loginModal && loginModal.classList.contains('open') && getAuth()) {
            hideLoginModal();
        }
    }

    function showLoginModal() {
        if (loginModal) loginModal.classList.add('open');
    }

    function hideLoginModal() {
        if (loginModal) loginModal.classList.remove('open');
        if (loginForm) loginForm.reset();
    }

    // 로그인 버튼 (네비게이션 등) 클릭
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showLoginModal();
        });
    }

    // 로그아웃 처리
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            clearAuth();
            alert('로그아웃되었습니다.');
        });
    }

    // 로그인 폼 제출 처리 (데모: 간단 검증, 실제로는 서버 호출)
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('login-name').value.trim();
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value;

            if (!email || !password) {
                alert('이메일과 비밀번호를 입력해주세요.');
                return;
            }

            // 데모용: 실제 서비스에서는 서버에 자격 증명 전송 후 토큰/세션을 받아 저장해야 함
            // 예: fetch('/api/login', { method: 'POST', body: JSON.stringify({email,password}) })
            const token = btoa(`${email}:${Date.now()}`); // 데모 토큰
            const user = { name: name || email.split('@')[0], email, token };
            setAuth(user);
            hideLoginModal();
            alert(`${user.name}님, 로그인되었습니다.`);
        });
    }

    // 모달 닫기(간단: 모달 배경 클릭 시 닫기)
    if (loginModal) {
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) hideLoginModal();
        });
    }

    // 초기 UI 렌더
    renderAuthUI();
});
