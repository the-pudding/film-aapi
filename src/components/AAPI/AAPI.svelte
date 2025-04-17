<script>
	import wordmark from "$svg/wordmark-shadow.svg";
    import AAPIIntroScrolly from "$components/AAPI/AAPI.IntroScrolly-ALT.svelte";
    import AAPITitle from "$components/AAPI/AAPI.Title.svelte";
    import AAPIDataScrolly from "$components/AAPI/AAPI.DataScrolly.svelte";
    import AAPIText from "$components/AAPI/AAPI.Text.svelte";
    import AAPISubhed from "$components/AAPI/AAPI.Subhed.svelte";
    import AAPIImages from "$components/AAPI/AAPI.Images.svelte";
    import AAPIhistoricalPictures from "$components/AAPI/AAPI.historical.svelte";
    export let copy;

    let showBox = false;
</script>


<AAPIIntroScrolly />
<div id="story">
    <AAPITitle />
    <AAPIText texts={copy.intro}/>
    <AAPIText texts={copy.history}/>
    <AAPIhistoricalPictures />
    <!-- <AAPIText texts={copy.population}/> -->
    <AAPIText texts={copy.stereotypes}/>
    <AAPIImages
    url="assets/images/nancy-kwan.png"
    alt="Nancy Kwan plays Suzie Wong in The World of Suzie Wong (1960)"
    caption="Nancy Kwan plays Suzie Wong in <i>The World of Suzie Wong</i> (1960)"
    />
    <AAPIText texts={copy.dataTransition}/>

<!-- 
<button id="toggle-button" on:click={() => (showBox = !showBox)}>
	More details on our methodology {showBox ? '−' : '+'} 
</button>

{#if showBox}
	<div id="box">
		<AAPIText texts={copy.dataSetup}/>
	</div>
{/if} -->

<AAPIDataScrolly section="start" />


<AAPIText texts={copy.pastDecade}/>
<AAPIImages
url="assets/images/crazy-rich-asians-gif.gif"
alt="The cast of Crazy Rich Asians (2018) at the Screen Actors Guild Awards. Source: Giphy"
caption="The cast of <i>Crazy Rich Asians (2018)</i> at the Screen Actors Guild Awards. Source: Giphy"
/>

<AAPIText texts={copy.identity}/>
<AAPIImages
title="How Asian Americans identify themselves"
url="assets/images/ChartAAPI.svg"
urlmobile="assets/images/ChartAAPI-mobile.svg"
alt="How Asian Americans identify themselves"
caption="Data source: Pew Research Center, Survey of Asian American adults conducted 2022 - 2023"
/>

<AAPIText texts={copy.thesis}/>

<AAPIDataScrolly section="end" />

<AAPIText texts={copy.conclusion}/>

<div class="shortline"></div>

<dix id= "box">
    <h6>
        Methodology
    </h6>
    <AAPIText texts={copy.methodology} size="small"/> 
</dix>


</div>
<style>
    h6 {
        margin: 1 auto;
        text-align: center;
    }
    #story {
        min-height: 100vh; /* Ensures it fills at least the viewport height */
        font-family: var(--sans);
        max-width: 97%;
        margin: 0px auto 0;
    }

    .top-background {
        background: url('assets/images/comic.png') no-repeat center top;
        background-size: cover; /* Ensures the image covers the div */
        margin: 0 auto;
        height: 100vh; /* Adjust height as needed */
        width: 50%; /* Spans the full width */
    }
    .shortline {
        display: block;
        width: 200px;
        margin:  50px auto;
        border-top: 2px solid var(--text-color);
    }
    #toggle-button {
        display: block;
        cursor: pointer;
        background: none;
        font-size: 1em;
        color: #333;
        margin: 0 auto;
        text-align: center;
        font-weight: bold;
    }

    #box {
/*         background-color: #c4bfe6; */
width: 40%;
margin: 0 auto;
padding: 10px;
}

</style>
