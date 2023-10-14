import { Modal } from 'antd';
import { useState } from 'react';
import { desactivarProducto } from '../../services';

type DeleteProductoModalProps = {
  currentProducto: Producto;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reloader?: () => void;
};
export default function DeleteProductoModal({
  isOpen,
  setIsOpen,
  currentProducto,
  reloader
}: DeleteProductoModalProps) {
  const [confirmloading, setConfirmLoading] = useState(false);
  const handleCancel = () => {
    setIsOpen(false);
  };
  const deleteProducto = (producto: Producto) => {
    console.log(producto);
    setConfirmLoading(true);
    desactivarProducto(producto.codigo).then((_res) => {
        setIsOpen(false);
        setConfirmLoading(false);
        if(reloader){
          reloader()
        }
    })
    // setTimeout(() => {
    //   setIsOpen(false);
    //   setConfirmLoading(false);
    //   setIsOpen(false);
    // }, 2000);
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
