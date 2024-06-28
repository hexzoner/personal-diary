// import noImage from "./assets/no-image.png";
import { useState } from "react";
import { SaveListToStorage } from "./storage";
import imageCompression from "browser-image-compression";

export default function DiaryEntryDetails({ entry, SetDiaryEntry, SetShowDiaryDetails, SetDiaryList, DiaryList }) {
  const [file, setFile] = useState(null);
  const [ShowCompressed, SetShowCompressed] = useState(false);
  const [ShowConfirm, SetShowConfirm] = useState(false);
  const [CompressedMsg, SetCompressedMsg] = useState("");
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorContent, setErrorContent] = useState(false);

  const greenButtonClasses = "btn btn-success";
  const redButtonClasses = "btn btn-error";
  const defaultButtonClasses = "btn btn-neutral";
  const defaultMultiAreaClasses = "bg-base-100 text-base-content rounded-md max-w-[550px] h-[70%] min-h-[200px] resize-none px-2 border-solid border-error  border-[3px] border-opacity-0";
  const titleClasses = "bg-base-100 text-base-content w-full rounded-md px-2 max-w-[550px] text-lg border-solid border-error  border-[3px] border-opacity-0";
  const maxImageSize = 480;

  function handleSubmit(e) {
    e.preventDefault();

    if (entry.content === "") setErrorContent(true);
    else setErrorContent(false);

    if (entry.title === "") setErrorTitle(true);
    else setErrorTitle(false);

    if (entry.title === "" || entry.content === "") return;

    // const entryExists = DiaryList.find((x) => x.date === entry.date);
    const entryExists = DiaryList.find((x) => x.id === entry.id);

    if (!entryExists) {
      //Adding new entry
      entry.new = false;
      // setIsNew(entry.new);
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
    setErrorContent(false);
    setErrorTitle(false);
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
    else return entry.img ? entry.img : "";
  }

  return (
    <div className={ShowConfirm ? "pointer-events-none" : "pointer-events-auto"}>
      <dialog open className="border-neutral-content rounded-md top-[13%] fixed border-2 border-opacity-75 mx-auto max-w-[1000px] w-full p-4 bg-base-300 text-neutral-content px-4">
        <form onSubmit={handleSubmit} action="" className="flex flex-col gap-2">
          <div className="flex justify-between gap-4 flex-wrap sm:flex-nowrap ">
            <div className="flex flex-col gap-1 justify-between w-full md:w-[60%] min-h-[300px]">
              <p className="bg-base-100 text-base-content rounded-md w-fit mx-auto px-6 text-lg" type="text" name="date" id="date">
                {entry.date}
              </p>
              <input
                onChange={handleChange}
                value={entry.title}
                className={errorTitle ? titleClasses + ` border-opacity-75` : titleClasses}
                type="text"
                name="title"
                id="title"
                placeholder="Enter the title of the entry"
              />
              <textarea
                value={entry.content}
                onChange={handleChange}
                className={errorContent ? defaultMultiAreaClasses + ` border-opacity-75` : defaultMultiAreaClasses}
                name="content"
                id="content"
                placeholder="Enter the details for the entry"></textarea>

              <div className="flex justify-between max-w-[550px] gap-2 items-center pt-3">
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
                    className={!entry.new ? redButtonClasses : "hidden"}>
                    Delete
                  </button>
                </div>

                <label htmlFor="file" className={`${defaultButtonClasses} hover:cursor-pointer`}>
                  Upload Image
                </label>
                <input className="hidden" onChange={handleImageChange} type="file" name="img" id="file" />
              </div>
            </div>
            <div className="  ">
              <img className="max-w-[600px] sm:h-[480px] w-full object-scale-down " src={getEntryImage()} alt="" />
              {ShowCompressed && <p className="text-base-content text-center italic text-sm">{CompressedMsg}</p>}
            </div>
          </div>

          {ShowConfirm && (
            <dialog open className="pointer-events-auto border-neutral-content rounded-md top-[45%] fixed border-2 border-opacity-75 mx-auto max-w-[250px] w-full p-6 px-4">
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
