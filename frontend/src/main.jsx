import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./style/miscellaneous.css"
import { RouterProvider } from 'react-router'
import router from './router.jsx'
import { AuthProvider } from '../contexts/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider >  {/*   what AuthProvider does?  = see below */}
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)


/*
  actually it provides logged-in user details to pages which require
  go to context/AuthProvider.jsx and you will know more about it
*/