import { SaveSettings } from "./storage";
import Themes from "./Themes";

export default function Settings({ SetShowSettings, DiarySettings, SetDiarySettings }) {
  function handleClick(e) {
    SetShowSettings(false);
  }

  function handleCheckboxMultiple(e) {
    SetDiarySettings({
      ...DiarySettings,
      [e.target.name]: e.target.checked,
    });
    SaveSettings({
      ...DiarySettings,
      [e.target.name]: e.target.checked,
    });
  }

  return (
    <div>
      <dialog open className="px-8 py-6 fixed top-[10%] sm:right-[45%] sm:w-fit w-full  bg-base-200 text-base-content  rounded-lg pointer-events-auto">
        <div className="flex flex-col gap-8">
          <p className="text-lg">Settings</p>
          <div className="flex gap-4 ">
            <p>Multiple entries per day: </p>
            <input checked={DiarySettings.allowMultipleEtries} onChange={handleCheckboxMultiple} className="w-[20px]" type="checkbox" name="allowMultipleEtries" id="allowMultipleEtries" />
          </div>
          <div className="w-full m-auto">
            <Themes />
          </div>

          <button onClick={handleClick} className="pointer-events-auto px-4 py-1  w-fit m-auto btn btn-neutral ">
            Close
          </button>
        </div>
      </dialog>
    </div>
  );
}
