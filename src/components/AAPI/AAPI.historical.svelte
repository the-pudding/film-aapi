<script>
    import charlieChan from "$svg/illustrations/charlie-chan.png";
    import theGoodEarth from "$svg/illustrations/the-good-earth.png";
    import fuManchu from "$svg/illustrations/fu-manchu.png";
  </script>
  
  <div class="image-container">
    <figure>
      <img src={charlieChan} alt="Charlie Chan">
      <figcaption>Warner Oland as Charlie Chan (16 films)</figcaption>
      </figure>
    <figure>
        <img src={fuManchu} alt="Fu Manchu">
        <figcaption>Christopher Lee in <i>The Face of Fu Manchu (1965)</i></figcaption>
      </figure>
    <figure>
      <img src={theGoodEarth} alt="The Good Earth">
      <figcaption><i>The Good Earth (1987)</i> with Paul Muni & Luise Rainer</figcaption>
    </figure>

  </div>
  
  <style>
      figure {
         margin: 0 auto;
    }

    .image-container {
      display: flex;
      flex-wrap: wrap; /* Allows wrapping on smaller screens */
      max-width: 600px;  /* Limits the content width */
      margin: 0 auto;    /* Centers the container */
      gap: 30px;
      padding: 50px;
    }
  
    figcaption {
        margin-top: 8px;
        font-size: 12px;
        color:  var(--color-gray-300); /* Slightly muted text */
        font-family: var(--sans); /* Use the font from app.css */
        width: 170px;
  }
  
    @media (max-width: 768px) {
      .image-container {
        flex-direction: column;
        align-items: center;
      }
    }
  </style>
  