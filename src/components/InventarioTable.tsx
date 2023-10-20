import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { useState } from 'react';
import ProductoActionGroup from './ProductoActionGroup';
import LoadingContentRow from './utils/LoadingContentRow';
import AddStockModal from './InventarioTable/AddStockModal';
import EditProductoModal from './InventarioTable/EditProductoModal';
import AddMermaModal from './InventarioTable/AddMermaModal';
import DeleteProductoModal from './InventarioTable/DeleteProductoModal';

type InventarioTableProps = {
  tableData: Producto[];
  loadingContent: boolean;
  loadContent: () => void;
  searchParameter?: string;
};
const includesSearchData = (searchData: string) => (producto: Producto) => {
  return (
    producto.codigo.includes(searchData) ||
    producto.marca.includes(searchData) ||
    producto.nombre.includes(searchData)
  );
};
export function InventarioTable({
  tableData,
  loadingContent,
  loadContent,
  searchParameter,
}: InventarioTableProps) {
  const [isAddStockOpen, setAddStockOpen] = useState(false);
  const [isAddMermaOpen, setAddMermaOpen] = useState(false);
  const [isEditProductoOpen, setEditProductoOpen] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState({} as Producto);
  const [isdeleteProductoOpen, setDeleteProductoOpen] = useState(false);

  const [page, setPage] = useState(0);
  const rowsPerPage = 5;
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const openModal = (action: string, producto: Producto) => {
    setSelectedProducto(producto);
    if (action === 'edit') {
      setEditProductoOpen(true);
    }
    if (action === 'add') {
      setAddStockOpen(true);
    }
    if (action === 'remove') {
      setAddMermaOpen(true);
    }
    if (action === 'delete') {
      setDeleteProductoOpen(true);
    }
  };
  const TableContent = () => {
    return tableData
      .filter(includesSearchData(searchParameter || ''))
      .filter((producto: Producto) => producto.activo)
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((producto: Producto) => {
        return (
          <TableRow key={producto.codigo}>
            <TableCell>{producto.codigo}</TableCell>
            <TableCell>{producto.nombre}</TableCell>
            <TableCell>{producto.marca}</TableCell>
            <TableCell>{producto.existencias}</TableCell>
            <TableCell>$&nbsp;&nbsp;{producto.precio_unitario}</TableCell>
            <TableCell>
              <ProductoActionGroup
                producto={producto}
                onAction={(action) => openModal(action, producto)}
              />
            </TableCell>
          </TableRow>
        );
      });
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <span className="font-bold">Código {loadingContent}</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Producto</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Marca</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Existencia</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Precio</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Acciones</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loadingContent ? (
              <LoadingContentRow colSpan={6} />
            ) : (
              <TableContent />
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPage={rowsPerPage}
                count={tableData.length}
                page={page}
                onPageChange={handleChangePage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <AddStockModal
        isOpen={isAddStockOpen}
        setIsOpen={setAddStockOpen}
        currentProducto={selectedProducto}
        reloader={loadContent}
      />
      <EditProductoModal
        isOpen={isEditProductoOpen}
        setIsOpen={setEditProductoOpen}
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
