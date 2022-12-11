const ROOT = document.querySelector("#root");
const url = "https://rickandmortyapi.com/api/character";
const CLOCK = document.querySelector("#clock");
let directory = "main";
let arrOfFavorites = [];
let newArr = [];

function start() {
  directory = "main";
  fetch(url)
    .then((resp) => resp.json())
    .then(
      (data) =>
        (ROOT.innerHTML = data.results
          .map((e) => {
            return createCard(e.name, e.species, e.image, e.id);
          })
          .join("")
          .toString())
    )
    .then(()=>{
    CARDS = document.querySelectorAll(".card-container");
    arrOfFavorites.forEach(el=>{
      CARDS.forEach(elem=>{
        if (elem.id === `idcard${el.id}`) {
          elem.querySelector('.addbutton').style.backgroundColor = "green";
          elem.querySelector('.addbutton').innerHTML = "added to favorites";
          elem.querySelector('.delbutton').disabled = false;
        }
      })
    })
    });
}
start();
function createCard(name, species, image, id) {
  return `
    <div onmouseover="this.style ='box-shadow: 10px 5px 5px red;'" onmouseout="this.style ='box-shadow: 0;'" id="idcard${id}" class="card-container">
        <h2 class="title">${name}</h2>
        <p>${species}</p>
        <div class="img-container">
            <img class="img" src=${image} alt="img ${name}"/>
        </div>
    <button onclick="addToFavorites(${id})" class='addbutton'>add to favorites</button>
    <button disabled="true" onclick="deleteFromFavorites(${id})" class='delbutton'>delete from favorites</button>
    </div>  
    `;
}

// clock_________________________________________-

const time = new Date();
const hours = time.getHours();
const minuts = time.getMinutes();
const seconds = time.getSeconds();

function testingTime(time, limit) {
  if (time > limit) {
    time = `0${0}`;
  } else if (time.toString().length < 2) {
    time = `0${time}`;
  }
  return time;
}

function clock(hours, minutes, seconds) {
  setInterval(() => {
    seconds++;
    if (seconds > 59) minutes++;
    if (minutes > 59) hours++;
    seconds = testingTime(seconds, 59);
    minutes = testingTime(minutes, 59);
    hours = testingTime(hours, 23);
    CLOCK.innerHTML = `${hours}:${minutes}:${seconds}`;
  }, 1000);
}
CLOCK.innerHTML = `${hours}:${minuts}:${seconds}`;
clock(hours, minuts, seconds);

//search____________________________
const INPUT = document.querySelector("#input");

INPUT.addEventListener("change", (e) => {
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      ROOT.innerHTML = data.results
        .map((el) => {
          if (el.name.toUpperCase().startsWith(e.target.value.toUpperCase())) {
            return createCard(el.name, el.species, el.image, el.id);
          }
        })
        .join("")
        .toString();
    })
    .then(()=>{
      CARDS = document.querySelectorAll(".card-container");
      arrOfFavorites.forEach(el=>{
        CARDS.forEach(elem=>{
          if (elem.id === `idcard${el.id}`) {
            elem.querySelector('.addbutton').style.backgroundColor = "green";
            elem.querySelector('.addbutton').innerHTML = "added to favorites";
            elem.querySelector('.delbutton').disabled = false;
          }
        })
      })
      });
});

//favorites___________________


function addToFavorites(id) {
  const CARDBUTTON = document.querySelector(`#idcard${id} .addbutton`);
  const DELBUTTON = document.querySelector(`#idcard${id} .delbutton`);

  CARDBUTTON.style.backgroundColor = "green";
  CARDBUTTON.innerHTML = "added to favorites";
  DELBUTTON.disabled = false;

  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      data.results.map((el) => {
        if (el.id === id) arrOfFavorites.push(el);
      });
    });
}

function createFavorites() {
  directory = "favorites";
  let status = true;
  arrOfFavorites.forEach((e) => {
    newArr.forEach((e1) => {
      if (e1.id === e.id) {
        status = false;
      }
    });
    if (status) newArr.push(e);
    status = true;
  });
  ROOT.innerHTML = newArr
    .map((el) => {
      return createCard(el.name, el.species, el.image, el.id);
    })
    .join("")
    .toString();
  const ADDBUTTONS = document.querySelectorAll(".addbutton");
  const DELBUTTONS = document.querySelectorAll(".delbutton");
  ADDBUTTONS.forEach((addBtn) => {
    addBtn.disabled = true;
  });
  DELBUTTONS.forEach((delBtn) => {
    delBtn.disabled = false;
  });
}

function deleteFromFavorites(id) {
  const CARDBUTTON = document.querySelector(`#idcard${id} .addbutton`);
  const DELBUTTON = document.querySelector(`#idcard${id} .delbutton`);
  CARDBUTTON.style.backgroundColor = "";
  CARDBUTTON.innerHTML = "add to favorites";
  DELBUTTON.disabled = true;
  newArr = newArr.map((e) => {
    if (e.id === id) e = "";
    return e;
  });
  newArr = newArr.filter((e) => e !== "");
  arrOfFavorites = newArr.filter((e) => e !== "");
  if (directory === "favorites") {
    ROOT.innerHTML = arrOfFavorites
      .map((el) => {
        return createCard(el.name, el.species, el.image, el.id);
      })
      .join("")
      .toString();
    const ADDBUTTONS = document.querySelectorAll(".addbutton");
    const DELBUTTONS = document.querySelectorAll(".delbutton");
    ADDBUTTONS.forEach((addBtn) => {
      addBtn.disabled = true;
    });
    DELBUTTONS.forEach((delBtn) => {
      delBtn.disabled = false;
    });
  }
}
