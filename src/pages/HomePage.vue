<script setup lang="ts">
import GamesList from "@/components/GamesList.vue";
import { RouterView } from "vue-router";
import MyBets from "@/components/MyBets.vue";

// const payload = {
//   selections: [
//     {
//       gameId: "g-001",
//       betType: "home",
//       stake: 10,
//       odds: 2.15,
//       potentialPayout: 21.5,
//     },
//   ],
//   totalStake: 10,
//   totalPotentialPayout: 21.5,
//   acceptedTerms: true,
// };
// async function sendBet() {
//   const { get, post } = useFetch();
//   const resp = await get("/games");
//   console.log(resp);
// }
</script>
<template>
  <div class="home-wrapper">
    <GamesList />
    <RouterView />
    <MyBets />
  </div>
</template>

<style scoped lang="scss">
.home-wrapper {
  display: grid;
  grid-template-columns: 400px auto 300px;
}
</style>
