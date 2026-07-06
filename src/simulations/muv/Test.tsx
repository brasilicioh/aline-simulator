import { useEffect, useRef, useState } from "react";

import aline from "@assets/aline.png";
import { useAnimation } from "@animation";
import { renderPosition } from "@muv/../utils";
import type { MoveStatus } from "@muv/../types";
import {
  pauseMUVAnimation,
  resetMUVAnimation,
  startMUVAnimation,
} from "@muv/animate";
import { calculateMUVDuration } from "@muv/formulas";

export function Test() {
  const [aceleration, setAceleration] = useState<number>(2);
  const [speed, setSpeed] = useState<number>(4);
  const [initialPosition, setInitialPosition] = useState<number>(0);
  const [startPosition, setStartPosition] = useState<number>(0);
  const [finalPosition, setFinalPosition] = useState<number>(45);

  const [moveType, setMoveType] = useState<MoveStatus>("start");
  const [timePassing, setTimePassing] = useState<number>(0);

  const imageRef = useRef<HTMLImageElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  const animation = useAnimation();
  const targetPosition = speed >= 0 ? finalPosition : startPosition;

  const duration = calculateMUVDuration(
    initialPosition,
    targetPosition,
    speed,
    aceleration,
  );

  const renderAnimatedPosition = (position: number) => {
    renderPosition({
      image: imageRef.current,
      positionInMeters: position,
      startPosition,
      finalPosition,
      trackWidth: screenRef.current?.clientWidth ?? 0,
    });
  };

  const startAnimation = () => {
    if (!Number.isFinite(duration) || duration <= 0) {
      alert("Não foi possível iniciar com os valores atuais.");
      return;
    }

    setMoveType("moving");

    startMUVAnimation({
      animation,
      duration,
      initialPosition,
      initialSpeed: speed,
      acceleration: aceleration,
      targetPosition,
      startPosition,
      finalPosition,
      progressRef,
      setTimePassing,
      onPositionChange: renderAnimatedPosition,
      onFinish() {
        setMoveType("end");
      },
    });
  };

  const pauseAnimation = () => {
    pauseMUVAnimation(animation);
    setMoveType("paused");
  };

  const continueAnimation = () => {
    if (!Number.isFinite(duration) || duration <= 0) {
      alert("Não foi possível continuar com os valores atuais.");
      return;
    }

    setMoveType("moving");

    startMUVAnimation({
      animation,
      duration,
      initialPosition,
      initialSpeed: speed,
      acceleration: aceleration,
      targetPosition,
      startPosition,
      finalPosition,
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
    resetMUVAnimation({
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
  }, [moveType, initialPosition, startPosition, finalPosition]);

  return (
    <>
      <h1>MUV</h1>

      <p>Aceleração</p>
      <input
        type="number"
        value={aceleration}
        onChange={(e) => {
          setAceleration(Number(e.target.value));
        }}
      />

      <p>Velocidade</p>
      <input
        type="number"
        value={speed}
        onChange={(e) => {
          setSpeed(Number(e.target.value));
        }}
      />

      <p>Posição de aline</p>
      <input
        type="number"
        value={initialPosition}
        onChange={(e) => {
          setInitialPosition(Number(e.target.value));
        }}
      />

      <p>Espaço inicial</p>
      <input
        type="number"
        value={startPosition}
        onChange={(e) => {
          setStartPosition(Number(e.target.value));
        }}
      />

      <p>Espaço final</p>
      <input
        type="number"
        value={finalPosition}
        onChange={(e) => {
          setFinalPosition(Number(e.target.value));
        }}
      />

      <div
        ref={screenRef}
        className="w-full h-32 border border-black relative overflow-hidden"
      >
        <img
          ref={imageRef}
          src={aline}
          alt="Aline"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-16"
          draggable={false}
        />
        <div className="absolute bottom-0 left-0 text-xs bg-white/80 px-1">
          Início ({startPosition}m)
        </div>
        <div className="absolute bottom-0 right-0 text-xs bg-white/80 px-1">
          Fim ({finalPosition}m)
        </div>
      </div>

      <div className="mt-3 flex gap-2 flex-wrap">
        {moveType === "start" && (
          <button onClick={startAnimation}>começar</button>
        )}

        {moveType === "moving" && (
          <button onClick={pauseAnimation}>pausar</button>
        )}

        {moveType === "paused" && (
          <>
            <button onClick={continueAnimation}>voltar</button>
            <button onClick={resetAnimation}>reiniciar</button>
          </>
        )}

        {moveType === "end" && (
          <button onClick={resetAnimation}>voltar ao início</button>
        )}
      </div>

      <p>Tempo passado: {timePassing.toFixed(3)}s</p>
    </>
  );
}
