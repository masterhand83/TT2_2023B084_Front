import { InventarioTable } from '../components/InventarioTable';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { PlaylistAdd } from '@mui/icons-material';
import SearchBar from '../components/utils/SearchBar';
import { Container, Stack, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { getListaProductos } from '../services';
import AddMarcaModal from '../components/InventarioTable/AddMarcaModal';
import { openAddProductoModal, openMarcaModal } from '../components/modales/inventarioModales';

export function Inventario() {
  const [tableData, setTabledata] = useState([] as Producto[]);
  const [ladingContent, setLoadingContent] = useState(false);
  const [isAddMarcaOpen, setAddMarcaOpen] = useState(false);
  const [searchData, setSearchData] = useState('');
  const loadContent = () => {
    setLoadingContent(true);
    getListaProductos().then((response) => {
      setTabledata(response);
      console.log(response);
      setLoadingContent(false);
    });
  };
  useEffect(() => {
    loadContent();
  }, []);
  return (
    <Container sx={{ marginTop: '5rem' }}>
      <Stack
        direction={'row'}
        className="flex"
        flexGrow={1}
        spacing={'10px'}
        sx={{ marginBottom: '1rem' }}>
        <SearchBar onProductoSearch={setSearchData} />
        <Tooltip title="Agregar producto">
        <button
          onClick={() => openAddProductoModal(loadContent)}
          className="bg-green-500 text-white px-4 rounded">
          <AddBusinessIcon />
        </button>
        </Tooltip>
        <Tooltip title="Agregar marca">
        <button
          onClick={() => openMarcaModal()}
          className="bg-teal-500 text-white px-4 rounded">
          <PlaylistAdd />
        </button>
        </Tooltip>
      </Stack>
      <InventarioTable
        loadingContent={ladingContent}
        loadContent={loadContent}
        tableData={tableData}
        searchParameter={searchData}
      />
      <AddMarcaModal isOpen={isAddMarcaOpen} setIsOpen={setAddMarcaOpen} />
    </Container>
    // <div className="flex flex-col w-full items-center space-y-4 py-[6rem] ">
    //   <ThemeProvider theme={theme}>
    //     <InventarioTable />
    //   </ThemeProvider>
    // </div>
  );
}
