import { Divider } from '@mui/material';
import { Producto, VentaItem } from '../../types';
import SelectedProductoItem from './SelectedProductoItem';
type VentaListProps = {
  selectedList: VentaItem[];
  onListItemCantidadChange: (item: VentaItem, value: number) => void;
  onListItemDeleted: (item: VentaItem) => void;
};
export default function VentaList({
  selectedList,
  onListItemCantidadChange,
  onListItemDeleted,
}: VentaListProps) {
  const total = selectedList
    .map((item) => item.producto.precio * item.cantidad)
    .reduce((prev, current) => {
      return prev + current;
    }, 0);
  const cantidadTotal = selectedList
    .map((item) => item.cantidad)
    .reduce((accum, current) => {
      return accum + current;
    }, 0);
  const ListHeader = () => {
    return (
      <div className='px-6 py-4'>
        <Divider />
        <h1 className="text-2xl font-bold my-4">Nueva venta</h1>
        <Divider />
      </div>
    );
  };
  const ListOfProducts = () =>
    selectedList.map((item, index) => (
      <SelectedProductoItem
        key={index}
        item={item}
        onCantidadChange={(value) => onListItemCantidadChange(item, value)}
        onDelete={() => onListItemDeleted(item)}
      />
    ));
  const VentaResumen = () => (
    <div className="flex p-8">
      <div className="font-bold">
        <h1 className="text-3xl">Precio</h1>
        <h1 className="text-green-300">productos: {cantidadTotal}</h1>
      </div>
      <div className="mx-auto">
        <h1 className="text-5xl">$ {total.toFixed(2)}</h1>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex-none">
        <ListHeader />
      </div>
      <div className="px-10 py-1 overflow-y-auto grow">
        <ListOfProducts />
      </div>
      <div className="items-center mt-auto bg-green-600  text-white flex-none">
        <VentaResumen />
      </div>
    </div>
  );
}
