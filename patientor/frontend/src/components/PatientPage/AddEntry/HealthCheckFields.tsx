import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { HealthCheckRating } from "../../../types";

interface Props {
  healthCheckRating: string;
  setHealthCheckRating: (value: string) => void;
}

const HealthCheckFields = ({ healthCheckRating, setHealthCheckRating }: Props) => {
  const onChange = (event: SelectChangeEvent<string>) => {
    setHealthCheckRating(event.target.value);
  };
  const formatLabel = (label: string) => label.replace(/([A-Z])/g, ' $1').trim();
  const healthCheckOptions = Object.entries(HealthCheckRating).map(([label, value]) => ({ label, value }));

  return (
    <FormControl fullWidth>
      <InputLabel id="health-check-options">Health Check Rating</InputLabel>
      <Select 
        label="Health Check Rating (0-3)"
        fullWidth
        value={healthCheckRating}
        onChange={onChange}
        >
          {healthCheckOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.value} - {formatLabel(option.label)}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default HealthCheckFields;