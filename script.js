document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input");
    const pokemonDataDiv = document.getElementById("pokemon-data");
    const pokemonTypesDiv = document.getElementById("types");
    const sprite = document.getElementById("sprite");

    searchInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        searchButton.click();
      }
    });

    const updateStatBar = (statName, value) => {
      const maxStat = 150; 
      const percentage = (value / maxStat) * 100;
      const barElement = document.getElementById(`${statName}-bar`);
      barElement.style.width = `${percentage}%`;
      
      if (percentage >= 70) {
        barElement.style.backgroundColor = '#4CAF50';
      } else if (percentage >= 50) {
        barElement.style.backgroundColor = '#FFC107';
      } else {
        barElement.style.backgroundColor = '#FF5722';
      }
    };

    searchButton.addEventListener("click", async () => {
      const query = searchInput.value.trim().toLowerCase();

      pokemonDataDiv.classList.add("hidden");
      sprite.classList.add("hidden");
      pokemonTypesDiv.innerHTML = "";

      if (!query) {
        alert("Please enter a Pokémon name or ID.");
        return;
      }

      try {
        searchButton.disabled = true;
        searchButton.textContent = "Searching...";

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
        if (!response.ok) {
          throw new Error("Pokémon not found");
        }

        const data = await response.json();

        document.getElementById("pokemon-name").textContent = data.name.toUpperCase();
        document.getElementById("pokemon-id").textContent = `#${String(data.id).padStart(3, '0')}`;
        document.getElementById("weight").textContent = `Weight: ${(data.weight / 10).toFixed(1)} kg`;
        document.getElementById("height").textContent = `Height: ${(data.height / 10).toFixed(1)} m`;

        const stats = {
          'hp': 0,
          'attack': 1,
          'defense': 2,
          'special-attack': 3,
          'special-defense': 4,
          'speed': 5
        };

        Object.entries(stats).forEach(([stat, index]) => {
          const value = data.stats[index].base_stat;
          document.getElementById(stat).textContent = value;
          document.getElementById(`${stat}-bar`).style.width = '0%';
          setTimeout(() => updateStatBar(stat, value), 100);
        });

        const artworkUrl = data.sprites.other['official-artwork'].front_default;
        sprite.src = artworkUrl || data.sprites.front_default;
        sprite.alt = data.name;

        data.types.forEach((type) => {
          const typeElement = document.createElement("span");
          typeElement.className = `pokemon-type type-${type.type.name}`;
          typeElement.textContent = type.type.name.toUpperCase();
          pokemonTypesDiv.appendChild(typeElement);
        });

        requestAnimationFrame(() => {
          sprite.classList.remove("hidden");
          pokemonDataDiv.classList.remove("hidden");
        });

        const bigLight = document.querySelector('.light-big');
        bigLight.style.animation = 'blink 1s';
        bigLight.addEventListener('animationend', () => {
          bigLight.style.animation = '';
        });

      } catch (error) {
        alert("Pokémon not found. Please check the name or ID and try again.");
      } finally {
        searchButton.disabled = false;
        searchButton.textContent = "Search";
      }
    });

    const dpadButtons = document.querySelectorAll('.d-pad-btn');
    dpadButtons.forEach(button => {
      button.addEventListener('mousedown', () => {
        button.style.backgroundColor = '#000';
      });
      button.addEventListener('mouseup', () => {
        button.style.backgroundColor = '#232323';
      });
      button.addEventListener('mouseleave', () => {
        button.style.backgroundColor = '#232323';
      });
    });

    const style = document.createElement('style');
    style.textContent = `
      @keyframes blink {
        0% { background-color: white; }
        50% { background-color: #87CEEB; }
        100% { background-color: white; }
      }
    `;
    document.head.appendChild(style);
  });