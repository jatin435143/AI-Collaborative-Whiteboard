/**
 * App entry point — mounts React to the DOM.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '@excalidraw/excalidraw/index.css';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <App />,
);

