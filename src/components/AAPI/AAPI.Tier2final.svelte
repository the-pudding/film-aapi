<script>
    import Scrolly from "$components/helpers/Scrolly.svelte";
    import data from "$data/Tier2b_all.json";

    let value = 0;
    export let texts;
    
    let CRA = data.find(m => m["Movie ID"] === 37); //data setup for part 1 

    //data setup for part 2
    let movies = Array.from(
      data.reduce((acc, movie) => {
        let key = movie["Movie ID"];
        if (!acc.has(key)) {
          acc.set(key, {
            id: key,
            name: movie["Media"],
            boxOffice: parseFloat(movie["Box Office"].replace(/\$/g, '').replace(/,/g, '')) || 0,
            actors: []
          });
        }
        acc.get(key).actors.push(movie);
        return acc;
      }, new Map()).values()
    ).sort((a, b) => b.boxOffice - a.boxOffice).slice(0, 20);

    let allMovies = Array.from(
      data.reduce((acc, movie) => {
        let key = movie["Movie ID"];
        if (!acc.has(key)) {
          acc.set(key, {
            id: key,
            actors: []
          });
        }
        acc.get(key).actors.push(movie);
        return acc;
      }, new Map()).values()
    );
  
      
    let width, height;
    let actors3 = [];
    let squareSize3;
    let hoveredMovieId = null; // Track the hovered movie ID
    $: squareSize3 = width ? width / 100 : 10;

    let boxSize = 200;
    let squareSize = 30;
    let gap = 5;
    let tooltip = { visible: false, x: 0, y: 0, text: "" };

  
    function showTooltip(event, actor, type = "default") {
      if (type === "default") {
        tooltip = {
          visible: true,
          x: event.clientX + 10,
          y: event.clientY + 10,
          text: `${actor["Actor"]} as ${actor["Character Name"]}`
        };
      } else if (type === "movie") {
        if (actor.Media === '') return;
        hoveredMovieId = actor["Movie ID"];
        const associatedActors = actors3.filter(a => a["Movie ID"] === actor["Movie ID"]).map(a => a.Actor);
        tooltip = {
          visible: true,
          x: event.clientX + 10,
          y: event.clientY + 10,
          text: `${actor.Media} (${actor["Release Year"]})\nActors: ${associatedActors.join(", ")}`,
        };
      }
    }
  
    function hideTooltip() {
        hoveredMovieId = null;
        tooltip.visible = false;
    }

    function formatTitle(title) {
      return title.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
    }


    $: width, height;
  </script>

<section class="scrolly-section">
<div class="visualContainer" bind:clientWidth={width} bind:clientHeight={height}>

 {#if value <= 1}
  <div class="movie-box" style="width: {boxSize}px; height: {boxSize}px;">
    <div class="title" style="text-align: left; width: 100%;">{formatTitle(CRA["Media"])}</div>
    <div class="grid" style="width: {boxSize}px; height: {boxSize / 2}px;">
      {#each data.filter(a => a["Movie ID"] === 37) as actor, i}
        <div
          role="button"
          tabindex="0"
          class="actor-square {actor["Background Match?"] === 'Y' ? 'match' : 'no-match'}"
          style="
            width: {squareSize}px;
            height: {squareSize}px;
            top: {Math.floor(i / 4) * (squareSize + gap)}px;
            left: {(i % 4) * (squareSize + gap)}px;
          "
          on:mouseenter={(e) => showTooltip(e, actor)}
          on:mouseleave={hideTooltip}
        ></div>
      {/each}
    </div>
  </div>
  {/if}

  {#if value == (2) | value == 3}

 <div class="movies-grid">
    {#each movies as movie, i}
      <div class="movie-box" style="width: {boxSize}px; height: {150}px;">
        <div class="title" style="text-align: left; width: 100%;">{formatTitle(movie.name)}</div>
        <div class="grid" style="width: {boxSize}px;">
          {#each movie.actors as actor, j}
            <div
              role="button"
              tabindex="0"
              class="actor-square {actor["Background Match?"] === 'Y' ? 'match' : 'no-match'}"
              style="
                width: {squareSize}px;
                height: {squareSize}px;
                top: {Math.floor(j / 4) * (squareSize + gap)}px;
                left: {(j % 4) * (squareSize + gap)}px;
              "
              on:mouseenter={(e) => showTooltip(e, actor)}
              on:mouseleave={hideTooltip}
            ></div>
          {/each}
        </div>
        </div>
    {/each}
</div>
    {/if}

    {#if value == (4) || value == 5}
    <div class="movies-grid large-grid">
      {#each allMovies as movie, i}
        <div class="movie-box" style="width: {boxSize}px; height: {150}px;">
          <div class="grid" style="width: {boxSize}px;">
            {#each movie.actors as actor, j}
              <div
                role="button"
                tabindex="0"
                class="actor-square {actor["Background Match?"] === 'Y' ? 'match' : 'no-match'}"
                style="
                  width: {squareSize / 2}px;
                  height: {squareSize / 2}px;
                  top: {Math.floor(j / 4) * (squareSize / 2 + gap)}px;
                  left: {(j % 4) * (squareSize / 2 + gap)}px;
                "
                on:mouseenter={(e) => showTooltip(e, actor)}
                on:mouseleave={hideTooltip}
              ></div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  {/if}


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
  
  <div
  class="tooltip {tooltip.visible ? 'visible' : ''}"
  style="top: {tooltip.y}px; left: {tooltip.x}px;"
>
  {tooltip.text}
</div>
  
  <style>
    .grid-container {
      display: grid;
      grid-template-columns: repeat(10, 1fr); /* Adjusted to 10 columns */
      gap: 1px; /* No padding */
    }
    .movies-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: repeat(4, auto);
      gap: 10px 20px;
      justify-content: center;
    }

    .movie-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      animation: fadeIn 0.5s ease-in;
    }
  
    .title {
      font-size: 1rem;
      margin-bottom: 10px;
      text-align: center;
    }
  
    .grid {
      display: flex;
      flex-wrap: wrap;
      position: relative;
    }

    .square {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--square-size, 10px);
      height: var(--square-size, 10px);
      /*border: 1px solid darkgreen; Add thin dark green border */
      color: var(--square-color, red); /* Match text color to background */

      cursor: pointer;
      position: relative;
      background-color: var(--square-color, red);
      transition: background-color 0.3s ease;
    }

    .square.transparent {
      background-color: transparent;
      border: 1px solid transparent;
      pointer-events: none; /* Disable hover and click */
    }

    .square.placeholder {
      background-color: transparent;
      border: none;
    }

    .square[data-hovered="true"] {
      background-color: var(--hover-color, darkred) !important;
      color: var(--hover-color, darkred); /* Match text color to hover color */
    }

    .square[data-movie="true"] {
      --square-color: green;
      --hover-color: darkgreen;
    }
  
    .actor-square {
      position: absolute;
      transition: background-color 0.3s;
    }
  
    .match {
      background-color: #007bff;
    }
  
    .no-match {
      background-color: #ffd700;
    }
  
    .actor-square:hover {
      filter: brightness(80%);
    }
  
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

    .tooltip3 {
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

    .tooltip3.visible {
      display: block;
    }

    .large-grid {
      grid-template-columns: repeat(10, 1fr);
      grid-template-rows: repeat(7, auto);
    }
  
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  </style>
  