// funções que podem ser usadas em qualquer módulo

export function getPixelsPerMeter(
  startPosition: number,
  finalPosition: number,
  trackWidth: number,
  imageWidth: number,
) {
  return (trackWidth - imageWidth) / (finalPosition - startPosition);
}

export function metersToPixels(
  positionInMeters: number,
  startPosition: number,
  pixelsPerMeter: number,
) {
  return (positionInMeters - startPosition) * pixelsPerMeter;
}

export function validateTrack(startPosition: number, finalPosition: number) {
  if (startPosition >= finalPosition)
    return "Posição inicial deve ser menor que final";
  return "";
}

export function validateObjectPosition(
  position: number,
  startPosition: number,
  finalPosition: number,
) {
  if (position < startPosition)
    return `Posição deve ser no mínimo ${startPosition.toString()}`;
  if (position > finalPosition)
    return `Posição deve ser no máximo ${finalPosition.toString()}`;
  return "";
}

type RenderPositionProps = {
  image: HTMLImageElement | null;
  positionInMeters: number;
  startPosition: number;
  finalPosition: number;
  trackWidth: number;
};

export function renderPosition({
  image,
  positionInMeters,
  startPosition,
  finalPosition,
  trackWidth,
}: RenderPositionProps) {
  if (!image) return;
  const pixelsPerMeter = getPixelsPerMeter(
    startPosition,
    finalPosition,
    trackWidth,
    image.offsetWidth,
  );
  const positionPx = metersToPixels(
    positionInMeters,
    startPosition,
    pixelsPerMeter,
  );
  image.style.transform = `translateX(${positionPx.toString()}px)`;
}

type VerifyMRUProps = {
  speed: number;
  startPosition: number;
  finalPosition: number;
  initialPosition: number;
  distanceToTravel: number;
};

export function verifyValues({
  speed,
  startPosition,
  finalPosition,
  initialPosition,
  distanceToTravel,
}: VerifyMRUProps) {
  if (speed === 0) return "Velocidade não pode ser zero";
  if (startPosition >= finalPosition)
    return "Posição inicial deve ser menor que final";
  if (startPosition > initialPosition)
    return `Aline deve estar no mínimo em ${startPosition.toString()}`;
  if (finalPosition < initialPosition)
    return `Aline deve estar no máximo em ${finalPosition.toString()}`;
  if (distanceToTravel === 0) return "Aline já está no destino.";
  return "";
}
