import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { EntryWithoutId, Patient } from "../../types";
import patientService from "../../services/patients";
import genderIcon from "../../utils/genderIcon";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntry";
import { Button } from '@mui/material';
import axios from "axios";


const PatientPage = () => {
  const { id }= useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

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
      <AddEntryModal 
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientPage;