import type { OccupationalHealthcareEntry } from "../../types";

interface Props {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareEntryDetails = ({ entry }: Props) => {
  return (
    <div>
      {entry.date} employer: {entry.employerName}
      <br />
      <em>{entry.description}</em>
      <br />
      {entry.sickLeave && (
        <p>sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p>
      )}
    </div>
  );
};

export default OccupationalHealthcareEntryDetails;