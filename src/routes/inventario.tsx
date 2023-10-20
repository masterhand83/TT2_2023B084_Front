import { InventarioTable } from '../components/InventarioTable';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { PlaylistAdd } from '@mui/icons-material';
import SearchBar from '../components/utils/SearchBar';
import { Container, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { getListaProductos } from '../services';
import AddProductoModal from '../components/InventarioTable/AddProductoModal';
import AddMarcaModal from '../components/InventarioTable/AddMarcaModal';

export function Inventario() {
  const [tableData, setTabledata] = useState([] as Producto[]);
  const [ladingContent, setLoadingContent] = useState(false);
  const [isAddProductoModalOpen, setAddProductoModalOpen] = useState(false);
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
        <button
          onClick={() => setAddProductoModalOpen(true)}
          className="bg-green-500 text-white px-3 rounded">
          <AddBusinessIcon />
        </button>
        <button
          onClick={() => setAddMarcaOpen(true)}
          className="bg-green-500 text-white px-3 rounded">
          <PlaylistAdd />
        </button>
      </Stack>
      <InventarioTable
        loadingContent={ladingContent}
        loadContent={loadContent}
        tableData={tableData}
        searchParameter={searchData}
      />
      <AddProductoModal
        isOpen={isAddProductoModalOpen}
        setIsOpen={setAddProductoModalOpen}
        reloader={loadContent}
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
