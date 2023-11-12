import { VenderTable } from '../components/VenderTable';
import { useEffect, useState } from 'react';
import VentaList from '../components/Vender/VentaList';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { esES } from '@mui/material/locale';
import { getListaProductos } from '../services';
import {
  Stack,
  Box,
  Grid,
} from '@mui/material';
import { Global } from '@emotion/react';
import MobileVentaList from '../components/Vender/MobileVentaList';
import { MobileVenderTable } from '../components/MobileVenderTable';
const drawerBleeding = 75;
const theme = createTheme({}, esES);
export function Vender() {
  console.log("rendering vender")
  const [tableData, setTabledata] = useState([] as Producto[]);
  const [selectedList, setSelectedList] = useState([] as VentaItem[]);
  const [loadingContent, setLoadingContent] = useState(true);
  const addProductoToList = (producto: Producto) => {
    const productoALreadyExists = selectedList.some(
      (item) => item.key === producto.codigo
    );
    if (productoALreadyExists) {
      return;
    }
    const newItem: VentaItem = {
      cantidad: 1,
      key: producto.codigo,
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
  const loadContent = () => {
    setLoadingContent(true);
    getListaProductos().then((data) => {
      setLoadingContent(false);
      setTabledata(data);
    });
  };
  useEffect(() => {
    console.log("loading content");
    loadContent();
  }, []);

  const DesktopDesign = () => (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }} height={'100%'}>
      <Grid
        container
        spacing={2}
        justifyContent="space-around"
        alignContent="stretch">
        <Grid item xs={8} >
          <Stack spacing={2} padding={'1rem'}>
            <ThemeProvider theme={theme}>
              <VenderTable
                loadingContent={loadingContent}
                onProductoSelected={addProductoToList}
                tableData={tableData}
              />
            </ThemeProvider>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <VentaList
            selectedList={selectedList}
            onListItemCantidadChange={changeCantidad}
            onListItemDeleted={removeItemFromList}
            resetList={() => setSelectedList([])}
            reloader={loadContent}
          />
        </Grid>
      </Grid>
    </Box>
  );
  const MobileDesign = () => (
        <Box sx={{ height: '100%', display: { xs: 'block', md: 'none' } }}>
          <Stack spacing={2} padding={'1rem'} height={'110%'}>
            {/* <SearchBar onProductoSearch={setSearchData} /> */}
            <MobileVenderTable
              loadingContent={loadingContent}
              onProductoSelected={addProductoToList}
              tableData={tableData}
            />
          </Stack>
          <MobileVentaList
            selectedList={selectedList}
            onListItemCantidadChange={changeCantidad}
            onListItemDeleted={removeItemFromList}
            resetList={() => setSelectedList([])}
            reloader={loadContent}
           />
        </Box>

  );
  return (
    <Box height={'100%'}>
        <Global
          styles={{
            '.MuiDrawer-root > .MuiPaper-root': {
              height: `calc(50% - ${drawerBleeding}px)`,
              overflow: 'visible',
            },
          }}
        />
        <DesktopDesign />
        <MobileDesign />
    </Box>
  );
}
