import React, { useState } from "react";
<<<<<<< HEAD
=======
import axios from 'axios';
>>>>>>> Hiep
import {
  Grid,
  Select,
  OutlinedInput,
  MenuItem,
} from "@material-ui/core";
<<<<<<< HEAD
import { useTheme } from "@material-ui/styles";
=======
import { useTheme  } from "@material-ui/styles";
import { createTheme } from '@mui/material/styles';
>>>>>>> Hiep
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
<<<<<<< HEAD
=======
  Tooltip,
>>>>>>> Hiep
} from "recharts";

// styles
import useStyles from "./styles";

// components
<<<<<<< HEAD
import mock from "./mock";
=======
>>>>>>> Hiep
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import Table from "./components/Table/Table";
<<<<<<< HEAD

const mainChartData = getMainChartData();

export default function Dashboard(props) {
  var classes = useStyles();
  var theme = useTheme();

  return (
    <>
      <PageTitle title="Dashboard"/>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget
=======
//----API-------
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
  const dateObj = new Date();
  const [data1, setData1] = React.useState([]);
  React.useEffect(() => {
    axios.get("https://web-donate.herokuapp.com/donate/total_donate_by_year?year="+`${monthlyBarChart}`)
      .then(res => {
        setData1(res.data.map(d=>
          d={
            'Momo banking' : d.total_donate
          }));
      });
  }, []);
  function getMonthlyBarChart(year){
    axios.get("https://web-donate.herokuapp.com/donate/total_donate_by_year?year="+`${year}`)
      .then(res => {
        setData1(res.data.map(d=>
          d={
            'Momo banking' : d.total_donate
          }));
      });
    };
  const [data2, setData2] = React.useState([]);
  React.useEffect(() => {
    axios.get("https://web-donate.herokuapp.com/donate/total_donate_by_month?year=2021&month="+`${mainChartState}`)
      .then(res => {
        setData2(res.data.map(d=>
          d={
            day:d.day-1,
            'Momo banking': d.total_donate,
            desktop: 500000
          }));
      });
  }, []);
  function getMainChartState(month){
    axios.get("https://web-donate.herokuapp.com/donate/total_donate_by_month?year=2021&month="+`${month}`)
      .then(res => {
        setData2(res.data.map(d=>
          d={
            day:d.day-1,
            'Momo banking' : d.total_donate,
            desktop: 500000
          }));
      });
  }
  const [data3, setData3] = React.useState([
    {
    nameID_Momo: "No Name",
    sumMoney: 0
    },
  ]);
  React.useEffect(() => {
    axios.get("https://web-donate.herokuapp.com/donate/top_donate_by_day?day="+dateObj.getUTCDate()+"&month="+dateObj.getUTCMonth()+1+"&year="+dateObj.getUTCFullYear())
      .then(res => {
        if(res.data.length!=0){
        setData3(res.data.map(d=>
          d={
            nameID_Momo: d.nameID_Momo,
            sumMoney: d.sumMoney
          }));
        };
      });
  }, []);
  const [monthlyBarChart,setMonthlyBarChart]=React.useState(dateObj.getUTCFullYear());
  function handleChangeMonthlyBarChart(e){
    setMonthlyBarChart(e.target.value);
    getMonthlyBarChart(e.target.value);
  }
  const [mainChartState,setMainChartState]=React.useState(dateObj.getUTCMonth()+1);
  function handleChangeMainChartState(e){
    setMainChartState(e.target.value);
    getMainChartState(e.target.value);
  }
  return (
    <>
      <PageTitle bodyClass={classes.body}  title="Dashboard"/>
      <Grid elevation={0} container spacing={4}>
        <Grid item xs={12}>
          <Widget
            elevation={0}
>>>>>>> Hiep
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
<<<<<<< HEAD
                  value="0"
=======
                className={classes.selectYear}
                  value={monthlyBarChart}
                  onChange={handleChangeMonthlyBarChart}
>>>>>>> Hiep
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
<<<<<<< HEAD
                  <MenuItem value="0">2020</MenuItem>
                  <MenuItem value="1">2021</MenuItem>
                  <MenuItem value="2">2022</MenuItem>
=======
                  <MenuItem value="2021">2021</MenuItem>
                  <MenuItem value="2022">2022</MenuItem>
                  <MenuItem value="2023">2023</MenuItem>
>>>>>>> Hiep
                </Select>
              </div>
            }
          >
            <ResponsiveContainer width="100%" minWidth={500} height={350}>
<<<<<<< HEAD
              <BarChart width={730} height={250} data={mock.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
=======
                <BarChart width={730} height={250} data={data1}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
>>>>>>> Hiep
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
<<<<<<< HEAD
                <Select
                  value="0"
                  //onChange={e => setMainChartState(e.target.value)}
=======
                <Select 
                  sx={{ colorText: '#fff' }}
                  value={mainChartState}
                  className={classes.selectYear}
                  onChange={handleChangeMainChartState}
>>>>>>> Hiep
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
<<<<<<< HEAD
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
=======
                  <MenuItem value="1">Jan</MenuItem>
                  <MenuItem value="2">Feb</MenuItem>
                  <MenuItem value="3">Mar</MenuItem>
                  <MenuItem value="4">Apr</MenuItem>
                  <MenuItem value="5">May</MenuItem>
                  <MenuItem value="6">Jun</MenuItem>
                  <MenuItem value="7">Jul</MenuItem>
                  <MenuItem value="8">Aug</MenuItem>
                  <MenuItem value="9">Sep</MenuItem>
                  <MenuItem value="10">Oct</MenuItem>
                  <MenuItem value="11">Nov</MenuItem>
                  <MenuItem value="12">Dec</MenuItem>
>>>>>>> Hiep
                </Select>
              </div>
            }
          >
            <ResponsiveContainer width="100%" minWidth={500} height={350}>
              <ComposedChart
<<<<<<< HEAD
                margin={{ top: 0, right: -15, left: -15, bottom: 0 }}
                data={mainChartData}
              >
                <YAxis
                  ticks={[0, 2500, 5000, 7500]}
                  tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                  stroke={theme.palette.text.hint + "80"}
                  tickLine={false}
                />
                <XAxis
=======
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                data={data2}

              >
                <YAxis
                  
                  // ticks={[0,250000, 500000,750000, 1000000,1250000, 1500000]}
                  // tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                  // stroke={theme.palette.text.hint + "80"}
                  // tickLine={false}
                />
                <XAxis
                  dataKey="day"
>>>>>>> Hiep
                  tickFormatter={i => i + 1}
                  tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                  stroke={theme.palette.text.hint + "80"}
                  tickLine={false}
                />
                <Area
                  type="natural"
                  dataKey="desktop"
<<<<<<< HEAD
                  fill={theme.palette.background.light}
=======
                  fill={them.palette.background.dark}
>>>>>>> Hiep
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
<<<<<<< HEAD
                  dataKey="tablet"
=======
                  dataKey="Momo banking"  
>>>>>>> Hiep
                  stroke={theme.palette.warning.main}
                  strokeWidth={2}
                  dot={{
                    stroke: theme.palette.warning.dark,
                    strokeWidth: 2,
                    fill: theme.palette.warning.main,
                  }}
                />
<<<<<<< HEAD
=======
                <Tooltip />
>>>>>>> Hiep
              </ComposedChart>
            </ResponsiveContainer>
          </Widget>
        </Grid>
<<<<<<< HEAD
        <Grid item xs={12}>
          <Widget
            title="Monthly Top Donation"
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
          >
            <Table data={mock.table} />
          </Widget>
=======
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
>>>>>>> Hiep
        </Grid>
      </Grid>
    </>
  );
}
<<<<<<< HEAD

function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
  var array = new Array(length).fill();
  let lastValue;

  return array.map((item, index) => {
    let randomValue = Math.floor(Math.random() * multiplier + 1);

    while (
      randomValue <= min ||
      randomValue >= max ||
      (lastValue && randomValue - lastValue > maxDiff)
    ) {
      randomValue = Math.floor(Math.random() * multiplier + 1);
    }

    lastValue = randomValue;

    return { value: randomValue };
  });
}

function getMainChartData() {
  var resultArray = [];
  var tablet = getRandomData(31, 3500, 6500, 7500, 1000);
  var desktop = getRandomData(31, 1500, 7500, 7500, 1500);
  var mobile = getRandomData(31, 1500, 7500, 7500, 1500);

  for (let i = 0; i < tablet.length; i++) {
    resultArray.push({
      tablet: tablet[i].value,
      desktop: desktop[i].value,
      mobile: mobile[i].value,
    });
  }

  return resultArray;
}
=======
>>>>>>> Hiep
