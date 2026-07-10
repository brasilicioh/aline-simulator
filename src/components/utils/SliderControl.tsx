import { useEffect, useState } from "react";

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
  const [showValue, setShowValue] = useState(value.toString());

  const handleInput = () => {
    if (showValue == "") {
      setShowValue(value.toString());
      return;
    }

    const num = Number(showValue);

    if (Number.isNaN(num)) {
      setShowValue(value.toString());
      return;
    }

    const inputNumber = Math.min(max, Math.max(min, num));

    onChange(inputNumber);
    setShowValue(inputNumber.toString());
  };

  useEffect(() => {
    const setValue = () => {
      setShowValue(value.toString());
    };

    setValue();
  }, [value]);

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
          value={showValue}
          onChange={(e) => {
            onChange(Number(e.target.value));
          }}
          className="w-full"
        />

        <div className="grid grid-cols-[1fr_auto] items-center">
          <span className="text-xs">{label}</span>

          <div className="bg-zinc-700 rounded text-xs w-20 text-center">
            <input
              type="number"
              inputMode="numeric"
              value={showValue}
              onBlur={handleInput}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleInput();
                  e.currentTarget.blur();
                }
              }}
              onChange={(e) => {
                const raw = Number(e.target.value);

                const newValue = Math.min(max, Math.max(min, raw));
                onChange(newValue);
              }}
              className="px-2 py-1 rounded w-20"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
