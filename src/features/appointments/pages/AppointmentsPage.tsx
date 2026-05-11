import { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import FormDialog from "../../../components/shared/FormDialog";
import AppointmentForm from "../components/AppointmentForm/AppointmentForm";
import CalendarEventContent from "../components/CalendarEventContent";
import CalendarToolbar from "../components/CalendarToolbar";
import { useAppointments } from "../hooks/useAppointments";
import type { AppointmentFormValues } from "../types/appointment.types";
import "../style/calendar.css";

const AppointmentsPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentFormValues | null>(null);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [currentView, setCurrentView] = useState("dayGridMonth");
  const calendarRef = useRef<FullCalendar | null>(null);
  const { events, createAppointment, updateAppointment, deleteAppointment } =
    useAppointments();

  useEffect(() => {
    handleDatesSet();
  }, []);

  const handleDateClick = (info: { date: Date }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (info.date < today) return;

    setSelectedDate(info.date);
    setSelectedAppointment(null);
    setOpen(true);
  };

  const handleEventClick = (info: any) => {
    const event = info.event;

    setSelectedAppointment({
      id: Number(event.id),
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

  const handlePrev = () => {
    calendarRef.current?.getApi().prev();
  };

  const handleNext = () => {
    calendarRef.current?.getApi().next();
  };

  const handleToday = () => {
    calendarRef.current?.getApi().today();
  };

  const handleChangeView = (view: string) => {
    calendarRef.current?.getApi().changeView(view);
  };

  const handleDatesSet = () => {
    const calendarApi = calendarRef.current?.getApi();

    if (!calendarApi) return;

    setTitle(calendarApi.view.title);

    setCurrentView(calendarApi.view.type);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="p-4">
        <CalendarToolbar
          title={title}
          currentView={currentView}
          onPrev={handlePrev}
          onNext={handleNext}
          onToday={handleToday}
          onChangeView={handleChangeView}
        />

        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale={esLocale}
          firstDay={1}
          height="auto"
          events={events}
          headerToolbar={false}
          datesSet={handleDatesSet}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          eventContent={(info) => <CalendarEventContent info={info} />}
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
