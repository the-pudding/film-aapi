<script>
	import wordmark from "$svg/wordmark-shadow.svg";
    import AAPIIntro from "$components/AAPI/AAPI.Intro.svelte";
    import AAPITitle from "$components/AAPI/AAPI.Title.svelte";
    import AAPITier1C from "$components/AAPI/AAPI.Tier1C.svelte";
    import AAPITier2finalfinal from "$components/AAPI/AAPI.Tier2finalfinal.svelte";
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

    <!--AAPIIntro texts={copy.introScrolly} /-->
    <AAPIText texts={copy.copy1}/>
    <AAPITitle />

    <!-- PUT MOVIE POSTERS COMPONENT HERE f-->
    <AAPIText texts={copy.copy2}/>
    <AAPITier1C texts={copy.tier1scrolly} />
    <AAPIText texts={copy.copy3}/>
    <AAPIText texts={copy.example1}/>
    <!-- PUT EXAMPLE 1 COMPONENT HERE gyvh-->
    <AAPIText texts={copy.example2}/>
    <!-- PUT EXAMPLE 2 COMPONENT HERE -->
    <AAPIText texts={copy.example3}/>
    <!-- PUT EXAMPLE 3 COMPONENT HERE -->
    <AAPIText texts={copy.copy4}/>
    <AAPIText texts={copy.copy_datasetup}/>
    <AAPITier2finalfinal texts={copy.tier2scrolly} /> 
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
        background: #876EA6;
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
    }

    .top-background {
        background: url('$svg/illustrations/comic.png') no-repeat center top;
        background-size: cover; /* Ensures the image covers the div */
        margin: 0 auto;
        height: 100vh; /* Adjust height as needed */
        width: 50%; /* Spans the full width */
        }

    .amw {
        background: url('$svg/illustrations/annamaewong.jpg') no-repeat center top;
        /*background-size: cover; /* Ensures the image covers the div */
        margin: 0 auto;
        height: 40vh; /* Adjust height as needed */
        width: 30%; /* Spans the full width */
        background-size: contain;
        }

</style>
