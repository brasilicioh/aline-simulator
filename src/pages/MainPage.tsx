import { useNavigate } from "react-router-dom";

export function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen grid grid-cols-2 bg-[#0D1117]">
      <div className="relative w-full h-full bg-[url(./assets/aline.png)] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-[#0D1117]" />
      </div>

      <div className="flex flex-col items-center justify-evenly bg-[#0D1117]">
        <h1 className="text-white border-white border-6 border-bs-gray-600 border-s-gray-600 flex items-center justify-center mt-6 py-2 w-[85%] bg-black">
          <p className="text-4xl font-semibold text-center">
            ~$ Aline's Simulator
          </p>
          <p className="animate-[piscar-seco_1.5s_steps(1,end)_infinite] font-bold self-end">
            ___
          </p>
        </h1>

        <div className="flex w-full flex-1 flex-col justify-between items-center gap-5">
          <hr className="text-white w-[75%] mt-10" />
          <div className="justify-between flex flex-col w-full items-center gap-5">
            <button
              type="button"
              onClick={() => {
                void navigate("/mru");
              }}
              className="border-white border-double border-4 rounded-xl flex group items-center gap-1 justify-center w-[80%] h-15 font-semibold text-white cursor-pointer hover:scale-102 bg-black"
            >
              <p>Movimento Retilíneo Uniforme</p>
              <p className="invisible group-hover:visible animate-[piscar-seco_0.8s_steps(1,end)_infinite] font-bold self-center">
                .
              </p>
            </button>

            <button
              type="button"
              onClick={() => {
                void navigate("/muv");
              }}
              className="border-white border-double rounded-xl flex items-center group justify-center gap-1 border-4 w-[80%] h-15 font-semibold text-white cursor-pointer hover:scale-102 bg-black"
            >
              <p>Movimento Retilíneo Variado</p>
              <p className="invisible group-hover:visible animate-[piscar-seco_0.8s_steps(1,end)_infinite] font-bold self-center">
                .
              </p>
            </button>

            <button
              type="button"
              onClick={() => {
                void navigate("/ql");
              }}
              className="border-white border-4 border-double rounded-xl flex gap-1 justify-center group items-center w-[80%] h-15 font-semibold text-white cursor-pointer hover:scale-102 bg-black"
            >
              <p>Queda Livre</p>
              <p className="invisible group-hover:visible animate-[piscar-seco_0.8s_steps(1,end)_infinite] font-bold self-center">
                .
              </p>
            </button>
          </div>
          <hr className="text-white w-[75%] mb-10" />
        </div>

        <div className="flex h-20">
          <p
            className="text-white font-semibold text-xl cursor-pointer hover:text-blue-500"
            onClick={() => {
              void navigate("/credits");
            }}
          >
            Créditos
          </p>
        </div>
      </div>
    </div>
  );
}
