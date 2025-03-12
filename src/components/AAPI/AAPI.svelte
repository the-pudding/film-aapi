<script>
	import wordmark from "$svg/wordmark-shadow.svg";
    import AAPITitle from "$components/AAPI/AAPI.Title.svelte";
    import AAPITier2finalfinal from "$components/AAPI/AAPI.Tier2finalfinal.svelte";
    import AAPIText from "$components/AAPI/AAPI.Text.svelte";

    import AAPIhistoricalPictures from "$components/AAPI/AAPI.historical.svelte";
    import population from "$svg/illustrations/asian-population-graph.png";
    import nancy from "$svg/illustrations/nancy-kwan.png";
    import CRAgif from "$svg/illustrations/crazy-rich-asians-gif.gif";
    import identity from "$svg/illustrations/identity-chart.png";
    import tier0viz from "$svg/illustrations/tier0-movie-viz.png";
    import tier1viz from "$svg/illustrations/tier1-movie-viz.png";
    import tier2viz from "$svg/illustrations/tier2-movie-viz.png";
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

    <!--AAPIIntro texts={copy.comic} /-->

    <AAPITitle />
    <AAPIText texts={copy.history}/>
    <AAPIhistoricalPictures />
    <AAPIText texts={copy.population}/>
    <div class="image-container">
        <figure>
            <p class ="title">Number of Asians in the US over time</p>
            <p class ="subtitle"> 1980 - 2020</p> <!-- TODO: Fix how this looks-->
            <img src={population} alt="Number of Asians in the US over time, 1980 - 2020">
            <figcaption>Data source: US Census Bureau, 1980 - 2020</figcaption>
        </figure>
    </div>
    <AAPIText texts={copy.stereotypes}/>
    <div class="image-container">
        <figure>
            <img src={nancy} alt="Nancy Kwan plays Suzie Wong in The World of Suzie Wong (1960)">
            <figcaption>Nancy Kwan plays Suzie Wong in The World of <i>Suzie Wong (1960)</i></figcaption>
        </figure>
    </div>
    <AAPIText texts={copy.pastDecade}/>
    <div class="image-container">
        <figure>
            <img src={CRAgif} alt="The cast of Crazy Rich Asians (2018) at the Screen Actors Guild Awards. Source: Giphy">
            <figcaption>The cast of <i>Crazy Rich Asians (2018)</i> at the Screen Actors Guild Awards. Source: Giphy</figcaption>
        </figure>
    </div>
    <AAPIText texts={copy.identity}/>
    <div class="image-container">
        <figure>
            <p class ="title">How Asian Americans identify themselves</p>
            <img src={identity} alt="How Asian Americans identify themselves">
            <figcaption>Data source: Pew Research Center, Survey of Asian Americans adults conducted 2022 -2023</figcaption>
        </figure>
    </div>
    <AAPIText texts={copy.thesis}/>
    <AAPIText texts={copy.dataSetup}/>
    <div class="image-container">
        <figure>
            <p class ="title">9882 movies</p>
            <img src={tier0viz} alt="Visual of 9882 movies">
        </figure>
    </div>
    <AAPIText texts={copy.dataSetup400}/>
    <div class="image-container">
        <figure>
            <p class ="title">477 movies</p>
            <img src={tier1viz} alt="Visual of 477 movies">
        </figure>
    </div>
    <AAPIText texts={copy.dataSetup80}/>
    <div class="image-container">
        <figure>
            <p class ="title">80 movies</p>
            <img src={tier2viz} alt="Visual of 80 movies">
        </figure>
    </div>
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

        figure {
         margin: 0 auto;
    }

    .image-container {
      display: flex;
      flex-wrap: wrap; /* Allows wrapping on smaller screens */
      max-width: 600px;  /* Limits the content width */
      margin: 0 auto;    /* Centers the container */
      padding-bottom: 30px;
    }
  
    figcaption {
        margin-top: 8px;
        font-size: 12px;
        color:  var(--color-gray-300); /* Slightly muted text */
        font-family: var(--sans); /* Use the font from app.css */
        max-width: 600px;
  }
  
    @media (max-width: 768px) {
      .image-container {
        flex-direction: column;
        align-items: center;
      }
    }

</style>
