<style scoped>
  main{
    width: 100%;
    padding: 52px 39px;
    background: rgba(180,160,120,.1);
  }
  span.key {
    padding-right: 6px;
  }
  span.bold {
    line-height: 2em;
    font-weight: bold;
  }
  span.br::before {
    content: "\A";
    white-space: pre;
  }
  span.bold + span.bold::before {
    content: ", ";
    font-weight: 500;
    margin-left: -.25em;
  }    
</style>
<template>
  <main class="main">
    <span class="key">👦🏿Name:</span>
    <span class="bold">LHammer</span>
    <span class="key br">👨🏼‍💻GitHub:</span>
    <span class="bold">https://github.com/l-hammer</span>
    <span class="bold">https://gitee.com/lhammer</span>
    <span class="key br">🌎掘金:</span>
    <span class="bold">https://juejin.im/user/57a3dbb2d342d300574d8369</span>
  </main>
</template>
<script>
</script>