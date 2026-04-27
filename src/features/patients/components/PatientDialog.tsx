import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "../../../components/ui/dialog";
import type {
  PatientFormData,
  PatientDialogProps,
} from "../types/patient.types";
import PatientForm from "../components/PatientForm";

const PatientDialog = ({
  title,
  description,
  buttonText,
  onSubmit,
  defaultValues,
  children,
}: PatientDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (data: PatientFormData) => {
    try {
      const success = await onSubmit(data);

      if (success) {
        setOpen(false);
      }
    } catch (error) {
      console.error("Error en PatientDialog:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="p-0 max-w-xl! w-full rounded-2xl overflow-hidden flex flex-col max-h-[90vh]!">
        <DialogHeader className="px-8 py-6 border-b border-slate-100">
          <DialogTitle className="text-xl font-bold text-slate-900">
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-500 mt-1">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="p-8 overflow-y-auto space-y-6">
          <PatientForm
            buttonText={buttonText}
            onSubmit={handleSubmit}
            defaultValues={defaultValues}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PatientDialog;
