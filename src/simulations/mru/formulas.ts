// fórmulas de MRU

export function calculateMRUDuration(speed: number, distance: number): number {
  return distance / Math.abs(speed);
}

export function calculateMRUPosition(
  initialPosition: number,
  targetPosition: number,
  speed: number,
  time: number,
) {
  const position = initialPosition + speed * time;
  return speed > 0
    ? Math.min(position, targetPosition)
    : Math.max(position, targetPosition);
}
