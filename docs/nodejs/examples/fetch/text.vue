<template>
  <input type="button" @click="onClick" value="执行" />
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