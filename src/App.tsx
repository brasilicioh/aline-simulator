import { useState } from "react";

export default function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <h1>Aline's Simulator</h1>

      <p>Contador porque sim: {count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Aumentar
      </button>
    </>
  );
}
