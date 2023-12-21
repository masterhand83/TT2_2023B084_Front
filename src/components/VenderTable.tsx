import React, { useEffect, useState } from 'react';
import SearchBar from './utils/SearchBar';
import TablaProductos from './Table/TablaProductos';
import { Box, Typography } from '@mui/material';
type VenderTableProps = {
  onProductoSelected: (_producto: Producto) => void;
  tableData: Producto[];
  loadingContent: boolean;
  searchData?: string;
};
function VenderTable({
  onProductoSelected,
  tableData,
  loadingContent,
}: VenderTableProps) {
  console.log('rendering vender table');
  const [searchData, setSearchData] = useState('');
  let accumulatedInput = '';
  let lastKeypressTime = 0;

  const HandleKeyPress = (event: KeyboardEvent) => {
    const currentTime = new Date().getTime();
    if (currentTime - lastKeypressTime > 500) {
      accumulatedInput = '';
    }
    lastKeypressTime = currentTime;
    if (event.key === 'Enter') {
      const producto = tableData.find(
        (producto) => producto.codigo === accumulatedInput.trim()
      );
      if (producto) {
        console.log(producto);
        onProductoSelected(producto);
      }
      //setSearchData(accumulatedInput.trim())
      console.log('accumulated input', accumulatedInput.trim());
      accumulatedInput = '';
    }
    accumulatedInput += event.key;
  };
  useEffect(() => {
    window.addEventListener('keypress', HandleKeyPress);
    return () => {
      window.removeEventListener('keypress', HandleKeyPress);
    };
  });
  return (
    <>
      <Box>
        <Typography fontWeight={'bold'} variant="h4">
          Vender
        </Typography>
        <Typography variant="h6">
          Seleccione un producto para agregarlo a la venta Actual. Use el botón
          verde para finalizar la venta.
        </Typography>
      </Box>
      <SearchBar onProductoSearch={setSearchData} />
      <TablaProductos
        displayLength={12}
        loadingContent={loadingContent}
        searchData={searchData}
        onProductoSelected={onProductoSelected}
        isRowSelectable={true}
        tableData={tableData}
      />
    </>
  );
}

export default React.memo(VenderTable);
