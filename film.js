
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
  //Check if we already have char data for this film
  const data = sessionStorage.getItem("film" + id +"CharData");
  if (data != null)
  {
    console.log("we have local char data");
    return JSON.parse(data);
  }
  const url = `${baseUrl}/${id}/characters`;
  const chars = await fetch(url)
    .then(res => res.json());
  //save to local storage
  const cIdsNames = chars?.map(char => ({id: char?.id, name: char?.name}));
  sessionStorage.setItem("film" + id + "CharData",JSON.stringify(cIdsNames));
  return chars;
}

async function fetchPlanets(id) {
  //Check if we already have planet data for this film
  const data = sessionStorage.getItem("film" + id +"PlanetData");
  if (data != null)
  {
    console.log("we have local planet data");
    return JSON.parse(data);
  }
  const url = `${baseUrl}/${id}/planets`;
  const planets = await fetch(url)
    .then(res => res.json())
  //save to local storage
  const pIdsNames = planets?.map(planet => ({id: planet?.id, name: planet?.name}));
  sessionStorage.setItem("film" + id + "PlanetData",JSON.stringify(pIdsNames))
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
  charsUl.innerHTML = charsLis.join("");
  planetsUl.innerHTML = planetsLis.join("");
}
