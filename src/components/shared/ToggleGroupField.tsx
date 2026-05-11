import { Controller } from "react-hook-form";
import clsx from "clsx";

type Option = {
  value: string;
  label: string;
};

type ToggleGroupFieldProps = {
  name: string;
  control: any;
  label: string;
  options: Option[];
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
          <label id={`${name}-label`} className="text-sm font-medium">{label}</label>

          <div
            role="group"
            aria-labelledby={`${name}-label`}
            className={clsx(
              "grid grid-cols-3 gap-3",
              label === "Prioridad"
                ? "bg-surfacer-container p-1 rounded-xl"
                : "",
            )}
          >
            {options.map((option) => {
              const isActive = field.value === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => field.onChange(option.value)}
                  className={clsx(
                    "px-4 py-2 rounded-lg text-sm transition cursor-pointer border",

                    label === "Tipo de tratamiento" &&
                      (isActive
                        ? "bg-blue-50 border-blue-600 text-blue-900"
                        : "bg-white border-slate-300 hover:bg-slate-100 text-slate-700"),

                    label === "Prioridad" &&
                      (isActive
                        ? "bg-white border-white shadow-sm text-slate-900"
                        : "bg-transparent border-transparent hover:bg-white/50 text-slate-500"),
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
