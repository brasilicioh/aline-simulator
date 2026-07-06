import { calculateMUVPosition, calculateMUVSpeed } from "./formulas";

type Point = { time: number; space: number };
type VelocityPoint = { time: number; speed: number };

const SEGMENTS = 100;

export function buildMUVGraphData(
  initialPosition: number,
  initialSpeed: number,
  acceleration: number,
  elapsedTime: number,
): Point[] {
  const clampedElapsed = Math.max(0, elapsedTime);
  const data: Point[] = [
    {
      time: 0,
      space: initialPosition,
    },
  ];

  if (clampedElapsed === 0) return data;

  for (let i = 1; i <= SEGMENTS; i++) {
    const time = (clampedElapsed * i) / SEGMENTS;
    const position = calculateMUVPosition(
      initialPosition,
      initialSpeed,
      acceleration,
      time,
    );

    data.push({ time, space: position });
  }

  return data;
}

export function buildMUVVelocityGraphData(
  initialSpeed: number,
  acceleration: number,
  elapsedTime: number,
): VelocityPoint[] {
  const clampedElapsed = Math.max(0, elapsedTime);
  const data: VelocityPoint[] = [
    {
      time: 0,
      speed: initialSpeed,
    },
  ];

  if (clampedElapsed === 0) return data;

  for (let i = 1; i <= SEGMENTS; i++) {
    const time = (clampedElapsed * i) / SEGMENTS;

    data.push({
      time,
      speed: calculateMUVSpeed(initialSpeed, acceleration, time),
    });
  }

  return data;
}
