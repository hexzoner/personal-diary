// import noImage from "./assets/no-image.png";
import noImage from "./assets/placeholder-image.jpg";
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
    <div className="bg-[#21242d] py-4 fixed z-10 w-full">
      <div className="max-w-[1116px] m-auto flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <div className="text-3xl pl-2 text-white ">Personal Diary</div>
          <img
            onClick={() => SetShowSettings(!ShowSettings)}
            className="w-[28px] shadow-white  rounded-full hover:cursor-pointer hover:transition-transform hover:scale-110"
            src={settingsIcon}
            alt=""
          />
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
          className="bg-[#4c4f56] text-white px-8 py-4 hover:bg-[#565a61]">
          Add Entry
        </button>
      </div>
      <div>{ShowSettings && <Settings SetShowSettings={SetShowSettings} SetDiarySettings={SetDiarySettings} DiarySettings={DiarySettings} />}</div>
    </div>
  );
}
