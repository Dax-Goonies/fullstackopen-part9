import { z } from 'zod';
import { Gender } from './data/types.ts';

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string()
});

export type NewPatient = z.infer<typeof NewPatientSchema>;