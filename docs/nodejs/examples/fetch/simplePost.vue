<template>
  <input type="button" @click="onClick" value="执行" />
</template>

<script>
export default {
  mounted() {},
  methods: {
    async onClick() {
      const response = await fetch("https://httpbin.org/post", {
        method: "POST",
        body: "a=1",
      });
      const data = await response.json();
      console.log(data);
    },
  },
};
</script>

<style>
</style>