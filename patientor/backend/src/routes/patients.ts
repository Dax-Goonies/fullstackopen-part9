import express from 'express';
import patients from '../data/patients.ts';
import type { NonSensitivePatient } from '../data/types.ts';
import { v1 as uuid } from 'uuid';
import { z } from 'zod';
import toNewPatientEntry from '../ultils/utils.ts';

const router = express.Router();

// GET: Fetch all patients without sensitive information
router.get('/', (_req, res) => {
  const nonSentitivePatients: NonSensitivePatient[] = patients.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id, name, dateOfBirth, gender, occupation,
  }));
  res.json(nonSentitivePatients);
});

// POST: Add a new patient entry
router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const newId = uuid();
    const addedPatient = {id: newId, ...newPatientEntry};
    patients.push(addedPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof z.ZodError) {
      errorMessage = error.issues.map(i => i.message).join(', ');
    } 
      res.status(400).send(errorMessage);
  }
});

export default router;