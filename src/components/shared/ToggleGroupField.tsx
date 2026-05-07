import { Controller } from "react-hook-form";
import clsx from "clsx";

type Option = {
  value: string;
  label: string;
  color?: "blue" | "green" | "yellow" | "red";
};

type ToggleGroupFieldProps = {
  name: string;
  control: any;
  label: string;
  options: Option[];
};

const colorStyles = {
  blue: "border-blue-600 bg-blue-50 text-blue-600",
  green: "border-green-600 bg-green-50 text-green-600",
  yellow: "border-yellow-600 bg-yellow-50 text-yellow-600",
  red: "border-red-600 bg-red-50 text-red-600",
};

const ToggleGroupField = ({
  name,
  control,
  label,
  options,
}: ToggleGroupFieldProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">{label}</label>

          <div className="flex gap-2">
            {options.map((option) => {
              const isActive = field.value === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => field.onChange(option.value)}
                  className={clsx(
                    "px-4 py-2 rounded-lg border text-sm transition",
                    isActive
                      ? colorStyles[option.color || "blue"]
                      : "border-slate-300 hover:bg-slate-100"
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    />
  );
};

export default ToggleGroupField;