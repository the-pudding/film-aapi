<script>
  import Scrolly from "$components/helpers/Scrolly.svelte";
  import { onMount } from "svelte";
  import data from "$data/Tier2b_all.json";
  let value = 0;
  export let texts;

  let groupedByYearPairs = {}; // Stores movies grouped by two-year periods
  let width, height;
  let squareSize = 20;
  let hoveredMovieId = null;
  let tooltip = { visible: false, x: 0, y: 0, text: "" };

  // Group movies by two-year periods and sort by number of inaccurate castings
  onMount(() => {
    let tempGroupedByYearPairs = {};
    let years = data.map(movie => movie["Release Year"]);

    let minYear = Math.min(...years);
    let maxYear = Math.max(...years);

    // Define Big 5 studios
    const big5Studios = new Set([
      "Universal Pictures",
      "Paramount Pictures",
      "Warner Bros. Pictures",
      "The Walt Disney Studios",
      "Columbia Pictures"
    ]);

    

    // Initialize two-year groups
    for (let year = minYear; year <= maxYear; year += 2) {
      tempGroupedByYearPairs[`${year}-${year + 1}`] = [];
    }

    // Populate years with movies and count inaccurate castings
    data.forEach(actor => {
      let year = actor["Release Year"];
      let boxOffice = parseFloat(actor["Box Office"].replace(/[$,]/g, "")) || 0;
      let studio = actor["Studio"];
      let isAsianDirector = actor["Is the director asian?"] === "Y";

      let movieId = actor["Movie ID"];
      let isAccurate = actor["Background Match?"] === "Y";

      let groupKey = `${year - (year % 2)}-${year - (year % 2) + 1}`; // Assign to two-year period
      let existingMovie = tempGroupedByYearPairs[groupKey].find(m => m.movieId === movieId);

      if (!existingMovie) {
        tempGroupedByYearPairs[groupKey].push({
          movieId,
          media: actor.Media,
          releaseYear: year,
          boxOffice,
          isAsianDirector,
          studio,
          isBig5: big5Studios.has(studio), // Check if it's a Big 5 studio
          inaccurateCastings: 0,
          isFullyAccurate: true, 
          hasInaccurate: false,
          isFullyInaccurate: false,
          actors: [],
        });
        existingMovie = tempGroupedByYearPairs[groupKey].find(m => m.movieId === movieId);
      }

      existingMovie.actors.push(actor);
      if (isAccurate) {
      existingMovie.hasAccurate = true;
      } 
      else {
      existingMovie.hasInaccurate = true;
      existingMovie.inaccurateCastings++; // Count inaccurate castings
      existingMovie.isFullyAccurate = false; // Mark as inaccurate if any actor is inaccurate
    }
    existingMovie.isFullyInaccurate = existingMovie.hasInaccurate && !existingMovie.hasAccurate;

    });

    // Sort movies within each two-year period by the number of inaccurate castings (highest first)
    Object.keys(tempGroupedByYearPairs).forEach(pair => {
      tempGroupedByYearPairs[pair].sort((a, b) => b.inaccurateCastings - a.inaccurateCastings);
      
      

    });

    groupedByYearPairs = tempGroupedByYearPairs;
  });

  function showMovieTooltip(movieId, event) {
    hoveredMovieId = movieId;
    let movie = Object.values(groupedByYearPairs)
      .flat()
      .find(m => m.movieId === movieId);

    if (!movie) return;

    tooltip = {
      visible: true,
      x: event.clientX + 10,
      y: event.clientY + 10,
      text: `${movie.media} (${movie.releaseYear})\nInaccurate Castings: ${movie.inaccurateCastings}`,
    };
  }

  function hideMovieTooltip() {
    hoveredMovieId = null;
    tooltip.visible = false;
  }
</script>
<style>

.movie-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align all content to the left */
  justify-content: flex-start;
  max-width: 100%; /* Ensures it doesn't limit the width */
  margin-left: 0; /* Forces left alignment */
  margin-right: auto; /* Prevents centering */
  padding-left: 20px; /* Optional: Adds spacing from the left edge */
}
.year-group {
  display: flex;
  align-items: center;
  padding-bottom: 0px;
  margin-bottom: 5px;
  
}

.year-label {
  font-size: 12px;
  margin-right: 15px;
  width: 80px; /* Adjusted for two-year format */
  text-align: right;
  color: rgb(75, 75, 75);
}

.movie-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* Space between movies */
  align-items: flex-start;
}


