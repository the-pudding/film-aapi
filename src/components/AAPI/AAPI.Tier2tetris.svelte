<script>
    import Scrolly from "$components/helpers/Scrolly.svelte";
    import { onMount } from "svelte";
    import data from "$data/Tier2b_all.json";

    let value = 0;
    export let texts;
  
    let actors = [];
    let width, height;
    let squareSize;
    let hoveredMovieId = null; // Track the hovered movie ID
    let tooltip = { visible: false, x: 0, y: 0, text: "" }; // Tooltip state
  
    // Responsive square size based on client width
    $: squareSize = width ? width / 100 : 10;
  
    // Prepare the data
    onMount(() => {
      actors = data.map((actor, index) => ({
        ...actor,
        originalIndex: index
      }));
    });

    function showTooltip(actor, event) {
      if (actor.Media === '') return; // Skip tooltip for transparent boxes
    //   hoveredMovieId = actor["Movie ID"];
    //   const associatedActors = actors.filter(a => a["Movie ID"] === actor["Movie ID"]).map(a => a.Actor);
    //   tooltip = {
    //     visible: true,
    //     x: event.clientX + 10,
    //     y: event.clientY + 10,
    //     text: ${actor.Media} (${actor["Release Year"]})\nActors: ${associatedActors.join(", ")}
    //   };
    }

    function hideTooltip() {
      hoveredMovieId = null;
      tooltip.visible = false;
    }

    function getSnakedRows(actors, columns) {
      return actors.reduce((rows, actor, index) => {
        const rowIndex = Math.floor(index / columns);
        if (!rows[rowIndex]) rows[rowIndex] = [];
        rows[rowIndex].push(actor);
        return rows;
      }, []).map((row, i) => (i % 2 === 0 ? row : row.reverse())).flat();
    }

    $: snakedActors = getSnakedRows(actors, 10); // Adjusted to 10 columns
  </script>
  
  <style>
    .grid-container {
      display: grid;
      grid-template-columns: repeat(10, 1fr); /* Adjusted to 10 columns */
      gap: 1px; /* No padding */
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
    <div class="visualContainer" bind:clientWidth={width} bind:clientHeight={height}>
      <div
        class="grid-container"
        style="--square-size: ${squareSize}px"
      >
        {#each snakedActors as actor (actor?.["Actor ID"] || Math.random()) }
          {#if actor}
            <div
              class="square {actor.Media === '' ? 'transparent' : ''}"
              role="button"
              tabindex="0"
              aria-label="Actor ID {actor['Actor ID']}. Movie: {actor.Media}"
              data-movie={actor["Background Match?"] === "Y"}
              data-hovered={actor["Movie ID"] === hoveredMovieId}
              data-actor={actor["Actor ID"]}
              style = "
                  width: {squareSize*2}px;
		            height: {squareSize*2}px;
              "
              on:mouseenter={(e) => { if (actor.Media !== '') showTooltip(actor, e); }}
              on:mouseleave={(e) => { if (actor.Media !== '') hideTooltip(); }}
            >
            </div>
          {/if}
        {/each}
      </div>
    </div>

    <div
      class="tooltip {tooltip.visible ? 'visible' : ''}"
      style="top: {tooltip.y}px; left: {tooltip.x}px;"
    >
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