import { useNavigate } from "react-router-dom";

export function Credits() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Créditos</h1>
      <p>Obrigado pelo apoio.</p>

      <button type="button" onClick={() => void navigate("/")}>
        Voltar para MainPage
      </button>
    </>
  );
}
