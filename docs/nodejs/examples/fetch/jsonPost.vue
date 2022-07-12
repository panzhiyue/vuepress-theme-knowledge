<template>
  <input type="button" @click="onClick" value="执行" />
</template>

<script>
export default {
  mounted() {},
  methods: {
    async onClick() {
      const body = { a: 1 };

      const response = await fetch("https://httpbin.org/post", {
        method: "post",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data);
    },
  },
};
</script>

<style>
</style>