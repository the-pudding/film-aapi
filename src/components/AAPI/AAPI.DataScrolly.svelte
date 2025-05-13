<script>
  import Scrolly from "$components/helpers/Scrolly.svelte";
  import AAPIText from "$components/AAPI/AAPI.Text.svelte";
  import { fade } from 'svelte/transition';
  import { onMount, onDestroy } from "svelte"; // Added onDestroy
  import data from "$data/Tier2b_all.json";
  import scrolly_copy from "$data/copy.json";
  export let section;
  let value = 0;
  let currentStage = scrolly_copy[section][value];
  // export let texts;

  let groupedByYearPairs = {}; // Stores movies grouped by two-year periods
  let container;
  let width = 0;
  let height = 0;
  let outsideWidth = 0;
  let squareSize = 20;
  let hoveredMovieId = null;
  let character_color = null;
  let tooltip = { visible: false, x: 0, y: 0, bottom: 0, text: "", useTop: true }; // Added useTop flag
  
  // Add the onScreen variable
  let onScreen = false;
  let stepContainerElement;
  
  const legendData = [
    {"label": "Complete accuracy", "color": "--fullyaccurate", "stage": 1},
    {"label": "Partial accuracy", "color": "--partiallyaccurate", "stage": 2},
    {"label": "Complete inaccuracy", "color": "--fullyinaccurate", "stage": 3}
  ]
  const altLegendData = [
    {"label": "Accurate", "color": "--fullyaccurate", "stage": 1},
    {"label": "Inaccurate", "color": "--fullyinaccurate", "stage": 3}
  ]
  
  // Add scroll event handler to hide tooltip on scroll
  function handleScroll() {
    if (tooltip.visible) {
      hideMovieTooltip();
    }
    
    // Check if stepContainer is visible
    checkIfOnScreen();
  }
  
  // Function to check if an element is in the viewport
  function checkIfOnScreen() {
    if (!stepContainerElement || typeof window === 'undefined') return;
    
    const rect = stepContainerElement.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    // Consider element visible if any part of it is in the viewport
    const isVisible = 
    rect.top < windowHeight &&
    rect.bottom > 0 &&
    rect.left < windowWidth &&
    rect.right > 0;
    
    onScreen = isVisible;
  }

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
      let director = actor["Director name"];
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
          director,
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
    
    // IMPORTANT: Only add event listeners after component has mounted and window is defined
    if (typeof window !== 'undefined') {
      // Add scroll event listener
      window.addEventListener('scroll', handleScroll, true); // Using capture phase for better detection
      
      // Also listen for wheel events which can happen before scroll events
      window.addEventListener('wheel', handleScroll, true);
      
      // Listen for touchmove events for mobile devices
      window.addEventListener('touchmove', handleScroll, true);
      
      // Set up resize observer to check visibility on window resize
      window.addEventListener('resize', checkIfOnScreen, true);
      
      // Check initially
      setTimeout(checkIfOnScreen, 100);
    }
  });

  // Clean up event listeners when component is destroyed
onDestroy(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', handleScroll, true);
    window.removeEventListener('wheel', handleScroll, true);
    window.removeEventListener('touchmove', handleScroll, true);
    window.removeEventListener('resize', checkIfOnScreen, true);
  }
});

