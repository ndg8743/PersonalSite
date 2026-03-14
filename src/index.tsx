// Entry point — mounts the React app into the DOM's #root element.
import { App } from 'App/App';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');

if (!rootElement) throw new Error('Failed to get the root element.');

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
