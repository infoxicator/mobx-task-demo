import { scan } from "react-scan"; // must be imported before React and React DOM
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import MobxQueryApp from './routes/mobx-query';
import MobxApp from './routes/mobx';
import Zustand from './routes/zustand';
import ContextApiApp from './routes/context-api';
import { BrowserRouter, Routes, Route } from "react-router";
import AppUseState from './routes/use-state'
import Navigation from './nav/Navigation.jsx'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { getQueryClient } from './query-client'
scan({
  enabled: true,
});

export const queryClient = getQueryClient()


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <QueryClientProvider client={queryClient}>
     <Navigation />
     <Routes>
      <Route path="/use-state" element={<AppUseState />} />
      <Route path="/mobx" element={<MobxApp />} />
      <Route path="/mobx-query" element={<MobxQueryApp />} />
      <Route path="/context-api" element={<ContextApiApp />} />
      <Route path="/zustand" element={<Zustand />} />
    </Routes>
     <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
