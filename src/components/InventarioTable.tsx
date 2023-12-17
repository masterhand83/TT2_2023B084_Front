import { useState } from 'react';
import ProductoActionGroup from './ProductoActionGroup';
import AddStockModal from './InventarioTable/AddStockModal';
import AddMermaModal from './InventarioTable/AddMermaModal';
import DeleteProductoModal from './InventarioTable/DeleteProductoModal';
import TablaProductos from './Table/TablaProductos';
import { openAddMermaModal, openAddStockModal, openEditProductoModal } from './modales/inventarioModales';
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
  const [isAddStockOpen, setAddStockOpen] = useState(false);
  const [isAddMermaOpen, setAddMermaOpen] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState({} as Producto);
  const [isdeleteProductoOpen, setDeleteProductoOpen] = useState(false);
  const openModal = (action: string, producto: Producto) => {
    setSelectedProducto(producto);
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
      setDeleteProductoOpen(true);
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
      <AddStockModal
        isOpen={isAddStockOpen}
        setIsOpen={setAddStockOpen}
        currentProducto={selectedProducto}
        reloader={loadContent}
      />
      <AddMermaModal
        isOpen={isAddMermaOpen}
        setIsOpen={setAddMermaOpen}
        currentProducto={selectedProducto}
        reloader={loadContent}
      />
      <DeleteProductoModal
        isOpen={isdeleteProductoOpen}
        setIsOpen={setDeleteProductoOpen}
        currentProducto={selectedProducto}
        reloader={loadContent}
      />
    </>
  );
}
