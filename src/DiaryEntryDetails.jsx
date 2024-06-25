import noImage from "./assets/no-image.png";
import { useState } from "react";
import { SaveListToStorage } from "./storage";
import imageCompression from "browser-image-compression";

export default function DiaryEntryDetails({ entry, SetDiaryEntry, SetShowDiaryDetails, SetDiaryList, DiaryList }) {
  const [file, setFile] = useState(null);
  const [ShowCompressed, SetShowCompressed] = useState(false);
  const [ShowConfirm, SetShowConfirm] = useState(false);
  const [CompressedMsg, SetCompressedMsg] = useState("");

  const greenButtonClasses = "bg-[#1e7973] w-fit px-4 py-1 rounded hover:bg-[#32918a]";
  const redButtonClasses = "bg-red-900 w-fit px-3 py-1 rounded hover:bg-red-500";
  const defaultButtonClasses = "bg-[#4c4f56] w-fit px-3 py-1 rounded hover:bg-[#62666e]";
  const maxImageSize = 360;

  function handleSubmit(e) {
    e.preventDefault();
    // const entryExists = DiaryList.find((x) => x.date === entry.date);
    const entryExists = DiaryList.find((x) => x.id === entry.id);

    if (!entryExists) {
      //Adding new entry
      SetDiaryList([entry, ...DiaryList]);
      SaveListToStorage([entry, ...DiaryList]);
    } else {
      //Updating already existed entry
      const newList = DiaryList;
      newList[DiaryList.indexOf(entryExists)] = entry;
      SetDiaryList([...newList]);
      SaveListToStorage([...newList]);
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
    if (file) handleImageUpload(file, e.target.name);

    async function handleImageUpload(imageFile, propName) {
      // const imageFile = event.target.files[0];
      // console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
      // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
      // let originalSize = `${(imageFile.size / 1024 / 1024).toFixed(2)} MB`;
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: maxImageSize,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(imageFile, options);
        // console.log("compressedFile instanceof Blob", compressedFile instanceof Blob); // true
        // console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
        SetCompressedMsg(`Compressed from ${(imageFile.size / 1024 / 1024).toFixed(2)} MB` + " to " + `${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`);
        SetShowCompressed(true);

        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onload = () => {
          setFile(reader.result);
          SetDiaryEntry({
            ...entry,
            [propName]: reader.result,
          });
        };
      } catch (error) {
        console.log(error);
      }
    }

    // const imgSrc = URL.createObjectURL(e.target.files[0]);
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
    <div className={ShowConfirm ? "pointer-events-none" : "pointer-events-auto"}>
      <dialog open className="border-[#4c4f56] rounded-md top-[12%] fixed border-2 border-opacity-75 mx-auto max-w-[900px] w-fit p-4 bg-[#21242d] text-[white] px-4">
        <form onSubmit={handleSubmit} action="" className="flex flex-col gap-2">
          <div className="flex justify-between gap-4 flex-wrap sm:flex-nowrap ">
            <div className="flex flex-col gap-0 justify-between   ">
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
                  <button type="submit" className={greenButtonClasses}>
                    Save
                  </button>

                  <button onClick={(e) => SetShowDiaryDetails(false)} className={defaultButtonClasses}>
                    Close
                  </button>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      SetShowConfirm(true);
                    }}
                    className={redButtonClasses}>
                    Delete
                  </button>
                </div>

                <label htmlFor="file" className={defaultButtonClasses}>
                  Upload Image
                </label>
                <input className="hidden" onChange={handleImageChange} type="file" name="img" id="file" />
              </div>
            </div>
            <div className="  ">
              <img className="max-w-[400px] h-[280px] object-scale-down w-full" src={getEntryImage()} alt="" />
              {ShowCompressed && <p className="text-gray-300 text-center italic text-sm">{CompressedMsg}</p>}
            </div>
          </div>

          {ShowConfirm && (
            <dialog open className="pointer-events-auto border-[#4c4f56] rounded-md top-[45%] fixed border-2 border-opacity-75 mx-auto max-w-[250px] w-full p-6 bg-[#21242d] text-[white] px-4">
              <p className="text-center">Are you sure you want to delete this entry?</p>
              <div className="flex justify-between mt-4 px-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    SetShowDiaryDetails(false);
                    const newList = DiaryList;
                    newList.splice(DiaryList.indexOf(entry), 1);
                    SaveListToStorage([...newList]);
                    // console.log(newList);
                  }}
                  className={redButtonClasses}>
                  Delete
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    SetShowConfirm(false);
                  }}
                  className={defaultButtonClasses}>
                  Cancel
                </button>
              </div>
            </dialog>
          )}
        </form>
      </dialog>
    </div>
  );
}
