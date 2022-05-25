<style scoped>
  main {
    width: 100%;
    padding: 52px 29px;
    display: flex;
    justify-content: center;
  }
  span.one-pixel-line {
    display: block;
    width: 229px; height: 229px;
    position: relative;
  }
  span.one-pixel-line.right,
  span.one-pixel-line.bottom,
  span.one-pixel-line.left {
    margin-left: -229px;
  }
  span.one-pixel-line::before,
  span.one-pixel-line::after {
    content: "";
    display: block;
    position: absolute;
    transform-origin: 0 0;
  }
  /* top line */
  span.one-pixel-line.top::before {
    width: 100%;
    top: 0; left: 0;
    border-top: 1px solid #b4a078;
    transform-origin: 0 top;
  }
  @media (min-resolution: 2dppx) {
    span.one-pixel-line.top::before {
      width: 200%;
      transform: scale(.5) translateZ(0);
    }
  }
  @media (min-resolution: 3dppx) {
    span.one-pixel-line.top::before {
      width: 300%;
      transform: scale(.333333) translateZ(0);
    }
  }
  /* right line */
  span.one-pixel-line.right::after {
    height: 100%;
    top: 0; right: 0;
    border-right: 1px solid #b4a078;
    transform-origin: right 0;
  }
  @media (min-resolution: 2dppx) {
    span.one-pixel-line.right::after {
      height: 200%;
      transform: scale(.5) translateZ(0);
    }
  }
  @media (min-resolution: 3dppx) {
    span.one-pixel-line.right::after {
      height: 300%;
      transform: scale(.333333) translateZ(0);
    }
  }
  /* bottom line */
  span.one-pixel-line.bottom::after {
    width: 100%;
    bottom: 0; left: 0;
    border-bottom: 1px solid #b4a078;
    transform-origin: 0 bottom;
  }
  @media (min-resolution: 2dppx) {
    span.one-pixel-line.bottom::after {
      width: 200%;
      transform: scale(.5) translateZ(0);
    }
  }
  @media (min-resolution: 3dppx) {
    span.one-pixel-line.bottom::after {
      width: 300%;
      transform: scale(.333333) translateZ(0);
    }
  }
  /* left line */
  span.one-pixel-line.left::before {
    height: 100%;
    top: 0; left: 0;
    border-left: 1px solid #b4a078;
    transform-origin: 0 left;
  }
  @media (min-resolution: 2dppx) {
    span.one-pixel-line.left::before {
      height: 200%;
      transform: scale(.5) translateZ(0);
    }
  }
  @media (min-resolution: 3dppx) {
    span.one-pixel-line.left::before {
      height: 300%;
      transform: scale(.333333) translateZ(0);
    }
  }
</style>
<template>
  <main class="main">
    <span class="one-pixel-line top"></span>
    <span class="one-pixel-line right"></span>
    <span class="one-pixel-line bottom"></span>
    <span class="one-pixel-line left"></span>
  </main>
</template>
<script>
</script>