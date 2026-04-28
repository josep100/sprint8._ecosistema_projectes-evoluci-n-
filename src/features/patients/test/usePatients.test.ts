import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import usePatients from "../hooks/usePatients";
import * as service from "../services/patients.service";

vi.mock("../services/patients.service");

describe("usePatients hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("fetchPatients", () => {
    it("should fetch patients successfully and update state", async () => {
      vi.mocked(service.getPatients).mockResolvedValue({
        data: [{ id_patient: 1 }],
        error: null,
        count: 1,
      } as any);

      const { result } = renderHook(() => usePatients());

      await act(async () => {
        await result.current.fetchPatients(1, 4);
      });

      expect(result.current.patients).toHaveLength(1);
      expect(result.current.count).toBe(1);
      expect(result.current.error).toBeNull();
      expect(result.current.loading).toBe(false);
    });

    it("should handle backend error response", async () => {
      vi.mocked(service.getPatients).mockResolvedValue({
        data: null,
        error: { message: "DB error" },
        count: 0,
      } as any);

      const { result } = renderHook(() => usePatients());

      await act(async () => {
        await result.current.fetchPatients(1, 4);
      });

      expect(result.current.error).toBeTruthy();
      expect(result.current.patients).toEqual([]);
      expect(result.current.count).toBe(0);
    });

    it("should handle unexpected exception (catch block)", async () => {
      vi.mocked(service.getPatients).mockRejectedValue(new Error("Unexpected"));

      const { result } = renderHook(() => usePatients());

      await act(async () => {
        await result.current.fetchPatients(1, 4);
      });

      expect(result.current.error?.message).toContain("Error inesperado");
      expect(result.current.patients).toEqual([]);
      expect(result.current.count).toBe(0);
    });

    it("should handle empty data response (edge case)", async () => {
      vi.mocked(service.getPatients).mockResolvedValue({
        data: null,
        error: null,
        count: null,
      } as any);

      const { result } = renderHook(() => usePatients());

      await act(async () => {
        await result.current.fetchPatients(1, 4);
      });

      expect(result.current.patients).toEqual([]);
      expect(result.current.count).toBe(0);
    });
  });
});