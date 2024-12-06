<script>
	import { scaleLinear } from "d3-scale";
	import { group } from "d3-array";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	export let texts;
  
	// Import data
	import data from "$data/tier2_all.json";
	let value = 0;
  
	// Group data by Year and then by Movie
	const groupedDataByYear = group(data, (d) => d["Release.Year"], (d) => d["Media"]);
	const years = Array.from(groupedDataByYear.keys()).sort((a, b) => a - b);
  
	// Chart dimensions
	let width = 1200;
	let height = 800;
	let dotRadius = width / 100; // Size of the dots

	let verticalSpacing = dotRadius * 2 + 5; // Space between dots
  
	// X Scale
	let xScale = scaleLinear()
	  .domain([Math.min(...years), Math.max(...years)])
	  .range([50, width - 50]);
  
	// Keep track of how many dots have been placed for each year
	const yearDotCounter = {};
	const yearOvalCounter = {};
	let lastMovieIndex = -1;
	let lastYear = null;
  
	// Function to calculate Y position for a dot
	const getDotYPosition = (year, movieIndex) => {
	  if (!yearDotCounter[year]) {
		yearDotCounter[year] = 0; // Initialize counter for the year
	  }
	  if (year !== lastYear) {
		lastYear = year; // Update last year
		lastMovieIndex = -1; // Reset movie index tracker
	}
  
	  let currentYPosition = yearDotCounter[year] * verticalSpacing; // Calculate Y based on current count
	  yearDotCounter[year]++; // Increment the count for this year
	  if (movieIndex !== lastMovieIndex) {
		if (!yearOvalCounter[year]) {
		  yearOvalCounter[year] = []; // Initialize oval counter for the year
		}
		// Add current dot position to oval counter for this movie
		yearOvalCounter[year].push(currentYPosition);
		lastMovieIndex = movieIndex;
	  }
	  
	  return currentYPosition;
	};
  
  
	const getOvalYPosition = (year, movieIndex) => {
	// Ensure yearOvalCounter is initialized for the year
	if (!yearOvalCounter[year]) {
	  yearOvalCounter[year] = [];
	}
  
	// If this is the first movie of the year
	if (yearOvalCounter[year][movieIndex] === undefined) {
	  // Use the current yearDotCounter value as the starting position
	  yearOvalCounter[year][movieIndex] = yearDotCounter[year];
	}
  
	// Calculate the Y position based on the starting position for this movie
	const position = yearOvalCounter[year][movieIndex];
	return position;
  };
  
	const getOvalHeight = (actorLength) => {
	  if (actorLength === 1) {
		return verticalSpacing+actorLength;
	  }
	  return verticalSpacing*actorLength;
	};
  
	// Function to reset the counter before re-rendering
	const resetYearDotCounter = () => {
	  for (const year of years) {
		yearDotCounter[year] = 0;
		yearOvalCounter[year] = [];
	  }
	  lastMovieIndex = null;
	};

	$: {
		width,height;
		dotRadius = width / 100; // Size of the dots
		xScale = scaleLinear()
			.domain([Math.min(...years), Math.max(...years)])
			.range([50, width - 50]);

		console.log(width, height);
	}
  </script>
  
  <section class="scrolly-section">
	<div class="visualContainer" bind:clientWidth={width} bind:clientHeight={height}>
	  {#if value <= 1}
	  {@html resetYearDotCounter()}
	  {#each years as year, yearIndex}
	  <!-- Render movies within the year -->
	  {#each Array.from(groupedDataByYear.get(year)?.entries() || []) as [movie, actors], movieIndex}
		<!-- Render dots for each actor in the movie -->
		{#each actors as actor, actorIndex}
		  <div
			class="dot"
			style="
			  --x: {xScale(year)}px;
			  --y: {getDotYPosition(year, movieIndex)}px;
			  background-color: {'steelblue'};
			  width: {dotRadius * 2}px;
			  height: {dotRadius * 2}px;"
			title="{actor['Media'] + ' (' + actor['Release.Year'] + ')'}"
		  ></div>
		{/each}
	  {/each}
	{/each}
	{/if}
  
	{#if value == (2) | value == 3}
	{@html resetYearDotCounter()}
	{#each years as year, yearIndex}
	<!-- Render movies within the year -->
	{#each Array.from(groupedDataByYear.get(year)?.entries() || []) as [movie, actors], movieIndex}
	  <!-- Render dots for each actor in the movie -->
	  {#each actors as actor, actorIndex}
		<div
		  class="dot"
		  style="
			--x: {xScale(year)}px;
			--y: {getDotYPosition(year, movieIndex)}px;
			background-color: {actor['Match.Count'] === 1 ? 'green' : 'red'};
			width: {dotRadius * 2}px;
			height: {dotRadius * 2}px;"
		  title="{actor['Media'] + ' (' + actor['Release.Year'] + ')'}"
		></div>
	  {/each}
	{/each}
	{/each}
	{/if}
  
	  {#if value >= 4}
	  <!-- Reset counter before rendering dots -->
	  {@html resetYearDotCounter()}
		
	  <!-- Iterates through each year, then each movie, then each actor -->
	  {#each years as year, yearIndex}
		{#each Array.from(groupedDataByYear.get(year)?.entries() || []) as [movie, actors], movieIndex}
		  {#each actors as actor, actorIndex}

		  	<!-- Render each dot -->
			<div
			  class="dot-noHover"
			  style="
				--x: {xScale(year)}px;
				--y: {getDotYPosition(year, movieIndex)}px;
				background-color: {actor['Match.Count'] === 1 ? 'green' : 'red'};
				width: {dotRadius * 2}px;
				height: {dotRadius * 2}px;"
			  title="{actor['Media'] + ' (' + actor['Release.Year'] + ')'}"
			></div>
		  {/each}

		  <!-- Render each oval -->
		  <div
		  class="oval"
		  style="
			--x: {xScale(year)}px;
			--y: {getOvalYPosition(year, movieIndex)}px;
			width: {dotRadius*2+1}px;
			opacity: {'50%'};
			height: {getOvalHeight(actors.length)}px;
		  "
		  title={"oval"+movie}
		></div>
		{/each}
	  {/each}
	  {/if}
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
  
  <style>  
	.dot {
	  position: absolute;
	  top: var(--y);
	  left: var(--x);
	  border-radius: 50%;
	  transition: transform 0.2s, opacity 0.2s;
	  z-index:3;
	}
  
	.dot:hover {
	  transform: scale(1.2);
	  opacity: 1;
	}
	.dot-noHover {
	  position: absolute;
	  top: var(--y);
	  left: var(--x);
	  border-radius: 50%;
	  transition: transform 0.2s, opacity 0.2s;
	  z-index:3;
	}
  
	.oval {
	  position: absolute;
	  background-color: steelblue;
	  top: var(--y);
	  left: var(--x);
	  transition: transform 0.2s, opacity 0.2s;
	  outline-width: 3px;
	  outline-color: black;
	  z-index: 4;

	}
  
	.oval:hover {
	  background-color: blue;

	  opacity: 1;
	}
  </style>
  