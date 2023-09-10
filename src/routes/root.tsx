import { Link, Outlet } from "react-router-dom";
export default function Root() {
    return(
        <div className="flex flex-col h-screen">
            <div className="flex px-8 bg-blue h-[4rem] items-center space-x-[2rem]">
                <div>
                    <Link to={'/'}>
                        <img src='/vite.svg'/>
                    </Link>
                </div>
                <div className="flex space-x-5 text-white text-1xl">
                    <Link className="hover:text-blue-focus" to={'/'}>Vender</Link>
                    <Link className="hover:text-blue-focus" to={'/inventario'}>Inventario</Link>
                    <Link className="hover:text-blue-focus" to={'/'}>Ventas</Link>
                    <Link className="hover:text-blue-focus" to={'/'}>Perdidas</Link>
                    <Link className="hover:text-blue-focus" to={'/'}>Pronóstico</Link>
                </div>
            </div>
            <div className=" bg-background w-full h-full">
                <div className="px-5 py-[4rem]">
                <Outlet/>
                </div>
            </div>
        </div>
    )
}