import React, { useEffect } from "react";
import { capitalize } from "./App";
const storageKey = "personal-diary-theme";

export default function Themes() {
  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
  ];
  const [theme, setTheme] = React.useState("light");
  React.useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    setTheme(JSON.parse(localStorage.getItem(storageKey)) || "light");
  }, []);

  function handleChange(e) {
    setTheme(e.target.value);
    localStorage.setItem(storageKey, JSON.stringify(e.target.value));
  }

  return (
    <select onChange={handleChange} value={theme} className="gradientselect w-full h-[32px] px-2 text-xs" data-choose-theme>
      {themes.map((theme) => {
        return (
          <option key={theme} className="bg-base-100 text-xs" value={theme}>
            {capitalize(theme)}
          </option>
        );
      })}
    </select>
  );
}
