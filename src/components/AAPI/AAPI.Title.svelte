<script>
    let imageUrl = "/assets/images/title-picture.png";
  </script>
  
  <style>
    .title-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      color: #d4af71; /* Match the text color */
    }
  
    /* Grouping title and credits together for alignment */
    .title-wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start; /* Align everything to the left */
    }
  
    /* Layout for the title */
    .title {
      display: flex;
      flex-direction: row; /* Place image on the left, text on the right */
      align-items: center; /* Align items vertically */
      gap: 1rem; /* Space between image and text */
      font-size: 4rem;
    }
  
    /* Ensures the text aligns left */
    .text {
      text-align: left;
      line-height: 1.2;
      position: relative; 
      top: -0.15em;
    }
  
    /* Image Box */
    .image-box {
      width: 150px;
      height: 150px;
      margin-right: 0.5em;
    }
  
    .image-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  
    /* Styling for "mis" */
    .mis {
      color: #A98A8F; /* Lighter shade for "mis" */
    }
  
    /* Credits Section */
    .credits {
      font-size: 0.9rem;
      margin-top: 1rem; /* Adds slight spacing */
      color: #e5d8b7;
      text-align: left; /* Ensures text is aligned left */
      margin-left: 14em;
    }
  
    .credits a {
      text-decoration: none;
      color: #e5d8b7;
    }
  
    .credits a:hover {
      text-decoration: underline;
    }
  </style>
  
  <div class="title-container">
    <div class="title-wrapper">
      <!-- Title (Image on left, text on right) -->
      <div class="title">
        <div class="image-box">
          <img src={imageUrl} alt="Title Picture" />
        </div>
        <span class="text">
          asian <br />
          <span class="mis">mis </span>representation
        </span>
      </div>
  
      <!-- Left-aligned Credits directly below -->
      <div class="credits">
        Data & Storytelling by <a href="#">Dorothy Lu</a>  |  Visuals & Development by <a href="#">Anna Li</a><br />
        & a big thanks to our mentor <a href="#">Alvin Chang</a>
      </div>
    </div>
  </div>
  