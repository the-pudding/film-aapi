<script>
  import { onMount } from "svelte";
  import * as d3 from "d3"; // Import d3.js
  
  // Data file import
  import movies from "$data/tier1_all.json"; 
  
  // Process movie data and accumulate box office revenue per 5-year group
  let boxOfficePerGroup = {};
  
  movies.forEach(movie => {
    const year = movie.Year;
    const boxOffice = movie.bo_revenue || 0; // Handle missing box office values
    
    // Determine the group based on the 5-year interval
    const groupStart = Math.floor((year - 1981) / 5) * 5 + 1981; // Calculate the starting year of the group
    const groupEnd = groupStart + 4; // 5-year group
    
    // Accumulate box office revenue per 5-year group
    if (boxOfficePerGroup[groupStart]) {
      boxOfficePerGroup[groupStart] += boxOffice;
    } else {
      boxOfficePerGroup[groupStart] = boxOffice;
    }
  });
  
  // Get the range of years (from the first year to the last year in the dataset)
  const minYear = d3.min(movies, movie => movie.Year);
  const maxYear = d3.max(movies, movie => movie.Year);
  
  // Create an array of grouped years with total box office revenue
  let groupedYears = [];
  for (let i = minYear; i <= maxYear; i += 5) {
    let groupStart = i;
    let groupEnd = i + 4;
    if (groupEnd > maxYear) {
      groupEnd = maxYear;
    }
    const revenue = boxOfficePerGroup[groupStart] || 0; // Default to 0 if no revenue
    groupedYears.push({
      startYear: groupStart,
      endYear: groupEnd,
      boxOffice: revenue,
    });
  }
  
  // Dimensions of the chart
  const width = 800;
  const height = 400;
  const margin = { top: 40, right: 60, bottom: 60, left: 60 }; // Increased bottom margin for label
  
  // Set up scales for bar chart (box office revenue)
  const xScale = d3.scaleBand()
    .domain(groupedYears.map(d => `${d.startYear}-${d.endYear}`))
    .range([margin.left, width - margin.right])
    .padding(0.1);
  
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(groupedYears, d => d.boxOffice)]) // Use the max box office for y-axis
    .range([height - margin.bottom, margin.top]);
  
  // Axis generators
  const xAxis = d3.axisBottom(xScale); // Format the tick labels to show the group (e.g., "1981-1985")
  
  // Format the revenue on the Y-axis with "k", "M", etc.
  const yAxis = d3.axisLeft(yScale)
    .tickFormat(d3.format(".0s")) // This will display values like 10k, 1M, etc.
    .ticks(6); // Number of ticks on the Y-axis for better granularity
  
  // Create the chart when the component mounts
  onMount(() => {
    // Select the SVG container
    const svg = d3.select("#barChart")
      .attr("width", width)
      .attr("height", height);


  // Add the chart title back
  svg.append("text")
		.attr("x", width / 2)
		.attr("y", margin.top - 10)
		.attr("text-anchor", "middle")
		.style("font-size", "18px")
		.style("font-weight", "bold")
		.text("Asian Movie Box Office Revenue USD, 1981-2023"); // Title text
  
    // Add bars for box office revenue (grouped by 5 years)
    svg.selectAll(".bar")
      .data(groupedYears)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(`${d.startYear}-${d.endYear}`))
      .attr("y", d => yScale(d.boxOffice))
      .attr("width", xScale.bandwidth())
      .attr("height", d => height - margin.bottom - yScale(d.boxOffice))
      .attr("fill", "steelblue");
  
    // Add X-axis
    svg.append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "middle")
      .style("fill", "gray");
  
    // Add Y-axis for box office revenue (on the left side)
    const yAxisGroup = svg.append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(yAxis);
  
    // Remove the Y-axis line (vertical line)
    yAxisGroup.select(".domain").remove(); // Remove the axis line (domain)
  
    // Add Y-axis ticks and labels color
    yAxisGroup.selectAll("text")
      .style("fill", "gray");
  
    // Add dotted gridlines for the Y-axis ticks at every 20 units (excluding 0)
    svg.append("g")
      .attr("class", "grid")
      .selectAll("line")
      .data([2000000000, 4000000000, 6000000000, 8000000000, 10000000000])  // Exclude 0 from gridline data
      .enter()
      .append("line")
      .attr("x1", margin.left)  // Start of the line (left side)
      .attr("x2", width - margin.right)  // End of the line (right side)
      .attr("y1", d => yScale(d))  // Y position based on the tick
      .attr("y2", d => yScale(d))  // Same Y position for both ends (horizontal line)
      .style("stroke", "gray")  // Line color
      .style("stroke-dasharray", "4, 4")  // Dotted line style (4px dash, 4px space)
      .style("stroke-width", 1);  // Line thickness
  });
</script>

<svg id="barChart"></svg>

<style>

  .axis path,
  .axis line {
    fill: none;
    stroke: none; /* Remove the axis line */
    stroke-width: 1px;
  }

  .grid {
    stroke-dasharray: 4 4; /* Creates dotted lines */
    stroke: gray;
    stroke-width: 1px;
  }

  .tick line {
    stroke: none; /* Hide the tick lines */
  }
</style>
