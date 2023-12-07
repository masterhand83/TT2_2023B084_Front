import { useEffect, useState } from 'react';
import { VentaTable } from '../components/Ventas/VentaTable';
import DetalleVentaList from '../components/Ventas/DetalleVentaList';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { esES } from '@mui/material/locale';
import { Box, Grid } from '@mui/material';
import  {getVistaVentas } from '../services';
import { formatNumber } from '../utils/utilities';
import { MobileVentaTable } from '../components/Ventas/MobileVentaTable';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const theme = createTheme({}, esES);
const getFormatedFecha = (fecha: string) => {
  const date = new Date(fecha);
  // Get day, month, and year components from the Date object
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
  const year = date.getFullYear();
  // Create the formatted date string in DD/MM/YYYY format
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};
const getFechaHours = (fecha: string) => {
  const fechaDate = new Date(fecha);
  return new Date(fechaDate).toLocaleTimeString();
};
const MobileDetalleVentaList = (venta: VistaVenta) => {
  return (
    <div className="flex flex-col">
      <span>Fecha: {getFormatedFecha(venta.fecha)}</span>
      <span>Hora: {getFechaHours(venta.fecha)}</span>
      <div className="min-h-[8rem] max-h-[8rem] overflow-y-scroll border-t border-b mb-2 py-1 flex flex-col space-y-2">
        <table className="min-2-full divide-y text-sm table-fixed">
          <thead className="text-left">
            <td className="w-[4rem]">CANT</td>
            <td>ARTICULO</td>
            <td className="w-[5rem]">DATOS</td>
          </thead>
          <tbody>
            {venta.items.map((item: VistaVentaItem) => (
              <tr className="">
                <td className="text-left">{item.cantidad}</td>
                <td>
                  <div className="flex flex-col text-left">
                    <span>{item.nombre}</span>
                    <span className="font-bold text-indigo-300">
                      {item.codigo_producto}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="flex flex-col text-left pt-2">
                    <span>
                      <span className="font-bold">Precio:</span>
                      <br />$ {formatNumber(item.registro_precio)}
                    </span>
                    <span>
                      <span className="font-bold">Total:</span>
                      <br />${' '}
                      {formatNumber(
                        item.subtotal
                      )}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <span>Total: $ {formatNumber(venta.total)}</span>
    </div>
  );
};

const DesktopView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVenta, setSelectedVenta] = useState<VistaVenta | null>(null);
  const [tableData, setTabledata] = useState([] as VistaVenta[]);

  useEffect(() => {
    setIsLoading(true);
    console.log('loading data')
    getVistaVentas().then((data) => {
      console.log('data loaded', data);
      setTabledata(data);
      setIsLoading(false);
    })
  }, []);
  const VentaAlert = withReactContent(Swal);

  const MobileView = () => (
    <Box sx={{ height: '100%', display: { xs: 'block', md: 'none' } }}>
      <ThemeProvider theme={theme}>
        <Grid container height={'100%'} spacing={2}>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <div className="p-[3rem]">
              <MobileVentaTable
                isLoading={isLoading}
                tableData={tableData}
                onVentaSelected={(venta) => {
                  setSelectedVenta(venta);
                  VentaAlert.fire({
                    title: <strong>Detalle de venta</strong>,
                    icon: 'info',
                    html: <MobileDetalleVentaList {...venta} />,
                  });
                }}
              />
            </div>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Box>
  );
  return (
    <>
    <Box sx={{ height: '100%', display: { xs: 'none', md: 'flex' } }}>
      <Grid alignContent={'stretch'} container spacing={2}>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
          <div className="p-[3rem]">
            <VentaTable
              isLoading={isLoading}
              tableData={tableData}
              onVentaSelected={(venta) => setSelectedVenta(venta)}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <div className="bg-white border-l border-slate-300 h-full">
            <DetalleVentaList
              selectedVenta={selectedVenta ? selectedVenta : null}
            />
          </div>
        </Grid>
      </Grid>
    </Box>
    <MobileView/>
    </>
  );
};
export function Ventas() {
  return (
    <>
      <DesktopView />
    </>
  );
}
