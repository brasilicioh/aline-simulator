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

import SimFrame from "@frames/SimFrame";

export function MUVSimulator() {
  const [acceleration, setAcceleration] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(10);
  const [initialPosition, setInitialPosition] = useState<number>(0);
  const [startPosition, setStartPosition] = useState<number>(-50);
  const [finalPosition, setFinalPosition] = useState<number>(50);

  const [moveType, setMoveType] = useState<MoveStatus>("start");
  const [timePassing, setTimePassing] = useState<number>(0);

  const imageRef = useRef<HTMLImageElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  const animation = useAnimation();
  const targetPosition = speed >= 0 ? finalPosition : startPosition;
  const maxSpeed =
    calculateMUVFinalSpeed(
      speed,
      acceleration,
      targetPosition - initialPosition,
    ) | 0;

  const [duration, realTargetPosition] = calculateMUVDuration(
    initialPosition,
    startPosition,
    finalPosition,
    targetPosition,
    speed,
    acceleration,
  );

  const positionGraphData = buildMUVGraphData(
    initialPosition,
    speed,
    acceleration,
    timePassing,
  );

  const velocityGraphData = buildMUVVelocityGraphData(
    speed,
    acceleration,
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
      acceleration: acceleration,
      targetPosition: realTargetPosition,
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
      acceleration: acceleration,
      targetPosition: realTargetPosition,
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
      <SimFrame
        speed={speed}
        setSpeed={setSpeed}
        acceleration={acceleration}
        setAcceleration={setAcceleration}
        startPosition={startPosition}
        setStartPosition={setStartPosition}
        initialPosition={initialPosition}
        setInitialPosition={setInitialPosition}
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
        maxSpeed={maxSpeed}
        minSpeed={speed}
        duration={duration}
        isMUV={true}
      />
    </>
  );
}
