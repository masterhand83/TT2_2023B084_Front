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
import React, { useEffect, useState } from 'react';
import LoadingContentRow from './utils/LoadingContentRow';
import { formatNumber } from '../utils/utilities';
import SearchBar from './utils/SearchBar';
type VenderTableProps = {
  onProductoSelected: (_producto: Producto) => void;
  tableData: Producto[];
  loadingContent: boolean;
  searchData?: string;
};
const includesSearchData = (searchData: string) => (producto: Producto) => {
  return (
    producto.codigo.includes(searchData) ||
    producto.marca.includes(searchData) ||
    producto.nombre.includes(searchData)
  );
};
function VenderTable({
  onProductoSelected,
  tableData,
  loadingContent,
}: VenderTableProps) {
  console.log('rendering vender table');
  const [searchData, setSearchData] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 8;
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  let accumulatedInput = ''
  let lastKeypressTime = 0;

  const HandleKeyPress = (event: KeyboardEvent) => {
    const currentTime = new Date().getTime();
    if(currentTime - lastKeypressTime > 500) {
      accumulatedInput = ''
    }
    lastKeypressTime = currentTime;
    if (event.key === 'Enter') {
      const producto = tableData.find((producto) => producto.codigo === accumulatedInput.trim())
      if(producto){
        console.log(producto)
        onProductoSelected(producto)
      }
      //setSearchData(accumulatedInput.trim())
      console.log('accumulated input',accumulatedInput.trim())
      accumulatedInput = ''
    }
    accumulatedInput += event.key;
  }
  useEffect(() => {
    window.addEventListener('keypress', HandleKeyPress)
    return () => {
      window.removeEventListener('keypress', HandleKeyPress)
    }
  })
  const TableContent = () => {
    return tableData
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .filter(includesSearchData(searchData || ''))
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
            <TableCell>$&nbsp;{formatNumber(producto.precio_unitario)}</TableCell>
          </TableRow>
        );
      });
  };
  return (
    <>
        <SearchBar onProductoSearch={setSearchData}/>
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
    </>
  );
}

export default React.memo(VenderTable)