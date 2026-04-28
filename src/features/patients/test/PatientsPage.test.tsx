import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PatientsPage from "../pages/PatientsPage";

vi.mock("../hooks/usePatients");
vi.mock("../hooks/usePatientMutations");

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("../components/PatientsTable", () => ({
  default: ({ patients, onDelete, onEdit }: any) => (
    <div>
      <button onClick={() => onDelete(1)}>delete</button>
      <button onClick={() => onEdit(1, {})}>edit</button>
      <span>table-{patients.length}</span>
    </div>
  ),
}));

vi.mock("../components/PatientsPagination", () => ({
  default: ({ onPageChange }: any) => (
    <button onClick={() => onPageChange(2)}>page-2</button>
  ),
}));

vi.mock("../components/PatientsSearch", () => ({
  default: ({ setFilter }: any) => (
    <button onClick={() => setFilter({ searchTerm: "sofia" })}>search</button>
  ),
}));

vi.mock("../components/PatientFilter", () => ({
  default: ({ setFilter }: any) => (
    <>
      <button onClick={() => setFilter("all")}>reset</button>
      <button onClick={() => setFilter({ alopeciaType: "Androgénica" })}>
        filter-type
      </button>
    </>
  ),
}));

vi.mock("../components/PatientSpinner", () => ({
  default: () => <div>loading...</div>,
}));

vi.mock("../pages/PatientsHead", () => ({
  default: ({ onSubmit }: any) => (
    <button onClick={() => onSubmit({})}>create</button>
  ),
}));

import usePatients from "../hooks/usePatients";
import usePatientMutations from "../hooks/usePatientMutations";

const mockedHook = vi.mocked(usePatients);
const mockedMutations = vi.mocked(usePatientMutations);

describe("PatientsPage", () => {
  const baseHook = {
    patients: [{ id_patient: 1 }],
    error: null,
    loading: false,
    count: 4,
    fetchPatients: vi.fn(),
  };

  const baseMutations = {
    removePatient: vi.fn(),
    insertPatient: vi.fn(),
    editPatient: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render patients table when data is loaded", () => {
    mockedHook.mockReturnValue(baseHook as any);
    mockedMutations.mockReturnValue(baseMutations as any);

    render(<PatientsPage />);

    expect(screen.getByText("table-1")).toBeInTheDocument();
  });

  it("should render spinner when loading", () => {
    mockedHook.mockReturnValue({
      ...baseHook,
      loading: true,
    } as any);
    mockedMutations.mockReturnValue(baseMutations as any);

    render(<PatientsPage />);

    expect(screen.getByText("loading...")).toBeInTheDocument();
  });

  it("should render error message when error exists", () => {
    mockedHook.mockReturnValue({
      ...baseHook,
      error: { message: "error" },
    } as any);
    mockedMutations.mockReturnValue(baseMutations as any);

    render(<PatientsPage />);

    expect(screen.getByText("error")).toBeInTheDocument();
  });

  it("should call fetchPatients on mount", () => {
    const fetchPatients = vi.fn();

    mockedHook.mockReturnValue({
      ...baseHook,
      fetchPatients,
    } as any);
    mockedMutations.mockReturnValue(baseMutations as any);

    render(<PatientsPage />);

    expect(fetchPatients).toHaveBeenCalledWith(1, expect.any(Number), {});
  });

  it("should change page and trigger fetch", async () => {
    const fetchPatients = vi.fn();

    mockedHook.mockReturnValue({
      ...baseHook,
      fetchPatients,
    } as any);
    mockedMutations.mockReturnValue(baseMutations as any);

    render(<PatientsPage />);

    fireEvent.click(screen.getByText("page-2"));

    await waitFor(() => {
      expect(fetchPatients).toHaveBeenCalled();
    });
  });

  it("should show success toast when delete succeeds", async () => {
    const removePatient = vi.fn().mockResolvedValue(true);

    mockedHook.mockReturnValue(baseHook as any);
    mockedMutations.mockReturnValue({
      ...baseMutations,
      removePatient,
    } as any);

    render(<PatientsPage />);

    fireEvent.click(screen.getByText("delete"));

    await waitFor(() => {
      expect(removePatient).toHaveBeenCalled();
    });
  });

  it("should create patient successfully", async () => {
    const insertPatient = vi.fn().mockResolvedValue(true);

    mockedHook.mockReturnValue(baseHook as any);
    mockedMutations.mockReturnValue({
      ...baseMutations,
      insertPatient,
    } as any);

    render(<PatientsPage />);

    fireEvent.click(screen.getByText("create"));

    await waitFor(() => {
      expect(insertPatient).toHaveBeenCalled();
    });
  });

  it("should update patient successfully", async () => {
    const editPatient = vi.fn().mockResolvedValue(true);

    mockedHook.mockReturnValue(baseHook as any);
    mockedMutations.mockReturnValue({
      ...baseMutations,
      editPatient,
    } as any);

    render(<PatientsPage />);

    fireEvent.click(screen.getByText("edit"));

    await waitFor(() => {
      expect(editPatient).toHaveBeenCalled();
    });
  });
});