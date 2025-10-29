<script setup lang="ts"></script>

<template>
  <div class="main-wrapper">
    <header class="header">
      <h1>MultiBet</h1>
      <div></div>
      <div>Login</div>
    </header>
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
.main-wrapper {
  display: grid;
  grid-template-rows: 50px auto;
  gap: 60px;
  .header {
    display: grid;
    grid-template-columns: 200px auto 200px;
  }
}
</style>
