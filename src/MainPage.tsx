import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function MainPage() {
  const [count, setCount] = useState<number>(0);
  const navigate = useNavigate();

  return (
    <div>
      <h1>Aline's Simulator</h1>

      <p>Contador porque sim: {count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Aumentar
      </button>

      <div>
        <p>Navegacao</p>
        <button type="button" onClick={() => void navigate("/credits")}>
          Ir para Créditos
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            void navigate("/test");
          }}
        >
          Ir para Teste
        </button>
      </div>
    </div>
  );
}
