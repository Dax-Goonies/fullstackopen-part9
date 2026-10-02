import express from 'express';
import patients from '../data/patients.ts';
import type { NonSensitivePatient } from '../data/types.ts';
import { v1 as uuid } from 'uuid';
import { z } from 'zod';
import toNewPatientEntry from '../ultils/utils.ts';
import { NewEntrySchema } from '../schemas.ts';

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
    const addedPatient = {id: newId, entries:[], ...newPatientEntry};
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

// GET: Fetch a specific patient info by id
router.get('/:id', (req, res) => {
  const patient = patients.find((p) => p.id === req.params.id);

  if (!patient) {
    res.status(404).send({ error: 'Patient not found' });
    return;
  }
  res.json(patient);
});

// POST: Add new entries
router.post('/:id/entries', (req, res) => {
  try {
    const patient = patients.find((p) => p.id === req.params.id);
    if (!patient) {
      res.status(404).send({ error: 'Patient not found' });
    }

    const newEntry = NewEntrySchema.parse(req.body);
    const entryWithId = { id: uuid(), ...newEntry};
    patient?.entries.push(entryWithId);
    res.json(patient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send(error.issues.map(i => i.message).join(', '));
    } else {
      res.status(400).send('Something went wrong.');
    }
  }
});

export default router;