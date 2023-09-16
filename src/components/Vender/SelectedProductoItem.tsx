import { InputNumber } from 'antd';
import { RemoveCircle } from '@mui/icons-material';
const style = "flex bg-white my-3 p-3 space-x-4 items-center border rounded border-stone-200 shadow"

type SelectedProductoItemProps = {
  item: VentaItem;
  onCantidadChange?: (_value: number) => void;
  onDelete?: () => void;
};
export default function SelectedProductoItem({
  item,
  onCantidadChange,
  onDelete,
}: SelectedProductoItemProps) {
  const { producto } = item;
  const handleSpinner = (value: number | null) => {
    if(value && onCantidadChange){
        onCantidadChange(value);
    }
  };
  const formatToMoney = (value: number) => {
    return value.toFixed(2);
  };
  return (
    <div className={style}>
      <div className="w-[40%]">
        <h1 className="font-bold text-2">{producto.nombre}</h1>
        <span className="text-stone-400">{producto.codigo}</span>
      </div>
      <div>
        <InputNumber
          value={item.cantidad}
          min={1}
          max={producto.stock}
          onChange={handleSpinner}
        />
      </div>
      <div className="text-[0.75rem] w-[20%]">
        $ {formatToMoney(producto.precio * item.cantidad)}
      </div>
      <div className="">
        <button
          onClick={() => (onDelete ? onDelete() : null)}
          className="ml-auto text-red-500">
          <RemoveCircle />
        </button>
      </div>
    </div>
  );
}
