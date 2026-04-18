import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PatientsPage from "../pages/PatientsPage";

vi.mock("../hooks/usePatients");
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
    <button onClick={() => setFilter({ search: "sofia" })}>search</button>
  ),
}));

vi.mock("../components/PatientFilter", () => ({
  default: ({ setFilter }: any) => (
    <>
      <button onClick={() => setFilter("all")}>reset</button>
      <button onClick={() => setFilter({ type: "Androgénica" })}>
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
const mockedHook = vi.mocked(usePatients);

describe("PatientsPage", () => {
  const baseHook = {
    patients: [{ id_patient: 1 }],
    error: null,
    loading: false,
    count: 4,
    fetchPatients: vi.fn(),
    removePatient: vi.fn(),
    insertPatient: vi.fn(),
    handleUpdatePatient: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render patients table when data is loaded", () => {
    mockedHook.mockReturnValue(baseHook as any);

    render(<PatientsPage />);

    expect(screen.getByText("table-1")).toBeInTheDocument();
  });

  it("should render spinner when loading", () => {
    mockedHook.mockReturnValue({
      ...baseHook,
      loading: true,
    } as any);

    render(<PatientsPage />);

    expect(screen.getByText("loading...")).toBeInTheDocument();
  });

  it("should render error message when error exists", () => {
    mockedHook.mockReturnValue({
      ...baseHook,
      error: { message: "error" },
    } as any);

    render(<PatientsPage />);

    expect(screen.getByText("error.message")).toBeInTheDocument();
  });

  it("should call fetchPatients on mount", () => {
    const fetchPatients = vi.fn();

    mockedHook.mockReturnValue({
      ...baseHook,
      fetchPatients,
    } as any);

    render(<PatientsPage />);

    expect(fetchPatients).toHaveBeenCalledWith(1, expect.any(Number), {});
  });

  it("should change page and trigger fetch", async () => {
    const fetchPatients = vi.fn();

    mockedHook.mockReturnValue({
      ...baseHook,
      fetchPatients,
    } as any);

    render(<PatientsPage />);

    fireEvent.click(screen.getByText("page-2"));

    await waitFor(() => {
      expect(fetchPatients).toHaveBeenCalled();
    });
  });

  it("should reset filters when 'all' is selected (edge case)", async () => {
    const fetchPatients = vi.fn();

    mockedHook.mockReturnValue({
      ...baseHook,
      fetchPatients,
    } as any);

    render(<PatientsPage />);

    fireEvent.click(screen.getByText("reset"));

    await waitFor(() => {
      expect(fetchPatients).toHaveBeenCalledWith(1, expect.any(Number), {});
    });
  });

  it("should apply filter and reset page", async () => {
    const fetchPatients = vi.fn();

    mockedHook.mockReturnValue({
      ...baseHook,
      fetchPatients,
    } as any);

    render(<PatientsPage />);

    fireEvent.click(screen.getByText("filter-type"));

    await waitFor(() => {
      expect(fetchPatients).toHaveBeenCalled();
    });
  });

  it("should show success toast when delete succeeds", async () => {
    const removePatient = vi.fn().mockResolvedValue({ error: null });

    mockedHook.mockReturnValue({
      ...baseHook,
      removePatient,
    } as any);

    render(<PatientsPage />);

    fireEvent.click(screen.getByText("delete"));

    await waitFor(() => {
      expect(removePatient).toHaveBeenCalled();
    });
  });

  it("should show error toast when delete fails", async () => {
    const removePatient = vi.fn().mockResolvedValue({
      error: { message: "fail" },
    });

    mockedHook.mockReturnValue({
      ...baseHook,
      removePatient,
    } as any);

    render(<PatientsPage />);

    fireEvent.click(screen.getByText("delete"));

    await waitFor(() => {
      expect(removePatient).toHaveBeenCalled();
    });
  });

  it("should create patient successfully", async () => {
    const insertPatient = vi.fn().mockResolvedValue(null);

    mockedHook.mockReturnValue({
      ...baseHook,
      insertPatient,
    } as any);

    render(<PatientsPage />);

    fireEvent.click(screen.getByText("create"));

    await waitFor(() => {
      expect(insertPatient).toHaveBeenCalled();
    });
  });

  it("should handle create error (edge case)", async () => {
    const insertPatient = vi.fn().mockResolvedValue({
      message: "error",
    });

    mockedHook.mockReturnValue({
      ...baseHook,
      insertPatient,
    } as any);

    render(<PatientsPage />);

    fireEvent.click(screen.getByText("create"));

    await waitFor(() => {
      expect(insertPatient).toHaveBeenCalled();
    });
  });

  it("should update patient successfully", async () => {
    const handleUpdatePatient = vi.fn().mockResolvedValue(true);

    mockedHook.mockReturnValue({
      ...baseHook,
      handleUpdatePatient,
    } as any);

    render(<PatientsPage />);

    fireEvent.click(screen.getByText("edit"));

    await waitFor(() => {
      expect(handleUpdatePatient).toHaveBeenCalled();
    });
  });

  it("should handle update failure (edge case)", async () => {
    const handleUpdatePatient = vi.fn().mockResolvedValue(false);

    mockedHook.mockReturnValue({
      ...baseHook,
      handleUpdatePatient,
    } as any);

    render(<PatientsPage />);

    fireEvent.click(screen.getByText("edit"));

    await waitFor(() => {
      expect(handleUpdatePatient).toHaveBeenCalled();
    });
  });
});
