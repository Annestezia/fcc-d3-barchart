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

const svg=select('svg');

const h=+svg.attr('height');
const w=+svg.attr('width');
const parseTime=timeParse("%Y-%m-%d");    
const margin={top:20,right:20,left:20,bottom:20};
const innerW=w-margin.left-margin.right;
const innerH=h-margin.top-margin.bottom;
const dataUrl="https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
const xAxis=d3.axisBottom();
const yAxis=d3.axisLeft();

svg.style('background-color','pink');


//x time
// y value
svg.append("g")
  .attr("id","x-axis")
  .attr("transform", `translate(${margin.left},${innerW})`);
svg.append("g")
  .attr("id","y-axis")
  .attr("transform", `translate(${margin.top},0)`);
const render=data=>{
  
};
//scaling  function
// const xScale = d3.scaleTime()
//     .domain([parseTime(min(json[0])),parseTime(maxDate)])
//     .range([0, innerW]); 
// const yScale = d3.scaleLinear()
//     .domain([minVal, maxVal])
//     .range([h-padding,padding]);

json(dataUrl)
  .then(json=> {
    render(json.data);
  //   const [minVal, maxVal] = d3.extent(json.data, d => d[1]);
  // const [minDate, maxDate] = d3.extent(json.data, d => d[0]);
    console.log(json.data);
  });