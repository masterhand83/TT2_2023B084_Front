import {
  ConfigProvider,
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
import AddProductoModal from './InventarioTable/AddProductoModal';
import AddStockModal from './InventarioTable/AddStockModal';
import EditProductoModal from './InventarioTable/EditProductoModal';
import AddMermaModal from './InventarioTable/AddMermaModal';
import DeleteProductoModal from './InventarioTable/DeleteProductoModal';
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
const paginationConfig: TablePaginationConfig = {
  defaultPageSize: 6,
};
const tableProps: TableProps<Producto> = {
  bordered: true,
  size: 'middle',
};


export function InventarioTable() {
  const [tableData, setTabledata] = useState(dataSource);
  const [isAddProductoModalOpen, setAddProductoModalOpen] = useState(false);
  const [isAddStockOpen, setAddStockOpen] = useState(false);
  const [isAddMermaOpen, setAddMermaOpen] = useState(false);
  const [isEditProductoOpen, setEditProductoOpen] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState({} as Producto)
  const [isdeleteProductoOpen, setDeleteProductoOpen] = useState(false)

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
    {
      title: 'Acciones',
      dataIndex: 'accion',
      key: 'accion',
      render: (_value:undefined, producto:Producto, _index:number) => {
        return <ProductoActionGroup producto={producto} onAction={(action) =>{
          setSelectedProducto(producto)
          if(action === 'add'){
            setAddStockOpen(true)
          }
          if(action === 'edit'){
            setEditProductoOpen(true)
          }
          if(action === 'remove') {
            setAddMermaOpen(true)
          }
          if(action === 'delete') {
            setDeleteProductoOpen(true)
          }
        }} />

      },
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
        <AddStockModal isOpen={isAddStockOpen} setIsOpen={setAddStockOpen} currentProducto={selectedProducto} />
        <EditProductoModal isOpen={isEditProductoOpen} setIsOpen={setEditProductoOpen} currentProducto={selectedProducto}/>
        <AddMermaModal isOpen={isAddMermaOpen} setIsOpen={setAddMermaOpen} currentProducto={selectedProducto}/>
        <DeleteProductoModal isOpen={isdeleteProductoOpen} setIsOpen={setDeleteProductoOpen} currentProducto={selectedProducto}/>
      </div>
    </ConfigProvider>
  );
}
