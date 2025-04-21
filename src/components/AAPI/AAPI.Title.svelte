
<style>
  .title-wrapper {
   display: block;
   margin: 0 auto 20px;
   color: #4e1488;
   position: relative;
   max-width: 600px;
   width: 100%;
 }

 /* Title layout (image on left, text on right) */
 .title {
  width: 100%;
  font-size: 3.8em;
  font-weight: bold;
}

/* Adjust text position slightly upward */
.text {
  text-align: left;
  line-height: 1;
  position: relative;
  top: -0.5em; /* Moves text up */
}

/* Image Box */
.image-box {
  position: absolute;
  right: 100%;
  top: -10px;
  margin-right: 20px;
  width: 140px;
  height: 140px;
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

.subhed {
  font-size: 1.2rem;
  line-height: 1.5rem;
  margin-top: 1rem;
  color: #4e1488;
  font-weight: normal;
}

/* Credits Section */
.credits {
  font-size: 1.2rem;
  color: #461c64;
  text-align: left; /* Ensures text aligns left */ 
  width: 100%;
  display: block;
  font-weight: bold;
}

.credits a {
  text-decoration: none;
  color: #9367d0;
}

.credits a:hover {
  text-decoration: underline;
}

/* 📱 MOBILE RESPONSIVENESS (When screen width is ≤ 768px) */
@media (max-width: 1000px) {
  .text {
    text-align: center;
  }
  
  .image-box {
   display: none;
 }

 .credits {
  text-align: center;
}
}
@media (max-width: 768px) {
  .title{
    font-size: 3em;
  }
  .subhed, .credits {
    font-size: 1.1rem;
    line-height: 1.4rem;
  }
}
</style>

<div class="title-wrapper">
  <!-- Title section -->
  <div class="title">
    <!-- Image on the left -->
    <div class="image-box">
      <img src="assets/images/title-picture.png" alt="Title Picture" />
    </div>

    <!-- Title text slightly moved up -->
    <span class="text">
      <div class = "title-text"> 
        asian <br />
        <span class="mis">mis </span>representation 
      </div>
      <div class="subhed">How accurately cast are Asian American actors in Hollywood?</div>
    </span>
  </div>
  
  <!-- Credits section -->
  <div class="credits">
   by <a href="#">Dorothy Lu</a> and <a href="#">Anna Li</a>
   <!--  <div>Data & Storytelling by <a href="#">Dorothy Lu</a></div>
    <div>Visuals & Development by <a href="#">Anna Li</a></div>
    <div>Support from <a href="#">Alvin Chang </a></div> -->
  </div>
</div>
