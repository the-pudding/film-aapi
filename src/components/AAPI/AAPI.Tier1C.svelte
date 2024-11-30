<script>
    import { onMount } from "svelte";
    import * as d3 from "d3"; // Import d3.js
    
    // Data file import
    import pop from "$data/tier1_pop.json"; 
  
    // Dimensions of the chart
    const width = 900;
    const height = 600;
    const margin = { top: 20, right: 60, bottom: 50, left: 60 };
  
    // Prepare the data (assuming pop has "Year" and "Population" properties)
    let years = pop.map(d => ({
      year: +d.Year, // Convert the year to a number
      population: d.Population // Population is already a number
    }));
  
    // Set up scales
    const xScale = d3.scaleBand()
      .domain(years.map(d => d.year)) // The domain is the years
      .range([margin.left, width - margin.right])
      .padding(0.1); // Spacing between bars
  
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(years, d => d.population)]) // Max population value
      .nice() // Adds some padding above the max value
      .range([height - margin.bottom, margin.top]); // Y-axis goes from top to bottom
  
    // Create axis generators
    const xAxis = d3.axisBottom(xScale)
      .tickValues(d3.range(Math.min(...years.map(d => d.year)), Math.max(...years.map(d => d.year)), 10)); // Custom ticks every 10 years
  
    const yAxis = d3.axisLeft(yScale)
      .tickFormat(d3.format(".0s")); // Format large numbers with "k", "M", etc.
  
    // Create the chart when the component mounts
    onMount(() => {
      const svg = d3.select("#barChart")
        .attr("width", width)
        .attr("height", height);
  
      // Create the bars for the population data
      svg.selectAll(".bar")
        .data(years)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.year))
        .attr("y", d => yScale(d.population))
        .attr("width", xScale.bandwidth())
        .attr("height", d => height - margin.bottom - yScale(d.population)) // Height based on population
        .attr("fill", "steelblue");
  
      // Add X-axis
      svg.append("g")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(xAxis);
  
      // Add Y-axis
      svg.append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(yAxis);
  
      // Add X-axis label
      svg.append("text")
        .attr("transform", `translate(${width / 2}, ${height - 10})`)
        .style("text-anchor", "middle")
        .text("Year");
  
      // Add Y-axis label
      svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 15)
        .attr("x", -height / 2)
        .style("text-anchor", "middle")
        .text("Population");
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
  
