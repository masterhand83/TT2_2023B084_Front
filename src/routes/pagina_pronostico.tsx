import { useState } from 'react';
import DetalleVentaList from '../components/Ventas/DetalleVentaList';
import { ResponsiveLine } from '@nivo/line';
import { SummaryTable } from '../components/PronosticoTable/SummaryTable';
const data = [
  {
    id: 'p1',
    data: [
      {
        x: 's0',
        y: 9.05,
      },
      {
        x: 's1',
        y: 100.05,
      },
      {
        x: 's2',
        y: 150.999,
      },
      {
        x: 's3',
        y: 158.50,
      },
      {
        x: 's4',
        y: 140.21,
      },
    ],
  },
];
export function PaginaPronostico() {
  const [selectedVenta, setSelectedVenta] = useState<Venta | null>(null);
  return (
    <div className="grid grid-cols-4 grid-rows-1 items-right h-full">
      <div className="mr-9 ml-10 mt-[3rem] col-span-2">
        <SummaryTable />
      </div>
      <div className="bg-slate-50 col-span-2">
        <ResponsiveLine
          data={data}
          margin={{ top: 90, right: 60, bottom: 90, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false,
          }}
          curve='linear'
          enableArea={true}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          enablePointLabel
          axisBottom={{
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Semana',
            legendOffset: 40,
            legendPosition: 'middle',
          }}
          colors={{ scheme: 'set3' }}
          pointSize={12}
          lineWidth={4}
          pointLabelYOffset={-12}
          useMesh={true}

        />

        {/* <DetalleVentaList
        selectedVenta={selectedVenta? selectedVenta : null}
        /> */}
      </div>
    </div>
  );
}
