import {
  Box,
  Button,
  Grid,
  Stack,
  SwipeableDrawer,
  Typography,
  styled,
} from '@mui/material';
import SelectedProductoItem from './SelectedProductoItem';
import { pipe, map, sum } from 'ramda';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { hacerCompra } from '../../services';
import { useState } from 'react';
const StyledBox = styled(Box)((_props) => ({
  backgroundColor: '#f5f5f4',
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.primary.main,
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));
type VentaListProps = {
  selectedList: VentaItem[];
  onListItemCantidadChange: (_item: VentaItem, _value: number) => void;
  onListItemDeleted: (_item: VentaItem) => void;
  resetList: () => void;
  reloader: () => void;
};
export default function MobileVentaList({
  selectedList,
  onListItemCantidadChange,
  onListItemDeleted,
  resetList,
  reloader,
}: VentaListProps) {
  const obtenerPrecioTotal = pipe(
    map((item: VentaItem) => item.producto.precio_unitario * item.cantidad),
    sum
  );
  const obtenerCantidadTotal = pipe(
    map((item: VentaItem) => item.cantidad),
    sum
  );
  const cantidadTotal = obtenerCantidadTotal(selectedList);
  const precioTotal = obtenerPrecioTotal(selectedList).toFixed(2);
  const hacerVenta = (lista: VentaItem[]) => {
    console.log(lista);
    const swal = withReactContent(Swal);
    swal
      .fire({
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
          return hacerCompra(lista)
            .then((response) => {
              return response;
            })
            .catch((error) => {
              swal.showValidationMessage(`Request failed: ${error}`);
            });
        },
      })
      .then((result) => {
        if (result.isConfirmed) {
          console.log(result.value);
          resetList();
          reloader();
          swal.fire({
            title: `Guardado exitoso`,
            icon: 'success',
          });
        }
      });
  };

  const container =
    window !== undefined ? () => window.document.body : undefined;
  const [open, setOpen] = useState(false);
  const drawerBleeding = 75;
  return (
    <SwipeableDrawer
      container={container}
      anchor="bottom"
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      swipeAreaWidth={drawerBleeding}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: true,
      }}>
      <StyledBox
        sx={{
          visibility: { xs: 'visible', md: 'hidden' },
          position: 'absolute',
          top: -drawerBleeding,
          borderTop: '1px solid #dadce0',
          borderTopRightRadius: 8,
          borderTopLeftRadius: 8,
          right: 0,
          left: 0,
        }}>
        <Puller />
        <Stack sx={{ p: 2 }}>
          <Typography sx={{ color: 'black' }}>
            Productos:{' '}
            {cantidadTotal}
          </Typography>
          <Typography sx={{ color: 'black' }}>
            Total: $&nbsp;
            {precioTotal}
          </Typography>
        </Stack>
      </StyledBox>
      <StyledBox
        sx={{
          overflow: 'auto',
          px: 2,
          pb: 2,
          height: '100%',
        }}>
        <Grid container height={'100%'}>
          <Grid item xs={12}>
            <Box sx={{ maxHeight: '200px', overflowY: 'auto' }}>
              {selectedList.map((item, index) => (
                <SelectedProductoItem
                  key={index}
                  item={item}
                  onCantidadChange={(value) =>
                    onListItemCantidadChange(item, value)
                  }
                  onDelete={() => onListItemDeleted(item)}
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button
              color="success"
              onClick={() => {
                hacerVenta(selectedList);
                setOpen(false);
              }}
              variant="contained"
              disabled={selectedList.length <= 0}
              sx={{
                width: '100%',
              }}>
              Finalizar Compra
            </Button>
          </Grid>
        </Grid>
      </StyledBox>
    </SwipeableDrawer>
  );
}
