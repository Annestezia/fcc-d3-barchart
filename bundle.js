(function () {
  'use strict';

  const svg = d3.select("svg");

    const margin = {top: 10, right: 50, bottom: 50, left: 50};
    const w = +svg.attr("width") - margin.left - margin.right;
    const h = +svg.attr("height") - margin.top - margin.bottom;

    const dataUrl="https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
    const parseDate = d3.timeParse("%Y-%m-%d");
    const quarter=(str)=>{return Math.ceil(new Date(str).getMonth()/3+1)+"Q"};

    d3.json(dataUrl)
    .then(function(json) {
      let dataset = json.data;
      const barWidth = Math.floor((w)/ dataset.length);// 2.5;
      const [minVal, maxVal] = d3.extent(dataset, d => d[1]);
      const [minDate, maxDate] = d3.extent(dataset, d => d[0]);   
      //==============SCALING FUNCS x-dates,  y-values======
    const x = d3.scaleTime()
      .domain([parseDate(minDate),parseDate(maxDate)])
      .range([0, w]); 
    const y = d3.scaleLinear()
      .domain([0, maxVal]) //.domain([minVal, maxVal]) WHY  NOT  FROM MIN VAL???
      .range([h, margin.bottom]);  
      //===============AXES==============================
      const xAxis=d3.axisBottom(x);  
      svg.append("g")
        .attr("id","x-axis")
        .attr("transform", `translate(${margin.left},${h})`)
        .call(xAxis);
      const yAxis=d3.axisLeft(y);
      svg.append("g")
        .attr("id","y-axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(yAxis); 
    // ====================BARS=================================  
      const bars = svg
        .selectAll("rect")
        .data(dataset);

    const tooltip = d3.select('body')
    .append("div")
    .attr("id", "tooltip")
    .style("opacity", 0);

    bars.enter()
    .append("rect")      
    .attr("fill", "indigo")
    .attr("x",(d, i)=>x(parseDate(d[0]))+margin.left)
    .attr("y",(d,i)=> y(d[1]))
    .attr("width",(d,i)=>barWidth)
    .attr("height",(d,i)=> h-y(d[1]))
    .attr("data-date",d=>d[0])
    .attr("data-gdp", d=>d[1])  
    .attr("class", "bar")
    .on('mouseover',(d,i)=>{      
      tooltip.attr("data-date",d[0])
        .style("opacity", 1)
        .style("position","absolute")
        .style("left", (event.pageX+10+"px"))
        .style("top", `${h}px`)
        .text(`${quarter(d[0])} 
      /   \$${d[1]} Billion`);
    })
    .on('mouseout', (d,i)=>{
        tooltip.style("opacity", 0);
      });
    });

}());
