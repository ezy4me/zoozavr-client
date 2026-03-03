import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRouter } from './app/router'
import './index.css' // Твой навороченный CSS должен быть здесь

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
)