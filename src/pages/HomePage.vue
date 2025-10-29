<script setup lang="ts">
import { useFetch } from "../components/useFetch";
import { ref, onMounted } from "vue";

const payload = {
  selections: [
    {
      gameId: "g-001",
      betType: "home",
      stake: 10,
      odds: 2.15,
      potentialPayout: 21.5,
    },
  ],
  totalStake: 10,
  totalPotentialPayout: 21.5,
  acceptedTerms: true,
};
async function sendBet() {
  const { get, post } = useFetch();
  const resp = await get("/games");
  console.log(resp);
}

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
  <div class="home-wrapper">
    <button type="button" class="send-btn" @click="toggleTheme">
      SEND BET
    </button>
  </div>
</template>

<style scoped lang="scss">
.send-btn {
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
