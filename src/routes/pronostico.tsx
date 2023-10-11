
import { PronosticoTable } from '../components/PronosticoTable';
import{createTheme, ThemeProvider} from '@mui/material/styles';
import { esES } from '@mui/material/locale'

const theme = createTheme({
}, esES);

export function Pronostico() {
  return (
    <div className="flex flex-col w-full items-center space-y-4 py-[6rem] ">
      <ThemeProvider theme={theme}>2
      <PronosticoTable />
      </ThemeProvider>
    </div>
  );
}