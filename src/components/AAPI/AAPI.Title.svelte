<script>
    let imageUrl = "/assets/images/title-picture.png";
  </script>
  
  <style>
    .title-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #4e1488; /* Match the text color */
      padding-bottom: 10rem;
    }
  
    /* Wrapper for title & credits */
    .title-wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start; /* Align everything to the left */
    }
  
    /* Title layout (image on left, text on right) */
    .title {
      display: flex;
      flex-direction: row; /* Image on the left, text on the right */
      align-items: center; /* Vertically centers items */
      gap: 1rem; /* Space between image and text */
      font-size: 4rem;
      font-weight: bold;
    }
  
    /* Adjust text position slightly upward */
    .text {
      text-align: left;
      line-height: 1.2;
      position: relative;
      top: -0.5em; /* Moves text up */
    }
  
    /* Image Box */
    .image-box {
      width: 140px;
      height: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 0.5em;
      margin-bottom: 1.2em;
    }
  
    .image-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  
    /* Styling for "mis" */
    .mis {
      color: #a08ece; /* Lighter shade for "mis" */
    }

    .title-text {
  font-size: inherit; /* inherits from .text (4rem) */
    }

    .byline {
      font-size: 1rem;
      margin-top: 1rem;
      color: #4e1488;
      font-weight: normal;
    }
  
    /* Credits Section */
    .credits {
      font-size: 0.9rem;
      color: #461c64;
      text-align: left; /* Ensures text aligns left */
      margin-left: 13em;
    }
  
    .credits a {
      text-decoration: none;
      color: #9367d0;
    }
  
    .credits a:hover {
      text-decoration: underline;
    }
  
    /* 📱 MOBILE RESPONSIVENESS (When screen width is ≤ 768px) */
    @media (max-width: 768px) {
      .title {
        font-size: 2rem; /* Halve the title font size */
        gap: 0.5rem; /* Reduce spacing */
        flex-direction: column; /* Stack image on top of text */
        align-items: center; /* Center everything horizontally */
        text-align: center; /* Center text underneath image */
      }
  
      .text {
        top: -0.5em; /* Adjust position */
        text-align: center;
      }
  
      .image-box {
        width: 200px; /* Halve the image size */
        height: 200px;
      }
  
      .credits {
        font-size: 0.6rem; /* Halve the credits font size */
        margin-left: 10em;
      }
    }
  </style>
  
  <div class="title-container">
    <div class="title-wrapper">
      <!-- Title section -->
      <div class="title">
        <!-- Image on the left -->
        <div class="image-box">
          <img src={imageUrl} alt="Title Picture" />
        </div>
  
        <!-- Title text slightly moved up -->
        <span class="text">
          <div class = "title-text"> 
          asian <br />
          <span class="mis">mis </span>representation 
        </div>
        <div class="byline"> <i>An exploration of casting accuracy in the past 42 years of Asian Americans in film.</i></div>
        </span>
      </div>
  
      <!-- Credits section -->
      <div class="credits">
        Data & Storytelling by <a href="#">Dorothy Lu</a><br />
        Visuals & Development by <a href="#">Anna Li</a><br />
        Support from <a href="#">Alvin Chang </a>
      </div>
    </div>
  </div>
  