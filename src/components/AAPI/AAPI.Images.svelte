<script>
  export let title, subtitle, url, alt, caption;
</script>

<div class="image-container">
  <figure>
    {#if title}
    <h2 class ="title">{@html title}</h2>
    {/if}
    {#if subtitle}
    <h3 class ="subtitle">{@html subtitle}</h3>
    {/if}
    <img src="{url}" alt="{alt}">
    <figcaption>{@html caption}</figcaption>
  </figure>
</div>
<style>
 .image-container {
  display: block;
  flex-wrap: wrap; /* Allows wrapping on smaller screens */
  margin: 0 auto;    /* Centers the container */
  padding-bottom: 30px;
  width: 620px;
  max-width: 100%;
  color: white;
}

@media (max-width: 768px) {
  .image-container {
    flex-direction: column;
    align-items: center;
  }
}

</style>
