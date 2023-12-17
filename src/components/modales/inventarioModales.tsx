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
import { addProducto, addStockProduct, desactivarProducto, editarProducto, getAllMarcas, removeStock } from '../../services';

const AddProductoValidation = Yup.object().shape({
  codigo: Yup.string()
    .required('El código es requerido')
    .max(20, 'El código debe tener menos de 20 caracteres'),
  nombre: Yup.string().required('El nombre es requerido'),
  marca: Yup.string().required('La marca es requerida'),
  existencias: Yup.number()
    .positive('Las existencias deben ser positivas')
    .integer('Las existencias deben ser un número entero'),
  precio_unitario: Yup.number()
    .positive('El precio debe ser positivo')
    .min(0.01, 'El precio debe ser mayor a 0')
    .required('El precio es requerido'),
});
const getEditProductoValidation = () => {
  return Yup.object().shape({
    codigo: Yup.string()
      .required('El código es requerido')
      .max(20, 'El código debe tener menos de 20 caracteres'),
    nombre: Yup.string().required('El nombre es requerido'),
    marca: Yup.number()
      .required('La marca es requerida')
      .typeError('Debe de seleccionar una marca'),
    existencias: Yup.number()
      .positive('Las existencias deben ser positivas')
      .moreThan(0, 'Las existencias deben ser mayor a 0')
      .integer('Las existencias deben ser un número entero'),
    precio_unitario: Yup.number()
      .positive('El precio debe ser positivo')
      .min(0.01, 'El precio debe ser mayor a 0')
      .required('El precio es requerido'),
  });
};
const getAddMermaValidation = (existencias: number) => {
  return Yup.object().shape({
    merma: Yup.number()
      .positive('La merma debe ser positiva')
      .integer('La merma debe ser un número entero')
      .typeError('La merma debe ser un número')
      .moreThan(0, 'La merma debe ser mayor a 0')
      .lessThan(existencias + 1, 'La merma no puede ser mayor a las existencias')
      .required('La merma es requerida'),
  });
};
const getAddStockValidation = (_existencias: number) => {
  return Yup.object().shape({
    newstock: Yup.number()
      .positive('Las existencias debe ser positiva')
      .integer('Las existencias debe ser un número entero')
      .typeError('Las existencias debe ser un número')
      .moreThan(0, 'Las existencias debe ser mayor a 0')
      .required('Las existencias es requerida'),
  });
};
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
                    onChange={(e) => {
                      if (
                        !/^[a-zA-Z0-9]*$/.test(e.target.value) &&
                        e.target.value !== ''
                      ) {
                        e.preventDefault();
                        return;
                      }
                      props.handleChange(e)
                    }}
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
                      error={
                        props.touched.marca && Boolean(props.errors.marca)
                      }>
                      {marcas.map((marca) => (
                        <MenuItem value={marca.id}>{marca.marca}</MenuItem>
                      ))}
                    </Select>
                    {props.touched.marca && props.errors.marca && (
                      <FormHelperText error>
                        {props.errors.marca}
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
      if (!formikRef) {
        return;
      }
      await formikRef.submitForm();
      if (formikRef.isValid) {
        addProducto(formikRef.values).then((_res) => {
          Swal.fire({
            title: 'Producto agregado',
            icon: 'success',
            didClose: () => {
              reloader();
            },
          });
        });
      } else {
        Swal.showValidationMessage('Por favor, corrija los errores');
      }
    },
  });
}

