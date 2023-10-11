import { Divider } from '@mui/material';
import SelectedProductoItem from './SelectedProductoItem';
import { useState } from 'react';
import { pipe, map, sum } from 'ramda';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
type VentaListProps = {
  selectedList: VentaItem[];
  onListItemCantidadChange: (_item: VentaItem, _value: number) => void;
  onListItemDeleted: (_item: VentaItem) => void;
};
const hacerVenta = () => {
  const swal = withReactContent(Swal);
  swal.fire({
      title: '¿Desea hacer la venta?',
      text: '¿Estás seguro de que deseas confirmar la venta de estos productos?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return fetch('https://api.ipify.org?format=json')
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .catch((error) => {
            swal.showValidationMessage(`Request failed: ${error}`);
          });
      },
    })
    .then((result) => {
      if (result.isConfirmed) {
        console.log(result.value);
        swal.fire({
          title: `Guardado exitoso`,
          icon: 'success',
        });
      }
    });
};
export default function VentaList({
  selectedList,
  onListItemCantidadChange,
  onListItemDeleted,
}: VentaListProps) {
  const obtenerPrecioTotal = pipe(
    map((item: VentaItem) => item.producto.precio * item.cantidad),
    sum
  );
  const obtenerCantidadTotal = pipe(
    map((item: VentaItem) => item.cantidad),
    sum
  );
  const cantidadTotal = obtenerCantidadTotal(selectedList);
  const precioTotal = obtenerPrecioTotal(selectedList).toFixed(2);
  const ListHeader = () => (
    <div className="px-6 py-4">
      <Divider />
      <h1 className="text-2xl font-bold my-4">Nueva venta</h1>
      <Divider />
    </div>
  );
  const ListOfProducts = () =>
    selectedList.map((item, index) => (
      <SelectedProductoItem
        key={index}
        item={item}
        onCantidadChange={(value) => onListItemCantidadChange(item, value)}
        onDelete={() => onListItemDeleted(item)}
      />
    ));
  const VentaResumen = () => (
    <div className="flex p-8 hover:cursor-pointer" onClick={hacerVenta}>
      <div className="font-bold">
        <h1 className="text-3xl">Precio</h1>
        <h1 className="text-green-300">productos: {cantidadTotal}</h1>
      </div>
      <div className="ml-auto">
        <h1 className="text-5xl">$ {precioTotal}</h1>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex-none">
        <ListHeader />
      </div>
      <div className="px-10 py-1 overflow-y-auto grow">
        <ListOfProducts />
      </div>
      <div className="items-center mt-auto bg-green-600  text-white flex-none">
        <VentaResumen />
      </div>
      {/* <HacerVentaModal
        listaVentas={selectedList}
        isOpen={openModal}
        setIsOpen={setOpenModal}
      /> */}
    </div>
  );
}
