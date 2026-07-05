import { QLSimFrame } from "../../components/frames/QLSimFrame";

import { useEffect, useRef, useState } from "react";

import { useAnimation } from "@animation";

import { buildMRUGraphData } from "@mru/graph";
import { calculateMRUDuration } from "@mru/formulas";
import {
  startMRUAnimation,
  pauseMRUAnimation,
  resetMRUAnimation,
} from "@mru/animate";

import type { MoveStatus } from "@mru/../types";
import SimFrame from "../../components/frames/SimFrame";
import { renderPosition, verifyValues } from "@mru/../utils";

export function QLSimulator() {

  const [moveType, setMoveType] = useState<MoveStatus>("start");
  // estados obtidos via entrada
  const [speed, setSpeed] = useState<number>(1);
  const [gravity, setGravity] = useState<number>(9.8);
  const [startPosition, setStartPosition] = useState<number>(10);
  const [finalPosition, setFinalPosition] = useState<number>(0);
  
  // estado que guarda quanto tempo de animação se passou
  const [timePassing, setTimePassing] = useState<number>(0);
  
  // constantes usadas em cálculo, respectivamente:
  // posição final "alvo"; distância a ser percorrida; a duração nesse perccurso
  const targetPosition = speed > 0 ? finalPosition : startPosition;
  const distanceToTravel = Math.abs(targetPosition - startPosition);
  const duration = calculateMRUDuration(speed, distanceToTravel);
  
  // dados que montam o gráfico
  const graphData = buildMRUGraphData(
    speed,
    startPosition,
    targetPosition,
    timePassing,
  );
  
  // referências usadas para, respectivamente:
  // informações do corpo; delimitação da "pista de movimento"; progresso (0-1) de movimentação até o fim
  const imageRef = useRef<HTMLImageElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  
  // constante que guarda as funções de movimento
  const animation = useAnimation();

  const isMoving = moveType === "moving";
  
  return (
    <QLSimFrame
      speed={speed} setSpeed={setSpeed}
      gravity={gravity} setGravity={setGravity}
      startPosition={startPosition} setStartPosition={setStartPosition}
      finalPosition={finalPosition} setFinalPosition={setFinalPosition}
      timePassing={timePassing} setTimePassing={setTimePassing}
      moveType={moveType}

      screenRef={screenRef} imageRef={imageRef}
      
      //startAnimation={startAnimation} pauseAnimation={pauseAnimation}
      //continueAnimation={continueAnimation} resetAnimation={resetAnimation}

      graphData={graphData} maxTime={duration}
    />
  )
}
