import { Add, Edit, Remove, DeleteForever } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
type ActionButtonProps = {
  onAction: (_action: 'delete' | 'add' | 'remove' | 'edit') => void;
};
type AgregarMermaButtonProps = ActionButtonProps & {
  stock: number;
};
type ProductoActionGroupProps = {
  producto: Producto;
  onAction: (_action: 'delete' | 'add' | 'remove' | 'edit') => void;
};

const AgregarStockButton = ({ onAction }: ActionButtonProps) => {
  return (
    <Tooltip title="Agregar Existencias">
      <button
        onClick={() => onAction('add')}
        className="bg-green-500 text-white rounded p-1 ">
        <Add />
      </button>
    </Tooltip>
  );
};
const EditarProductoButton = ({ onAction }: ActionButtonProps) => {
  return (
    <Tooltip title="Editar Producto">
      <button
        onClick={() => onAction('edit')}
        className="bg-amber-500 text-white rounded p-1">
        <Edit />
      </button>
    </Tooltip>
  );
};
const AgregarMermaButton = ({ stock, onAction }: AgregarMermaButtonProps) => {
  if (stock > 0) {
    return (
      <Tooltip title="Agregar Merma">
        <button
          onClick={() => onAction('remove')}
          className="bg-red-600 text-white rounded p-1">
          <Remove />
        </button>
      </Tooltip>
    );
  }
  return (
    <Tooltip title="Eliminar Producto">
      <button
        onClick={() => onAction('delete')}
        className="bg-red-600 text-white rounded p-1">
        <DeleteForever />
      </button>
    </Tooltip>
  );
};
export default function ProductoActionGroup({
  producto,
  onAction,
}: ProductoActionGroupProps) {
  return (
    <div className="flex space-x-4">
      <AgregarStockButton onAction={onAction} />
      <EditarProductoButton onAction={onAction} />
      <AgregarMermaButton onAction={onAction} stock={producto.existencias} />
    </div>
  );
}
