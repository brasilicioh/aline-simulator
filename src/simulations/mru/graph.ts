import { calculateMRUPosition } from "@mru/formulas";

// função que define as informações da tabela

export function buildMRUGraphData(
  speed: number,
  initialPosition: number,
  targetPosition: number,
  elapsedTime: number,
): { time: number; space: number }[] {
  const segments = 100;

  const data: { time: number; space: number }[] = [
    {
      time: 0,
      space: initialPosition,
    },
  ];

  if (elapsedTime === 0) return data;

  for (let i = 1; i <= segments; i++) {
    const time = (elapsedTime * i) / segments;

    data.push({
      time,
      space: calculateMRUPosition(initialPosition, targetPosition, speed, time),
    });
  }

  return data;
}
