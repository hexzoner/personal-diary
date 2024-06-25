import { SaveSettings } from "./storage";

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
      <dialog open className="px-8 py-6 fixed top-[10%] right-[55%] bg-[#21242d] text-white rounded-lg pointer-events-auto">
        <div className="flex flex-col gap-8">
          <p className="text-lg">Settings</p>
          <div className="flex gap-4 ">
            <p>Allow multiple entries per day: </p>
            <input checked={DiarySettings.allowMultipleEtries} onChange={handleCheckboxMultiple} className="w-[20px]" type="checkbox" name="allowMultipleEtries" id="allowMultipleEtries" />
          </div>
          <button onClick={handleClick} className="pointer-events-auto bg-[#565a61] px-4 py-1 rounded w-fit m-auto hover:bg-[#6a6f77] ">
            Close
          </button>
        </div>
      </dialog>
    </div>
  );
}
