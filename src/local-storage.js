function storageFactory(key) {
  return {
    get() {
      return JSON.parse(localStorage.getItem(key) || "{}");
    },
    set(value) {
      localStorage.setItem(key, JSON.stringify({ ...this.get(), ...value }));
    },
  };
}

export const notesStorage = storageFactory("notes");

export function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites") || "{}");
}

export function getParty() {
  return JSON.parse(localStorage.getItem("party") || "{}");
}
