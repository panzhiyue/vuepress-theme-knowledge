<template>
  <Button @click="onClick">执行</Button>
</template>

<script>
export default {
  mounted() {},
  methods: {
    async onClick() {
      const response = await fetch("https://api.github.com/users/github");

      console.log(response.ok);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.headers.get("content-type"));
    },
  },
};
</script>

<style>
</style>