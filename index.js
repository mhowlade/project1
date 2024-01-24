let characters = [];
let matchingCharacters = [];
const charactersList = document.querySelector("#charactersList")

document.addEventListener('DOMContentLoaded', getCharacters)

async function getCharacters() {
  let url = 'https://swapi2.azurewebsites.net/api/characters';

  try {
    let fetchedCharacters = JSON.parse(sessionStorage.getItem("characters"));
    if (fetchedCharacters == null){
      console.log("No local data for chars found.");
      fetchedCharacters = await fetch(url)
      .then(res => res.json())
      //save to local
      const cIdsNames = fetchedCharacters?.map(char => ({id: char?.id, name: char?.name}));
      fetchedCharacters = cIdsNames;
      sessionStorage.setItem("characters",JSON.stringify(cIdsNames))
    }
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