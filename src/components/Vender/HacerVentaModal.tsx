
import { Modal } from 'antd';
import { useState } from 'react';

type HacerVentaModalProps = {
  listaVentas: VentaItem[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function HacerVentaModal({
  isOpen,
  setIsOpen,
  listaVentas,
}: HacerVentaModalProps) {
  const [confirmloading, setConfirmLoading] = useState(false);
  const handleCancel = () => {
    setIsOpen(false);
  };
  const hacerVenta = (listaVentas: VentaItem[]) => {
    console.log(listaVentas);
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
      title={`Confirmar venta`}
      open={isOpen}
      onOk={() => hacerVenta(listaVentas)}
      okType="default"
      cancelText="Cancelar"
      okText="Seguro"
      onCancel={handleCancel}>
      <div>
        <p>
          ¿Estás seguro de que deseas confirmar la venta de estos productos?
        </p>
      </div>
    </Modal>
  );
}
