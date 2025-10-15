const charactersURL = "https://fehlipe19.github.io/wdd231/final_project/data/character.json";

const spellsURL = "https://www.dnd5eapi.co/api/2014/spells/";
export const dndURL = "https://www.dnd5eapi.co";

export async function getSpellsData() {
  try {
    const response = await fetch(spellsURL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching spells data:", error);
  }
}

export async function getSpecificSpell(spell) {
  try {
    const response = await fetch(dndURL + spell);
    const data = response.json();
    return data;
  } catch (error) {
    console.error("Error fetching specific spell data:", error);
  }
}

export async function getCharacterData() {
  try {
    const response = await fetch(charactersURL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching character data:", error);
  }
}
