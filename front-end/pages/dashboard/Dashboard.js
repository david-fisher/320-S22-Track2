import React, { useEffect, useState } from 'react';
import Timelines from './Timelines';
import Counts from './Counts';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import DonutCharts from './donutchart';
import Typography from '@mui/material/Typography';
import Dropdown from './Dropdown';
import fakeData from './fake_data.json';
import moment from 'moment';
import LinearProgress from '@mui/material/LinearProgress';

/**
 * @param {Object} props
* @return {JSX.Element}
*/
export default function Dashboard(props) {
  const [timeframe, setTimeframe] = useState(60)
  const timeframeEnd = moment().startOf('minute')

  const [data, setData] = useState({
    logEvents: null,
    data: null,
  });

  const getLogEvents = async (tf) => { // yyyy-mm-dd hh24:mm:ss (String) in GMT 
    const start = moment().subtract(tf, 'minute').format('YYYY-MM-D HH:mm:SS')
    const end = moment().format('YYYY-MM-D HH:mm:SS')
    return fetch('http://cafebabebackend-env.eba-hy52pzjp.us-east-1.elasticbeanstalk.com/clog/logEvents?endTime=' + end + '&startTime=' + start + '&severities=error,warning,info&priority=medium,high')
      .then(response => response.json())
      .then((data) => {
        console.log(data)
        return data.map((e) => {
          return {
            priority: getPriority(e.priority),
            type: getSeverity(e.severity),
            time: moment.duration(timeframeEnd.diff(moment(e.creation_time).startOf('minute'))).as('minutes') 
          };
        }).filter((e) => e.time <= tf).sort((a, b) => b.time - a.time)
      })
  }

  const getSeverity = (s) => {
    if (s >= 50) {
      return 'Error'
    } else if (s <= 30) {
      return 'Warning'
    } else {
      return 'Info'
    }
  }

  const getPriority = (p) => {
    if (p === '10') {
      return 'Low'
    } else if (p === '50') {
      return 'Medium'
    } else if (p === '70') {
      return 'High'
    }
  }

  const getData = (tf) => {
    getLogEvents(timeframe).then((data) => {
      console.log("DATA: ", data)
      setData({
        logEvents: data,
        data: fakeData.filter((e) => e.time <= tf).sort((a, b) => b.time - a.time)
      });
    })
  };

  useEffect(() => {
    getData(timeframe)
  }, [timeframe])

  const changeTimeframe = (tf) => {
    if (tf == timeframe) {
      getData(tf)
    } else {
      setTimeframe(tf)
    }
  };

  // Helps show when all components have been last updated
  const getTime = () => {
    const today = new Date;
    const hr = today.getHours();
    const min = today.getMinutes();
    const sec = today.getSeconds();
    timeframeEnd = moment().startOf('minute')
    return ((hr < 10) ? '0' : '') + hr + ':' + ((min < 10) ? '0' : '') + min + ':' + ((sec < 10) ? '0' : '') + sec;
  };

  const [updateTime, setUpdateTime] = useState(getTime());

  if (data.data) {
    return (
      <div className='dashboard'>
        <Box px={6} py={3} sx={{ height: '100%', width: '100%' }}>
          <Grid container direction='row' height={'100%'} spacing={3}>
            <Grid item xs={12}>
              <Grid container style={{ alignItems: 'center' }}>
                <Grid item xs={6}>
                  <Typography variant="h4">
                    Welcome!
                  </Typography>
                </Grid>
                <Grid item xs={6} align="right">
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Dropdown timeframe={timeframe} setTimeframe={changeTimeframe} setUpdateTime={setUpdateTime} getTime={getTime} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h7">
                        Last updated at {updateTime}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Counts
                toggleLogEvents={props.toggleLogEvents}
                data={data.logEvents}
                start={moment(timeframeEnd).subtract(timeframe, 'minute').local()}
                end={moment(timeframeEnd).local()} />
            </Grid>
            <Grid item xs={12}>
              <Grid container item direction='row' spacing={5}>
                <Grid item xs={7}>
                  <DonutCharts data={data.data} toggleBP={props.toggleBP} timeframe={timeframe} />
                </Grid>
                <Grid item xs={5}>
                  <Timelines
                    toggleLogEvents={props.toggleLogEvents}
                    data={data.logEvents}
                    timeframe={timeframe}
                    end={timeframeEnd}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }
  return (
    <Box sx={{ width: '100%' }} alignItems='center' justifyContent='center'>
      <LinearProgress />
    </Box>
  );
}
