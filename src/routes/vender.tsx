import { InventarioTable } from "../components/InventarioTable";

export function Vender() {
  return (
    <div className="flex flex-col items-center space-y-4 ">
      <h1 className="text-4xl">Inventario</h1>
      <InventarioTable />
    </div>
  );
}