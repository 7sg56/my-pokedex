document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input");
    const pokemonDataDiv = document.getElementById("pokemon-data");
    const pokemonTypesDiv = document.getElementById("types");
  
    searchButton.addEventListener("click", async () => {
      const query = searchInput.value.trim().toLowerCase();
  
      // Clear previous data
      pokemonDataDiv.classList.add("hidden");
      pokemonTypesDiv.innerHTML = "";
  
      if (!query) {
        alert("Please enter a Pokémon name or ID.");
        return;
      }
  
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
        if (!response.ok) {
          throw new Error("Pokémon not found");
        }
  
        const data = await response.json();
  
        // Fill in the Pokémon data
        document.getElementById("pokemon-name").textContent = data.name.toUpperCase();
        document.getElementById("pokemon-id").textContent = `#${data.id}`;
        document.getElementById("weight").textContent = `Weight: ${data.weight}`;
        document.getElementById("height").textContent = `Height: ${data.height}`;
        document.getElementById("hp").textContent = `HP: ${data.stats[0].base_stat}`;
        document.getElementById("attack").textContent = `Attack: ${data.stats[1].base_stat}`;
        document.getElementById("defense").textContent = `Defense: ${data.stats[2].base_stat}`;
        document.getElementById("special-attack").textContent = `Special Attack: ${data.stats[3].base_stat}`;
        document.getElementById("special-defense").textContent = `Special Defense: ${data.stats[4].base_stat}`;
        document.getElementById("speed").textContent = `Speed: ${data.stats[5].base_stat}`;
  
        // Add the sprite
        let spriteElement = document.getElementById("sprite");
        if (!spriteElement) {
          spriteElement = document.createElement("img");
          spriteElement.id = "sprite";
          spriteElement.className = "pokemon-image";
          document.querySelector(".pokemon-details").prepend(spriteElement);
        }
        spriteElement.src = data.sprites.front_default;
  
        // Add Pokémon types
        data.types.forEach((type) => {
          const typeElement = document.createElement("span");
          typeElement.className = "pokemon-type";
          typeElement.textContent = type.type.name.toUpperCase();
          pokemonTypesDiv.appendChild(typeElement);
        });
  
        // Show the data
        pokemonDataDiv.classList.remove("hidden");
      } catch (error) {
        alert("Pokémon not found");
      }
    });
  });
  