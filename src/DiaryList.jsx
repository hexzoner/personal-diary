import { useState, useEffect } from "react";
import DiaryListItem from "./DiaryListItem";
import DiaryEntryDetails from "./DiaryEntryDetails";
import noImage from "./assets/no-image.png";
import { GetListFromStorage } from "./storage";
import AddEntry from "./AddEntry";
import dummyImg from "./assets/dummy.jpeg";

export default function DiaryList({ DiaryEntry, SetDiaryEntry, ShowDiaryDetails, SetShowDiaryDetails }) {
  const [DiaryList, SetDiaryList] = useState([
    {
      id: 4,
      title: "It can also be successfully used",
      date: "2024-06-23",
      img: dummyImg,
      content:
        "By taking the writer away from the subject matter that is causing the block, a random sentence may allow them to see the project theyre working on in a different light and perspective. For those writers who have writers block, this can be an excellent way to take a step to crumbling those walls. By taking the writer away from the subject matter that is causing the block, a random sentence may allow them to see the project theyre working on in a different light and perspective. Sometimes all it takes is to get that first sentence down to help break the block. It can also be successfully used as a daily exercise to get writers to begin writing. Being shown a random sentence and using it to complete a paragraph each day can be an excellent way to begin any writing session.",
    },
    {
      id: 3,
      title: "Random Sentence Generator",
      date: "2024-06-22",
      img: dummyImg,
      content:
        "For those writers who have writers block, this can be an excellent way to take a step to crumbling those walls. By taking the writer away from the subject matter that is causing the block, a random sentence may allow them to see the project theyre working on in a different light and perspective. Sometimes all it takes is to get that first sentence down to help break the block. It can also be successfully used as a daily exercise to get writers to begin writing. Being shown a random sentence and using it to complete a paragraph each day can be an excellent way to begin any writing session.",
    },
    {
      id: 2,
      title: "Frequently Asked Questions",
      date: "2024-06-21",
      img: dummyImg,
      content:
        "In order to have a complete sentence, the sentence must have a minimum of three word types: a subject, a verb, and an object. In most cases, the subject is a noun or a pronoun. For example, the sentence 'Jack loves candy' is a complete sentence because it has all three elements needed to make a complete sentence. Jack (the subject) loves (the verb) candy (the object).",
    },
    { id: 1, title: "Diary Title 1", date: "2024-06-19", img: dummyImg, content: "This is some entry on day 1" },
  ]);

  const [ShowEntryExists, SetShowEntryExists] = useState(false);

  useEffect(() => SetDiaryList(GetListFromStorage()), []);

  return (
    <div className={ShowEntryExists || ShowDiaryDetails ? "pointer-events-none" : "pointer-events-auto"}>
      <AddEntry SetDiaryEntry={SetDiaryEntry} SetShowDiaryDetails={SetShowDiaryDetails} DiaryList={DiaryList} SetShowEntryExists={SetShowEntryExists} />
      <div className="pt-32 pb-24 m-auto bg-[#16181e] min-h-[100vh]">
        {DiaryList.length > 0 ? (
          <div className=" grid grid-cols-4 m-auto max-w-[1116px] gap-6">
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
