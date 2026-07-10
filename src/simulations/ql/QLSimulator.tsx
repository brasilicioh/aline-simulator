import { QLSimFrame } from "../../components/frames/QLSimFrame";

import { useEffect, useRef, useState } from "react";

import { useAnimation } from "@animation";

import { renderPosition } from "@muv/../utils";
import type { MoveStatus } from "@muv/../types";
import {
  pauseMUVAnimation,
  resetMUVAnimation,
  startMUVAnimation,
} from "@muv/animate";
import { calculateMUVDuration, calculateMUVFinalSpeed } from "@muv/formulas";
import { buildMUVGraphData, buildMUVVelocityGraphData } from "@muv/graph";

export function QLSimulator() {
  return (
    <div className="bg-gray-800 flex flex-col gap-3 items-center min-h-screen">
      <p className="text-4xl font-semibold text-center">Em desenvolvimento</p>
    </div>
  );

  const [gravity, setGravity] = useState<number>(10);
  const [speed, setSpeed] = useState<number>(0);
  const [initialPosition, setInitialPosition] = useState<number>(100);
  const [startPosition, setStartPosition] = useState<number>(100);
  const [finalPosition, setFinalPosition] = useState<number>(0);

  const [moveType, setMoveType] = useState<MoveStatus>("start");
  const [timePassing, setTimePassing] = useState<number>(0);

  const imageRef = useRef<HTMLImageElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  const animation = useAnimation();
  const targetPosition = speed >= 0 ? finalPosition : startPosition;
  const maxSpeed =
    calculateMUVFinalSpeed(speed, gravity, targetPosition - initialPosition) |
    0;

  const duration = calculateMUVDuration(
    initialPosition,
    targetPosition,
    speed,
    gravity,
  );

  const positionGraphData = buildMUVGraphData(
    initialPosition,
    speed,
    gravity,
    timePassing,
  );

  const velocityGraphData = buildMUVVelocityGraphData(
    speed,
    gravity,
    timePassing,
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
      acceleration: gravity,
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
      acceleration: gravity,
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
    <QLSimFrame
      speed={speed}
      setSpeed={setSpeed}
      gravity={gravity}
      setGravity={setGravity}
      startPosition={startPosition}
      setStartPosition={setStartPosition}
      finalPosition={finalPosition}
      setFinalPosition={setFinalPosition}
      timePassing={timePassing}
      setTimePassing={setTimePassing}
      moveType={moveType}
      screenRef={screenRef}
      imageRef={imageRef}
      startAnimation={startAnimation}
      pauseAnimation={pauseAnimation}
      continueAnimation={continueAnimation}
      resetAnimation={resetAnimation}
      graphData={positionGraphData}
      velocityGraphData={velocityGraphData}
      duration={duration}
      maxSpeed={maxSpeed}
      minSpeed={speed}
    />
  );
}
