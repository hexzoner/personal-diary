import DiaryEntryDetails from "./DiaryEntryDetails";
import { useState } from "react";
// import noImage from "./assets/no-image.png";
// import reactLogo from "./assets/react.svg";
import dummyImg from "./assets/dummy.jpeg";

export default function DiaryListItem({ entry, SetShowDiaryDetails, SetDiaryEntry }) {
  const sectionStyle = { textShadow: "1px 1px 2px black, 0 0 25px blue, 0 0 5px black" };

  return (
    <div
      style={sectionStyle}
      className={`rounded-[11px] m-auto text-white relative hover:cursor-pointer border-[#9ba5c5] 
        border-opacity-0 hover:border-opacity-50 border-solid border-[3px] w-[250px] h-[375px]`}
      onClick={() => {
        SetShowDiaryDetails(true);
        SetDiaryEntry(entry);
      }}>
      <img className="rounded-[8px] relative w-full h-full object-cover " src={entry.img} alt="no image" />
      <div className="absolute flex flex-col bottom-0 rounded-[8px] bg-[#1f1b0583] justify-end gap-1 py-1 px-1  w-full">
        <p className="px-2 rounded-md w-fit relative drop-shadow-2xl  ">{entry.date}</p>
        <div className="">
          <p className=" px-2 rounded-md w-fit font-semibold relative mb-2">{entry.title}</p>
          <p className="italic px-2 rounded-md w-fit text-sm relative text-ellipsis overflow-hidden max-h-[120px] pb-2">{entry.content}</p>
        </div>
      </div>
    </div>
  );
}