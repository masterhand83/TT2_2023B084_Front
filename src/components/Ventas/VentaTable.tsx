import dayjs from 'dayjs';
import { useState } from 'react';
import { DatePicker } from 'antd';
import { formatNumber } from '../../utils/utilities';
import TablaVentas from '../Table/TablaVentas';
import { Typography } from '@mui/material';

type VentaTableProps = {
  isLoading: boolean;
  onVentaSelected?: (_venta: VistaVenta) => void;
  tableData: VistaVenta[];
};

export function VentaTable({
  onVentaSelected,
  tableData,
  isLoading,
}: VentaTableProps) {
  const firstDateOfYear = dayjs().startOf('year').subtract(5, 'years');
  const lastDateOfYear = dayjs().endOf('year');
  const [upperLimit, setUpperLimit] = useState<dayjs.Dayjs | null>(
    lastDateOfYear
  );
  const [lowerLimit, setLowerLimit] = useState<dayjs.Dayjs | null>(
    firstDateOfYear
  );
  const isInDateRange = (venta: VistaVenta) => {
    if (!lowerLimit || !upperLimit) return false;
    const ventaDate = dayjs(venta.fecha);
    return ventaDate.isAfter(lowerLimit) && ventaDate.isBefore(upperLimit);
  };
  return (
    <div className="flex flex-col w-[100%] space-y-3">
       <div>
        <Typography fontWeight={'bold'} variant="h4">
          Ventas
        </Typography>
        <Typography variant="h6">
          Seleccione un rango de fechas para visualizar las ventas realizadas en ese periodo.
        </Typography>
       </div>
      <div className="flex space-x-2 justify-center">
        <div>De:</div>
        <div>
          <DatePicker
            onChange={(value, _date) => setLowerLimit(value)}
            format={'DD/MM/YYYY'}
            defaultValue={lowerLimit ? lowerLimit : firstDateOfYear}
          />
        </div>
        <div>a:</div>
        <div>
          <DatePicker
            onChange={(value, _date) => setUpperLimit(value)}
            format={'DD/MM/YYYY'}
            defaultValue={upperLimit ? upperLimit : lastDateOfYear}
          />
        </div>
      </div>
       <div className="flex items-center space-x-2 justify-center">
         <span>Suma total: </span>
         <div className="bg-green-500 text-white px-6 py-[0.1rem] rounded">
           $&nbsp;
           <span>
             {formatNumber(tableData
               .filter(isInDateRange)
               .map((venta) => venta.total)
               .reduce((a, b) => a + b, 0))
               }
           </span>
         </div>
       </div>
       <div>
        <Typography variant="h6" component="h6">
          Seleccione una venta para ver su detalle:
        </Typography>
       </div>
      <TablaVentas
        upperLimit={upperLimit}
        lowerLimit={lowerLimit}
        loadingContent={isLoading}
        onRowSelected={onVentaSelected}
        tableData={tableData}
      />
    </div>
  );
}
