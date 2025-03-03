<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import pop from "$data/tier1ethnicity.json"; // Import the dataset

  const width = 900, height = 600, margin = { top: 20, right: 60, bottom: 50, left: 60 };

  // Parse and map the data
  let years = pop.map(d => ({
    year: +d.Year,  // Convert year to a number
    asianEthnicGroups: +d["Asian Ethnic Groups"].replace('$', '').trim()  // Convert population to a number, remove '$' and any spaces
  }));

  // Set up x and y scales
  const xScale = d3.scaleLinear()
    .domain([d3.min(years, d => d.year), d3.max(years, d => d.year)])
    .range([margin.left, width - margin.right]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(years, d => d.asianEthnicGroups)])
    .nice()
    .range([height - margin.bottom, margin.top]);

  // Create the line generator
  const line = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.asianEthnicGroups));

  // Custom x-axis with ticks every 10 years
  const xAxis = d3.axisBottom(xScale)
    .tickValues(d3.range(1970, 2021, 10))  // Creates ticks from 1970 to 2020 in steps of 10 years
    .tickFormat(d3.format("d"));  // Remove comma formatting for years (just integer format)

  const yAxis = d3.axisLeft(yScale).tickFormat(d3.format(".0s"));

  onMount(() => {
    const svg = d3.select("#lineChart")
      .attr("width", width)
      .attr("height", height);

    // Draw the line
    svg.append("path")
      .datum(years)
      .attr("class", "line")
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2);

    // Add circles at each decade point
    svg.selectAll("circle")
      .data(years)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.year))
      .attr("cy", d => yScale(d.asianEthnicGroups))
      .attr("r", 5)
      .attr("fill", "red");

    // Add X-axis
    svg.append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(xAxis);

    // Add Y-axis
    svg.append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(yAxis);

    // X-axis label
    svg.append("text")
      .attr("transform", `translate(${width / 2}, ${height - 10})`)
      .style("text-anchor", "middle")
      .text("Year");

    // Y-axis label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 15)
      .attr("x", -height / 2)
      .style("text-anchor", "middle")
      .text("Asian Ethnic Groups");
  });
</script>

<style>
  .line { transition: stroke 0.3s ease; }
  .line:hover { stroke: darkred; }
  .axis text { font-size: 12px; }
  .axis path, .axis line { fill: none; stroke: #000; stroke-width: 1px; }
  circle { transition: fill 0.3s ease; }
  circle:hover { fill: darkred; }
</style>

<svg id="lineChart"></svg>
