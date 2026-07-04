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

export function MUVSimulator() {
  const [moveType, setMoveType] = useState<MoveStatus>("start");
  
  // estados obtidos via entrada
  const [speed, setSpeed] = useState<number>(1);
  const [acceleration, setAcceleration] = useState<number>(0);
  const [startPosition, setStartPosition] = useState<number>(0);
  const [finalPosition, setFinalPosition] = useState<number>(10);
  const [initialPosition, setInitialPosition] = useState<number>(0);
  
  // estado que guarda quanto tempo de animação se passou
  const [timePassing, setTimePassing] = useState<number>(0);
  
  // constantes usadas em cálculo, respectivamente:
  // posição final "alvo"; distância a ser percorrida; a duração nesse perccurso
  const targetPosition = speed > 0 ? finalPosition : startPosition;
  const distanceToTravel = Math.abs(targetPosition - initialPosition);
  const duration = calculateMRUDuration(speed, distanceToTravel);
  
  // dados que montam o gráfico
  const graphData = buildMRUGraphData(
    speed,
    initialPosition,
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
  
  // booleano que delimita se os inputs podem ser alterados
  // TODO: não permitir alterar inputs em pause
  const isMoving = moveType === "moving";

  return (
    <>
      <SimFrame
        speed={speed} setSpeed={setSpeed}
        acceleration={acceleration} setAcceleration={setAcceleration}
        startPosition={startPosition} setStartPosition={setStartPosition}
        initialPosition={initialPosition} setInitialPosition={setInitialPosition}
        finalPosition={finalPosition} setFinalPosition={setFinalPosition}
        timePassing={timePassing} setTimePassing={setTimePassing}
        moveType={moveType}

        screenRef={screenRef} imageRef={imageRef}

        //startAnimation={startAnimation} pauseAnimation={pauseAnimation}
        //continueAnimation={continueAnimation} resetAnimation={resetAnimation}

        graphData={graphData} maxTime={duration}
        isMUV={true}
      />
    </>
  );
}

