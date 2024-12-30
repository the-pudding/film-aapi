<script>
    /************************************************************
     * 1. Imports and Data Setup
     ************************************************************/
    import Scrolly from "$components/helpers/Scrolly.svelte"; 
    import tier1_all from "$data/tier1_all.json"; // Contains box office info
    import tier2_all from "$data/tier2_all.json"; // Contains details for tier2 movies
  
    export let texts;  // From your scrolly, the text content
    export let value = 0; // The scrolly index to control views
  
    import { onMount } from "svelte"; // If needed for data processing
    import { scaleLinear } from "d3-scale";
    import { group } from "d3-array";
  
    // Device breakpoints (phone, tablet, desktop)
    const PHONE_MAX_WIDTH = 600;
    const TABLET_MAX_WIDTH = 1024;
    // Desktop is anything above that
  
    /************************************************************
     * 2. Variables for Layout
     ************************************************************/
    let width = 1200;   // Bound from container
    let height = 800;   // Bound from container
  
    let dotRadius = width / 100;           // Circle size for silhouettes
    let verticalSpacing = dotRadius * 2 + 5;

    let xScale = scaleLinear()
        .domain([0, 10])     // For the silhouette columns if you want, 
        .range([0, width]);  // We'll not rely on year now for the new grid approach
    
  
    /************************************************************
     * 3. Dictionaries for Data
     ************************************************************/
    // We'll keep a dictionary for each movie:
    //   {
    //     [movieName]: {
    //       boxOffice: number,
    //       actors: [
    //         { 
    //           actorName, 
    //           matchCount, 
    //           characterEthnicity, 
    //           actorEthnicity 
    //         }, ...
    //       ],
    //       accuracy: 0.0 (percentage from 0 to 1)
    //       totalActors: number
    //     },
    //     ...
    //   }
    let movieDict = {};
  
    /************************************************************
     * 4. Functions to Build Out Data
     ************************************************************/
    // Helper to get box office from tier1_all.json by media name
    function getBoxOffice(movieName) {
      // Find the entry in tier1_all that matches the movie name
      // (assuming the field is exactly "Movie")
      // If not found, return 0 or undefined
      let entry = tier1_all.find((d) => d.Movie === movieName);
      return entry ? entry.bo_revenue : 0;
    }
  
    // Build dictionary of all tier2 movies with box office and actor info
    function createMovieDictionary() {
      const groupedDataByMovie = group(tier2_all, (d) => d["Media"]);
      const movies = Array.from(groupedDataByMovie.keys());
  
      let newDict = {};
      movies.forEach((movieName) => {
        // box office from tier1
        let bo = getBoxOffice(movieName);
  
        // get all actors
        let actors = [];
        let arr = groupedDataByMovie.get(movieName) || [];
        arr.forEach((actorObj) => {
          actors.push({
            actorName: actorObj["Actor"],
            matchCount: actorObj["Match.Count"],
            characterEthnicity: actorObj["Character.Ethnicity..Cleaned."],
            actorEthnicity: actorObj["Actor.Ethnicity..Cleaned."]
          });
        });
  
        // Calculate accuracy
        let total = actors.length;
        let accurate = actors.filter(a => a.matchCount === 1).length;
        let accuracy = total === 0 ? 0 : accurate / total;
  
        newDict[movieName] = {
          boxOffice: bo,
          actors: actors,
          accuracy: accuracy,
          totalActors: total
        };
      });
      return newDict;
    }
  
    /************************************************************
     * 5. Sorting (Placeholder)
     ************************************************************/
    // We'll define a function to sort the movie keys based on your logic:
    // 1) accuracy, 2) number of actors, 3) box office
    // (You can invert some or all of these if you want highest to lowest.)
    function sortMovies(movieKeys) {
      movieKeys.sort((a, b) => {
        let A = movieDict[a];
        let B = movieDict[b];
  
        // sort by accuracy ascending
        if (A.accuracy !== B.accuracy) {
          return A.accuracy - B.accuracy;
        }
        // then by number of actors ascending
        if (A.totalActors !== B.totalActors) {
          return A.totalActors - B.totalActors;
        }
        // then by box office ascending
        return A.boxOffice - B.boxOffice;
      });
      return movieKeys;
    }
  
    /************************************************************
     * 6. Reactive Variables
     ************************************************************/
    // Rebuild data dict on mount or if data changes
    onMount(() => {
      movieDict = createMovieDictionary();
    });
  
    // Whenever width or height changes, recalc dot radius, etc.
    $: {
      dotRadius = width / 100;
      verticalSpacing = dotRadius * 2 + 5;
      xScale = scaleLinear()
        .domain([0, 10])     // For the silhouette columns if you want, 
        .range([0, width]);  // We'll not rely on year now for the new grid approach
    }
  
    /************************************************************
     * 7. Grid Layout Helpers
     ************************************************************/
    // Determine columns based on breakpoints
    function getColumns() {
      if (width <= PHONE_MAX_WIDTH) {
        return 4; // phone
      } else if (width <= TABLET_MAX_WIDTH) {
        return 6; // tablet
      } else {
        return 10; // desktop
      }
    }
  
    function getGridPosition(index, colCount) {
      // index is which movie in the sorted list
      // colCount is how many columns
      // row = Math.floor(index / colCount)
      // col = index % colCount
      let row = Math.floor(index / colCount);
      let col = index % colCount;
  
      // We'll define a small margin
      let margin = 20;
      let gridWidth = width - margin * 2;
      let gridHeight = height - margin * 2;
  
      // cell size
      let cellWidth = gridWidth / colCount;
      let rowCount = Math.ceil(Object.keys(movieDict).length / colCount);
      let cellHeight = gridHeight / rowCount;
  
      return {
        x: margin + col * cellWidth,
        y: margin + row * cellHeight,
        cellWidth: cellWidth,
        cellHeight: cellHeight
      };
    }
  </script>
  
  <section class="scrolly-section">
    <div
      class="visualContainer"
      bind:clientWidth={width}
      bind:clientHeight={height}
      style="position: relative; overflow: hidden;"
    >
      <!-- We'll reset counters if needed -->
      <!-- Build the sorted list of movies: -->
	  {#if value >= 0}
      {#each sortMovies(Object.keys(movieDict)) as movieName, index}
        <!-- Determine the box position -->
        {#each [getGridPosition(index, getColumns())] as pos}
          <!-- Each movie's container -->
          <div
            class="movieBox"
            style="
              position: absolute;
              left: {pos.x}px;
              top: {pos.y}px;
              width: {pos.cellWidth}px;
              height: {pos.cellHeight}px;
              background-color: white;
              border: 1px solid #ccc;
              box-sizing: border-box;
              overflow: hidden;
            "
          >
            <!-- We'll display silhouettes here -->
            {#each movieDict[movieName].actors as actor, j}
              <div
                style="
                  position: absolute;
                  left: {(j % 5) * (dotRadius * 2 + 5)}px;
                  top: {Math.floor(j / 5) * (dotRadius * 2 + 5)}px;
                  width: {dotRadius * 2}px;
                  height: {dotRadius * 2}px;
                  border-radius: 50%;
                  background-color: {actor.matchCount === 1 ? 'darkblue' : 'yellow'};
                "
                title="Actor: {actor.actorName}, matchCount: {actor.matchCount}"
              ></div>
            {/each}
            <!-- Optionally place the movie name below silhouettes -->
            <div
              style="
                position: absolute;
                bottom: 0px;
                width: 100%;
                text-align: center;
                font-size: 0.8rem;
                background-color: rgba(0,0,0,0.1);
              "
            >
              {movieName}
            </div>
          </div>
        {/each}
      {/each}
    {/if}
    
    </div>
  
    <!-- The scrolly portion for text overlay -->
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
      background: #f9f9f9;
    }
    .movieBox {
      background-color: #eee;
      border: 1px solid #ccc;
      position: absolute;
    }
  </style>
  