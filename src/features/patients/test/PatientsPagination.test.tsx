import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PatientsPagination from "../components/PatientsPagination";

vi.mock("../../../components/ui/pagination", () => ({
  Pagination: ({ children }: any) => <div>{children}</div>,
  PaginationContent: ({ children }: any) => <div>{children}</div>,
  PaginationItem: ({ children }: any) => <div>{children}</div>,
  PaginationPrevious: (props: any) => (
    <button onClick={props.onClick}>prev</button>
  ),
  PaginationNext: (props: any) => <button onClick={props.onClick}>next</button>,
  PaginationLink: ({ children, onClick }: any) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

describe("PatientsPagination", () => {
  it("should render pagination with visible pages", () => {
    render(
      <PatientsPagination
        totalPages={10}
        currentPage={5}
        onPageChange={vi.fn()}
      />,
    );

    expect(screen.getByText("prev")).toBeInTheDocument();
    expect(screen.getByText("next")).toBeInTheDocument();

    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
  });

  it("should call onPageChange with next page", () => {
    const onPageChange = vi.fn();

    render(
      <PatientsPagination
        totalPages={10}
        currentPage={5}
        onPageChange={onPageChange}
      />,
    );

    fireEvent.click(screen.getByText("next"));

    expect(onPageChange).toHaveBeenCalledWith(6);
  });

  it("should call onPageChange with previous page", () => {
    const onPageChange = vi.fn();

    render(
      <PatientsPagination
        totalPages={10}
        currentPage={5}
        onPageChange={onPageChange}
      />,
    );

    fireEvent.click(screen.getByText("prev"));

    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it("should not go below page 1", () => {
    const onPageChange = vi.fn();

    render(
      <PatientsPagination
        totalPages={10}
        currentPage={1}
        onPageChange={onPageChange}
      />,
    );

    fireEvent.click(screen.getByText("prev"));

    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("should not go above totalPages", () => {
    const onPageChange = vi.fn();

    render(
      <PatientsPagination
        totalPages={10}
        currentPage={10}
        onPageChange={onPageChange}
      />,
    );

    fireEvent.click(screen.getByText("next"));

    expect(onPageChange).toHaveBeenCalledWith(10);
  });

  it("should adjust visible pages when near start", () => {
    render(
      <PatientsPagination
        totalPages={10}
        currentPage={2}
        onPageChange={vi.fn()}
      />,
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("should adjust visible pages when near end", () => {
    render(
      <PatientsPagination
        totalPages={10}
        currentPage={9}
        onPageChange={vi.fn()}
      />,
    );

    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("9")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("should call onPageChange when clicking a page number", () => {
    const onPageChange = vi.fn();

    render(
      <PatientsPagination
        totalPages={10}
        currentPage={5}
        onPageChange={onPageChange}
      />,
    );

    fireEvent.click(screen.getByText("4"));

    expect(onPageChange).toHaveBeenCalledWith(4);
  });
});
