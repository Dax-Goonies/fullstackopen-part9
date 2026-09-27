import { NewPatientSchema } from '../schemas.ts';

const toNewPatientEntry = (object: unknown) => {
  return NewPatientSchema.parse(object);
};

export default toNewPatientEntry;