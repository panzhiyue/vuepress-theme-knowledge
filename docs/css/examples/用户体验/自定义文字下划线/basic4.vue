<style>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 39px 0;
  user-select: none;
  font: 16px / 1 Helvetica, sans-serif;
}
p > span {
  background: linear-gradient(#b4a078, #b4a078) no-repeat;
  background-size: 100% 1px;
  background-position: 0 1em;
  text-shadow: 0.05em 0 white, -0.05em 0 white; /* 避让超出基线以下的部分*/
}
p > span:hover {
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
    <p><span>CSS tricks web developerperpers need to know!</span></p>
  </main>
</template>
<script>
</script>