var data = [
    {
      name: "Women applied",
      values: [
        {date: "2005", number_of_students: 22371},
        {date: "2006", number_of_students: 23748},
        {date: "2007", number_of_students: 24507},
        {date: "2008", number_of_students: 25775},
        {date: "2009", number_of_students: 25321},
        {date: "2010", number_of_students: 25761},
        {date: "2011", number_of_students: 28351},
        {date: "2012", number_of_students: 32049},
        {date: "2013", number_of_students: 35408},
        {date: "2014", number_of_students: 38822},
        {date: "2015", number_of_students: 41047},
        {date: "2016", number_of_students: 44430},
        {date: "2017", number_of_students: 46845},
        {date: "2018", number_of_students: 52265}
      ]
    },
    {
      name: "Men applied",
      values: [
        {date: "2005", number_of_students: 18147},
        {date: "2006", number_of_students: 19838},
        {date: "2007", number_of_students: 20566},
        {date: "2008", number_of_students: 21590},
        {date: "2009", number_of_students: 21725},
        {date: "2010", number_of_students: 22332},
        {date: "2011", number_of_students: 25097},
        {date: "2012", number_of_students: 28758},
        {date: "2013", number_of_students: 31992},
        {date: "2014", number_of_students: 34618},
        {date: "2015", number_of_students: 37009},
        {date: "2016", number_of_students: 39779},
        {date: "2017", number_of_students: 41583},
        {date: "2018", number_of_students: 45636}
      ]
    }
  ];
  
  var width = 500;
  var height = 300;
  var margin = 50;
  var duration = 250;
  
  var lineOpacity = "0.25";
  var lineOpacityHover = "0.85";
  var otherLinesOpacityHover = "0.1";
  var lineStroke = "1.5px";
  var lineStrokeHover = "2.5px";
  
  var circleOpacity = '0.85';
  var circleOpacityOnLineHover = "0.25"
  var circleRadius = 3;
  var circleRadiusHover = 6;
  
  
  /* Format Data */
  var parseDate = d3.timeParse("%Y");
  data.forEach(function(d) { 
    d.values.forEach(function(d) {
      d.date = parseDate(d.date);
      d.number_of_students = +d.number_of_students;    
    });
  });
  
  
  /* Scale */
  var xScale = d3.scaleTime()
    .domain(d3.extent(data[0].values, d => d.date))
    .range([0, width-margin]);
  
  var yScale = d3.scaleLinear()
    .domain([0, d3.max(data[0].values, d => d.number_of_students)])
    .range([height-margin, 0]);
  
  var color = d3.scaleOrdinal(d3.schemeCategory10);
  
  /* Add SVG */
  var svg = d3.select("#d3_line").append("svg")
    .attr("width", (width+margin)+"px")
    .attr("height", (height+margin)+"px")
    .append('g')
    .attr("transform", `translate(${margin}, ${margin})`);
  
  
  /* Add line into SVG */
  var line = d3.line()
    .x(d => xScale(d.date))
    .y(d => yScale(d.number_of_students));
  
  let lines = svg.append('g')
    .attr('class', 'lines');
  
  lines.selectAll('.line-group')
    .data(data).enter()
    .append('g')
    .attr('class', 'line-group')  
    .on("mouseover", function(d, i) {
        svg.append("text")
          .attr("class", "title-text")
          .style("fill", color(i))        
          .text(d.name)
          .attr("text-anchor", "middle")
          .attr("x", (width-margin)/2)
          .attr("y", 5);
      })
    .on("mouseout", function(d) {
        svg.select(".title-text").remove();
      })
    .append('path')
    .attr('class', 'line')  
    .attr('d', d => line(d.values))
    .style('stroke', (d, i) => color(i))
    .style('opacity', lineOpacity)
    .on("mouseover", function(d) {
        d3.selectAll('.line')
                      .style('opacity', otherLinesOpacityHover);
        d3.selectAll('.circle')
                      .style('opacity', circleOpacityOnLineHover);
        d3.select(this)
          .style('opacity', lineOpacityHover)
          .style("stroke-width", lineStrokeHover)
          .style("cursor", "pointer");
      })
    .on("mouseout", function(d) {
        d3.selectAll(".line")
                      .style('opacity', lineOpacity);
        d3.selectAll('.circle')
                      .style('opacity', circleOpacity);
        d3.select(this)
          .style("stroke-width", lineStroke)
          .style("cursor", "none");
      });
  
  
  /* Add circles in the line */
  lines.selectAll("circle-group")
    .data(data).enter()
    .append("g")
    .style("fill", (d, i) => color(i))
    .selectAll("circle")
    .data(d => d.values).enter()
    .append("g")
    .attr("class", "circle")  
    .on("mouseover", function(d) {
        d3.select(this)     
          .style("cursor", "pointer")
          .append("text")
          .attr("class", "text")
          .text(`${d.number_of_students}`)
          .attr("x", d => xScale(d.date) + 5)
          .attr("y", d => yScale(d.number_of_students) - 10);
      })
    .on("mouseout", function(d) {
        d3.select(this)
          .style("cursor", "none")  
          .transition()
          .duration(duration)
          .selectAll(".text").remove();
      })
    .append("circle")
    .attr("cx", d => xScale(d.date))
    .attr("cy", d => yScale(d.number_of_students))
    .attr("r", circleRadius)
    .style('opacity', circleOpacity)
    .on("mouseover", function(d) {
          d3.select(this)
            .transition()
            .duration(duration)
            .attr("r", circleRadiusHover);
        })
      .on("mouseout", function(d) {
          d3.select(this) 
            .transition()
            .duration(duration)
            .attr("r", circleRadius);  
        });
  
  
  /* Add Axis into SVG */
  var xAxis = d3.axisBottom(xScale).ticks(5);
  var yAxis = d3.axisLeft(yScale).ticks(5);
  
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${height-margin})`)
    .call(xAxis)
    .append('text')
    .attr("x", 200)
    .attr("y", 40)
    .attr("fill", "#000")
    .text("Year");

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append('text')
    .attr("y", -43)
    .attr("x",-60)
    .attr("transform", "rotate(-90)")
    .attr("fill", "#000")
    .text("Number of students");