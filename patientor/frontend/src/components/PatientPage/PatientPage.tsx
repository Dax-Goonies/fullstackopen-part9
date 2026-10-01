import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { Patient } from "../../types";
import patientService from "../../services/patients";
import genderIcon from "../../utils/genderIcon";
import EntryDetails from "./EntryDetails";
import diagnosisService from "../../services/diagnoses";
import type { Diagnosis } from "../../types";


const PatientPage = () => {
  const { id }= useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    if (id) {
      patientService.getPatient(id).then(setPatient);
      
    }
  }, [id]);

  useEffect(() => {
    diagnosisService.getAll().then(setDiagnoses);
  }, []);

  if (!patient) return <div>Loading patient...</div>;

  return (
    <div>
      <h2>{patient.name} {genderIcon(patient.gender)}</h2>
      <p>
        ssn: {patient.ssn}
        <br />
        occupation: {patient.occupation}
        <br />
        date of birth: {patient.dateOfBirth}
      </p>
      <h3>entries</h3>
      {patient.entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </div>
  );
};


export default PatientPage;