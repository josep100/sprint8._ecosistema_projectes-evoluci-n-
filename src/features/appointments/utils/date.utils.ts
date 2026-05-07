export const buildAppointmentDate = (date: Date, time: string) => {
  const [hours, minutes] = time.split(":");
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const utcDate = new Date(
    Date.UTC(
      year,
      month,
      day,
      Number(hours),
      Number(minutes),
      0,
    ),
  );

  return utcDate.toISOString();
};

export const formatTime = (date: string) => {
  return new Date(date).toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const mapAppointmentsToEvents = (appointments: any[]) => {
  return appointments.map((appt) => ({
    id: appt.id_appointments,
    title: appt.patients.patient_name,
    start: appt.appointment_date,
    extendedProps: {
      patient_id: appt.id_patient_FK,
      patient_name: appt.patients.patient_name,
      treatment_type: appt.status,
      priority: appt.priority,
      notes: appt.notes,
    },
  }));
};
