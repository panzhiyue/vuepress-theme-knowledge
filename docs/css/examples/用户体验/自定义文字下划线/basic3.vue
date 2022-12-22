<style scoped>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 39px 0;
    user-select: none;
    font: 16px / 1.5 Helvetica, sans-serif;
  }
  p > span {
    padding-bottom: 1px;
    background: linear-gradient(#b4a078, #b4a078) no-repeat;
    background-size: 100% 1px;
    background-position: 0 18px;
  }
  p > span:hover{
    animation: text-underline-slideInLeft 1.2s linear infinite forwards;
  }
  @keyframes text-underline-slideInLeft {
    from {
      background-position-x: -432px;
    }
    50% {
      background-position-x: 0;
    }
    to {
      background-position-x: 432px;
    }
  }
</style>
<template>
  <main ref="main">
    <p><span>请给我添加一条能看能看能看的下划线！</span></p>
  </main>
</template>
<script>
</script>