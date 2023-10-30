import { Modal } from 'antd';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Storage, SmartToy } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

type PronosticoModalProps = {
  currentProducto: Producto | null;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function LoadingPronosticoModal({
  isOpen,
  setIsOpen,
  currentProducto,
}: PronosticoModalProps) {
  const [confirmloading, _setConfirmLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(-1);
  const handleCancel = () => {
    setIsOpen(false);
  };
  const AnimatedGear = (_props: { className?: string }) => (
    <motion.div
      animate={{ rotate: 180 }}
      transition={{
        repeat: Infinity,
        duration: 0.5,
        ease: 'linear',
        repeatDelay: 0,
        repeatType: 'loop',
      }}
      className="text-amber-300">
      <Settings sx={{ fontSize: 50 }} />
    </motion.div>
  );
  const navigate = useNavigate();
  return (
    <Modal
      confirmLoading={confirmloading}
      title={`Cargando`}
      open={isOpen}
      okType="default"
      cancelText="Cancelar"
      okText="Subir"
      centered
      afterOpenChange={async (isOpen) => {
        if (isOpen) {
          setTimeout(() => {
            setLoadingStage(0);
          }, 1000);
          setTimeout(() => {
            setLoadingStage(2);
          }, 5000);
          setTimeout(() => {
            setLoadingStage(-1)
            setIsOpen(false);
            console.log(currentProducto)
            navigate('/pagina-pronostico', {
              state: { producto:currentProducto },
            });
          }, 6000);
        }
      }}
      footer={null}
      onCancel={handleCancel}>
      <div className="h-[25rem]">
        <motion.div className="flex flex-col items-left h-full pt-[6rem] pl-[6rem] space-y-4">
          <motion.div className="flex h-[3rem] items-center space-x-[1rem]">
            <motion.div>
              {loadingStage < 0 ? (
                <AnimatedGear />
              ) : (
                <Storage className="text-blue-700" sx={{ fontSize: 50 }} />
              )}
            </motion.div>
            <motion.div className="text-3xl font-bold">
              {loadingStage < 0 ? (
                <span className="text-amber-300">Cargando Datos</span>
              ) : (
                <span className="text-blue-700">Datos Listos</span>
              )}
            </motion.div>
          </motion.div>
          <motion.div className="flex h-[3rem] items-center space-x-[1rem]">
            <motion.div>
              {loadingStage < 2 ? (
                <AnimatedGear />
              ) : (
                <SmartToy className="text-blue-700" sx={{ fontSize: 50 }} />
              )}
            </motion.div>
            <motion.div className="text-3xl font-bold">
              {loadingStage < 2 ? (
                <span className="text-amber-300">Generando Pronóstico</span>
              ) : (
                <span className="text-blue-700">Pronóstico Listo</span>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </Modal>
  );
}
