<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
	let value;
</script>

<!-- Render the Scrolly and Line components -->
<section id="scrolly">
	<h2>Scrolly</h2>
	<Scrolly bind:value>
			{#each [0, 1, 2, 3] as i}
				{@const active = value === i}
				<div class="step" class:active>
					<h4>{i}</h4>
				</div>
				<div class ="pad"></div>
			{/each}

	</Scrolly>
	<div class="spacer" />
</section>

<style>
	h2 {
		top: 4em;
	}

	.spacer {
		height: 75vh;
	}

	.step {
		height: 50vh; 
		width: 50vh;
		background: var(--color-gray-100);
		text-align: center;
	}

	.step p {
		padding: 10rem;
	}

	.pad {
		padding: 90vh;
	}

	.scrolly {
		padding-left: 70vh;
	}
</style>
