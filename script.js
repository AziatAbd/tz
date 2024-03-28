const fetchButton = document.querySelector("#fetch-characters");
const charactersContainer = document.querySelector(".characters-container");
const characterNameInput = document.querySelector("#name");
const search = document.querySelector("#search");
const btnContainer = document.querySelector("#btn-container");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let page = 1;
const BASE_URL = "https://rickandmortyapi.com/api/character";

btnContainer.classList.add("is-visible");
const fetchCharacters = async (page) => {
  try {
    const response = await fetch(`${BASE_URL}?page=${page}`);
    const data = await response.json();

    renderCharacters(data.results);
    fetchButton.innerText = "refresh";

    btnContainer.classList.remove("is-visible");
    if (data.info.prev === null) {
      prevBtn.disabled = true;
    } else {
      prevBtn.disabled = false;
    }
  } catch (error) {
    console.error("Error fetching characters:", error);
  }
};

fetchButton.addEventListener("click", () => fetchCharacters(page));

const renderCharacters = (characters) => {
  const characterCards = characters
    .map(
      (character) => `   
    <div class="character-card">
      <img src="${character.image}" alt="${
        character.name
      }" class="character-image"/>
      <div class="character-info">
        <h3 class="character-name">${character.name}</h3>
        <p class="character-description">
        <span class="status" style="background-color: ${
          character.status === "Alive"
            ? "green"
            : character.status === "unknown"
            ? "gray"
            : "red"
        }"></span>
        ${character.status} - ${character.species}</p>
      </div>
    </div>
  `
    )
    .join("");

  charactersContainer.innerHTML = characterCards;
};

nextBtn.addEventListener("click", () => {
  fetchCharacters(++page);
});
prevBtn.addEventListener("click", () => {
  fetchCharacters(--page);
});

const searchCharacterRequest = async (val) => {
  try {
    const res = await fetch(`${BASE_URL}?page=${page}&name=${val}`);
    const filteredCharacter = await res.json();

    renderCharacters(filteredCharacter.results);
    fetchButton.innerText = "refresh";

    btnContainer.classList.remove("is-visible");
    if (filteredCharacter.info.prev === null) {
      prevBtn.disabled = true;
    } else {
      prevBtn.disabled = false;
    }
  } catch (error) {
    return console.error(error);
  }
};

characterNameInput.addEventListener("keyup", (e) => {
  let timer;
  clearTimeout(timer);
  timer = setTimeout(() => {
    searchCharacterRequest(e.target.value);
  }, 1500);
});

search.addEventListener("click", () => {
  searchCharacterRequest(characterNameInput.value);
});
