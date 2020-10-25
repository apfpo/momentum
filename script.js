// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  date = document.querySelector('.date'),
  blockquote = document.querySelector('blockquote'),
  btn_quote = document.querySelector('.btn-quote'),
  btn_city = document.querySelector('.btn-city'),
  div_city = document.querySelector('.city'),
  btn_image = document.querySelector('.btn-bgimg');

const weekDaysName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const images = [ ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg'], 
                ['07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg'], 
                ['13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg'], 
                ['19.jpg', '20.jpg', '21.jpg', '22.jpg', '23.jpg', '24.jpg'] ];
// Show Time
function showTime() {
  let today = new Date(),
    month = today.getMonth(),
    day = today.getDate(),
    weekDay = today.getDay(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
  date.innerHTML = `${weekDaysName[weekDay]}, ${monthName[month]}  ${day}`;
  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();
    
  if(hour < 6){
    greeting.textContent = 'Good Night, ';
    document.body.style.backgroundImage = `url('backgrounds/${images[3][Math.floor(Math.random()*images[3].length)]}')`
  }  
  else if (hour < 12) {
    greeting.textContent = 'Good Morning, ';
     document.body.style.backgroundImage = `url('backgrounds/${images[0][Math.floor(Math.random()*images[0].length)]}')`
  } else if (hour < 18) {
   greeting.textContent = 'Good Afternoon, ';
    document.body.style.backgroundImage = `url('backgrounds/${images[1][Math.floor(Math.random()*images[1].length)]}')`
  } else {  
    greeting.textContent = 'Good Evening, ';
     document.body.style.backgroundImage = `url('backgrounds/${images[2][Math.floor(Math.random()*images[2].length)]}')`
  }
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name').length === 0 ? name.textContent : localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

function clickName(){
    name.textContent = '';
}
function blurName(){
  name.textContent = name.textContent == '' ? localStorage.getItem('name') : name.textContent
}

function clickFocus(){
    focus.textContent = '';
}
function blurFocus(){
    focus.textContent = focus.textContent == '' ? localStorage.getItem('focus') : focus.textContent
}
// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

//QUOTE
async function getQuote() {  
  const url = `https://quote-garden.herokuapp.com/api/v2/quotes/random`;
  const res = await fetch(url);
  const data = await res.json(); 
  blockquote.textContent = `${data.quote.quoteText} (Author: ${data.quote.quoteAuthor})`;
}

//WEATHER
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
let city = "";

async function getWeather() {
  city = localStorage.getItem('city');
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=464c8c77411749c15be7b1d51ad0a2ab&units=metric`
  const res = await fetch(url);
  const data = await res.json();
  if(data.cod === "404"){
   alert('City not found') 
   return;
  }
  div_city.textContent = localStorage.getItem('city');
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `temperature: ${data.main.temp.toFixed(0)}°C, humidity: ${data.main.humidity}%, wind speed: ${data.wind.speed}m/s `;
  weatherDescription.textContent = data.weather[0].description;
}

async function setCity() {
    city = prompt("Enter city");
    if( city.length != 0 || city !== null) localStorage.setItem('city', city)
      else localStorage.getItem('city')
    getWeather()
}

// IMAGE
const base = 'backgrounds/';
let i = 0;

function viewBgImage(data) {
  const body = document.querySelector('body')
  const src = data;
  const img = document.createElement('img');
  img.src = src;
  img.onload = () => {      
    body.style.backgroundImage = `url(${src})`;
  }; 
}

function getImage() {
  const index1 = i % 24;
  const imageSrc = base + images.flat()[index1];
  viewBgImage(imageSrc);
  i++;
  btn_image.disabled = true;
  setTimeout(function() { btn_image.disabled = false }, 1000);
} 


btn_image.addEventListener('click', getImage);
name.addEventListener('blur', blurName);
name.addEventListener('click', clickName);
focus.addEventListener('blur', blurFocus);
focus.addEventListener('click', clickFocus);
document.addEventListener('DOMContentLoaded', getWeather);
btn_city.addEventListener('click', setCity);
document.addEventListener('DOMContentLoaded', getQuote);
btn_quote.addEventListener('click', getQuote);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// Run
showTime();
setBgGreet();
getName();
getFocus();
getWeather();
