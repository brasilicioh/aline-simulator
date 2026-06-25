import { useEffect, useRef, useState } from "react";

import { PositionTimeChart } from "@charts/PositionTimeChart";
import { useAnimation } from "@animation";

import { buildMRUGraphData } from "@mru/graph";
import { calculateMRUDuration } from "@mru/formulas";
import {
  startMRUAnimation,
  pauseMRUAnimation,
  resetMRUAnimation,
} from "@mru/animate";

import type { MoveStatus } from "@mru/../types";
import { renderPosition, verifyValues } from "@mru/../utils";

import aline from "@assets/aline.png";

export function MRUSimulator() {
  const [moveType, setMoveType] = useState<MoveStatus>("start");

  const [speed, setSpeed] = useState<number>(1);
  const [startPosition, setStartPosition] = useState<number>(0);
  const [finalPosition, setFinalPosition] = useState<number>(10);
  const [initialPosition, setInitialPosition] = useState<number>(0);
  const [timePassing, setTimePassing] = useState<number>(0);

  const targetPosition = speed > 0 ? finalPosition : startPosition;
  const distanceToTravel = Math.abs(targetPosition - initialPosition);
  const duration = calculateMRUDuration(speed, distanceToTravel);

  const graphData = buildMRUGraphData(
    speed,
    initialPosition,
    targetPosition,
    timePassing,
  );

  const imageRef = useRef<HTMLImageElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  const animation = useAnimation();

  const isMoving = moveType === "moving";

  const renderAnimatedPosition = (position: number) => {
    renderPosition({
      image: imageRef.current,
      positionInMeters: position,
      startPosition,
      finalPosition,
      trackWidth: screenRef.current?.clientWidth ?? 0,
    });
  };

  const moveImage = () => {
    const error = verifyValues({
      speed,
      startPosition,
      finalPosition,
      initialPosition,
      distanceToTravel,
    });

    if (error) {
      alert(error);
      return;
    }

    setMoveType("moving");

    startMRUAnimation({
      animation,
      duration,
      initialPosition,
      targetPosition,
      progressRef,
      setTimePassing,
      onPositionChange: renderAnimatedPosition,
      onFinish() {
        setMoveType("end");
      },
    });
  };

  const pauseAnimation = () => {
    pauseMRUAnimation(animation);
    setMoveType("paused");
  };

  const continueAnimation = () => {
    setMoveType("moving");

    startMRUAnimation({
      animation,
      duration,
      initialPosition,
      targetPosition,
      initialProgress: progressRef.current,
      progressRef,
      setTimePassing,
      onPositionChange: renderAnimatedPosition,
      onFinish() {
        setMoveType("end");
      },
    });
  };

  const resetAnimation = () => {
    resetMRUAnimation({
      animation,
      progressRef,
      setTimePassing,
      onResetPosition() {
        renderAnimatedPosition(initialPosition);
      },
    });
    setMoveType("start");
  };

  useEffect(() => {
    if (moveType !== "start") return;
    renderPosition({
      image: imageRef.current,
      positionInMeters: initialPosition,
      startPosition,
      finalPosition,
      trackWidth: screenRef.current?.clientWidth ?? 0,
    });
  }, [initialPosition, startPosition, finalPosition, moveType]);

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
        <span>Posição inicial (m)</span>
        <input
          type="number"
          step="1"
          disabled={isMoving}
          value={startPosition}
          onChange={(e) => {
            setStartPosition(Number(e.target.value));
          }}
        />
      </label>
      <label className="mb-2 flex flex-col gap-1">
        <span>Posição final (m)</span>
        <input
          type="number"
          step="1"
          disabled={isMoving}
          value={finalPosition}
          onChange={(e) => {
            setFinalPosition(Number(e.target.value));
          }}
        />
      </label>
      <label className="mb-2 flex flex-col gap-1">
        <span>Posição de Aline (m)</span>
        <input
          type="number"
          step="1"
          disabled={isMoving}
          value={initialPosition}
          onChange={(e) => {
            setInitialPosition(Number(e.target.value));
          }}
        />
      </label>

      {moveType === "start" && (
        <button className="mx-2" onClick={moveImage}>
          Iniciar
        </button>
      )}
      {moveType === "moving" && (
        <button className="mx-2" onClick={pauseAnimation}>
          Pausar
        </button>
      )}
      {moveType === "paused" && (
        <>
          <button className="mx-2" onClick={continueAnimation}>
            Continuar
          </button>
          <button className="mx-2" onClick={resetAnimation}>
            Voltar ao início
          </button>
        </>
      )}
      {moveType === "end" && (
        <button className="mx-2" onClick={resetAnimation}>
          Voltar ao início
        </button>
      )}

      <div ref={screenRef} className="relative mt-8 h-40 w-full border">
        <img
          ref={imageRef}
          src={aline}
          className="absolute left-0 top-0 w-24 select-none"
        />

        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-3">
          <p>Início ({startPosition}m)</p>
          <p>Fim ({finalPosition}m)</p>
        </div>
      </div>
      <p>Tempo passado: {timePassing.toFixed(3)}</p>

      <PositionTimeChart
        data={graphData}
        maxTime={duration}
        minDistance={startPosition}
        maxDistance={finalPosition}
      />
    </>
  );
}
