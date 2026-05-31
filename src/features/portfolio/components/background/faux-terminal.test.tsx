import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { FauxTerminal } from "./faux-terminal";

const root = (container: HTMLElement) =>
  container.firstChild as HTMLElement | null;

describe("FauxTerminal", () => {
  it("renders the window with its title when open (the default)", () => {
    render(<FauxTerminal title="spotify — music">body</FauxTerminal>);
    expect(screen.getByText("spotify — music")).toBeInTheDocument();
  });

  it("renders nothing when initially closed", () => {
    const { container } = render(
      <FauxTerminal title="spotify — music" open={false}>
        body
      </FauxTerminal>,
    );
    expect(root(container)).toBeNull();
  });

  it("animates in (fades + scales up) when opened", async () => {
    const { container, rerender } = render(
      <FauxTerminal title="t" open={false}>
        body
      </FauxTerminal>,
    );
    rerender(
      <FauxTerminal title="t" open>
        body
      </FauxTerminal>,
    );
    await waitFor(() => {
      expect(root(container)?.className).toContain("opacity-100");
      expect(root(container)?.className).toContain("scale-100");
    });
  });

  it("fades + scales out on close, then unmounts when the transition ends", async () => {
    const { container, rerender } = render(
      <FauxTerminal title="t">body</FauxTerminal>,
    );
    expect(root(container)).not.toBeNull();

    rerender(
      <FauxTerminal title="t" open={false}>
        body
      </FauxTerminal>,
    );
    // Mid-exit: still mounted, now showing the faded/scaled-down state.
    await waitFor(() => {
      expect(root(container)?.className).toContain("opacity-0");
      expect(root(container)?.className).toContain("scale-95");
    });
    expect(screen.getByText("body")).toBeInTheDocument();

    // Transition end drops it from the DOM (so a reopen replays the intro).
    fireEvent.transitionEnd(root(container)!);
    expect(root(container)).toBeNull();
  });

  it("remounts its content when reopened after a full close", async () => {
    const { container, rerender } = render(
      <FauxTerminal title="t">body</FauxTerminal>,
    );
    rerender(
      <FauxTerminal title="t" open={false}>
        body
      </FauxTerminal>,
    );
    await waitFor(() =>
      expect(root(container)?.className).toContain("opacity-0"),
    );
    fireEvent.transitionEnd(root(container)!);
    expect(root(container)).toBeNull();

    rerender(<FauxTerminal title="t">body</FauxTerminal>);
    expect(screen.getByText("body")).toBeInTheDocument();
  });

  it("cancels the exit and stays mounted+visible when reopened mid-close", async () => {
    const { container, rerender } = render(
      <FauxTerminal title="t">body</FauxTerminal>,
    );
    // Begin closing.
    rerender(
      <FauxTerminal title="t" open={false}>
        body
      </FauxTerminal>,
    );
    await waitFor(() =>
      expect(root(container)?.className).toContain("opacity-0"),
    );

    // Reopen before the exit finishes — must remain mounted and animate back in.
    rerender(<FauxTerminal title="t">body</FauxTerminal>);
    await waitFor(() =>
      expect(root(container)?.className).toContain("opacity-100"),
    );
    expect(root(container)).not.toBeNull();
    expect(screen.getByText("body")).toBeInTheDocument();
  });

  it("stays mounted when a stale exit callback fires after reopen (no stuck state)", async () => {
    const { container, rerender } = render(
      <FauxTerminal title="t">body</FauxTerminal>,
    );
    rerender(
      <FauxTerminal title="t" open={false}>
        body
      </FauxTerminal>,
    );
    await waitFor(() =>
      expect(root(container)?.className).toContain("opacity-0"),
    );

    // Reopen, then let the *earlier* close transition end late: open wins, so the
    // window must remain mounted and never get stranded invisible.
    rerender(<FauxTerminal title="t">body</FauxTerminal>);
    fireEvent.transitionEnd(root(container)!);
    expect(root(container)).not.toBeNull();
    await waitFor(() =>
      expect(root(container)?.className).toContain("opacity-100"),
    );
  });

  it("ignores transitionend bubbling up from a child", () => {
    const { container, rerender } = render(
      <FauxTerminal title="t">
        <div data-testid="child">body</div>
      </FauxTerminal>,
    );
    rerender(
      <FauxTerminal title="t" open={false}>
        <div data-testid="child">body</div>
      </FauxTerminal>,
    );
    // A child finishing its own transition must not unmount the window.
    fireEvent.transitionEnd(screen.getByTestId("child"));
    expect(root(container)).not.toBeNull();
  });

  it("fires onClose when the red control is clicked", () => {
    const onClose = vi.fn();
    render(
      <FauxTerminal title="t" onClose={onClose}>
        body
      </FauxTerminal>,
    );
    fireEvent.click(screen.getByRole("button", { name: /close t/i }));
    expect(onClose).toHaveBeenCalledOnce();
  });
});
