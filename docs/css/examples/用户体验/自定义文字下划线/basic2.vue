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
    position: relative;
  }
  p > span:after {
    content: '';
    width: 100%;
    position: absolute;
    bottom: 0; right: 0; left: 0;
    border-bottom: 1px solid #b4a078;
  }
</style>
<template>
  <main ref="main">
    <p><span>请给我添加一条能看能看能看的下划线！</span></p>
  </main>
</template>
<script>
</script>