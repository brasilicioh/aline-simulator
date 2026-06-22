import { calculateMRUPosition } from "@mru/formulas";

export function buildMRUGraphData(
  speed: number,
  finalDistance: number,
  elapsedTime: number,
) {
  return [
    {
      time: 0,
      space: 0,
    },
    {
      time: elapsedTime,
      space: calculateMRUPosition(speed, elapsedTime, finalDistance),
    },
  ];
}
