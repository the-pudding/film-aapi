<script>
	import wordmark from "$svg/wordmark-shadow.svg";
    import AAPIIntroScrolly from "$components/AAPI/AAPI.IntroScrolly.svelte";
    import AAPITitle from "$components/AAPI/AAPI.Title.svelte";
    import AAPIDataScrolly from "$components/AAPI/AAPI.DataScrolly.svelte";
    import AAPIText from "$components/AAPI/AAPI.Text.svelte";
    import AAPISubhed from "$components/AAPI/AAPI.Subhed.svelte";
    import AAPIImages from "$components/AAPI/AAPI.Images.svelte";
    import AAPIhistoricalPictures from "$components/AAPI/AAPI.historical.svelte";
    export let copy;
</script>

<div id="story">
    <AAPIIntroScrolly />
    <AAPITitle />
    <AAPIText texts={copy.history}/>
    <AAPIhistoricalPictures />
    <AAPIText texts={copy.population}/>
  <!--   <AAPIImages
        title="Number of Asians in the US over time"
        subtitle="1980 - 2020"
        url="assets/images/asian-population-graph.png"
        alt="Number of Asians in the US over time, 1980 - 2020"
        caption="Data source: US Census Bureau, 1980 - 2020"
    /> -->
    <AAPIText texts={copy.stereotypes}/>
    <AAPIImages
    url="assets/images/nancy-kwan.png"
    alt="Nancy Kwan plays Suzie Wong in The World of Suzie Wong (1960)"
    caption="Nancy Kwan plays Suzie Wong in <i>The World of Suzie Wong</i> (1960)"
    />
    <AAPIText texts={copy.dataSetup}/>
<!--     <AAPIImages
    title="9882 Movies"
    subtitle=""
    url="assets/images/tier0-movie-viz.png"
    alt="Visual of 9882 movies"
    caption=""
    /> -->
    <AAPIText texts={copy.dataSetup400}/>
 <!--    <AAPIImages
    title="477 Movies"
    subtitle=""
    url="assets/images/tier1-movie-viz.png"
    alt="Visual of 477 movies"
    caption=""
    /> -->
    <AAPIText texts={copy.dataSetup80}/>
   <!--  <AAPIImages
    title="80 Movies"
    subtitle=""
    url="assets/images/tier2-movie-viz.png"
    alt="Visual of 80 movies"
    caption=""
    /> -->
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
    subtitle="2022 - 2023"
    url="assets/images/identity-chart.png"
    alt="How Asian Americans identify themselves"
    caption="Data source: Pew Research Center, Survey of Asian American adults conducted 2022 - 2023"
    />

    <AAPIText texts={copy.thesis}/>

    <AAPIDataScrolly section="end" />

    <AAPIText texts={copy.conclusion}/>
    <AAPIText texts={copy.methodology}/>
    

</div>
<style>

    #story {
        min-height: 100vh; /* Ensures it fills at least the viewport height */
        background: var(--bgcolor);
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        font-family: var(--sans);
    }

    .top-background {
        background: url('assets/images/comic.png') no-repeat center top;
        background-size: cover; /* Ensures the image covers the div */
        margin: 0 auto;
        height: 100vh; /* Adjust height as needed */
        width: 50%; /* Spans the full width */
    }
</style>