.movie-group {
  display: flex;
  flex-wrap: nowrap; /* Prevents actors in a movie from stacking */
  gap: 1px; /* Space between actors */
  align-items: center;
}

.movie-group.mixed {
  opacity: 1 !important; 
}

/* 50% opacity for all other movies */
.movie-group.dimmed {
  opacity: 0.3;
}

.movie-group.fully-inaccurate-opaque {
  opacity: 0.3;
  filter: grayscale(100%);
}

.movie-group.fully-inaccurate {
  opacity: 1;
}

.square {
  background-color: var(--square-color, red);
  transition: background-color 0.3s ease;
}

/* Set all actor squares to 0% opacity (fully hidden) */
.square.hidden-actor {
  opacity: 0;
  pointer-events: none; /* Prevents interaction */
}


/* Accurate actors (Green) */
.square[data-movie="true"] {
  --square-color: green;
}

/* Default grey color for all squares */
.square.grey {
  background-color: rgb(150, 150, 150); /* Medium grey */
  transition: background-color 0.3s ease;
}

/* Darker grey on hover */
.movie-group[data-hovered="true"] .square.grey[data-movie="true"]  {
  background-color: rgb(100, 100, 100) ; /* Darker grey */
}

.movie-group[data-hovered="true"] .square.grey[data-movie="false"] {
  background-color: rgb(100, 100, 100);
}

/* Yellow outline for the highlighted movies (Past Lives, Movie ID 63, Movie ID 71) */
.movie-group.highlighted-movie {
  outline: 4px solid yellow;
}

/* Inaccurate actors (Red) */
.square[data-movie="false"] {
  --square-color: red;
}

/* Grey color for Early Era movies */
.square.early-era {
  background-color: rgb(150, 150, 150);
  transition: background-color 0.3s ease;
}

/* Darker grey on hover */
.movie-group[data-hovered="true"] .square.early-era {
  background-color: rgb(100, 100, 100) !important;
}

/* Yellow border for "INDIANA JONES AND THE TEMPLE OF DOOM" (Movie ID: 2) */
.movie-group.highlighted-movie {
  outline: 4px solid yellow; 
}
/* Grey color for Early & Middle Era movies */
.square.early-middle-era {
  background-color: rgb(150, 150, 150);
  transition: background-color 0.3s ease;
}

/* Darker grey on hover */
.movie-group[data-hovered="true"] .square.early-middle-era {
  background-color: rgb(100, 100, 100) !important;
}

/* Yellow outline for the highlighted movies (Crouching Tiger, Rush Hour, 2046) */
.movie-group.highlighted-movie {
  outline: 4px solid yellow;
}


/* Hover Effect */
.movie-group[data-hovered="true"] .square[data-movie="true"] {
  background-color: darkgreen ;
}

.movie-group[data-hovered="true"] .square[data-movie="false"] {
  background-color: darkred;
}

/* Tooltip */
.tooltip {
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px;
  border-radius: 4px;
  font-size: 0.8em;
  pointer-events: none;
  z-index: 10;
  display: none;
  white-space: pre-line;
}

.tooltip.visible {
  display: block;
}

/* Adds space between specific year groups */
.year-gap {
  margin-bottom: 10px; /* Adjust this value as needed */
}

</style>


