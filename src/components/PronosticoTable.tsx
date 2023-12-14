import { useEffect, useState } from 'react';
import PronosticoActionGroup from './PronosticoTable/PronosticoActionGroup';
import LoadingPronosticoModal from './PronosticoTable/LoadingPronosticoModal';
import { getListaProductos } from '../services';
import { useNavigate } from 'react-router-dom';
import SearchBar from './utils/SearchBar';
import TablaProductos from './Table/TablaProductos';
//const dataSource: readonly Producto[] = productosData;

export function PronosticoTable() {
  const [tableData, setTabledata] = useState([] as Producto[]);
  const [openPronosticoModal, setOpenPronosticoModal] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState<Producto | null>(
    null
  );
  const [searchData, setSearchData] = useState('' as string);
  const [isLoading, setIsLoading] = useState(false);
  const onProductoSearch = (data: string) => {
    setSearchData(data);
  };

  const openModal = (action: string, producto: Producto) => {
    setSelectedProducto(producto);
    console.log(producto);
    if (action === 'history') {
      navigate('/pagina-historial', {
        state: { producto },
      });
    }
    if (action === 'forecast') {
      navigate('/pagina-pronostico', {
        state: { producto },
      })
    }
  };
  useEffect(() => {
    setIsLoading(true);
    getListaProductos().then((data) => {
      setIsLoading(false);
      setTabledata(data);
    });
  }, []);
  const navigate = useNavigate();
  return (
    <div className="w-[75%] space-y-2">
      <div className="flex space-x-2 items-center">
        <SearchBar onProductoSearch={onProductoSearch} />
      </div>
      <TablaProductos
        tableData={tableData}
        displayLength={5}
        searchData={searchData}
        loadingContent={isLoading}
        renderActionButtons={(producto: Producto) => (
          <PronosticoActionGroup
            producto={producto}
            onAction={(action) => openModal(action, producto)}
          />
        )}

      />
      <LoadingPronosticoModal
        currentProducto={selectedProducto}
        isOpen={openPronosticoModal}
        setIsOpen={setOpenPronosticoModal}
      />
    </div>
  );
}
