import { VenderTable } from '../components/VenderTable';
import { useState } from 'react';
import { Producto, VentaItem } from '../types';
import VentaList from '../components/Vender/VentaList';

export function Vender() {
  const [selectedList, setSelectedList] = useState([] as VentaItem[]);
  const addProductoToList = (producto: Producto) => {
    if (selectedList.some((item) => item.key === producto.codigo)) {
      return;
    }
    const newItem: VentaItem = {
      cantidad: 1,
      key: producto.key,
      producto: producto,
    };
    const newList: VentaItem[] = [...selectedList, newItem];
    setSelectedList(newList);
  };
  const changeCantidad = (item: VentaItem, value: number) => {
    const newItem: VentaItem = {
      cantidad: value,
      key: item.key,
      producto: item.producto,
    };
    setSelectedList(
      selectedList.map((listitem) => {
        if (item.key == listitem.key) {
          return newItem;
        }
        return listitem;
      })
    );
  };
  const removeItemFromList = (item: VentaItem) => {
    setSelectedList(
      selectedList.filter((listitem) => {
        return listitem.key != item.key;
      })
    );
  };
  return (
    <div className="grid grid-cols-3 grid-rows-1 bg-black items-right h-full">
      <div className="mr-9 ml-10 mt-[3rem] col-span-2">
        <VenderTable onProductoSelected={addProductoToList} />
      </div>
      <div className="bg-slate-200">
        <VentaList
          selectedList={selectedList}
          onListItemCantidadChange={changeCantidad}
          onListItemDeleted={removeItemFromList}
        />
      </div>
    </div>
  );
}