<section class="scrolly-section">
  <div class="visualContainer">

    {#if value == 0}
    <div class="movie-container">
      {#each Object.keys(groupedByYearPairs) as yearRange, year_index}
      
        <div class="year-group"
          style="margin-bottom: {year_index == 6 || year_index == 13 ? '20px' : '4px'};">

          <div class="year-label">
            {yearRange.split("-")[0]}-{yearRange.split("-")[1].slice(-2)}
          </div>

          <div class="movie-row">
            {#each groupedByYearPairs[yearRange] as movie}
            {#if year_index == 6}
              <div class="year-gap"></div>
             {/if}

              <div 
                class="movie-group"
                role="button"
                tabindex="0"
              >
                {#each movie.actors as actor}
                  <div
                    class="square hidden-actor"
                    data-movie={actor["Background Match?"] === "Y"}
                    style="width: {squareSize / 4}px; height: {squareSize/2}px;"
                  >
                  </div>
                {/each}
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  {/if}
  {#if value == 1}
  <div class="movie-container">
    {#each Object.keys(groupedByYearPairs) as yearRange, year_index}
      <div class="year-group"
        style="margin-bottom: {year_index == 6 || year_index == 13 ? '20px' : '4px'};">
        <div class="year-label">
          {yearRange.split("-")[0]}-{yearRange.split("-")[1].slice(-2)}
        </div>
        <div class="movie-row">
          {#each groupedByYearPairs[yearRange] as movie}
            <div 
              class="movie-group {movie.movieId == 2 ? 'highlighted-movie' : ''}"
              style="opacity: {(+yearRange.split("-")[0] >= 1982 && +yearRange.split("-")[1] <= 1995) ? (movie.movieId == 2 ? 1 : 1) : 0}"
              role="button"
              tabindex="0"
            >
              {#each movie.actors as actor}
                <div
                  class="square early-era"
                  data-movie={actor["Background Match?"] === "Y"}
                  style="width: {squareSize / 4}px; height: {squareSize/2}px;"
                >
                </div>
              {/each}
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
{/if}

{#if value == 2}
  <div class="movie-container">
    {#each Object.keys(groupedByYearPairs) as yearRange, year_index}
      <div class="year-group"          
      style="margin-bottom: {year_index == 6 || year_index == 13 ? '20px' : '4px'};">
        <div class="year-label">
          {yearRange.split("-")[0]}-{yearRange.split("-")[1].slice(-2)}
        </div>
        <div class="movie-row">
          {#each groupedByYearPairs[yearRange] as movie}
            <div 
              class="movie-group {movie.movieId == 15 || movie.movieId == 4 || movie.movieId == 34 ? 'highlighted-movie' : ''}"
              style="opacity: {(+yearRange.split('-')[0] >= 1982 && +yearRange.split('-')[1] <= 1995) ? 0.3 : 
                               (+yearRange.split('-')[0] >= 1996 && +yearRange.split('-')[1] <= 2009) ? 1 : 0}"
              role="button"
              tabindex="0"
            >
              {#each movie.actors as actor}
                <div
                  class="square early-middle-era"
                  data-movie={actor["Background Match?"] === "Y"}
                  style="width: {squareSize / 4}px; height: {squareSize/2}px;"
                >
                </div>
              {/each}
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
{/if}


{#if value == 3}
  <div class="movie-container">
    {#each Object.keys(groupedByYearPairs) as yearRange, year_index}
      <div class="year-group"
        style="margin-bottom: {year_index == 6 || year_index == 13 ? '20px' : '4px'};">
        <div class="year-label">
          {yearRange.split("-")[0]}-{yearRange.split("-")[1].slice(-2)}
        </div>
        <div class="movie-row">
          {#each groupedByYearPairs[yearRange] as movie}
            <div 
              class="movie-group {movie.movieId == 69 || movie.movieId == 63 || movie.movieId == 71 ? 'highlighted-movie' : ''}"
              style="opacity: {(+yearRange.split('-')[0] >= 1982 && +yearRange.split('-')[1] <= 2009) ? 0.3 : 1}"

              data-hovered={hoveredMovieId === movie.movieId}
              on:mouseenter={(e) => showMovieTooltip(movie.movieId, e)}
              on:mouseleave={hideMovieTooltip}
              role="button"
              tabindex="0"
            >
              {#each movie.actors as actor}
                <div
                  class="square grey"
                  data-movie={actor["Background Match?"] === "Y"}
                  style="width: {squareSize / 4}px; height: {squareSize/2}px;"
                >
                </div>
              {/each}
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
{/if}



<!-- 4. Show everything at 100% opacity, all neutral/grey -->
  {#if value == 4}
  <div class="movie-container">
    {#each Object.keys(groupedByYearPairs) as yearRange, year_index}
      <div class="year-group"
      style="margin-bottom: {year_index == 6 || year_index == 13 ? '20px' : '4px'};">
        <div class="year-label">
          {yearRange.split("-")[0]}-{yearRange.split("-")[1].slice(-2)}
        </div>
        <div class="movie-row">
          {#each groupedByYearPairs[yearRange] as movie}
            <div 
              class="movie-group" 
              data-hovered={hoveredMovieId === movie.movieId}
              on:mouseenter={(e) => showMovieTooltip(movie.movieId, e)}
              on:mouseleave={hideMovieTooltip}
              role="button"
              tabindex="0"
            >
              {#each movie.actors as actor}
                <div
                  class="square grey"
                  data-movie={actor["Background Match?"] === "Y"}
                  style="width: {squareSize / 4}px; height: {squareSize/2}px;"
                >
                </div>
              {/each}
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
{/if}

<!-- 5. 100% accurate -- gray for all other ones, ‘green’ for accurate -->
{#if value == 5}
  <div class="movie-container">
    {#each Object.keys(groupedByYearPairs) as yearRange, year_index}
      <div class="year-group"
      style="margin-bottom: {year_index == 6 || year_index == 13 ? '20px' : '4px'};">
        <div class="year-label">
          {yearRange.split("-")[0]}-{yearRange.split("-")[1].slice(-2)}
        </div>
        <div class="movie-row">
          {#each groupedByYearPairs[yearRange] as movie}
            <div 
              class="movie-group" 
              data-hovered={hoveredMovieId === movie.movieId}
              on:mouseenter={(e) => showMovieTooltip(movie.movieId, e)}
              on:mouseleave={hideMovieTooltip}
              role="button"
              tabindex="0"
            >
              {#each movie.actors as actor}
                <div
                  class="square {movie.isFullyAccurate ? 'accurate' : 'grey'}"
                  data-movie={actor["Background Match?"] === "Y"}
                  style="width: {squareSize / 4}px; height: {squareSize/2}px;"
                >
                </div>
              {/each}
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
{/if}

<!-- 6. Mixed accuracy -- opaque gray for all the rest, opaque green for 100% accurate, 
 full opacity for mixed accuracy-->
{#if value == 6}
  <div class="movie-container">
    {#each Object.keys(groupedByYearPairs) as yearRange, year_index}
      <div class="year-group"
      style="margin-bottom: {year_index == 6 || year_index == 13 ? '20px' : '4px'};">
        <div class="year-label">
          {yearRange.split("-")[0]}-{yearRange.split("-")[1].slice(-2)}
        </div>
        <div class="movie-row">
          {#each groupedByYearPairs[yearRange] as movie}
            <div 
              class="movie-group 
                {movie.hasAccurate && movie.hasInaccurate ? 'mixed' : ''} 
                {movie.isFullyInaccurate ? 'fully-inaccurate-opaque' : 'dimmed'}"
              data-hovered={hoveredMovieId === movie.movieId}
              on:mouseenter={(e) => showMovieTooltip(movie.movieId, e)}
              on:mouseleave={hideMovieTooltip}
              role="button"
              tabindex="0"
            >
              {#each movie.actors as actor}
                <div
                  class="square"
                  data-movie={actor["Background Match?"] === "Y"}
                  style="width: {squareSize / 4}px; height: {squareSize/2}px;"
                >
                </div>
              {/each}
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
{/if}
<!-- 7. 0% accuracy -- opaque greens/reds for everything else, 100% opacity for highlighted -->
{#if value == 7}
  <div class="movie-container">
    {#each Object.keys(groupedByYearPairs) as yearRange, year_index}
      <div class="year-group"
      style="margin-bottom: {year_index == 6 || year_index == 13 ? '20px' : '4px'};">
        <div class="year-label">
          {yearRange.split("-")[0]}-{yearRange.split("-")[1].slice(-2)}
        </div>
        <div class="movie-row">
          {#each groupedByYearPairs[yearRange] as movie}
            <div 
              class="movie-group {movie.isFullyInaccurate ? 'fully-inaccurate' : 'dimmed'}"
              data-hovered={hoveredMovieId === movie.movieId}
              on:mouseenter={(e) => showMovieTooltip(movie.movieId, e)}
              on:mouseleave={hideMovieTooltip}
              role="button"
              tabindex="0"
            >
              {#each movie.actors as actor}
                <div
                  class="square"
                  data-movie={actor["Background Match?"] === "Y"}
                  style="width: {squareSize / 4}px; height: {squareSize/2}px;"
                >
                </div>
              {/each}
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
{/if}
<!-- 8. Show everything at 100% opacity, all colored in-->
  {#if value == 8}
    <div class="movie-container">
      {#each Object.keys(groupedByYearPairs) as yearRange, year_index}
      <!-- Modify the label format in the UI -->
      <div class="year-group"
      style="margin-bottom: {year_index == 6 || year_index == 13 ? '20px' : '4px'};">
        <div class="year-label">
          {yearRange.split("-")[0]}-{yearRange.split("-")[1].slice(-2)}
        </div>
        <div class="movie-row">
          {#each groupedByYearPairs[yearRange] as movie}
            <div 
              class="movie-group" 
              data-hovered={hoveredMovieId === movie.movieId}
              on:mouseenter={(e) => showMovieTooltip(movie.movieId, e)}
              on:mouseleave={hideMovieTooltip}
              role="button"
              tabindex="0"
            >
              {#each movie.actors as actor}
                <div
                  class="square"
                  data-movie={actor["Background Match?"] === "Y"}
                  style="width: {squareSize / 4}px; height: {squareSize/2}px;"
                >
                </div>
              {/each}
            </div>
          {/each}
        </div>
      </div>
    {/each}
    </div>
    {/if}
<!-- 9. Big 5 -- make non big 5 transparent

Highlight crazy rich asians 2018
-->
    {#if value == 9}
  <div class="movie-container">
    {#each Object.keys(groupedByYearPairs) as yearRange, year_index}
      <div class="year-group"
      style="margin-bottom: {year_index == 6 || year_index == 13 ? '20px' : '4px'};">
        <div class="year-label">
          {yearRange.split("-")[0]}-{yearRange.split("-")[1].slice(-2)}
        </div>
        <div class="movie-row">
          {#each groupedByYearPairs[yearRange] as movie}
            <div 
              class="movie-group"
              style="opacity: {movie.isBig5 ? 1 : 0.3}"
              data-hovered={hoveredMovieId === movie.movieId}
              on:mouseenter={(e) => showMovieTooltip(movie.movieId, e)}
              on:mouseleave={hideMovieTooltip}
              role="button"
              tabindex="0"
            >
              {#each movie.actors as actor}
                <div
                  class="square"
                  data-movie={actor["Background Match?"] === "Y"}
                  style="width: {squareSize / 4}px; height: {squareSize/2}px;"
                >
                </div>
              {/each}
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
{/if}

<!-- 10. Asian directors -- make non asian directors transparent

Minari
Shang chi
EEAAO
Joy Ride
-->
{#if value == 10}
  <div class="movie-container">
    {#each Object.keys(groupedByYearPairs) as yearRange, year_index}
      <div class="year-group"
      style="margin-bottom: {year_index == 6 || year_index == 13 ? '20px' : '4px'};">
        <div class="year-label">
          {yearRange.split("-")[0]}-{yearRange.split("-")[1].slice(-2)}
        </div>
        <div class="movie-row">
          {#each groupedByYearPairs[yearRange] as movie}
            <div 
              class="movie-group"
              style="opacity: {movie.isAsianDirector ? 1 : 0.3}"
              data-hovered={hoveredMovieId === movie.movieId}
              on:mouseenter={(e) => showMovieTooltip(movie.movieId, e)}
              on:mouseleave={hideMovieTooltip}
              role="button"
              tabindex="0"
            >
              {#each movie.actors as actor}
                <div
                  class="square"
                  data-movie={actor["Background Match?"] === "Y"}
                  style="width: {squareSize / 4}px; height: {squareSize/2}px;"
                >
                </div>
              {/each}
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
{/if}

<!-- 11. Back to complete viz, can hover theoretically and stuff (full functionality/explore)-->
{#if value == 11}
<div class="movie-container">
  {#each Object.keys(groupedByYearPairs) as yearRange, year_index}
  <!-- Modify the label format in the UI -->
  <div class="year-group"
  style="margin-bottom: {year_index == 6 || year_index == 13 ? '20px' : '4px'};">
    <div class="year-label">
      {yearRange.split("-")[0]}-{yearRange.split("-")[1].slice(-2)}
    </div>
    <div class="movie-row">
      {#each groupedByYearPairs[yearRange] as movie}
        <div 
          class="movie-group" 
          data-hovered={hoveredMovieId === movie.movieId}
          on:mouseenter={(e) => showMovieTooltip(movie.movieId, e)}
          on:mouseleave={hideMovieTooltip}
          role="button"
          tabindex="0"
        >
          {#each movie.actors as actor}
            <div
              class="square"
              data-movie={actor["Background Match?"] === "Y"}
              style="width: {squareSize / 4}px; height: {squareSize/2}px;"
            >
            </div>
          {/each}
        </div>
      {/each}
    </div>
  </div>
{/each}
</div>
{/if}


  </div>

  <div class="tooltip {tooltip.visible ? 'visible' : ''}" style="top: {tooltip.y}px; left: {tooltip.x}px;">
    {tooltip.text}
  </div>


  <Scrolly bind:value>
    {#each texts as text, i}
    {@const active = value === i}
    <div class="step">
      <div class="stepText">
      <p>{text.text}</p>
      </div>
    </div>
    {/each}
  </Scrolly>
</section>
