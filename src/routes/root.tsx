import { Link, NavLink, Outlet } from 'react-router-dom';
import{createTheme, ThemeProvider} from '@mui/material/styles';
import { esES } from '@mui/material/locale'

const theme = createTheme({
}, esES);
const activeRouteClasses = 'text-white';
const changeIfActive = (props: { isActive: boolean; isPending: boolean }) =>
  props.isActive ? activeRouteClasses : 'hover:text-white';
export default function Root() {
  return (
    <div className="flex flex-col h-screen w-screen bg-slate-50">
      <div className="flex px-8 bg-blue-500 h-[8%] items-center space-x-[2rem] shadow-lg">
        <div>
          <Link to={'/'}>
            <img src="/vite.svg" />
          </Link>
        </div>
        <div className="flex space-x-5 text-gray text-[1rem]">
          <NavLink to={'/vender'} className={changeIfActive}>
            Vender
          </NavLink>
          <NavLink to={'/inventario'} className={changeIfActive}>
            Inventario
          </NavLink>
          <NavLink to={'/ventas'} className={changeIfActive}>
            Ventas
          </NavLink>
          <NavLink to={'/perdidas'} className={changeIfActive}>
            Perdidas
          </NavLink>
          <NavLink to={'/pronostico'} className={changeIfActive}>
            Pronóstico
          </NavLink>
        </div>
      </div>
      <div className="w-full h-[92%] ">
        <ThemeProvider theme={theme}>
        <Outlet />
        </ThemeProvider>
      </div>
    </div>
  );
}
