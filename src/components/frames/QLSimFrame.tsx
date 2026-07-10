import { useState } from "react";

import { PositionTimeChart } from "@charts/PositionTimeChart";
import { SpeedTimeChart } from "@charts/SpeedTimeChart";
import { useNavigate } from "react-router-dom";
import aline from "@assets/aline.png";

import earth from "@assets/earth.jpeg";
import moon from "@assets/lunar.jpeg"
import venus from "@assets/venus.jpeg"
import mars from "@assets/mars.jpeg"

import { SliderControl } from "../utils/SliderControl";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineReplay } from "react-icons/md";
import { FaPause, FaPlay } from "react-icons/fa";

interface SimProps {
  //common data from the prop drilling
  speed: number;
  setSpeed: (speed: number) => void;

  gravity: number;
  setGravity: (gravity: number) => void;

  startPosition: number;
  setStartPosition: (startPosition: number) => void;

  finalPosition: number;
  setFinalPosition: (finalPosition: number) => void;

  timePassing: number;
  setTimePassing?: (timePassing: number) => void;

  moveType: String;

  //referencepoints to animate the image and div
  screenRef: RefObject<HTMLDivElement>;
  imageRef: RefObject<HTMLImageElement>;

  //animation section
  startAnimation?: () => void;

  pauseAnimation?: () => void;

  continueAnimation?: () => void;

  resetAnimation?: () => void;

  //plott
  graphData: {time: number, space: number}[]; 
  velocityGraphData?: {time: number, speed: number}[]; 

  duration: number;
  maxSpeed?: number;
  minSpeed?: number;
}

export function QLSimFrame({
  speed, setSpeed,
  gravity, setGravity,
  startPosition, setStartPosition,
  finalPosition, setFinalPosition,
  timePassing,
  moveType,

  screenRef, imageRef,

  startAnimation, pauseAnimation, continueAnimation, resetAnimation,

  graphData, velocityGraphData,
  duration,
  maxSpeed,
  minSpeed
}: SimProps){
  const navigate = useNavigate();
  const totalDistance = startPosition;
  const maxZoom = 175;
  const scale = 100;

  const zoom = maxZoom / (1 + totalDistance / scale);
  const disabledInputs: boolean = moveType !== "start";

  const [bgImage, setBgImage] = useState(moon);

  const handleGravityChange = (event) => {
    const escolha = event.target.value;

    if (escolha == 1) {
      setBgImage(moon);
    } else if (escolha == 4) {
      setBgImage(mars);
    } else if (escolha == 10) {
      setBgImage(earth);
    } else if (escolha == 9) {
      setBgImage(venus);
    } else{
      setBgImage(earth)
    }
  };

  return(
    <div className="w-full h-screen max-h-screen bg-[#0D1117] overflow-x-hidden">
      <div className="grid grid-cols-2 grid-rows-6 h-full">
        
        <div className="row-span-6 flex items-center justify-center"> 
          {/* sidescreen */}
          <div className="h-[95%] w-[80%] border-black border-4 border-bs-gray-600 border-s-gray-600 flex items-center justify-center relative">
            <div ref={screenRef} className="bg-cover bg-bottom size-full bg-repeat-y"
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: `${zoom}%`
              }}
            >
              <img
                ref={imageRef}
                src={aline}
                className="absolute rounded-full -translate-x-1/2 left-1/2 top-0 w-24 select-none"
              />
              <p className="absolute -translate-x-1/2 left-1/2 bottom-0 bg-blue-600 text-white w-40">Tempo passado: {timePassing.toFixed(3)}</p>
            </div>
          </div>
        </div>

        <div className="row-span-6 flex items-center">
          <div className="grid grid-rows-3 w-[95%] h-[95%] gap-5">

            <div className="bg-black rounded-xl flex items-center justify-center border-white border-2 text-white items">
              <div className="grid grid-cols-2 grid-rows-2 w-full h-full p-3 gap-3">
                
                {/* Altura máxima */}
                <div className="flex flex-col justify-center">
                  <SliderControl
                    label="Altura Máxima (m)"
                    min={0}
                    max={100}
                    step={1}
                    value={startPosition}
                    onChange={setStartPosition}
                    disabled={disabledInputs}
                  />
                </div>

                {/* Select */}
                <div className="flex items-center">
                  <select className="w-full h-9 bg-neutral-700 rounded px-2 text-sm"
                    onChange={handleGravityChange}
                  >
                    <option value={10}>Terra</option>
                    <option value={1}>Lua</option>
                    <option value={4}>Marte</option>
                    <option value={9}>Venus</option>
                    <option value={100}>Sol</option>
                  </select>
                </div>

                {/* Gravidade */}
                <div className="flex flex-col justify-center">
                  <SliderControl
                    label="Gravidade (m/s²)"
                    min={0}
                    max={100}
                    step={1}
                    value={gravity}
                    onChange={setGravity}
                    disabled={disabledInputs}
                  />
                </div>

                {/* Botões */}
                <div className="flex gap-2 items-center">
                  <div className="flex">
                    {moveType === "start" && (
                      <button className="bg-[#484848] text-white flex justify-center p-3 w-10" onClick={startAnimation}>
                        <FaPlay className="size-4 sm:size-4" />
                      </button>
                    )}
                    {moveType === "moving" && (
                      <button className="bg-[#484848] text-white flex justify-center p-3 w-10" onClick={pauseAnimation}>
                        <FaPause className="size-4 sm:size-4" />
                      </button>
                    )}
                    {moveType === "paused" &&(
                      <>
                        <button className="bg-[#484848] text-white flex justify-center p-3 w-10" onClick={continueAnimation}>
                          <FaPlay className="size-4 sm:size-4" />
                        </button>
                        <button className="bg-[#484848] text-white flex justify-center p-3 w-10" onClick={resetAnimation}>
                          <MdOutlineReplay className="size-4 sm:size-4" />
                        </button>
                      </>
                    )}
                    {moveType === "end" &&(
                      <button className="bg-[#484848] text-white flex justify-center p-3 w-10" onClick={resetAnimation}>
                        <MdOutlineReplay className="size-4 sm:size-4" />
                      </button>
                    )}
                  </div>

                  <button className="bg-[#484848] grid grid-cols-[auto_1fr_auto] items-center p-2 sm:p-3 rounded-2xl w-[80%]" 
                  onClick={() => {
                    void navigate("/");
                  }}>
                    <IoHomeOutline className="size-6 sm:size-8 col-start-1" />
                    <p className="col-start-2 text-center">Voltar ao Menu</p>
                    <div className="size-6 sm:size-8 col-start-3 invisible" />
                  </button>
                </div>

              </div>
            </div>
            
            <div className="row-span-2 bg-black rounded-xl flex items-center justify-center border-white border-2 text-white items">
              <PositionTimeChart
                data={graphData}
                maxTime={duration}
                minDistance={startPosition}
                maxDistance={finalPosition}
                width={300}
              />

              <SpeedTimeChart
                data={velocityGraphData}
                maxTime={duration}
                minSpeed={speed}
                maxSpeed={maxSpeed}
                width={300}
              />
            </div>
        
          </div>
        </div>
        
      </div>
    </div>
  );
}