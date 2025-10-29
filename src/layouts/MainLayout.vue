<script setup lang="ts">
import { onMounted, ref } from "vue";

const isDark = ref(false);
function toggleTheme() {
  isDark.value = !isDark.value;
  localStorage.setItem("theme", isDark.value ? "dark" : "light");
  document.documentElement.classList.toggle("dark-theme", isDark.value);
  document.documentElement.classList.toggle("light-theme", !isDark.value);
}
onMounted(() => {
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const saved = localStorage.getItem("theme");

  if (saved) {
    isDark.value = saved === "dark";
  } else {
    isDark.value = systemDark;
  }

  document.documentElement.classList.toggle("dark-theme", isDark.value);
  document.documentElement.classList.toggle("light-theme", !isDark.value);
});
</script>

<template>
  <div class="main-wrapper">
    <header class="header">
      <h1>MultiBet</h1>
      <div></div>
      <div>
        <button type="button" class="theme-btn" @click="toggleTheme">
          dark
        </button>
      </div>
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
.theme-btn {
  background-color: var(--primary);
  color: var(--primary-contrast, #fff);
  font-weight: 600;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    background-color: var(--primary-hover);
  }

  &:active {
    background-color: var(--primary-active);
    transform: translateY(1px);
  }

  &:focus {
    outline: 2px solid var(--primary-hover);
    outline-offset: 2px;
  }
}
</style>
