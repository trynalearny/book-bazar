import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './routers/router.jsx'
import {Provider} from 'react-redux'
import {store} from './redux/store.js'
import 'sweetalert2/dist/sweetalert2.js'
import { ThemeProvider } from "./context/ThemeContext.jsx"; // Import Theme Context

createRoot(document.getElementById('root')).render(
 
    <StrictMode>
      <Provider store={store}>
        <ThemeProvider> 
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </StrictMode>
  
)
