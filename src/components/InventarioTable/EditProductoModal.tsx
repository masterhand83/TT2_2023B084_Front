import { Form, Input, InputNumber, Modal, Select } from 'antd';
import { useEffect, useState } from 'react';
import { getAllMarcas } from '../../services';

type EditProductoModalProps = {
  currentProducto: Producto;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reloader?: () => void;
};
type EditProductoFormType = {
  codigo: string;
  nombre: string;
  marca: string;
  stock: number;
  precio: number;
};
export default function EditProductoModal({
  isOpen,
  setIsOpen,
  currentProducto
}: EditProductoModalProps) {
  const [confirmloading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [listaMarcas, setListaMarcas] = useState<Marca[]>([] as Marca[]);
  const handleCancel = () => {
    form.resetFields();
    setIsOpen(false);
  };
  const editProducto = (values: EditProductoFormType) => {
    console.log(values)
    // const _input = {
    //   codigo: currentProducto.codigo,
    //   nombre: values.nombre,
    //   marca: values.marca,
    //   precio_unitario: values.precio,
    // }
    setConfirmLoading(true);
    // editarProducto(input).then((response) => {
    //   console.log(response)
    //     setConfirmLoading(false);
    //     setIsOpen(false);
    //     if(reloader) {
    //       reloader()
    //     }

    // })

    // setTimeout(() => {
    //   setIsOpen(false);
    //   setConfirmLoading(false);
    //   form.resetFields();
    //   setIsOpen(false);
    // }, 2000);
  };
  const { nombre, marca, precio_unitario } = currentProducto;
  const { Option } = Select;
  useEffect(() => {
    getAllMarcas().then((response) => {
      setListaMarcas(response);
      form.resetFields()
    })
  }, [isOpen])
  return (
    <Modal
      confirmLoading={confirmloading}
      title={`Editar Producto (${nombre})`}
      open={isOpen}
      onOk={form.submit}
      okType="default"
      cancelText="Cancelar"
      okText="Subir"
      onCancel={handleCancel}>
      <Form form={form} onFinish={editProducto}>
        <Form.Item<EditProductoFormType>
          label="Nuevo nombre"
          name="nombre"
          initialValue={nombre}>
          <Input placeholder="nuevo nombre" />
        </Form.Item>
        <Form.Item<EditProductoFormType>
          label={`Nueva Marca (original: ${marca})`}
          name="marca"
          initialValue={
            listaMarcas.findIndex((item: Marca) => item.marca === marca) + 1
          }>
          <Select placeholder="seleccione la marca relacionada al producto.">
            {listaMarcas.map((item: Marca) => {
              return (
                <Option  key={item.id} value={item.id}>
                  {item.marca}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item<EditProductoFormType>
          label="Nuevo precio"
          name="precio"
          rules={[
            {
              required: true,
              message: 'por favor ingresa el precio del producto.',
            },
          ]}
          initialValue={precio_unitario}>
          <InputNumber
            prefix="$"
            placeholder="Precio del producto"
            min={0}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
