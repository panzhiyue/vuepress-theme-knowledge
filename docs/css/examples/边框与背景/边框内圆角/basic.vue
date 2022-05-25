<style scoped>
  main{
    width: 100%;
    padding: 60px 80px 80px;
  }
  div{
    width: 209px;
    margin: 29px auto;
    padding: 8px 16px;
    border-radius: 8px;
    background: #f4f0ea;
    outline: 6px solid #b4a078;
  }
  input{
    margin-left: calc(50% - 45px);
  }
  input:checked ~ div{
    box-shadow: 0 0 0 5px #b4a078;
  }
</style>
<template>
  <main>
    <input id="ck" type="checkbox" checked/>
    <label for="ck">box-shadow</label>
    <div>A paragraph of filler text. La la la de dah de dah de dah de la.</div>
  </main>
</template>
<script>
</script>