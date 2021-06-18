//----------------------------------------переменные---------------------------------------------
let callEditProfileButton = document.querySelector('.profile__edit')
let callPopup = document.querySelector('.popup');
let callPopupClose = document.querySelector('.popup__close')
let formElement = document.querySelector('.popup__form')
let nameInput = document.querySelector('.popup__item-name')
let jobInput = document.querySelector('.popup__item-description')
let profileName = document.querySelector('.profile__name')
let profileDescription = document.querySelector('.profile__description')

//------------------------код вызова карточки POPUP и подмена полей из профиля-------------------
let showPopupCard = function () {
    callPopup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
}

//--------------------------код закрытия карточки POPUP-----------------------------------------
let closePopupCard = function () {
    callPopup.classList.remove('popup_opened')
}

//---------------------------функция сохранения данных PROFILE-----------------------------------
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopupCard();//---закрываем карточку вызвав функцию закрытия прописанную ранее-----------
}

//------------------------------------все слушатели----------------------------------------------
callEditProfileButton.addEventListener('click', showPopupCard); //вызов функции открытия попапа
callPopupClose.addEventListener('click', closePopupCard); //вызов функции закрытия попапа
formElement.addEventListener('submit', formSubmitHandler); //вызов функции подмены полей