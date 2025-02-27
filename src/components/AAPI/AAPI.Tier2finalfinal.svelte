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
  opacity: 0.5;
}

.movie-group.fully-inaccurate-opaque {
  opacity: 0.5;
  filter: grayscale(100%);
}

.movie-group.fully-inaccurate {
  opacity: 1;
}

.square {
  background-color: var(--square-color, red);
  transition: background-color 0.3s ease;
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


/* Inaccurate actors (Red) */
.square[data-movie="false"] {
  --square-color: red;
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

</style>


<section class="scrolly-section">
  <div class="visualContainer">

  {#if value == 0}
  <div class="movie-container">
    {#each Object.keys(groupedByYearPairs) as yearRange}
      <div class="year-group">
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

{#if value == 1}
  <div class="movie-container">
    {#each Object.keys(groupedByYearPairs) as yearRange}
      <div class="year-group">
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

{#if value == 2}
  <div class="movie-container">
    {#each Object.keys(groupedByYearPairs) as yearRange}
      <div class="year-group">
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

{#if value == 3}
  <div class="movie-container">
    {#each Object.keys(groupedByYearPairs) as yearRange}
      <div class="year-group">
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

  {#if value == 4}
    <div class="movie-container">
      {#each Object.keys(groupedByYearPairs) as yearRange}
      <!-- Modify the label format in the UI -->
      <div class="year-group">
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

    {#if value == 8}
  <div class="movie-container">
    {#each Object.keys(groupedByYearPairs) as yearRange}
      <div class="year-group">
        <div class="year-label">
          {yearRange.split("-")[0]}-{yearRange.split("-")[1].slice(-2)}
        </div>
        <div class="movie-row">
          {#each groupedByYearPairs[yearRange] as movie}
            <div 
              class="movie-group"
              style="opacity: {movie.isBig5 ? 1 : 0.5}"
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

{#if value == 9}
  <div class="movie-container">
    {#each Object.keys(groupedByYearPairs) as yearRange}
      <div class="year-group">
        <div class="year-label">
          {yearRange.split("-")[0]}-{yearRange.split("-")[1].slice(-2)}
        </div>
        <div class="movie-row">
          {#each groupedByYearPairs[yearRange] as movie}
            <div 
              class="movie-group"
              style="opacity: {movie.isAsianDirector ? 1 : 0.5}"
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

{#if value == 10}
<div class="movie-container">
  {#each Object.keys(groupedByYearPairs) as yearRange}
  <!-- Modify the label format in the UI -->
  <div class="year-group">
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
