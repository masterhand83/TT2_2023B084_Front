import {
  FormControl,
  Stack,
  TextField,
  OutlinedInput,
  Box,
  InputAdornment,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Form, Formik } from 'formik';
import type { FormikProps } from 'formik';
import * as Yup from 'yup';
import { addProducto, getAllMarcas } from '../../services';

const AddProductoValidation = Yup.object().shape({
  codigo: Yup.string()
    .required('El código es requerido')
    .max(20, 'El código debe tener menos de 20 caracteres'),
  nombre: Yup.string().required('El nombre es requerido'),
  marca: Yup.string()
    .required('La marca es requerida'),
  existencias: Yup.number()
    .positive('Las existencias deben ser positivas')
    .integer('Las existencias deben ser un número entero'),
  precio_unitario: Yup.number()
    .positive('El precio debe ser positivo')
    .min(0.01, 'El precio debe ser mayor a 0')
    .required('El precio es requerido'),
});

const buttonStyle =
  'text-white px-4 py-2 mx-2 rounded font-bold bg-green-500' + ' ';
const formModal = Swal.mixin({
  customClass: {
    confirmButton: buttonStyle + 'bg-green-500',
    cancelButton: buttonStyle + 'bg-red-500',
  },
  buttonsStyling: false,
});
export function openAddProductoModal(reloader: () => void) {
  const defaultProducto: Producto = {
    codigo: '',
    nombre: '',
    marca: '',
    key: '',
    activo: true,
    existencias: 1,
    precio_unitario: 0.01,
  };
  let formikRef: FormikProps<Producto> | null = null;

  const swalert = withReactContent(formModal);
  return swalert.fire({
    title: 'Agregar Producto',
    allowEnterKey: false,
    html: (
      <Formik<Producto>
        innerRef={(ref) => (formikRef = ref)}
        initialValues={defaultProducto}
        validationSchema={AddProductoValidation}
        onSubmit={() => {}}
        render={(props) => {
          const [marcas, setMarcas] = useState<Marca[]>([]);
          useEffect(() => {
            getAllMarcas().then((response) => {
              setMarcas(response);
            });
          }, []);
          return (
            <div className="my-4">
              <Form>
                <Stack spacing={4}>
                  <TextField
                    id="codigo"
                    name="codigo"
                    label="* Código"
                    value={props.values.codigo}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    error={props.touched.codigo && Boolean(props.errors.codigo)}
                    helperText={props.touched.codigo && props.errors.codigo}
                  />
                  <TextField
                    fullWidth
                    id="nombre"
                    name="nombre"
                    label="* Nombre del producto"
                    value={props.values.nombre}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    error={props.touched.nombre && Boolean(props.errors.nombre)}
                    helperText={props.touched.nombre && props.errors.nombre}
                  />
                  <FormControl>
                    <InputLabel htmlFor="marca">Marca</InputLabel>
                    <Select
                      value={props.values.marca}
                      onChange={props.handleChange}
                      name="marca"
                      label="* Marca"
                    error={props.touched.marca && Boolean(props.errors.marca)}
                      >
                      {marcas.map((marca) => (
                        <MenuItem value={marca.id}>{marca.marca}</MenuItem>
                      ))}
                    </Select>
                    {props.touched.marca &&
                      props.errors.marca && (
                        <FormHelperText error>
                          {props.errors.precio_unitario}
                        </FormHelperText>
                      )}
                  </FormControl>

                  <Stack direction="row" spacing={1}>
                    <Box>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="precio_unitario">
                          Precio Unitario
                        </InputLabel>
                        <OutlinedInput
                          fullWidth
                          id="precio_unitario"
                          name="precio_unitario"
                          title="Precio Unitario"
                          label="Precio Unitario"
                          type="number"
                          startAdornment={
                            <InputAdornment position="start">$</InputAdornment>
                          }
                          value={props.values.precio_unitario}
                          onChange={(e) => {
                            console.log(Number(e.target.value));
                            if (Number(e.target.value) < 0) {
                              e.preventDefault();
                              return;
                            }
                            props.handleChange(e);
                          }}
                          onBlur={props.handleBlur}
                          error={
                            props.touched.precio_unitario &&
                            Boolean(props.errors.precio_unitario)
                          }
                        />
                        {props.touched.precio_unitario &&
                          props.errors.precio_unitario && (
                            <FormHelperText error>
                              {props.errors.precio_unitario}
                            </FormHelperText>
                          )}
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="precio_unitario">
                          Existencias
                        </InputLabel>
                        <OutlinedInput
                          fullWidth
                          id="existencias"
                          name="existencias"
                          label="Existencias"
                          type="number"
                          value={props.values.existencias}
                          onChange={(e) => {
                            console.log(Number(e.target.value));
                            if (Number(e.target.value) < 1) {
                              e.preventDefault();
                              return;
                            }
                            props.handleChange(e);
                          }}
                          onBlur={props.handleBlur}
                          error={
                            props.touched.existencias &&
                            Boolean(props.errors.existencias)
                          }
                        />
                        {props.touched.existencias &&
                          props.errors.existencias && (
                            <FormHelperText error>
                              {props.errors.existencias}
                            </FormHelperText>
                          )}
                      </FormControl>
                    </Box>
                  </Stack>
                </Stack>
              </Form>
            </div>
          );
        }}></Formik>
    ),
    confirmButtonText: 'Agregar',
    cancelButtonText: 'Cancelar',
    showCancelButton: true,
    reverseButtons: true,
    didOpen: () => {
      formikRef?.resetForm();
      Swal.getPopup()?.querySelector('input')?.focus();
    },
    preConfirm: async () => {
      if(!formikRef){
        return
      }
      await formikRef.submitForm();
      if (formikRef.isValid) {
        addProducto(formikRef.values).then((_res) => {
          Swal.fire({
            title: 'Producto agregado',
            icon: 'success',
            didClose: () => {
              reloader();
            }
          });
        })
      } else {
        Swal.showValidationMessage('Por favor, corrija los errores');
      }
    }
  });
}
