<template>
  <Button @click="onClick">执行</Button>
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