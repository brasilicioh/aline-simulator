import { PositionTimeChart } from "@charts/PositionTimeChart";
import { useNavigate } from "react-router-dom";
import aline from "@assets/aline.png";

import { SliderControl } from "../utils/SliderControl";

import { FaPlay } from "react-icons/fa";
import { MdOutlineReplay } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
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
  setTimePassing?: (timePassing: number) => void;

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
  timePassing,
  moveType,

  screenRef, imageRef,

  startAnimation, pauseAnimation, continueAnimation, resetAnimation,

  graphData, maxTime

}:SimProps ) {
  const navigate = useNavigate();
  const totalDistance = finalPosition - startPosition;
  const zoom = 300 / (1 + Math.log10(totalDistance + 8));

  return (
    <div className="w-full h-screen max-h-screen bg-[#0D1117] overflow-x-hidden">

      <div className="grid grid-cols-1 grid-rows-10 h-full">
        <div className="row-span-5 flex flex-col justify-center items-center">
          <div className="h-[90%] w-[95%] border-black border-4 border-bs-gray-600 border-s-gray-600 flex items-center justify-center relative">
            {/* <h3 className="text-white bg-blue-800 size-full">AlineSim$~ Connection Terminated ▋</h3> */}
            <div ref={screenRef} className="bg-[url('@assets/landscape.jpeg')] bg-cover bg-center size-full bg-repeat-x"
              style={{
                backgroundSize: `${zoom}%`
              }}
            >
              <img
                ref={imageRef}
                src={aline}
                className="absolute rounded-full left-0 top-1/2 w-24 select-none"
              />
              <div className="absolute bottom-0 left-0 right-0 flex justify-between">
                <p className="text-white bg-blue-800 px-2">Início ({startPosition}m)</p>
                <p className="text-white bg-blue-800 px-2">Fim ({finalPosition}m)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row-span-5 flex justify-center">
          <div className="grid grid-cols-3 gap-1 h-full w-[95%] py-1">
            <div className="bg-black border-2 border-white rounded-xl p-2 text-white flex flex-col gap-2 w-full max-w-sm">
              
              <div className="text-center">
                <h2 className="font-semibold text-sm">
                  Partícula Aline - Configurações
                </h2>
              </div>
              
              <SliderControl
                label="Velocidade (m/s)"
                value={speed}
                onChange={setSpeed}
                min={0}
                max={100}
                step={5}
              />

              <hr />

              <SliderControl
                label="Posição (m)"
                value={initialPosition}
                onChange={setInitialPosition}
                min={-50}
                max={50}
                step={5}
              />

              <hr />

              <SliderControl
                label="Distância Inicial (m)"
                value={startPosition}
                onChange={setStartPosition}
                min={-50}
                max={0}
                step={5}
              />

              <hr />

              <SliderControl
                label="Distância Final (m)"
                value={finalPosition}
                onChange={setFinalPosition}
                min={0}
                max={50}
                step={5}
              />
            </div>
            

            <div className="bg-black flex flex-col rounded-xl justify-center gap-3 items-center border-white border-2 text-white">
              {/* <button className="bg-blue-900 p-2 sm:p-3 rounded-4xl">
                <MdOutlineReplay className="size-6 sm:size-8"/>
              </button>
              <button className="bg-blue-900 p-2 sm:p-4 rounded-4xl">
                <FaPlay className="size-6 sm:size-8"/>
              </button>
              <button className="bg-blue-900 p-2 sm:p-3 rounded-4xl">
                <RxExit className="size-6 sm:size-8"/>
              </button> */}
              <p>Tempo passado: {timePassing.toFixed(3)}</p>
              {moveType === "start" && (
                <button className="bg-[#484848] grid grid-cols-[auto_1fr_auto] items-center p-2 sm:p-3 rounded-2xl w-[80%]" onClick={startAnimation}>
                  <FaPlay className="size-6 sm:size-8 col-start-1" />
                  <p className="col-start-2 text-center">Iniciar Simulação</p>
                  <div className="size-6 sm:size-8 col-start-3 invisible" />
                </button>
              )}
              {moveType === "moving" && (
                <button className="bg-[#484848] grid grid-cols-[auto_1fr_auto] items-center p-2 sm:p-3 rounded-2xl w-[80%]" onClick={pauseAnimation}>
                  <FaPause className="size-6 sm:size-8 col-start-1" />
                  <p className="col-start-2 text-center">Pausar Simulação</p>
                  <div className="size-6 sm:size-8 col-start-3 invisible" />
                </button>
              )}
              {moveType === "paused" && (
                <>
                  <button className="bg-[#484848] grid grid-cols-[auto_1fr_auto] items-center p-2 sm:p-3 rounded-2xl w-[80%]" onClick={continueAnimation}>
                    <FaPlay className="size-6 sm:size-8 col-start-1" />
                    <p className="col-start-2 text-center">Continuar Simulação</p>
                    <div className="size-6 sm:size-8 col-start-3 invisible" />
                  </button>
                  <button className="bg-[#484848] grid grid-cols-[auto_1fr_auto] items-center p-2 sm:p-3 rounded-2xl w-[80%]" onClick={resetAnimation}>
                    <MdOutlineReplay className="size-6 sm:size-8 col-start-1" />
                    <p className="col-start-2 text-center">Reiniciar Simulação</p>
                    <div className="size-6 sm:size-8 col-start-3 invisible" />
                  </button>
                </>
              )}
              {moveType === "end" && (
                <button className="bg-[#484848] grid grid-cols-[auto_1fr_auto] items-center p-2 sm:p-3 rounded-2xl w-[80%]" onClick={resetAnimation}>
                  <MdOutlineReplay className="size-6 sm:size-8 col-start-1" />
                  <p className="col-start-2 text-center">Reiniciar Simulação</p>
                  <div className="size-6 sm:size-8 col-start-3 invisible" />
                </button>
              )}

              <button className="bg-[#484848] grid grid-cols-[auto_1fr_auto] items-center p-2 sm:p-3 rounded-2xl w-[80%]" 
              onClick={() => {
                void navigate("/");
              }}>
                <IoHomeOutline className="size-6 sm:size-8 col-start-1" />
                <p className="col-start-2 text-center">Voltar ao Menu</p>
                <div className="size-6 sm:size-8 col-start-3 invisible" />
              </button>
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