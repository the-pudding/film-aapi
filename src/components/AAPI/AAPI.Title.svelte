
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
  background: rgba(255, 235, 210, 0.2);  /* Reduced opacity */
  left: 48%;
  transform: translateX(-50%) scale(1.3);
  top: 14%;
  width: 35%;
  height: 32%;
  /* Less intense glow */
  box-shadow: 0 0 50px 40px rgba(255, 225, 200, 0.15);
  /* Animation */
  animation: bigFlicker 2s infinite;
  /* Blur effect */
  filter: blur(10px);
  /* Performance */
  will-change: opacity, box-shadow;
  z-index: 2;
}

/* Flicker effect with more subtle brightness changes */
@keyframes bigFlicker {
  0%, 100% { 
    opacity: 0.2; 
    box-shadow: 0 0 50px 40px rgba(255, 220, 190, 0.15);
  }
  20% { 
    opacity: 0.1; 
    box-shadow: 0 0 80px 70px rgba(255, 230, 200, 0.18);
  }
  32% { 
    opacity: 0.25; 
    box-shadow: 0 0 80px 70px rgba(255, 240, 210, 0.2);
  }
  50% { 
    opacity: 0.3; /* Reduced from 0.5 */
    box-shadow: 0 0 80px 70px rgba(255, 245, 220, 0.22);
  }
  62% { 
    opacity: 0.15; 
    box-shadow: 0 0 80px 70px rgba(255, 235, 205, 0.2);
  }
  68% { 
    opacity: 0.25; /* Reduced from 0.4 */
    box-shadow: 0 0 80px 70px rgba(255, 240, 215, 0.22);
  }
  75% { 
    opacity: 0.1; 
    box-shadow: 0 0 40px 30px rgba(255, 225, 195, 0.15);
  }
  81% { 
    opacity: 0.18; 
    box-shadow: 0 0 40px 30px rgba(255, 230, 200, 0.17);
  }
  95% { 
    opacity: 0.08; 
    box-shadow: 0 0 40px 30px rgba(255, 220, 190, 0.12);
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
  font-size: 1.1rem;
  line-height: 1.4rem;
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
       by <a href="#">Dorothy Lu</a> and <a href="#">Anna Li</a>
     </div>
   </span>
 </div>
 <div class="floor"></div>
 <div class="lead-image-container">

  <img class="lead-image" src="assets/images/comic/comic-header.png" alt="Title Picture" />
  <div class="flashingLight">
  </div>
</div>
</div>
