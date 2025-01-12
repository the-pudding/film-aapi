<script>
	import wordmark from "$svg/wordmark-shadow.svg";
    import AAPIIntro from "$components/AAPI/AAPI.Intro.svelte";
    import AAPITitle from "$components/AAPI/AAPI.Title.svelte";
    import AAPITier1 from "$components/AAPI/AAPI.Tier1.svelte";
    import AAPITier2 from "$components/AAPI/AAPI.Tier2.svelte";
    import AAPITier2a from "$components/AAPI/AAPI.Tier2a.svelte";
    import AAPITier2b from "$components/AAPI/AAPI.Tier2b.svelte";
    import AAPIText from "$components/AAPI/AAPI.Text.svelte";
    export let copy;
</script>

<div id="story">
    
    <header>
        <div class="top-background">
        <div class="wordmark">
            <a href="https://pudding.cool" aria-label="The Pudding" target="_self"
                >{@html wordmark}</a
            >
        </div>

    </header>

    <AAPIIntro texts={copy.introScrolly} />
    <AAPITitle />
    <AAPIText texts={copy.copy1}/>
    <!-- PUT MOVIE POSTERS COMPONENT HERE f-->
    <AAPIText texts={copy.copy2}/>
    <AAPITier1 texts={copy.tier1scrolly} />
    <AAPIText texts={copy.copy3}/>
    <AAPIText texts={copy.example1}/>
    <!-- PUT EXAMPLE 1 COMPONENT HERE gyvh-->
    <AAPIText texts={copy.example2}/>
    <!-- PUT EXAMPLE 2 COMPONENT HERE -->
    <AAPIText texts={copy.example3}/>
    <!-- PUT EXAMPLE 3 COMPONENT HERE -->
    <AAPIText texts={copy.copy4}/>
    <AAPIText texts={copy.copy_datasetup}/>
    <AAPITier2 texts={copy.tier2scrolly} />
    <AAPITier2a texts={copy.tier2scrolly} />
    <AAPITier2b texts={copy.tier2scrolly} />

    <AAPIText texts={copy.conclusion}/>
    <AAPIText texts={copy.methodology}/>
    

</div>
<style>
    .wordmark {
		max-width: 8em;
		transform: rotate(-4deg);
        padding: 15px;
        margin: 0 auto;
	}

	.wordmark a {
		border: none;
		display: block;
		color: var(--color-fg);
	}

	.wordmark a:hover {
		background-color: transparent;
	}
    
    #story {
        min-height: 100vh; /* Ensures it fills at least the viewport height */
        background: linear-gradient(to bottom, #A0E648, #7FB639, #598028);
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
    }

    .top-background {
        background: url('$svg/illustrations/backgroundtop.png') no-repeat center top;
        background-size: cover; /* Ensures the image covers the div */
        margin: 0 auto;
        height: 100vh; /* Adjust height as needed */
        width: 100%; /* Spans the full width */
        }

</style>