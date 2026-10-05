import { TextField } from "@mui/material";

interface Props {
  dischargeDate: string;
  setDischargeDate: (value: string) => void;
  dischargeCriteria: string;
  setDischargeCriteria: (value: string) => void;
}

const HospitalCheckFields = ({ dischargeDate, setDischargeDate, dischargeCriteria, setDischargeCriteria }: Props) => {
  return (
    <>
      <TextField 
        label="Discharge date"
        placeholder="YYYY-MM-DD"
        fullWidth
        value={dischargeDate}
        onChange={((e) => setDischargeDate(e.target.value))}
      />
      <TextField 
        label="Discharge criteria"
        fullWidth
        value={dischargeCriteria}
        onChange={((e) => setDischargeCriteria(e.target.value))}
      />    
    </>
  );
};

export default HospitalCheckFields;