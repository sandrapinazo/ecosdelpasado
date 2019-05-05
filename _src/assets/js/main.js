'use strict';

const allNews = [
  {location: 'Vaticano', date: 20190504, title: 'Más mujeres en la universidad', main: 'Repentino aumento de las matrículas de mujeres en la universidad del Vaticano. Es estima un 48% más de mujeres que el año pasado.'},
  {location: 'Vaticano', date: 20190414, title: '¡Cuidado en las calles!', main: 'Recientes rumores acerca de un extraño de aspecto sospechoso recorriendo las calles en busca de hoja roja. Se recomienda alejarse de extraños y mantener a los niños acompañados.'},
  {location: 'Poza Aguada', date: 20190407, title: 'Trágico fin de la expedición vodacce', main: 'La expedición vodacce que tenía intención de encontrar y explorar la tumba del Imperatus Gaius Filipus termina en tragedia tras el ataque de bandidos montaigneses. Los supervivientes, parte del equipo que acompañaba a Oscar Zurita y Carlo Grazia Caligari, regresó la pasada semana portando las noticias.'},
  {location: 'Vaticano', date: 20190504, title: 'Más mujeres en la universidad', main: 'Repentino aumento de las matrículas de mujeres en la universidad del Vaticano. Es estima un 48% más de mujeres que el año pasado.'},
  {location: 'Vaticano', date: 20190414, title: '¡Cuidado en las calles!', main: 'Recientes rumores acerca de un extraño de aspecto sospechoso recorriendo las calles en busca de hoja roja. Se recomienda alejarse de extraños y mantener a los niños acompañados.'},
  {location: 'Poza Aguada', date: 20190407, title: 'Trágico fin de la expedición vodacce', main: 'La expedición vodacce que tenía intención de encontrar y explorar la tumba del Imperatus Gaius Filipus termina en tragedia tras el ataque de bandidos montaigneses. Los supervivientes, parte del equipo que acompañaba a Oscar Zurita y Carlo Grazia Caligari, regresó la pasada semana portando las noticias.'},
];
const newsUlEl = document.querySelector('.news-ul');
const locationsUlEl = document.querySelector('.locations-container');
const pageTitle = document.querySelector('.page-title');

if (pageTitle.innerHTML==='News') {writeNews(allNews);}
if (pageTitle.innerHTML==='News') {writeLocations();}

function writeNews (news) {
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

function writeLocations () {
  let allLocations = [];
  for (const item of allNews) {
    if(!allLocations.includes(item.location)) {
      allLocations.push(item.location);
    }
  }
  allLocations.sort();
  allLocations.splice(0,0,'Thea');
  for (const location of allLocations){
    const newLi = document.createElement('li');
    const newLocation = document.createTextNode(location);
    newLi.appendChild(newLocation);
    newLi.classList.add('location-tab');
    if (location === 'Thea') { newLi.classList.add('Thea'); }
    newLi.addEventListener('click', filterLocation);
    locationsUlEl.appendChild(newLi);
  }
}

function filterLocation (event) {
  const selectedLocation = event.currentTarget.innerHTML;
  const locationNews = allNews.filter(item => (selectedLocation==='Thea')? item.location : item.location === selectedLocation);
  clearNews();
  writeNews(locationNews);
  const locationTabs = locationsUlEl.querySelectorAll('.location-tab');
  for (const tab of locationTabs){
    tab.classList.remove('selected-location-tab');
  }
  event.currentTarget.classList.add('selected-location-tab');
}

function clearNews () {
  newsUlEl.innerHTML = '';
}