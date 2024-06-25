const storageKey = "personal-diary";

export function AddListToStorage(list) {
  //   console.log("Storing the list of entries");
  localStorage.setItem(storageKey, JSON.stringify(list));
}

export function GetListFromStorage() {
  return JSON.parse(localStorage.getItem(storageKey)) || [];
}
