import { History, AutoGraph } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
type ActionButtonProps = {
  onAction: (_action: string) => void;
};
type PronosticoActionGroupProps = {
  producto: Producto;
  onAction: (_action: string) => void;
};

const VerHistorialButton = ({ onAction }: ActionButtonProps) => {
  return (
    <Tooltip title="Ver historial de existencias">
      <button
        onClick={() => onAction('history')}
        className="bg-indigo-700 text-white rounded p-1 ">
        <History />
      </button>
    </Tooltip>
  );
};
const VerPronosticoButton = ({ onAction }: ActionButtonProps) => {
  return (
    <Tooltip title="Ver Pronóstico de ventas">
      <button
        onClick={() => onAction('forecast')}
        className="bg-fuchsia-700 text-white rounded p-1 ">
        <AutoGraph />
      </button>
    </Tooltip>
  );
};
export default function PronosticoActionGroup({
  onAction,
}: PronosticoActionGroupProps) {
  return (
    <div className="flex space-x-4">
      <VerHistorialButton onAction={onAction} />
        <VerPronosticoButton onAction={onAction} />
    </div>
  );
}
