
import { VenderTable } from '../components/VenderTable';
import { useState } from 'react';
import VentaList from '../components/Vender/VentaList';
import { VentaTable } from '../components/Ventas/VentaTable';
import DetalleVentaList from '../components/Ventas/DetalleVentaList';
export function Ventas() {
  const [selectedVenta, setSelectedVenta] = useState<Venta | null>(null);
  return (
    <div className="grid grid-cols-4 grid-rows-1 items-right h-full">
      <div className="mr-9 ml-10 mt-[3rem] col-span-2">
        <VentaTable  onVentaSelected={(venta)=> setSelectedVenta(venta)}/>
      </div>
      <div className="bg-slate-50 col-span-2">
        <DetalleVentaList
        selectedVenta={selectedVenta? selectedVenta : null}
        />
      </div>
    </div>
  );
}
