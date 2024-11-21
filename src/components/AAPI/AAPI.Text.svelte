<script>
    export let texts;
</script>

<div class="textContainer">
    {#each texts.split(/\r?\n+/) as text, i}
    <p>{text}</p>
    {/each}
</div>

<style>
  
</style>
