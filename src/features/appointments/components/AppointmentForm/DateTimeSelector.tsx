import { Controller} from "react-hook-form";
import { Input } from "../../../../components/ui/input";
import type { AppointmentFormValues } from "../../types/appointment.types";
import type { Control } from "react-hook-form";

const HOURS = ["09:00", "10:00", "11:00", "12:00", "16:00", "17:00"];

type DateTimeSelectorProps = {
  control: Control<AppointmentFormValues>;
};

const DateTimeSelector = ({ control }: DateTimeSelectorProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Controller
        control={control}
        name="appointment_date"
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Fecha</label>

            <Input
              type="text"
              value={
                field.value
                  ? field.value.toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "no hay hora"
              }
              readOnly
              className="border rounded-md px-3 py-2 text-sm bg-slate-100 cursor-not-allowed"
              placeholder="Selecciona una fecha en el calendario"
            />
          </div>
        )}
      />

      <Controller
        control={control}
        name="time"
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Hora</label>

            <select
              className="border rounded-md px-3 py-2 text-sm"
              value={field.value || "no hay datos"}
              onChange={(e) => field.onChange(e.target.value)}
            >
              <option value="">Selecciona hora</option>

              {HOURS.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
          </div>
        )}
      />
    </div>
  );
};

export default DateTimeSelector;
