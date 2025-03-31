<script>
  import Scrolly from "$components/helpers/Scrolly.svelte";
  import { onMount } from "svelte";
  import data from "$data/Tier2b_all.json";
  import scrolly_copy from "$data/scrolly_copy.json";
  export let section;
  let value = 0;
  let currentStage = scrolly_copy[section][value];
  // export let texts;

  let groupedByYearPairs = {}; // Stores movies grouped by two-year periods
  let container;
  let width = 0;
  let height = 0;
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
          isNotAsianDirector: !isAsianDirector,
          isBig5: big5Studios.has(studio), // Check if it's a Big 5 studio
          isNotBig5: !big5Studios.has(studio),
          inaccurateCastings: 0,
          isFullyAccurate: true, 
          hasInaccurate: false,
          isFullyInaccurate: false,
          isPartiallyAccurate: false,
          actors: [],
        });
        existingMovie = tempGroupedByYearPairs[groupKey].find(m => m.movieId === movieId);
      }

      existingMovie.actors.push(actor);
      if (isAccurate) {
        existingMovie.hasAccurate = true;
      } else {
        existingMovie.hasInaccurate = true;
        existingMovie.inaccurateCastings++; // Count inaccurate castings
        existingMovie.isFullyAccurate = false; // Mark as inaccurate if any actor is inaccurate
      }

      existingMovie.isFullyInaccurate = existingMovie.hasInaccurate && !existingMovie.hasAccurate;
      existingMovie.isPartiallyAccurate = existingMovie.hasAccurate && existingMovie.hasInaccurate;
      
      // making a "characteristic" attribute so we can track all attributes of the movie
      const movieCharacteristics = ["isFullyAccurate","isPartiallyAccurate","isFullyInaccurate","isAsianDirector","isBig5"];
      let characteristics = [];
      for (const key in existingMovie) {
        if (existingMovie[key] === true) {
          characteristics.push(key);
        }
      }
      existingMovie.characteristics = characteristics;
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

  function getMovieHighlight(movieId) {
    if (!currentStage.highlight_movies) return ''; // Return empty string if no highlights

    const highlightedMovies = currentStage.highlight_movies.split(",").map(Number); // Convert to numbers
    return highlightedMovies.includes(Number(movieId)) ? 'highlighted-movie' : '';
  }



  function getOpacity(yearRange, chars) {
    const [startYear, endYear] = yearRange.split("-").map(Number);
    const [visibleStart, visibleEnd] = currentStage.visible_years.split("-").map(Number);
    const [opaqueStart, opaqueEnd] = currentStage.opaque_years.split("-").map(Number);
    let dimmed = []  
    if (currentStage.characteristic_dim) {
      dimmed = currentStage.characteristic_dim.split(",");
    }


    let opacity = 0;
    if (endYear >= opaqueStart && endYear <= opaqueEnd) {
      opacity = 1;
    } else if (endYear >= visibleStart && endYear <= visibleEnd) {
      opacity = 0.3;
    } 
    for (const char of chars) {
      if (dimmed.includes(char)) {
        opacity = 0.1;
      }
    }
    return opacity;
  }

  function getMovieColorClass(chars) {
    let shown = [] 
    if (currentStage.characteristic_shown) {
      shown = currentStage.characteristic_shown.split(",");
    }
    

    for (const char of chars) {
      if (shown.includes(char)) {
        return char || "";
      }
    }
    return "";
  }

  function formatImageName(actorName) {
    return `assets/images/headshots/${String(actorName).replace(/ /g, "_")}.jpg`;
  }
  function handleImageError(event) {
    event.target.onerror = null; // Prevent infinite loop
    event.target.src = "assets/images/headshots/headshotfiller.png";
  }

  $: {
    if (value == undefined) { value = 0; }
    currentStage = scrolly_copy[section][value];

    squareSize = width / 100;
  }
