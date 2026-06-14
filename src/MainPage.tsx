
import { useNavigate } from "react-router-dom";

export function MainPage() {

  const navigate = useNavigate();

  return (
    <div className="
      w-screen h-screen bg-gray-500
      items-center flex flex-col
    ">
      <h1 className="bg-black h-10 w-[75%] rounded flex items-center justify-center">
        <p className="text-white">Psychis scimulator</p>
      </h1>

      <div className="flex flex-1 items-center">
        <div className="grid grid-cols-3 gap-5">
          <div className="flex text-white bg-black h-75 w-50 justify-center rounded-2xl border-white">
            <button
              type="button"
              onClick={() => {
                void navigate("/test");
              }}
            >
              Ir para Teste
            </button>
          </div>

          <div className="flex text-white bg-black h-75 w-50 justify-center rounded-2xl border-white">
            <button
              type="button"
              onClick={() => {
                void navigate("/test");
              }}
            >
              Ir para Teste
            </button>
          </div>

          <div className="flex text-white bg-black h-75 w-50 justify-center rounded-2xl border-white">
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

      </div>

      <div className="flex">
        <h1>creditos</h1>
      </div>

    </div>
  );
}
