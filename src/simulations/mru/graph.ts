import { calculateMRUPosition } from "@mru/formulas";

// função que define as informações da tabela

// TODO: adicionar vários pontos e não apenas o primeiro e último
export function buildMRUGraphData(
  speed: number,
  initialPosition: number,
  targetPosition: number,
  elapsedTime: number,
): { time: number; space: number }[] {
  return [
    {
      time: 0,
      space: initialPosition,
    },
    {
      time: elapsedTime,
      space: calculateMRUPosition(
        initialPosition,
        targetPosition,
        speed,
        elapsedTime,
      ),
    },
  ];
}