export function openEditProductoModal(
  producto: Producto,
  reloader: () => void,
  marcas: Marca[]
) {
  const defaultProduct: ProductoInput = {
    key: producto.key,
    codigo: producto.codigo,
    nombre: producto.nombre,
    marca: marcas.find((marca) => marca.marca === producto.marca)?.id || 0,
    existencias: producto.existencias,
    precio_unitario: producto.precio_unitario,
  };
  let formikRef: FormikProps<ProductoInput> | null = null;

  const swalert = withReactContent(formModal);
  swalert.fire({
    title: 'Editar Producto',
    allowEnterKey: false,
    confirmButtonText: 'Editar',
    cancelButtonText: 'Cancelar',
    showCancelButton: true,
    reverseButtons: true,
    html: (
      <Formik<ProductoInput>
        innerRef={(ref) => (formikRef = ref)}
        initialValues={defaultProduct}
        validationSchema={getEditProductoValidation()}
        onSubmit={() => {}}
        render={(props) => {
          return (
            <div className="my-4">
              <Form>
                <Stack spacing={6}>
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
                    <InputLabel
                      sx={{ position: 'absolute', top: '-10px' }}
                      htmlFor="marca">
                      Marca(original: {producto.marca})
                    </InputLabel>
                    <Select
                      value={props.values.marca}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      name="marca"
                      error={
                        props.touched.marca && Boolean(props.errors.marca)
                      }>
                      {marcas.map((marca) => (
                        <MenuItem key={marca.id} value={marca.id}>
                          {marca.marca}
                        </MenuItem>
                      ))}
                    </Select>
                    {props.touched.marca && props.errors.marca && (
                      <FormHelperText error>
                        {props.errors.marca}
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
                  </Stack>
                </Stack>
              </Form>
            </div>
          );
        }}></Formik>
    ),
    didOpen: () => {
      formikRef?.resetForm();
      Swal.getPopup()?.querySelector('input')?.focus();
    },
    preConfirm: async () => {
      if (!formikRef) {
        Swal.showValidationMessage('Por favor, ingrese la información.');
        return;
      }
      await formikRef.submitForm();
      if (formikRef.isValid) {
        editarProducto(formikRef.values).then((_res) => {
          Swal.fire({
            title: 'Producto editado.',
            icon: 'success',
            didClose: () => {
              reloader();
            },
          });
        });
      } else {
        Swal.showValidationMessage('Por favor, corrija los errores');
      }
    },
  });
}

export function openAddMermaModal(producto: Producto, reloader: () => void) {
  let defaultInput: MermaInput = {
    codigo: producto.codigo,
    merma: 1,
  };

  let formikRef: FormikProps<MermaInput> | null = null;

  const swalert = withReactContent(formModal);
  swalert.fire({
    title: 'Agregar Merma',
    allowEnterKey: false,
    confirmButtonText: 'Agregar',
    cancelButtonText: 'Cancelar',
    showCancelButton: true,
    reverseButtons: true,
    html: (
      <Formik<MermaInput>
        innerRef={(ref) => (formikRef = ref)}
        initialValues={defaultInput}
        validationSchema={getAddMermaValidation(producto.existencias)}
        onSubmit={() => {}}
        render={(props) => {
          return (
            <div className="my-4">
              <Form>
                <Stack spacing={2}>
                  <Box>
                    <p className='text-justify'>
                      La <b>merma</b> representa una manera de reportar pérdidas en el
                      inventario que no están asociadas con las ventas y pueden
                      deberse a <b>caducidad, robo, extravío o errores en el
                      conteo</b>.
                    </p>
                  </Box>
                  <Box>
                    <Stack  spacing={0}>
                        <p className='text-justify'>
                          <b>Producto:</b> {producto.nombre}
                          </p>
                        <p className='text-justify'>
                          <b>Existencias actuales:</b> {producto.existencias}
                        </p>
                    </Stack>
                  </Box>
                  <Box>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="precio_unitario">Merma</InputLabel>
                      <OutlinedInput
                        fullWidth
                        id="merma"
                        name="merma"
                        title="Merma"
                        label="Merma"
                        type="number"
                        value={props.values.merma}
                        onChange={(e) => {
                          if (Number(e.target.value) < 0) {
                            e.preventDefault();
                            return;
                          }
                          props.handleChange(e);
                        }}
                        onBlur={props.handleBlur}
                        error={
                          props.touched.merma && Boolean(props.errors.merma)
                        }
                      />
                      {props.touched.merma && props.errors.merma && (
                        <FormHelperText error>
                          {props.errors.merma}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Box>
                </Stack>
              </Form>
            </div>
          );
        }}></Formik>
    ),
    didOpen: () => {
      formikRef?.resetForm();
      Swal.getPopup()?.querySelector('input')?.focus();
    },
    preConfirm: async () => {
      if (!formikRef) {
        Swal.showValidationMessage('Por favor, ingrese la información.');
        return;
      }
      await formikRef.submitForm();
      if (formikRef.isValid) {
        const values = formikRef.values;
        formModal.fire({
          title: '¿Esta seguro?',
          icon: 'warning',
          text: 'Cuando Agrega merma se sustraen las existencias del producto, no se puede deshacer esta acción.',
          showCancelButton: true,
          confirmButtonText: 'Si, estoy seguro',
          cancelButtonText: 'Cancelar',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            const SuccessResumen = () => {
              return (
                <p>
                  <b>Producto:</b> {producto.nombre}
                  <br />
                  <b>Merma sustraida:</b> {values.merma  || 0}
                </p>
              )
            }
            removeStock(values).then((_res) => {
              swalert.fire({
                title: 'Merma agregada.',
                icon: 'success',
                html:  <SuccessResumen/>,
                didClose: () => {
                  reloader();
                },
              });
            })
          }
        })
      } else {
        Swal.showValidationMessage('Por favor, corrija los errores');
      }
    },
  });
}

export function openAddStockModal(producto: Producto, reloader: () => void) {
  let defaultInput: StockInput = {
    codigo: producto.codigo,
    newstock: 1,
  };

  let formikRef: FormikProps<StockInput> | null = null;

  const swalert = withReactContent(formModal);
  swalert.fire({
    title: 'Agregar Existencias',
    allowEnterKey: false,
    confirmButtonText: 'Agregar',
    cancelButtonText: 'Cancelar',
    showCancelButton: true,
    reverseButtons: true,
    html: (
      <Formik<StockInput>
        innerRef={(ref) => (formikRef = ref)}
        initialValues={defaultInput}
        validationSchema={getAddStockValidation(producto.existencias)}
        onSubmit={() => {}}
        render={(props) => {
          return (
            <div className="my-4">
              <Form>
                <Stack spacing={2}>
                  <Box>
                    <p className='text-justify'>
                      Aqui puede agregar existencias al producto, por ejemplo, si se
                      recibió una nueva partida de productos o se corrigió un error
                      en el conteo.
                    </p>
                  </Box>
                  <Box>
                    <Stack  spacing={0}>
                        <p className='text-justify'>
                          <b>Producto:</b> {producto.nombre}
                          </p>
                        <p className='text-justify'>
                          <b>Existencias actuales:</b> {producto.existencias}
                        </p>
                    </Stack>
                  </Box>
                  <Box>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="precio_unitario">Nuevas Existencias</InputLabel>
                      <OutlinedInput
                        fullWidth
                        id="newstock"
                        name="newstock"
                        title="Nuevas Existencias"
                        label="Nuevas Existencias"
                        type="number"
                        value={props.values.newstock}
                        onChange={(e) => {
                          if (Number(e.target.value) < 0) {
                            e.preventDefault();
                            return;
                          }
                          props.handleChange(e);
                        }}
                        onBlur={props.handleBlur}
                        error={
                          props.touched.newstock && Boolean(props.errors.newstock)
                        }
                      />
                      {props.touched.newstock && props.errors.newstock && (
                        <FormHelperText error>
                          {props.errors.newstock}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Box>
                </Stack>
              </Form>
            </div>
          );
        }}></Formik>
    ),
    didOpen: () => {
      formikRef?.resetForm();
      Swal.getPopup()?.querySelector('input')?.focus();
    },
    preConfirm: async () => {
      if (!formikRef) {
        Swal.showValidationMessage('Por favor, ingrese la información.');
        return;
      }
      await formikRef.submitForm();
      if (formikRef.isValid) {
        const values = formikRef.values;
        formModal.fire({
          title: '¿Esta seguro?',
          icon: 'warning',
          text: 'Cuando agrega existencias se suman a las existencias del producto, no se puede deshacer esta acción.',
          showCancelButton: true,
          confirmButtonText: 'Si, estoy seguro',
          cancelButtonText: 'Cancelar',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            const SuccessResumen = () => {
              return (
                <p>
                  <b>Producto:</b> {producto.nombre}
                  <br />
                  <b>Existencias agregadas:</b> {values.newstock  || 0}
                </p>
              )
            }
            addStockProduct(values).then((_res) => {
              swalert.fire({
                title: 'Existencias agregadas.',
                icon: 'success',
                html:  <SuccessResumen/>,
                didClose: () => {
                  reloader();
                },
              });
            })
          }
        })
      } else {
        Swal.showValidationMessage('Por favor, corrija los errores');
      }
    },
  });
}

export function openDeleteProductoModal(producto: Producto, reloader: () => void) {
  const swalert = withReactContent(formModal);
  swalert.fire({
    title: '¿Esta seguro?',
    icon: 'warning',
    text: 'Cuando elimina un producto, no se puede deshacer esta acción.',
    html: (
      <div>
        <p>
          Cuando elimina un producto, no se puede deshacer esta acción.
          Sin embargo el código sera conservado para futuras referencias.
        </p>
        <p>
          <b>Producto:</b> {producto.nombre}
        </p>
      </div>
    ),
    showCancelButton: true,
    confirmButtonText: 'Si, estoy seguro',
    cancelButtonText: 'Cancelar',
    reverseButtons: true,
  }).then((res) => {
    if(res.isConfirmed) {
      desactivarProducto(producto.codigo).then((_res) => {
        swalert.fire({
          title: 'Producto eliminado.',
          icon: 'success',
          didClose: () => {
            reloader();
          },
        });
      })
    }
  })
}