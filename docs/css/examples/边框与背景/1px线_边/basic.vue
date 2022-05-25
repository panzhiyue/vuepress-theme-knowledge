<style scoped>
  main {
    width: 100%;
    padding: 52px 29px;
    display: flex;
    justify-content: center;
  }
  span.one-pixel-line {
    width: 229px;
    position: relative;
  }
  span.one-pixel-line::after {
    content: '';
    width: 229px;
    position: absolute;
    bottom: 0; left: 0;
    box-shadow: 0 0 0 1px #b4a078;
    transform-origin: 0 bottom;
    transform: scaleY(.5) translateZ(0);
  }
  @media (min-resolution: 2dppx) {
    span.one-pixel-line.shadow::after {
      box-shadow: 0 0 0 .5px #b4a078;
    }
  }
  @media (min-resolution: 3dppx) {
    span.one-pixel-line.shadow::after {
      box-shadow: 0 0 0 .333333px #b4a078;
    }
  }
</style>
<template>
  <main class="main">
    <span class="one-pixel-line shadow"></span>
  </main>
</template>
<script>
</script>