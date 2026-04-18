import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PatientDialog from "../components/PatientDialog";

vi.mock("../components/PatientForm", () => ({
  default: ({ onSubmit }: any) => (
    <button onClick={() => onSubmit({ name: "test" })}>submit-form</button>
  ),
}));

vi.mock("../../../components/ui/dialog", () => {
  return {
    Dialog: ({ children }: any) => <div>{children}</div>,
    DialogTrigger: ({ children }: any) => <div>{children}</div>,
    DialogContent: ({ children }: any) => <div>{children}</div>,
    DialogHeader: ({ children }: any) => <div>{children}</div>,
    DialogTitle: ({ children }: any) => <h1>{children}</h1>,
    DialogDescription: ({ children }: any) => <p>{children}</p>,
  };
});

describe("PatientDialog", () => {
  const baseProps = {
    title: "Test Title",
    description: "Test Description",
    defaultValues: {},
  };

  it("should render title, description and children", () => {
    render(
      <PatientDialog {...baseProps} onSubmit={vi.fn()}>
        <button>open</button>
      </PatientDialog>,
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("open")).toBeInTheDocument();
  });

  it("should call onSubmit and close dialog when success is true", async () => {
    const onSubmit = vi.fn().mockResolvedValue(true);

    render(
      <PatientDialog {...baseProps} onSubmit={onSubmit}>
        <button>open</button>
      </PatientDialog>,
    );

    fireEvent.click(screen.getByText("submit-form"));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ name: "test" });
    });
  });

  it("should not close dialog when onSubmit returns false", async () => {
    const onSubmit = vi.fn().mockResolvedValue(false);

    render(
      <PatientDialog {...baseProps} onSubmit={onSubmit}>
        <button>open</button>
      </PatientDialog>,
    );

    fireEvent.click(screen.getByText("submit-form"));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });

  it("should handle rejected promise from onSubmit (edge case)", async () => {
    const onSubmit = vi.fn().mockRejectedValue(new Error("fail"));

    render(
      <PatientDialog {...baseProps} onSubmit={onSubmit}>
        <button>open</button>
      </PatientDialog>,
    );

    fireEvent.click(screen.getByText("submit-form"));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});
