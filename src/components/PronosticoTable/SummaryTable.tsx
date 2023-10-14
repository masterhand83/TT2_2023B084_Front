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

const dataSource: PronosticoVentas = [
  {
    periodoInicio: '2023-02-12',
    periodoFin: '2023-03-18',
    ventas: 512,
  },
  {
    periodoInicio: '2023-05-06',
    periodoFin: '2023-06-10',
    ventas: 289,
  },
  {
    periodoInicio: '2023-08-21',
    periodoFin: '2023-09-25',
    ventas: 726,
  },
  {
    periodoInicio: '2023-11-03',
    periodoFin: '2023-12-07',
    ventas: 148,
  },
  {
    periodoInicio: '2023-04-30',
    periodoFin: '2023-06-04',
    ventas: 821,
  },
];


export function SummaryTable() {
  const [tableData, _setTabledata] = useState(dataSource);
  const [page, setPage] = useState(0);
  const rowsPerPage = 8;
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  return (
    <div className="flex flex-col items-center w-[100%] space-y-3">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <span className="font-bold">Periodo</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Valor</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((pronostico) => {
                return (
                  <TableRow className="hover:bg-blue-50" key={pronostico.periodoFin}>
                    <TableCell>{pronostico.periodoInicio} - {pronostico.periodoFin}</TableCell>
                    <TableCell>{pronostico.ventas}</TableCell>
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
