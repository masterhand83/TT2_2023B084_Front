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
import datosPerdidas from '../../test_data/perdidas.json';
import dayjs from 'dayjs';
import { useState } from 'react';

type PerdidaTableProps = {
  onVentaSelected?: (_venta: Venta) => void;
};
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
const getFechaHours = (fecha: string) => {
  const fechaDate = new Date(fecha);
  return new Date(fechaDate).toLocaleTimeString();
};

const getFormatedFecha = (fecha: string) => {
  const date = new Date(fecha);
  // Get day, month, and year components from the Date object
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
  const year = date.getFullYear();
  // Create the formatted date string in DD/MM/YYYY format
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

export function HistorialTable(props: PerdidaTableProps) {
  const firstDateOfYear = dayjs().startOf('year');
  const lastDateOfYear = dayjs().endOf('year');
  const [tableData, setTabledata] = useState(dataSource);
  const [page, setPage] = useState(0);
  const [upperLimit, setUpperLimit] = useState<dayjs.Dayjs | null>(
    lastDateOfYear
  );
  const [lowerLimit, setLowerLimit] = useState<dayjs.Dayjs | null>(
    firstDateOfYear
  );
  const rowsPerPage = 8;
  const isInDateRange = (perdida: Perdida) => {
    if (!lowerLimit || !upperLimit) return false;
    const perdidaDate = dayjs(perdida.fecha);
    return perdidaDate.isAfter(lowerLimit) && perdidaDate.isBefore(upperLimit);
  };
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
