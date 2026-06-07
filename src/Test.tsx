import { useRef, useState } from "react";

import aline from "./assets/aline.png";

type MoveStatus = "start" | "moving" | "end";

export function Test() {
  const [moveType, setMoveType] = useState<MoveStatus>("start");
  const [speed, setSpeed] = useState(1);
  const [finalDistance, setFinalDistance] = useState(10);

  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const positionRef = useRef(0);
  const imageRef = useRef<HTMLImageElement>(null);

  const moveImage = () => {
    if (moveType === "moving" || moveType === "end") {
      if (animationRef.current !== null)
        cancelAnimationFrame(animationRef.current);
      setMoveType("start");
      lastTimeRef.current = 0;
      positionRef.current = 0;
      if (imageRef.current) imageRef.current.style.left = "0px";
      return;
    }
    const metersPerSecond = Math.max(speed, 0.1);
    const totalDistanceMeters = Math.max(finalDistance, 0.1);

    setMoveType("moving");
    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;

      const deltaTime = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      const imageWidth = imageRef.current?.offsetWidth ?? 0;
      const limit = window.innerWidth - imageWidth;

      const pixelsPerMeter = limit / totalDistanceMeters;
      const next =
        positionRef.current + metersPerSecond * pixelsPerMeter * deltaTime;

      if (next >= limit) {
        positionRef.current = limit;
        setMoveType("end");
        animationRef.current = null;
        return;
      }

      positionRef.current = next;
      if (imageRef.current) {
        imageRef.current.style.left = `${next.toString()}px`;
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

      <div className="relative mt-8 h-40 w-full">
        <img
          src={aline}
          className="absolute left-0 top-0 w-24 select-none"
          ref={imageRef}
        />

        <div className="absolute bottom-0 left-0 right-0 flex justify-between">
          <p className="mx-3">Início (0m)</p>
          <p className="mx-3">Fim ({finalDistance}m)</p>
        </div>
      </div>
    </>
  );
}
