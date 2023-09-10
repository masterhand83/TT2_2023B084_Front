import {
  ConfigProvider,
  Table,
  TableColumnType,
  TablePaginationConfig,
  TableProps,
} from 'antd';
import Search from 'antd/es/input/Search';
import { ChangeEvent, ChangeEventHandler, useState } from 'react';
type Producto = {
  key: string;
  codigo: string;
  nombre: string;
  marca: string;
  stock: number;
  precio: number;
};
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
    codigo: '112233445566',
    marca: 'Bimbo',
    nombre: 'pluma azul',
    precio: 100.2,
    stock: 0,
  },
];
const AgregarIcono = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6">
      <path
        fillRule="evenodd"
        d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
        clipRule="evenodd"
      />
    </svg>
  );
};
const EditarIcono = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6">
      <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
    </svg>
  );
};
const MinusIcono = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6">
      <path
        fillRule="evenodd"
        d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z"
        clipRule="evenodd"
      />
    </svg>
  );
};
const BasuraIcono = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6">
      <path
        fillRule="evenodd"
        d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
        clipRule="evenodd"
      />
    </svg>
  );
};
const CrearIcono = () => {
  return (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
</svg>

  )
}
const ProductoActionGroup = (
  _value: undefined,
  { stock }: Producto,
  _index: number
) => {
  return (
    <div className="flex space-x-4">
      <button className="bg-success text-white rounded p-1 ">
        <AgregarIcono />
      </button>
      <button className="bg-warning text-white rounded p-1">
        <EditarIcono />
      </button>
      {stock > 0 ? (
        <button className="bg-danger text-white rounded p-1">
          <MinusIcono />
        </button>
      ) : (
        <button className="bg-danger text-white rounded p-1">
          <BasuraIcono />
        </button>
      )}
    </div>
  );
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
  {
    title: 'Acciones',
    dataIndex: 'accion',
    key: 'accion',
    render: ProductoActionGroup,
  },
];
const paginationConfig: TablePaginationConfig = {
  defaultPageSize: 6,
};
const tableProps: TableProps<Producto> = {
  bordered: true,
  size: 'middle',
};
export function InventarioTable() {
  const  [tableData, setTabledata] = useState(dataSource)
  const onProductoSearch:ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const searchData:string = event.currentTarget.value
    setTabledata(dataSource.filter((producto: Producto) => {
      return producto.codigo.includes(searchData)
        || producto.marca.includes(searchData)
        || producto.nombre.includes(searchData)
    }))
  }
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {},
        },
      }}>
      <div className="w-[75%] space-y-2">
        <div className='flex space-x-2 items-center'>
          <Search
            placeholder='Codigo de barras, marca o nombre del producto'
            onChange={onProductoSearch}
            size='large'
            />
            <button className='bg-success text-white p-2 rounded'><CrearIcono/></button>
        </div>
        <Table
          {...tableProps}
          dataSource={tableData}
          columns={columns}
          pagination={paginationConfig}
        />
      </div>
    </ConfigProvider>
  );
}
