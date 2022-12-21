<template>
  <div class="adjust">
    <div class="aj_tempt clear">
      <!-- <img class="temp_icon fl" src="../../../img/icon/temp.png" /> -->
      <input class="temp_rg fl" type="range" value="0" id="Range1" />
    </div>
    <div class="aj_light clear">
      <!-- <img class="light_icon fl" src="../../../img/icon/light.png" /> -->
      <input
        class="light_rg fl"
        type="range"
        min="0"
        max="100"
        step="1"
        value="0"
        id="Range2"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style scoped>
.adjust {
  height: 200px;
}
/* 第一个滑块自定义样式 */
/* 去除系统默认样式 */
.adjust .aj_tempt input[type="range"] {
  -webkit-appearance: none;
  width: 65%;
  border-radius: 10px;
}
.adjust .aj_tempt input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
}
/* 给滑动轨道(track)添加样式 */
.adjust .aj_tempt input[type="range"]::-webkit-slider-runnable-track {
  height: 5px;
  border-radius: 10px;
  background: -webkit-gradient(
    linear,
    100% 0,
    0 100%,
    from(#ffd973),
    to(#35e8ef)
  );
  
}
.adjust .aj_tempt input[type="range"]:focus {
  outline: none;
}
/* 给滑块(thumb)添加样式 */
.adjust .aj_tempt input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 20px;
  width: 20px;
  margin-top: -7px;
  background: #ffffff;
  border-radius: 50%;
  border: 5px solid #35e8ef;
}

/* 第二个滑块自定义样式*/
/* 去除系统默认样式 */
.adjust .aj_light input[type="range"] {
  -webkit-appearance: none;
  width: 65%;
  height: 5px;
  border-radius: 10px;
  background: -webkit-linear-gradient(#4a80fe, #4a80fe) no-repeat #dfe8fb;
  background-size: 0% 100%;
  margin-top: 12px;
}
.adjust .aj_light input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
}
/* 给滑动轨道(track)添加样式 */
.adjust .aj_light input[type="range"]::-webkit-slider-runnable-track {
  height: 5px;
  border-radius: 10px;
}
.page_ajOn .adjust .aj_light input[type="range"]:focus {
  outline: none;
}
/* 给滑块(thumb)添加样式 */
.adjust .aj_light input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 20px;
  width: 20px;
  margin-top: -7px;
  background: #ffffff;
  border-radius: 50%;
  border: 5px solid #2566ff;
}
</style>
