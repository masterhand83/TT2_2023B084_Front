import {
  ConfigProvider,
  Form,
  Input,
  Modal,
  Table,
  TableColumnType,
  TablePaginationConfig,
  TableProps,
} from 'antd';
import Search from 'antd/es/input/Search';
import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import { CrearIcono } from './Iconos';
import { Producto } from '../types';
import ProductoActionGroup from './ProductoActionGroup';
import FormItem from 'antd/es/form/FormItem';
import AddProductoModal from './InventarioTable/AddProductoModal';
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
// const ProductoActionGroup = (
//   _value: undefined,
//   { stock }: Producto,
//   _index: number
// ) => {
//   return (
//     <div className="flex space-x-4">
//       <button className="bg-success text-white rounded p-1 ">
//         <AgregarIcono />
//       </button>
//       <button className="bg-warning text-white rounded p-1">
//         <EditarIcono />
//       </button>
//       {stock > 0 ? (
//         <button className="bg-danger text-white rounded p-1">
//           <MinusIcono />
//         </button>
//       ) : (
//         <button className="bg-danger text-white rounded p-1">
//           <BasuraIcono />
//         </button>
//       )}
//     </div>
//   );
// };
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

const addProduct = () => {};

export function InventarioTable() {
  const [tableData, setTabledata] = useState(dataSource);
  const [isAddProductoModalOpen, setAddProductoModalOpen] = useState(false);

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
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {},
          Modal: {},
        },
      }}>
      <div className="w-[75%] space-y-2">
        <div className="flex space-x-2 items-center">
          <Search
            placeholder="Codigo de barras, marca o nombre del producto"
            onChange={onProductoSearch}
            size="large"
          />
          <button
            onClick={() => setAddProductoModalOpen(true)}
            className="bg-success text-white p-2 rounded">
            <CrearIcono />
          </button>
        </div>
        <Table
          {...tableProps}
          dataSource={tableData}
          columns={columns}
          pagination={paginationConfig}
        />
        <AddProductoModal isOpen={isAddProductoModalOpen} setIsOpen={setAddProductoModalOpen}/>
      </div>
    </ConfigProvider>
  );
}
