<script>
    import { scaleLinear } from "d3-scale";
    import Scrolly from "$components/helpers/Scrolly.svelte"; 
    import tier1_all from "$data/tier1_all.json"; 
    import tier2_all from "$data/tier2_all.json";
  
    export let texts;
    export let value = 0;
  
    import { onMount } from "svelte";
    import { group } from "d3-array";
  
    let width = 1200;
    let height = 800;
    let dotRadius = width / 200;
    const COLUMN_COUNT = 4;
    const MAX_MOVIES = 20; // Limit to top 20 movies
  
    let movieDict = {};
    let xScale = scaleLinear().domain([0, 10]).range([0, width]);
  
    function getBoxOffice(movieName) {
      let entry = tier1_all.find((d) => d.Movie === movieName);
      return entry ? entry.bo_revenue : 0;
    }
  
    function createMovieDictionary() {
      const groupedDataByMovie = group(tier2_all, (d) => d["Media"]);
      const movies = Array.from(groupedDataByMovie.keys());
  
      let newDict = {};
      movies.forEach((movieName) => {
        let bo = getBoxOffice(movieName);
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
  
        let total = actors.length;
  
        newDict[movieName] = {
          boxOffice: bo,
          actors: actors,
          totalActors: total
        };
      });
      return newDict;
    }
  
    function sortMovies(movieKeys) {
      // Step 1: Get the top 20 movies by box office revenue
      let topMovies = movieKeys
        .sort((a, b) => {
          let A = movieDict[a];
          let B = movieDict[b];
          return B.boxOffice - A.boxOffice; // Descending order by box office revenue
        })
        .slice(0, MAX_MOVIES); // Keep only the top 20 movies
  
      // Step 2: Sort these top 20 movies by number of actors
      return topMovies.sort((a, b) => {
        let A = movieDict[a];
        let B = movieDict[b];
        return B.totalActors - A.totalActors; // Descending order by number of actors
      });
    }
  
    function getGridPosition(index) {
      const margin = 20;
      const gridWidth = width - margin * 2;
      const cellWidth = gridWidth / COLUMN_COUNT;
  
      return {
        x: margin + (index % COLUMN_COUNT) * cellWidth,
        y: margin + Math.floor(index / COLUMN_COUNT) * (dotRadius * 8), // Adjust row height
        cellWidth: cellWidth,
        cellHeight: dotRadius * 8 // Fixed height proportional to dot size
      };
    }
  
    onMount(() => {
      movieDict = createMovieDictionary();
    });
  </script>
  
  <section
    class="scrolly-section"
    style="min-height: 100vh; overflow-y: auto;"
  >
    <div
      class="visualContainer"
      bind:clientWidth={width}
      bind:clientHeight={height}
      style="position: relative; overflow: visible;"
    >
      {#if movieDict}
        {#each sortMovies(Object.keys(movieDict)) as movieName, index}
          {#each [getGridPosition(index)] as pos}
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
              {#each movieDict[movieName].actors as actor, j}
                <div
                  style="
                    position: absolute;
                    left: {(j % 5) * (dotRadius * 2 + 5)}px;
                    top: {Math.floor(j / 5) * (dotRadius * 2 + 5)}px;
                    width: {10}px;
                    height: {dotRadius * 2}px;
                    border-radius: 50%;
                    background-color: {actor.matchCount === 1 ? 'darkblue' : 'yellow'};
                  "
                  title="Actor: {actor.actorName}, matchCount: {actor.matchCount}"
                ></div>
              {/each}
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
    .scrolly-section {
      position: relative;
    }
  
    .visualContainer {
      position: relative;
    }
  
    .movieBox {
      background-color: #eee;
      border: 1px solid #ccc;
      position: absolute;
    }
  </style>
  