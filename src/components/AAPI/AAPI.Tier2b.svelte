<script>
  import Scrolly from "$components/helpers/Scrolly.svelte";
  import { onMount } from "svelte";
  import data from "$data/Tier2b_all.json";

  let value = 0;
  export let texts;

  let groupedMovies = {}; // Object to store actors grouped by Movie ID
  let width, height;
  let squareSize = 20;

  // Responsive square size
  $: squareSize = width ? width / 50 : 25;

  // Group actors by Movie ID
  onMount(() => {
    groupedMovies = data.reduce((acc, actor) => {
      let movieId = actor["Movie ID"];
      if (!acc[movieId]) acc[movieId] = [];
      acc[movieId].push(actor);
      return acc;
    }, {});
  });
</script>

<style>
  .movie-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px; /* Base gap between movies */
    justify-content: left; /* Ensure movies span the full width */
    align-items: flex-start;
    max-width: 40vw;
    margin: 0 auto;
  }

  .movie-group {
    display: flex;
    flex-wrap: wrap;
    gap: 1px; /* Small gap between actors in the same movie */
    align-items: center;
  }

  .square {
    background-color: var(--square-color, #ffd700);
    transition: background-color 0.3s ease;
    border-radius: 10%;
  }

  .square[data-movie="true"] {
    --square-color: #007bff;
  }
</style>



<section class="scrolly-section">
  <div class="visualContainer">
    <div class="movie-container" style="--square-size: {squareSize * 2}px;">
      {#each Object.entries(groupedMovies) as [movieId, actors]}
        <div class="movie-group">
          {#each actors as actor}
            <div
              class="square"
              data-movie={actor["Background Match?"] === "Y"}
              style="width: {squareSize}px; height: {squareSize}px;"
            >
            </div>
          {/each}
        </div>
      {/each}
    </div>
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
