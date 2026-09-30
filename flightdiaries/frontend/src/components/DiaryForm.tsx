import { useState  } from 'react';
import axios from 'axios';
import type { SyntheticEvent } from 'react';
import { createDiary } from '../services/diaryService';
import type { DiaryEntry, Weather, Visibility } from '../types';
import { visibilities, weathers } from '../types';

interface DiaryFormProps {
  onAdd: (entry: DiaryEntry) => void;
  onError: (message: string) => void;
}

// DiaryForm component: Add new diary to the backend
const DiaryForm = ({ onAdd, onError }: DiaryFormProps) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState<Weather | "">("");
  const [visibility, setVisibility] = useState<Visibility | "">("");
  const [comment, setComment] = useState("");

  const submit = async (event: SyntheticEvent) => {
    event.preventDefault();
    // Check all required fields are filled, except comment
    if (!date || !weather || !visibility) {
      onError("All fields must be filled in");
      return;
    }
    try {
      const created = await createDiary({
        date,
        weather,
        visibility,
        comment,
      });
      onAdd(created);
      setDate("");
      setWeather("");
      setVisibility("");
      setComment("");
    } catch (error: unknown) {
      // Find the field triggering the rror
        if (axios.isAxiosError(error) && error.response) {
          const data = error.response.data as {
            error?: { path: (string | number)[] }[];
          };
          // Custom error message
          if (data.error) {
            const values: Record<string, string> = { date, weather, visibility, comment }
            const messages = data.error.map((issue) => {
              const field = String(issue.path[0]);
              return `Invalid ${field}: ${values[field]}`;
            });
            onError(messages.join(", "));
          } else {
            onError("Something went wrong")
          }
        } else {
            onError("Unrecognized axios error");
        }
      }
      
  }

  return (
    <div>
      <form onSubmit={submit}>
        <label>
          date <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <div>
          visibility
          {visibilities.map((v) => (
            <label key={v}>
              <input
                type="radio"
                name="visibility"
                value={v}
                checked={visibility === v}
                onChange={() => setVisibility(v)}
              />
              {v}
            </label>
          ))}
        </div>
        <div>
          weather
          {weathers.map((w) => (
            <label key={w}>
              <input
                type="radio"
                name="weather"
                value={w}
                checked={weather === w}
                onChange={() => setWeather(w)}
              />
              {w}
            </label>
          ))}
        </div>
        <label>
          comment <input value={comment} onChange={(e) => setComment(e.target.value)} />
        </label>
        <br />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default DiaryForm