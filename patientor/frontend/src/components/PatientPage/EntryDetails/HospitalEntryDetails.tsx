import type { HospitalEntry } from "../../../types";

interface Props {
  entry: HospitalEntry;
}

const HospitalEntryDetails = ({ entry }: Props) => {
  return (
    <div>
      {entry.date}
      <br />
      <em>{entry.description}</em>
      <br />
      discharge: {entry.discharge.date}
      <br />
      criteria: {entry.discharge.criteria}
      <br />
      diagnose by {entry.specialist}
    </div>
  );
};

export default HospitalEntryDetails;