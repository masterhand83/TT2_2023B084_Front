import {
  Box,
} from '@mui/material';
import { Global } from '@emotion/react';
import VenderDesktop from '../components/Vender/VenderDesktop';
const drawerBleeding = 75;
export function Vender() {
  console.log("rendering vender")
  return (
    <Box height={'100%'}>
        <Global
          styles={{
            '.MuiDrawer-root > .MuiPaper-root': {
              height: `calc(50% - ${drawerBleeding}px)`,
              overflow: 'visible',
            },
          }}
        />
        <VenderDesktop />
    </Box>
  );
}
