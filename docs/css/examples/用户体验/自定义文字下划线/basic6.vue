<style scoped>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 39px 0;
    user-select: none;
    font: 16px / 1 Helvetica, sans-serif;
  }
  p > span {
    background: linear-gradient(45deg, transparent 45%, #b4a078 45%, #b4a078 60%, transparent 0),
                linear-gradient(-45deg, transparent 45%, #b4a078 45%, #b4a078 60%, transparent 0);
    background-repeat: repeat-x;
    background-size: .3em .15em;
    background-position: 0 1em, .2em 1em;
    text-shadow: .05em 0 white, -.05em 0 white; /* 避让超出基线以下的部分*/
  }
</style>
<template>
  <main ref="main">
    <p><span>CSS tricks web developerperpers need to know!</span></p>
  </main>
</template>
<script>
</script>