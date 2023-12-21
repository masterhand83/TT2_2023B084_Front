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
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import { getMermas } from '../../services';

type PerdidaTableProps = {
  onVentaSelected?: (_venta: Venta) => void;
};
//const dataSource: readonly Perdida[] = datosPerdidas;

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

export function PerdidaTable(_props: PerdidaTableProps) {
  const firstDateOfYear = dayjs().startOf('year');
  const lastDateOfYear = dayjs().endOf('year');
  const [tableData, setTabledata] = useState([] as Perdida[]);
  const [page, setPage] = useState(0);
  const [upperLimit, setUpperLimit] = useState<dayjs.Dayjs | null>(
    lastDateOfYear
  );
  const [lowerLimit, setLowerLimit] = useState<dayjs.Dayjs | null>(
    firstDateOfYear
  );
  const rowsPerPage = 5;
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
  useEffect(() => {
    getMermas().then((mermas) => {
      console.log(mermas);
      setTabledata(mermas);
    });
  }, []);
  return (
    <div className="flex flex-col w-[100%] space-y-3">
      <div>
        <Typography fontWeight={'bold'} variant="h4" fontSize={'1.5rem'}>
          Pérdidas
        </Typography>
        <Typography variant="h6" fontSize={'0.875rem'}>
          Seleccione un rango de fechas para visualizar la lista de merma de
          productos que contribuyen a pérdidas de ese periodo.
        </Typography>
      </div>
      <div className="flex space-x-2 items-center justify-center">
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
      <div className="flex items-center justify-center space-x-2">
        <span>Pérdidas totales: </span>
        <div className="bg-red-500 text-white px-6 py-[0.1rem] rounded">
          $&nbsp;
          <span>
            {tableData
              .filter(isInDateRange)
              .map((perdida) => perdida.total)
              .reduce((a, b) => a + b, 0)
              .toFixed(2)}
          </span>
        </div>
      </div>
       <div>
        <Typography variant="h6" component="h6" fontSize={'0.875rem'}>
          Lista de mermas para el periodo seleccionado:
        </Typography>
       </div>
      <TableContainer component={Paper}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>
                <span className="font-bold">Fecha</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Hora</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Producto</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Cantidad</span>
              </TableCell>
              <TableCell>
                <span className="font-bold">Total</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData
              .filter(isInDateRange)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .sort((a, b) => {
                const dateA = new Date(a.fecha);
                const dateB = new Date(b.fecha);
                return dateA.getTime() - dateB.getTime();
              })
              .map((perdida) => {
                return (
                  <TableRow className="hover:bg-blue-50" key={perdida.id}>
                    <TableCell>{getFormatedFecha(perdida.fecha)}</TableCell>
                    <TableCell>{getFechaHours(perdida.fecha)}</TableCell>
                    <TableCell>{perdida.producto.nombre}</TableCell>
                    <TableCell>{perdida.cantidad}</TableCell>
                    <TableCell>$ {perdida.total.toFixed(2)}</TableCell>
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
