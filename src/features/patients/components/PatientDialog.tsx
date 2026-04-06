import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import type {
  PatientFormData,
  PatientDialogProps,
} from "../types/patient.types";
import PatientForm from "../components/PatientForm";

const PatientDialog = ({
  title,
  description,
  onSubmit,
  defaultValues,
  children,
}: PatientDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (data: PatientFormData) => {
    const success = await onSubmit(data);

    if (success) {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <PatientForm onSubmit={handleSubmit} defaultValues={defaultValues} />
      </DialogContent>
    </Dialog>
  );
};

export default PatientDialog;

//Nueva entrada
// Agregar nuevo paciente
