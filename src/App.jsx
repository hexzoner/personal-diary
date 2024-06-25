import { useState, useEffect } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import noImage from "./assets/no-image.png";

import DiaryList from "./DiaryList";
import AddEntry from "./AddEntry";

function App() {
  const [DiaryEntry, SetDiaryEntry] = useState({ id: 0, title: "", date: "2024-06-24", img: noImage, content: "" });
  const [ShowDiaryDetails, SetShowDiaryDetails] = useState(false);

  return (
    <>
      <div className="font-[lato]">
        <DiaryList DiaryEntry={DiaryEntry} SetDiaryEntry={SetDiaryEntry} ShowDiaryDetails={ShowDiaryDetails} SetShowDiaryDetails={SetShowDiaryDetails} />
      </div>
    </>
  );
}

export default App;
