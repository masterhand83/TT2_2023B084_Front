import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import {
  Icon,
  Pagination,
  Paper,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material';
import { HorizontalRule, Sort } from '@mui/icons-material';
import LoadingContentRow from '../utils/LoadingContentRow';
import React, { useState } from 'react';
import { getFechaHours, getFormatedFecha } from '../../utils/utilities';
import { orderBy } from 'lodash';
import dayjs from 'dayjs';
type sortItem = {
  field: string;
  direction: 'asc' | 'desc';
};

type TablaVentasProps = {
  loadingContent: boolean;
  upperLimit: dayjs.Dayjs | null;
  lowerLimit: dayjs.Dayjs | null;
  searchData?: string;
  tableData: VistaVenta[];
  displayLength?: number;
  onRowSelected?: (_venta: VistaVenta) => void;
};

const getSortIcon = (sortDirection: 'asc' | 'desc' | 'none') => {
  if (sortDirection === 'asc') {
    return <Sort sx={{ transform: 'scaleY(-1)' }} />;
  }
  if (sortDirection === 'desc') {
    return <Sort />;
  }
  return <HorizontalRule />;
};
const SortButton = (props: {
  onSortSelected: (dir: 'asc' | 'desc' | 'none') => void;
}) => {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | 'none'>(
    'none'
  );
  const handleClick = (_event: React.MouseEvent<HTMLDivElement>) => {
    if (sortDirection === 'none') {
      setSortDirection('asc');
      props.onSortSelected('asc');
    }
    if (sortDirection === 'asc') {
      setSortDirection('desc');
      props.onSortSelected('desc');
    }
    if (sortDirection === 'desc') {
      setSortDirection('none');
      props.onSortSelected('none');
    }
  };
  return (
    <div className="inline" onClick={handleClick}>
      <Icon sx={{ marginLeft: '0.5rem', cursor: 'pointer' }}>
        {getSortIcon(sortDirection)}
      </Icon>
    </div>
  );
};
export default function TablaVentas(props: TablaVentasProps) {
  const [page, setPage] = useState(0);
  const [sortList, setSortList] = useState<sortItem[]>([]); // [{field: 'marca', direction: 'asc'}
  const rowsPerPage = props.displayLength || 8;
  const isInDateRange = (venta: VistaVenta) => {
    if (!props.lowerLimit || !props.upperLimit) return false;
    const ventaDate = dayjs(venta.fecha);
    return ventaDate.isAfter(props.lowerLimit) && ventaDate.isBefore(props.upperLimit);
  };
  const handleChangePage = (_event: any | null, newPage: number) => {
    setPage(newPage);
  };
  console.log('sort list', sortList);
  const sortedData = orderBy(
    props.tableData,
    sortList.map((s) => s.field),
    sortList.map((s) => s.direction)
  );
  const filteredData = sortedData
    .filter(isInDateRange)
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  const getFieldSorter = (field: string) => {
    return (dir: 'asc' | 'desc' | 'none') => {
      if (dir === 'none') {
        setSortList(sortList.filter((s) => s.field !== field));
        return;
      }
      setSortList(
        sortList
          .filter((s) => s.field !== field)
          .concat([{ field: field, direction: dir }])
      );
      console.log(sortList);
    };
  };
  const TableContent = () => {
    return filteredData.map((venta: VistaVenta, index: number) => {
      return (
        <TableRow
          className="hover:bg-blue-50"
          key={index}
          sx={{ cursor: props.onRowSelected ? 'pointer' : 'auto' }}
          onClick={() =>
            props.onRowSelected ? props.onRowSelected(venta) : null
          }>
          <TableCell>{getFormatedFecha(venta.fecha)}</TableCell>
          <TableCell>{getFechaHours(venta.fecha)}</TableCell>
          <TableCell>{venta.cantidad}</TableCell>
          <TableCell>$&nbsp;{venta.total}</TableCell>
        </TableRow>
      );
    });
  };
  return (
    <TableContainer component={Paper}>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell sortDirection={'desc'}>
              <span className="font-bold">Fecha</span>
              <SortButton onSortSelected={getFieldSorter('fecha')} />
            </TableCell>
            <TableCell>
              <span className="font-bold">Hora</span>
            </TableCell>
            <TableCell>
              <span className="font-bold">Núm. Productos</span>
              <SortButton onSortSelected={getFieldSorter('cantidad')} />
            </TableCell>
            <TableCell>
              <span className="font-bold">Total</span>
              <SortButton onSortSelected={getFieldSorter('total')} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.loadingContent ? (
            <LoadingContentRow colSpan={5} />
          ) : (
            <TableContent />
          )}
        </TableBody>
        <TableFooter style={{ padding: '1rem' }}>
          <TableRow>
            <TableCell colSpan={5} align="center">
              <Pagination
                count={Math.ceil(
                  props.tableData.length/rowsPerPage
                )}
                color="primary"
                shape="rounded"
                showFirstButton
                showLastButton
                onChange={(event, page) => {
                  handleChangePage(event, page - 1);
                }}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
