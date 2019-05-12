'use strict';

// const allNews = [
//   {
//     location: 'Vaticano',
//     date: '2019-05-04',
//     title: 'Más mujeres en la universidad',
//     main:
//       'Repentino aumento de las matrículas de mujeres en la universidad del Vaticano. Es estima un 48% más de mujeres que el año pasado.'
//   },
//   {
//     location: 'Vaticano',
//     date: '2019-04-14',
//     title: '¡Cuidado en las calles!',
//     main:
//       'Recientes rumores acerca de un extraño de aspecto sospechoso recorriendo las calles en busca de hoja roja. Se recomienda alejarse de extraños y mantener a los niños acompañados.'
//   },
//   {
//     location: 'Poza Aguada',
//     date: '2019-04-07',
//     title: 'Trágico fin de la expedición vodacce',
//     main:
//       'La expedición vodacce que tenía intención de encontrar y explorar la tumba del Imperatus Gaius Filipus termina en tragedia tras el ataque de bandidos montaigneses. Los supervivientes, parte del equipo que acompañaba a Oscar Zurita y Carlo Grazia Caligari, regresó la pasada semana portando las noticias.'
//   },
//   {
//     location: 'Vaticano',
//     date: '2019-05-04',
//     title: 'Más mujeres en la universidad',
//     main:
//       'Repentino aumento de las matrículas de mujeres en la universidad del Vaticano. Es estima un 48% más de mujeres que el año pasado.'
//   },
//   {
//     location: 'Vaticano',
//     date: '2019-04-14',
//     title: '¡Cuidado en las calles!',
//     main:
//       'Recientes rumores acerca de un extraño de aspecto sospechoso recorriendo las calles en busca de hoja roja. Se recomienda alejarse de extraños y mantener a los niños acompañados.'
//   },
//   {
//     location: 'Poza Aguada',
//     date: '2019-04-07',
//     title: 'Trágico fin de la expedición vodacce',
//     main:
//       'La expedición vodacce que tenía intención de encontrar y explorar la tumba del Imperatus Gaius Filipus termina en tragedia tras el ataque de bandidos montaigneses. Los supervivientes, parte del equipo que acompañaba a Oscar Zurita y Carlo Grazia Caligari, regresó la pasada semana portando las noticias.'
//   }
// ];
const newsUlEl = document.querySelector('.news-ul');
const locationsUlEl = document.querySelector('.locations-container');
const pageTitle = document.querySelector('.page-title');
const createNewsEl = document.querySelector('.location-tab__create-news');
const formEl = document.querySelector('.create-news--form');
const formButtonEl = document.querySelector('.form-button');
const formCloseEl = document.querySelector('.form-button-close');
const inputEl = document.querySelectorAll('.form-input');
let newNews = {};
let allNews = [];

if (pageTitle.innerHTML === 'News') {
  fetch('https://api.myjson.com/bins/1ccibi')
    .then(response => response.json())
    .then(function(data) {
      const { news } = data;
      allNews = news;
      writeNews(news);
      writeLocations(news);
    });
}
// if (pageTitle.innerHTML === 'News') {
//   writeNews(allNews);
// }
// if (pageTitle.innerHTML === 'News') {
//   writeLocations();
// }

function writeNews(news) {
  clearNews();
  for (const item of news) {
    const newLi = document.createElement('li');
    newLi.classList.add('news-container');
    const newArticle = document.createElement('article');
    newArticle.classList.add('news');
    const newH3 = document.createElement('h3');
    newH3.classList.add('news-title');
    const newP = document.createElement('p');
    newP.classList.add('news-main');
    const newSpan = document.createElement('span');
    newSpan.classList.add('news-location');
    const newTitle = document.createTextNode(item.title);
    const newText = document.createTextNode(item.main);
    const newLocation = document.createTextNode(item.location);
    newH3.appendChild(newTitle);
    newP.appendChild(newText);
    newSpan.appendChild(newLocation);
    newArticle.appendChild(newH3);
    newArticle.appendChild(newP);
    newLi.appendChild(newSpan);
    newLi.appendChild(newArticle);
    newsUlEl.appendChild(newLi);
  }
}

function writeLocations(news) {
  //Fix sort issue with uppercase/lowercase
  locationsUlEl.innerHTML = '';
  let allLocations = [];
  for (const item of news) {
    if (!allLocations.includes(item.location)) {
      allLocations.push(item.location);
    }
  }
  allLocations.sort();
  allLocations.splice(0, 0, 'Thea');
  for (const location of allLocations) {
    const newLi = document.createElement('li');
    const newLocation = document.createTextNode(location);
    newLi.appendChild(newLocation);
    newLi.classList.add('location-tab');
    if (location === 'Thea') {
      newLi.classList.add('Thea');
    }
    newLi.addEventListener('click', filterLocation);
    locationsUlEl.appendChild(newLi);
  }
}

function filterLocation(event) {
  const selectedLocation = event.currentTarget.innerHTML;
  const locationNews = allNews.filter(item =>
    selectedLocation === 'Thea'
      ? item.location
      : item.location === selectedLocation
  );
  writeNews(locationNews);
  const locationTabs = locationsUlEl.querySelectorAll('.location-tab');
  for (const tab of locationTabs) {
    tab.classList.remove('selected-location-tab');
  }
  event.currentTarget.classList.add('selected-location-tab');
}

function clearNews() {
  newsUlEl.innerHTML = '';
}

function showForm() {
  formEl.classList.remove('hidden');
}

createNewsEl.addEventListener('click', showForm);

function handleCreateNews() {
  if (checkInputsFilled()) {
    getValueFromInputs();
    allNews.push(newNews);
    const object = {
      news: allNews
    };
    //send Json to myJson news and locations again
    updateJson(object);
    closeForm();
  } else {
    alert('Rellena todos los campos');
  }
}

formButtonEl.addEventListener('click', handleCreateNews);

function getValueFromInputs() {
  for (const input of inputEl) {
    const key = input.id;
    newNews[key] = input.value;
  }
}

function closeForm() {
  formEl.classList.add('hidden');
  newNews = {};
}

formCloseEl.addEventListener('click', closeForm);

function checkInputsFilled() {
  for (const input of inputEl) {
    if (!input.value) {
      return false;
    }
  }
  return true;
}

function updateJson(object) {
  fetch('https://api.myjson.com/bins/1ccibi', {
    method: 'PUT',
    body: JSON.stringify(object),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(function(result) {
      const { news } = result;
      writeNews(news);
      writeLocations(news);
      allNews = news;
    })
    .catch(err => console.log('error', err));
}
