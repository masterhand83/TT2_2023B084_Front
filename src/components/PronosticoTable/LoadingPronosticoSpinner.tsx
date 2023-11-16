import { motion } from "framer-motion";

import { SmartToy, Storage, Settings } from '@mui/icons-material';
import { Box } from '@mui/material';
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
export default function LoadingPronosticoSpinner(props: { status: number }) {
  return (
    <Box sx={{height: '100%', alignContent:'center', alignItems:'center' }}>
        <motion.div className="flex flex-col items-left h-full space-y-4 p-5">
          <motion.div className="flex h-[3rem] items-center space-x-[1rem]">
            <motion.div>
              {props.status <= 0 ? (
                <AnimatedGear />
              ) : (
                <Storage className="text-blue-700" sx={{ fontSize: 50 }} />
              )}
            </motion.div>
            <motion.div className="text-3xl font-bold">
              {props.status <= 0 ? (
                <span className="text-amber-300">Cargando Datos</span>
              ) : (
                <span className="text-blue-700">Datos Listos</span>
              )}
            </motion.div>
          </motion.div>
          <motion.div className="flex h-[3rem] items-center space-x-[1rem]">
            <motion.div>
              {props.status < 2 ? (
                <AnimatedGear />
              ) : (
                <SmartToy className="text-blue-700" sx={{ fontSize: 50 }} />
              )}
            </motion.div>
            <motion.div className="text-3xl font-bold">
              {props.status < 2 ? (
                <span className="text-amber-300">Generando Pronóstico</span>
              ) : (
                <span className="text-blue-700">Pronóstico Listo</span>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
    </Box>
  );
};