</script>
<div class="outsideContainer">
  <section id="scrolly">
    <div class="visualContainer" bind:clientWidth={width} bind:clientHeight={height}>

      <div class="movie-container">
        {#each Object.keys(groupedByYearPairs) as yearRange, year_index}
        <div class="movie-opacity-{getOpacity(yearRange, [], currentStage)} year-group year-group-{year_index}" style="height: {height/30}px;">
          <div class="year-label" style="opacity: {getOpacity(yearRange, [], currentStage)};">
            {yearRange.split("-")[0]}-{yearRange.split("-")[1].slice(-2)}
          </div>
          <div class="movie-row">
            {#each groupedByYearPairs[yearRange] as movie}
              <div 
              class="movie-group {getMovieColorClass(movie.characteristics, currentStage)} {getMovieHighlight(movie.movieId, currentStage)}"
              data-hovered={hoveredMovieId === movie.movieId}
              on:mouseenter={(e) => showMovieTooltip(movie.movieId, e)}
              on:mouseleave={hideMovieTooltip}
              style="opacity: {getOpacity(yearRange, movie.characteristics, currentStage)};"
              role="button"
              tabindex="0">
                {#each movie.actors as actor}
                  <div
                  class="square early-era"
                  data-actor={actor.Actor}
                  data-movie={actor["Background Match?"] === "Y"}
                  style="width: {width/40}px;">
                    <img 
                    src={formatImageName(actor.Actor)}
                    alt="Image of {actor.Actor}"
                    on:error={handleImageError}
                    />
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

<div class="stepContainer">
  <Scrolly bind:value>
    {#each scrolly_copy[section] as stage, i}
    {@const active = value === i}
    <div class="step">
      <div class="stepText">
        <p>{@html stage.text}</p>
      </div>
    </div>
    {/each}
  </Scrolly>
</div>
</section>
</div>

<style>
  .outsideContainer {
    width: 100%; /* Ensure it spans full width */
    max-width: 2000px;
    margin: 0 auto;
  }
  .visualContainer {
    display: block;
    height: 100vh; /* Full viewport height */
    width: 70%; /* Ensure it spans full width */
    margin-left: 30%;
  }
  .stepContainer {
    display: block;
    width: 25%;
    margin-left: 2.5%;
  }
  @media (max-width: 1300px) {
    .visualContainer {
      width: 70%; 
      margin-left: 30%;
      margin-top: 5vh;
      height: 90vh;
    }
    .stepContainer {
      display: block;
      width: 27%;
      margin-left: 1%;
    }
  }
  @media (max-width: 1000px) {
    .visualContainer {
      width: 95%; 
      margin-left: 2.5%;
    }
    .stepContainer {
      display: block;
      width: 350px;
      margin: 0 auto;
    }
  }

  .movie-container {
    display: block;
    position: relative;
    width: 100%;
    top: 50%;
    left: 0px;
    transform: translateY(-50%);
  }

  .year-group {
    display: flex;
    align-items: flex-start;  /* THIS IS IMPORTANT */
    width: 100%; /* THIS IS IMPORTANT */
    padding-bottom: 0px;
    margin-bottom: 5px;
  }


  /* margin between year groupings */
  .year-group-6, .year-group-13 {
/*     margin-bottom:  20px; */
}

.year-label {
  font-size: 20px;
  margin-right: 15px;
  width: 80px; /* Adjusted for two-year format */
  text-align: right;
  color: rgb(55, 17, 82);;
  transition: opacity 0.3s ease;

  display: flex;
  align-items: center;
  height: 100%; /* Ensure the parent has a defined height */
}


.movie-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* Space between movies */
  align-items: flex-start;
  height: 100%;
}


.movie-group {
  display: flex;
  flex-wrap: nowrap; /* Prevents actors in a movie from stacking */
  gap: 1px; /* Space between actors */
  align-items: center;
  opacity:  1;
  transition: all 0.3s ease;
  height: 100%;
  border: 1px solid #aaa;
}
.movie-group:hover {
  border: 1px solid white;
}


.square {
  display: block;
  height: 100%;
  background-color: #dec7ff;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}
.square img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures full coverage while keeping aspect ratio */
  mix-blend-mode: multiply; /* Adjust blend mode as needed */
}
.movie-opacity-0 {
  pointer-events: none;
}
.isFullyAccurate .square {
  background-color: var(--fullyaccurate) !important;
}
.isPartiallyAccurate .square {
  background-color: var(--partiallyaccurate) !important;
} 
.isFullyInaccurate .square {
 background-color: var(--fullyinaccruate) !important;
}

/* Set all actor squares to 0% opacity (fully hidden) */
.square.hidden-actor {
  opacity: 0;
  pointer-events: none; /* Prevents interaction */
}

/* Accurate actors (Green) */
.square[data-movie="true"] {
  --square-color: #2e2b90;
}

/* Default grey color for all squares */
.square.grey {
  background-color: #574177; /* Medium grey */
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
  outline: 2px solid yellow;
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
