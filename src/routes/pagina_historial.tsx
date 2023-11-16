import { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { useLocation } from 'react-router-dom';
import { getExistencias } from '../services';
import { HistorialTable } from '../components/PronosticoTable/HistorialTable';
import { Box, Card, Grid } from '@mui/material';
const dataSource: PronosticoVentas = [
  {
    periodoInicio: '2023-02-12',
    periodoFin: '2023-03-18',
    ventas: 512,
  },
  {
    periodoInicio: '2023-05-06',
    periodoFin: '2023-06-10',
    ventas: 289,
  },
  {
    periodoInicio: '2023-08-21',
    periodoFin: '2023-09-25',
    ventas: 726,
  },
  {
    periodoInicio: '2023-11-03',
    periodoFin: '2023-12-07',
    ventas: 148,
  },
  {
    periodoInicio: '2023-04-30',
    periodoFin: '2023-06-04',
    ventas: 721,
  },
];
type HistoriaExistencia = {
  fecha: string;
  existencias: number;
  id: string;
};
type DateObject = { fecha: string; existencias: number };

function subsetDatesByWeeks(dates: DateObject[]): any[] {
  const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
  // Convert the 'fecha' field to Date objects and sort the list
  const sortedDates = [...dates].sort(
    (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  );
  // Get the most recent date
  const mostRecentDate = new Date(sortedDates[0].fecha);
  // Initialize weekly ranges
  const weeklyRanges = [];
  for (let i = 0; i < 4; i++) {
    // Calculate start and end of each week
    const startOfWeek = new Date(
      mostRecentDate.getTime() - i * oneWeekInMilliseconds
    );
    const endOfWeek = new Date(
      mostRecentDate.getTime() - (i + 1) * oneWeekInMilliseconds
    );
    // Filter dates in each week
    const datesInWeek = sortedDates.filter((dateObj) => {
      const date = new Date(dateObj.fecha);
      return date <= startOfWeek && date > endOfWeek;
    });
    // Sum up the existencias for each week
    const totalExistencias = datesInWeek.reduce(
      (sum, curr) => sum + curr.existencias,
      0
    );
    // Add weekly range to the list
    weeklyRanges.push({
      week: i + 1,
      range: [
        endOfWeek.toISOString().split('T')[0],
        startOfWeek.toISOString().split('T')[0],
      ],
      totalExistencias,
      dates: datesInWeek.map((dateObj) => dateObj.fecha),
    });
  }

  // Log the results
  console.log(weeklyRanges);
  return weeklyRanges;
}
const defaultData = [
  {
    id: 'p1',
    data: dataSource.map((data, index) => {
      return {
        x: `s${index}`,
        y: data.ventas,
      };
    }),
  },
];
type HistorialItem = {
  week: number;
  range: string[];
  totalExistencias: number;
  dates: string[];
}
export function PaginaHistorial() {
  const [_data, _setData] = useState(defaultData);
  const [datos, setDatos] = useState<HistorialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { producto } = useLocation().state;
  useEffect(() => {
    console.log('llamando');
    getExistencias(producto.codigo).then((data: HistoriaExistencia[]) => {
      const res = subsetDatesByWeeks(
        data.map((d) => ({ fecha: d.fecha, existencias: d.existencias }))
      );
      setDatos(res);
      setLoading(false);
      console.log('res',datos)
    });
  }, []);
  const filteredData = [
    {
      id: 'p1',
      data: datos
        .map((data, index) => {
          return {
            x: `s${index}`,
            y: data.totalExistencias,
          };
        })
    },
  ];
  console.log(filteredData);
  const DataChart = () => (
    <ResponsiveLine
      data={filteredData}
      margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 0,
        max: filteredData
          ? filteredData[0].data
              .map((value) => value.y)
              .reduce((prev, curr) => {
                return prev > curr ? prev : curr;
              }, 0) + 10
          : 100,
        stacked: false,
        reverse: false,
      }}
      curve="linear"
      enableArea={false}
      axisTop={null}
      enableGridX={false}
      axisRight={null}
      enablePointLabel
      pointLabel={'yFormatted'}
      axisLeft={{
        legend: 'Existencias',
        legendOffset: -40,
        legendPosition: 'middle',
      }}
      axisBottom={{
        tickSize: 10,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Semana',
        legendOffset: 40,
        legendPosition: 'middle',
      }}
      colors={['#818cf8']}
      pointSize={12}
      lineWidth={4}
      pointLabelYOffset={-12}
      useMesh={true}
    />
  );
  return (
    <>
      <Box
        height={'100%'}
        sx={{ padding: '3rem' }}
        display={{ xs: 'none', md: 'block' }}>
        <Grid container height={'100%'}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{ height: '100%', display: 'flex' }}
              flexDirection={'column'}
              justifyContent={'center'}>
              <HistorialTable dataSource={datos.map((v) => ({
                periodoInicio: v.range[1],
                periodoFin: v.range[0],
                ventas: v.totalExistencias
              }))} producto={producto} loading={loading}/>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: { xs: 'flex' } }}>
            <Card
              sx={{
                backgroundColor: 'white',
                height: '100%',
                width: '100%',
                padding: '1rem',
              }}>
              <DataChart />
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box
        height={'100%'}
        sx={{ paddingX: '0.5rem', paddingY: '2rem' }}
        display={{ xs: 'block', md: 'none' }}>
        <Grid container spacing={2} height={'100%'}>
          <Grid item xs={12} md={6} sx={{ display: { xs: 'flex' } }}>
            <Card
              sx={{
                backgroundColor: 'white',
                height: '100%',
                width: '100%',
                padding: '1rem',
              }}>
              <DataChart />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{ height: '100%', display: 'flex' }}
              flexDirection={'column'}
              justifyContent={'center'}>
              <HistorialTable dataSource={datos.map((v) => ({
                periodoInicio: v.range[1],
                periodoFin: v.range[0],
                ventas: v.totalExistencias
              }))} producto={producto} loading={loading}/>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
