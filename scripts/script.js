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
/**@type {HTMLFormElement} */
const addPopupForm = addPopup.querySelector('#popupAddCardForm'); //объявляем переменную для формы добавления мест

function closePopup(anyPopup) {
  anyPopup.classList.remove('popup_opened'); // создаем функцию на закрытие попапа
}
function openPopup(anyPopup) {
  anyPopup.classList.add('popup_opened'); // создаем функцию на открытие попапа
}

addButton.addEventListener('click', () => openPopup(addPopup)); // добавляем ивентлисинер на кнопку addButton на открытие попапа добавления мест

editButton.addEventListener('click', function () {
  openPopup(editPopup); // добавляем ивентлисинер по клику на кнопку редактирования профиля для открытия попапа
  nameInput.value = profileTitle.textContent; // пишем текстконтент тайтла в инпут
  professionInput.value = profileProfession.textContent; // пишем текстконтент профессии в инпут
});
editPopupCloseButton.addEventListener('click', () => closePopup(editPopup)); //закрытие попапа профиля
addPopupCloseButton.addEventListener('click', () => closePopup(addPopup)); // закрытие попапа мест

editPopupForm.addEventListener('submit', function (evt) {
  // добавляем сабмит на форму
  evt.preventDefault(); //прерываем обновление страницы и отправку на сервер
  profileTitle.textContent = nameInput.value; // присваеваем значениее из инпута
  profileProfession.textContent = professionInput.value; // присваеваем значениее из инпута
  closePopup(editPopup); //закрытие попапа после сабмита формы
});

const initialCards = [
  // массив с карточками
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

/** @type {HTMLTemplateElement} */
const elementTemplate = document.querySelector('#element-template'); //находим темплэйт
const elementTemplateContent = elementTemplate.content; //объвляем переменную  с контентом из темплэйта
const cardTemplate = elementTemplateContent.querySelector('.element'); // объявляем переменную с карточкой в template
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

  newCardPhoto.addEventListener('click', () => {
    openPopup(popupImg);
    popupImgTitle.textContent = newCardName.textContent;
    popupImgPhoto.src = newCardPhoto.src;
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

initialCards.forEach(card => {
  //проходим циклом по массиву
  const newCard = createCard(card);
  elements.append(newCard);
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
  closePopup(addPopup); //закрытие попапа после сабмита формы
});

popupImg.addEventListener('click', () => {
  closePopup(popupImg); // закрываем еще и по клику по всему попапу(так удобней)
});
