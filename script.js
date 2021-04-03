const bookmarkBtn = document.querySelector('.bookmark');
const backProjectBtnTop = document.querySelector('.heading__action .btn');
const overlayForModals = document.querySelector('.overlay');
const supportModal = document.getElementById('support-options');
const thanksModal = document.getElementById('thanks');
const closeModalBtn = document.querySelector('.close');
const bambooOption = document.getElementById('bamboo-stand');
const blackEditionOption = document.getElementById('black-edition-stand');
const mahoganyOption = document.getElementById('mahogany-special-edition');
const bambooRewardOption = document.getElementById('bamboo');
const blackEditionRewardOption = document.getElementById('black-edition');
const mahoganyRewardOption = document.getElementById('mahogany-edition');
const selectRewardBtns = document.querySelectorAll('.option .btn');
const rewardOptions = document.querySelectorAll('.option-reward');
const totalSum = document.querySelector('.stats__sum--collected');
const backers = document.querySelector('.stats__backers--num');
const days = document.querySelector('.stats__days--num');

const state = {
  bambooStand: 101,
  blackEdition: 64,
  mahoganyEdition: 0,
  sum: 89914,
  backers: 5007,
  days: 56,
};

bookmarkBtn.addEventListener('click', function () {
  this.classList.toggle('active');
  this.textContent = this.classList.contains('active')
    ? 'Bookmarked'
    : 'Bookmark';
});

// back project buttons functionality - show modal
backProjectBtnTop.addEventListener('click', showModal);
selectRewardBtns.forEach((btn) => btn.addEventListener('click', showModal));

// close modals
overlayForModals.addEventListener('click', closeModals);
closeModalBtn.addEventListener('click', closeModals);
thanksModal.querySelector('.btn').addEventListener('click', closeModals);

// toggle active class on reward options in modal
rewardOptions.forEach((rewardOption) => {
  rewardOption.addEventListener('click', function () {
    deactivateOptions();
    if (this.querySelector('input[type="radio"]').checked)
      this.classList.add('active');
  });

  // add eventListener for confirm buttons
  rewardOption.querySelector('.btn').addEventListener('click', function () {
    const reward = Number(
      rewardOption.querySelector('input[type="number"]').value
    );
    state.sum += reward;
    state.backers++;
    totalSum.textContent = `$${state.sum.toLocaleString()}`;
    backers.textContent = state.backers.toLocaleString();
    supportModal.classList.add('hidden');
    thanksModal.classList.remove('hidden');
    window.scrollTo(0, 0);
  });
});

// update how many days left
let daysLeft = setInterval(() => {
  days.textContent = state.days;
  state.days--;
}, 86400000);

setTimeout(() => {
  clearInterval(daysLeft);
  days.textContent = state.days;
}, 86400000 * state.days);

function update() {
  checkIfAvailable();
}

// remove active class from reward options
function deactivateOptions() {
  rewardOptions.forEach((option) => option.classList.remove('active'));
}

function showModal(e) {
  overlayForModals.classList.remove('hidden');
  supportModal.classList.remove('hidden');
  window.scrollTo(0, 90);
  supportModal.classList.remove('hidden');

  // reward option selection depend on button clicked
  if (e.path[1].id == 'bamboo-stand') {
    checkRewardOption(1);
  } else if (e.path[1].id == 'black-edition-stand') {
    checkRewardOption(2);
  } else if (e.path[1].id == 'mahogany-special-edition') {
    checkRewardOption(3);
  }
}

function checkRewardOption(index) {
  rewardOptions[index].querySelector('input[type="radio"]').checked = true;
  rewardOptions[index].classList.add('active');
  window.scrollTo(0, rewardOptions[index].offsetTop);
}

function closeModals() {
  overlayForModals.classList.add('hidden');
  supportModal.classList.add('hidden');
  thanksModal.classList.add('hidden');
  deactivateOptions();
}

function checkIfAvailable() {
  if (state.bambooStand == 0) makeUnavailable(bambooOption, bambooRewardOption);
  if (state.blackEdition == 0)
    makeUnavailable(blackEditionOption, blackEditionRewardOption);
  if (state.mahoganyEdition == 0)
    makeUnavailable(mahoganyOption, mahoganyRewardOption);
}

function makeUnavailable(option, rewardOption) {
  option.classList.add('out-of-stock');
  rewardOption.parentNode.classList.add('out-of-stock');
  option.querySelector('.btn').textContent = 'Out of stock';
}
