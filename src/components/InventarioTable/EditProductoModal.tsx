import { Form, Input, InputNumber, Modal, Select } from 'antd';
import { useState } from 'react';

type EditProductoModalProps = {
  currentProducto: Producto;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
type EditProductoFormType = {
  codigo: string;
  nombre: string;
  marca: string;
  stock: number;
  precio: number;
};
const listaMarcas: Marca[] = [
  {
    id: 1,
    marca: 'Bimbo',
  },
  {
    id: 2,
    marca: 'Nestle',
  },
  {
    id: 3,
    marca: 'Kellogs',
  },
  {
    id: 4,
    marca: 'UNSC',
  },
];
export default function EditProductoModal({
  isOpen,
  setIsOpen,
  currentProducto,
}: EditProductoModalProps) {
  const [confirmloading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const handleCancel = () => {
    form.resetFields();
    setIsOpen(false);
  };
  const addStock = (values: EditProductoFormType) => {
    console.log(values);
    setConfirmLoading(true);
    setTimeout(() => {
      setIsOpen(false);
      setConfirmLoading(false);
      form.resetFields();
      setIsOpen(false);
    }, 2000);
  };
  const { nombre, marca, precio } = currentProducto;
  const { Option } = Select;
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
      <Form form={form} onFinish={addStock}>
        <Form.Item<EditProductoFormType>
          label="Nuevo nombre"
          name="nombre"
          initialValue={nombre}>
          <Input placeholder="nuevo nombre" />
        </Form.Item>
        <Form.Item<EditProductoFormType>
          label={`Nueva Marca (original: ${marca})`}
          name="marca">
          <Select placeholder="seleccione la marca relacionada al producto.">
            {listaMarcas.map((item: Marca) => {
              return (
                <Option key={item.id} value={item.id}>
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
          initialValue={precio}>
          <InputNumber
            prefix="$"
            placeholder="Precio del producto"
            min={precio}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
