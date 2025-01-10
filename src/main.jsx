import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
 import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routers'
import { Toaster } from 'react-hot-toast'
import LanguageProvider from './providers/LanguageProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <LanguageProvider>
     <Toaster
       position="top-center"
       reverseOrder={false}
       gutter={8}
       containerClassName=""
       containerStyle={{}}
       toastOptions={{
          className: '',
         duration: 5000,
         }}
     />
    <RouterProvider router={router} />
     </LanguageProvider>
   </React.StrictMode>,
)
