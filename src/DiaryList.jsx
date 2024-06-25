import { useState, useEffect } from "react";
import DiaryListItem from "./DiaryListItem";
import DiaryEntryDetails from "./DiaryEntryDetails";
import noImage from "./assets/no-image.png";
import { GetListFromStorage, LoadSettings } from "./storage";
import Header from "./Header";

export default function DiaryList() {
  const [DiaryList, SetDiaryList] = useState([]);
  const [DiaryEntry, SetDiaryEntry] = useState({ id: 0, title: "", date: "2024-06-24", img: noImage, content: "" });
  const [ShowEntryExists, SetShowEntryExists] = useState(false);
  const [ShowDiaryDetails, SetShowDiaryDetails] = useState(false);
  const [DiarySettings, SetDiarySettings] = useState({ allowMultipleEtries: true });
  const [BlockClicks, SetBlockClicks] = useState(false);

  useEffect(() => {
    SetDiaryList(GetListFromStorage());
    SetDiarySettings(LoadSettings());
  }, []); //OnStart - Get diary entries and Settings from local storage

  return (
    <div className={ShowEntryExists || ShowDiaryDetails || BlockClicks ? "pointer-events-none" : "pointer-events-auto"}>
      <Header
        SetDiaryEntry={SetDiaryEntry}
        SetShowDiaryDetails={SetShowDiaryDetails}
        DiaryList={DiaryList}
        SetShowEntryExists={SetShowEntryExists}
        SetBlockClicks={SetBlockClicks}
        DiarySettings={DiarySettings}
        SetDiarySettings={SetDiarySettings}
      />

      <div className="pt-32 pb-24 m-auto bg-[#16181e] min-h-[100vh]">
        {DiaryList.length > 0 ? (
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  m-auto max-w-[1116px] gap-6">
            {DiaryList.map((entry) => {
              // return <DiaryListItem key={entry.date} entry={entry} SetShowDiaryDetails={SetShowDiaryDetails} SetDiaryEntry={SetDiaryEntry} />;
              return <DiaryListItem key={entry.id} entry={entry} SetShowDiaryDetails={SetShowDiaryDetails} SetDiaryEntry={SetDiaryEntry} />;
            })}
          </div>
        ) : (
          <div className="text-white text-center text-3xl pt-48"> No entries were added</div>
        )}

        <div>
          {ShowDiaryDetails && <DiaryEntryDetails entry={DiaryEntry} SetDiaryEntry={SetDiaryEntry} SetShowDiaryDetails={SetShowDiaryDetails} SetDiaryList={SetDiaryList} DiaryList={DiaryList} />}
          {ShowEntryExists && (
            <div>
              <dialog open className="px-8 py-6 fixed top-[40%] bg-[#21242d] text-white rounded-lg">
                <div className="flex flex-col gap-8">
                  <p>The Diary Entry for today exists, please try again tomorrow!</p>
                  <button onClick={() => SetShowEntryExists(false)} className="pointer-events-auto bg-[#565a61] px-4 py-2 rounded w-fit m-auto hover:bg-[#6a6f77] ">
                    Dismiss
                  </button>
                </div>
              </dialog>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
