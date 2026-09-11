import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout/index.jsx'
import Login from './pages/Login/index.jsx'
import Dashboard from './pages/Dashboard/index.jsx'
import Profile from './pages/Profile/index.jsx'
import Error from './pages/Error/index.jsx'
import Provider from './context/Provider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='*' element={<Error />} />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)