<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";

	// Variables for managing scrolly value, spacing, and texts
	export let value;
	export let texts = []; // Array of text objects passed in (e.g., intro section)
</script>

<!-- Scrolly Component -->
<section>
	<Scrolly bind:value>
		{#each texts as text, i}
		<div class="pad"></div>
			{@const active = value === i}
			<div class="step">
				<p>{text.text}</p>
			</div>
		{/each}
	</Scrolly>
</section>

<!-- Style -->
<style>
    /* step = each individual scrolly box */
	.step {
        background: var(--color-gray-100);
        text-align: left;
        padding: 1.5rem;
    }

    .pad {
        height: 100vh; /* Spacing between steps. 100vh = full viewport height */
    }

	.step p {
        margin: 0;
    }
</style>
