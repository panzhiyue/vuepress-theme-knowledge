<template>
  <input type="button" @click="onClick" value="执行" />
</template>

<script>
export default {
  mounted() {},
  methods: {
    async onClick() {
      const params = new URLSearchParams();
      params.append("a", 1);

      const response = await fetch("https://httpbin.org/post", {
        method: "POST",
        body: params,
      });
      const data = await response.json();
      console.log(data);
    },
  },
};
</script>

<style>
</style>