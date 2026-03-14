// Mock for window.matchMedia — jsdom doesn't support matchMedia, so this stub
// prevents errors when App.tsx checks for mobile devices during tests.
Object.defineProperty(window, 'matchMedia', {
  value: (query: string) => ({
    addEventListener: jest.fn(),
    addListener: jest.fn(), // deprecated
    dispatchEvent: jest.fn(),
    matches: false,
    media: query,
    onchange: null,
    removeEventListener: jest.fn(),
    removeListener: jest.fn(), // deprecated
  }),
  writable: true,
});
