import type { CoursePart } from "../data/types";

// Total Component: Total sum of exercises in all parts
interface TotalProps {
  parts: CoursePart[]
}

const Total = ({ parts }: TotalProps) => {
  const total = parts.reduce((sum, part) => sum + part.exerciseCount, 0);
  return (
    <p>
      Number of exercises {total}
    </p>
  )    
}

export default Total