import type { HealthCheckEntry } from "../../types";

interface Props {
  entry: HealthCheckEntry,
}

const HealthCheckEntryDetails = ({ entry }: Props) => {
  return (
    <div>
      <p>{entry.date}
      <br />
      <em>{entry.description}</em>
      <br />
      healt check rating: {entry.healthCheckRating}
      <br />
      diagnose by {entry.specialist}</p>
    </div>
  );
};

export default HealthCheckEntryDetails;