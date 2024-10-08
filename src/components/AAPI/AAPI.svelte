<script>
	import AAPIScrolly from "$components/AAPI/AAPI.Scrolly.svelte";
    import AAPITier1 from "$components/AAPI/AAPI.Tier1.svelte";
</script>

<div id="demo">
	<h1>AAPI ARTICLE</h1>
    <section id="scrolly-section">
        <div class="figure-background">
            <AAPITier1 />
        </div>
        <div class = "scrolly-content">
            <AAPIScrolly />
        </div>
    </section>
</div>

<style>
	#demo {
		max-width: 40rem;
		padding: 16px;
		margin: 0 auto;
	}
    #scrolly-section {
        position: relative;
        height: 600vh; /* Adjust based on the length of your scrolly content */

    }

    .figure-background {
		position: sticky;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh; /* Full viewport height */
		z-index: -1;
    }

    .scrolly-content {
		position: relative;
		z-index: 1; /* Keep it above the background */
	}

	:global(#demo section) {
		margin: 32px auto;
		padding-top: 32px;
	}

	:global(#demo section > section) {
		margin: 0 auto;
		padding-top: 0;
	}

	:global(#demo h2 span) {
		background: var(--color-mark);
		padding: 0 8px;
	}
</style>
