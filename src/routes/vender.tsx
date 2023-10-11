import { VenderTable } from '../components/VenderTable';
import { useState } from 'react';
import VentaList from '../components/Vender/VentaList';
import{createTheme, ThemeProvider} from '@mui/material/styles';
import { esES } from '@mui/material/locale'

const theme = createTheme({
}, esES);
export function Vender() {
  const [selectedList, setSelectedList] = useState([] as VentaItem[]);
  const addProductoToList = (producto: Producto) => {
    const productoALreadyExists = selectedList.some(
      (item) => item.key === producto.codigo
    );
    if (productoALreadyExists) {
      return;
    }
    const newItem: VentaItem = {
      cantidad: 1,
      key: producto.key,
      producto: producto,
    };
    const updatedList: VentaItem[] = selectedList.concat(newItem);
    setSelectedList(updatedList);
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
    <div className="grid grid-cols-3 grid-rows-1 items-right h-full">
      <div className="mr-9 ml-10 mt-[3rem] col-span-2">
        <ThemeProvider theme={theme}>
          <VenderTable onProductoSelected={addProductoToList} />
        </ThemeProvider>
      </div>
      <div className="bg-stone-100 border-l border-slate-300">
        <VentaList
          selectedList={selectedList}
          onListItemCantidadChange={changeCantidad}
          onListItemDeleted={removeItemFromList}
        />
      </div>
    </div>
  );
}
