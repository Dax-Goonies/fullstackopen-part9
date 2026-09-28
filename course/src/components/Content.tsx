import type { CoursePart } from "../data/types.ts";
import Part from "./Part.tsx"

// Content component: Names of parts & number of exercises in each
interface ContentProps {
  parts: CoursePart[]
}

const Content = ({ parts }: ContentProps) => (
  <div>
    {parts.map((part) => (
        <Part key={part.name} part={part} />
    ))}
  </div>
)

export default Content