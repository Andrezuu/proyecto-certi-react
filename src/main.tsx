import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// en src/main.tsx o index.tsx
import 'leaflet/dist/leaflet.css';

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
