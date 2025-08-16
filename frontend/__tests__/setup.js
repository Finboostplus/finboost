import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock do ResizeObserver
globalThis.ResizeObserver = class ResizeObserver {
  constructor(cb) {
    this.cb = cb;
  }
  observe() {
    this.cb([{ borderBoxSize: { inlineSize: 0, blockSize: 0 } }], this);
  }
  unobserve() {}
  disconnect() {}
};

// Mock do IntersectionObserver
globalThis.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock do matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Alinha URLSearchParams entre jsdom (window) e Node (undici)
// Corrige erro: "Request constructor: Expected init.body (\"URLSearchParams {}\") to be an instance of URLSearchParams"
if (typeof window !== 'undefined' && window.URLSearchParams) {
  // Use a versão do jsdom para o ambiente global do Node
  // evitando instância de reinos diferentes
  // eslint-disable-next-line no-global-assign
  URLSearchParams = window.URLSearchParams;
  globalThis.URLSearchParams = window.URLSearchParams;
}
