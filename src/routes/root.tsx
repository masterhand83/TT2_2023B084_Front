import { Link, NavLink, Outlet } from 'react-router-dom';
import{createTheme, ThemeProvider} from '@mui/material/styles';
import { esES } from '@mui/material/locale'
import NavBar from '../components/utils/NavBar';

const theme = createTheme({
}, esES);
const activeRouteClasses = 'text-white';
const changeIfActive = (props: { isActive: boolean; isPending: boolean }) =>
  props.isActive ? activeRouteClasses : 'hover:text-white';
export default function Root() {
  return (
    <div className="flex flex-col h-screen w-screen bg-slate-50">
      <NavBar />

      <div className="w-full h-[92%] ">
        <ThemeProvider theme={theme}>
        <Outlet />
        </ThemeProvider>
      </div>
    </div>
  );
}
