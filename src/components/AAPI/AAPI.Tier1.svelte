<script>
	import { onMount } from "svelte";
	import * as d3 from "d3"; // Import d3.js
  
	// Data file import
	import movies from "$data/tier1_all.json"; 
  
	// Process movie data and count movies per year
	let moviesPerYear = {};
	let boxOfficePerYear = {};
  
	movies.forEach(movie => {
	  const year = movie.Year;
	  const boxOffice = movie.bo_revenue || 0; // Handle missing box office values
  
	  // Count movies per year
	  if (moviesPerYear[year]) {
		moviesPerYear[year]++;
	  } else {
		moviesPerYear[year] = 1;
	  }
  
	  // Accumulate box office revenue per year
	  if (boxOfficePerYear[year]) {
		boxOfficePerYear[year] += boxOffice;
	  } else {
		boxOfficePerYear[year] = boxOffice;
	  }
	});
  
	// Get the range of years (from the first year to the last year in the dataset)
	const minYear = d3.min(movies, movie => movie.Year);
	const maxYear = d3.max(movies, movie => movie.Year);
  
	// Generate a list of all years from minYear to maxYear
	const allYears = d3.range(minYear, maxYear + 1);
  
	// Create an array of objects with each year, its movie count, and box office revenue
	let years = allYears.map(year => ({
	  year,
	  count: moviesPerYear[year] || 0,  // Default to 0 if no movies for the year
	  boxOffice: boxOfficePerYear[year] || 0, // Default to 0 if no box office data
	}));
  
	// Dimensions of the chart
	const width = 700;
	const height = 300;
	const margin = { top: 40, right: 60, bottom: 50, left: 60 }; // Increased top margin for title
  
	// Set up scales for bar chart (movies count)
	const xScale = d3.scaleBand()
	  .domain(allYears)
	  .range([margin.left, width - margin.right])
	  .padding(0.1);
  
	const yScaleMovies = d3.scaleLinear()
	  .domain([0, d3.max(years, d => d.count)]) // Use the max count for y-axis
	  .range([height - margin.bottom, margin.top]);
  
	// Set up scale for line chart (box office revenue)
	const yScaleRevenue = d3.scaleLinear()
	  .domain([0, d3.max(years, d => d.boxOffice)]) // Max revenue for the line chart
	  .range([height - margin.bottom, margin.top]);
  
	// Axis generators
	const tickValues = d3.range(1985, maxYear + 1, 5);  // This creates an array of years every 5 years
  
	const xAxis = d3.axisBottom(xScale)
	  .tickValues(tickValues)  // Use tickValues to specify the custom tick positions
	  .tickFormat(d3.format("d")); // Format the tick labels to just show the year (e.g., 2010, 2015, 2020)
  
	const yAxisMovies = d3.axisLeft(yScaleMovies).ticks(d3.max(years, d => d.count) / 5);
	// Apply the custom format to the revenue axis

  
	// Create the chart when the component mounts
	onMount(() => {
	  // Select the SVG container
	  const svg = d3.select("#barChart")
		.attr("width", width)
		.attr("height", height);
  
	// Add the dotted lines for the y-axis every 5 movie counts
	const movieCountTicks = d3.range(0, d3.max(years, d => d.count), 5); // Create ticks every 5 movie counts

			svg.selectAll(".grid")
		.data(movieCountTicks) // Use the custom movie count ticks
		.enter()
		.append("line")
		.attr("class", "grid")
		.attr("x1", margin.left)  // Start the line at the left margin
		.attr("x2", width - margin.right)  // End the line at the right margin
		.attr("y1", d => yScaleMovies(d))  // Position the line based on the yScaleMovies
		.attr("y2", d => yScaleMovies(d))  // Keep the line horizontal
		.attr("stroke", "#ccc")  // Light gray color for the grid lines
		.attr("stroke-dasharray", "4 4")  // Dotted line style
		.attr("stroke-width", 1);  // Line width
		
	  // Add the chart title
	  svg.append("text")
		.attr("x", width / 2)
		.attr("y", margin.top - 10)  // Position it just above the chart
		.attr("text-anchor", "middle")
		.style("font-size", "18px")
		.style("font-weight", "bold")
		//.text("Movies with Asian Main Cast");
  
	  // Create the bars for number of movies
	  svg.selectAll(".bar")
		.data(years)
		.enter()
		.append("rect")
		.attr("class", "bar")
		.attr("x", d => xScale(d.year))
		.attr("y", d => yScaleMovies(d.count))
		.attr("width", xScale.bandwidth())
		.attr("height", d => height - margin.bottom - yScaleMovies(d.count)) // height of the bar
		.attr("fill", "steelblue");
  
	  // Add X-axis
	  svg.append("g")
		.attr("transform", `translate(0, ${height - margin.bottom})`)
		.call(xAxis)
		.selectAll("text")
		.style("text-anchor", "middle")
		.attr("transform");
  
	  // Add Y-axis for number of movies
	  svg.append("g")
		.attr("transform", `translate(${margin.left}, 0)`)
		.call(yAxisMovies);
  
	
  
	  // Add axis labels
	  svg.append("text")
		.attr("transform", `translate(${width / 2}, ${height - 10})`)
		.style("text-anchor", "middle");
		//.text("Year");
  
	  svg.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 15)
		.attr("x", -height / 2)
		.style("text-anchor", "middle")
		.text("Number of Movies");
  
  
	});
  </script>
  
  <style>
	.bar {
	  transition: fill 0.3s ease;
	}
  
	.axis text {
	  font-size: 12px;
	}
  
	.axis path,
	.axis line {
	  fill: none;
	  stroke: #000;
	  stroke-width: 1px;
	}
  
	.line {
	  transition: stroke 0.3s ease;
	}
  
	.line:hover {
	  stroke: darkred;
	}
  
	.grid {
	  stroke-dasharray: 4 4; /* Creates dotted lines */
	  stroke: #ccc;
	  stroke-width: 1px;
	}
  </style>
  
  <svg id="barChart"></svg>
  
