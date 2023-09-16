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
import Search from 'antd/es/input/Search';
import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import ProductoActionGroup from './ProductoActionGroup';
import AddProductoModal from './InventarioTable/AddProductoModal';
import AddStockModal from './InventarioTable/AddStockModal';
import EditProductoModal from './InventarioTable/EditProductoModal';
import AddMermaModal from './InventarioTable/AddMermaModal';
import DeleteProductoModal from './InventarioTable/DeleteProductoModal';
import productosData from '../test_data/productos.json';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
const dataSource: readonly Producto[] = productosData;

export function InventarioTable() {
  const [tableData, setTabledata] = useState(dataSource);
  const [isAddProductoModalOpen, setAddProductoModalOpen] = useState(false);
  const [isAddStockOpen, setAddStockOpen] = useState(false);
  const [isAddMermaOpen, setAddMermaOpen] = useState(false);
  const [isEditProductoOpen, setEditProductoOpen] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState({} as Producto);
  const [isdeleteProductoOpen, setDeleteProductoOpen] = useState(false);

  const onProductoSearch: ChangeEventHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const searchData: string = event.currentTarget.value;
    const includesSearchData = (producto: Producto) => {
      return (
        producto.codigo.includes(searchData) ||
        producto.marca.includes(searchData) ||
        producto.nombre.includes(searchData)
      );
    };
    setTabledata(dataSource.filter(includesSearchData));
  };

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
    if (action === 'add') {
      setAddStockOpen(true);
    }
    if (action === 'edit') {
      setEditProductoOpen(true);
    }
    if (action === 'remove') {
      setAddMermaOpen(true);
    }
    if (action === 'delete') {
      setDeleteProductoOpen(true);
    }
  };
  return (
    <div className="w-[75%] space-y-2">
      <div className="flex space-x-2 items-center">
        <Search
          placeholder="Codigo de barras, marca o nombre del producto"
          onChange={onProductoSearch}
          size="large"
        />
        <button
          onClick={() => setAddProductoModalOpen(true)}
          className="bg-success text-white py-2 px-2 rounded">
          <AddBusinessIcon />
        </button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Existencia</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((producto: Producto) => {
                return (
                  <TableRow key={producto.codigo}>
                    <TableCell>{producto.codigo}</TableCell>
                    <TableCell>{producto.nombre}</TableCell>
                    <TableCell>{producto.marca}</TableCell>
                    <TableCell>{producto.stock}</TableCell>
                    <TableCell>{producto.precio}</TableCell>
                    <TableCell>
                      <ProductoActionGroup
                        producto={producto}
                        onAction={(action) => openModal(action, producto)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
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
      <AddProductoModal
        isOpen={isAddProductoModalOpen}
        setIsOpen={setAddProductoModalOpen}
      />
      <AddStockModal
        isOpen={isAddStockOpen}
        setIsOpen={setAddStockOpen}
        currentProducto={selectedProducto}
      />
      <EditProductoModal
        isOpen={isEditProductoOpen}
        setIsOpen={setEditProductoOpen}
        currentProducto={selectedProducto}
      />
      <AddMermaModal
        isOpen={isAddMermaOpen}
        setIsOpen={setAddMermaOpen}
        currentProducto={selectedProducto}
      />
      <DeleteProductoModal
        isOpen={isdeleteProductoOpen}
        setIsOpen={setDeleteProductoOpen}
        currentProducto={selectedProducto}
      />
    </div>
  );
}
