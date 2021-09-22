// ВСЕ ПЕРЕМЕННЫЕ
let EditProfileButton = document.querySelector('.profile__edit');
let PopupEditProfile = document.querySelector('.popup_edit-profile')
let PopupCloseBtn = document.querySelector('.popup__close');
let formEditProfile = document.querySelector('.popup__form_name');
const nameInput = document.querySelector('.popup__item_input_name');
const jobInput = document.querySelector('.popup__item_input_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
let AddNewCardBtn = document.querySelector('.profile__add');//кнопка добавить карточку
let PopupCard = document.querySelector('.popup_card');//поиск для открытия карточки второго попапа
let PopupCloseCardImageBtn = document.querySelector('.popup__close_card'); //крестик закрытия карточки с картинкой
let closeEditCrosBtn = document.querySelector('.popup__close_card_image'); //определяем кнопку для жамкания и удаления
let cardEdit = document.querySelector('.popup_call_image');
let popupSaveCardImage = document.querySelector('.popup__form_card');
let cardContainer = document.querySelector('.cards');
let cardTemplate = document.querySelector('#template-card').content;
let name = document.querySelector('.popup__item_input_title');
let link = document.querySelector('.popup__item_input_image');

// КОД ВЫЗОВА КАРТОЧКИ POPUP И ПОДМЕНА ПОЛЕЙ ИЗ ПРОФИЛЯ 
let showPopupCard = function () {
  PopupEditProfile.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
};

// КОД ЗАКРЫТИЯ КАРТОЧКИ POPUP
let closePopupCard = function () {
  PopupEditProfile.classList.remove('popup_opened');
};

// ФУНКЦИЯ СОХРАНЕНИЯ ДАННЫХ КАРТОЧКИ ПРОФИЛЯ PROFILE
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopupCard();
};

// КОД ОТКРЫТИЯ КАРТОЧКИ С КАРТИНКАМИ POPUPCARD 
let showPopupCardImageCard = function () {
  PopupCard.classList.add('popup_opened');//открытие изначальной карточки с картинкой
};

// КОД ЗАКРЫТИЯ карточки POPUPCARD
let closePopupCardImage = function () {
  PopupCard.classList.remove('popup_opened'); //закрытие карточки
};

//УДАЛЕНИЕ КАРТОЧКИ ТЕМПЛЕЙТ ЭЛЕМЕНТА
function setEventListeners(cardElement) {
  cardElement.querySelector('.card__trash').addEventListener('click', function (event) {
    const cardElement = event.target.closest('.card');
    cardElement.remove();
  });
};

// ДЕЛАЕМ ЛАЙК КАРТОЧКЕ
function setEventListenersGetLike(cardElement) {
  cardElement.querySelector('.card__not-liked').addEventListener('click', function (evt) { //функция делания лайка карточке
    evt.target.classList.toggle('card__is-liked');
  });
};

// ДЕЛАЕМ УДАЛЕНИЕ КАРТОЧКИ ПОПАПА РЕДАКТИРОВАНИЯ КАРТОЧКИ НА КРЕСТИК
closeEditCrosBtn.addEventListener('click', function () {
  const deleteEditCard = closeEditCrosBtn.closest('.popup_call_image');
  deleteEditCard.classList.remove('popup_opened');
});

// ОТКРЫВАЕМ ПОПАП ДЛЯ РЕДАКТИРОВАНИЯ КАРТОЧКИ 
function setCallEditCardImage(cardElement) {
  cardElement.querySelector('.card__image').addEventListener('click', function (evt) {
    document.querySelector(".popup__text-edit").innerText = evt.target.parentElement.closest('.card').querySelector('.card__text').textContent;
    document.querySelector(".popup__image-edit").src = evt.target.src;
    cardEdit.classList.add('popup_opened');
  });
};

// КОД ДЛЯ КЛОНИРОВАНИЯ КАРТОЧКИ ТЕПМЛЕЙТ ДУБЛЬ ДВА ВОЗВРАЩЕНИЕ КАРТОЧКИ
function createCard(name, link){
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const image = cardElement.querySelector('.card__image');
  cardElement.querySelector('.card__text').innerText = name;
  image.src = link;
  image.alt = name;
  setEventListeners(cardElement); // УДАЛЕНИЕ КАРТОЧКИ
  setEventListenersGetLike(cardElement); //ЛАЙК КАРТОЧКЕ
  setCallEditCardImage(cardElement); // ОТКРЫТИЕ ПОПАПА С КАРТОЧКОЙ
  return cardElement;
};

// КОД ДОБАВЛЕНИЯ КАРТОЧКИ В ОТДЕЛЬНОЙ ФУНКЦИИ
function addCard(cardElement) {
  cardContainer.prepend(cardElement);
};

// ПЕРЕДАЕМ ДАННЫЕ ИЗ ИНПУТОВ В ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ 
popupSaveCardImage.addEventListener('submit', function (evt) {
  evt.preventDefault();
  addCard(createCard(name.value, link.value));
  closePopupCardImage();
  name.value = '';
  link.value = '';
});

// ДОБАВЛЯЕМ ИЗ МАССИВА КАРТОЧКИ НА СТРАНИЦУ ДУБЛЬ ДВА БЕЗ КОПИРОВАНИЯ КОДА
initialCards.forEach(function (cardElement) {
  addCard(createCard(cardElement.name, cardElement.link));
});

// ВСЕ ВЫЗОВЫ ФУНКЦИЙ
EditProfileButton.addEventListener('click', showPopupCard); //вызов функции открытия попапа с редактированием профиля
PopupCloseBtn.addEventListener('click', closePopupCard); //вызов функции закрытия попапа
formEditProfile.addEventListener('submit', formSubmitHandler); //вызов функции подмены полей
AddNewCardBtn.addEventListener('click', showPopupCardImageCard); //вызов открытия попапа Карточки с картинкой
PopupCloseCardImageBtn.addEventListener('click', closePopupCardImage); //вызов функции закрытия попапа ВТОРОЙ КАРТОЧКИ КРЕСТИК