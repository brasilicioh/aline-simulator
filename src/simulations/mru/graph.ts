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
    const position = calculateMRUPosition(
      initialPosition,
      targetPosition,
      speed,
      time,
    );

    data.push({
      time: Math.round(time * 1000) / 1000,
      space: Math.round(position * 1000) / 1000,
    });
  }

  return data;
}
