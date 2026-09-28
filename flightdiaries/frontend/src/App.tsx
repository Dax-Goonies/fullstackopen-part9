import { useState, useEffect } from "react";
import type { DiaryEntry } from "./types";
import { getAllDiaries } from "./services/diaryServices";
import DiaryForm from "./components/DiaryForm";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
      getAllDiaries().then(setDiaries);
  }, []);

  return (
    <div>
      <h2>Diary entries</h2>
      <DiaryForm onAdd={(entry) => setDiaries(diaries.concat(entry))} />
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>
            weather: {diary.weather}
            <br />
            visibility: {diary.visibility}
          </p>
        </div>
      ))}
    </div>
  );
};

export default App;