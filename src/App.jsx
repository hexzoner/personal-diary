import DiaryList from "./DiaryList";

export function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1);
}

function App() {
  return (
    <>
      <div className="font-[lato]">
        <DiaryList />
      </div>
    </>
  );
}

export default App;
