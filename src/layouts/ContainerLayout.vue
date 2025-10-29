<template>
  <div class="container-layout">
    <slot />
  </div>
</template>
<style scoped lang="scss">
.container-layout {
  border: 1px solid var(--overlay-sm);
  padding: 20px;
  border-radius: 20px;
  background-color: var(--overlay-xs);
  margin: 10px;
}
</style>
