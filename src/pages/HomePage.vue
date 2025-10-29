<script setup lang="ts">
import GamesList from "@/components/GamesList.vue";
import MyBets from "@/components/MyBets.vue";
import ContainerLayout from "@/layouts/ContainerLayout.vue";
import MainDashboard from "@/components/MainDashboard.vue";
</script>
<template>
  <div class="home-wrapper">
    <ContainerLayout>
      <GamesList />
    </ContainerLayout>
    <ContainerLayout>
      <MainDashboard />
    </ContainerLayout>
    <ContainerLayout>
      <MyBets />
    </ContainerLayout>
  </div>
</template>

<style scoped lang="scss">
.home-wrapper {
  display: grid;
  grid-template-columns: 400px auto 400px;
  align-items: start;
  gap: 0;

  > * {
    min-height: 200px;
  }
}
</style>
