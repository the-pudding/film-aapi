<script>
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
<section id="scrolly-section">
    <h2> Figure section </h2>
    <Line data={movieData} {xGet} {yGet} stroke="#ff0000" />
</section>

<style>
	h2 {
		position: sticky;
	}
</style>
