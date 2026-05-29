import '@testing-library/jest-dom/vitest';

// jsdom lacks ResizeObserver, which TerminalScroll (rendered inside every Panel)
// constructs on mount. A no-op stub is enough for component tests.
if (!('ResizeObserver' in globalThis)) {
  class ResizeObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  globalThis.ResizeObserver = ResizeObserverStub as unknown as typeof ResizeObserver;
}
