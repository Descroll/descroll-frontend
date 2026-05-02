import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './components/auth/AuthContext.jsx';
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './components/ui/ThemeContext.jsx';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </AuthProvider>,
)
