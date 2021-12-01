var dataAPI = "http://localhost:3000/data" 
var tableAPI="http://localhost:3000/table"
var mainChartDataAPI="http://localhost:3000/mainChartData"
function getTable (){
  fetch(tableAPI)
      .then(function(response){
          return response.json();
      })
      .then(function(dataTable) {
       mock.table = dataTable;
      });
};
function getData (){
  fetch(dataAPI)
      .then(function(response){
          return response.json();
      })
      .then(function(data) {
       mock.data = data;
      });
};
function getMainChartData (){
  fetch(mainChartDataAPI)
      .then(function(response){
          return response.json();
      })
      .then(function(mainChartData) {
       mock.mainChartData = mainChartData;
      });
};
getData();
getTable ();
getMainChartData();

var mock = {
   data: [
    {
      "day": "Jan",
      "Momo banking": 1000000,
      "Other": 500000,
    },
    {
      "day": "Feb",
      "Momo banking": 2000000,
      "Other": 1000000,
    },
    {
      "day": "Mar",
      "Momo banking": 200000,
      "Other": 100000,
    },
    {
      "day": "Apr",
      "Momo banking": 600000,
      "Other": 1400000,
    },
    {
      "day": "May",
      "Momo banking": 2000000,
      "Other": 300000,
    },
    {
      "day": "Jun",
      "Momo banking": 1500000,
      "Other": 100000,
    },
    {
      "day": "Jul",
      "Momo banking": 1200000,
      "Other": 700000,
    },
    {
      "day": "Aug",
      "Momo banking": 800000,
      "Other": 1000000,
    },
    {
      "day": "Sep",
      "Momo banking": 1100000,
      "Other": 1700000,
    },
    {
      "day": "Oct",
      "Momo banking": 800000,
      "Other": 600000,
    },
    {
      "day": "Nov",
      "Momo banking": 700000,
      "Other": 1100000,
    },
    {
      "day": "Dec",
      "Momo banking": 1300000,
      "Other": 1600000,
    },
  ],
    table: [
    {
      id: 0,
      name: "",
      bankingNum: "",
      date: "",
      money: "",
    },
    {
      id: 1,
      name: "",
      bankingNum: "",
      date: "",
      money: "",
    },
    {
      id: 2,
      name: "",
      bankingNum: "",
      date: "",
      money: "",
    },
    {
      id: 3,
      name: "",
      bankingNum: "",
      date: "",
      money: "",
    },
    {
      id: 4,
      name: "",
      bankingNum: "",
      date: "",
      money: "",
    }
  ],
  mainChartData:[
    {
      day: 0,
      mobile: 5000,
      tablet: 5000,
      desktop: 5000,
    },
    {
      day: 1,
      mobile: 5000,
      tablet: 5000,
      desktop: 5000,
    },
    {
      day: 2,
      mobile: 5000,
      tablet: 5000,
      desktop: 5000,
    },
    {
      day: 3,
      mobile: 5000,
      tablet: 5000,
      desktop: 5000,
    },
    {
      day: 4,
      mobile: 5000,
      tablet: 5000,
      desktop: 5000,
    },
    {
      day: 5,
      mobile: 5000,
      tablet: 5000,
      desktop: 5000,
    },
    {
      day: 6,
      mobile: 5000,
      tablet: 5000,
      desktop: 5000,
    },
    {
      day: 7,
      mobile: 5000,
      tablet: 5000,
      desktop: 5000,
    },
    {
      day: 8,
      mobile: 5000,
      tablet: 5000,
      desktop: 5000,
    },
    {
      day: 9,
      mobile: 5000,
      tablet: 5000,
      desktop: 5000,
    },
    {
      day: 10,
      mobile: 5000,
      tablet: 5000,
      desktop: 5000,
    },
    {
      day: 11,
      mobile: 5000,
      tablet: 5000,
      desktop: 5000,
    },
    {
      day: 12,
      mobile: 5000,
      tablet: 5000,
      desktop: 5000,
    },
    {
      day: 13,
      mobile: 5000,
      tablet: 5000,
      desktop: 5000,
    },
    {
      day: 14,
      mobile: 5000,
      tablet: 5000,
      desktop: 5000,
    },
    {
      day: 15,
      mobile: 5000,
      tablet: 5000,
      desktop: 5000,
    },
    {
      day: 16,
      mobile: 5000,
      tablet: 5000,
      desktop: 5000,
    },
    {
      day: 17,
      mobile: 5000,
      tablet: 5000,
      desktop: 5000,
    },
    {
      day: 18,
      mobile: 5000,
      tablet: 5000,
      desktop: 5000,
    },
    {
      day: 19,
      mobile: 5000,
      tablet: 5000,
      desktop: 5000,
    },
    {
      day: 20,
      mobile: 5000,
      tablet: 5000,
      desktop: 5000,
    },
    {
      day: 21,
      mobile: 5000,
      tablet: 5000,
      desktop: 5000,
    },
    {
      day: 22,
      mobile: 5000,
      tablet: 5000,
      desktop: 5000,
    },
    {
      day: 23,
      mobile: 5000,
      tablet: 5000,
      desktop: 5000,
    },
    {
      day: 24,
      mobile: 5000,
      tablet: 5000,
      desktop: 5000,
    },
    {
      day: 25,
      mobile: 5000,
      tablet: 5000,
      desktop: 5000,
    },
    {
      day: 26,
      mobile: 5000,
      tablet: 5000,
      desktop: 5000,
    },
    {
      day: 27,
      mobile: 5000,
      tablet: 5000,
      desktop: 5000,
    },
    {
      day: 28,
      mobile: 5000,
      tablet: 5000,
      desktop: 5000,
    },
    {
      day: 29,
      mobile: 5000,
      tablet: 5000,
      desktop: 5000,
    },
    {
      day: 30,
      mobile: 5000,
      tablet: 5000,
      desktop: 5000,
    }
  ]
};
// var abc;
// getCourses (dataAPI,abc);
// getCourses (tableAPI,mock.table);
// console.log(abc);
// mock.data=abc;
// console.log(mock.data);

export default mock;