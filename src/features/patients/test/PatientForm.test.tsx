import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PatientForm from "../components/PatientForm";

vi.mock("../../../components/ui/button", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

vi.mock("../../../components/ui/input", () => ({
  Input: (props: any) => <input {...props} />,
}));

vi.mock("../../../components/ui/field", () => ({
  Field: ({ children }: any) => <div>{children}</div>,
  FieldLabel: ({ children }: any) => <label>{children}</label>,
  FieldGroup: ({ children }: any) => <div>{children}</div>,
  FieldError: () => <span>error</span>,
}));

vi.mock("../../../components/ui/select", () => ({
  Select: ({ children, value, onValueChange }: any) => (
    <select value={value} onChange={(e) => onValueChange(e.target.value)}>
      {children}
    </select>
  ),
  SelectContent: ({ children }: any) => <>{children}</>,
  SelectGroup: ({ children }: any) => <>{children}</>,
  SelectItem: ({ value, children }: any) => (
    <option value={value}>{children}</option>
  ),
  SelectTrigger: ({ children }: any) => <>{children}</>,
  SelectValue: () => null,
  SelectLabel: ({ children }: any) => <>{children}</>,
}));

describe("PatientForm", () => {
  const defaultValues = {
    name: "Juan",
    alopeciaType: "Androgénica",
    status: "Active",
    image: null,
  };

  it("should render form with default values", () => {
    render(<PatientForm onSubmit={vi.fn()} defaultValues={defaultValues} />);

    expect(screen.getByDisplayValue("Juan")).toBeInTheDocument();
  });

  it("should show validation error when name is empty", async () => {
    const onSubmit = vi.fn();

    render(<PatientForm onSubmit={onSubmit} buttonText="Enviar" />);

    fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

    await waitFor(() => {
      expect(screen.getAllByText(/error/i).length).toBeGreaterThan(0);
    });

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should update name input value", async () => {
    render(<PatientForm onSubmit={vi.fn()} defaultValues={defaultValues} />);

    const input = screen.getByDisplayValue("Juan");

    fireEvent.change(input, { target: { value: "Pedro" } });

    expect(input).toHaveValue("Pedro");
  });

  it("should change select values", async () => {
    render(<PatientForm onSubmit={vi.fn()} defaultValues={defaultValues} />);

    const selects = screen.getAllByRole("combobox");

    fireEvent.change(selects[0], { target: { value: "Areata" } });
    fireEvent.change(selects[1], { target: { value: "Inactive" } });

    expect(selects[0]).toHaveValue("Areata");
    expect(selects[1]).toHaveValue("Inactive");
  });

  it("should reset form values when clicking reset", async () => {
    render(<PatientForm onSubmit={vi.fn()} defaultValues={defaultValues} />);

    const input = screen.getByDisplayValue("Juan");

    fireEvent.change(input, { target: { value: "Carlos" } });

    fireEvent.click(screen.getByText("Reiniciar"));

    await waitFor(() => {
      expect(input).toHaveValue("Juan");
    });
  });

  it("should reset form when defaultValues change", async () => {
    const { rerender } = render(
      <PatientForm onSubmit={vi.fn()} defaultValues={defaultValues} />,
    );

    const newValues = {
      ...defaultValues,
      name: "Nuevo",
    };

    rerender(<PatientForm onSubmit={vi.fn()} defaultValues={newValues} />);

    await waitFor(() => {
      expect(screen.getByDisplayValue("Nuevo")).toBeInTheDocument();
    });
  });

  it("should use fallback default values when none provided", () => {
    render(<PatientForm onSubmit={vi.fn()} />);

    expect(
      screen.getByPlaceholderText("p.ej. Sergio García"),
    ).toBeInTheDocument();
  });
});
