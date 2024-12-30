<script>
	import AAPIIntro from "$components/AAPI/AAPI.Intro.svelte";
    import AAPITitle from "$components/AAPI/AAPI.Title.svelte";
    import AAPITier1 from "$components/AAPI/AAPI.Tier1.svelte";
    import AAPITier2 from "$components/AAPI/AAPI.Tier2.svelte";
    import AAPITier2a from "$components/AAPI/AAPI.Tier2a.svelte";
    import AAPIText from "$components/AAPI/AAPI.Text.svelte";
    import AAPITextHeader from "$components/AAPI/AAPI.TextHeader.svelte";
    import textData from "$data/copy.json";
    export let copy;
</script>

<div id="story">

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

    <AAPIText texts={copy.conclusion}/>


    <AAPITextHeader text="Methodology" />
    <AAPIText texts={copy.methodology}/>
    

</div>
<style>
    #story {
        padding: 1em;
        min-height: 100vh; /* Ensures it fills at least the viewport height */
        background: linear-gradient(to bottom, #A0E648, #7FB639, #598028);
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        padding: 20px;
    }
</style>