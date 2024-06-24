import noImage from "./assets/no-image.png";
export default function DiaryEntryDetails({ entry, SetDiaryEntry, SetShowDiaryDetails, SetDiaryList, DiaryList }) {
  function handleSubmit(e) {
    e.preventDefault();
    const entryExists = DiaryList.find((x) => x.date === entry.date);

    if (!entryExists) SetDiaryList([entry, ...DiaryList]);
    else {
      const newList = DiaryList;
      newList[DiaryList.indexOf(entryExists)] = entry;
      SetDiaryList([...newList]);
    }
    SetShowDiaryDetails(false);
  }

  function handleChange(e) {
    SetDiaryEntry({
      ...entry,
      [e.target.name]: e.target.value,
    });
  }

  function UploadImage(e) {
    console.log("Upload dialog..");
    e.preventDefault();
  }

  return (
    <div className="pointer-events-auto">
      <dialog open className="border-[#4c4f56] rounded-md top-[25%] fixed border-2 border-opacity-75 mx-auto max-w-[900px] container p-4 bg-[#21242d] text-[white] px-4">
        <form onSubmit={handleSubmit} action="" className="flex flex-col gap-2">
          <div className="flex justify-between gap-4">
            <div className="flex flex-col gap-0 justify-between w-full">
              <p className="bg-[#374151] rounded-md w-fit mx-auto px-6" type="text" name="date" id="date">
                {entry.date}
              </p>
              <input
                onChange={handleChange}
                value={entry.title}
                className="bg-[#374151] w-full rounded-md px-2 max-w-[450px]"
                type="text"
                name="title"
                id="title"
                placeholder="Enter the title of the entry"
              />
              <textarea
                value={entry.content}
                onChange={handleChange}
                className="bg-[#374151] rounded-md max-w-[450px] h-[180px] resize-none px-2"
                name="content"
                id="content"
                placeholder="Enter the details for the entry"></textarea>

              <div className="flex justify-between">
                <div className="flex gap-2 ">
                  <button type="submit" className="bg-[#4c4f56] w-fit px-6 py-1 rounded hover:bg-[#62666e]">
                    Save
                  </button>
                  <button onClick={(e) => SetShowDiaryDetails(false)} className="bg-[#4c4f56] w-fit px-4 py-1 rounded hover:bg-[#62666e]">
                    Cancel
                  </button>
                </div>
                <button onClick={UploadImage} className="bg-[#4c4f56] w-fit px-4 py-1 rounded hover:bg-[#62666e]">
                  Upload Image
                </button>
              </div>
            </div>
            <img className="w-full h-[280px] object-cover pl-4" src={entry.img ? entry.img : noImage} alt="" />
          </div>
        </form>
      </dialog>
    </div>
  );
}
