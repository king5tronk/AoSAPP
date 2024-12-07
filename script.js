// Globala variabler
let characters = [];
let army = JSON.parse(localStorage.getItem("army")) || [];

// Funktion: Ladda karaktärsdata från JSON
async function loadCharacters() {
    const response = await fetch("characters.json");
    characters = await response.json();
    populateCharacterDropdown();
    updateArmy();
}

// Funktion: Visa karaktärslista i en rullgardinsmeny
function populateCharacterDropdown() {
    const dropdown = document.getElementById("character-dropdown");
    dropdown.innerHTML = '<option value="" disabled selected>Välj en karaktär</option>';
    characters.forEach((character, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${character.name} (${character.points} poäng)`;
        dropdown.appendChild(option);
    });
}

// Funktion: Hantera val av karaktär från rullgardinsmenyn
document.getElementById("character-dropdown").addEventListener("change", function () {
    const index = this.value;
    if (index !== "") {
        showCharacterDetails(index); // Visa karaktärsdetaljer
    }
});

// Funktion: Visa detaljer för en karaktär
function showCharacterDetails(index) {
    const character = characters[index];
    const image = document.getElementById("character-image");

    if (character) {
        
        // Visa karaktärens bild
        if (character.image) {
            image.src = character.image;
            image.style.display = "block";
        } else {
            image.style.display = "none";
        }
    }
}

// Funktion: Lägg till vald karaktär i armén
document.getElementById("add-to-army").addEventListener("click", function () {
    const dropdown = document.getElementById("character-dropdown");
    const index = dropdown.value;
    if (index !== "") {
        addToArmy(index);
    }
});

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

        // Klickbart namn för att visa karaktärens bild
        const characterName = document.createElement("span");
        characterName.textContent = `${character.name} (${character.points} poäng)`;
        characterName.classList.add("army-character");
        characterName.addEventListener("click", () => {
            showCharacterDetailsFromArmy(index);
        });

        // Ta bort-knapp
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Ta bort";
        removeBtn.addEventListener("click", () => {
            removeFromArmy(index);
        });

        li.appendChild(characterName);
        li.appendChild(removeBtn);
        armyList.appendChild(li);

        totalPoints += character.points;
    });

    totalPointsEl.textContent = totalPoints;
}

// Funktion: Visa detaljer för en karaktär från armén
function showCharacterDetailsFromArmy(index) {
    const character = army[index];
    const image = document.getElementById("character-image");

    if (character) {
        
        // Visa karaktärens bild
        if (character.image) {
            image.src = character.image;
            image.style.display = "block";
        } else {
            image.style.display = "none";
        }
    }
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
