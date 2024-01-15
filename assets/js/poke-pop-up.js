function handleDetailsButtonClick(event) {
  const pokemonId = event.target.dataset.pokemonId;
  showDetails(pokemonId);
}

function showDetails(pokemonId) {
  // Criei um overlay para deixar o fundo escurecido para dar destaque ao pop-up
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);

  // Fiz uma nova requisição para que o offset e limit viesse sem valores após clicar num card de Pokemon
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;

  fetch(url)
    .then((response) => response.json())
    .then((pokemon) => {
      pokemon.id == pokemonId;

      const popup = document.createElement("div");
      const pokemonType = pokemon.types[0].type.name;
      popup.classList.add("pokemon-popup", pokemonType);
      popup.innerHTML = createPopupContent(pokemon);

      document.body.appendChild(popup);

      overlay.style.display = "block";
    });
}

function createPopupContent(pokemon) {
  return `          
  <div class="popup-header">
    <div class="popup-header-text">
      <span class="number">#${pokemon.id}</span>
      <h2 class="name">${pokemon.name}</h2>
      </div>
    <button class="popup-close-button" onclick="closePopup()">X</button>
  </div>
  <div class="popup-body">
    <div class="popup-body-infos">
      <span class="popup-details">Altura: ${pokemon.height}</span>
      <span class="popup-details">Peso: ${pokemon.weight}</span>
      <span class="popup-details">HP: ${pokemon.stats[0].base_stat}</span>
      <span class="popup-details">Ataque: ${pokemon.stats[1].base_stat}</span>
      <span class="popup-details">Defesa: ${pokemon.stats[2].base_stat}</span>
      <span class="popup-details">Ataque especial: ${pokemon.stats[3].base_stat}</span>
      <span class="popup-details">Defesa especial: ${pokemon.stats[4].base_stat}</span>
      <span class="popup-details">Velocidade: ${pokemon.stats[5].base_stat}</span>
      </div>
    <img src="${pokemon.sprites.other.showdown.front_default}" alt="${pokemon.name}" class="popup-img">
  </div>
  `;
}

function closePopup() {
  // Função chamada para fechar o pop-up e remover o overlay
  const popup = document.querySelector(".pokemon-popup");
  const overlay = document.querySelector(".overlay");

  if (popup && overlay) {
    popup.remove();
    overlay.remove();
  }
}
