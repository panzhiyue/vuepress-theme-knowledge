<template>
  <Button @click="onClick">执行</Button>
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