var someVar = document.getElementById("barChart");
Highcharts.chart(someVar, {
    chart: {
        type: 'column'
    },
    title: {
        text: 'UCSD FullTime Application Data'
    },
    xAxis: {
        categories: [2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007,2006, 2005].reverse()
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Total fruit consumption'
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
                color: ( // theme
                    Highcharts.defaultOptions.title.style &&
                    Highcharts.defaultOptions.title.style.color
                ) || 'gray'
            }
        }
    },
    legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
    },
    tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: true
            }
        }
    },
    series: [{
        name: "Women applied",
        data: [52265 ,46845,44430,41047,38822,35408,32049,28351,25761,25321,25775,24507,23748,22371].reverse()
    }, {
        name: "Men applied",
        data: [45636,41583,39779,37009,34618,31992,28758,25097,22332,21725,21590,20566,19838,18147].reverse()
    }]
});