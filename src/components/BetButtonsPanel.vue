<script setup lang="ts">
import type { Game } from "@/types/Game";
import Button from "./shared/Button.vue";
import { computed } from "vue";

const props = defineProps<{
  game: Game;
}>();
const emit = defineEmits<{
  (e: "bet", betType: "homeWin" | "draw" | "awayWin"): void;
}>();
const isGameFinished = computed(() => props.game.status === "finished");
</script>

<template>
  <div class="bet-buttons-panel">
    <Button @click="$emit('bet', 'homeWin')" :disabled="isGameFinished">
      <p class="team-name">{{ game.homeTeam }}</p>
      <p class="odds">{{ game.odds.homeWin }}</p></Button
    >
    <Button
      v-if="game.odds.draw"
      @click="$emit('bet', 'draw')"
      :disabled="isGameFinished"
    >
      <p class="team-name">Draw</p>
      <p class="odds">{{ game.odds.draw }}</p>
    </Button>
    <div v-else></div>

    <Button @click="$emit('bet', 'awayWin')" :disabled="isGameFinished">
      <p class="team-name">{{ game.awayTeam }}</p>
      <p class="odds">{{ game.odds.awayWin }}</p>
    </Button>
  </div>
</template>

<style scoped lang="scss">
.bet-buttons-panel {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  width: 100%;

  .odds {
    font-size: 1.2rem;
    font-weight: 600;
    margin: 10px 0;
  }
  .team-name {
    font-weight: 400;
    font-size: 0.9rem;
    margin: 5px 0;
  }

  button {
    padding: 5px;
  }
}
</style>
