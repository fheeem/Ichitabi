// admin.js

const pages = document.querySelectorAll('.page');
const pageBtns = document.querySelectorAll('.page-btn');

$(function () {
  $('#header').load('../components/header_admin.html', function () {
    let isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const isLoggedInBoolean = isLoggedIn === 'true';

    if (isLoggedInBoolean) {
      document.getElementById('log-out').style.display = 'block';
    } else {
      alert('접근 권한이 없는 페이지 입니다!');
      window.location.href = '../index.html';
    }

    const logoutBtn = document.getElementById('log-out');

    logoutBtn.addEventListener('click', () => {
      sessionStorage.setItem('isLoggedIn', 'false');
      window.location.href = '../index.html';
    });
  });
  $('#footer').load('../components/footer.html');
});

pages.forEach((page) => {
  page.addEventListener('click', () => {
    pages.forEach((p) => p.classList.remove('active'));
    page.classList.add('active');
  });
});

pageBtns.forEach((page) => {
  page.addEventListener('click', () => {
    pageBtns.forEach((p) => p.classList.remove('active'));
    page.classList.add('active');
  });
});
