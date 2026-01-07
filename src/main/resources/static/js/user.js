// user.js
try {
  const submitBtn = document.querySelector('.submitBtn');
  const maleBtn = document.querySelector('.male-Btn');
  const femaleBtn = document.querySelector('.female-Btn');

  const emailInput = document.getElementById('email');
  const pwInput = document.getElementById('password');
  const rePwInput = document.getElementById('re-password');
  const togglePassword = document.getElementById('togglePassword');
  const toggleRePassword = document.getElementById('toggleRePassword');
  const nameInput = document.getElementById('name');
  const birthInput = document.getElementById('birth-date');
  const agreeCheckbox = document.getElementById('agree');

  let selectedGender = null;

  maleBtn.addEventListener('click', () => {
    selectedGender = 'male';
    maleBtn.classList.add('selected');
    femaleBtn.classList.remove('selected');
  });

  femaleBtn.addEventListener('click', () => {
    selectedGender = 'female';
    maleBtn.classList.remove('selected');
    femaleBtn.classList.add('selected');
  });

  function isVaildEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  togglePassword.addEventListener('click', () => {
    const isHidden = pwInput.type === 'password';
    pwInput.type = isHidden ? 'text' : 'password';

    if (isHidden) {
      togglePassword.classList.remove('isHidden');
      togglePassword.classList.add('visible');
    } else {
      togglePassword.classList.remove('visible');
      togglePassword.classList.add('hidden');
    }
  });

  toggleRePassword.addEventListener('click', () => {
    const isHidden = rePwInput.type === 'password';
    rePwInput.type = isHidden ? 'text' : 'password';
    if (isHidden) {
      toggleRePassword.classList.remove('Hidden');
      toggleRePassword.classList.add('visible');
    } else {
      toggleRePassword.classList.remove('visible');
      toggleRePassword.classList.add('hidden');
    }
  });

  submitBtn.addEventListener('click', () => {
    const email = emailInput.value.trim();
    const password = pwInput.value.trim();
    const rePassword = rePwInput.value.trim();
    const nickname = nameInput.value.trim();
    const birth = birthInput.value.trim();

    if (!email || !password || !rePassword || !nickname || !birth) {
      alert('모든 입력 칸을 채워주세요.');
      return;
    }
    if (!isVaildEmail(email)) {
      alert('올바른 이메일 형식을 입력해주세요.');
      return;
    }
    function isStrongPassword(password) {
      const lengthCheck = password.length >= 8;
      const hasLatter = /[a-zA-Z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      return lengthCheck && hasLatter && hasNumber && hasSpecial;
    }
    if (!isStrongPassword(password)) {
      alert('비밀번호는 8자 이상, 영문/숫자/특수문자를 포함해야합니다.');
      pwInput.focus();
      return;
    }
    if (password !== rePassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (nickname.length < 4) {
      alert('닉네임은 4글자 이상이어야 합니다.');
      return;
    }
    if (!selectedGender) {
      alert('성별을 선택해주세요.');
      return;
    }
    if (!/^\d{8}$/.test(birth)) {
      alert('생년월일은 8자리 숫자로 입력해주세요.(예:19990101)');
      birthInput.focus();
      return;
    }
    if (!agreeCheckbox.checked) {
      alert('개인정보 수집 동의에 체크해주세요.');
      return;
    }
    alert('회원가입이 완료되었습니다!');
  });
} catch (e) {
  console.warn(
    '회원가입 요소가 없어서 회원가입 이벤트 등록을 생략했습니다.',
    e
  );
}
//-----------------로그인js---------------------------------

try {
  //페이지 진입 시 저장된 아이디 자동 입력
  const savedId = localStorage.getItem('savedId');
  if (savedId) {
    loginIdInput.value = savedId;
    saveIdCheckbox.checked = true;
  }
} catch (e) {
  console.warn('로그인 오류 발생', e);
}

//모달 창-----------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  const loginBtn = document.querySelector('.loginBtn');
  const loginIdInput = document.getElementById('login-id');
  const loginPwInput = document.getElementById('login-password');
  const saveIdCheckbox = document.getElementById('save-id');
  const emailErrorDiv = document.getElementById('email-error');
  const pwErrorDiv = document.getElementById('pw-error');

  // userType : 0 - admin, 1 - user
  const userType = {
    0: 'admin',
    1: 'user',
  };

  //저장된 아이디 자동입력
  const savedId = localStorage.getItem('savedId');
  if (savedId) {
    loginIdInput.value = savedId;
    saveIdCheckbox.checked = true;
  }
  //유효성 검사 함수
  function isVaildEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  //이메일 입력 검사
  loginIdInput.addEventListener('blur', () => {
    const value = loginIdInput.value.trim();
    emailErrorDiv.textContent = '';
    loginIdInput.classList.remove('input-error');
    if (!value) {
      emailErrorDiv.textContent = '이메일을 입력해주세요.';
      loginIdInput.classList.add('input-error');
    } else if (!isVaildEmail(value)) {
      emailErrorDiv.textContent = '잘못된 이메일 형식입니다.';
      loginIdInput.classList.add('input-error');
    }
  });

  //비밀번호 검사
  loginPwInput.addEventListener('blur', () => {
    const value = loginPwInput.value.trim();
    pwErrorDiv.textContent = '';
    loginPwInput.classList.remove('input-error');
    if (!value) {
      pwErrorDiv.textContent = '비밀번호를 입력해주세요.';
      loginPwInput.classList.add('input-error');
    } else if (value.length < 8) {
      pwErrorDiv.textContent = '비밀번호를 8자 이상 입력해주세요.';
      loginPwInput.classList.add('input-error');
    }
  });

  //로그인처리
  loginBtn.addEventListener('click', async function () {
    const userId = loginIdInput.value.trim();
    const userPw = loginPwInput.value.trim();
    const saveIdChecked = saveIdCheckbox.checked;

    if (!userId && !userPw) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }
    if (!userId) {
      alert('이메일을 입력해주세요.');
      return;
    }
    if (!userPw) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    const account = await getAccount(userId);

    if (!account) {
      alert('존재하지 않는 이메일입니다.');
      return;
    }

    if (account.pw !== userPw) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    //로그인 성공 시 아이디 저장 처리
    if (saveIdChecked) {
      localStorage.setItem('savedId', userId);
    } else {
      localStorage.removeItem('savedId');
    }
    sessionStorage.setItem('isLoggedIn', 'true');
    alert(`로그인 성공! ${account.nickname}님 환영합니다!`);
    if (userType[account.type] === 'admin') {
      window.location.href = '../admin/admin.html';
    } else {
      window.location.href = '../index.html';
    }
  });

  //모달관련
  const openModalBtn = document.getElementById('open-modal');
  const modal = document.getElementById('pw-modal');
  const closeModalBtn = document.getElementById('close-modal');

  openModalBtn.addEventListener('click', function (e) {
    e.preventDefault();
    modal.style.display = 'flex';
  });

  closeModalBtn.addEventListener('click', function () {
    modal.style.display = 'none';
  });

  // 배경 클릭 시 닫기
  window.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});

async function getAccount(inputId) {
  const users = await getUsers();
  const account = users.find((acc) => acc.email === inputId);

  return account;
}

function getUsers() {
  return fetch('../resources/data/user.json').then((res) => {
    return res.json();
  });
}
