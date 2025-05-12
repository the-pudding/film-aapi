
<style>
  .title-wrapper {
   display: block;
   margin: 100px auto 20px;
   color: #4e1488;
   position: relative;
/*    max-width: 600px; */
width: 100%;
}

/* Title layout (image on left, text on right) */
.title {
  width: 95%;
  font-size: 50px;
  line-height: 56px;
  font-weight: bold;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  text-transform: uppercase;
  color: #edd9ff;
/*   font-family: var(--sans); */
}

/* Adjust text position slightly upward */
.text {
  text-align: left;
  line-height: 1;
  position: relative;
  top: -0.5em; /* Moves text up */
}

/* Image Box */
/* .image-box {
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
 */
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
.lead-image-container {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  width: 98%;
  z-index: 99;
}
.lead-image {
  width: 100%;
}
.flashingLight {
  position: absolute;
  /* Warmer light color with higher opacity for stronger central light */
  background: radial-gradient(
    circle,
    rgba(255, 220, 180, 0.8) 0%,
    rgba(255, 200, 150, 0.4) 30%,
    rgba(255, 180, 120, 0.1) 70%
  );
  left: 47%;
  transform: translateX(-50%);
  top: 16%;
  width: 33%;
  height: 25%;
  /* More dramatic glow with layered shadows for depth */
  box-shadow: 
    0 0 30px 20px rgba(255, 220, 180, 0.7),
    0 0 70px 50px rgba(255, 180, 120, 0.3),
    0 0 120px 80px rgba(255, 150, 100, 0.1);
  /* More realistic flickering animation */
  animation: lightFlicker 20s infinite alternate;
  /* Softer blur for a more natural light source */
  filter: blur(40px);
  /* Performance optimization */
  will-change: opacity, box-shadow;
  z-index: 2;
}

/* More complex flickering animation */
@keyframes lightFlicker {
  0%, 10%, 15%, 20%, 25%, 30%, 35%, 40%, 45%, 50%, 55%, 60%, 65%, 70%, 75%, 80%, 85%, 90%, 95%, 100% {
    opacity: 0.6;
    box-shadow: 
      0 0 30px 20px rgba(255, 220, 180, 0.7),
      0 0 70px 50px rgba(255, 180, 120, 0.3),
      0 0 120px 80px rgba(255, 150, 100, 0.1);
  }
  5%, 13%, 23%, 28%, 33%, 38%, 43%, 48%, 53%, 58%, 63%, 68%, 73%, 78%, 83%, 88%, 93%, 98% {
    opacity: 0.1;
    box-shadow: 
      0 0 25px 15px rgba(255, 220, 180, 0.5),
      0 0 60px 40px rgba(255, 180, 120, 0.2),
      0 0 100px 70px rgba(255, 150, 100, 0.05);
  }
}


.dustParticles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 3;
  opacity: 0.7;
  
  /* Better dust particle effect using multiple background images */
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0.5px, transparent 2px),
    radial-gradient(circle at 50% 70%, rgba(255, 255, 255, 0.08) .5px, transparent 2px),
    radial-gradient(circle at 80% 10%, rgba(255, 255, 255, 0.06) .5px, transparent 2px),
    radial-gradient(circle at 10% 90%, rgba(255, 255, 255, 0.07) .5px, transparent 2px),
    radial-gradient(circle at 40% 50%, rgba(255, 255, 255, 0.05) .5px, transparent 2px),
    radial-gradient(circle at 70% 60%, rgba(255, 255, 255, 0.09) .5px, transparent 2px);
  
  /* Larger, more varied background size for more natural look */
  background-size: 
    100px 100px,
    150px 150px,
    120px 120px,
    200px 200px,
    180px 180px,
    130px 130px;
  
  /* Staggered initial positions */
  background-position: 
    0px 0px,
    20px 30px,
    50px 10px,
    10px 40px,
    30px 80px,
    70px 60px;
  
  /* Smoother animation with longer duration */
  animation: floatingDust 40s infinite linear;
}

@keyframes floatingDust {
  to {
    background-position: 
      100px 100px,
      150px 180px,
      120px 130px,
      200px 240px,
      180px 260px,
      130px 190px;
  }
}
/* Credits Section */
.credits {
  font-size: 1.2rem;
  color: #edd9ff;
  text-align: center;
  width: 100%;
  display: block;
  font-weight: bold;
  margin-top: 20px;
}

.credits a {
  text-decoration: none;
  color: #ae7ec2;
}

.credits a:hover {
  text-decoration: underline;
}

/* 📱 MOBILE RESPONSIVENESS (When screen width is ≤ 768px) */
@media (max-width: 1000px) {
 .title {
  font-size: 40px;
  line-height: 46px;
}
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
 .title {
  font-size: 30px;
  line-height: 36px;
}
.subhed, .credits {
  font-size: 1rem;
  line-height: 1.3rem;
}
}
.floor {
  position: absolute;
  left: 0;
  width: 100%;
  height: 13%;
  bottom: 0px;
  background:  rgba(0,0,0,0.2);
}
</style>

<div class="title-wrapper">
  <!-- Title section -->
  <div class="title">
    <!-- Image on the left -->
<!--     <div class="image-box">
      <img src="assets/images/title-picture.png" alt="Title Picture" />
    </div> -->


    <!-- Title text slightly moved up -->
    <span class="text">
     <!--  <div class = "title-text"> 
        asian <br />
        <span class="mis">mis </span>representation 
      </div> -->
      <div class="title">How accurately cast are Asian American actors in Hollywood?</div>
      <!-- Credits section -->
      <div class="credits">
       Data and script by <a href="#">Dorothy Lu</a><br>Illustrations and development by <a href="#">Anna Li</a>
     </div>
   </span>
 </div>
 <div class="floor"></div>
 <div class="lead-image-container">

  <img class="lead-image" src="assets/images/comic/comic-header.png" alt="Title Picture" />
  <div class="flashingLight">
  </div>
  
</div>
<div class="dustParticles"></div>
</div>
