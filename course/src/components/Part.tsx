import type { CoursePart } from "../data/types.ts";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled union member: ${JSON.stringify(value)}`)
}

interface PartProps {
  part: CoursePart
}

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <h4>{part.name} {part.exerciseCount}</h4>
          <em>{part.description}</em>
        </div>
      )
    
    case "group":
      return (
        <div>
          <h4>{part.name} {part.exerciseCount}</h4>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      )

    case "background":
      return (
        <div>
          <h4>{part.name} {part.exerciseCount}</h4>
          <em>{part.description}</em>
          <p>submit to {part.backgroundMaterial}</p>
        </div>
      )

      case "special":
        return (
          <div>
            <h4>{part.name} {part.exerciseCount}</h4>
            <em>{part.description}</em>
            <p>required skills: {part.requirements.join(", ")}</p>
          </div>
        )

      default:
        return assertNever(part)
  }
};

export default Part