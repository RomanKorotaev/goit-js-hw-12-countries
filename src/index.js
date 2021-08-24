import './sass/main.scss';
import { alert, info, success, error } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
//import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import oneCountryTpl from './templates/oneCountryTpl.hbs';


//defaultModules.set(PNotifyMobile, {});

// error.set(PNotifyMobile, { });
/*
info({
    text: 'Type here information message'
  });
  */
 
/*
  alert({
    text: 'Notice me, senpai!'
  });
*/

const refs = {
    inputRef: document.querySelector('#search'),
    submitBtmRef: document.querySelector('#submitBtm'),
    countryListRef: document.querySelector('.countryList'),

}

const handlSubmit = (event) => {
    event.preventDefault();
    console.log('refs.inputRef.value = ', refs.inputRef.value);
    const nameOfCountry = refs.inputRef.value;

    // Эндпоинт из задания: https://restcountries.eu/rest/v2/name/{name}
    fetch(`https://restcountries.eu/rest/v2/name/${nameOfCountry}`)
    .then(response => response.json())
    //.then(country => console.log(country))
    .then(country =>renderColection(country))
    .catch(err=>console.log('От бекенда пришёл промис с ошибкой! ',err))
}

// Данная функция получает объект, из которого нам нужен только кльч с именем. 
//Назначение функции добавлять и отрисовывать в DOM-элемент то, что получили от бекэнда
//Для удобства проводим деструктуризацию {name} , чтобы взять из множества ключей, которые есть в объекте, только нужный 
function createItem({name}) {
  const result = `<li>${name}</li>`
  
  // здесь используем именно insertAdjacentHTML, а не innerHTML = result чтобы вывести все элементы цыкла,
  //а не перезаписывать их друг на друга. Иначе выведет на экран только последний элемент цикла
  refs.countryListRef.insertAdjacentHTML("beforeend", result); 

}

// Для отрисовки массива данных, которые приходят от бэкенда используем цикл
function renderColection(arr) {
  // Если нацдена только одна страна, то выдаём по ней подробную информацию по шаблону oneCountryTpl.hbs
  if (arr.length === 1) {
    console.log('Найдена одна страна: arr.length === 1')
   
    const cardsMarkup = createOneCountryItem(arr);
    // здесь используем innerHTML , а не insertAdjacentHTML('beforeend', cardsMarkup) чтобы стереть результаты предыдущего поиска
    refs.countryListRef.innerHTML = cardsMarkup;

  }

  // если находим больше 10 стран, то выкидываем модальное окно с предупреждением
      if (arr.length > 10) {
        console.log('Найдено более 10 стран : arr.length > 10')
        error({
            text: 'Too many matches found. Please enter a more specific query! '
          });
      }

  if (arr.length >= 2 && arr.length <= 10) {
    console.log('arr.length >= 2 && arr.length <= 10')
    refs.countryListRef.innerHTML = '';// используем innerHTML = '' чтобы стереть результаты предыдущего поиска
    arr.forEach(el => createItem(el))
    console.log("arr = ", arr)
  }
}
 
function createOneCountryItem(arr) {
  console.log ( "arr= = ", arr)
  return arr.map(oneCountryTpl).join(''); // как написать не через map? Есть ли другоц вариант записи?
 // return oneCountryTpl(arr);
  
}

///--------------------
var debounce = require('lodash.debounce');
window.addEventListener('click', debounce(onScroll, 500));
let onScrollCounter = 0;
function onScroll(event) {
  onScrollCounter += 1;
  console.log (' onScrollCounter = ',  onScrollCounter)
}
///--------------------

refs.submitBtmRef.addEventListener ("click", handlSubmit)
