const ROOT = document.querySelector("#root");
const url = "https://rickandmortyapi.com/api/character";

fetch(url)
  .then((resp) => resp.json())
  .then(
    (data) =>
      (ROOT.innerHTML = data.results
        .map((e) => createCard(e.name, e.species, e.image, e.id))
        .join("")
        .toString())
  );

function createCard(name, species, image, id) {
  return `
    <div onmouseover="this.style ='box-shadow: 10px 5px 5px red;'" onmouseout="this.style ='box-shadow: 0;'" id="#${id}" class="card-container">
        <h2 class="title">${name}</h2>
        <p>${species}</p>
        <div class="img-container">
            <img class="img" src=${image} alt="img ${name}"/>
        </div>
    </div>
    `;
}



