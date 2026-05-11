import { Button } from "../../../../components/ui/button";
import type { FormActionsProps } from "../../types/appointment.types";

const FormActions = ({ onCancel, onDelete, isEdit, isSubmitting }: FormActionsProps) => {
  return (
    <div className="flex justify-between items-center pt-4 border-t border-slate-200">
      <div>
        {isEdit && (
          <Button
            type="button"
            onClick={onDelete}
            className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Eliminar
          </Button>
        )}
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 rounded-xl text-sm font-bold bg-transparent text-slate-600 hover:bg-slate-200 transition-all"
        >
          Cancelar
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isSubmitting
            ? isEdit
              ? "Guardando..."
              : "Creando..."
            : isEdit
              ? "Guardar cambios"
              : "Crear cita"}
        </Button>
      </div>
    </div>
  );
};

export default FormActions;
