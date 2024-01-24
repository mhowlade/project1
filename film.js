let filmName;
let releaseDateSpan;
let directorSpan;
let episodeSpan;
//Lists of links
let charsUl;
let planetsUl;
//Films links
let charsDiv
//Plants links
let planetsDiv
//base
const baseUrl = `https://swapi2.azurewebsites.net/api/films`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  filmName = document.querySelector('h1#name');
  releaseDateSpan = document.querySelector('span#releaseDate');
  directorSpan = document.querySelector('span#director');
  episodeSpan = document.querySelector('span#episode');
  charsUl = document.querySelector('#characters>ul');
  planetsUl = document.querySelector('#planets>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getFilm(id)
});

async function getFilm(id) {
  let film;
  let line = 0;
  try {
    film = await fetchFilm(id)
    line++;
    film.chars = await fetchChars(id)
    line++;
    film.planets = await fetchPlanets(id)
  }
  catch (ex) {
    console.error(`Error reading film ${id} data. fetch request: ` + `${line}`, ex.message);
  }
  renderFilm(film);

}
async function fetchFilm(id) {
  let filmUrl = `${baseUrl}/${id}`;
  return await fetch(filmUrl)
    .then(res => res.json())
}

async function fetchChars(id) {
  const url = `${baseUrl}/${id}/characters`;
  const chars = await fetch(url)
    .then(res => res.json())
  return chars;
}

async function fetchPlanets(id) {
  const url = `${baseUrl}/${id}/planets`;
  const planets = await fetch(url)
    .then(res => res.json())
  return planets;
}

const renderFilm = film => {
  document.title = `SWAPI - ${film?.title}`;
  filmName.textContent = film?.title;
  releaseDateSpan.textContent = film?.release_date;
  directorSpan.textContent = film?.director;
  episodeSpan.textContent = film?.episode_id;
  const charsLis = film?.chars?.map(char => `<li><a href="/character.html?id=${char?.id}">${char?.name}</li>`);
  const planetsLis = film?.planets?.map(planet => `<li><a href="/planet.html?id=${planet?.id}">${planet?.name}</li>`);
  console.log(charsLis);
  charsUl.innerHTML = charsLis.join("");
  planetsUl.innerHTML = planetsLis.join("");
}
