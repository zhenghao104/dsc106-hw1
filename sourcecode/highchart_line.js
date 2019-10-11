var series = [
    {
        name: "Women applied",
        data: [52265 ,46845,44430,41047,38822,35408,32049,28351,25761,25321,25775,24507,23748,22371].reverse()
    },
    {
        name: "Men applied",
        data: [45636,41583,39779,37009,34618,31992,28758,25097,22332,21725,21590,20566,19838,18147].reverse()
    }  
];

// Configuration about the plot
var title = {
    text: 'UCSD Fulltime application data'   
 };

 var xAxis = {
    categories: [2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007,2006, 2005].reverse()
 };

 var yAxis = {
    title: {
       text: 'Number of students'
    },
    plotLines: [{
       value: 0,
       width: 1,
       color: '#808080'
    }]
 }; 

 var tooltip = {
    valueSuffix: '\xB0C'    // /xB0C is basically degrees
 }
 var legend = {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle',
    borderWidth: 0
 };

 // Data structure to hold all the configurations together
 var json = {};

  // Tying all the configurations
json.title = title;
json.xAxis = xAxis;
json.yAxis = yAxis;
json.tooltip = tooltip;
json.legend = legend;

// Tying the data as the series data
json.series = series;

// We need to couple the chart data structure with the chartPlaceHolder div
var someVar = document.getElementById("lineChart");
Highcharts.chart(someVar, json);
