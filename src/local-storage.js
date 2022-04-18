export function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites") || "{}");
}

export function getParty() {
  return JSON.parse(localStorage.getItem("party") || "{}");
}