function showMovieTooltip(movieId, event, characteristic) {
  hoveredMovieId = movieId;
  let movie = Object.values(groupedByYearPairs)
  .flat()
  .find(m => m.movieId === movieId);

  if (!movie) return;

    // First set the tooltip content
  let headers = "<tr class='row header'><th>Actor</th><th>Character</th></tr>";
  let accurateCast = [];
  let inaccurateCast = [];

    // Limit the number of actors to prevent overflow (adjust the number as needed)
    const limitActors = 50; // Show max 25 accurate and 25 inaccurate actors
    let accurateCount = 0;
    let inaccurateCount = 0;
    
    for (let i = 0; i < movie.actors.length; i++) {
      if (movie.actors[i]["Background Match?"] == "Y") {
        if (accurateCount < limitActors/2) {
          accurateCast.push("<td class='value actor'>" + movie.actors[i].Actor + " <span>(" + movie.actors[i]["Actor Ethnicity"] + ")</span></td><td class='value character'>" + movie.actors[i]["Character Name"]  + " <span>(" + movie.actors[i]["Character Ethnicity"]  + ")</span></td>");
          accurateCount++;
        }
      } else {
        if (inaccurateCount < limitActors/2) {
          inaccurateCast.push("<td class='value actor'>" + movie.actors[i].Actor + " <span>(" + movie.actors[i]["Actor Ethnicity"] + ")</span></td><td class='value character'>" + movie.actors[i]["Character Name"]  + " <span>(" + movie.actors[i]["Character Ethnicity"]  + ")</span></td>");
          inaccurateCount++;
        }
      }
    }

    // Show total counts if not all actors are displayed
    let accurateFooter = "";
    let inaccurateFooter = "";
    
    let totalAccurate = movie.actors.filter(a => a["Background Match?"] == "Y").length;
    let totalInaccurate = movie.actors.filter(a => a["Background Match?"] != "Y").length;
    
    if (totalAccurate > accurateCount) {
      accurateFooter = `<tr class="row footer"><td colspan="2">+ ${totalAccurate - accurateCount} more accurate casting(s)</td></tr>`;
    }
    
    if (totalInaccurate > inaccurateCount) {
      inaccurateFooter = `<tr class="row footer inaccurate"><td colspan="2">+ ${totalInaccurate - inaccurateCount} more inaccurate casting(s)</td></tr>`;
    }

    // Create the HTML string variables with div elements
    let accuratelyCastList = accurateCast.map(actor => `<tr class='row'>${actor}</tr>`).join('') + accurateFooter;
    let inaccuratelyCastList = inaccurateCast.map(actor => `<tr class='row inaccurate'>${actor}</tr>`).join('') + inaccurateFooter;
    const movieTitle = "<div class='movieTitle'>" + movie.media + "</div>";
    
    tooltip.text = movieTitle + "<table>" + headers + accuratelyCastList + inaccuratelyCastList + "</table>";
    tooltip.visible = true;
    
    // Only access window if it's defined (i.e., in browser environment)
    if (typeof window !== 'undefined') {
      // Determine whether to use top or bottom positioning based on mouse Y position
      const viewportHeight = window.innerHeight;
      tooltip.useTop = event.clientY < viewportHeight / 2;
      
      if (tooltip.useTop) {
        tooltip.y = event.clientY + 10; // Set top position
        tooltip.bottom = undefined; // Clear bottom
      } else {
        tooltip.bottom = viewportHeight - event.clientY + 10; // Set bottom position
        tooltip.y = undefined; // Clear top
      }

      // Set initial position based on horizontal position and container width
      tooltip.x = event.clientX + 10;

      if (event.clientX > outsideWidth / 2) {
        tooltip.x = event.clientX - 270;
      }
      if (outsideWidth < 600) {
        tooltip.x = 10;
      }
    }
  }

  function hideMovieTooltip() {
    hoveredMovieId = null;
    tooltip.visible = false;
  }

  function getMovieHighlight(movieId) {
    if (!currentStage.highlight_movies || !onScreen) return ''; // Return empty string if no highlights

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

  const missingActors = [
    "Nina_Li_Chi",
    "Chow_YunFat",
    "Shinichi_Chiba",
    "Winter_Jones_Tony_Yalda",
    "Youki_Kudoh",
    "Bee_Vang",
    "Zhensu_Wu",
    "Zhiheng_Wang",
    "Ahney_Her",
    "Hyekyo_Song",
    "Xiaoshenyang",
    "Ayaan_Khan",
    "Divian_Ladwa",
    "Jianguo_Yongbo",
    "MengEr_Zhang",
    "Yeojeong_Yoon"
  ];

  // Improved image name formatting with better validation and missing actor check
  function formatImageName(actorName) {
    // Handle null/undefined/empty cases
    if (!actorName) return "assets/images/headshots/headshotfiller.png";
    
    // Clean the name by removing special characters and replacing spaces with underscores
    const name = String(actorName).replace(/[^\w\s]/g, "").replace(/ /g, "_");
    
    // NEW: Check if this actor is in our list of known missing images
    if (missingActors.includes(name)) {
      return "assets/images/headshots/headshotfiller.png";
    }
    
    // Otherwise return the normal path
    if (section == "start") {
      return `assets/images/headshots_color/${name}.jpg`;
    }
    return `assets/images/headshots/${name}.jpg`;
  }
  function handleImageError(event) {
    event.target.onerror = null; // Prevent infinite loop
    event.target.src = "assets/images/headshots/headshotfiller.png";
  }

  $: {
    if (value == undefined) { value = 0; }
    onScreen;
    currentStage = scrolly_copy[section][value];
    character_color = (currentStage.character_color === undefined) ? -1 : currentStage.character_color;
    squareSize = width / 100;    
  }
  
</script>
<div class="outsideContainer {section}" bind:clientWidth={outsideWidth}>
  <section id="scrolly">
    <div class="visualContainer stage{character_color}" bind:clientWidth={width} bind:clientHeight={height}>

      <div class="movie-container">
        {#each Object.keys(groupedByYearPairs) as yearRange, year_index}
        <div class="movie-opacity-{getOpacity(yearRange, [], currentStage)} year-group year-group-{year_index}" style="height: {height/30}px;" transition:fade>
          <div class="year-label" style="opacity: {getOpacity(yearRange, [], currentStage)};">
            {yearRange.split("-")[0]}-{yearRange.split("-")[1].slice(-2)}
          </div>
          <div class="movie-row" transition:fade>
            {#each groupedByYearPairs[yearRange] as movie}
            <div 
            class="movie-group {getMovieColorClass(movie.characteristics, currentStage)} {getMovieHighlight(movie.movieId, currentStage)}"
            data-hovered={hoveredMovieId === movie.movieId}
            on:mouseenter={(e) => showMovieTooltip(movie.movieId, e, movie.characteristics)}
            on:mouseleave={hideMovieTooltip}
            transition:fade
            style="opacity: {getOpacity(yearRange, movie.characteristics, currentStage)};"
            role="button"
            tabindex="0">
            {#each movie.actors as actor}
            <div
            transition:fade
            class="square early-era actorClass{actor["Background Match?"]}"
            data-actor={actor.Actor}
            data-movie={actor["Background Match?"] === "Y"}
            style="width: {width < 800 ? width/50 : width/40}px; transition: background-color 0ms {0 + Math.random() * 500}ms; ">
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
    {#if section == "end"}
    {#if character_color != "1"}
    <div class="legend" transition:fade>
      {#each legendData as d, i}
      {#if value >= d.stage}
      <div class="legendItem" transition:fade><span style="background: var({d.color});"></span> {d.label}</div>
      {/if}
      {/each}
    </div>
    {:else}
    <div class="legend" transition:fade>
      {#each altLegendData as d, i}
      {#if value >= d.stage}
      <div class="legendItem" transition:fade><span style="background: var({d.color});"></span> {d.label}</div>
      {/if}
      {/each}
    </div>
    {/if}
    {/if}
  </div>
</div>

<!-- Conditionally set top or bottom position based on useTop flag -->
<div class="tooltip {tooltip.visible ? 'visible' : ''} {tooltip.orientation}" 
style="{tooltip.useTop ? `top: ${tooltip.y}px;` : `bottom: ${tooltip.bottom}px;`} left: {tooltip.x}px;">
{@html tooltip.text}
<div class="tooltip-arrow"></div>
</div>

<div class="stepContainer" bind:this={stepContainerElement}>
  <Scrolly bind:value>
    {#each scrolly_copy[section] as stage, i}
    {@const active = value === i}
    <div class="step">
      <div class="stepText">
        <AAPIText texts={stage.text} />
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
    font-family: var(--mono);
  }
  .visualContainer {
    display: block;
    height: 100vh; /* Full viewport height */
    width: 70%; /* Ensure it spans full width */
    margin-left: 30%;
    z-index: 10;
  }
  .stepContainer {
    width: 25%;
    margin-left: 2.5%;
    z-index: 99;
    position: relative; 
    pointer-events: none;
  }
  @media (max-width: 1300px) {
    .visualContainer {
      width: 70%; 
      margin-left: 30%;
      margin-top: 5vh;
      height: 90vh;
    }
    .stepContainer {
      width: 27%;
      margin-left: 1%;
    }
  }
  @media (max-width: 1200px) {
    .visualContainer {
      width: 98%; 
      margin-left: 2%;
      height: 95vh;
      margin-top: 5vh;
    }
    .stepContainer {
      display: block;
      width: 500px;
      max-width: 99%;
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
    margin-bottom: 8px;
  }


  /* margin between year groupings */
  .year-group-6, .year-group-13 {
/*     margin-bottom:  20px; */
}

.year-label {
  font-size: 15px;
  margin-right: 15px;
  width: 60px; /* Adjusted for two-year format */
  text-align: right;
  color: var(--text-color);
  transition: opacity 0.3s ease;
/*   font-weight: bold; */
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
  gap: 0px; /* Space between actors */
  align-items: center;
  opacity:  1;
  transition: all 0.5s ease;
  height: 100%;
  border: 0.5px solid #594158;
}
.movie-group:hover {
  transform: scale(1.05);
}


.square {
  display: block;
  height: 100%;
  background-color: #dec7ff;
  transition: all 0.05s ease;
  position: relative;
  overflow: hidden;
  border: 0.5px solid #594158;
}
.square img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures full coverage while keeping aspect ratio */
  mix-blend-mode: luminosity; /* Adjust blend mode as needed */
}
.movie-opacity-0 {
  pointer-events: none;
}
.stage-1 .isFullyAccurate .square {
  background-color: var(--fullyaccurate) !important;
}
.stage-1 .isPartiallyAccurate .square {
  background-color: var(--partiallyaccurate) !important;
} 
.stage-1 .isFullyInaccurate .square {
 background-color: var(--fullyinaccurate) !important;
}


.stage1 .actorClassN {
 background-color: var(--fullyinaccurate) !important;
}
.stage1 .actorClassY {
  background-color: var(--fullyaccurate) !important;
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
  outline: 4px solid var(--hl-border);
  transform: scale(1.2);
  z-index: 99;
  box-shadow: 0 0 12px 12px rgba(0,0,0,0.3);
}

/* Tooltip */
.tooltip {
  position: fixed;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 10px;
  border-radius: 4px;
  font-size: 12px;
  pointer-events: none;
  z-index: 1000;
  display: none;
  max-width: 350px;
  /* Remove max-height and overflow-y to prevent scrolling */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  border: 1px solid #444;
  white-space: normal;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.tooltip.visible {
  display: block;
}

/* Mobile tooltip specific styles */
.tooltip.mobile {
  max-width: calc(100% - 20px);
  width: calc(100% - 20px);
  left: 10px !important; /* Override inline styles */
  max-height: 40vh;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

/* Tooltip arrow */
.tooltip-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border: 8px solid transparent;
  pointer-events: none;
}

/* Arrow direction classes */
.tooltip.left .tooltip-arrow {
  right: -16px;
  top: 20px;
  border-left-color: rgba(0, 0, 0, 0.9);
}

.tooltip.right .tooltip-arrow {
  left: -16px;
  top: 20px;
  border-right-color: rgba(0, 0, 0, 0.9);
}

.tooltip.top .tooltip-arrow {
  bottom: -16px;
  left: 50%;
  transform: translateX(-50%);
  border-top-color: rgba(0, 0, 0, 0.9);
}

.tooltip.bottom .tooltip-arrow {
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
  border-bottom-color: rgba(0, 0, 0, 0.9);
}

/* Hide arrow for mobile */
.tooltip.mobile .tooltip-arrow {
  display: none;
}

.tooltip .movieTitle {
  font-weight: bold;
  margin-bottom: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.tooltip table {
  width: 100%;
  border-collapse: collapse;
}

.tooltip th {
  text-align: left;
  padding: 3px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.tooltip td {
  padding: 3px;
  vertical-align: top;
}

.tooltip .row.inaccurate {
  background-color: rgba(255, 100, 100, 0.2);
}

.tooltip .value span {
  opacity: 0.7;
  font-size: 0.9em;
  display: block;
}

/* Remove any ::after pseudo-elements that create scroll indicators */
.tooltip::after {
  display: none;
}

/* Remove scrollbar styles */
.tooltip::-webkit-scrollbar {
  display: none;
}

/* Adds space between specific year groups */
.year-gap {
  margin-bottom: 10px; /* Adjust this value as needed */
}

.legend {
  position: absolute;
  top: 0px;
  right: 10px;
  width: 210px;
  font-size: 14px;
}

.legendItem span {
  top: 2px;
  width: 12px;
  height: 12px;
  display: inline-block;
  border: 1px solid #444;
}
@media (max-width: 500px) {
  .legend {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 160px;
    font-size: 12px;
  }
  .legendItem span {
    height: 10px;
    width: 10px;
  }
  .movie-row {
    gap: 5px;
  }
}
/* Additional styling for the footer rows in the tooltip */
.tooltip .row.footer {
  font-size: 0.9em;
  font-style: italic;
  text-align: center;
  color: #aaa;
}
</style>