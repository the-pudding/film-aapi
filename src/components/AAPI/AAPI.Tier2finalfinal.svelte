<script>
  import { onMount } from "svelte";

  import data from "$data/Tier2b_all.json";

  let groupedByYear = {}; // Stores movies grouped by year
  let width, height;
  let squareSize = 20;
  let hoveredMovieId = null;
  let tooltip = { visible: false, x: 0, y: 0, text: "" };

  // Group movies by year and sort by box office revenue
  onMount(() => {
    let tempGroupedByYear = data.reduce((acc, actor) => {
      let year = actor["Release Year"];
      let boxOffice = parseFloat(actor["Box Office"].replace(/[$,]/g, "")) || 0;
      let movieId = actor["Movie ID"];

      if (!acc[year]) acc[year] = {};
      if (!acc[year][movieId]) {
        acc[year][movieId] = {
          movieId,
          media: actor.Media,
          releaseYear: year,
          boxOffice,
          actors: [],
        };
      }

      acc[year][movieId].actors.push(actor);
      return acc;
    }, {});

    // Convert object structure into sorted arrays
    Object.keys(tempGroupedByYear).forEach((year) => {
      tempGroupedByYear[year] = Object.values(tempGroupedByYear[year]).sort((a, b) => b.boxOffice - a.boxOffice);
    });

    groupedByYear = tempGroupedByYear; // Ensure reactivity
  });

  function showMovieTooltip(movieId, event) {
    hoveredMovieId = movieId;
    let movie = Object.values(groupedByYear)
      .flat()
      .find((m) => m.movieId === movieId);

    if (!movie) return;

    tooltip = {
      visible: true,
      x: event.clientX + 10,
      y: event.clientY + 10,
      text: `${movie.media} (${movie.releaseYear})\nBox Office: $${movie.boxOffice.toLocaleString()}`,
    };
  }

  function hideMovieTooltip() {
    hoveredMovieId = null;
    tooltip.visible = false;
  }

  $: console.log(groupedByYear);
</script>





<style>
.movie-container {
  display: flex;
  flex-direction: column;
  gap: 20px; /* Space between year rows */
  max-width: 80vw;
  margin: 0 auto;
  padding-bottom: 700px; /* Prevent overlap with next section */
}


.year-group {
  display: flex;
  align-items: center;
  padding-bottom: 10px; /* Adds space between rows */
  border-bottom: 1px solid rgb(75, 75, 75); /* Thin grey line between years */
}


.year-label {
  font-size: 14px;
  margin-right: 15px; /* Space between label and movies */
  width: 60px; /* Fixed width to align numbers */
  text-align: right;
  color: rgb(75, 75, 75);
}

.movie-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* Space between different movies */
  align-items: flex-start;
}

.movie-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1px; /* Small gap between actors in the same movie */
  align-items: center;
}

.square {
  background-color: var(--square-color, red);
  transition: background-color 0.3s ease;
}

/* Accurate actors (Green) */
.square[data-movie="true"] {
  --square-color: green;
}

/* Inaccurate actors (Red) */
.square[data-movie="false"] {
  --square-color: red;
}

/* Hover Effect */
.movie-group[data-hovered="true"] .square[data-movie="true"] {
  background-color: darkgreen !important; /* Darker green on hover */
}

.movie-group[data-hovered="true"] .square[data-movie="false"] {
  background-color: darkred !important; /* Darker red on hover */
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
    <div class="movie-container">
      {#each Object.entries(groupedByYear) as [year, movies]}
        <div class="year-group">
          <div class="year-label">{year}</div>
          <div class="movie-row">
            {#each movies as movie}
              <div 
                class="movie-group" 
                data-hovered={hoveredMovieId === movie.movieId}
                on:mouseenter={(e) => showMovieTooltip(movie.movieId, e)}
                on:mouseleave={hideMovieTooltip}
                tabindex="0"
                role="button"
              >
                {#each movie.actors as actor}
                <div
                class="square"
                data-movie={actor["Background Match?"] === "Y"}
                style="width: {squareSize / 2}px; height: {squareSize}px;"
              >
              </div>
              
                {/each}
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>

  <div class="tooltip {tooltip.visible ? 'visible' : ''}" style="top: {tooltip.y}px; left: {tooltip.x}px;">
    {tooltip.text}
  </div>
</section>
