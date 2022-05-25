<style scoped>
main {
  width: 100%;
  height: 200px;
  padding: 0 20vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}
div:nth-of-type(1) {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #fafafa;
  box-shadow: 0 0 0 10px #e8e2d6, 0 0 0 20px #e1d9c9, 0 0 0 30px #d9cfbb,
    0 0 0 40px #d2c6ae, 0 0 0 50px #cabca0, 0 0 0 60px #c3b393,
    0 0 0 70px #bba985, 0 0 0 80px #b4a078;
}

div:nth-of-type(2) {
  width: 200px;
  height: 120px;
  background: #efebe9;
  border: 5px solid #b4a078;
  outline: #b4a078 dashed 1px;
  outline-offset: -10px;
  margin-bottom: 20px;
}
</style>
<template>
  <main>
    <div></div>
    <div></div>
  </main>
</template>
<script>
</script>