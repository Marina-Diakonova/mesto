//--------------------------Начало блока кода вызова каротчки POPUP-----------------------------
let callEditProfileButton = document.querySelector('.profile__edit')
let callPopup = document.querySelector('.popup');
let callPopupClose = document.querySelector('.popup__close')
//console.log(callEditProfileButton, callPopup);

let showPopupCard = function () {
    callPopup.classList.add('popup_opened')
}

let closePopupCard = function () {
    callPopup.classList.remove('popup_opened')
}

callEditProfileButton.addEventListener('click', showPopupCard);
callPopupClose.addEventListener('click', closePopupCard);
//---------------------------конец кода вызова карточки POPUP-----------------------------------



//---------------------------начало кода сохранения данных PROFILE------------------------------
let formElement = document.querySelector('.popup__form')
//console.log(formElement);
let nameInput = document.querySelector('.popup__name')
let jobInput = document.querySelector('popup__description')
//console.log(nameInput, jobInput);


function formSubmitHandler(evt) {
    evt.preventDefault();
    let inputsName = document.querySelector("input[name='popup__name']").value
    let inputsDescription = document.querySelector("input[name='popup__description']").value
    let profileName = document.querySelector('.profile__name')
    let profileDescription = document.querySelector('.profile__description')

    profileName.textContent = inputsName
    profileDescription.textContent = inputsDescription
}

formElement.addEventListener('submit', formSubmitHandler);
//---------------------------конец кода сохранения данных PROFILE--------------------------------



//--------------------------закрываем POPUP при клике на кнопку сохранить------------------------

let SaveButton = document.querySelector('.popup__save')
let closeSavedChanges = function () {
    callPopup.classList.remove('popup_opened')
}

SaveButton.addEventListener('click', closeSavedChanges);
//-----------------конец кода закрытия POPUP при клике не кнопку сохранить-----------------------
