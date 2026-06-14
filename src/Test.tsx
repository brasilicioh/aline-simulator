import { useEffect, useRef, useState } from "react";

import aline from "./assets/aline.png";

type MoveStatus = "start" | "moving" | "end";

export function Test() {
  const [moveType, setMoveType] = useState<MoveStatus>("start");

  const [speed, setSpeed] = useState<string>("1");
  const [finalDistance, setFinalDistance] = useState<string>("10");

  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const imageRef = useRef<HTMLImageElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  const isMoving = moveType === "moving";

  useEffect(() => {
    return () => {
      if (animationRef.current !== null)
        cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const resetAnimation = () => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    startTimeRef.current = 0;

    if (imageRef.current) imageRef.current.style.transform = "translateX(0px)";

    setMoveType("start");
  };

  const moveImage = () => {
    if (moveType === "moving" || moveType === "end") {
      resetAnimation();
      return;
    }

    const metersPerSecond = Number(speed);
    const totalDistanceMeters = Number(finalDistance);

    if (
      Number.isNaN(metersPerSecond) ||
      Number.isNaN(totalDistanceMeters) ||
      metersPerSecond <= 0 ||
      totalDistanceMeters <= 0
    ) {
      alert("Velocidade e distância devem ser maiores que zero.");
      return;
    }

    const imageWidth = imageRef.current?.offsetWidth ?? 0;
    const trackWidth = screenRef.current?.clientWidth ?? 0;

    const limit = trackWidth - imageWidth;

    const durationSeconds = totalDistanceMeters / metersPerSecond;

    setMoveType("moving");

    const animate = (time: number) => {
      if (!startTimeRef.current) startTimeRef.current = time;

      const elapsedSeconds = (time - startTimeRef.current) / 1000;

      const progress = Math.min(elapsedSeconds / durationSeconds, 1);

      const position = limit * progress;

      if (imageRef.current)
        imageRef.current.style.transform = `translateX(${position.toString()}px)`;

      if (progress >= 1) {
        setMoveType("end");
        animationRef.current = null;
        return;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
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
            setSpeed(e.target.value);
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
            setFinalDistance(e.target.value);
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
    </>
  );
}
