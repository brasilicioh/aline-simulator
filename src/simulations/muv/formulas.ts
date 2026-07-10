// formulas for MUV (constant acceleration)

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
  // tá no destino.
  if (Math.abs(targetPosition - initialPosition) < 0) {
    return 0;
  }

  // mru
  if (Math.abs(acceleration) == 0) {
    if (Math.abs(initialSpeed) < 0) return NaN;

    const time = (targetPosition - initialPosition) / initialSpeed;
    return time >= 0 ? time : NaN;
  }

  // Resolve:
  // (a/2)t² + v0*t + (s0 - sTarget) = 0
  const a = acceleration / 2;
  const b = initialSpeed;
  const c = initialPosition - targetPosition;

  const delta = b * b - 4 * a * c;

  if (delta >= 0) {
    const sqrtDelta = Math.sqrt(Math.max(0, delta));

    const t1 = (-b + sqrtDelta) / (2 * a);
    const t2 = (-b - sqrtDelta) / (2 * a);

    const valid = [t1, t2].filter((time) => Number.isFinite(time) && time >= 0);

    if (valid.length > 0) return Math.min(...valid);
  }

  // não chegou ao destino.
  // retorna ao ponto inicial?
  const returnTime = (-2 * initialSpeed) / acceleration;

  if (Number.isFinite(returnTime) && returnTime > 0) return returnTime;

  // não chegou no destino e nem ao ponto inicial
  return NaN;
}

export function calculateMUVFinalSpeed(
  initialSpeed: number,
  acceleration: number,
  displacement: number,
) {
  // solve torriceli
  return Math.sqrt(initialSpeed ** 2 + 2 * acceleration * displacement);
}
