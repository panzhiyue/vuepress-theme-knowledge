<template>
  <input type="button" @click="onClick" value="执行" />
</template>

<script>
export default {
  mounted() {},
  methods: {
    async onClick() {
      const response = await fetch("https://api.github.com/users/github");
      const body = await response.json();
      console.log(body);
    },
  },
};
</script>

<style>
</style>