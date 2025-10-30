<script setup lang="ts">
import type { Bet } from "@/types/Bet";
import Input from "./shared/InputNumber.vue";
import type { Game } from "@/types/Game";
import { watch, onMounted, ref } from "vue";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useValidate } from "@/composables/useValidate";
import { MIN_STAKE } from "@/assets/constants";

const props = defineProps<{
  bet: Bet;
  game: Game;
}>();
const emit = defineEmits<{
  (e: "update:stake", value: number): void;
  (e: "remove"): void;
}>();
const stake = defineModel<number>("stake");

const { validateStake } = useValidate();
const lastValidStake = ref<number>(props.bet.stake);

watch(stake, (value) => {
  const numericValue = Number(value);
  if (validateStake(numericValue)) {
    lastValidStake.value = numericValue;
    emit("update:stake", numericValue);
  } else {
    if (!value || Number.isNaN(numericValue) || numericValue <= 0) {
      if (stake.value !== MIN_STAKE) {
        stake.value = MIN_STAKE;
        lastValidStake.value = MIN_STAKE;
        emit("update:stake", MIN_STAKE);
      }
    } else if (stake.value !== lastValidStake.value) {
      stake.value = lastValidStake.value;
    }
  }
});
function handleChangeStake(value: number) {
  if (!validateStake(Number(value))) return;
}
onMounted(() => {
  if (stake.value == null) {
    stake.value = props.bet.stake;
  }
  lastValidStake.value = Number(stake.value ?? props.bet.stake);
});
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
    <Input v-model="stake" @change="handleChangeStake" />
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
