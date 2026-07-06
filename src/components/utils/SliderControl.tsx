type SliderControlProps = {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  disabled: boolean;
};

export function SliderControl({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  disabled,
}: SliderControlProps) {
  return (
    // TODO: USAR UM TOOLTIP OU SEI LÁ
    <div title={disabled ? "Volte a animação para editar valores" : undefined}>
      <div
        className={
          "grid grid-rows-[auto_auto] gap-1" +
          (disabled ? " pointer-events-none" : "")
        }
      >
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => {
            onChange(Number(e.target.value));
          }}
          className="w-full"
        />

        <div className="grid grid-cols-[1fr_auto] items-center">
          <span className="text-xs">{label}</span>

          <div className="bg-zinc-700 rounded px-2 py-1 text-xs min-w-12 text-center">
            <input
              type="number"
              value={value}
              onChange={(e) => {
                onChange(Number(e.target.value));
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
