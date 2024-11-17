<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";

	// Variables for managing scrolly value, spacing, and texts
	export let value;
	export let topPadding = "50vh"; // Default space above the scrolly component
	export let bottomPadding = "50vh"; // Default space below the scrolly component
	export let texts = []; // Array of text objects passed in (e.g., intro section)

	// Ensure texts is always an array
	$: texts = Array.isArray(texts) ? texts : [];
</script>

<!-- Scrolly Component -->
<section id="scrolly" style="padding-top: {topPadding}; padding-bottom: {bottomPadding};">
	<Scrolly bind:value>
		{#each texts as text, i}
			{@const active = value === i}
			<div class="step">
				<p>{text.text}</p>
			</div>
			<div class="pad"></div>
		{/each}
	</Scrolly>
</section>

<!-- Style -->
<style>
	#scrolly {
		/* width: var(--scrolly-width, 100%); Defaults to full width */
		margin-bottom: var(--scrolly-spacing, 100vh); /* Space after scrolly ends */
	}

    .step {
        width: var(--step-width, 70vh);
        background: var(--color-gray-100);
        text-align: left;
        padding: 2rem;
        box-sizing: border-box;
    }

    .pad {
        height: var(--pad-height, 20vh); /* Spacing between steps */
    }

	.step p {
        margin: 0;
        word-wrap: break-word;
    }

	/* Mobile styles (screens less than 600px wide) */
    @media (max-width: 600px) {
        .step {
            width: 100%; /* Take full width on mobile */
            padding: 8vw; /* Adjust padding for mobile to ensure readability */
        }

        .pad {
            height: 25vh; /* Larger padding between steps on mobile */
        }
    }
</style>
