<script>
	import { line, curveLinear } from "d3";

	// Receive props from parent
	export let data; // The movie data { year, count }
	export let xGet; // Function to get the x coordinate
	export let yGet; // Function to get the y coordinate
	export let stroke = "#ccc"; // Line stroke color
	export let curve = curveLinear; // Default curve is linear

	// Create a line generator using the D3 line function
	$: path = line().x(d => xGet(d)).y(d => yGet(d)).curve(curve);

	// Generate the path data from the provided data
	$: pathD = path(data);
</script>

<!-- Draw the line based on the generated pathD -->
<svg width="500" height="400">
	<path d={pathD} {stroke} />
</svg>

<style>
	path {
		fill: none;
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 2;
	}
</style>

