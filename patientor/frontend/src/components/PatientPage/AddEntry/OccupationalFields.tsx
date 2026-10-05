import { TextField } from "@mui/material";

interface Props {
  employerName: string;
  setEmployerName: (value: string) => void;
  sickLeaveStart: string;
  setSickLeaveStart: (value: string) => void;
  sickLeaveEnd: string;
  setSickLeaveEnd: (value: string) => void;
}

const OccupationalFields = ({ employerName, setEmployerName, sickLeaveStart, setSickLeaveStart, sickLeaveEnd, setSickLeaveEnd }: Props) => {
  return (
    <>
      <TextField 
        label="Employer"
        fullWidth
        value={employerName}
        onChange={((e) => setEmployerName(e.target.value))}
      />
      <TextField 
        label="Start date"
        fullWidth
        value={sickLeaveStart}
        onChange={((e) => setSickLeaveStart(e.target.value))}
      />
      <TextField 
        label="End date"
        fullWidth
        value={sickLeaveEnd}
        onChange={((e) => setSickLeaveEnd(e.target.value))}
      />
    </>
  );
};

export default OccupationalFields;