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
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import PronosticoActionGroup from './PronosticoTable/PronosticoActionGroup';
import LoadingPronosticoModal from './PronosticoTable/LoadingPronosticoModal';
import { getListaProductos } from '../services';
import { useNavigate } from 'react-router-dom';
//const dataSource: readonly Producto[] = productosData;

export function PronosticoTable() {
  const [tableData, setTabledata] = useState([] as Producto[]);
  const [openPronosticoModal, setOpenPronosticoModal] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState<Producto | null>(
    null
  );
  const [searchData, setSearchData] = useState('' as string);
  const includesSearchData = (producto: Producto) => {
    return (
      producto.codigo.includes(searchData) ||
      producto.marca.includes(searchData) ||
      producto.nombre.includes(searchData)
    );
  };
  const onProductoSearch: ChangeEventHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setSearchData(event.target.value);
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
    console.log(producto);
    if (action === 'history') {
      navigate('/pagina-historial', {
        state: { producto },
      });
    }
    if (action === 'forecast') {
      setOpenPronosticoModal(true);
    }
  };
  useEffect(() => {
    getListaProductos().then((data) => {
      setTabledata(data);
    });
  }, []);
  const navigate = useNavigate();
  return (
    <div className="w-[75%] space-y-2">
      <div className="flex space-x-2 items-center">
        <Search
          placeholder="Codigo de barras, marca o nombre del producto"
          onChange={onProductoSearch}
          size="large"
        />
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
              .filter(includesSearchData)
              .map((producto: Producto) => {
                return (
                  <TableRow key={producto.codigo}>
                    <TableCell>{producto.codigo}</TableCell>
                    <TableCell>{producto.nombre}</TableCell>
                    <TableCell>{producto.marca}</TableCell>
                    <TableCell>{producto.existencias}</TableCell>
                    <TableCell>{producto.precio_unitario}</TableCell>
                    <TableCell>
                      <PronosticoActionGroup
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
      <LoadingPronosticoModal
        currentProducto={selectedProducto}
        isOpen={openPronosticoModal}
        setIsOpen={setOpenPronosticoModal}
      />
    </div>
  );
}
