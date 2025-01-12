

<script>
	//try with the undefined window in line 13
	import { onMount } from "svelte";
	import * as d3 from "d3"; // Import d3.js
	
	// Data file import
	import movies from "$data/tier1_all.json";
	
	// Process movie data and count movies per year
	let moviesPerYear = {};
	let window = typeof globalThis !== "undefined" ? globalThis : {};
	
	movies.forEach(movie => {
	  const year = movie.Year;
	
	  // Count movies per year
	  if (moviesPerYear[year]) {
		moviesPerYear[year]++;
	  } else {
		moviesPerYear[year] = 1;
	  }
	});
	
	// Get the range of years (from the first year to the last year in the dataset)
	const minYear = d3.min(movies, movie => movie.Year);
	const maxYear = d3.max(movies, movie => 2020);
	
	// Create an array of objects with each year and its movie count
	let years = d3.range(minYear, maxYear + 1);
	
	// Group movies by every 5 years
	let groupedYears = [];
	for (let i = minYear; i <= maxYear; i += 5) {
	  let groupStart = i;
	  let groupEnd = i + 4;
	  if (groupEnd > 2023) {
		groupEnd = 2023;
	  }
	
	  // Sum up movies for the 5-year range (group)
	  let groupMovies = years
		.filter(year => year >= groupStart && year <= groupEnd)
		.reduce((sum, year) => sum + (moviesPerYear[year] || 0), 0);
	
	  groupedYears.push({
		startYear: groupStart,
		endYear: groupEnd,
		count: groupMovies
	  });
	}
	
	// Initial chart dimensions
	const maxWidth = 540;
	const maxHeight = 312;
	const margin = { top: 40, right: 30, bottom: 20, left: 30 };
	
	let width = Math.min(window.innerWidth, maxWidth); // Dynamic width, constrained to maxWidth
	let height = Math.min(window.innerHeight, maxHeight); // Dynamic height, constrained to maxHeight
	
	// Set up scales for the chart
	const xScale = d3.scaleBand()
	  .domain(groupedYears.map(d => `${d.startYear}-${d.endYear}`)) // Full year range
	  .range([margin.left, width - margin.right])
	  .padding(0.1);
	
	const yScaleMovies = d3.scaleLinear()
	  .domain([0, 100]) // Set a fixed range for the Y-axis
	  .range([height - margin.bottom, margin.top]);
	
	// Axis generators
	const xAxis = d3.axisBottom(xScale)
	  .tickFormat(d => {
		const [start, end] = d.split('-');
		const shortStart = start.slice(-2); // Get last two digits of start year
		const shortEnd = end.slice(-2); // Get last two digits of end year
		return `'${shortStart}-'${shortEnd}`;
	  });
	
	const yAxisMovies = d3.axisLeft(yScaleMovies)
	  .tickValues([20, 40, 60, 80, 100])
	  .tickFormat(d => d === 100 ? `${d} movies` : d);
	
	// Create the chart when the component mounts
	onMount(() => {
	  // Select the SVG container
	  const svg = d3.select("#groupedBarChart")
		.attr("width", width)
		.attr("height", height);
	
	  // Add a white background (rect)
	//   svg.append("rect")
	// 	.attr("width", width)
	// 	.attr("height", height)
	// 	.attr("fill", "white");  // Set background color to white
	
	  // Add the chart title
	  svg.append("text")
		.attr("x", margin.left)
		.attr("y", margin.top - 25)
		.attr("text-anchor", "start")
		.style("font-size", "12px")
		//.style("font-weight", "bold")
		.text("Hollywood Movies with Asian Leads, 1981-2020");
	
	  // Add dotted gridlines for the Y-axis ticks at every 20 units (excluding 0)
	  svg.append("g")
		.attr("class", "grid")
		.selectAll("line")
		.data([20, 40, 60, 80, 100])  // Exclude 0 from gridline data
		.enter()
		.append("line")
		.attr("x1", margin.left)  // Start of the line (left side)
		.attr("x2", width - margin.right)  // End of the line (right side)
		.attr("y1", d => yScaleMovies(d))  // Y position based on the tick
		.attr("y2", d => yScaleMovies(d))  // Same Y position for both ends (horizontal line)
		.style("stroke", "gray")  // Line color
		.style("stroke-dasharray", "3, 1")  // Dotted line style (4px dash, 4px space)
		.style("stroke-width", 1);  // Line thickness
	
	  // Create the bars for the grouped bar chart
	  svg.selectAll(".bar")
		.data(groupedYears)
		.enter()
		.append("rect")
		.attr("class", "bar")
		.attr("x", d => xScale(`${d.startYear}-${d.endYear}`))
		.attr("y", d => yScaleMovies(d.count))
		.attr("width", xScale.bandwidth())
		.attr("height", d => height - margin.bottom - yScaleMovies(d.count))
		.attr("fill", "#EE830C");
	
	  // Add X-axis
	  svg.append("g")
		.attr("transform", `translate(0, ${height - margin.bottom})`)
		.call(xAxis)
		.selectAll("text")
		.style("text-anchor", "middle")
		.style("fill", "black");
	
	  // Add Y-axis for number of movies with every 20 units
	  const yAxisGroup = svg.append("g")
		.attr("transform", `translate(${margin.left}, 0)`)
		.call(yAxisMovies);
	
	  // Remove the Y-axis line (vertical line)
	  yAxisGroup.select(".domain").remove(); // Remove the axis line (domain)

	  // Remove Y-axis tick lines
	  yAxisGroup.selectAll(".tick line").remove(); // Remove the tick lines
	
	  // Add Y-axis ticks and labels color
	  yAxisGroup.selectAll("text")
		.style("fill", "gray")
		.attr("x", 5) // Position at the start of the chart area
		.attr("dy", "-0.5em") // Move up above the gridline
		.style("text-anchor", "middle")
		.filter(d => d === 100) // Target the "100" tick label
    	.attr("transform", "translate(20, 0)"); // Center-align the text
	
		window.addEventListener("resize", () => {
  // Update width and height based on window size
  width = Math.min(window.innerWidth, maxWidth);
  height = Math.min(window.innerHeight, maxHeight);

  // Update scales with the new width/height
  xScale.range([margin.left, width - margin.right]);
  yScaleMovies.range([height - margin.bottom, margin.top]);

  // Update chart dimensions (width and height)
  svg.attr("width", width).attr("height", height);

  // Clear the entire SVG content
  svg.selectAll("*").remove();

  // Recreate the entire chart: bars, axes, gridlines, title

  // Add dotted gridlines for the Y-axis ticks at every 20 units (excluding 0)
  svg.append("g")
		.attr("class", "grid")
		.selectAll("line")
		.data([20, 40, 60, 80, 100])  // Exclude 0 from gridline data
		.enter()
		.append("line")
		.attr("x1", margin.left)  // Start of the line (left side)
		.attr("x2", width - margin.right)  // End of the line (right side)
		.attr("y1", d => yScaleMovies(d))  // Y position based on the tick
		.attr("y2", d => yScaleMovies(d))  // Same Y position for both ends (horizontal line)
		.style("stroke", "gray")  // Line color
		.style("stroke-dasharray", "3, 1")  // Dotted line style (4px dash, 4px space)
		.style("stroke-width", 1);  // Line thickness
  // Create bars
  svg.selectAll(".bar")
    .data(groupedYears)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xScale(`${d.startYear}-${d.endYear}`))
    .attr("y", d => yScaleMovies(d.count))
    .attr("width", xScale.bandwidth())
    .attr("height", d => height - margin.bottom - yScaleMovies(d.count))
    .attr("fill", "#EE830C");

	  // Add Y-axis for number of movies with every 20 units
	  const yAxisGroup = svg.append("g")
		.attr("transform", `translate(${margin.left}, 0)`)
		.call(yAxisMovies);
	
	  // Remove the Y-axis line (vertical line)
	  yAxisGroup.select(".domain").remove(); // Remove the axis line (domain)

	  // Remove Y-axis tick lines
	  yAxisGroup.selectAll(".tick line").remove(); // Remove the tick lines

  // Add the new X-axis
  svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(xScale)
      .tickFormat(d => {
        const [start, end] = d.split('-');
        const shortStart = start.slice(-2);
        const shortEnd = end.slice(-2);
        return `'${shortStart}-'${shortEnd}`;
      }))
    .selectAll("text")
    .style("text-anchor", "middle")
    .style("fill", "black");


	// Add the chart title
	svg.append("text")
		.attr("x", width / 2)
		.attr("y", margin.top - 30)
		.attr("text-anchor", "middle")
		.style("font-size", "12px")
		.style("font-weight", "bold")
		.text("Hollywood Movies with Asian Leads, 1981-2023");

	// Add Y-axis ticks and labels color
	  // Add Y-axis ticks and labels color
	  yAxisGroup.selectAll("text")
		.style("fill", "gray")
		.attr("x", 5) // Position at the start of the chart area
		.attr("dy", "-0.5em") // Move up above the gridline
		.style("text-anchor", "middle")
		.filter(d => d === 100) // Target the "100" tick label
    	.attr("transform", "translate(20, 0)"); // Center-align the text
	
});

	});
  </script>
  
  <div class="chart-container">
	<svg id="groupedBarChart"></svg>
  </div>
  
  <style>
	/* Center the SVG inside its container */
	.chart-container {
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  height: 100vh;  /* Full viewport height */
	}
  
	svg {
	  display: block;
	}
  
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
  
