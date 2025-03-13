<script>


  </script>
  
  <div class="image-container">
    <figure>
      <img src="assets/images/charlie-chan.png" alt="Charlie Chan">
      <figcaption>Warner Oland as Charlie Chan (16 films)</figcaption>
      </figure>
    <figure>
        <img src="assets/images/fu-manchu.png" alt="Fu Manchu">
        <figcaption>Christopher Lee in <i>The Face of Fu Manchu (1965)</i></figcaption>
      </figure>
    <figure>
      <img src="assets/images/the-good-earth.png" alt="The Good Earth">
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
        color:  white;
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
  