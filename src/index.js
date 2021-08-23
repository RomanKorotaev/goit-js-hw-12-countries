import './sass/main.scss';
import { alert, info, success, error } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
//import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';


//defaultModules.set(PNotifyMobile, {});

// error.set(PNotifyMobile, { });

info({
    text: 'Type here information message'
  });
 
/*
  alert({
    text: 'Notice me, senpai!'
  });
*/

const refs = {
    inputRef: document.querySelector('#search'),
    submitBtmRef: document.querySelector('#submitBtm'),
    countryListRef: document.querySelector('.countryList')
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
    refs.countryListRef.insertAdjacentHTML("beforeend", result);
}

// Для отрисовки массива данных, которые приходят от бэкенда используем цикл
function renderColection(arr) {
    arr.forEach(el => createItem (el))
}
 


const countryItem = `
 <p>...</p>
`


refs.submitBtmRef.addEventListener ("click", handlSubmit)
