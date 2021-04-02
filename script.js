const bookmarkBtn = document.querySelector('.bookmark');
const backProjectBtnTop = document.querySelector('.heading__action .btn');
const overlayForModals = document.querySelector('.overlay');
const supportModal = document.getElementById('support-options');
const thanksModal = document.getElementById('thanks');
const closeModalBtn = document.querySelector('.close');

bookmarkBtn.addEventListener('click', function () {
  this.classList.toggle('active');
  this.textContent = this.classList.contains('active')
    ? 'Bookmarked'
    : 'Bookmark';
});

backProjectBtnTop.addEventListener('click', function () {
  overlayForModals.classList.remove('hidden');
  supportModal.classList.remove('hidden');
  window.scrollTo(0, 0);
  supportModal.classList.remove('hidden');
});

overlayForModals.addEventListener('click', closeModals);

closeModalBtn.addEventListener('click', closeModals);

function closeModals() {
  overlayForModals.classList.add('hidden');
  supportModal.classList.add('hidden');
  thanksModal.classList.add('hidden');
}
