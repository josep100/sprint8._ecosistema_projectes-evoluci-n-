import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import usePatientMutations from "../hooks/usePatientMutations";

import * as service from "../services/patients.service";

vi.mock("../services/patients.service");

describe("usePatientMutations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockData = {
    name: "Juan",
    image: null,
    alopeciaType: "Androgénica",
    status: "Active",
  };

  describe("removePatient", () => {
    it("should delete patient successfully (happy path)", async () => {
      vi.mocked(service.deletePatient).mockResolvedValue({} as any);

      const { result } = renderHook(() => usePatientMutations());

      let response: boolean;

      await act(async () => {
        response = await result.current.removePatient(1);
      });

      expect(response!).toBe(true);
      expect(service.deletePatient).toHaveBeenCalledWith(1);
      expect(result.current.error).toBeNull();
      expect(result.current.loading).toBe(false);
    });

    it("should handle delete error (catch path)", async () => {
      vi.mocked(service.deletePatient).mockRejectedValue(
        new Error("Delete failed"),
      );

      const { result } = renderHook(() => usePatientMutations());

      let response: boolean;

      await act(async () => {
        response = await result.current.removePatient(1);
      });

      expect(response!).toBe(false);
      expect(result.current.error).toBeTruthy();
      expect(result.current.loading).toBe(false);
    });
  });

  describe("insertPatient", () => {
    it("should insert patient successfully (happy path)", async () => {
      vi.mocked(service.createPatient).mockResolvedValue({} as any);

      const { result } = renderHook(() => usePatientMutations());

      let response: boolean;

      await act(async () => {
        response = await result.current.insertPatient(mockData as any);
      });

      expect(response!).toBe(true);
      expect(service.createPatient).toHaveBeenCalledWith(mockData);
      expect(result.current.error).toBeNull();
    });

    it("should handle insert error (catch path)", async () => {
      vi.mocked(service.createPatient).mockRejectedValue(
        new Error("Insert failed"),
      );

      const { result } = renderHook(() => usePatientMutations());

      let response: boolean;

      await act(async () => {
        response = await result.current.insertPatient(mockData as any);
      });

      expect(response!).toBe(false);
      expect(result.current.error).toBeTruthy();
    });

    it("should reset previous error before new request (edge case)", async () => {
      vi.mocked(service.createPatient)
        .mockRejectedValueOnce(new Error("fail"))
        .mockResolvedValueOnce({} as any);

      const { result } = renderHook(() => usePatientMutations());

      await act(async () => {
        await result.current.insertPatient(mockData as any);
      });

      expect(result.current.error).toBeTruthy();

      await act(async () => {
        await result.current.insertPatient(mockData as any);
      });

      expect(result.current.error).toBeNull();
    });
  });

  describe("editPatient", () => {
    it("should update patient successfully (happy path)", async () => {
      vi.mocked(service.updatePatient).mockResolvedValue({} as any);

      const { result } = renderHook(() => usePatientMutations());

      let response: boolean;

      await act(async () => {
        response = await result.current.editPatient(1, mockData as any);
      });

      expect(response!).toBe(true);
      expect(service.updatePatient).toHaveBeenCalledWith(mockData, 1);
      expect(result.current.error).toBeNull();
    });

    it("should handle update error (catch path)", async () => {
      vi.mocked(service.updatePatient).mockRejectedValue(
        new Error("Update failed"),
      );

      const { result } = renderHook(() => usePatientMutations());

      let response: boolean;

      await act(async () => {
        response = await result.current.editPatient(1, mockData as any);
      });

      expect(response!).toBe(false);
      expect(result.current.error).toBeTruthy();
    });
  });

  describe("loading state", () => {
    it("should set loading true while request is in progress", async () => {
      let resolveFn: any;

      vi.mocked(service.deletePatient).mockImplementation(
        () =>
          new Promise((resolve) => {
            resolveFn = resolve;
          }),
      );

      const { result } = renderHook(() => usePatientMutations());

      act(() => {
        result.current.removePatient(1);
      });

      expect(result.current.loading).toBe(true);

      await act(async () => {
        resolveFn({});
      });

      expect(result.current.loading).toBe(false);
    });
  });
});
