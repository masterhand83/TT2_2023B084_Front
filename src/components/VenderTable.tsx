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
import LoadingContentRow from './utils/LoadingContentRow';
type VenderTableProps = {
  onProductoSelected: (_producto: Producto) => void;
  tableData: Producto[];
  loadingContent: boolean;
};

export function VenderTable({
  onProductoSelected,
  tableData,
  loadingContent
}: VenderTableProps) {
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
    //setTabledata(dataSource.filter(includesSearchData));
  };

  const [page, setPage] = useState(0);
  const rowsPerPage = 8;
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const TableContent = () => {
    return tableData
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .filter(includesSearchData)
      .filter((producto) => producto.existencias != 0)
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
            <TableCell>{producto.existencias}</TableCell>
            <TableCell>$&nbsp;{producto.precio_unitario}</TableCell>
          </TableRow>
        );
      });
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
            </TableRow>
          </TableHead>
          <TableBody>
            {loadingContent ? <LoadingContentRow colSpan={5} /> : <TableContent />}
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
