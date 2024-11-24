<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
	let value = 0;
	export let texts;
  
	import { onMount, afterUpdate } from 'svelte';
	import { scaleLinear } from 'd3-scale';
	import { max, group } from 'd3-array';
	import { select } from 'd3-selection';
	import { axisBottom, axisLeft } from 'd3-axis';
  
	// Importing the data from an external JSON file
	import data from "$data/tier2_all.json"; // Ensure the path is correct
  
	// Group data by Release.Year and count actors per year
	const groupedData = group(data, d => d["Release.Year"]);
	const years = Array.from(groupedData.keys());
  
	// Variables for chart dimensions, dynamically set in onMount and afterUpdate
	let svg;
	let width;
	let height;
  
	// Helper function to update dimensions on resize
	const updateDimensions = () => {
	  width = svg.node().clientWidth;
	  height = svg.node().clientHeight;
	};

	// Define the vertical spacing between dots
	const verticalSpacing = 5;

	// Calculate the maximum number of actors in any year dynamically
	const maxActorsInYear = Math.max(...years.map(year => groupedData.get(year)?.length || 0));


	const renderChart1 = () => {
		// Update the dimensions immediately before rendering the chart
		updateDimensions();

		// Calculate dot radius dynamically based on width
		const dotRadius = width / 100; // Adjust this value based on your needs

		// Select the SVG container and clear any previous content
		svg.selectAll("*").remove();

		// Scale for X axis (Release Year)
		const xScale = scaleLinear()
			.domain([Math.min(...years), Math.max(...years)])
			.range([50, width - 50]);

		// Calculate the total height required for the dots
		const requiredHeight = maxActorsInYear * (dotRadius * 2 + verticalSpacing);

		// Scale for Y axis (Actor Count)
		const yScale = scaleLinear()
			.domain([0, maxActorsInYear]) // Set domain to the actor count range
			.range([height - 50, height - 50 - requiredHeight]); // Keep fixed spacing

		// Create X axis and add it to the SVG
		svg.append("g")
			.attr("transform", `translate(0, ${height - 50})`)
			.call(axisBottom(xScale).tickFormat(d => d.toString())); // Remove commas from year labels

		// Create Y axis and add it to the SVG
		svg.append("g")
			.attr("transform", `translate(50, 0)`)
			.call(axisLeft(yScale).ticks(maxActorsInYear)); // Dynamically set the ticks to match actor counts

		// Create dots for each actor, stacked by year
		years.forEach((year, i) => {
			const actorsInYear = groupedData.get(year);
			actorsInYear.forEach((actor, j) => {
			svg.append("circle")
				.attr("class", "dot")
				.attr("cx", xScale(year))
				.attr("cy", yScale(j + 1)) // Use yScale to position dots dynamically
				.attr("r", dotRadius) // Dynamically adjusted dot size
				.attr("fill", "steelblue")
				.style("opacity", 0.7)
				.on('mouseover', function(event, d) {
				select(this).attr('fill', 'darkblue'); // Change color on hover
				})
				.on('mouseout', function(event, d) {
				select(this).attr('fill', 'steelblue'); // Reset color when mouse leaves
				});
			});
		});
		};


	const renderChart2 = () => {
		// Update the dimensions immediately before rendering the chart
		updateDimensions();

		// Calculate dot radius dynamically based on width
		const dotRadius = width / 100; // Adjust this value based on your needs

		// Select the SVG container and clear any previous content
		svg.selectAll("*").remove();

		// Scale for X axis (Release Year)
		const xScale = scaleLinear()
			.domain([Math.min(...years), Math.max(...years)])
			.range([50, width - 50]);

		// Calculate the total height required for the dots
		const requiredHeight = maxActorsInYear * (dotRadius * 2 + verticalSpacing);

		// Scale for Y axis (Actor Count)
		const yScale = scaleLinear()
			.domain([0, maxActorsInYear]) // Set domain to the actor count range
			.range([height - 50, height - 50 - requiredHeight]); // Keep fixed spacing

		// Create X axis and add it to the SVG
		svg.append("g")
			.attr("transform", `translate(0, ${height - 50})`)
			.call(axisBottom(xScale).tickFormat(d => d.toString())); // Remove commas from year labels

		// Create Y axis and add it to the SVG
		svg.append("g")
			.attr("transform", `translate(50, 0)`)
			.call(axisLeft(yScale).ticks(maxActorsInYear)); // Dynamically set the ticks to match actor counts

		// Create dots for each actor, stacked by year
		years.forEach((year, i) => {
			const actorsInYear = groupedData.get(year);
			actorsInYear.forEach((actor, j) => {
			svg.append("circle")
				.attr("class", "dot")
				.attr("cx", xScale(year))
				.attr("cy", yScale(j + 1)) // Use yScale to position dots dynamically
				.attr("r", dotRadius) // Dynamically adjusted dot size
				.attr("fill", actor["Match.Count"] === 1 ? "green" : "red")
				.style("opacity", 0.7)
				.on('mouseover', function(event, d) {
				select(this).attr('fill', actor["Match.Count"] === 1 ? "darkgreen" : "darkred"); // Change color on hover
				})
				.on('mouseout', function(event, d) {
				select(this).attr('fill', actor["Match.Count"] === 1 ? "green" : "red"); // Reset color when mouse leaves
				});
			});
		});
		};

		const renderChart3 = () => {
		// Update the dimensions immediately before rendering the chart
		updateDimensions();

		// Calculate dot radius dynamically based on width
		const dotRadius = width / 100; // Adjust this value based on your needs

		// Select the SVG container and clear any previous content
		svg.selectAll("*").remove();

		// Scale for X axis (Release Year)
		const xScale = scaleLinear()
			.domain([Math.min(...years), Math.max(...years)])
			.range([50, width - 50]);

		// Calculate the total height required for the dots
		const requiredHeight = maxActorsInYear * (dotRadius * 2 + verticalSpacing);

		// Scale for Y axis (Actor Count)
		const yScale = scaleLinear()
			.domain([0, maxActorsInYear]) // Set domain to the actor count range
			.range([height - 50, height - 50 - requiredHeight]); // Keep fixed spacing

		// Create X axis and add it to the SVG
		svg.append("g")
			.attr("transform", `translate(0, ${height - 50})`)
			.call(axisBottom(xScale).tickFormat(d => d.toString())); // Remove commas from year labels

		// Create Y axis and add it to the SVG
		svg.append("g")
			.attr("transform", `translate(50, 0)`)
			.call(axisLeft(yScale).ticks(maxActorsInYear)); // Dynamically set the ticks to match actor counts

		// Create dots for each actor, stacked by year
		years.forEach((year, i) => {
			const actorsInYear = groupedData.get(year);
			actorsInYear.forEach((actor, j) => {
			svg.append("circle")
				.attr("class", "dot")
				.attr("cx", xScale(year))
				.attr("cy", yScale(j + 1)) // Use yScale to position dots dynamically
				.attr("r", dotRadius) // Dynamically adjusted dot size
				.attr("fill", actor["Match.Count"] === 1 ? "green" : "red")
				.style("opacity", 0.7)
				.on('mouseover', function(event, d) {
				select(this).attr('fill', actor["Match.Count"] === 1 ? "darkgreen" : "darkred"); // Change color on hover
				})
				.on('mouseout', function(event, d) {
				select(this).attr('fill', actor["Match.Count"] === 1 ? "green" : "red"); // Reset color when mouse leaves
				});
			});
		});
		};
	// Call renderChart when the component is mounted


	$: {
    if (value === 1) {
      renderChart1();
    } else if (value === 2) {
	  renderChart2();
    } 
  }

	onMount(() => {
	  svg = select("#chart");
	  renderChart1();
  

	});
  
	// Update the chart after the component is updated (responsive resize)
  </script>
  
  <style>
	/* Style for the chart container */
	#chart {
		width: 100%;
		height: 100vh;  /* Let the height be dynamic */

	}
  
	/* Optional: Style for the dots */
	.dot {
	  transition: all 0.2s ease;
	}
  </style>
  
  <!-- SVG element where the chart will render -->
  <section class="scrolly-section">
	<div class="visualContainer">
	  <svg id="chart"></svg>
	</div>
	<Scrolly bind:value>
	  {#each texts as text, i}
		{@const active = value === i}
		<div class="step">
		  <div class="stepText">
			<p>{text.text}</p>
		  </div>
		</div>
	  {/each}
	</Scrolly>
  </section>
  