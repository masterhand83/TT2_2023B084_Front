import {
  ConfigProvider,
  Table,
  TableColumnType,
  TablePaginationConfig,
  TableProps,
} from 'antd';
import Search from 'antd/es/input/Search';
import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import { Producto } from '../types';
const dataSource: readonly Producto[] = [
  {
    key: 'abc',
    codigo: '112233445566',
    marca: 'Bimbo',
    nombre: 'pluma negra',
    precio: 100.2,
    stock: 300,
  },
  {
    key: 'abcd',
    codigo: '112233445567',
    marca: 'Bimbo',
    nombre: 'pluma azul',
    precio: 100.2,
    stock: 0,
  },
];
const paginationConfig: TablePaginationConfig = {
  defaultPageSize: 6,
};
const tableProps: TableProps<Producto> = {
  bordered: true,
  size: 'middle',
};
type VenderTableProps = {
  onProductoSelected: (producto:Producto) => void
}


export function VenderTable({onProductoSelected}:VenderTableProps) {
  const [tableData, setTabledata] = useState(dataSource);

  const onProductoSearch: ChangeEventHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const searchData: string = event.currentTarget.value;
    const includesSearchData = (producto: Producto) => {
      return (
        producto.codigo.includes(searchData) ||
        producto.marca.includes(searchData) ||
        producto.nombre.includes(searchData)
      );
    };
    setTabledata(dataSource.filter(includesSearchData));
  };

  const columns: TableColumnType<Producto>[] = [
    {
      title: 'Codigo',
      dataIndex: 'codigo',
      key: 'codigo',
    },
    {
      title: 'Producto',
      dataIndex: 'nombre',
      key: 'nombre',
    },
    {
      title: 'Marca',
      dataIndex: 'marca',
      key: 'marca',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Precio',
      dataIndex: 'precio',
      key: 'precio',
    },
  ];
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {},
          Modal: {},
        },
      }}>
      <div className=" space-y-2 bg-blue">
        <div className="flex space-x-2 items-center">
          <Search
            placeholder="Codigo de barras, marca o nombre del producto"
            onChange={onProductoSearch}
            size="large"
          />
        </div>
        <Table
          onRow={(record, index) =>{
            return {
              onClick: (_event) => {
                onProductoSelected(record)
              }
            }
          }}
          {...tableProps}
          dataSource={tableData}
          columns={columns}
          pagination={paginationConfig}
        />
      </div>
    </ConfigProvider>
  );
}
