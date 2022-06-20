<template>
  <div>
    <button @click="console.log(dayjs('2018-08-08'))">2018-08-08</button>
  </div>
</template>
<script>
import dayjs from "dayjs";
export default {
  data() {
    return {
      dayjs,
    };
  },
};
</script>