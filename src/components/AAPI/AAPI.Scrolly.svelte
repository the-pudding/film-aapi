<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
	let value;
</script>

<!-- Render the Scrolly and Line components -->
<section id="scrolly">
	<h2>Scrolly <span>{value}</span></h2>
	<div class="spacer" />
	<Scrolly bind:value>
			{#each [0, 1, 2, 3] as i}
				{@const active = value === i}
				<div class="step" class:active>
					<p>i</p>
				</div>
			{/each}
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
