import { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { useLocation } from 'react-router-dom';
import { getExistencias } from '../services';
import { HistorialTable } from '../components/PronosticoTable/HistorialTable';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
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
  console.log('dates', dates);
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
      (_sum, curr) => curr.existencias,
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
    data: dataSource.map((data, _index) => {
      return {
        x: data.periodoInicio,
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
};
export function PaginaHistorial() {
  const [_data, _setData] = useState(defaultData);
  const [datos, setDatos] = useState<HistorialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { producto } = useLocation().state;
  useEffect(() => {
    console.log('llamando');
    getExistencias(producto.codigo).then((data: HistoriaExistencia[]) => {
      console.log('datos descargados', data);
      const res = subsetDatesByWeeks(
        data.map((d) => ({ fecha: d.fecha, existencias: d.existencias }))
      )
        .slice()
        .reverse();
      setDatos(res);
      setLoading(false);
      console.log('datos procesados', res);
    });
  }, []);
  const toMonthDayFormat = (dateStart: string, dateFinish: string) => {
    //return date but formatted like "Noviembre 13 del 2020" with the month in spanish
    const dateObjectStart = new Date(dateStart);
    const dateObjectFinish = new Date(dateFinish);
    const monthStart = dateObjectStart.toLocaleString('es-ES', {
      month: 'short',
    });
    const monthFinish = dateObjectFinish.toLocaleString('es-ES', {
      month: 'short',
    });
    const dayStart = dateObjectStart.getDate();
    const dayFinish = dateObjectFinish.getDate();
    return `${dayStart} ${monthStart} - ${dayFinish} ${monthFinish}`;
  };
  const filteredData = [
    {
      id: 'p1',
      data: datos.map((data, _index) => {
        return {
          x: toMonthDayFormat(data.range[0], data.range[1]),
          y: data.totalExistencias,
        };
      }),
    },
  ];
  const DataChart = () => (
    <ResponsiveLine
      data={filteredData}
      margin={{ top: 20, right: 50, bottom: 60, left: 50 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 0,
        max: filteredData
          ? filteredData[0].data
              .map((value) => value.y)
              .reduce((prev, curr) => {
                return prev > curr ? prev : curr;
              }, 0) + 100
          : 100,
        stacked: false,
        reverse: false,
      }}
      tooltip={(props) => {
        return (
          <div className='bg-white'>
            <p>Periodo: {props.point.data.xFormatted}</p>
            <p>Existencias: {props.point.data.yFormatted}</p>
          </div>

        )
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
              justifyContent={'center'}
              alignItems={'center'}>
              <Card
                sx={{
                  backgroundColor: 'white',
                  width: '75%',
                  padding: '1rem',
                  marginBottom: '1rem',
                }}>
                <Typography
                  variant="h4"
                  align="center"
                  marginBottom={'1rem'}
                  className="text-slate-900"
                  fontWeight={500}>
                  Historial de existencias semanales del producto.
                </Typography>
                <Typography
                  align="justify"
                  fontSize={'1.1rem'}
                  className="text-slate-700">
                  Es el historial de existencias desde hace 4 semanas hasta la semana donde se dio el registro más reciente.
                </Typography>
              </Card>
              <HistorialTable
                dataSource={datos.map((v) => ({
                  periodoInicio: v.range[0],
                  periodoFin: v.range[1],
                  ventas: v.totalExistencias,
                }))}
                producto={producto}
                loading={loading}
                type="Historial"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: { xs: 'flex' } }}>
            <Stack direction="column" width={'100%'}>
              <Card
                sx={{
                  backgroundColor: 'white',
                  height: '100%',
                  width: '100%',
                  padding: '1rem',
                }}>
                <DataChart />
              </Card>
            </Stack>
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
              <HistorialTable
                dataSource={datos.map((v) => ({
                  periodoInicio: v.range[1],
                  periodoFin: v.range[0],
                  ventas: v.totalExistencias,
                }))}
                producto={producto}
                loading={loading}
                type="Historial"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
