import axios from "axios";
import type { Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

// GET: Fetch all patient for the list
const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );
  return data;
};

// POST: Create new patient
const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );
  return data;
};

// GET: Fetch info on a specific patient by id
const getPatient = async (id: string ): Promise<Patient> => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );
  return data;
};

export default {
  getAll, create, getPatient
};

