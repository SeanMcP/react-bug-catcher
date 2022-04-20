function storageFactory(key) {
  return {
    get() {
      console.info("[storage > get]", key);
      return JSON.parse(localStorage.getItem(key) || "{}");
    },
    set(value, type) {
      console.info("[storage > set]", key);
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
