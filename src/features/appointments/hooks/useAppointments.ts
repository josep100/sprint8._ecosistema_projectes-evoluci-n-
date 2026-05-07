import { useEffect, useState } from "react";
import { appointmentService } from "../services/appointment.service";
import { mapAppointmentsToEvents } from "../utils/date.utils";
import type {
  AppointmentPayload,
  CalendarEvent,
} from "../types/appointment.types";

export const useAppointments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await appointmentService.getAppointments();
      const mapped = mapAppointmentsToEvents(data);

      setEvents(mapped);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createAppointment = async (formData: AppointmentPayload) => {
    try {
      setLoading(true);
      setError(null);

      await appointmentService.createAppointment(formData);

      await fetchAppointments(); 
      return true;
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateAppointment = async (id: number, formData: AppointmentPayload) => {
    try {
      setLoading(true);
      setError(null);

      await appointmentService.updateAppointment(id, formData);

      await fetchAppointments(); 
      return true;
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteAppointment = async (id: number) => {
    try {
      setLoading(true);
      setError(null);

      await appointmentService.deleteAppointment(id);

      await fetchAppointments(); 
      return true;
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return {
    createAppointment,
    updateAppointment,
    deleteAppointment,
    fetchAppointments,
    loading,
    error,
    events,
  };
};
