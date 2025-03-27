import { scan } from "react-scan"; // must be imported before React and React DOM
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppUseState from './use-state/AppUseState'
scan({
  enabled: true,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppUseState />
  </StrictMode>,
)
