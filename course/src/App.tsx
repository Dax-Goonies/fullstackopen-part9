import Header from "./components/Header.tsx";
import Content from "./components/Content.tsx";
import Total from "./components/Total.tsx";
import { courseParts } from "./data/types.ts";

const App = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;