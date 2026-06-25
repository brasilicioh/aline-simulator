import { calculateMRUPosition } from "@mru/formulas";

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
