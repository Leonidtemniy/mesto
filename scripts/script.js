const editButton = document.querySelector('.profile__edit-button'); //объявляем переменную для кнопки редактирования профиля
const editPopup = document.querySelector('.editpopup'); //объявляем переменную для всего попапа редактирования профиля
const editPopupCloseButton = editPopup.querySelector('.popup__closebutton'); //объявляем переменную для кнопки закрытия профиля
const nameInput = editPopup.querySelector('.popup__input_type_name'); //объявляем переменную для ипута имени профиля
const professionInput = editPopup.querySelector('.popup__input_type_profession'); //объявляем переменную для инпута профессии

const editPopupForm = editPopup.querySelector('.popup__form'); //объявляем переменную для формы редактирования профиля

const profileTitle = document.querySelector('.profile__title'); //объявляем переменную для значения имени
const profileProfession = document.querySelector('.profile__subtitle'); //объявляем переменную для значения профессии

const addPopup = document.querySelector('.addpopup'); //объявляем переменную для всего попапа добавленияя мест
const addButton = document.querySelector('.profile__add-button'); // объявляем переменную для открытия попапа добавления мест
const addPopupCloseButton = addPopup.querySelector('#addPopupCloseButton'); // объявляем переменную для кнопки закрытия мест

const addPopupForm = addPopup.querySelector('#popupAddCardForm'); //объявляем переменную для формы добавления мест
const popups = document.querySelectorAll('.popup'); // выбираем все попапы и объявляем переменную

////функции закрытия и открытия
///функция закрытия по Esc
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}
/// создаем функцию на закрытие попапа
function closePopup(anyPopup) {
  anyPopup.classList.remove('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}
/// создаем функцию на открытие попапа
function openPopup(anyPopup) {
  anyPopup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

popups.forEach(popup => {
  // закрытие по клику
  popup.addEventListener('click', click => {
    //закрываем по клику
    if (click.target === popup) {
      closePopup(popup);
    }
  });
});
////
///фунция очищения
addButton.addEventListener('click', () => openPopup(addPopup)); // добавляем ивентлисинер на кнопку addButton на открытие попапа добавления мест

editButton.addEventListener('click', function () {
  openPopup(editPopup); // добавляем ивентлисинер по клику на кнопку редактирования профиля для открытия попапа
  nameInput.value = profileTitle.textContent; // пишем текстконтент тайтла в инпут
  professionInput.value = profileProfession.textContent; // пишем текстконтент профессии в инпут
});
editPopupCloseButton.addEventListener('click', () => closePopup(editPopup)); //закрытие попапа профиля
addPopupCloseButton.addEventListener('click', () => closePopup(addPopup)); // закрытие попапа мест

const cardTemplate = document.querySelector('#element-template').content.querySelector('.element');
const elements = document.querySelector('.elements'); // объявляем переменную элементс
const popupImg = document.querySelector('.popup-img'); //

const popupImgTitle = popupImg.querySelector('.popup-img__title');
const popupImgPhoto = popupImg.querySelector('.popup-img__photo');

/** @param {{name:string; link:string}} createCard  */
const createCard = ({ name, link }) => {
  // функция создания карточки
  const newCard = cardTemplate.cloneNode(true);
  /** @type {HTMLSpanElement} */
  const newCardName = newCard.querySelector('.element__title'); // объявляем переменную с названием места
  newCardName.textContent = name; // присваеваем текст названия из масива
  const newCardPhoto = newCard.querySelector('.element__photo'); // объявляем переменную с фото
  newCardPhoto.src = link; // присваеваем текст ссылки на фото из масива
  newCardPhoto.alt = 'Фотография ' + name;
  newCardPhoto.addEventListener('click', () => {
    openPopup(popupImg);
    popupImgTitle.textContent = newCardName.textContent;
    popupImgPhoto.src = newCardPhoto.src;
    popupImgPhoto.alt = newCardPhoto.alt;
  });
  const likeButton = newCard.querySelector('.element__button-like');
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('element__button-like_active');
  });
  const trashButton = newCard.querySelector('.element__button-trash');
  trashButton.addEventListener('click', () => {
    newCard.remove();
  });

  return newCard;
};

cardData.forEach(card => {
  //проходим циклом по массиву
  const newCard = createCard(card);
  elements.append(newCard);
});

editPopupForm.addEventListener('submit', function (evt) {
  // добавляем сабмит на форму
  evt.preventDefault(); //прерываем обновление страницы и отправку на сервер
  profileTitle.textContent = nameInput.value; // присваеваем значениее из инпута
  profileProfession.textContent = professionInput.value; // присваеваем значениее из инпута
  closePopup(editPopup); //закрытие попапа после сабмита формы
});

addPopupForm.addEventListener('submit', evt => {
  evt.preventDefault(); // прерываем обновление страницы и отправку на сервер
  const form = evt.target;
  const formData = new FormData(form);
  /**@type {HTMLFormElement} */
  const values = Object.fromEntries(formData);
  const placeValue = values['place'];
  const linkValue = values['img-path'];
  const newUserCard = createCard({ name: placeValue, link: linkValue });
  elements.prepend(newUserCard);
  form.reset(); // скидываем ранее введенные данные с полей
  closePopup(addPopup); //закрытие попапа после сабмита формы
  const closeButton = addPopupForm.querySelector('.popup__savebutton');
  closeButton.classList.add('popup__savebutton_disabled');
});
