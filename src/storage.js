const storageKey = "personal-diary";
const storageSettingsKey = "personal-diary-settings";

export function SaveListToStorage(list) {
  localStorage.setItem(storageKey, JSON.stringify(list));
}

export function GetListFromStorage() {
  return JSON.parse(localStorage.getItem(storageKey)) || [];
}

export function SaveSettings(settings) {
  localStorage.setItem(storageSettingsKey, JSON.stringify(settings));
}

export function LoadSettings() {
  return JSON.parse(localStorage.getItem(storageSettingsKey)) || [];
}
