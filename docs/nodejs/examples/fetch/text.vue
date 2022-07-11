<template>
  <Button @click="onClick">执行</Button>
</template>

<script>
export default {
  mounted() {},
  methods: {
    async onClick() {
      const response = await fetch("/vuepress-theme-knowledge/nodejs/fetch.html");
      const body = await response.text();
      console.log(body);
    },
  },
};
</script>

<style>
</style>