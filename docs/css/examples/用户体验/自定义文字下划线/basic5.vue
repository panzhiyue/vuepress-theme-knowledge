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
    background: linear-gradient(90deg, #b4a078 66%, transparent 0) repeat-x;
    background-size: .3em 1px;
    background-position: 0 1em;
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