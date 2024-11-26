<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
	let value = 0;
	export let texts;
  
	import { scaleLinear } from "d3";
	import movies from "$data/tier1_all.json";
  
	// Process the movie data and count movies per year
	let moviesPerYear = {};
	let boxOfficePerYear = {};
  
	// Accumulate the count of movies and sum of box office revenue per year
	movies.forEach(movie => {
	  // Count the number of movies
	  if (moviesPerYear[movie.Year]) {
		moviesPerYear[movie.Year]++;
	  } else {
		moviesPerYear[movie.Year] = 1;
	  }
  
	  // Sum the box office revenue
	  const revenue = movie.bo_revenue || 0;
	  if (boxOfficePerYear[movie.Year]) {
		boxOfficePerYear[movie.Year] += revenue;
	  } else {
		boxOfficePerYear[movie.Year] = revenue;
	  }
	});
  
	let movieData = Object.keys(moviesPerYear).map(year => ({
	  year: +year,
	  count: moviesPerYear[year],
	  boxOffice: boxOfficePerYear[year] || 0, // Default to 0 if no box office revenue
	}));
  
	// Define scales for x and y axes
	const xScale = scaleLinear()
	  .domain([Math.min(...movieData.map(d => d.year)), Math.max(...movieData.map(d => d.year))])
	  .range([0, 450]);
  
	const yScale = scaleLinear()
	  .domain([0, Math.max(...movieData.map(d => d.count))])
	  .range([400, 0]);
  
	const yBoxOfficeScale = scaleLinear()
	  .domain([0, Math.max(...movieData.map(d => d.boxOffice))])
	  .range([400, 0]);
  
	// Getters for x and y coordinates
	function xGet(d) {
	  return xScale(d.year);
	}
  
	function yGet(d) {
	  return yScale(d.count);
	}
  
	function yBoxOfficeGet(d) {
	  return yBoxOfficeScale(d.boxOffice);
	}
  
	// Bar width can be based on the number of data points
	const barWidth = 15;
  
	// Determine which years to display as labels (every 10 years)
	const xAxisLabels = [];
	const minYear = Math.min(...movieData.map(d => d.year));
	const maxYear = Math.max(...movieData.map(d => d.year));
  
	// Collect the years that are multiples of 10 for x-axis labels
	for (let year = 1980; year <= maxYear; year += 10) {
	  xAxisLabels.push(year);
	}
  
	// Calculate the middle of each 10-year period
	function getLabelXPosition(year) {
	  const startX = xScale(year);
	  const endX = xScale(year + 10);
	  return (startX + endX) / 2;
	}

  </script>
    <section class="scrolly-section">
  <!-- Scrolly Component -->
	<div class="visualContainer">
	  <!-- Render the Scrolly and Bar chart components -->
		<svg width="7500" height="7000">
		<!-- Title at the top of the plot -->
        <text
          x="250" 
          y="20"
          text-anchor="middle"
          font-size="18px"
          font-weight="bold"
          fill="black">
          Movies with Asian in Main Cast
		
        </text>
		  <!-- Render horizontal grid lines for every 5 units on the y-axis -->
		  {#each Array(Math.floor(Math.max(...movieData.map(d => d.count)) / 5)).fill() as _, i}
			<line
			  x1="20"
			  x2="600"
			  y1={yScale((i + 1) * 5)}
			  y2={yScale((i + 1) * 5)}
			  stroke="black"
			  stroke-width="1"
			  opacity="0.3"
			  stroke-dasharray="4, 2" />
		  {/each}
  
		  <!-- Render bars for each movie data -->
		  {#each movieData as d}
			<rect
			  x={xGet(d)}
			  y={yGet(d)}
			  width={barWidth - 5}
			  height={400 - yGet(d)}
			  fill={d.year >= 2000 && d.year <= 2005 && value > 1 && value <= 2? 'yellow' : 
			  	(d.year >= 2018 && d.year <= 2023 && value > 2) ? 'green' :
				(d.year >= 2000 && d.year <= 2005 && value > 1) ? 'steelblue' :
				'steelblue'} 
			  stroke="black"
			  stroke-width="1" />
		  {/each}
  
        <!-- Animate the line for Box Office Revenue as we scroll -->
		{#if value >= 0} <!-- Line will start drawing when value >= 1 -->
		<g>
		  {#each movieData as d, i}
			{#if i > 0 && value >= i / movieData.length}
			  <line
				x1={xGet(movieData[i - 1])}
				y1={yBoxOfficeGet(movieData[i - 1])}
				x2={xGet(d)}
				y2={yBoxOfficeGet(d)}
				stroke="red"
				stroke-width="2" />
			{/if}
		  {/each}
		</g>
	  {/if}
  
		  <!-- X-axis line -->
		  <g transform="translate(0, 400)">
			<line x1="0" x2="600" y1="0" y2="0" stroke="black" stroke-width="2" />
		  </g>
  
		  <!-- Y-axis labels (5, 10, 15, ...) -->
		  {#each Array(Math.floor(Math.max(...movieData.map(d => d.count)) / 5)).fill() as _, i}
			<text
			  x="20"
			  y={yScale((i + 1) * 5)}
			  alignment-baseline="middle"
			  text-anchor="end"
			  font-size="12px"
			  fill="black">
			  {((i + 1) * 5)}
			</text>
		  {/each}
  
		  <!-- X-axis labels for every 10 years, centered in the middle of the period -->
		  {#each xAxisLabels as label}
			<text
			  x={getLabelXPosition(label)}
			  y="350"
			  text-anchor="middle"
			  font-size="12px"
			  fill="black">
			  {label}
			</text>
		  {/each}
		</svg>
	
	</div>
  
	<!-- Scrolly Component: Scrollable steps with text -->
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
  
  <style>
	h2 {
	  position: sticky;
	}
  
	.visualContainer {
	  width: 90%;
	  height: 100vh;
	}
  
	.stepText {
	  font-size: 18px;
	  text-align: center;
	}
  
	svg {
	  width: 100%;
	  height: 100%;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}
  </style>
  
