import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { appointmentSchema } from "../../schema/appointment.schema";
import { buildAppointmentDate } from "../../utils/date.utils";
import type { AppointmentFormProps, AppointmentFormValues } from "../../types/appointment.types";
import PatientSelector from "./PatientSelector";
import DateTimeSelector from "./DateTimeSelector";
import ToggleGroupField from "../../../../components/shared/ToggleGroupField";
import NotesField from "./NotesField";
import FormActions from "./FormActions";


const AppointmentForm = ({
  selectedDate,
  setSelectedDate,
  setOpen,
  selectedAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment
}:AppointmentFormProps) => {
  

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      patient_id: 0,
      appointment_date: new Date(),
      time: "",
      treatment_type: "scheduled",
      priority: "medium",
      notes: "",
    },
  });

  useEffect(() => {
    if (selectedDate) {
      form.setValue("appointment_date", selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (selectedAppointment) {
      form.reset({
        patient_id: selectedAppointment.patient_id,
        appointment_date: selectedAppointment.appointment_date,
        time: selectedAppointment.time,
        treatment_type: selectedAppointment.treatment_type,
        priority: selectedAppointment.priority,
        notes: selectedAppointment.notes,
      });
    }
  }, [selectedAppointment]);

  const handleClose = () => {
    setOpen(false);
    setSelectedDate(null);
  };

  const onSubmit = async (data: AppointmentFormValues) => {
    const appointment_date = buildAppointmentDate(
      data.appointment_date,
      data.time,
    );
    const payload = {
      id_patient_FK: data.patient_id,
      appointment_date,
      status: data.treatment_type,
      priority: data.priority,
      notes: data.notes,
    };
    let success = false;

    if (selectedAppointment?.id) {
      success = await updateAppointment(selectedAppointment.id, payload);
    } else {
      success = await createAppointment(payload);
    }

    if (success) {
      handleClose();
    }
  };

  const handleDelete = async () => {
    if (!selectedAppointment?.id) return;

    const success = await deleteAppointment(selectedAppointment.id);

    if (success) {
      handleClose();
    }
  };

  return (
    <form className="p-6 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
      <PatientSelector control={form.control} selectedAppointment={selectedAppointment} />
      <DateTimeSelector control={form.control} />
      <ToggleGroupField
        name="treatment_type"
        control={form.control}
        label="Tipo de tratamiento"
        options={[
          { value: "scheduled", label: "Consulta"},
          { value: "completed", label: "Análisis"},
          { value: "cancelled", label: "Tratamiento"},
        ]}
      />
      <ToggleGroupField
        name="priority"
        control={form.control}
        label="Prioridad"
        options={[
          { value: "low", label: "Baja"},
          { value: "medium", label: "Media"},
          { value: "high", label: "Alta"},
        ]}
      />
      <NotesField control={form.control} />
      <FormActions
        onCancel={handleClose}
        onDelete={handleDelete}
        isEdit={!!selectedAppointment}
        isSubmitting={form.formState.isSubmitting}
      />
    </form>
  );
};

export default AppointmentForm;
