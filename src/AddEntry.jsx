// import noImage from "./assets/no-image.png";
import noImage from "./assets/placeholder-image.jpg";

export default function AddEntry({ SetDiaryEntry, SetShowDiaryDetails, DiaryList, SetShowEntryExists }) {
  const newEntry = { id: 0, title: "", date: "", img: noImage, content: "" };

  const today = Date().toString().split(" ");
  newEntry.date = `${today[2]}  ${today[1]}  ${today[3]}`;

  return (
    <div className="bg-[#21242d] py-4 fixed z-10 w-full">
      <div className="max-w-[1116px] m-auto flex items-center justify-between">
        <div className="text-3xl pl-2 text-white ">Personal Diary</div>
        <button
          onClick={() => {
            if (!DiaryList.find((x) => x.date === newEntry.date)) {
              SetShowDiaryDetails(true);
              SetDiaryEntry(newEntry);
            } else {
              SetShowEntryExists(true);
              // console.log("Entry for today is already exists. Please come tomorrow!");
            }
          }}
          className="bg-[#4c4f56] text-white px-8 py-4 hover:bg-[#565a61]">
          Add Entry
        </button>
      </div>
    </div>
  );
}
