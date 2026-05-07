import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from "@fullcalendar/core/locales/es";
import FormDialog from "../../../components/shared/FormDialog";
import interactionPlugin from "@fullcalendar/interaction";
import AppointmentForm from "../components/AppointmentForm/AppointmentForm";
import { useAppointments } from "../hooks/useAppointments";
import CalendarEventContent from "../components/CalendarEventContent";
import type { AppointmentFormValues } from "../types/appointment.types";



const AppointmentsPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentFormValues | null>(null);
  const [open, setOpen] = useState(false);
  const { events, createAppointment, updateAppointment, deleteAppointment } = useAppointments();

  const handleDateClick = (info: { date: Date }) => {
    setSelectedDate(info.date);
    setSelectedAppointment(null);
    setOpen(true);
  };

  const handleEventClick = (info: any) => {
    const event = info.event;

    setSelectedAppointment({
      id: event.id,
      patient_id: event.extendedProps.patient_id,
      patient_name: event.title,
      appointment_date: event.start,
      time: event.start?.toTimeString().slice(0, 5),
      treatment_type: event.extendedProps.treatment_type,
      priority: event.extendedProps.priority,
      notes: event.extendedProps.notes,
    });

    setOpen(true);
  };


  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white p-4 rounded-xl border border-slate-200">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          timeZone="local"
          locale={esLocale}
          key={events.length}
          firstDay={1}
          height="auto"
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          displayEventTime={true}
          events={events}
          eventContent={(info) => <CalendarEventContent info={info} />}
          headerToolbar={{
            left: "title prev,next",
            center: "",
            right: "timeGridDay,timeGridWeek,dayGridMonth",
          }}
          buttonText={{
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día",
          }}
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
        />
      </div>

      <FormDialog
        title={selectedAppointment ? "Editar cita" : "Agregar nueva cita"}
        description="Programe una sesión para la evaluación clínica"
        open={open}
        onOpenChange={setOpen}
      >
        <AppointmentForm
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          setOpen={setOpen}
          selectedAppointment={selectedAppointment}
          createAppointment={createAppointment}
          updateAppointment={updateAppointment}
          deleteAppointment={deleteAppointment}
        />
      </FormDialog>
    </div>
  );
};

export default AppointmentsPage;
