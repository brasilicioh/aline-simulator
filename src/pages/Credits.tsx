import { useNavigate } from "react-router-dom";

export function Credits() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 flex flex-col gap-3 items-center min-h-screen">
      <p className="text-4xl font-semibold text-center">Em desenvolvimento</p>
    </div>
  );

  return (
    <div className="bg-gray-800 flex flex-col gap-3 items-center min-h-screen">
      <h1 className="text-white border-white border-6 border-bs-gray-600 border-s-gray-600 flex items-center justify-center mt-6 py-2 w-[85%] bg-black">
        <p className="text-4xl font-semibold text-center">
          ~$ The Gamers Republic
        </p>
        <p className="animate-[piscar-seco_1.5s_steps(1,end)_infinite] font-bold self-end">
          ___
        </p>
      </h1>

      <div className="grid grid-cols-3 gap-5">
        <div className="flex flex-col relative justify-center items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9ZNVPEEQy9ha11CyKqc2vexUSTwDzupm6dk64hDQIBFEf0QyHwgcLOGRI&s=10"
            alt=""
            className="w-60 h-60"
          />
          <p className="text-center w-60 absolute bottom-0 bg-black text-white">
            Nome do Tanque: Hetzer
          </p>
        </div>
        <div className="flex flex-col relative justify-center items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9ZNVPEEQy9ha11CyKqc2vexUSTwDzupm6dk64hDQIBFEf0QyHwgcLOGRI&s=10"
            alt=""
            className="w-60 h-60"
          />
          <p className="text-center w-60 absolute bottom-0 bg-black text-white">
            Nome do Tanque: Hetzer
          </p>
        </div>
        <div className="flex flex-col relative justify-center items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9ZNVPEEQy9ha11CyKqc2vexUSTwDzupm6dk64hDQIBFEf0QyHwgcLOGRI&s=10"
            alt=""
            className="w-60 h-60"
          />
          <p className="text-center w-60 absolute bottom-0 bg-black text-white">
            Nome do Tanque: Hetzer
          </p>
        </div>
        <div className="col-span-3 gap-5 flex justify-center">
          <div className="flex flex-col relative justify-center items-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9ZNVPEEQy9ha11CyKqc2vexUSTwDzupm6dk64hDQIBFEf0QyHwgcLOGRI&s=10"
              alt=""
              className="w-60 h-60"
            />
            <p className="text-center w-60 absolute bottom-0 bg-black text-white">
              Nome do Tanque: Hetzer
            </p>
          </div>
          <div className="flex flex-col relative justify-center items-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9ZNVPEEQy9ha11CyKqc2vexUSTwDzupm6dk64hDQIBFEf0QyHwgcLOGRI&s=10"
              alt=""
              className="w-60 h-60"
            />
            <p className="text-center w-60 absolute bottom-0 bg-black text-white">
              Nome do Tanque: Hetzer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
