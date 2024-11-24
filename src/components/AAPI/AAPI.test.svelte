<script>
    import Scrolly from "$components/helpers/Scrolly.svelte";
    let value = 0; // Controlled by Scrolly
    export let texts;
  
    import { scaleLinear } from "d3-scale";
    import { max, group } from "d3-array";
  
    // Import data
    import data from "$data/tier2_all.json";
  
    // Group data by Movie
    const groupedDataByMovie = group(data, (d) => d["Media"]);
    const years = Array.from(
      new Set(data.map((d) => d["Release.Year"]))
    ).sort((a, b) => a - b);
  
    // Chart dimensions
    const width = 800; // Chart width
    const dotRadius = width / 100; // Size of the dots
    const verticalSpacing = dotRadius * 2 + 5; // Space between dots
    const groupSpacing = 0; // Space between movie groups
  
    // X Scale
    const xScale = scaleLinear()
      .domain([Math.min(...years), Math.max(...years)])
      .range([50, width - 50]);
  
    // Calculate total height dynamically based on groups
    const containerHeight =
      Array.from(groupedDataByMovie.values()).length *
      (max(groupedDataByMovie, (actors) => actors.length) * verticalSpacing +
        groupSpacing);
  </script>
  
  <section class="scrolly-section">
    <div class="visualContainer" style="height: {containerHeight}px;">
      <!-- Render ovals for each movie -->
      {#each Array.from(groupedDataByMovie.entries()) as [movie, actors]}
        <div
          class="movie-oval"
          style="
            --cx: {(Math.min(...actors.map(a => xScale(a['Release.Year']))) + Math.max(...actors.map(a => xScale(a['Release.Year'])))) / 2}px;
            --cy: {actors.length * verticalSpacing + groupSpacing + (actors.length * verticalSpacing) / 2}px;
            --rx: {(Math.max(...actors.map(a => xScale(a['Release.Year']))) - Math.min(...actors.map(a => xScale(a['Release.Year'])))) / 2}px;
            --ry: {actors.length * verticalSpacing / 2}px;
          "
          title={movie}
        ></div>
      {/each}
  
      <!-- Render dots -->
      {#each Array.from(groupedDataByMovie.entries()) as [movie, actors]}
        {#each actors as actor, actorIndex}
          <div
            class="dot"
            style="
              --x: {xScale(actor['Release.Year'])}px; 
              --y: {actors.length * verticalSpacing + groupSpacing + actorIndex * verticalSpacing}px; 
              background-color: {value === 1 ? 'grey' : actor['Match.Count'] === 1 ? 'green' : 'red'};
              width: {dotRadius * 2}px; 
              height: {dotRadius * 2}px;"
            title="{actor['Media']}"
          ></div>
        {/each}
      {/each}
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
  <style>
    .visualContainer {
      position: relative;
      width: 100%;
      background: #f9f9f9;
    }
  
    .dot {
      position: absolute;
      top: var(--y);
      left: var(--x);
      border-radius: 50%;
      transition: transform 0.2s, opacity 0.2s;
    }
  
    .dot:hover {
      transform: scale(1.2);
      opacity: 1;
    }
  
    .movie-oval {
      position: absolute;
      top: calc(var(--cy) - var(--ry));
      left: calc(var(--cx) - var(--rx));
      width: calc(var(--rx) * 2);
      height: calc(var(--ry) * 2);
      border: 2px solid rgba(0, 0, 0, 0.3);
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.1);
      pointer-events: none; /* Prevent interactions */
    }
  
    .step {
      height: 100vh;
      padding: 1rem;
    }
  
    .stepText {
      background: white;
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      max-width: 600px;
      margin: 0 auto;
    }
  </style>
  