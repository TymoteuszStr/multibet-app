<script setup lang="ts">
import type { Bet } from "@/types/Bet";
import Input from "./shared/Input.vue";
import type { Game } from "@/types/Game";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

defineProps<{
  bet: Bet;
  game: Game;
}>();
</script>

<template>
  <div :key="bet.gameId" class="content">
    <font-awesome-icon
      :icon="faXmark"
      class="content__remove"
      @click="$emit('remove')"
    />
    <div class="truncate-text">
      {{ `${game?.homeTeam} - ${game?.awayTeam}` }}
    </div>
    <div>Bet: {{ bet.betType }}</div>
    <Input type="number" v-model="bet.stake" />
  </div>
</template>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 20px;
  position: relative;
  &__remove {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    &:hover {
      color: var(--muted);
    }
  }
}
</style>
