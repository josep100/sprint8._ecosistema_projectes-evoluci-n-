import { describe, it, expect, vi, beforeEach } from "vitest";
import supabase from "../../../shared/services/supabaseClient";
import {
  getPatients,
  deletePatient,
  createPatient,
  updatePatient,
} from "../services/patients.service";
import * as mapper from "../utils/patient.mapper";

const chain = {
  select: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  order: vi.fn().mockReturnThis(),
  ilike: vi.fn().mockReturnThis(),
  range: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  then: vi.fn(),
};

vi.mock("../../../shared/services/supabaseClient", () => ({
  default: {
    from: vi.fn(() => chain),
  },
}));

describe("patients.service", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    chain.then = vi.fn((resolve) =>
      resolve({ data: [], error: null, count: 0 }),
    );
  });

  describe("getPatients", () => {
    it("should fetch patients without filters", async () => {
      await getPatients({});

      expect(supabase.from).toHaveBeenCalledWith("patients");
      expect(chain.select).toHaveBeenCalled();
      expect(chain.order).toHaveBeenCalled();
    });

    it("should apply type filter when provided", async () => {
      await getPatients({ alopeciaType: "Androgénica" });

      expect(chain.eq).toHaveBeenCalledWith("alopecia_type", "Androgénica");
    });

    it("should not apply type filter when type is 'all'", async () => {
      await getPatients({ alopeciaType: "all" });

      expect(chain.eq).not.toHaveBeenCalledWith("alopecia_type", "all");
    });

    it("should apply status filter when provided", async () => {
      await getPatients({ status: "Active" });

      expect(chain.eq).toHaveBeenCalledWith("status", "Active");
    });

    it("should apply search filter using ilike", async () => {
      await getPatients({ search: "sofia" });

      expect(chain.ilike).toHaveBeenCalledWith("patient_name", "%sofia%");
    });

    it("should not apply search when empty string", async () => {
      await getPatients({ search: "   " });

      expect(chain.ilike).not.toHaveBeenCalled();
    });

    it("should apply pagination correctly", async () => {
      await getPatients({ page: 2, perPage: 4 });

      expect(chain.range).toHaveBeenCalledWith(4, 7);
    });
  });

  describe("deletePatient", () => {
    it("should delete a patient by id", async () => {
      await deletePatient(1);

      expect(chain.delete).toHaveBeenCalled();
      expect(chain.eq).toHaveBeenCalledWith("id_patient", 1);
    });
  });

  describe("createPatient", () => {
    it("should insert a new patient", async () => {
      await createPatient({
        name: "Juan",
        image: null,
        alopeciaType: "Androgénica",
        status: "Active",
      });

      expect(chain.insert).toHaveBeenCalledWith(
        expect.objectContaining({
          patient_name: "Juan",
          alopecia_type: "Androgénica",
          status: "Active",
          doctor_auth_uid: expect.any(String),
          id_clinics_FK: 4,
        }),
      );
    });

    it("should set patient_image to null when undefined", async () => {
      await createPatient({
        name: "Juan",
        image: undefined,
        alopeciaType: "Androgénica",
        status: "Active",
      });

      expect(chain.insert).toHaveBeenCalledWith(
        expect.objectContaining({
          patient_image: null,
        }),
      );
    });
  });

  describe("updatePatient", () => {
    it("should update a patient using mapped data", async () => {
      vi.spyOn(mapper, "mapFormToPatient").mockReturnValue({ mocked: true });

      await updatePatient(
        {
          name: "Juan",
          image: null,
          alopeciaType: "Androgénica",
          status: "Active",
        },
        1,
      );

      expect(chain.update).toHaveBeenCalledWith({ mocked: true });
      expect(chain.eq).toHaveBeenCalledWith("id_patient", 1);
    });
  });
});
