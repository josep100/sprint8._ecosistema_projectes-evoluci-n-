import supabase from "../../../shared/services/supabaseClient";

export const appointmentService = {
  async createAppointment(payload: any) {
    const { error } = await supabase.from("appointments").insert([payload]);

    if (error) {
      console.error("Create error:", error);
      throw new Error(error.message);
    }

    return true;
  },

  async getAppointments() {
    const { data, error } = await supabase
      .from("appointments")
      .select(
        `
        id_appointments,
        id_patient_FK,
        appointment_date,
        notes,
        status,
        priority,
        patients (
          patient_name
        )
      `,
      )
      .order("appointment_date", { ascending: true });

    if (error) {
      console.error("Fetch error:", error);
      throw new Error(error.message);
    }

    return data;
  },

  async updateAppointment(id: number, payload: any) {
    const { error } = await supabase
      .from("appointments")
      .update(payload)
      .eq("id_appointments", id);

    if (error) {
      console.error("Update error:", error);
      throw new Error(error.message);
    }

    return true;
  },

  async deleteAppointment(id: number) {
    const { error } = await supabase
      .from("appointments")
      .delete()
      .eq("id_appointments", id);

    if (error) {
      console.error("Delete error:", error);
      throw new Error(error.message);
    }

    return true;
  },
};

// updateAppointment
// deleteAppointment

// getPatients
// searchPatients
// getPatientById
