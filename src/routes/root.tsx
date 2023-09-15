import { Link, NavLink, Outlet } from 'react-router-dom';
const activeRouteClasses = 'text-white';
const changeIfActive = (props: { isActive: boolean; isPending: boolean }) =>
  props.isActive ? activeRouteClasses : 'hover:text-white';
export default function Root() {
  return (
    <div className="flex flex-col bg-red-500 h-screen w-screen">
      <div className="flex px-8 bg-blue-500 h-[8%] items-center space-x-[2rem]">
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
          <NavLink to={'/'} className={changeIfActive}>
            Ventas
          </NavLink>
          <NavLink to={'/'} className={changeIfActive}>
            Perdidas
          </NavLink>
          <NavLink to={'/'} className={changeIfActive}>
            Pronóstico
          </NavLink>
        </div>
      </div>
      <div className="w-full h-[92%] bg-yellow-300">
        <Outlet />
      </div>
    </div>
  );
}
