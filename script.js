// Globala variabler
let characters = [];
let army = JSON.parse(localStorage.getItem("army")) || [];

// Funktion: Ladda karaktärsdata från JSON
async function loadCharacters() {
    const response = await fetch("characters.json");
    characters = await response.json();
    populateCharacterList();
    updateArmy();
}

// Funktion: Visa karaktärslista
function populateCharacterList() {
    const characterList = document.getElementById("character-list");
    characterList.innerHTML = ""; // Rensa listan
    characters.forEach((character, index) => {
        const li = document.createElement("li");
        li.innerHTML = ` 
            <span class="character-name" onclick="showCharacterDetails(${index})">${character.name}</span> (${character.points} poäng)
            <button onclick="addToArmy(${index})">Lägg till i armé</button>
        `;
        characterList.appendChild(li);
    });
}


// Funktion: Visa detaljer för en karaktär
function showCharacterDetails(index) {
    const character = characters[index];

    // Uppdatera karaktärens namn och poäng på sidan
    document.getElementById("character-name").textContent = `Namn: ${character.name}`;
    document.getElementById("character-points").textContent = `Poäng: ${character.points}`;
    
    // Visa karaktärens bild om den finns
    const image = document.getElementById("character-image");
    if (character.image) {
        image.src = character.image;  // Sätt källan till bilden (lägg till korrekt sökväg)
        image.style.display = "block";  // Gör bilden synlig
    } else {
        image.style.display = "none";  // Dölja bilden om ingen bild finns
    }
}





// Funktion: Lägg till karaktär i armén
function addToArmy(index) {
    const selectedCharacter = characters[index];
    army.push(selectedCharacter);
    saveArmy();
    updateArmy();
}

// Funktion: Uppdatera armélistan
function updateArmy() {
    const armyList = document.getElementById("army-list");
    const totalPointsEl = document.getElementById("total-points");
    armyList.innerHTML = "";
    let totalPoints = 0;

    army.forEach((character, index) => {
        const li = document.createElement("li");
        li.textContent = `${character.name} (${character.points} poäng)`;
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Ta bort";
        removeBtn.addEventListener("click", () => {
            removeFromArmy(index);
        });
        li.appendChild(removeBtn);
        armyList.appendChild(li);
        totalPoints += character.points;
    });

    totalPointsEl.textContent = totalPoints;
}

// Funktion: Ta bort karaktär från armén
function removeFromArmy(index) {
    army.splice(index, 1);
    saveArmy();
    updateArmy();
}

// Funktion: Spara armé lokalt
function saveArmy() {
    localStorage.setItem("army", JSON.stringify(army));
}

// Hämta och visa data när sidan laddas
document.getElementById("save-army").addEventListener("click", () => {
    alert("Armé sparad lokalt!");
    saveArmy();
});
loadCharacters();
