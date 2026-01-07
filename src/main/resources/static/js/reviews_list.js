// reviews_list.js
import reviews from '../resources/data/reviews.js';

function clickHearts() {
  const hearts = document.querySelectorAll('.favo');

  hearts.forEach((heart) => {
    heart.addEventListener('click', () => {
      heart.classList.toggle('on');
    });
  });
}

async function getReviewerInfo() {
  const users = await getUsers();
  const reviewerEmails = reviews.map((review) => review.user);
  const uniqueEmails = [...new Set(reviewerEmails)];
  return users.filter((user) => uniqueEmails.includes(user.email));
}

getReviewerInfo().then((allUsers) => {
  renderReviews(8, allUsers);

  moreBtn.addEventListener('click', () => {
    renderReviews(4, allUsers);
  });
});

const moreBtn = document.getElementById('more-btn');
const reviewUlEl = document.getElementById('review-ul');
const listTempEl = document.getElementById('reviews-template');

let currentIndex = 0;
function renderReviews(count, allUsers) {
  reviewUlEl.innerHTML = '';
  const nextReviews = reviews.slice(0, currentIndex + count);
  nextReviews.map((review, i) => {
    const cloneLi = listTempEl.content.firstElementChild.cloneNode(true);

    const matchedUser = allUsers.find((user) => user.email === review.user);
    const age = matchedUser
      ? calculateAgeGroup(matchedUser.birthDate, review.date)
      : '';
    const gender = matchedUser
      ? matchedUser.gender === 'm'
        ? '남성'
        : '여성'
      : '';

      cloneLi.querySelector('.photo').src = review.imagePath[0];
      cloneLi.querySelector('.age').textContent = age;
    cloneLi.querySelector('.gender').textContent = gender;
    cloneLi.querySelector('.title').textContent = review.title;
    cloneLi.querySelector('.place').textContent = review.location;
    cloneLi.querySelector('.hash').textContent = review.hashtag
    .map((tag) => `#${tag}`)
    .join(' ');
    
    if (i === 0 && currentIndex === 0) {
      cloneLi.querySelector('.review-list a').href = '../reviews/detail.html';
    } 
    reviewUlEl.appendChild(cloneLi);
  });

  clickHearts();

  currentIndex += nextReviews.length;

  if (currentIndex >= reviews.length) {
    moreBtn.style.display = 'none';
  }
}

function calculateAgeGroup(birthDateRaw, reviewDateString) {
  const birthDateString = birthDateRaw.toString();
  const birthYear = parseInt(birthDateString.slice(0, 4));
  const reviewYear = parseInt(reviewDateString.split('년')[0]);

  const age = reviewYear - birthYear;
  const ageGroup = Math.floor(age / 10);

  if (ageGroup < 1) return '어린이';
  if (ageGroup > 9) return '100세 이상';
  return `${ageGroup}0대`;
}

async function getUsers() {
  return fetch('../resources/data/user.json').then((res) => {
    return res.json();
  });
}
