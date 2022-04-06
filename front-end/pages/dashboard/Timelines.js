import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Timeline from './Timeline';
/**
 * @param {Object} props
* @return {JSX.Element}
*/
export default function Timelines(props) {
  const data = [
    {time: '13:00', logs: 20},
    {time: '13:06', logs: 10},
    {time: '13:12', logs: 30},
    {time: '13:18', logs: 125},
    {time: '13:24', logs: 10},
    {time: '13:30', logs: 30},
    {time: '13:36', logs: 20},
    {time: '13:42', logs: 450},
    {time: '13:48', logs: 560},
  ];

  // /*
  // * Returns array of points for total logs timeline
  // */
  // // const calcTotalLogs = () => {

  // // };

  // /*
  // * Returns array of points for total errors timeline
  // */
  // // const calcTotalErrors = () => {

  // // };

  // /*
  // * Returns array of points for total errors timeline
  // */
  // const calcTotalWarnings = () => {

  // };
  return (
    <Paper elevation={3} sx={{ height: '100%' }}>
      <Box px={5} pb={5} pt={3}>
        <Grid container direction='column' justifyContent="space-between" spacing={1}>
          <Grid item xs={3}>
            <Typography variant='h5' gutterBottom component='div'>
              Timelines
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Timeline
              total={25000}
              onClick={() => props.setFilters()}
              type="Logs"
              data={data}
            />
          </Grid>
          <Grid item xs={3}>
            <Timeline
              total={741}
              onClick={() => props.setFilters()}
              type="Errors"
              data={data}
            />
          </Grid>
          <Grid item xs={3}>
            <Timeline
              total={1572}
              onClick={() => props.setFilters()}
              type="Warnings"
              data={data}
            />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
