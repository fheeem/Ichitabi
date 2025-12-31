// review_detail.js

import reviews from '../resources/data/reviews.js';

const likeBtn = document.getElementById('like-btn');
const likeCount = document.getElementById('like-count');
let count = 0;

likeBtn.addEventListener('click', () => {
  likeBtn.classList.toggle('on');
  if (likeBtn.classList.contains('on')) {
    likeCount.innerHTML = ++count;
  } else {
    likeCount.innerHTML = --count;
  }
});

const nameEl = document.getElementById('name');
const hashtagEl = document.getElementById('hashtag');
const photeLeftEl = document.querySelector('.photo-left');
const photeRight1El = document.querySelector('.photo-right1');
const photeRight2El = document.querySelector('.photo-right2');
const nickEl = document.getElementById('nick');
const genderEl = document.getElementById('gender');
const ageEl = document.getElementById('age');
const dateEl = document.getElementById('date');
const companionContentEl = document.getElementById('companion-content');
const contentEl = document.querySelector('.content-1');
const nick1El = document.getElementById('nick1');
const starEl = document.querySelectorAll('#star p');

console.log(starEl);
renderStars();

function renderStars() {
  starEl.forEach((star, i) => {
    if (i < reviews[0].rating) {
      star.classList.add('filled');
    } else {
      star.classList.remove('filled');
    }
  });
}

getReviewerInfo();

async function getReviewerInfo() {
  // 유저 json 데이터 불러오기
  const users = await getUsers();
  const reviewer = await users.find((user) => user.email === reviews[0].user);

  // 나이 정보 계산
  const reviewYear = parseInt(reviews[0].date.split('년')[0]);
  const birthDate = reviewer.birthDate;
  const birthDateString = birthDate.toString();
  const birthYear = parseInt(birthDateString.slice(0, 4));
  const reviewerAge = reviewYear - birthYear;

  const age = calculateAge(reviewerAge);

  nickEl.textContent = reviewer.nickname;
  genderEl.textContent = reviewer.gender === 'm' ? '남성' : '여성';
  ageEl.textContent = age;
}

function calculateAge(age) {
  const dividedAgeByTen = parseInt(age / 10);

  if (dividedAgeByTen < 1) {
    return '어린이';
  } else if (dividedAgeByTen > 9) {
    return '100세 이상';
  }

  return `${dividedAgeByTen}0대`;
}

nameEl.textContent = reviews[0].title;
hashtagEl.textContent = reviews[0].hashtag.map((tag) => `#${tag}`).join(' ');
photeLeftEl.src = reviews[0].imagePath[0];
photeRight1El.src = reviews[0].imagePath[1];
photeRight2El.src = reviews[0].imagePath[2];
dateEl.textContent = reviews[0].date;
companionContentEl.textContent = reviews[0].companion;
contentEl.textContent = reviews[0].content;
nick1El.textContent = reviews[0]._id;

const recommendUlEl = document.getElementById('recommend-ul');
const recommendTempEl = document.getElementById('recommend-template');

function renderRecommend(count) {
  const nextReviews = reviews.slice(0, count);

  nextReviews.map((review) => {
    const cloneLi = recommendTempEl.content.firstElementChild.cloneNode(true);
    cloneLi.querySelector('.photo').src = review.imagePath[0];
    cloneLi.querySelector('.title').textContent = review.title;
    cloneLi.querySelector('.place').textContent = review.location;
    cloneLi.querySelector('.hash').textContent = review.hashtag
      .map((tag) => `#${tag}`)
      .join(' ');
    recommendUlEl.appendChild(cloneLi);
  });
}

renderRecommend(5);

// 상세 이미지 fallback 처리
document.querySelectorAll('#main-img img').forEach((img) => {
  // 이미지가 없거나 에러났을 때 처리
  const handleFallback = () => {
    img.style.display = 'none';

    const fallbackDiv = document.createElement('div');
    fallbackDiv.className = 'img-fallback';

    img.parentElement.appendChild(fallbackDiv);
  };

  if (!img.getAttribute('src') || img.getAttribute('src').trim() === '') {
    handleFallback(); // src가 빈 경우
  } else {
    img.onerror = handleFallback; // 로딩 실패한 경우
  }
});

// 아바타 이미지 fallback 처리
const avatarImg = document.querySelector('#avatar img');

if (avatarImg) {
  if (
    !avatarImg.getAttribute('src') ||
    avatarImg.getAttribute('src').trim() === ''
  ) {
    avatarImg.setAttribute('src', '../resources/icons/user.png');
  }

  avatarImg.onerror = function () {
    this.setAttribute('src', '../resources/icons/user.png');
  };
}

async function getUsers() {
  return fetch('../resources/data/user.json').then((res) => {
    return res.json();
  });
}
