<script>
	import AAPIScrolly from "$components/AAPI/AAPI.Scrolly.svelte";
    import AAPITitle from "$components/AAPI/AAPI.Title.svelte";
    import AAPITier1 from "$components/AAPI/AAPI.Tier1.svelte";
</script>

<div id="demo">
    

    <section id="scrolly-section">
        <h2> insert section here</h2>
        <div class = "scrolly-content">
            <AAPIScrolly />
        </div>
    </section>
    <AAPITitle />
    

    <section id="scrolly-section">
        <div class="figure-background">
            <AAPITier1 />
        </div>

        <div class = "scrolly-content">
            <AAPIScrolly />
        </div>
    </section>

    <section id="another-section">
        <h2> insert another section here</h2>
    </section>
</div>

<style>
    #demo {
		padding: 16px;
		margin: 0 auto;
	}
    
    #scrolly-section {
        padding-left: 5em;
        position: relative;
        display: flex;
		justify-content: space-between;
		align-items: flex-start;
        width: 100%;
        height: 790vh; /* Adjust based on the length of your scrolly content */

    }
    #another-section {
        height: 100vh;
    }

    .figure-background {
		position: sticky;
		top: 0;
		left: 0;
		width: 50%;
		height: 100vh; /* Full viewport height */
		z-index: -1;
    }

    .scrolly-content {
		position: relative;
        width: 45%; 
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
