import { useRef, useState } from "react";

type MoveStatus = "start" | "moving" | "end";

export function Test() {
  const [moveType, setMoveType] = useState<MoveStatus>("start");

  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const positionRef = useRef(0);
  const imageRef = useRef<HTMLImageElement>(null);

  const moveImage = () => {
    if (moveType === "moving" || moveType === "end") {
      if (animationRef.current !== null)
        cancelAnimationFrame(animationRef.current);
      setMoveType("start");
      lastTimeRef.current = 0;
      positionRef.current = 0;
      if (imageRef.current) imageRef.current.style.left = "0px";
      return;
    }
    // pixels por segundo
    const speed = 1000;

    setMoveType("moving");
    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;

      const deltaTime = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      // máximo em pixels
      const limit = window.innerWidth - 100;

      const next = positionRef.current + speed * deltaTime;

      if (next >= limit) {
        positionRef.current = limit;
        setMoveType("end");
        animationRef.current = null;
        return;
      }

      positionRef.current = next;
      if (imageRef.current) {
        imageRef.current.style.left = `${next.toString()}px`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  return (
    <>
      <button onClick={moveImage}>
        {moveType === "start"
          ? "Movimentar"
          : moveType === "moving"
            ? "Interromper"
            : "Voltar para início"}
      </button>

      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/044/876/360/small_2x/cat-with-glasses-meme-sticker-tshirt-illustration-free-png.png"
        className="absolute top-24 w-24 select-none"
        ref={imageRef}
      />
    </>
  );
}
