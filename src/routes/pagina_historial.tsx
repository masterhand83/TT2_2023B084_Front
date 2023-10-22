import { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { useLocation } from 'react-router-dom';
import { getExistencias } from '../services';
import { HistorialTable } from '../components/PronosticoTable/HistorialTable';
import { Box, Card, Grid} from '@mui/material';
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
    ventas: 821,
  },
];
const defaultData = [
  {
    id: 'p1',
    data: dataSource.map((data, index) => {
      return {
        x: `s${index}`,
        y: data.ventas,
      };
    })
  }
]
export function PaginaHistorial() {
  const [data, _setData] = useState(defaultData);
  const { producto } = useLocation().state;
  console.log(producto);
  useEffect(() => {
    console.log('llamando');
    getExistencias(producto.codigo).then((data: any[]) => {
      console.log(data);
      console.log();
    });
  }, []);
  return (
    <>
    <Box height={'100%'} sx={{ padding: '3rem' }} display={{xs:'none', md:'block'}}>
      <Grid container height={'100%'}>
        <Grid item xs={12} md={6}>
          <Box sx={{height:'100%',display:'flex'}} flexDirection={'column'} justifyContent={'center'}>
            <HistorialTable dataSource={dataSource} />
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
            <ResponsiveLine
              data={data}
              margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
              xScale={{ type: 'point'  }}
              yScale={{
                type: 'linear',
                min: 0,
                max: data[0].data.reduce((prev, curr) => {
                  return prev.y > curr.y ? prev : curr;
                }).y + 10,
                stacked: false,
                reverse: false,
              }}
              curve="linear"
              enableArea={false}
              yFormat=">-.2f"
              axisTop={null}
              enableGridX={false}
              axisRight={null}
              enablePointLabel
              pointLabel={"yFormatted"}
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
              colors={{ scheme: 'set3' }}
              pointSize={12}
              lineWidth={4}
              pointLabelYOffset={-12}
              useMesh={true}
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
    <Box height={'100%'} sx={{ paddingX: '0.5rem', paddingY:'2rem' }} display={{xs:'block', md:'none'}}>
      <Grid container spacing={2} height={'100%'}>
        <Grid item xs={12} md={6} sx={{ display: { xs: 'flex' } }}>
          <Card
            sx={{
              backgroundColor: 'white',
              height: '100%',
              width: '100%',
              padding: '1rem',
            }}>
            <ResponsiveLine
              data={data}
              margin={{ top: 40, right: 20, bottom: 50, left: 50 }}
              xScale={{ type: 'point'  }}
              yScale={{
                type: 'linear',
                min: 0,
                max: data[0].data.reduce((prev, curr) => {
                  return prev.y > curr.y ? prev : curr;
                }).y + 10,
                stacked: false,
                reverse: false,
              }}
              curve="linear"
              enableArea={false}
              yFormat=">-.2f"
              axisTop={null}
              enableGridX={false}
              axisRight={null}
              enablePointLabel
              pointLabel={"yFormatted"}
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
              colors={{ scheme: 'set3' }}
              pointSize={12}
              lineWidth={4}
              pointLabelYOffset={-12}
              useMesh={true}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{height:'100%',display:'flex'}} flexDirection={'column'} justifyContent={'center'}>
            <HistorialTable dataSource={dataSource} />
          </Box>
        </Grid>
      </Grid>
    </Box>
    </>
    // <div className="grid grid-cols-4 grid-rows-1 items-right h-full">
    //   <div className="mr-9 ml-10 mt-[3rem] col-span-2">
    //     <HistorialTable dataSource={dataSource} />
    //   </div>
    //   <div>
    //     <Skeleton variant="rectangular" />
    //   </div>
    /* <div className="bg-slate-500 col-span-2">
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
      </div> */
  );
}
