import ProductoActionGroup from './ProductoActionGroup';
import TablaProductos from './Table/TablaProductos';
import { openAddMermaModal, openAddStockModal, openDeleteProductoModal, openEditProductoModal } from './modales/inventarioModales';
import { getAllMarcas } from '../services';

type InventarioTableProps = {
  tableData: Producto[];
  loadingContent: boolean;
  loadContent: () => void;
  searchParameter?: string;
};
export function InventarioTable({
  tableData,
  loadingContent,
  loadContent,
  searchParameter,
}: InventarioTableProps) {
  const openModal = (action: string, producto: Producto) => {
    if (action === 'edit') {
      getAllMarcas().then((res) => {
        openEditProductoModal(producto, loadContent, res);
      });
      //setEditProductoOpen(true);
    }
    if (action === 'add') {
      openAddStockModal(producto, loadContent);
    }
    if (action === 'remove') {
      openAddMermaModal(producto, loadContent);
    }
    if (action === 'delete') {
      openDeleteProductoModal(producto, loadContent);
    }
  };
  return (
    <>
      <TablaProductos
        tableData={tableData}
        loadingContent={loadingContent}
        searchData={searchParameter}
        displayLength={5}
        renderActionButtons={(producto: Producto) => (
          <ProductoActionGroup
            producto={producto}
            onAction={(action) => openModal(action, producto)}
          />
        )}
      />
    </>
  );
}
