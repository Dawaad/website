import { describe, expect, it } from "vitest";

import { DESKTOP_WINDOWS } from "./desktop-windows";

describe("DESKTOP_WINDOWS", () => {
  it("includes the spotify music window", () => {
    const spotify = DESKTOP_WINDOWS.find((w) => w.id === "spotify");
    expect(spotify).toEqual({
      id: "spotify",
      title: "spotify — music",
      label: "music",
      mnemonic: "cm",
      icon: "/icons/spotify.svg",
      tint: "#1ed760",
    });
  });

  it("has unique ids and mnemonics across all windows", () => {
    const ids = DESKTOP_WINDOWS.map((w) => w.id);
    const mnemonics = DESKTOP_WINDOWS.map((w) => w.mnemonic);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(mnemonics).size).toBe(mnemonics.length);
  });

  it("uses a two-character mnemonic for every window", () => {
    for (const w of DESKTOP_WINDOWS) expect(w.mnemonic).toHaveLength(2);
  });
});
