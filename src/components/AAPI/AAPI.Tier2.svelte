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

	let verticalSpacing = dotRadius+dotRadius; // Space between dots
  
	// X Scale
	let xScale = scaleLinear()
	  .domain([Math.min(...years), Math.max(...years)])
	  .range([50, width - 50]);
  
	// Keep track of how many dots have been placed for each year
	let yearDotCounter = {};
	let yearOvalCounter = {};
	let lastMovieIndex = -1;
	let lastYear = null;
  
	// Function to calculate Y position for a dot
	const getDotYPosition = (year, movieIndex, actorLength) => {
		if (!yearDotCounter[year]) {
			yearDotCounter[year] = 0; // Initialize counter for the year
		}

		// If the year changes, reset the counter and keep track of which year we were at
		if (year !== lastYear) {
			lastYear = year; // Update last year
			lastMovieIndex = -1; // Reset movie index tracker
		}
		
		// Calculate Y position of the dot. 
		// Multiplies the number of dots already placed for the year with the size of the dot
		let currentYPosition = height - (yearDotCounter[year] * verticalSpacing)-(3*verticalSpacing); 

		yearDotCounter[year]++; // Increment the count of dots placed for this year, so the next loop is accurate

		// movieIndex keeps track of the grouping of the movies. 
		// This is mostly for calculating the hover state of the third graph, where they're grouped by movie
		// We enter this if statement if we detect we're onto a new movie grouping
		if (movieIndex !== lastMovieIndex) {

			// If we're in a new year, start a new counter for the ovals 
			if (!yearOvalCounter[year]) {
			yearOvalCounter[year] = []; 
			}

			// Since it's a new movie detected, we push the first Y dot potition of that movie to the oval dict.
			// We subtract one dot's worth to align it
			// subtract from height so that it starts from the bottom of the screen
			yearOvalCounter[year].push(currentYPosition - (verticalSpacing*actorLength)+verticalSpacing);
			lastMovieIndex = movieIndex;
	  	}
		console.log(`Dot - Year: ${year}, MovieIndex: ${movieIndex}, Y: ${currentYPosition}`);

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
		console.log(`Oval - Year: ${year}, MovieIndex: ${movieIndex}, Y: ${position}`);

		return position;
  };
  
	const getOvalHeight = (actorLength) => {
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
				--y: {getDotYPosition(year, movieIndex, actors.length)}px;
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
  