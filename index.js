import {
        select, 
        json,
        scaleLinear,
        extent,
        max,
        min,
        scaleTime,
        axisLeft,
        axisBottom,
        timeParse} from 'd3';



 const svg = d3
  .select("svg");
// const padding = 50;
const margin = {top: 10, right: 50, bottom: 50, left: 50};
const w = +svg.attr("width") - margin.left - margin.right;
const h = +svg.attr("height") - margin.top - margin.bottom;

//======MEMO d[0] 'date', d[1] '$$'=====

const dataUrl="https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
const parseDate = d3.timeParse("%Y-%m-%d");
const getMonth = d3.timeFormat("%m");
const quarter=(str)=>{return Math.ceil(new Date(str).getMonth()/3+1)+"Q"};
// console.log(parseDate('1947-01-01'));
d3.json(dataUrl)
  .then(function(json) {
    let dataset = json.data;
  console.log(dataset.length);
    const barWidth = Math.ceil((w)/ dataset.length); 
    const [minVal, maxVal] = d3.extent(dataset, d => d[1]);
    const [minDate, maxDate] = d3.extent(dataset, d => d[0]);   
    //==============SCALING FUNCS x-dates,  y-values======
  const x = d3.scaleTime()
    .domain([parseDate(minDate),parseDate(maxDate)])
    .range([0, w]); 
  const y = d3.scaleLinear()
    .domain([minVal, maxVal])
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
  
   bars.enter()
    .append("rect")      
    .attr("fill", "indigo")
    .attr("x",(d, i)=>i*w/dataset.length+margin.left)
    .attr("y",(d,i)=> y(d[1]))
    .attr("width",(d,i)=>w/dataset.length)
    .attr("height",(d,i)=> h-y(d[1]))
    .attr("data-date",d=>d[0])
    .attr("data-gdp", d=>d[1])  
    .attr("class", "bar")

  ;
      
//       .attr("x", (d, i)=>margin.left+i*(w/dataset.length))
//       .attr("y",(d,i)=> y(d[1]))      
//       .attr("width",(d,i)=>(w-padding-padding)/dataset.length)
//       .attr("height",(d,i)=> h-padding-y(d[1]))
//       .attr("data-date",d=>d[0])
//       .attr("data-gdp", d=>d[1])
//       .attr("fill", "indigo")
//       .attr("class", "bar")
//       .append("div")
//         .attr('class', 'tooltip')
        // .style("position", "absolute")
        // .style("visibility", "visible")
        // .text("I'm a circle!")
        // .append("title")
        // .attr("id", "tooltip")    
      //   .attr("data-date",d=>d[0])
      //   .text((d, i) => `${quarter(d[0])} 
      //   \$${d[1]} Billion`);
      });
// const svg=select('svg');

// const h=+svg.attr('height');
// const w=+svg.attr('width');
// const parseTime=timeParse("%Y-%m-%d");    
// const margin={top:20,right:20,left:20,bottom:20};
// const innerW=w-margin.left-margin.right;
// const innerH=h-margin.top-margin.bottom;
// const dataUrl="https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
// const xAxis=d3.axisBottom();
// const yAxis=d3.axisLeft();

// svg.style('background-color','pink');


// //x time
// // y value
// svg.append("g")
//   .attr("id","x-axis")
//   .attr("transform", `translate(${margin.left},${innerW})`);
// svg.append("g")
//   .attr("id","y-axis")
//   .attr("transform", `translate(${margin.top},0)`);
// const render=data=>{
  
// };
// //scaling  function
// // const xScale = d3.scaleTime()
// //     .domain([parseTime(min(json[0])),parseTime(maxDate)])
// //     .range([0, innerW]); 
// // const yScale = d3.scaleLinear()
// //     .domain([minVal, maxVal])
// //     .range([h-padding,padding]);

// json(dataUrl)
//   .then(json=> {
//     render(json.data);
//   //   const [minVal, maxVal] = d3.extent(json.data, d => d[1]);
//   // const [minDate, maxDate] = d3.extent(json.data, d => d[0]);
//     console.log(json.data);
//   });