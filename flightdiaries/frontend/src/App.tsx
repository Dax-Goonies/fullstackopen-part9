import { useState, useEffect } from "react";
import type { DiaryEntry } from "./types";
import { getAllDiaries } from "./services/diaryService.ts";
import DiaryForm from "./components/DiaryForm.tsx";
import Notification from "./components/Notification.tsx";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
      getAllDiaries().then(setDiaries);
  }, []);

  return (
    <div>
      <h2>Add new entry</h2>
      <Notification message ={errorMessage} />
      <DiaryForm 
        onAdd={(entry) => setDiaries(diaries.concat(entry))}
        onError={(message) => {
          setErrorMessage(message);
          setTimeout(() => setErrorMessage(null), 5000);
        }}
      
      />
      <h2>Diary entries</h2>
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