<script>
    export let text;
</script>

  <div class="textContainer">
    <h2>{text}</h2>
  </div>

<style>
  /* Centering the wrapper in the middle of the page */
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
  }

  .textContainer {
    width: 600px;
    margin: 0 auto;
    overflow-wrap: break-word;
    text-align: justify; /* Optional: To center the text inside */
  }
  
</style>
