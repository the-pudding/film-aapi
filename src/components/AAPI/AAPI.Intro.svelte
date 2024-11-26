<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";

	// Variables for managing scrolly value, spacing, and texts
	let value = 0;
	export let texts;
</script>

<!-- Scrolly Component -->
<section class="scrolly-section">

	<!-- ALL THE VISUALS HAPPEN IN HERE -->
	<div class="visualContainer">

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

<!-- Style -->
<style>
	
</style>
