import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Divider } from '@mui/material';
import type { Diagnosis, EntryWithoutId, Patient } from "../../types";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";
import genderIcon from "../../utils/genderIcon";
import EntryDetails from "./EntryDetails/EntryDetails";
import AddEntryModal from "./AddEntry/AddEntryModal";

const PatientPage = () => {
  const { id }= useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryWithoutId) => {
    if (!id) return;
    try {
      const updated = await patientService.addEntry(id, values);
      setPatient(updated);
      setModalOpen(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setError(String(error.response.data));
      }
    }
  };

  useEffect(() => {
    diagnosisService.getAll().then(setDiagnoses);
  }, []);

  useEffect(() => {
    if (id) {
      patientService.getPatient(id).then(setPatient);
    }
  }, [id]);

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
      {patient.entries.length === 0 ? (
        <p>No entries for this patient</p>
      ) : (
        patient.entries.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} />
      ))
      )}
      <Divider sx={{ marginY: 2 }} />
      <AddEntryModal 
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        diagnoses={diagnoses}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientPage;