import galleryItems from './gallery-items.js';

const galleryContainer = document.querySelector('.js-gallery');
const cardsMarkup = createGalleryCardsMarkup(galleryItems);
const modalWindow = document.querySelector('.js-lightbox');
const bigPicture = document.querySelector('.lightbox__image');
const closeModalBtn = document.querySelector(
  'button[data-action="close-lightbox"]',
);

galleryContainer.insertAdjacentHTML('beforeend', cardsMarkup);
galleryContainer.addEventListener('click', onGalleryContainerClick);

function createGalleryCardsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href=${original}
  >
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt=${description}
    />
  </a>
</li>
    `;
    })
    .join('');
}

function onGalleryContainerClick(e) {
  e.preventDefault();

  if (e.target === e.currentTarget) {
    return;
  }

  addActiveModalClass();

  openImage(e);

  window.addEventListener('keydown', handleKeyPress);
}
closeModalBtn.addEventListener('click', closeModal);

function addActiveModalClass() {
  modalWindow.classList.add('is-open');
  console.log('modalWindow');
}

function openImage(e) {
  bigPicture.src = e.target.dataset.source;
  bigPicture.alt = e.target.alt;
  console.log('openImage');
}

function handleKeyPress(e) {
  if (e.code !== 'Escape') {
    return;
  }

  console.log('handleKeyPress');
  closeModal();
}

function closeModal() {
  modalWindow.classList.remove('is-open');
  bigPicture.src = '';
  bigPicture.alt = '';
  window.removeEventListener('keydown', handleKeyPress);
}
