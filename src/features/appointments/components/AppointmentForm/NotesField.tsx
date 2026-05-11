import { Controller } from "react-hook-form";
import type { AppointmentFormValues } from "../../types/appointment.types";
import type { Control } from "react-hook-form";

const MAX_LENGTH = 500;

type NotesFieldProps = {
  control: Control<AppointmentFormValues>;
};

const NotesField = ({ control }: NotesFieldProps) => {
  return (
    <Controller
      control={control}
      name="notes"
      render={({ field }) => {
        const length = field.value?.length || 0;

        return (
          <div className="flex flex-col gap-2">
            <label htmlFor="note" className="text-sm font-medium">Notas</label>

            <textarea
              id="note"
              {...field}
              maxLength={MAX_LENGTH}
              placeholder="Escribe notas sobre la cita..."
              className="border rounded-md px-3 py-2 text-sm min-h-30 resize-none bg-surfacer-container"
            />

            <div className="text-xs text-right text-slate-500">
              {length} / {MAX_LENGTH}
            </div>
          </div>
        );
      }}
    />
  );
};

export default NotesField;
