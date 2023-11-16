import {
  CircularProgress,
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
import LoadingContentRow from '../utils/LoadingContentRow';

type HistorialTableProps = {
  dataSource: PronosticoVentas;
  producto: Producto;
  loading: boolean;
};

export function HistorialTable({
  dataSource,
  producto,
  loading,
}: HistorialTableProps) {
  const [page, setPage] = useState(0);
  const rowsPerPage = 4;
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  return (
    <div className="flex flex-col w-full items-center space-y-3">
      <TableContainer
        component={Paper}
        sx={{ width: { xs: '100%', md: '75%' } }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell colSpan={3}>
                <span className="font-bold text-stone-600">
                  {producto.codigo}
                </span>
                <div>
                  Historial de:{' '}
                  <span className="font-bold">{producto.nombre}</span>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span className="font-bold">Inicio</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Final</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Existencias</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <LoadingContentRow colSpan={3}/>
            ) : (
              dataSource
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((pronostico, index) => {
                  return (
                    <TableRow className="hover:bg-blue-50" key={index}>
                      <TableCell>{pronostico.periodoInicio}</TableCell>
                      <TableCell>{pronostico.periodoFin}</TableCell>
                      <TableCell>{pronostico.ventas}</TableCell>
                    </TableRow>
                  );
                })
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPage={rowsPerPage}
                count={dataSource.length}
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
