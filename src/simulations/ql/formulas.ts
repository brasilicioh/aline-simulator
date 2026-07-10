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
  startPosition: number,
  finalPosition: number,
  targetPosition: number,
  initialSpeed: number,
  acceleration: number,
): [number, number] {
  // tá no destino.
  if (targetPosition - initialPosition === 0) return [0, targetPosition];

  // mru
  if (Math.abs(acceleration) == 0) {
    if (Math.abs(initialSpeed) == 0) return [NaN, targetPosition];
    const time = (targetPosition - initialPosition) / initialSpeed;
    return [time >= 0 ? time : NaN, targetPosition];
  }

  // Resolve:
  // (a/2)t² + v0*t + (s0 - sTarget) = 0
  const solveTime = (start: number, end: number, speed: number): number => {
    const a = acceleration / 2;
    const b = speed;
    const c = start - end;

    const delta = b * b - 4 * a * c;
    if (delta < 0) return NaN;
    const sqrtDelta = Math.sqrt(delta);

    const t1 = (-b + sqrtDelta) / (2 * a);
    const t2 = (-b - sqrtDelta) / (2 * a);

    const valid = [t1, t2].filter((time) => Number.isFinite(time) && time >= 0);

    return valid.length ? Math.min(...valid) : NaN;
  };

  // 1°: do início ao alvo (direct == NaN -> não chega ao alvo)
  const direct = solveTime(initialPosition, targetPosition, initialSpeed);

  if (!Number.isNaN(direct)) return [direct, targetPosition];

  // 2°: não chegou no alvo; calcular quando velocidade zera
  const turnTime = -initialSpeed / acceleration;

  if (!Number.isFinite(turnTime) || turnTime <= 0) return [NaN, targetPosition];

  // 3°: posição onde corpo para
  const turnPosition =
    initialPosition +
    initialSpeed * turnTime +
    0.5 * acceleration * turnTime * turnTime;

  // qual extremidade ele vai depois de inverter?
  const returnTarget =
    initialSpeed > 0
      ? startPosition // estava indo para direita, volta para esuerda
      : finalPosition; // estava indo para esquerda, volta para direita

  const back = solveTime(turnPosition, returnTarget, 0);
  if (Number.isNaN(back)) return [NaN, returnTarget];

  return [turnTime + back, returnTarget];
}

export function calculateMUVFinalSpeed(
  initialSpeed: number,
  acceleration: number,
  displacement: number,
) {
  // solve torriceli
  return Math.sqrt(initialSpeed ** 2 + 2 * acceleration * displacement);
}
