import noImage from "./assets/no-image.png";
import { useState } from "react";
import { AddListToStorage } from "./storage";

export default function DiaryEntryDetails({ entry, SetDiaryEntry, SetShowDiaryDetails, SetDiaryList, DiaryList }) {
  const [file, setFile] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    // const entryExists = DiaryList.find((x) => x.date === entry.date);
    const entryExists = DiaryList.find((x) => x.id === entry.id);

    if (!entryExists) {
      SetDiaryList([entry, ...DiaryList]);
      AddListToStorage([entry, ...DiaryList]);
    } else {
      const newList = DiaryList;
      newList[DiaryList.indexOf(entryExists)] = entry;
      SetDiaryList([...newList]);
      AddListToStorage([...newList]);
    }
    SetShowDiaryDetails(false);
  }

  function handleChange(e) {
    SetDiaryEntry({
      ...entry,
      [e.target.name]: e.target.value,
    });
  }

  function handleImageChange(e) {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log(reader.result);
        const imgSrc = reader.result;
        setFile(imgSrc);
        SetDiaryEntry({
          ...entry,
          [e.target.name]: imgSrc,
        });
      };
      // reader.addEventListener(
      //   "load",
      //   function () {
      //     // img.src = reader.result;
      //     console.log(reader.result);
      //   },
      //   false
      // );
      reader.readAsDataURL(file);
    }

    // const imgSrc = URL.createObjectURL(e.target.files[0]);
    // setFile(imgSrc);
    // SetDiaryEntry({
    //   ...entry,
    //   [e.target.name]: imgSrc,
    // });
  }

  function getEntryImage() {
    if (file) return file;
    else return entry.img ? entry.img : noImage;
  }

  return (
    <div className="pointer-events-auto">
      <dialog open className="border-[#4c4f56] rounded-md top-[20%] fixed border-2 border-opacity-75 mx-auto max-w-[900px] container p-4 bg-[#21242d] text-[white] px-4">
        <form onSubmit={handleSubmit} action="" className="flex flex-col gap-2">
          <div className="flex justify-between gap-4 flex-wrap sm:flex-nowrap">
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

              <div className="flex justify-between max-w-[450px] gap-2">
                <div className="flex gap-2 ">
                  <button type="submit" className="bg-[#4c4f56] w-fit px-6 py-1 rounded hover:bg-[#62666e]">
                    Save
                  </button>
                  <button onClick={(e) => SetShowDiaryDetails(false)} className="bg-[#4c4f56] w-fit px-4 py-1 rounded hover:bg-[#62666e]">
                    Cancel
                  </button>
                </div>

                <label htmlFor="file" className="text-white hover:cursor-pointer bg-[#4c4f56] px-4 py-1 hover:bg-[#62666e] rounded">
                  Upload Image
                </label>
                <input className="hidden" onChange={handleImageChange} type="file" name="img" id="file" />
              </div>
            </div>
            <img className="max-w-[400px] h-[280px] object-scale-down w-[60%]" src={getEntryImage()} alt="" />
          </div>
        </form>
      </dialog>
    </div>
  );
}
