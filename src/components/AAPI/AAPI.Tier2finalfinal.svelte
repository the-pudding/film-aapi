<script>
  import { onMount } from "svelte";
  import data from "$data/Tier2b_all.json";

  let groupedByYearPairs = {}; // Stores movies grouped by two-year periods
  let width, height;
  let squareSize = 20;
  let hoveredMovieId = null;
  let tooltip = { visible: false, x: 0, y: 0, text: "" };

  // Group movies by two-year periods and sort by box office revenue
  onMount(() => {
    let tempGroupedByYearPairs = {};
    let years = data.map(movie => movie["Release Year"]);

    let minYear = Math.min(...years);
    let maxYear = Math.max(...years);

    // Initialize two-year groups
    for (let year = minYear; year <= maxYear; year += 2) {
      tempGroupedByYearPairs[`${year}-${year + 1}`] = [];
    }

    // Populate years with movies
    data.forEach(actor => {
      let year = actor["Release Year"];
      let boxOffice = parseFloat(actor["Box Office"].replace(/[$,]/g, "")) || 0;
      let movieId = actor["Movie ID"];

      let groupKey = `${year - (year % 2)}-${year - (year % 2) + 1}`; // Assign to two-year period
      if (!tempGroupedByYearPairs[groupKey].some(m => m.movieId === movieId)) {
        tempGroupedByYearPairs[groupKey].push({
          movieId,
          media: actor.Media,
          releaseYear: year,
          boxOffice,
          actors: [],
        });
      }

      tempGroupedByYearPairs[groupKey].find(m => m.movieId === movieId).actors.push(actor);
    });

    // Sort movies within each two-year period by descending box office revenue
    Object.keys(tempGroupedByYearPairs).forEach(pair => {
      tempGroupedByYearPairs[pair].sort((a, b) => b.boxOffice - a.boxOffice);
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
      text: `${movie.media} (${movie.releaseYear})\nBox Office: $${movie.boxOffice.toLocaleString()}`,
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
  gap: 0px; /* Space between year rows */
  max-width: 80vw;
  margin: 0 auto;
  padding-bottom: 700px; /* Prevent overlap with next section */
}


.year-group {
  display: flex;
  align-items: center;
  padding-bottom: 0px; /* Adds space between rows */
}


.year-label {
  font-size: 10px;
  margin-right: 15px; /* Space between label and movies */
  width: 60px; /* Fixed width to align numbers */
  text-align: right;
  color: rgb(75, 75, 75);
}

.movie-row {
  display: flex;
  flex-wrap: wrap;
  gap: 7px; /* Space between different movies */
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
      {#each Object.keys(groupedByYearPairs) as yearRange}
        <div class="year-group">
          <div class="year-label">{yearRange}</div>
          <div class="movie-row">
            {#if groupedByYearPairs[yearRange].length > 0}
              {#each groupedByYearPairs[yearRange] as movie}
                <div 
                  class="movie-group" 
                  data-hovered={hoveredMovieId === movie.movieId}
                  on:mouseenter={(e) => showMovieTooltip(movie.movieId, e)}
                  on:mouseleave={hideMovieTooltip}
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
            {:else}
              <div class="empty-year-placeholder"></div> <!-- Ensures the row still takes space -->
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>

  <div class="tooltip {tooltip.visible ? 'visible' : ''}" style="top: {tooltip.y}px; left: {tooltip.x}px;">
    {tooltip.text}
  </div>
</section>
