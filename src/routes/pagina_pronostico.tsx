import { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { useLocation } from 'react-router-dom';
import { HistorialTable } from '../components/PronosticoTable/HistorialTable';
import { Box, Card, Grid, Typography } from '@mui/material';
import useWebSocket from 'react-use-websocket';
import LoadingPronosticoSpinner from '../components/PronosticoTable/LoadingPronosticoSpinner';
import { toMonthDayFormat } from '../utils/utilities';
type Pronostico = {
  period: string[];
  prediction: number[];
};
function convertSpanishDateToISO(dateString: string) {
  let parts = dateString.split(' de ');
  let day = parts[0];
  type Months = {
    [key: string]: string;
    enero: string;
    febrero: string;
    marzo: string;
    abril: string;
    mayo: string;
    junio: string;
    julio: string;
    agosto: string;
    septiembre: string;
    octubre: string;
    noviembre: string;
    diciembre: string;
  };
  let months: Months = {
    enero: '01',
    febrero: '02',
    marzo: '03',
    abril: '04',
    mayo: '05',
    junio: '06',
    julio: '07',
    agosto: '08',
    septiembre: '09',
    octubre: '10',
    noviembre: '11',
    diciembre: '12',
  };
  let month = months[parts[1].toLowerCase() as keyof Months];
  let year = new Date().getFullYear();
  if (day.length === 1) {
    day = '0' + day; // Add leading zero if day is a single digit
  }
  const ndate = new Date(`${year}-${month}-${day}`);

  // ndate.setDate(ndate.getDate() + 1)
  return ndate;
}
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
  const [dataSource, setDataSource] = useState([] as any);
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
      console.log('contenido descargado', content);
      const newDataSource = content.period
        .map((period, index) => {
          const periodos = period.split('/').map((date: string) => {
            const dateObj = convertSpanishDateToISO(date);
            return dateObj;
          });
          const newData = {
            periodoInicio: periodos[0],
            periodoFin: periodos[1],
            ventas: content.prediction[index],
          };

          return newData;
        })
        .slice(0, 5);
      const newData = [
        {
          id: 'p1',
          data: newDataSource.map((ventas: any, _index: any) => {
            return {
              x: toMonthDayFormat(ventas.periodoInicio, ventas.periodoFin),
              y: ventas.ventas,
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
  }, [lastMessage]);
  const DataChart = () => (
    <ResponsiveLine
      data={data}
      margin={{ top: 20, right: 50, bottom: 60, left: 50 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 0,
        max: dataLimit - 1,
        stacked: false,
        reverse: false,
        nice: true,
      }}
      tooltip={(props) => {
        return (
          <div className='bg-white'>
            <p>Periodo: {props.point.data.xFormatted}</p>
            <p>Ventas: {props.point.data.yFormatted}</p>
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
        legend: 'Unidades de Venta',
        legendOffset: -40,
        legendPosition: 'middle',
        tickValues: Array.from({ length: dataLimit }, (_, i) => i),
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
                  Pronóstico de ventas.
                </Typography>
                <Typography
                  align="justify"
                  fontSize={'1.1rem'}
                  className="text-slate-700">
                  Es el pronóstico de las ventas en razón de unidades del
                  producto que tendrá el usuario en las siguientes 4 semanas.
                </Typography>
              </Card>
              <HistorialTable
                producto={producto}
                dataSource={dataSource}
                loading={loadStatus !== 2}
                type="Pronóstico"
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
                type="Pronóstico"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
