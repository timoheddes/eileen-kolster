import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

function loadFontsCSS() {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/src/styles/fonts.css';
  link.type = 'text/css';
  link.media = 'all';
  document.head.appendChild(link);
}

const win = window as Window & {
  requestIdleCallback?: (cb: () => void) => void;
};
if (typeof win.requestIdleCallback === 'function') {
  win.requestIdleCallback(loadFontsCSS);
} else {
  window.addEventListener('DOMContentLoaded', loadFontsCSS);
}

createRoot(document.getElementById('root')!).render(<App />);
