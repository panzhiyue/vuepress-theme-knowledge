<style scoped>
  main {
    width: 289px; height: 289px;
    margin: 80px auto;
    font-size: 12px;
  }
  main svg {
    overflow: visible;
    animation: circular-text-rotate 5s linear paused infinite;
  }
  main svg:hover {
    animation-play-state: running;
  }
  main path {
    fill: none;
  }
  main text {
    fill: #b4a078;
  }
  @keyframes circular-text-rotate {
    to {
      transform: rotate(1turn);
    }
  }
</style>
<template>
  <main>
    <svg viewBox="0 0 100 100">
        <path d="M 0,50 a 50,50 0 1,1 0,1 z" id="circle" />
        <text>
          <textPath xlink:href="#circle">
            You-need-to-know-css-tricks-You-need-to-know-css-tricks-You-
          </textPath>
        </text>
    </svg>
  </main>
</template>
<script>
</script>