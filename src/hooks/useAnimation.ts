import { useEffect, useRef } from "react";

type UseAnimationParams = {
  duration: number;
  initialProgress?: number;
  onFrame: (elapsedSeconds: number, progress: number) => void;
  onFinish: () => void;
};

export function useAnimation() {
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    return () => {
      if (animationRef.current !== null)
        cancelAnimationFrame(animationRef.current);
    };
  }, []);

  function reset() {
    if (animationRef.current !== null)
      cancelAnimationFrame(animationRef.current);

    animationRef.current = null;
    startTimeRef.current = 0;
  }

  function start({
    duration,
    initialProgress = 0,
    onFrame,
    onFinish,
  }: UseAnimationParams) {
    reset();

    const animate = (time: number) => {
      if (!startTimeRef.current)
        startTimeRef.current = time - duration * initialProgress * 1000;

      const elapsedSeconds = (time - startTimeRef.current) / 1000;

      const progress = Math.min(elapsedSeconds / duration, 1);

      onFrame(Math.min(elapsedSeconds, duration), progress);

      if (progress >= 1) {
        animationRef.current = null;
        onFinish();
        return;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
  }

  return {
    start,
    reset,
  };
}
