<style scoped>
  main{
    width: 100%;
    padding: 60px 80px 80px;
    background: #b4a078;
  }
  div{
    padding: 12px;
    margin: 20px auto;
    background: white;
    border: 10px solid hsla(0, 0%, 100%, .5);
  }
  label{
    color: #f4f0ea;
  }
  input[id="pb"]:checked ~ div{
    background-clip: padding-box;
  }
</style>
<template>
  <main>
    <input id="pb" type="checkbox" checked/>
    <label for="pb">padding-box(默认)</label>
    <div>A paragraph of filler text. La la la de dah de dah de dah de la.</div>
  </main>
</template>
<script>
</script>