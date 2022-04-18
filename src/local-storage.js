function storageFactory(key) {
  return {
    get() {
      return JSON.parse(localStorage.getItem(key) || "{}");
    },
    set(value, type) {
      localStorage.setItem(
        key,
        JSON.stringify(type === "merge" ? { ...this.get(), ...value } : value)
      );
    },
  };
}

export const favoritesStorage = storageFactory("favorites");
export const notesStorage = storageFactory("notes");

export function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites") || "{}");
}

export function getParty() {
  return JSON.parse(localStorage.getItem("party") || "{}");
}
