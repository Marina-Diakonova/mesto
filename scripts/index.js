// ВСЕ ПЕРЕМЕННЫЕ 
let callEditProfileButton = document.querySelector('.profile__edit');
let callPopup = document.querySelector('.popup');
let callPopupClose = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form_name');
let nameInput = document.querySelector('.popup__item_input_name');
let jobInput = document.querySelector('.popup__item_input_description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let callAddNewCard = document.querySelector('.profile__add');//кнопка добавить карточку
let callPopupCard = document.querySelector('.popup_card');//поиск для открытия карточки второго попапа
let callPopupCloseCardImage = document.querySelector('.popup__close_card'); //крестик закрытия карточки с картинкой
let closeEditCros = document.querySelector('.popup__close_card_image'); //определяем кнопку для жамкания и удаления
let cardEdit = document.querySelector('.popup_call_image');
let popupSaveCardImage = document.querySelector('.popup__save_card'); //определяем кнопку на которой будет происходить сохранение отправка 
let cardContainer = document.querySelector('.cards');

// МАССИВ ДЛЯ ПОДСТАВЛЕНИЯ КАРТОЧЕК ПРИ ОТКРЫТИИ КОДА
let initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// КОД ВЫЗОВА КАРТОЧКИ POPUP И ПОДМЕНА ПОЛЕЙ ИЗ ПРОФИЛЯ 
let showPopupCard = function () {
  callPopup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
};

// КОД ЗАКРЫТИЯ КАРТОЧКИ POPUP
let closePopupCard = function () {
  callPopup.classList.remove('popup_opened');
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
  callPopupCard.classList.add('popup_opened');//открытие изначальной карточки с картинкой
};

// КОД ЗАКРЫТИЯ карточки POPUPCARD
let closePopupCardImage = function () {
  callPopupCard.classList.remove('popup_opened'); //закрытие карточки
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
closeEditCros.addEventListener('click', function () {
  const deleteEditCard = closeEditCros.closest('.popup_call_image');
  deleteEditCard.classList.remove('popup_opened');
});

// ОТКРЫВАЕМ ПОПАП ДЛЯ РЕДАКТИРОВАНИЯ КАРТОЧКИ 
function setCallEditCardImage(cardElement) {
  cardElement.querySelector('.card__image').addEventListener('click', function (evt) {

    document.querySelector(".popup__text_edit").innerText = evt.target.parentElement.closest('.card').querySelector('.card__text').textContent;
    document.querySelector(".popup__image_edit").src = evt.target.src;

    cardEdit.classList.add('popup_opened');
  });
};

// КОД ДЛЯ КЛОНИРОВАНИЯ ТЕМПЛЕЙТ 
function cloneCardTemlate(title, image) {
  const cardTemplate = document.querySelector('#template-card').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__text').innerText = title;
  cardElement.querySelector('.card__image').src = image;
  cardElement.querySelector('.card__image').alt = title;

  setEventListeners(cardElement); // УДАЛЕНИЕ КАРТОЧКИ
  setEventListenersGetLike(cardElement); //ЛАЙК КАРТОЧКЕ
  setCallEditCardImage(cardElement); // ОТКРЫТИЕ ПОПАПА С КАРТОЧКОЙ

  cardContainer.prepend(cardElement);
};

// ПЕРЕДАЕМ ДАННЫЕ ИЗ ИНПУТОВ В ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ 
popupSaveCardImage.addEventListener('click', function (evt) {
  evt.preventDefault();
  let title = document.querySelector('.popup__item_input_title');
  let image = document.querySelector('.popup__item_input_image');
  cloneCardTemlate(title.value, image.value);

  closePopupCardImage();
  title.value = '';
  image.value = '';
});

// ДОБАВЛЯЕМ ИЗ МАССИВА КАРТОЧКИ НА СТРАНИЦУ
initialCards.forEach(function (element) {
  const cardTemplate = document.querySelector('#template-card').content;
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__text').innerText = element.name;
  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__text').alt = element.name;

  setEventListeners(cardElement); // УДАЛЕНИЕ КАРТОЧКИ
  setEventListenersGetLike(cardElement); //ЛАЙК КАРТОЧКЕ
  setCallEditCardImage(cardElement); // ОТКРЫТИЕ ПОПАПА С КАРТОЧКОЙ

  cardContainer.prepend(cardElement);
});

// ВСЕ ВЫЗОВЫ ФУНКЦИЙ
callEditProfileButton.addEventListener('click', showPopupCard); //вызов функции открытия попапа с редактированием профиля
callPopupClose.addEventListener('click', closePopupCard); //вызов функции закрытия попапа
formElement.addEventListener('submit', formSubmitHandler); //вызов функции подмены полей
callAddNewCard.addEventListener('click', showPopupCardImageCard); //вызов открытия попапа Карточки с картинкой
callPopupCloseCardImage.addEventListener('click', closePopupCardImage); //вызов функции закрытия попапа ВТОРОЙ КАРТОЧКИ КРЕСТИК