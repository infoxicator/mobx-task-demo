import { scan } from "react-scan"; // must be imported before React and React DOM
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppUseState from './use-state/AppUseState'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { getQueryClient } from './query-client'
scan({
  enabled: true,
});

export const queryClient = getQueryClient()


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}>
      <App />
     <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
