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
import dayjs from 'dayjs';
import { useState } from 'react';
import { DatePicker } from 'antd';
import { formatNumber } from '../../utils/utilities';

type VentaTableProps = {
  onVentaSelected?: (_venta: Venta) => void;
  tableData: any[]
};

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

export function VentaTable({ onVentaSelected, tableData }: VentaTableProps) {
  const firstDateOfYear = dayjs().startOf('year');
  const lastDateOfYear = dayjs().endOf('year');
  const [page, setPage] = useState(0);
  const [upperLimit, setUpperLimit] = useState<dayjs.Dayjs | null>(
    lastDateOfYear
  );
  const [lowerLimit, setLowerLimit] = useState<dayjs.Dayjs | null>(
    firstDateOfYear
  );
  const rowsPerPage = 8;
  const isInDateRange = (venta: Venta) => {
    if (!lowerLimit || !upperLimit) return false;
    const ventaDate = dayjs(venta.fecha);
    return ventaDate.isAfter(lowerLimit) && ventaDate.isBefore(upperLimit);
  };
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  return (
    <div className="flex flex-col items-center w-[100%] space-y-3">
      <div className="flex space-x-2 items-center">
        <div>De:</div>
        <div>
          <DatePicker
            onChange={(value, _date) => setLowerLimit(value)}
            format={'DD/MM/YYYY'}
            defaultValue={lowerLimit ? lowerLimit : firstDateOfYear}
          />
        </div>
        <div>a:</div>
        <div>
          <DatePicker
            onChange={(value, _date) => setUpperLimit(value)}
            format={'DD/MM/YYYY'}
            defaultValue={upperLimit ? upperLimit : lastDateOfYear}
          />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span>Suma total: </span>
        <div className="bg-green-500 text-white px-6 py-[0.1rem] rounded">
          $&nbsp;
          <span>
            {formatNumber(tableData
              .filter(isInDateRange)
              .map((venta) => venta.total)
              .reduce((a, b) => a + b, 0))
              }
          </span>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <span className="font-bold">Fecha</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Hora</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">No.&nbsp;Productos</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Total</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .filter(isInDateRange)
              .map((venta) => {
                return (
                  <TableRow
                    className="hover:bg-blue-50"
                    key={venta.id}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => onVentaSelected?.(venta)}
                    >
                    <TableCell>{getFormatedFecha(venta.fecha)}</TableCell>
                    <TableCell>{getFechaHours(venta.fecha)}</TableCell>
                    <TableCell>{venta.cantidad}</TableCell>
                    <TableCell>$ {formatNumber(venta.total)}</TableCell>
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
