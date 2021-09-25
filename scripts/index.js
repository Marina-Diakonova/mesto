// ВСЕ ПЕРЕМЕННЫЕ
const editProfileButton = document.querySelector('.profile__edit');
const popupEditProfile = document.querySelector('.popup_edit-profile')
const popupCloseBtn = document.querySelector('.popup__close');
const formEditProfile = document.querySelector('.popup__form_name');
const nameInput = document.querySelector('.popup__item_input_name');//
const jobInput = document.querySelector('.popup__item_input_description');//
const profileName = document.querySelector('.profile__name');//
const profileDescription = document.querySelector('.profile__description');//
const addNewCardBtn = document.querySelector('.profile__add');
const popupCard = document.querySelector('.popup_card');
const popupCloseCardImageBtn = document.querySelector('.popup__close_card');
const closeEditCrosBtn = document.querySelector('.popup__close_card_image');
const popupImage = document.querySelector('.popup_call_image');
const popupSaveCardImage = document.querySelector('.popup__form_card');
const cardContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#template-card').content;
const cardName = document.querySelector('.popup__item_input_title');
const cardLink = document.querySelector('.popup__item_input_image');
const popupTextEdit = document.querySelector(".popup__text-edit");
const popupImageEdit = document.querySelector(".popup__image-edit");

// ОТКРЫТИЕ ПОПАП УНИВЕРСАЛЬНАЯ ФУНКЦИЯ
const openPopup = function (popup) {
    popup.classList.add('popup_opened');
};

// ЗАКРЫТИЕ ПОПАП УНИВЕРСАЛЬНАЯ ФУНКЦИЯ
const closePopup = function (popup) {
    popup.classList.remove('popup_opened');
};

// ОТКРЫТИЕ КАРТОЧКИ ПОПАП ПРОФИЛЯ И ПОДМЕНА ПОЛЕЙ
function showPopupCard() {
    openPopup(popupEditProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
};

// СОХРАНЕНИЕ ДАННЫХ ИЗ ИНПУТОВ КАРТОЧКИ ПОПАП ПРОФИЛЯ
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupEditProfile);
};

// УДАЛЕНИЕ КАРТОЧКИ ТЕМПЛЕЙТ ЭЛЕМЕНТА
function setEventListeners(cardElement) {
    cardElement.querySelector('.card__trash').addEventListener('click', function (event) {
        const cardElement = event.target.closest('.card');
        cardElement.remove();
    });
};

// ДЕЛАЕМ ЛАЙК КАРТОЧКЕ ТЕМПЛЕЙТ ЭЛЕМЕНТА
function setEventListenersGetLike(cardElement) {
    cardElement.querySelector('.card__not-liked').addEventListener('click', function (evt) { //функция делания лайка карточке
        evt.target.classList.toggle('card__is-liked');
    });
};

// ЗАКРЫТИЕ КАРТОЧКИ ПРОСМОТРА С КАРТИНКОЙ НАЖАТИЕ НА КРЕСТИК
closeEditCrosBtn.addEventListener('click', function () {
    const deleteEditCard = closeEditCrosBtn.closest('.popup_call_image');
    deleteEditCard.classList.remove('popup_opened');
});

// ОТКРЫВАЕМ КАРТОЧКУ ДЛЯ ПРОСМОТРА КАРТОЧКИ С КАРТИНКОЙ
function setCallEditCardImage(cardElement) {
    cardElement.querySelector('.card__image').addEventListener('click', function (evt) {
        popupTextEdit.innerText = evt.target.parentElement.closest('.card').querySelector('.card__text').textContent;
        popupImageEdit.src = evt.target.src;
        popupImageEdit.alt = evt.target.parentElement.closest('.card').querySelector('.card__text').textContent;//
        openPopup(popupImage);
    });
};

// КЛОНИРОВАНИЕ КАРТОЧКИ ТЕПМЛЕЙТ ДУБЛЬ ДВА ВЫНЕСЕНО В ОТДЕЛЬНУЮ ФУНКЦИЮ
function createCard(name, link) {
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

// ДОБАВЛЕНИЕ КАРТОЧКИ ТЕМПЛЕЙТ ЭЛЕМЕНТА ВЫНЕСЕНО В ОТДЕЛЬНУЮ ФУНКЦИЮ
function addCard(cardElement) {
    cardContainer.prepend(cardElement);
};

// ПЕРЕДАЕМ ДАННЫЕ ИЗ ИНПУТОВ В ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ
popupSaveCardImage.addEventListener('submit', function (evt) {
    evt.preventDefault();
    addCard(createCard(cardName.value, cardLink.value));
    cardName.value = '';
    cardLink.value = '';
    closePopup(popupCard);
});

// ДОБАВЛЯЕМ ИЗ МАССИВА КАРТОЧКИ НА СТРАНИЦУ ДУБЛЬ ДВА БЕЗ КОПИРОВАНИЯ КОДА
initialCards.forEach(function (cardElement) {
    addCard(createCard(cardElement.name, cardElement.link));
});

// ВСЕ ВЫЗОВЫ ФУНКЦИЙ
editProfileButton.addEventListener('click', showPopupCard); //вызов функции открытия попапа с редактированием профиля
formEditProfile.addEventListener('submit', formSubmitHandler); //вызов функции подмены полей
popupCloseBtn.addEventListener('click', () => closePopup(popupEditProfile)); //вызов функции закрытия попапа
addNewCardBtn.addEventListener('click', () => openPopup(popupCard)); //вызов открытия попапа Карточки с картинкой
popupCloseCardImageBtn.addEventListener('click', () => closePopup(popupCard)); //вызов функции закрытия попапа ВТОРОЙ КАРТОЧКИ КРЕСТИК