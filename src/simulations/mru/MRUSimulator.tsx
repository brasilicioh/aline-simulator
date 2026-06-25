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
  // estado que define o tipo de movimento atual da imagem
  const [moveType, setMoveType] = useState<MoveStatus>("start");

  // estados obtidos via entrada
  const [speed, setSpeed] = useState<number>(1);
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

  // função utilitária de renderização
  const renderAnimatedPosition = (position: number) => {
    renderPosition({
      image: imageRef.current,
      positionInMeters: position,
      startPosition,
      finalPosition,
      trackWidth: screenRef.current?.clientWidth ?? 0,
    });
  };

  // função utilitária de animação do início
  const moveImage = () => {
    // verifica se todos inputs estão ok
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

    // função principal de início de movimento retilíneo
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

  // função utilitária de parada
  const pauseAnimation = () => {
    pauseMRUAnimation(animation);
    setMoveType("paused");
  };

  // função utilitária de continuação de movimento caso tenha parado
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

  // função utilitária para voltar ao início
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

  // hook que renderiza posição da imagem na tela conforme entradas
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
