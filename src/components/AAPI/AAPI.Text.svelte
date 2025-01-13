<script>
    export let texts;
</script>

<div class="wrapper">
  <div class="textContainer">
    {#each texts.split(/\r?\n+/) as text, i}
    <p>{text}</p>
    {/each}
  </div>
</div>

<style>
  /* Centering the wrapper in the middle of the page */
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Full viewport height */
    margin: 0;
  }

  .textContainer {
    width: 500px;
    overflow-wrap: break-word;
    text-align: justify; /* Optional: To center the text inside */
  }
</style>
