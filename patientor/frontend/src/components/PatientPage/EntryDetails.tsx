import type { Diagnosis, Entry } from "../../types";

interface EntryDetailsProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const EntryDetails = ({ entry, diagnoses }: EntryDetailsProps) => {
  const findDiagnosis = (code: string) =>
    diagnoses.find((d) => d.code === code);

  return (
    <div>
      <p>{entry.date} <em>{entry.description}</em></p>
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map((code) => {
            const diagnosis = findDiagnosis(code);
            return (
              <li key={code}>
                {code} {diagnosis ? diagnosis.name : ""}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default EntryDetails;