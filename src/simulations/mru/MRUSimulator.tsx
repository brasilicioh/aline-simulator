import { useRef, useState } from "react";

import { PositionTimeChart } from "@charts/PositionTimeChart";
import { useAnimation } from "@animation";

import { buildMRUGraphData } from "@mru/graph";
import { calculateMRUDuration } from "@mru/formulas";

import type { MoveStatus } from "@mru/../types";
import SimFrame from "../../components/frames/SimFrame";

import aline from "@assets/aline.png";

export function MRUSimulator() {
  const [moveType, setMoveType] = useState<MoveStatus>("start");

  const [speed, setSpeed] = useState<number>(1);
  const [finalDistance, setFinalDistance] = useState<number>(10);
  const [timePassing, setTimePassing] = useState<number>(0);
  const graphData = buildMRUGraphData(speed, finalDistance, timePassing);

  const imageRef = useRef<HTMLImageElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  const animation = useAnimation();

  const isMoving = moveType === "moving";

  const resetAnimation = () => {
    animation.reset();

    if (imageRef.current) imageRef.current.style.transform = "translateX(0px)";

    setMoveType("start");
    setTimePassing(0);
  };

  const moveImage = () => {
    if (moveType === "moving" || moveType === "end") {
      resetAnimation();
      return;
    }

    if (
      Number.isNaN(speed) ||
      Number.isNaN(finalDistance) ||
      speed <= 0 ||
      finalDistance <= 0
    ) {
      alert("Velocidade e distância devem ser maiores que zero.");
      return;
    }

    const imageWidth = imageRef.current?.offsetWidth ?? 0;
    const trackWidth = screenRef.current?.clientWidth ?? 0;

    const limit = trackWidth - imageWidth;

    const durationSeconds = calculateMRUDuration(speed, finalDistance);

    setMoveType("moving");

    animation.start({
      duration: durationSeconds,

      onFrame(elapsedSeconds, progress) {
        setTimePassing(elapsedSeconds);

        const position = limit * progress;

        if (imageRef.current) {
          imageRef.current.style.transform = `translateX(${position.toString()}px)`;
        }
      },

      onFinish() {
        setMoveType("end");
      },
    });
  };

  return (
    <>
      <label className="mb-2 flex flex-col gap-1">
        <span>Velocidade (m/s)</span>
        <input
          type="number"
          min="0"
          step="0.1"
          disabled={isMoving}
          value={speed}
          onChange={(e) => {
            setSpeed(Number(e.target.value));
          }}
        />
      </label>
      <label className="mb-2 flex flex-col gap-1">
        <span>Distância final (m)</span>
        <input
          type="number"
          min="0"
          step="1"
          disabled={isMoving}
          value={finalDistance}
          onChange={(e) => {
            setFinalDistance(Number(e.target.value));
          }}
        />
      </label>
      <button onClick={moveImage}>
        {moveType === "start"
          ? "Movimentar"
          : moveType === "moving"
            ? "Interromper"
            : "Voltar para início"}
      </button>
      <div ref={screenRef} className="relative mt-8 h-40 w-full border">
        <img
          ref={imageRef}
          src={aline}
          className="absolute left-0 top-0 w-24 select-none"
        />

        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-3">
          <p>Início (0m)</p>
          <p>Fim ({finalDistance}m)</p>
        </div>
      </div>
      <p>Tempo passado: {timePassing.toFixed(3)}</p>

      <PositionTimeChart
        data={graphData}
        maxTime={calculateMRUDuration(speed, finalDistance)}
        maxDistance={finalDistance}
      />

      <SimFrame
      speed={speed} setSpeed={setSpeed}
      //startDistance={startDistance} setStartDistance={setStartDistance}
      //actualDistance={actualDistance} setActualDistance={setActualDistance}
      finalDistance={finalDistance} setFinalDistance={setFinalDistance}
      timePassing={timePassing} setTimePassing={setTimePassing}
      moveImage={moveImage} moveType={moveType}
      />
    </>
  );
}
