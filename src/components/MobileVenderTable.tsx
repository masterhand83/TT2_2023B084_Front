import {
  Paper,
  Stack,
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
import LoadingContentRow from './utils/LoadingContentRow';
import { formatNumber } from '../utils/utilities';
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
export function MobileVenderTable({
  onProductoSelected,
  tableData,
  loadingContent,
  searchData,
}: VenderTableProps) {
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
      .filter(includesSearchData(searchData || ''))
      .filter((producto) => producto.existencias != 0)
      .map((producto: Producto) => {
        return (
          <TableRow
            className="hover:bg-blue-50"
            key={producto.codigo}
            sx={{ cursor: 'pointer' }}
            onClick={() => onProductoSelected(producto)}>
            <TableCell>
              <Stack>
                <span className='text-slate-400 font-bold'>{producto.codigo}</span>
                <span>{producto.nombre}</span>
              </Stack>
            </TableCell>
            <TableCell>{producto.marca}</TableCell>
            <TableCell>{producto.existencias}</TableCell>
            <TableCell>
              <span>$&nbsp;{formatNumber(producto.precio_unitario)}</span>
            </TableCell>
          </TableRow>
        );
      });
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>
                <span className="font-bold">Información</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Marca</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Existencias</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Precio</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loadingContent ? (
              <LoadingContentRow colSpan={5} />
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
    </>
  );
}
