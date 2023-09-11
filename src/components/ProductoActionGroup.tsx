import { Producto } from '../types';
import { AgregarIcono, EditarIcono, MinusIcono, BasuraIcono } from './Iconos';
type ActionButtonProps = {
  onAction: (_action: "delete"|"add"|"remove"|"edit") => void;
}
type AgregarMermaButtonProps = ActionButtonProps & {
  stock: number;
}
type ProductoActionGroupProps = {
  producto: Producto;
  onAction: (_action: "delete"|"add"|"remove"|"edit") => void;
};

const AgregarStockButton = ({onAction}:ActionButtonProps) => {
  return (
    <button onClick={() => onAction("add")} className="bg-success text-white rounded p-1 ">
      <AgregarIcono />
    </button>
  );
};
const EditarProductoButton = ({onAction}: ActionButtonProps) => {
  return (
    <button onClick={() => onAction("edit")} className="bg-warning text-white rounded p-1">
      <EditarIcono />
    </button>
  );
};
const AgregarMermaButton = ({stock,onAction}:AgregarMermaButtonProps) => {
  if (stock > 0) {
    return (
      <button onClick={() => onAction("remove")} className="bg-danger text-white rounded p-1">
        <MinusIcono />
      </button>
    );
  }
  return (
    <button onClick={() => onAction("delete")} className="bg-danger text-white rounded p-1">
      <BasuraIcono />
    </button>
  );
};
export default function ProductoActionGroup({
  producto,
  onAction
}: ProductoActionGroupProps) {
  return (
    <div className="flex space-x-4">
      <AgregarStockButton onAction={onAction} />
      <EditarProductoButton onAction={onAction}/>
      <AgregarMermaButton onAction={onAction} stock={producto.stock} />
    </div>
  );
}
