let nameH1;
let climateSpan;
let populationSpan;
let terrainSpan;
let charactersDiv;
let filmsDiv;
const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener("DOMContentLoaded", () => {
  nameH1 = document.querySelector("h1#name");
  climateSpan = document.querySelector("span#climate");
  populationSpan = document.querySelector("span#population");
  terrainSpan = document.querySelector("span#terrain");
  filmsUl = document.querySelector("#films>ul");
  characterUl = document.querySelector("#characters>ul");
  const sp = new URLSearchParams(window.location.search);
  const id = sp.get("id");
  getPlanet(id);
});

async function getPlanet(id) {
  let planet;
  try {
    planet = await fetchPlanet(id);
    planet.character = await fetchCharacter(id);
    planet.films = await fetchFilms(id);
  } catch (ex) {
    console.error(`Error reading planet ${id} data.`, ex.message);
  }
  renderPlanet(planet);
}
async function fetchPlanet(id) {
  let planetUrl = `${baseUrl}/planets/${id}`;
  return await fetch(planetUrl).then((res) => res.json());
}

async function fetchCharacter(id) {
  const url = `${baseUrl}/planets/${id}/characters`;
  const characters = await fetch(url).then((res) => res.json());
  return characters;
}

async function fetchFilms(id) {
  const url = `${baseUrl}/planets/${id}/films`;
  const films = await fetch(url).then((res) => res.json());
  return films;
}
const renderPlanet = (planet) => {
  console.log(planet);
  document.title = `SWAPI - ${planet?.name}`; // Just to make the browser tab say their name
  nameH1.textContent = planet?.name;
  climateSpan.textContent = planet?.climate;
  populationSpan.textContent = planet?.population;
  terrainSpan.textContent = planet?.terrain;
  const charactersLis = planet?.character?.map(
    (character) =>
      `<li><a href="/character.html?id=${character.id}">${character.name}</li>`
  );
  characterUl.innerHTML = charactersLis.join("");
  const filmsLis = planet?.films?.map(
    (film) => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`
  );
  filmsUl.innerHTML = filmsLis.join("");
};
