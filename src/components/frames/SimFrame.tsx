import { PositionTimeChart } from "@charts/PositionTimeChart";
import aline from "@assets/aline.png";

import { FaPlay } from "react-icons/fa";
import { MdOutlineReplay } from "react-icons/md";
import { RxExit } from "react-icons/rx";
import { FaPause } from "react-icons/fa";
import type { RefObject } from "react";


interface SimProps {
  //common data from the prop drilling
  speed: number;
  setSpeed: (speed: number) => void;

  startPosition: number;
  setStartPosition: (startPosition: number) => void;

  initialPosition: number;
  setInitialPosition: (initialPosition: number) => void;
  
  finalPosition: number;
  setFinalPosition: (finalPosition: number) => void;

  timePassing: number;
  setTimePassing: (timePassing: number) => void;

  moveType: String;

  //referencepoints to animate the image and div
  screenRef: RefObject<HTMLDivElement>;
  imageRef: RefObject<HTMLImageElement>;

  //animation section
  startAnimation: () => void;

  pauseAnimation: () => void;

  continueAnimation: () => void;

  resetAnimation: () => void;

  //plott
  graphData: {time: number, space: number}[]; 
  maxTime: number;
  
}

export default function SimFrame( {
  speed, setSpeed,
  startPosition, setStartPosition,
  initialPosition, setInitialPosition,
  finalPosition, setFinalPosition,
  timePassing, setTimePassing,
  moveType,

  screenRef, imageRef,

  startAnimation, pauseAnimation, continueAnimation, resetAnimation,

  graphData, maxTime

}:SimProps ) {
  return (
    <div className="w-full h-screen max-h-screen bg-[#0D1117]">
      <div className="grid grid-cols-1 grid-rows-5 h-full">
        <div className="row-span-3 flex flex-col justify-center items-center">
          <div className="h-[90%] w-[95%] border-black border-4 border-bs-gray-600 border-s-gray-600 flex items-center justify-center relative">
            {/* <h3 className="text-white bg-blue-800 size-full">AlineSim$~ Connection Terminated ▋</h3> */}
            <div ref={screenRef} className="bg-[url('https://www.gamevicio.com/wp-content/uploads/2020/08/jogador-de-microsoft-flight-simulator-encontra-a-iconica-colina-bliss-imortalizada-no-windows-xp-018456-1.webp')] bg-cover bg-center size-full">
              <img
                ref={imageRef}
                src={aline}
                className="absolute left-0 top-1/2 w-24 select-none"
              />
              <div className="absolute bottom-0 left-0 right-0 flex justify-between">
                <p className="text-white bg-blue-800 px-2">Início ({startPosition}m)</p>
                <p className="text-white bg-blue-800 px-2">Fim ({finalPosition}m)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row-span-2 flex justify-center">
          <div className="grid grid-cols-3 gap-3 h-full w-[95%] py-1">
            <div className="bg-black flex flex-col justify-center items-center rounded-xl border-white border-2 text-white">
              <div>
                <em>Controles de simulação</em>
              </div>

              <div className="flex gap-1 justify-evenly">
                <div className="flex">
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
                    className="bg-gray-600 w-10 px-1 py-1"
                  />
                </div>

                <div className="flex">
                  <span>Posição de Aline (m)</span>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    disabled={false}
                    value={initialPosition}
                    onChange={(e) => {
                      setInitialPosition(Number(e.target.value));
                    }}
                    className="bg-gray-600 w-10 px-1 py-1"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex">
                  <span>Distância Inicial (m)</span>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    disabled={false}
                    value={startPosition}
                    onChange={(e) => {
                      setStartPosition(Number(e.target.value));
                    }}
                    className="bg-gray-600 w-10 px-1 py-1"
                  />
                </div>

                <div className="flex">
                  <span>Distância final (m)</span>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    disabled={false}
                    value={finalPosition}
                    onChange={(e) => {
                      setFinalPosition(Number(e.target.value));
                    }}
                    className="bg-gray-600 w-10 px-1 py-1"
                  />
                </div>
              </div>

            </div>

            <div className="bg-black flex flex-col sm:flex-row rounded-xl justify-center gap-3 items-center border-white border-2 text-white">
              {/* <button className="bg-blue-900 p-2 sm:p-3 rounded-4xl">
                <MdOutlineReplay className="size-6 sm:size-8"/>
              </button>
              <button className="bg-blue-900 p-2 sm:p-4 rounded-4xl">
                <FaPlay className="size-6 sm:size-8"/>
              </button>
              <button className="bg-blue-900 p-2 sm:p-3 rounded-4xl">
                <RxExit className="size-6 sm:size-8"/>
              </button> */}
              {moveType === "start" && (
                <button className="bg-blue-800 p-2 sm:p-3 rounded-4xl" onClick={startAnimation}>
                  <FaPlay className="size-6 sm:size-8"/>
                </button>
              )}
              {moveType === "moving" && (
                <button className="bg-blue-800 p-2 sm:p-3 rounded-4xl" onClick={pauseAnimation}>
                  <FaPause className="size-6 sm:size-8"/>
                </button>
              )}
              {moveType === "paused" && (
                <>
                  <button className="bg-blue-800 p-2 sm:p-3 rounded-4xl" onClick={continueAnimation}>
                    <FaPlay className="size-6 sm:size-8"/>
                  </button>
                  <button className="bg-blue-800 p-2 sm:p-3 rounded-4xl" onClick={resetAnimation}>
                    <MdOutlineReplay className="size-6 sm:size-8"/>
                  </button>
                </>
              )}
              {moveType === "end" && (
                <button className="bg-blue-800 p-2 sm:p-3 rounded-4xl" onClick={resetAnimation}>
                  <MdOutlineReplay className="size-6 sm:size-8"/>
                </button>
              )}
            </div>

            <div className="bg-black rounded-xl flex items-center justify-center border-white border-2 text-white items">
              <PositionTimeChart
                data={graphData}
                maxTime={maxTime}
                minDistance={startPosition}
                maxDistance={finalPosition}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}