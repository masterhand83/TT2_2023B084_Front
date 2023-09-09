import { Link, Outlet } from "react-router-dom";
export default function Root() {
    return(
        <>
            <div className="flex px-8 bg-blue h-[4rem] items-center space-x-[2rem]">
                <div>
                    <img src='/vite.svg'/>
                </div>
                <div className="flex space-x-5 text-white text-1xl">
                    <Link className="hover:text-blue-focus" to={'/'}>Vender</Link>
                    <Link className="hover:text-blue-focus" to={'/'}>Inventario</Link>
                    <Link className="hover:text-blue-focus" to={'/'}>Ventas</Link>
                    <Link className="hover:text-blue-focus" to={'/'}>Perdidas</Link>
                    <Link className="hover:text-blue-focus" to={'/'}>Pronóstico</Link>
                </div>
            </div>
            <div>
                <Outlet/>
            </div>
        </>
    )
}