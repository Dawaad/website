import { fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { ResponsiveImage } from "@/src/features/portfolio/lib/config/wallpapers";

import { Crossfade } from "./crossfade";

const webpOnly: ResponsiveImage = {
  webp: [
    { src: "bg/phosphor/original-1280.webp", width: 1280 },
    { src: "bg/phosphor/original-1920.webp", width: 1920 },
  ],
};
const photo: ResponsiveImage = {
  avif: [{ src: "bg/amber/original-640.avif", width: 640 }],
  webp: [{ src: "bg/amber/original-640.webp", width: 640 }],
};

beforeEach(() => {
  vi.stubEnv("NEXT_PUBLIC_CDN_URL", "https://cdn.jtucker.io");
});
afterEach(() => {
  vi.unstubAllEnvs();
});

describe("Crossfade", () => {
  it("renders nothing for a null image (flat scheme)", () => {
    const { container } = render(<Crossfade image={null} sizes="100vw" />);
    expect(container.querySelector("img")).toBeNull();
  });

  it("stages the incoming layer with a webp source and CDN fallback src", () => {
    const { container } = render(<Crossfade image={webpOnly} sizes="100vw" />);
    const webp = container.querySelector('source[type="image/webp"]');
    expect(webp?.getAttribute("srcset")).toBe(
      "https://cdn.jtucker.io/bg/phosphor/original-1280.webp 1280w, " +
        "https://cdn.jtucker.io/bg/phosphor/original-1920.webp 1920w",
    );
    expect(container.querySelector("img")?.getAttribute("src")).toBe(
      "https://cdn.jtucker.io/bg/phosphor/original-1280.webp",
    );
  });

  it("emits an avif source ahead of webp when the image provides one", () => {
    const { container } = render(<Crossfade image={photo} sizes="30vw" />);
    const sources = [...container.querySelectorAll("source")];
    expect(sources.map((s) => s.getAttribute("type"))).toEqual([
      "image/avif",
      "image/webp",
    ]);
  });

  it("keeps the incoming layer hidden until it loads, then reveals it", () => {
    const { container } = render(<Crossfade image={webpOnly} sizes="100vw" />);
    const img = container.querySelector("img")!;
    expect(img.className).toContain("opacity-0");
    fireEvent.load(img);
    expect(img.className).toContain("opacity-100");
  });

  it("drops the layer on load error (graceful fallback to nothing)", () => {
    const { container } = render(<Crossfade image={webpOnly} sizes="100vw" />);
    fireEvent.error(container.querySelector("img")!);
    expect(container.querySelector("img")).toBeNull();
  });
});
