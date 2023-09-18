
import { Divider } from '@mui/material';
import { useState } from 'react';
type DetalleVentaListProps = {
  selectedVenta?: VentaItem;
};
export default function DetalleVentaList({selectedVenta}: DetalleVentaListProps) {
  const [openModal, setOpenModal] = useState(false);
  const ListHeader = () => (
    <div className="px-6 py-4">
      <Divider />
      <h1 className="text-2xl font-bold my-4">Nueva venta</h1>
      <Divider />
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex-none">
        <ListHeader />
      </div>
      <div className="px-10 py-1 overflow-y-auto grow">
      </div>
    </div>
  );
}
