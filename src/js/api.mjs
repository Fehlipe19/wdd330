const charactersURL = "https://fehlipe19.github.io/wdd231/final_project/data/character.json";

async function getCharacterData() {
  try {
    const response = await fetch(charactersURL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching character data:", error);
  }
}
