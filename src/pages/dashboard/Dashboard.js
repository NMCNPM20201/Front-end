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
  Tooltip,
} from "recharts";

// styles
import useStyles from "./styles";

// components
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import Table from "./components/Table/Table";
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
  const [years, setYears] = React.useState([]);
  React.useEffect(() => {
    axios.get("https://web-donate.herokuapp.com/donate/total_donate_by_year?year="+`${monthlyBarChart}`)
      .then(res => {
        for (var i = 0; i <= (dateObj.getUTCFullYear()-2021); i++) {
          years.push(2021+i);
        };
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
    axios.get("https://web-donate.herokuapp.com/donate/total_donate_by_month?year="+dateObj.getUTCFullYear()+"&month="+`${mainChartState}`)
      .then(res => {
        setData2(res.data.map(d=>
          d={
            day:d.day-1,
            'Momo banking': d.total_donate,
            desktop: 1000000
          }));
      });
  }, []);
  function getMainChartState(month){
    axios.get("https://web-donate.herokuapp.com/donate/total_donate_by_month?year="+dateObj.getUTCFullYear()+"&month="+`${month}`)
      .then(res => {
        setData2(res.data.map(d=>
          d={
            day:d.day-1,
            'Momo banking' : d.total_donate,
            desktop: 1000000
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
    axios.get("https://web-donate.herokuapp.com/donate/top_donate_by_day?day="+dateObj.getUTCDate()+"&month="+(dateObj.getUTCMonth()+1)+"&year="+dateObj.getUTCFullYear())
      .then(res => {
        console.log(res.data.length);
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
      <PageTitle bodyClass={classes.body} title="Dashboard"/>
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
                  value={monthlyBarChart}
                  onChange={handleChangeMonthlyBarChart}
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
                  {
                    years.map(year=>(
                      <MenuItem value={year} >{year}</MenuItem>
                    ))
                  }
                </Select>
              </div>
            }
          >
            <ResponsiveContainer width="100%" minWidth={500} height={350}>
                <BarChart 
                  margin={{ top: 0, right: 0, left: 25, bottom: 0 }}
                  data={data1}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
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
                  sx={{ colorText: '#fff' }}
                  value={mainChartState}
                  className={classes.selectYear}
                  onChange={handleChangeMainChartState}
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
                </Select>
              </div>
            }
          >
            <ResponsiveContainer width="100%" minWidth={500} height={350}>
              <ComposedChart
                margin={{ top: 0, right: 0, left: 25, bottom: 0 }}
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
                  dataKey="Momo banking"  
                  stroke={theme.palette.warning.main}
                  strokeWidth={2}
                  dot={{
                    stroke: theme.palette.warning.dark,
                    strokeWidth: 2,
                    fill: theme.palette.warning.main,
                  }}
                />
                <Tooltip />
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
