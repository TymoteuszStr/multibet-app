<script setup lang="ts">
import { useFetch } from "./components/useFetch";

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
</script>

<template><button type="button" @click="sendBet">SEND BET</button></template>

<style scoped></style>
