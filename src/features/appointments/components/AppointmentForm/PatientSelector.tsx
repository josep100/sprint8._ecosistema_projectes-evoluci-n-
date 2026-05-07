import { useState } from "react";
import { Controller } from "react-hook-form";
import usePatients from "../../../patients/hooks/usePatients";
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxContent,
} from "../../../../components/ui/combobox";
import type {
  AppointmentFormValues,
  SelectedAppointment,
} from "../../types/appointment.types";
import type { Patient } from "../../../patients/types/patient.types";
import { Check } from "lucide-react";
import type { Control } from "react-hook-form";
import clsx from "clsx";

type PatientSelectorProps = {
  control: Control<AppointmentFormValues>;
  selectedAppointment: SelectedAppointment | null;
};

const PatientSelector = ({ control, selectedAppointment }:PatientSelectorProps) => {
  const { patients, searchPatients, loading } = usePatients();

  const [selectedLabel, setSelectedLabel] = useState("");

  return (
    <Controller
      control={control}
      name="patient_id"
      render={({ field }) => (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Paciente</label>

          <Combobox>
            <ComboboxInput
              placeholder="Buscar paciente..."
              value={
                selectedAppointment?.patient_name || selectedLabel ||
                ""
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                setSelectedLabel(value);
                searchPatients(value);
              }}
            />

            <ComboboxContent>
              <ComboboxList>
                {loading && <ComboboxEmpty>Buscando...</ComboboxEmpty>}

                {!loading && patients.length === 0 && (
                  <ComboboxEmpty>No hay resultados</ComboboxEmpty>
                )}

                {patients.map((patient: Patient) => (
                  <ComboboxItem
                    key={patient.id_patient}
                    value={patient.patient_name}
                    onClick={() => {
                      field.onChange(patient.id_patient);
                      setSelectedLabel(patient.patient_name);
                    }}
                  >
                    <Check
                      className={clsx(
                        "mr-2 h-4 w-4",
                        field.value === patient.id_patient
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />

                    {patient.patient_name}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
      )}
    />
  );
};

export default PatientSelector;
