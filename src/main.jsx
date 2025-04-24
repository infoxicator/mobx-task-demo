import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import MobxQueryApp from './routes/mobx-query';
import MobxApp from './routes/mobx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppUseState from './routes/use-state'
import Navigation from './nav/Navigation.jsx'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { getQueryClient } from './query-client'

export const queryClient = getQueryClient()

ReactDOM.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/mobx-query" element={<MobxQueryApp />} />
          <Route path="/mobx" element={<MobxApp />} />
          <Route path="/use-state" element={<AppUseState />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
  document.getElementById('root')
)
