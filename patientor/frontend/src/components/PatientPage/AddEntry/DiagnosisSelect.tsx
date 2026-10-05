import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import type { Diagnosis } from "../../../types";

interface Props {
  diagnoses: Diagnosis[];
  diagnosisCodes: string[];
  setDiagnosisCodes: (codes: string[]) => void;
}

const DiagnosisSelect = ({ diagnoses, diagnosisCodes, setDiagnosisCodes}: Props) => {
  const onChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="diagnosis-label">Diagnosis codes</InputLabel>
      <Select
        labelId="diagnosis-label"
        label="Diagnosis codes"
        multiple
        value={diagnosisCodes}
        onChange={onChange}
      >
        {diagnoses.map((d) => (
          <MenuItem key={d.code} value={d.code}>
            {d.code}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DiagnosisSelect;