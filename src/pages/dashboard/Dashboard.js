import React, { useState } from "react";
import axios from 'axios';
import {
  Grid,
  Select,
  OutlinedInput,
  MenuItem,
} from "@material-ui/core";
import { useTheme  } from "@material-ui/styles";
import { createTheme } from '@mui/material/styles';
import {
  ResponsiveContainer,
  ComposedChart,
  BarChart,
  CartesianGrid,
  Legend,
  Bar,
  Line,
  Area,
  YAxis,
  XAxis,
} from "recharts";

// styles
import useStyles from "./styles";

// components
import data from "./data.js";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import Table from "./components/Table/Table";
//----API-------
const MoMonthlyBarChartAPI ="https://web-donate.herokuapp.com/donate/total_donate_by_year?year=2021"
const MonthlyLineChartAPI ="https://web-donate.herokuapp.com/donate/total_donate_by_month?year=2021&month=12"
const MonthlyToDonationAPI ="http://localhost:3000/table"
//---------------------------------
export default function Dashboard(props) {
  var classes = useStyles();
  var theme = useTheme();
  const them = createTheme({
    palette: {
      background: {
        dark: '#424242',
      },
    },
  });
  const [data1, setData1] = React.useState([]);
  React.useEffect(() => {
    axios.get(MoMonthlyBarChartAPI)
      .then(res => {
        setData1(res.data.map(d=>
          d={
            'Momo banking' : d.total_donate
          }));
      });
  }, []);
  const [data2, setData2] = React.useState([]);
  React.useEffect(() => {
    axios.get(MonthlyLineChartAPI)
      .then(res => {
        setData2(res.data.map(d=>
          d={
            day:d.day-1,
            tablet : d.total_donate,
            desktop: 750000
          }));
      });
  }, []);
  const [data3, setData3] = React.useState([
    {
      id: 0,
      name: "",
      bankingNum: "",
      date: "",
      money: "",
    },
  ]);
  React.useEffect(() => {
    axios.get(MonthlyToDonationAPI)
      .then(res => {
        setData3(res.data);
      });
  }, []);
  return (
    <>
      <PageTitle bodyClass={classes.body}  title="Dashboard"/>
      <Grid elevation={0} container spacing={4}>
        <Grid item xs={12}>
          <Widget
            elevation={0}
            bodyClass={classes.mainChartBody}
            header={
              <div className={classes.mainChartHeader}>
                <Typography
                  variant="h5"
                  color="text"
                  colorBrightness="secondary"
                >
                  Monthly Bar Chart
                </Typography>
                <Select
                className={classes.selectYear}
                  value="0"
                  input={
                    <OutlinedInput
                      labelWidth={0}
                      classes={{
                        notchedOutline: classes.mainChartSelectRoot,
                        input: classes.mainChartSelect,
                      }}
                    />
                  }
                  autoWidth
                >
                  <MenuItem value="0">2020</MenuItem>
                  <MenuItem value="1">2021</MenuItem>
                  <MenuItem value="2">2022</MenuItem>
                </Select>
              </div>
            }
          >
            <ResponsiveContainer width="100%" minWidth={500} height={350}>
                <BarChart width={730} height={250} data={data1}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Legend />
                <Bar dataKey="Momo banking" fill="#8884d8" />
                <Bar dataKey="Other" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Widget>
        </Grid>
        <Grid item xs={12}>
          <Widget
            bodyClass={classes.mainChartBody}
            header={
              <div className={classes.mainChartHeader}>
                <Typography
                  variant="h5"
                  color="text"
                  colorBrightness="secondary"
                >
                  Monthly Line Chart
                </Typography>
                <div className={classes.mainChartHeaderLabels}>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="warning" />
                    <Typography className={classes.mainChartLegentElement}>
                      Momo banking
                    </Typography>
                  </div>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="primary" />
                    <Typography className={classes.mainChartLegentElement}>
                      Other
                    </Typography>
                  </div>
                </div>
                <Select 
                  value="11"
                  className={classes.selectMonth}
                  //onChange={e => setMainChartState(e.target.value)}
                  input={
                    <OutlinedInput
                      labelWidth={0}
                      classes={{
                        notchedOutline: classes.mainChartSelectRoot,
                        input: classes.mainChartSelect,
                      }}
                    />
                  }
                  autoWidth
                >
                  <MenuItem value="0">Jan</MenuItem>
                  <MenuItem value="1">Feb</MenuItem>
                  <MenuItem value="2">Mar</MenuItem>
                  <MenuItem value="3">Apr</MenuItem>
                  <MenuItem value="4">May</MenuItem>
                  <MenuItem value="5">Jun</MenuItem>
                  <MenuItem value="6">Jul</MenuItem>
                  <MenuItem value="7">Aug</MenuItem>
                  <MenuItem value="8">Sep</MenuItem>
                  <MenuItem value="9">Oct</MenuItem>
                  <MenuItem value="10">Nov</MenuItem>
                  <MenuItem value="11">Dec</MenuItem>
                </Select>
              </div>
            }
          >
            <ResponsiveContainer width="100%" minWidth={500} height={350}>
              <ComposedChart
                margin={{ top: 0, right: -15, left: -15, bottom: 0 }}
                data={data2}
              >
                <YAxis
                  
                  ticks={[0, 500000, 1000000, 1500000]}
                  tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                  stroke={theme.palette.text.hint + "80"}
                  tickLine={false}
                />
                <XAxis
                  dataKey="day"
                  tickFormatter={i => i + 1}
                  tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                  stroke={theme.palette.text.hint + "80"}
                  tickLine={false}
                />
                <Area
                  type="natural"
                  dataKey="desktop"
                  fill={them.palette.background.dark}
                  strokeWidth={0}
                  activeDot={false}
                />
                <Line
                  type="natural"
                  dataKey="mobile"
                  stroke={theme.palette.primary.main}
                  strokeWidth={2}
                  dot={false}
                  activeDot={false}
                />
                <Line
                  type="linear"
                  dataKey="tablet"  
                  stroke={theme.palette.warning.main}
                  strokeWidth={2}
                  dot={{
                    stroke: theme.palette.warning.dark,
                    strokeWidth: 2,
                    fill: theme.palette.warning.main,
                  }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </Widget>
        </Grid>
        <Grid  item xs={12}>
          <Widget
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
            header={
              <Typography
                  variant="h5"
                  color="text"
                  colorBrightness="secondary"
                >
                Monthly To Donation
                </Typography>
            }
          >
            <Table data={data3}/>
          </Widget>   
        </Grid>
      </Grid>
    </>
  );
}

// function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
//   var array = new Array(length).fill();
//   let lastValue;

//   return array.map((item, index) => {
//     let randomValue = Math.floor(Math.random() * multiplier + 1);

//     while (
//       randomValue <= min ||
//       randomValue >= max ||
//       (lastValue && randomValue - lastValue > maxDiff)
//     ) {
//       randomValue = Math.floor(Math.random() * multiplier + 1);
//     }

//     lastValue = randomValue;

//     return { value: randomValue };
//   });
// }

// function getMainChartData() {
//   var resultArray = [];
//   var tablet = getRandomData(31, 3500, 6500, 7500, 1000);
//   var desktop = getRandomData(31, 1500, 7500, 7500, 1500);
//   var mobile = getRandomData(31, 1500, 7500, 7500, 1500);

//   for (let i = 0; i < tablet.length; i++) {
//     resultArray.push({
//       tablet: tablet[i].value,
//       desktop: desktop[i].value,
//       mobile: mobile[i].value,
//     });
//   }

//   return resultArray;
// }
