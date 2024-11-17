<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";

	// Variables for managing scrolly value and spacing
	export let value;
	export let topPadding = "50vh"; // Default space above the scrolly component
	export let bottomPadding = "50vh"; // Default space below the scrolly component
	export let sectionWidth = "70vh"; // Width of the scrolly section
</script>

<!-- Scrolly Component -->
<section id="scrolly" style="padding-top: {topPadding}; padding-bottom: {bottomPadding};">
	<Scrolly bind:value>
		{#each [0, 1, 2, 3] as i}
			{@const active = value === i}
			<div class="step" class:active>
				<h4>{i}</h4>
			</div>
			<div class="pad"></div>
		{/each}
	</Scrolly>
</section>

<!-- Style -->
<style>
	#scrolly {
		width: var(--scrolly-width, 100%); /* Defaults to full width */
		margin-bottom: var(--scrolly-spacing, 100vh); /* Space after scrolly ends */
	}

	.step {
		height: 50vh;
		width: var(--step-width, 50vh); /* Flexible width for steps */
		background: var(--color-gray-100);
		text-align: center;
	}

	.pad {
		height: var(--pad-height, 90vh); /* Padding between steps */
	}

	.scrolly {
		padding-left: var(--scrolly-left-padding, 70vh);
	}
</style>
