import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DESKTOP_WINDOWS } from "@/src/features/portfolio/lib/config/desktop-windows";
import { WindowManagerProvider } from "@/src/features/portfolio/providers/window-manager-provider";

import { DesktopDock } from "./desktop-dock";

const renderDock = () =>
  render(
    <WindowManagerProvider>
      <DesktopDock visible />
    </WindowManagerProvider>,
  );

describe("DesktopDock", () => {
  it("renders one tile per managed window, all running by default", () => {
    renderDock();
    const tiles = screen.getAllByRole("button");
    expect(tiles).toHaveLength(DESKTOP_WINDOWS.length);
    for (const tile of tiles)
      expect(tile).toHaveAttribute("aria-pressed", "true");
  });

  it("exposes a control for the spotify music window and toggles it", () => {
    renderDock();
    const spotify = screen.getByRole("button", { name: "cm" });
    expect(spotify).toHaveAttribute("aria-pressed", "true");
    expect(spotify).toHaveAttribute("title", "music — hide");

    fireEvent.click(spotify);
    expect(spotify).toHaveAttribute("aria-pressed", "false");
    expect(spotify).toHaveAttribute("title", "music — show");
  });
});
