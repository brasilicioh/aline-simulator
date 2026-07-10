import type { useAnimation } from "@animation";

import { calculateMUVPosition } from "@ql/formulas";

type AnimationController = ReturnType<typeof useAnimation>;

type StartAnimationProps = {
  animation: AnimationController;
  duration: number;
  initialPosition: number;
  initialSpeed: number;
  acceleration: number;
  targetPosition: number;
  startPosition: number;
  finalPosition: number;
  initialProgress?: number;
  setTimePassing: (time: number) => void;
  onPositionChange: (position: number) => void;
  onFinish: () => void;
  progressRef: React.RefObject<number>;
};

function clampPosition(
  position: number,
  startPosition: number,
  finalPosition: number,
) {
  return Math.min(finalPosition, Math.max(startPosition, position));
}

export function startMUVAnimation({
  animation,
  duration,
  initialPosition,
  initialSpeed,
  acceleration,
  targetPosition,
  startPosition,
  finalPosition,
  initialProgress = 0,
  progressRef,
  setTimePassing,
  onPositionChange,
  onFinish,
}: StartAnimationProps) {
  animation.start({
    duration,
    initialProgress,
    onFrame(elapsedSeconds, progress) {
      const position = calculateMUVPosition(
        initialPosition,
        initialSpeed,
        acceleration,
        elapsedSeconds,
      );

      progressRef.current = progress;
      setTimePassing(elapsedSeconds);
      onPositionChange(clampPosition(position, startPosition, finalPosition));
    },
    onFinish() {
      onPositionChange(
        clampPosition(targetPosition, startPosition, finalPosition),
      );
      onFinish();
    },
  });
}

export function pauseMUVAnimation(animation: AnimationController) {
  animation.reset();
}

type ResetAnimationProps = {
  animation: AnimationController;
  progressRef: React.RefObject<number>;
  setTimePassing: (time: number) => void;
  onResetPosition: () => void;
};

export function resetMUVAnimation({
  animation,
  progressRef,
  setTimePassing,
  onResetPosition,
}: ResetAnimationProps) {
  animation.reset();
  progressRef.current = 0;
  setTimePassing(0);
  onResetPosition();
}
