import { useState } from "react";
import type { SyntheticEvent } from "react";
import { MenuItem, Select, TextField, Grid, Button, InputLabel, FormControl } from '@mui/material';
import type { SelectChangeEvent } from "@mui/material";
import type { EntryWithoutId, EntryType, Diagnosis } from "../../../types";
import HealthCheckFields from "./HealthCheckFields";
import HospitalCheckFields from "./HospitalCheckFields";
import OccupationalFields from "./OccupationalFields";
import { assertNever } from "../../../utils/assertNever";
import DiagnosisSelect from "./DiagnosisSelect";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  diagnoses: Diagnosis[];
}

// AddEntryForm component: Add specific entry depending on EntryType
const AddEntryForm = ({ onSubmit, onCancel, diagnoses }: Props) => {
  const [type, setType] = useState<EntryType>("HealthCheck");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [healthCheckRating, setHealthCheckRating] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");

  const renderTypeFields = () => {
    switch (type) {
      case "HealthCheck":
        return <HealthCheckFields healthCheckRating={healthCheckRating} setHealthCheckRating={setHealthCheckRating} />;
      case "Hospital":
        return <HospitalCheckFields dischargeDate={dischargeDate} setDischargeDate={setDischargeDate} dischargeCriteria={dischargeCriteria} setDischargeCriteria={setDischargeCriteria} />;
      case "OccupationalHealthcare":
        return <OccupationalFields employerName={employerName} setEmployerName={setEmployerName} sickLeaveStart={sickLeaveStart} setSickLeaveStart={setSickLeaveStart} sickLeaveEnd={sickLeaveEnd} setSickLeaveEnd={setSickLeaveEnd} />;
      default:
        return assertNever(type);
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const base ={ 
      description, date, specialist, diagnosisCodes: diagnosisCodes.length > 0
      ? diagnosisCodes
      : undefined
    };
    // Different types of entry
    switch (type) {
      case "HealthCheck":
        onSubmit({ ...base, 
          type, 
          healthCheckRating: Number(healthCheckRating) as 0 | 1 | 2 | 3 
        });
        break;
      case "Hospital":
        onSubmit({ ...base, 
          type, 
          discharge: { date: dischargeDate, criteria: dischargeCriteria } 
        });
        break;
        case "OccupationalHealthcare":
        onSubmit({ ...base, 
          type, 
          employerName, 
          sickLeave: sickLeaveStart && sickLeaveEnd ? { startDate: sickLeaveStart, endDate: sickLeaveEnd } : undefined 
        });
        break;
      default:
        assertNever(type);
    }
  };

  // Reset field in case of a change of entry type
  const handleTypeChange = (event: SelectChangeEvent<EntryType>) => {
    setType(event.target.value as EntryType);
    setHealthCheckRating("");
    setDischargeDate("");
    setDischargeCriteria("");
    setEmployerName("");
    setSickLeaveStart("");
    setSickLeaveEnd("");
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <FormControl fullWidth>
          <InputLabel id="entry-type-label">Entry type</InputLabel>
          <Select label="Entry type" value={type} onChange={handleTypeChange} fullWidth>
            <MenuItem value="HealthCheck">Health Check</MenuItem>
            <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
        </Select>
        </FormControl>
        <TextField
          label="Date"
          type="date"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
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
        <DiagnosisSelect diagnoses={diagnoses} diagnosisCodes={diagnosisCodes} setDiagnosisCodes={setDiagnosisCodes} />
        {renderTypeFields()}
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