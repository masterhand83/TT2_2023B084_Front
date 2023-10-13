
import { PerdidaTable } from '../components/Perdida/PerdidaTable';
import{createTheme, ThemeProvider} from '@mui/material/styles';
import { esES } from '@mui/material/locale'

const theme = createTheme({
}, esES);
export function Perdidas() {
  return (
    <div className="flex flex-col w-full items-center  py-[2rem]">
      <div className="w-[60%]">
        <ThemeProvider theme={theme}>
        <PerdidaTable />
        </ThemeProvider>
      </div>
    </div>
  );
}
