// formulas for MUV (constant acceleration)

const EPS = 1e-9;

export function calculateMUVPosition(
  initialPosition: number,
  initialSpeed: number,
  acceleration: number,
  time: number,
) {
  return (
    initialPosition + initialSpeed * time + (acceleration * time * time) / 2
  );
}

export function calculateMUVSpeed(
  initialSpeed: number,
  acceleration: number,
  time: number,
) {
  return initialSpeed + acceleration * time;
}

export function calculateMUVDuration(
  initialPosition: number,
  targetPosition: number,
  initialSpeed: number,
  acceleration: number,
) {
  // Solve (a/2)t^2 + v0*t + (s0 - sTarget) = 0 and keep the smallest valid t >= 0.
  if (Math.abs(acceleration) < EPS) {
    if (Math.abs(initialSpeed) < EPS) return NaN;

    const time = (targetPosition - initialPosition) / initialSpeed;
    return time >= 0 ? time : NaN;
  }

  const a = acceleration / 2;
  const b = initialSpeed;
  const c = initialPosition - targetPosition;

  const delta = b * b - 4 * a * c;
  if (delta < 0) return NaN;

  const sqrtDelta = Math.sqrt(delta);
  const t1 = (-b + sqrtDelta) / (2 * a);
  const t2 = (-b - sqrtDelta) / (2 * a);

  const valid = [t1, t2].filter((time) => Number.isFinite(time) && time >= 0);
  if (valid.length === 0) return NaN;

  return Math.min(...valid);
}

export function calculateMUVFinalSpeed(
  initialSpeed: number,
  acceleration: number,
  displacement: number,
) {
  // solve torriceli
  return Math.sqrt(
    initialSpeed ** 2 + 2 * acceleration * displacement,
  );
}