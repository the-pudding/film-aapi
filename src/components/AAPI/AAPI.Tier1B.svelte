<script>
  import { onMount } from "svelte";
  import * as d3 from "d3"; // Import d3.js

  // Data file import
  import movies from "$data/tier1_all.json"; 

  // Process movie data and accumulate box office revenue per 5-year group
  let boxOfficePerGroup = {};
  let window = typeof globalThis !== "undefined" ? globalThis : {};

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
  const maxYear = d3.max(movies, movie => 2020);

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

  // Define the maximum width and height
  const maxWidth = 540;
  const maxHeight = 312;
  const margin = { top: 40, right: 20, bottom: 20, left: 40 }; // Increased left margin for tick labels

  // Set up initial dimensions
  let width = maxWidth;
  let height = maxHeight;

  // Set up scales for bar chart (box office revenue)
  const xScale = d3.scaleBand()
    .domain(groupedYears.map(d => `${d.startYear}-${d.endYear}`))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  const yScale = d3.scaleLinear()
    .domain([0, 15000000000]) // Explicitly set the domain to include 15B
    .range([height - margin.bottom, margin.top]);

  // Define custom tick values for the Y-axis
  const customTickValues = [3000000000, 6000000000, 9000000000, 12000000000, 15000000000];

  // Format the revenue on the Y-axis with "k", "M", etc.
  const yAxis = d3.axisLeft(yScale)
  .tickFormat(d => {
    let formatted;
    if (d >= 1000000000) {
      formatted = `${(d / 1000000000).toFixed(0)}B`; // Format as "B" for billions
    } else if (d >= 1000000) {
      formatted = `${(d / 1000000).toFixed(0)}M`; // Format as "M" for millions
    } else if (d >= 1000) {
      formatted = `${(d / 1000).toFixed(0)}k`; // Format as "k" for thousands
    } else {
      formatted = d; // Default to the original value
    }
    return formatted === "15B" ? `${formatted} USD` : formatted; // Add "USD" to "15B"
  })
  .tickValues(customTickValues); // Use custom tick values

  // Axis generators
  const xAxis = d3.axisBottom(xScale) // Format the tick labels to show the group (e.g., "1981-1985")
    .tickFormat(d => {
      const [startYear, endYear] = d.split('-');
      return `'${startYear.toString().slice(-2)}-'${endYear.toString().slice(-2)}`;
    });

  // Create the chart when the component mounts
  onMount(() => {
    const svg = d3.select("#barChart")
      .attr("width", width)
      .attr("height", height);

    // Add dotted gridlines for the Y-axis ticks
    svg.append("g")
      .attr("class", "grid")
      .selectAll("line")
      .data(customTickValues) // Use the same custom tick values for gridlines
      .enter()
      .append("line")
      .attr("x1", margin.left)  // Start of the line (left side)
      .attr("x2", width - margin.right)  // End of the line (right side)
      .attr("y1", d => yScale(d))  // Y position based on the tick
      .attr("y2", d => yScale(d))  // Same Y position for both ends (horizontal line)
      .style("stroke", "gray")  // Line color
      .style("stroke-dasharray", "3, 1")  // Dotted line style (3px dash, 1px space)
      .style("stroke-width", 1);  // Line thickness

    // Add the chart title
    svg.append("text")
      .attr("x", margin.left)
      .attr("y", margin.top - 25)
      .attr("text-anchor", "start")
      .style("font-size", "12px")
      .text("Box Office of Asian Hollywood Movies, 1981-2020"); // Title text

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
      .attr("fill", "#EE830C");

    // Add X-axis
    svg.append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "middle")
      .style("fill", "black");

    // Add Y-axis for box office revenue (on the left side)
    const yAxisGroup = svg.append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(yAxis);

    // Remove the Y-axis line (vertical line)
    yAxisGroup.select(".domain").remove(); // Remove the axis line (domain)

    // Remove Y-axis tick lines
    yAxisGroup.selectAll(".tick line").remove(); // Remove the tick lines

    // Style Y-axis labels
    yAxisGroup.selectAll("text")
      .style("fill", "gray") // Set tick label color to gray
      .attr("x", 0) // Position at the start of the chart area
		.attr("dy", "-0.5em") // Move up above the gridline
      .style("text-anchor", "start");

    // Add resize listener to update chart size only if the window is smaller than max dimensions
    window.addEventListener("resize", () => {
      // Only resize if window dimensions are less than the maxWidth and maxHeight
      const newWidth = Math.min(window.innerWidth - margin.left - margin.right, maxWidth);
      const newHeight = Math.min(window.innerHeight - margin.top - margin.bottom, maxHeight);

      if (newWidth !== width || newHeight !== height) {
        width = newWidth;
        height = newHeight;

        // Update the scales with the new size
        xScale.range([margin.left, width - margin.right]);
        yScale.range([height - margin.bottom, margin.top]);

        // Update the SVG dimensions
        svg.attr("width", width).attr("height", height);

        // Clear the entire SVG content
        svg.selectAll("*").remove();

        // Recreate the entire chart: bars, axes, gridlines, title

        // Add Y-axis for box office revenue (on the left side)
        const yAxisGroup = svg.append("g")
          .attr("transform", `translate(${margin.left}, 0)`)
          .call(yAxis);

        // Remove the Y-axis line (vertical line)
        yAxisGroup.select(".domain").remove(); // Remove the axis line (domain)

        // Remove Y-axis tick lines
        yAxisGroup.selectAll(".tick line").remove(); // Remove the tick lines

        // Add dotted gridlines for the Y-axis ticks
        svg.append("g")
          .attr("class", "grid")
          .selectAll("line")
          .data(customTickValues) // Use the same custom tick values for gridlines
          .enter()
          .append("line")
          .attr("x1", margin.left)  // Start of the line (left side)
          .attr("x2", width - margin.right)  // End of the line (right side)
          .attr("y1", d => yScale(d))  // Y position based on the tick
          .attr("y2", d => yScale(d))  // Same Y position for both ends (horizontal line)
          .style("stroke", "gray")  // Line color
          .style("stroke-dasharray", "3, 1")  // Dotted line style (3px dash, 1px space)
          .style("stroke-width", 1);  // Line thickness

        // Add the chart title
        svg.append("text")
          .attr("x", margin.left)
          .attr("y", margin.top - 25)
          .attr("text-anchor", "start")
          .style("font-size", "12px")
          .text("Box Office of Asian Hollywood Movies, 1981-2020"); // Title text

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
          .attr("fill", "#EE830C");

        // Add X-axis
        svg.append("g")
          .attr("transform", `translate(0, ${height - margin.bottom})`)
          .call(xAxis)
          .selectAll("text")
          .style("text-anchor", "middle")
          .style("fill", "black");

        // Style Y-axis labels
        yAxisGroup.selectAll("text")
          .style("fill", "gray") // Set tick label color to gray
          .attr("x", 0) // Position at the start of the chart area (left of the gridlines)
          .attr("dy", "-0.5em") // Move down to sit on top of the gridlines
          .style("text-anchor", "start"); // Align text to the end (right-aligned)
      }
    });
  });
</script>

<div class="chart-container">
  <svg id="barChart"></svg>
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
