import { useState } from "react";
import type { SyntheticEvent } from "react";
import {  TextField, Grid, Button } from '@mui/material';
import type { EntryWithoutId } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: "HealthCheck",
      description,
      date,
      specialist,
      healthCheckRating: Number(healthCheckRating) as 0 | 1 | 2 | 3,
      diagnosisCodes: diagnosisCodes.length >0
      ? diagnosisCodes.split(",").map((code) => code.trim())
      : undefined,
    });
    setDate("");
    setDescription("");
    setSpecialist("");
    setHealthCheckRating("");
    setDiagnosisCodes("");
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <h4>New HealthCheck Entry</h4>
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField 
        label="Description"
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        />
        <TextField 
        label="Specialist"
        fullWidth
        value={specialist}
        onChange={(e) => setSpecialist(e.target.value)}
        />
        <TextField 
        label="Health Check Rate (0-3)"
        fullWidth
        value={healthCheckRating} 
        onChange={(e) => setHealthCheckRating(e.target.value)}
        />
        <TextField
        label="Diagnosis Codes (comma-separated)"
        fullWidth
        value={diagnosisCodes} 
        onChange={(e) => setDiagnosisCodes(e.target.value)}
        />
        <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
          <Grid size="auto">
            <Button
              color="secondary"
              variant="contained"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid size="auto">
            <Button
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;