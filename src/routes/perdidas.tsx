
import { useState } from 'react';
import { VentaTable } from '../components/Ventas/VentaTable';
import { PerdidaTable } from '../components/Perdida/PerdidaTable';
export function Perdidas() {
  return (
    <div className="flex flex-col w-full items-center  py-[2rem]">
      <div className="w-[60%]">
        <PerdidaTable />
      </div>
    </div>
  );
}
