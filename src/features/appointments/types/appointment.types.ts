export type AppointmentFormValues = {
  id: number;
  patient_id: number;
  patient_name: string;
  appointment_date: Date;
  time: string;
  treatment_type: "scheduled" | "completed" | "cancelled";
  priority: "low" | "medium" | "high";
  notes: string;
};


export type SelectedAppointment = {
  id: number;
  patient_id: number;
  patient_name: string;
  appointment_date: Date;
  time: string;
  treatment_type: "scheduled" | "completed" | "cancelled";
  priority: "low" | "medium" | "high";
  notes: string;
};

export type AppointmentPayload = {
  id_patient_FK: number;
  appointment_date: string;
  status: "scheduled" | "completed" | "cancelled";
  priority: "low" | "medium" | "high";
  notes: string;
};
export type AppointmentFormProps = {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  setOpen: (open: boolean) => void;
  selectedAppointment: SelectedAppointment | null;
  createAppointment: (data: AppointmentPayload) => Promise<boolean>;
  updateAppointment: (id: number, data: AppointmentPayload) => Promise<boolean>;
  deleteAppointment: (id: number) => Promise<boolean>;
};

export type FormActionsProps = {
  onCancel: () => void;
  onDelete: () => void;
  isEdit: boolean;
  isSubmitting: boolean;
};

export type Patient = {
  id_patient: number;
  patient_name: string;
};

export type CalendarEvent = {
  id: string;
  title: string;
  start: Date;
  extendedProps: {
    patient_id: number;
    patient_name: string;
    treatment_type: "scheduled" | "completed" | "cancelled";
    priority: "low" | "medium" | "high";
    notes: string;
  };
};
