<style lang="less" scoped>
main {
  width: 100%;
  padding: 52px 29px;
}

div {
  height: 1px;
  width: 100%;
  margin-top: 20px;
}

.solid1 {
  border-bottom: 1px solid #000;
  border-image: linear-gradient(
      to right,
      rgb(13, 207, 251),
      rgba(151, 151, 151, 0)
    )
    2 2;
}

.solid2 {
  padding: 4px;
  background: linear-gradient(to right, #8f41e9, #578aef);
  border-radius: 16px;
}

.solid3 {
  border: 4px solid transparent;
  border-radius: 16px;
  position: relative;
  background-color: #222;
  background-clip: padding-box; /*important*/
}
.solid3:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
  margin: -4px;
  border-radius: inherit; /*important*/
  background: linear-gradient(to right, #8f41e9, #578aef);
}
.solid4 {
  border: 4px solid transparent;
  border-radius: 16px;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(to right, #222, #222),
    linear-gradient(90deg, #8f41e9, #578aef);
}
//如果对边框的样式细节不是很在意，我们可以借助反向镂空的方法实现，也就是虚线原本实色的地方和周围颜色融为一体，看上去透明，而原来虚框透明的部分透出渐变背景色，于是看上去像是渐变色。
.dashed {
  border: 2px dashed #fff;
  background: linear-gradient(to right, #34538b, #ffffff);
  background-origin: border-box;
}
</style>
<template>
  <main class="main">
    <div class="solid1"></div>
    <div class="solid2"></div>
    <div class="solid3"></div>
    <div class="solid4"></div>
    <div class="dashed"></div>
  </main>
</template>
<script>
</script>