<style scoped>
main {
  width: 100%;
  padding: 80px 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.progress-outer {
  width: 60%;
  height: 12px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.progress-enter {
  height: inherit;
  background: rgba(180, 160, 120, 0.2);
}

.progress-bg {
  width: 60%;
  height: inherit;
  border-radius: 6px;
  background: repeating-linear-gradient(
    -45deg,
    #d9cfbb 25%,
    #c3b393 0,
    #c3b393 50%,
    #d9cfbb 0,
    #d9cfbb 75%,
    #c3b393 0
  );
  background-size: 16px 16px;
  animation: panoramic 20s linear infinite;
}

@keyframes panoramic {
  to {
    background-position: 200% 0;
  }
}
</style>

<template>
  <main>
    <div class="progress-outer">
      <!--更好的扩展-->
      <div class="progress-enter">
        <div class="progress-bg"></div>
      </div>
      <!-- <span>60%</span> -->
    </div>
  </main>
</template>
<script>
</script>