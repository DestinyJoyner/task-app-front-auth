import React from 'react'
import ReactDOM from 'react-dom/client'
import AuthProvider from './Providers/AuthProvider.jsx'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
      
    </Router>
  </React.StrictMode>,
)
