
import { VenderTable } from '../components/VenderTable';
import { useState } from 'react';
import VentaList from '../components/Vender/VentaList';
import { VentaTable } from '../components/Ventas/VentaTable';
import DetalleVentaList from '../components/Ventas/DetalleVentaList';
import{createTheme, ThemeProvider} from '@mui/material/styles';
import { esES } from '@mui/material/locale'

const theme = createTheme({
}, esES);
export function Ventas() {
  const [selectedVenta, setSelectedVenta] = useState<Venta | null>(null);
  return (
    <div className="grid grid-cols-4 grid-rows-1 items-right h-full">
      <div className="mr-9 ml-10 mt-[3rem] col-span-2">
        <ThemeProvider theme={theme}>
        <VentaTable  onVentaSelected={(venta)=> setSelectedVenta(venta)}/>
        </ThemeProvider>
      </div>
      <div className="bg-slate-100 border-l border-slate-300 col-span-2">
        <DetalleVentaList
        selectedVenta={selectedVenta? selectedVenta : null}
        />
      </div>
    </div>
  );
}
