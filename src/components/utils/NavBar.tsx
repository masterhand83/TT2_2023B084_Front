import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useState, MouseEvent } from 'react';

const paginas = [
  {
    titulo: 'Vender',
    ruta: '/vender',
  },
  {
    titulo: 'Ventas',
    ruta: '/ventas',
  },
  {
    titulo: 'Inventario',
    ruta: '/inventario',
  },
  {
    titulo: 'Pérdidas',
    ruta: '/perdidas',
  },
  {
    titulo: 'Pronóstico',
    ruta: '/pronostico',
  },
];
export default function NavBar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu: any = () => {
    setAnchorElNav(null);
  };
  const {pathname} = useLocation();
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters variant='dense'>
          <Typography
            variant="h6"
            component="a"
            href="/vender"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
            }}>
            Papelería Plus
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              sx={{ color: 'white' }}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}>
              {paginas.map((pagina, index) => (
                  <Link to={pagina.ruta} key={index}>
                <MenuItem key={index} onClick={handleCloseNavMenu}
                  selected={
                     pagina.ruta === pathname
                    }>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ flexGrow: 1 }}>
                      {pagina.titulo}
                    </Typography>
                </MenuItem>
                  </Link>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            component="a"
            href="/vender"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              fontWeight: 700,
            }}>
            Papelería Plus
          </Typography>
          <Box sx={{ flexGrow: 1, display: {xs:'none', md:'flex'} }} >
              {paginas.map((pagina, index) => (
                  <Link to={pagina.ruta} key={index}>
                <MenuItem key={index} onClick={handleCloseNavMenu} selected={pagina.ruta === pathname}>
                    <Typography
                      component="div"
                      sx={{ flexGrow: 1,
                        fontWeight: pagina.ruta === pathname? '700':'500',
                        }}>
                      {pagina.titulo}
                    </Typography>
                </MenuItem>
                  </Link>
              ))}

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    // <Box sx={{flexGrow: 1}}>
    //   <AppBar position="static">
    //     <Toolbar>
    //       <IconButton
    //         sx={{mr:2,color:'white'}}
    //         size="large"
    //         onClick={handleOpenMenu}
    //         edge="start"
    //       >
    //         <MenuIcon />
    //       </IconButton>
    //       <Menu
    //       open={true}
    //       anchorEl={null}
    //       >
    //         {
    //           paginas.map((pagina, index) => (
    //             <MenuItem key={index}>
    //             <Link to={pagina.ruta} key={index}>
    //               <Typography variant="h6" component="div" sx={{flexGrow:1}}>
    //                 {pagina.titulo}
    //               </Typography>
    //             </Link>
    //             </MenuItem>
    //           ))
    //         }

    //       </Menu>
    //       {/* <Typography variant="h6" component="div" sx={{flexGrow:1}}>
    //         Papeleria Plus
    //       </Typography> */}
    //     </Toolbar>

    //   </AppBar>
    // </Box>
    // <div className="flex px-8 bg-blue-500 h-[8%] items-center space-x-[2rem] shadow-lg">
    //   <div>
    //     <Link to={'/'}>
    //       <img src="/vite.svg" />
    //     </Link>
    //   </div>
    //   <div className="flex space-x-5 text-gray text-[1rem]">
    //     <NavLink to={'/vender'} className={changeIfActive}>
    //       Vender
    //     </NavLink>
    //     <NavLink to={'/inventario'} className={changeIfActive}>
    //       Inventario
    //     </NavLink>
    //     <NavLink to={'/ventas'} className={changeIfActive}>
    //       Ventas
    //     </NavLink>
    //     <NavLink to={'/perdidas'} className={changeIfActive}>
    //       Perdidas
    //     </NavLink>
    //     <NavLink to={'/pronostico'} className={changeIfActive}>
    //       Pronóstico
    //     </NavLink>
    //   </div>
    // </div>
  );
}
