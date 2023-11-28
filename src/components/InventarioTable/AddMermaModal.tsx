import { Form, InputNumber, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { removeStock } from '../../services';

type AddMermaModalProps = {
  currentProducto: Producto;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reloader?: () => void;
};
// type addProductFormType = {
//   codigo: string;
//   nombre: string;
//   marca: string;
//   stock: number;
//   precio: number;
// };
export default function AddMermaModal({
  isOpen,
  setIsOpen,
  currentProducto,
  reloader,
}: AddMermaModalProps) {
  const [confirmloading, setConfirmLoading] = useState(false);
  const [merma, setMerma] = useState(1);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorStatus, setErrorStatus] = useState('' as  'error' | 'warning'|'success'|'');
  const [form] = Form.useForm();
  const handleCancel = () => {
    form.resetFields();
    setIsOpen(false);
  };
  const addMerma = (values: { merma: number }) => {
    console.log(values);
    if(values.merma <= 0) {
      setError(true);
      setErrorStatus('error');
      setErrorMessage('La merma debe ser mayor a 0');
      return
    }
    if (merma > existencias) {
      setError(true);
      setErrorStatus('error');
      setErrorMessage('La merma es mayor a las existencias');
      return
    }
    setConfirmLoading(true);
    // setTimeout(() => {
    //   setIsOpen(false);
    //   setConfirmLoading(false);
    //   form.resetFields();
    //   setIsOpen(false);
    // }, 2000);
    removeStock({ codigo: currentProducto.codigo, merma: values.merma }).then(
      (response) => {
        console.log(response);
        setConfirmLoading(false);
        setIsOpen(false);
        if (reloader) {
          reloader();
        }
      }
    );
  };
  const { existencias } = currentProducto;
  useEffect(() => {
    form.resetFields();
  }, [confirmloading])
  useEffect(() => {
    if (merma <= 0) {
      setError(true);
      setErrorStatus('error');
      setErrorMessage('La merma debe ser mayor a 0');
      return
    }
    if (merma > existencias) {
      setError(true);
      setErrorStatus('error');
      setErrorMessage('La merma es mayor a las existencias');
      return
    }
    setError(false);
    setErrorStatus('')
    setErrorMessage('')
  }, [merma])
  return (
    <Modal
      confirmLoading={confirmloading}
      title={`Agregar Merma  (cantidad actual: ${existencias})`}
      open={isOpen}
      onOk={form.submit}
      okType="default"
      cancelText="Cancelar"
      okText="Subir"
      onCancel={handleCancel}
      okButtonProps={{disabled: error}}
    >
      <div className='mb-4'>
        <p>
          La merma representa una manera de reportar pérdidas en el inventario
          que no están asociadas con las ventas y pueden deberse a caducidad,
          robo, extravío o errores en el conteo.
        </p>
      </div>
      <Form form={form} onFinish={addMerma}>
        <Form.Item label="Merma" name="merma" initialValue={1}
        required
        validateStatus={errorStatus}
        help={errorMessage}>
          <InputNumber
            style={{ width: '100%' }}
            value={merma}
            onChange={(value) => {
              if(value === null) return;
              setMerma(value)
            }}
            onKeyDown={(e) => {
              const isNumber = /^[0-9]+$/.test(e.key);
              const isbackspace = e.key === 'Backspace';
              if(isNumber) {
                return;
              }
              if(isbackspace) {
                return;
              }
              e.preventDefault()
            }}

          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
