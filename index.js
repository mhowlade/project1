let characters = [];
let matchingCharacters = [];
const charactersList = document.querySelector("#charactersList")

document.addEventListener('DOMContentLoaded', getCharacters)

async function getCharacters() {
  let url = 'https://swapi2.azurewebsites.net/api/characters';

  try {
    const fetchedCharacters = await fetch(url)
      .then(res => res.json())
    characters.push(...fetchedCharacters);
  }
  catch (ex) {
    console.error("Error reading characters.", ex.message);
  }
  console.log("All the characters are ", characters)
  renderCharacters(characters);
}

const filterCharacters = () => {
  const searchString = document.querySelector("#searchString").value;
  const re = new RegExp(searchString, "i");
  matchingCharacters = characters.filter(character => re.test(character.name))
  renderCharacters(matchingCharacters);
}

const renderCharacters = characters => {
  const divs = characters.map(character => {
    const el = document.createElement('div');
    el.addEventListener('click', () => goToCharacterPage(character.id));
    el.textContent = character.name;
    return el;
  })
  charactersList.replaceChildren(...divs)
}

const goToCharacterPage = id => window.location = `/character.html?id=${id}`

//Films
document.addEventListener('DOMContentLoaded', getfilms)

async function getfilms() {
  let url = 'https://swapi2.azurewebsites.net/api/films';

  try {
    const fetchedfilms = await fetch(url)
      .then(res => res.json())
    films.push(...fetchedfilms);
  }
  catch (ex) {
    console.error("Error reading films.", ex.message);
  }
  console.log("All the films are ", films)
  renderfilms(films);
}

const filterfilms = () => {
  const searchString = document.querySelector("#searchString").value;
  const re = new RegExp(searchString, "i");
  matchingfilms = films.filter(film => re.test(film.title))
  renderfilms(matchingfilms);
}

const renderfilms = films => {
  const divs = films.map(film => {
    const el = document.createElement('div');
    el.addEventListener('click', () => goTofilmPage(film.id));
    el.textContent = film.title;
    return el;
  })
  filmsList.replaceChildren(...divs)
}

const goTofilmPage = id => window.location = `/film.html?id=${id}`
//END FILMS