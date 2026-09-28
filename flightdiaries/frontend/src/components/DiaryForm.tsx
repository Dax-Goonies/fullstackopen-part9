import { useState  } from 'react';
import type { SyntheticEvent } from 'react';
import { createDiary } from '../services/diaryServices';
import type { DiaryEntry, Weather, Visibility } from '../types';

interface DiaryFormProps {
  onAdd: (entry: DiaryEntry) => void;
}

// DiaryForm component: Add new diary to the backend
const DiaryForm = ({ onAdd }: DiaryFormProps) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");

  const submit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const created = await createDiary({
      date,
      weather: weather as Weather,
      visibility: visibility as Visibility,
      comment,
    });
    onAdd(created);
    setDate("");
    setWeather("");
    setVisibility("");
    setComment("");
  };

  return (
    <form onSubmit={submit}>
      <label>
        date <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <br />
      <label>
        weather <input value={weather} onChange={(e) => setWeather(e.target.value)} />
      </label>
      <br />
      <label>
        visibility <input value={visibility} onChange={(e) => setVisibility(e.target.value)} />
      </label>
      <br />
      <label>
        comment <input value={comment} onChange={(e) => setComment(e.target.value)} />
      </label>
      <br />
      <button type="submit">add</button>
    </form>
  );
};

export default DiaryForm