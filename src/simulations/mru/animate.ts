import type { useAnimation } from "@animation";

export function calculateAnimationPosition(
  initialPosition: number,
  targetPosition: number,
  progress: number,
) {
  return initialPosition + (targetPosition - initialPosition) * progress;
}

type AnimationController = ReturnType<typeof useAnimation>;

type StartAnimationProps = {
  animation: AnimationController;
  duration: number;
  initialPosition: number;
  targetPosition: number;
  initialProgress?: number;
  setTimePassing: (time: number) => void;
  onPositionChange: (position: number) => void;
  onFinish: () => void;
  progressRef: React.RefObject<number>;
};

export function startMRUAnimation({
  animation,
  duration,
  initialPosition,
  targetPosition,
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
      progressRef.current = progress;
      setTimePassing(elapsedSeconds);
      onPositionChange(
        calculateAnimationPosition(initialPosition, targetPosition, progress),
      );
    },
    onFinish,
  });
}

export function pauseMRUAnimation(animation: AnimationController) {
  animation.reset();
}

type ResetAnimationProps = {
  animation: AnimationController;
  progressRef: React.RefObject<number>;
  setTimePassing: (time: number) => void;
  onResetPosition: () => void;
};

export function resetMRUAnimation({
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
