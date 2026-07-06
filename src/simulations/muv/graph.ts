import { calculateMUVPosition } from "./formulas";

type Point = { time: number; space: number };

export function buildMUVGraphData(
  initialPosition: number,
  initialSpeed: number,
  acceleration: number,
  elapsedTime: number,
  startPosition: number,
  finalPosition: number,
  samples = 16,
): Point[] {
  const clampedElapsed = Math.max(0, elapsedTime);

  if (clampedElapsed === 0) {
    return [{ time: 0, space: initialPosition }];
  }

  const safeSamples = Math.max(2, Math.floor(samples));
  const data: Point[] = [];

  for (let index = 0; index < safeSamples; index += 1) {
    const progress = index / (safeSamples - 1);
    const time = clampedElapsed * progress;
    const position = calculateMUVPosition(
      initialPosition,
      initialSpeed,
      acceleration,
      time,
    );

    data.push({
      time,
      space: Math.min(finalPosition, Math.max(startPosition, position)),
    });
  }

  return data;
}
