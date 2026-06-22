export function calculateMRUDuration(speed: number, distance: number): number {
  return distance / speed;
}

export function calculateMRUPosition(
  speed: number,
  time: number,
  maxDistance: number,
): number {
  return Math.min(speed * time, maxDistance);
}
