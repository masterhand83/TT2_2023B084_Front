import { Modal } from 'antd';
import { Producto } from '../../types';
import { useState } from 'react';

type DeleteProductoModalProps = {
  currentProducto: Producto;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function DeleteProductoModal({
  isOpen,
  setIsOpen,
  currentProducto,
}: DeleteProductoModalProps) {
  const [confirmloading, setConfirmLoading] = useState(false);
  const handleCancel = () => {
    setIsOpen(false);
  };
  const deleteProducto = (producto: Producto) => {
    console.log(producto);
    setConfirmLoading(true);
    setTimeout(() => {
      setIsOpen(false);
      setConfirmLoading(false);
      setIsOpen(false);
    }, 2000);
  };
  return (
    <Modal
      confirmLoading={confirmloading}
      title={`Borrar Producto (${currentProducto.nombre})`}
      open={isOpen}
      onOk={() => deleteProducto(currentProducto)}
      okType="default"
      cancelText="Cancelar"
      okText="Seguro"
      onCancel={handleCancel}>
      <div>
        <p>
          ¿Estas seguro de que quieres remover este producto de la lista de
          productos? No habra forma de revertirlo
        </p>
      </div>
    </Modal>
  );
}
