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

export const countStorage = storageFactory("count");
export const favoritesStorage = storageFactory("favorites");
export const notesStorage = storageFactory("notes");
