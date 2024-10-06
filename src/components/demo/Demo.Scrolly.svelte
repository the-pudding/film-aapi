<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import { scaleLinear } from "d3";
	import movies from "$data/tier1_all.json";
	import Line from "$components/layercake/line.svelte";
	let value;

	// Process the movie data and count movies per year
	let moviesPerYear = {};
	movies.forEach(movie => {
		if (moviesPerYear[movie.Year]) {
			moviesPerYear[movie.Year]++;
		} else {
			moviesPerYear[movie.Year] = 1;
		}
	});

	let movieData = Object.keys(moviesPerYear).map(year => ({
		year: +year,
		count: moviesPerYear[year]
	}));

	// Define scales for x and y axes
	const xScale = scaleLinear()
		.domain([Math.min(...movieData.map(d => d.year)), Math.max(...movieData.map(d => d.year))])
		.range([0, 500]);

	const yScale = scaleLinear()
		.domain([0, Math.max(...movieData.map(d => d.count))])
		.range([400, 0]);

	// Getters for x and y coordinates
	function xGet(d) {
		return xScale(d.year);
	}

	function yGet(d) {
		return yScale(d.count);
	}
</script>

<!-- Render the Scrolly and Line components -->
<section id="scrolly">
	<h2>Scrolly <span>{value}</span></h2>
	<div class="spacer" />
	<Scrolly bind:value>
		{#if movies.length > 0}
			{#each [0, 1, 2, 3] as i}
				{@const active = value === i}
				<div class="step" class:active>
					<p>{movies[i].Movie}</p>
					<Line data={movieData} {xGet} {yGet} stroke="#ff0000" />
				</div>
			{/each}
		{/if}
	</Scrolly>
	<div class="spacer" />
</section>

<style>
	h2 {
		position: sticky;
		top: 4em;
	}

	.spacer {
		height: 75vh;
	}

	.step {
		height: 80vh;
		background: var(--color-gray-100);
		text-align: center;
	}

	.step p {
		padding: 1rem;
	}
</style>
