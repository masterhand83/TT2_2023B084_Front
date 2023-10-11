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
import productosData from '../test_data/productos.json';
const dataSource: readonly Producto[] = productosData;
type VenderTableProps = {
  onProductoSelected: (_producto: Producto) => void;
};

export function VenderTable({ onProductoSelected }: VenderTableProps) {
  const [tableData, setTabledata] = useState(dataSource);

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
  const rowsPerPage = 8;
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  return (
    <div className="w-[100%] space-y-5">
      <div className="flex  items-center">
        <Search
          className="border border-slate-400 border rounded-lg"
          placeholder="Codigo de barras, marca o nombre del producto"
          onChange={onProductoSearch}
          size="large"
        />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <span className="font-bold">Código</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Producto</span>to
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
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .filter((producto) => producto.stock != 0)
              .map((producto: Producto) => {
                return (
                  <TableRow
                    className="hover:bg-blue-50"
                    key={producto.codigo}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => onProductoSelected(producto)}>
                    <TableCell>{producto.codigo}</TableCell>
                    <TableCell>{producto.nombre}</TableCell>
                    <TableCell>{producto.marca}</TableCell>
                    <TableCell>{producto.stock}</TableCell>
                    <TableCell>{producto.precio}</TableCell>
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
    </div>
  );
}
