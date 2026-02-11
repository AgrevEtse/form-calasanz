import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import GlobalStateProvider from '@/context/GlobalStateProvider'
import '@/index.css'
import App from '@/App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStateProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GlobalStateProvider>
  </StrictMode>
)
