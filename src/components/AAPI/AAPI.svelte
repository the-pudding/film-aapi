<script>
	import AAPIScrolly from "$components/AAPI/AAPI.Scrolly.svelte";
    import AAPITitle from "$components/AAPI/AAPI.Title.svelte";
    import AAPITier1 from "$components/AAPI/AAPI.Tier1.svelte";
    import textData from "$data/copy.json";
    let scrollyValue = 0;

    // Filter text for the intro section
    let introText = textData.body.filter((item) => item.section === "intro");
</script>

<div id="story">

    <section id="scrolly-section">
        <AAPIScrolly
            bind:value={scrollyValue}
            texts={introText}
        />
    </section>
</div>

<div>

    <AAPITitle />
    
    <section id="scrolly-section">
        <div class="figure-background">
            <AAPITier1 />
        </div>

        <div>
            <AAPIScrolly />
        </div>
    </section>

    <section id="another-section">
        <h2> insert another section here</h2>
    </section>
</div>

<style>
    #story {
        padding: 1em;
	}
    
    #scrolly-section {
        margin: 0px auto;
        max-width: 30rem;
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
    
</style>
