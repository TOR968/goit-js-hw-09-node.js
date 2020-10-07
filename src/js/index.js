import galleryItems from "./gallery-items.js";
import gallery from "../templates/gallery.hbs";

const galleryContainer = document.querySelector(".js-gallery");
const cardsMarkup = createGalleryCardsMarkup(galleryItems);
const modalWindow = document.querySelector(".js-lightbox");
const bigPicture = document.querySelector(".lightbox__image");
const closeModalBtn = document.querySelector(
  'button[data-action="close-lightbox"]'
);

galleryContainer.insertAdjacentHTML("beforeend", cardsMarkup);
galleryContainer.addEventListener("click", onGalleryContainerClick);

function createGalleryCardsMarkup(galleryItems) {
  return gallery(galleryItems);
}

function onGalleryContainerClick(e) {
  e.preventDefault();

  if (e.target === e.currentTarget) {
    return;
  }

  addActiveModalClass();

  openImage(e);

  window.addEventListener("keydown", handleKeyPress);
}
closeModalBtn.addEventListener("click", closeModal);

function addActiveModalClass() {
  modalWindow.classList.add("is-open");
}

function openImage(e) {
  bigPicture.src = e.target.dataset.source;
  bigPicture.alt = e.target.alt;
}

function handleKeyPress(e) {
  if (e.code !== "Escape") {
    return;
  }
  closeModal();
}

function closeModal() {
  modalWindow.classList.remove("is-open");
  bigPicture.src = "";
  bigPicture.alt = "";
  window.removeEventListener("keydown", handleKeyPress);
}
