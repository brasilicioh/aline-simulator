
import { FaPlay } from "react-icons/fa";
import { MdOutlineReplay } from "react-icons/md";
import { RxExit } from "react-icons/rx";

interface SimProps {
  speed: number;
  setSpeed: (speed: number) => void;

  startDistance?: number;
  setStartDistance?: (startDistance: number) => void;

  actualDistance?: number;
  setActualDistance?: (actualDistance: number) => void;
  
  finalDistance: number;
  setFinalDistance: (finalDistance: number) => void;

  timePassing: number;
  setTimePassing: (timePassing: number) => void;

  moveType: String;

  moveImage: () => void;
}

export default function SimFrame( {
  speed, setSpeed,
  startDistance, setStartDistance,
  actualDistance, setActualDistance,
  finalDistance, setFinalDistance,
  timePassing, setTimePassing
}:SimProps ) {
  return (
    <div className="w-full h-screen max-h-screen bg-[#0D1117]">
      <div className="grid grid-cols-1 grid-rows-5 h-full">
        <div className="row-span-3 flex flex-col justify-center items-center">
          <div className="h-[90%] w-[95%] border-black border-4 border-bs-gray-600 border-s-gray-600 flex items-center justify-center">
            <h3 className="text-white bg-blue-800 size-full">AlineSim$~ Connection Terminated ▋</h3>
          </div>
        </div>

        <div className="row-span-2 flex justify-center">
          <div className="grid grid-cols-3 gap-3 h-full w-[95%] py-1">
            <div className="bg-black flex flex-col justify-center items-center rounded-xl border-white border-2 text-white">
              <em>Controles de simulação</em>
              <span>Velocidade (m/s)</span>
              <input
                type="number"
                min="0"
                step="0.1"
                disabled={false}
                value={speed}
                onChange={(e) => {
                  setSpeed(Number(e.target.value));
                }}
                className="bg-gray-600 px-1 py-1"
              />

              <span>Distância Inicial (m)</span>
              <input
                type="number"
                min="0"
                step="1"
                disabled={false}
                value={0} //{startDistance}
                onChange={(e) => {
                  //setStartDistance(Number(e.target.value));
                }}
                className="bg-gray-600 px-1 py-1"
              />

              <span>Distância final (m)</span>
              <input
                type="number"
                min="0"
                step="1"
                disabled={false}
                value={finalDistance}
                onChange={(e) => {
                  setFinalDistance(Number(e.target.value));
                }}
                className="bg-gray-600 px-1 py-1"
              />

            </div>

            <div className="bg-black flex flex-col sm:flex-row rounded-xl justify-center gap-3 items-center border-white border-2 text-white">
              <button className="bg-blue-900 p-2 sm:p-3 rounded-4xl">
                <MdOutlineReplay className="size-6 sm:size-8"/>
              </button>
              <button className="bg-blue-900 p-2 sm:p-4 rounded-4xl">
                <FaPlay className="size-6 sm:size-8"/>
              </button>
              <button className="bg-blue-900 p-2 sm:p-3 rounded-4xl">
                <RxExit className="size-6 sm:size-8"/>
              </button>
            </div>

            <div className="bg-black rounded-xl border-white border-2 text-white">
              Grafecos
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}