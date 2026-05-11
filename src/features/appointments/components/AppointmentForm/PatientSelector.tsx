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
import { Check, User } from "lucide-react";
import type { Control } from "react-hook-form";
import clsx from "clsx";

type PatientSelectorProps = {
  control: Control<AppointmentFormValues>;
  selectedAppointment: SelectedAppointment | null;
};

const PatientSelector = ({ control, selectedAppointment }:PatientSelectorProps) => {
  const { patients, searchPatients, loading } = usePatients();

  const [selectedLabel, setSelectedLabel] = useState("");
//273
  return (
    <Controller
      control={control}
      name="patient_id"
      render={({ field }) => (
        <div className=" relative flex flex-col gap-2">
          <label htmlFor="patient" className="text-[10px] font-bold uppercase tracking-widest text-[#475569] block">Paciente</label>
          <User className="absolute left-4.5 top-10 -translate-y-1/2  text-slate-400 size-4 z-10" />
          <Combobox>
            <ComboboxInput
              id="patient"
              className="pl-10 bg-surfacer-container placeholder:text-slate-400!"
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
