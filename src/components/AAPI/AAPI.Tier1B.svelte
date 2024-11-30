<script>
    import { onMount } from "svelte";
    import * as d3 from "d3"; // Import d3.js
  
    // Data file import
    import movies from "$data/tier1_all.json"; 
  
    // Process movie data and accumulate box office revenue per year
    let boxOfficePerYear = {};
  
    movies.forEach(movie => {
      const year = movie.Year;
      const boxOffice = movie.bo_revenue || 0; // Handle missing box office values
  
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
  
    // Create an array of objects with each year and box office revenue
    let years = allYears.map(year => ({
      year,
      boxOffice: boxOfficePerYear[year] || 0, // Default to 0 if no box office data
    }));
  
    // Dimensions of the chart
    const width = 900;
    const height = 600;
    const margin = { top: 20, right: 60, bottom: 50, left: 60 };
  
    // Set up scales for bar chart (box office revenue)
    const xScale = d3.scaleBand()
      .domain(allYears)
      .range([margin.left, width - margin.right])
      .padding(0.1);
  
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(years, d => d.boxOffice)]) // Use the max box office for y-axis
      .range([height - margin.bottom, margin.top]);
  
    // Axis generators
    // Update x-axis to show ticks every 5 years
    const tickValues = d3.range(1985, maxYear + 1, 5);  // This creates an array of years every 5 years
  
    const xAxis = d3.axisBottom(xScale)
      .tickValues(tickValues)  // Use tickValues to specify the custom tick positions
      .tickFormat(d3.format("d")); // Format the tick labels to just show the year (e.g., 2010, 2015, 2020)
  
    // Use d3.format(".0s") to format the revenue on the Y-axis with "k", "M", etc.
    const yAxis = d3.axisLeft(yScale)
      .tickFormat(d3.format(".0s")) // This will display values like 10k, 1M, etc.
      .ticks(6); // Number of ticks on the Y-axis for better granularity
  
    // Create the chart when the component mounts
    onMount(() => {
      // Select the SVG container
      const svg = d3.select("#barChart")
        .attr("width", width)
        .attr("height", height);
  
      // Add bars for box office revenue
      svg.selectAll(".bar")
        .data(years)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.year))
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
        .attr("transform");
  
      // Add Y-axis for box office revenue (on the left side)
      svg.append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(yAxis);
  
      // Add axis labels
      svg.append("text")
        .attr("transform", `translate(${width / 2}, ${height - 10})`)
        .style("text-anchor", "middle")
        .text("Year");
  
      svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", width - 880)
		.attr("x", -height / 2)
        .style("text-anchor", "middle")
        .text("Box Office Revenue");
  
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
  </style>
  
  <svg id="barChart"></svg>
  
