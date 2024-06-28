import noImage from "./assets/default_placeholder.png";
// import noImage from "./assets/placeholder-image.jpg";
import Themes from "./Themes";
import settingsIcon from "./assets/SettingsGear.svg";
import Settings from "./Settings";
import { useState, useEffect } from "react";

export default function Header({ SetDiaryEntry, SetShowDiaryDetails, DiaryList, SetShowEntryExists, SetBlockClicks, SetDiarySettings, DiarySettings }) {
  const newEntry = { id: DiaryList.length > 0 ? DiaryList[0].id + 1 : 0, title: "", date: "", img: noImage, content: "" };
  const [ShowSettings, SetShowSettings] = useState(false);
  const today = Date().toString().split(" ");
  newEntry.date = `${today[2]}  ${today[1]}  ${today[3]}`;

  useEffect(() => {
    SetBlockClicks(ShowSettings);
  }, [ShowSettings]);

  return (
    <div className="bg-base-300 py-4 fixed z-10 w-full">
      <div className="max-w-[1116px] m-auto flex items-center justify-between flex-wrap">
        <div className="flex gap-4 items-center">
          <button className="btn btn-square btn-ghost" onClick={() => SetShowSettings(!ShowSettings)}>
            <svg xmlns="" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <div className="text-3xl pl-2 text-base-content ">Personal Diary</div>
          <div className="hidden">
            <Themes />
          </div>
        </div>

        <button
          onClick={() => {
            if (!DiarySettings.allowMultipleEtries) {
              if (!DiaryList.find((x) => x.date === newEntry.date)) {
                SetShowDiaryDetails(true);
                SetDiaryEntry(newEntry);
              } else SetShowEntryExists(true);
            } else {
              SetShowDiaryDetails(true);
              SetDiaryEntry(newEntry);
            }
          }}
          className=" px-8 py-4 btn btn-neutral w-[80%] m-auto sm:w-auto sm:mr-4 ">
          Add Entry
        </button>
      </div>
      <div>{ShowSettings && <Settings SetShowSettings={SetShowSettings} SetDiarySettings={SetDiarySettings} DiarySettings={DiarySettings} />}</div>
    </div>
  );
}
