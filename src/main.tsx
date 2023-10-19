import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Root from './routes/root.tsx'
import ErrorPage from './error-page.tsx'
import { Inventario } from './routes/inventario.tsx'
import { Vender } from './routes/vender.tsx'
import { Ventas } from './routes/ventas.tsx'
import { Perdidas } from './routes/perdidas.tsx'
import { Pronostico } from './routes/pronostico.tsx'
import { PaginaPronostico } from './routes/pagina_pronostico.tsx'
import { PaginaHistorial } from './routes/pagina_historial.tsx'


const router = createBrowserRouter([
  {
    path:'/',
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children:[
      {
        path: "/",
        element: <Vender/>,
      },
      {
        path: "/pagina-historial",
        element: <PaginaHistorial/>
      },
      {
        path: "/inventario",
        element: <Inventario/>,
      },
      {
        path: "/vender",
        element: <Vender />
      },
      {
        path: "/ventas",
        element: <Ventas />
      },{
        path: "/perdidas",
        element: <Perdidas />
      },{
        path: "/pronostico",
        element: <Pronostico />
      },{
        path: "/pagina-pronostico",
        element: <PaginaPronostico />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
