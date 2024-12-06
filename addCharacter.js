const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Sökvägar
const charactersFilePath = path.join(__dirname, 'characters.json');
const imagesFolderPath = path.join(__dirname, 'images');

// Läs karaktärer från filen eller skapa en tom lista
let characters = [];
if (fs.existsSync(charactersFilePath)) {
    characters = JSON.parse(fs.readFileSync(charactersFilePath, 'utf-8'));
}

// Funktion för att lägga till karaktär
async function addCharacter() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const question = (query) =>
        new Promise((resolve) => rl.question(query, resolve));

    try {
        const name = await question('Namn på karaktär: ');
        const points = await question('Poäng för karaktär: ');

        console.log('Ladda upp en bild för karaktären:');
        console.log(`(Placera bilden i mappen "${imagesFolderPath}" och skriv filnamnet här)`);

        const imageName = await question('Bildens filnamn (inklusive filändelse, t.ex. karaktar_a1.jpg): ');

        const imagePath = path.join(imagesFolderPath, imageName);

        // Kontrollera om bilden existerar
        if (!fs.existsSync(imagePath)) {
            console.error('Filen hittades inte. Kontrollera att du lagt bilden i mappen "images".');
            rl.close();
            return;
        }

        // Lägg till karaktären
        const newCharacter = {
            name: name.trim(),
            points: parseInt(points, 10),
            image: `images/${imageName}`,
        };

        characters.push(newCharacter);

        // Spara uppdaterad lista till JSON-filen
        fs.writeFileSync(charactersFilePath, JSON.stringify(characters, null, 2));
        console.log(`Karaktär "${name}" tillagd!`);
    } catch (err) {
        console.error('Något gick fel:', err);
    } finally {
        rl.close();
    }
}

// Kör skriptet
addCharacter();
