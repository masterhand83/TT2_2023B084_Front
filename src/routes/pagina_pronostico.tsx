import { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { useLocation } from 'react-router-dom';
import { HistorialTable } from '../components/PronosticoTable/HistorialTable';
import { Box, Card, Grid } from '@mui/material';
import useWebSocket from 'react-use-websocket';
import LoadingPronosticoSpinner from '../components/PronosticoTable/LoadingPronosticoSpinner';
type Pronostico = {
  period: string[];
  prediction: number[];
};
// const dataSource: PronosticoVentas = [
//   {
//     periodoInicio: '2023-02-12',
//     periodoFin: '2023-03-18',
//     ventas: 512,
//   },
//   {
//     periodoInicio: '2023-05-06',
//     periodoFin: '2023-06-10',
//     ventas: 289,
//   },
//   {
//     periodoInicio: '2023-08-21',
//     periodoFin: '2023-09-25',
//     ventas: 726,
//   },
//   {
//     periodoInicio: '2023-11-03',
//     periodoFin: '2023-12-07',
//     ventas: 148,
//   },
//   {
//     periodoInicio: '2023-04-30',
//     periodoFin: '2023-06-04',
//     ventas: 821,
//   },
// ];
// const defaultData = [
//   {
//     id: 'p1',
//     data: dataSource.map((data, index) => {
//       return {
//         x: `s${index}`,
//         y: data.ventas,
//       };
//     }),
//   },
// ];
export function PaginaPronostico() {
  const { producto } = useLocation().state;
  const socketUrl =
    'wss://ttendpoint--4tk2z8n.politestone-8d1546f8.westus2.azurecontainerapps.io/ws/' +
    producto.codigo;
  const { lastMessage } = useWebSocket(socketUrl, {
    shouldReconnect: (_closeEvent) => false,
  });
  const [data, setData] = useState([] as any);
  const [dataLimit, setDataLimit] = useState(100);
  const [dataSource, setDataSource] = useState([] as any[]);
  const [loadStatus, setLoadStatus] = useState(0);
  useEffect(() => {
    if (lastMessage === null) {
      return;
    }
    if (lastMessage.data === 'Retrieving data...') {
      setLoadStatus(0);
    } else if (lastMessage.data === 'Creating prediction...') {
      setLoadStatus(1);
    } else {
      const content = JSON.parse(lastMessage.data) as Pronostico;
      const newDataSource = content.period.map((period, index) => {
        const periodos = period.split('/');
        const newData = {
          periodoInicio: periodos[0],
          periodoFin: periodos[1],
          ventas: content.prediction[index],
        };

        return newData;
      });
      const newData = [
        {
          id: 'p1',
          data: content.prediction.map((ventas: any, index: any) => {
            return {
              x: `s${index}`,
              y: ventas,
            };
          }),
        },
      ];
      const limit =
        newData[0].data.reduce((prev: any, curr: any) => {
          return prev.y > curr.y ? prev : curr;
        }).y + 5;
      setDataLimit(limit);
      setDataSource(newDataSource);
      setData(newData);
      setLoadStatus(2);
    }

    console.log('llamando', lastMessage);
  }, [lastMessage]);
  const DataChart = () => (
    <ResponsiveLine
      data={data}
      margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 0,
        max: dataLimit,
        stacked: false,
        reverse: false,
        nice: true
      }}
      curve="linear"
      enableArea={false}
      axisTop={null}
      enableGridX={false}
      axisRight={null}
      enablePointLabel
      pointLabel={'yFormatted'}
      axisLeft={{
        legend: 'Ventas',
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
      colors={['#d946ef']}
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
              <span>{loadStatus}</span>
              <HistorialTable
                producto={producto}
                dataSource={dataSource}
                loading={loadStatus !== 2}
              />
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
              {loadStatus == 2 ? (
                <DataChart />
              ) : (
                <LoadingPronosticoSpinner status={loadStatus} />
              )}
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
              <HistorialTable
                producto={producto}
                dataSource={dataSource}
                loading={loadStatus !== 2}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
