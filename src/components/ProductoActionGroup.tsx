import { Producto } from '../types';
import { AgregarIcono, EditarIcono, MinusIcono, BasuraIcono } from './Iconos';

const AgregarStockButton = () => {
  return (
    <button className="bg-success text-white rounded p-1 ">
      <AgregarIcono />
    </button>
  );
};

const EditarProductoButton = () => {
  return (
    <button className="bg-warning text-white rounded p-1">
      <EditarIcono />
    </button>
  );
};

const AgregarMermaButton = (props: { stock: number }) => {
  if (props.stock > 0) {
    return (
      <button className="bg-danger text-white rounded p-1">
        <MinusIcono />
      </button>
    );
  }
  return (
    <button className="bg-danger text-white rounded p-1">
      <BasuraIcono />
    </button>
  );
};

export default function ProductoActionGroup(
  _value: undefined,
  { stock }: Producto,
  _index: number
) {
  return (
    <div className="flex space-x-4">
      <AgregarStockButton />
      <EditarProductoButton />
      <AgregarMermaButton stock={stock}/>
    </div>
  );
}
