import express from 'express';
import { isNotNumber } from './utils.js';
import { calculateBmi } from './bmiCalculator.js';
import { calculateExercises } from './exerciseCalculator.js';

const app = express();

app.use(express.json());

// Basic route to check if the server is running
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

// Endpoint for the BMI calculator
app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  if (isNotNumber(height) || isNotNumber(weight)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const heightNum = Number(height);
  const weightNum = Number(weight);
  const bmi = calculateBmi(heightNum, weightNum);

  return res.json({
    height: heightNum,
    weight: weightNum,
    bmi
  });
});

// Interface for the request body of the exercise calculator
interface ExerciseRequestBody {
  daily_exercises: number[];
  target: number;
}

// POST: Send daily exercise hours and target to calculate exercise statistics
app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as ExerciseRequestBody;

  if (daily_exercises === undefined || target === undefined) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  if (!Array.isArray(daily_exercises) || isNotNumber(target)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  if (daily_exercises.some((h: unknown) => isNotNumber(h))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const dailyHoursNum: number[] = daily_exercises.map(Number);
  const targetNum: number = Number(target);

  const result = calculateExercises(dailyHoursNum, targetNum);
  return res.json(result);
});

// Port configuration and server start
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});