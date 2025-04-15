<script>
  export let title, subtitle, url, alt, caption, urlmobile;
</script>

<div class="image-container">
  <figure>
    {#if title}
    <h2 class ="title">{@html title}</h2>
    {/if}
    {#if subtitle}
    <h3 class ="subtitle">{@html subtitle}</h3>
    {/if}
    <img class="desktop" src="{url}" alt="{alt}">
    {#if urlmobile}
    <img class="mobile" src="{urlmobile}" alt="{alt}">
    {/if}
    <figcaption>{@html caption}</figcaption>
  </figure>
</div>
<style>
  figure {
    margin: 30px 0;
  }
 .image-container {
  display: block;
  flex-wrap: wrap; /* Allows wrapping on smaller screens */
  margin: 0 auto;    /* Centers the container */
  width: 100%;
  max-width:  600px;
  color: white;
}
.image-container .mobile {
  display: none;
}
 .image-container img {
  margin: 20px 0;
 }
@media (max-width: 768px) {
  .image-container {
    flex-direction: column;
    align-items: center;
  }
}
@media (max-width: 450px) {
  .image-container .mobile {
   display: block;
  }
  .image-container .desktop {
   display: none;
  }
}

</style>
