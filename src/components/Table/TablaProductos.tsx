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
import { formatNumber } from '../../utils/utilities';
import { orderBy } from 'lodash';
type sortItem = {
  field: string;
  direction: 'asc' | 'desc';
};

type TablaProductosProps = {
  searchData?: string;
  loadingContent: boolean;
  tableData: Producto[];
  displayLength?: number;
  isRowSelectable?: boolean;
  onProductoSelected?: (_producto: Producto) => void;
  renderActionButtons?: (_producto: Producto) => JSX.Element;
};
const includesSearchData = (searchData: string) => (producto: Producto) => {
  if (searchData === '') {
    return true;
  }
  return (
    producto.codigo.includes(searchData) ||
    producto.marca.includes(searchData) ||
    producto.nombre.includes(searchData)
  );
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
export default function TablaProductos(props: TablaProductosProps) {
  if (!props) return (<></>);
  const [page, setPage] = useState(0);
  const [sortList, setSortList] = useState<sortItem[]>([]); // [{field: 'marca', direction: 'asc'}
  const rowsPerPage = props.displayLength || 8;
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
    .filter(includesSearchData(props.searchData || ''))
    .filter((producto) => producto.activo)
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
    return filteredData.map((producto: Producto) => {
      return (
        <TableRow
          className="hover:bg-blue-50"
          key={producto.codigo}
          sx={{ cursor: props.isRowSelectable ? 'pointer' : 'auto' }}
          onClick={() =>
            props.onProductoSelected ? props.onProductoSelected(producto) : null
          }>
          <TableCell>{producto.codigo}</TableCell>
          <TableCell>{producto.nombre}</TableCell>
          <TableCell>{producto.marca}</TableCell>
          <TableCell>{producto.existencias}</TableCell>
          <TableCell>$&nbsp;{formatNumber(producto.precio_unitario)}</TableCell>
          {props.renderActionButtons ? (
            <TableCell>{props.renderActionButtons(producto)} </TableCell>
          ) : null}
        </TableRow>
      );
    });
  };
  return (
    <TableContainer component={Paper} >
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell sortDirection={'desc'}>
              <span className="font-bold">Código</span>
            </TableCell>
            <TableCell>
              <span className="font-bold">Producto</span>
              <SortButton onSortSelected={getFieldSorter('nombre')} />
            </TableCell>
            <TableCell>
              <span className="font-bold">Marca</span>
              <SortButton onSortSelected={getFieldSorter('marca')} />
            </TableCell>
            <TableCell>
              <span className="font-bold">Existencia</span>
              <SortButton onSortSelected={getFieldSorter('existencias')} />
            </TableCell>
            <TableCell>
              <span className="font-bold">Precio</span>
              <SortButton onSortSelected={getFieldSorter('precio_unitario')} />
            </TableCell>
            {props.renderActionButtons ? (
              <TableCell>
                <span className="font-bold">Acciones</span>
              </TableCell>
            ) : null}
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
                count={props.tableData? Math.ceil(
                  props.tableData
                    .filter(includesSearchData(props.searchData || ''))
                    .filter((producto) => producto.existencias != 0).length /
                    rowsPerPage
                ): 0}
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
