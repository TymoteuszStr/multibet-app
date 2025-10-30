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
  grid-template-areas: "left center right";
  align-items: start;
  gap: 0;
  max-width: 2000px;
  margin: 0 auto;
  > * {
    min-height: 200px;
  }

  > :nth-child(1) {
    grid-area: left;
  }
  > :nth-child(2) {
    grid-area: center;
  }
  > :nth-child(3) {
    grid-area: right;
  }
}

@media (max-width: 1024px) {
  .home-wrapper {
    grid-template-columns: 320px auto;
    grid-template-areas:
      "right right"
      "left center";
    gap: 16px;
  }
}

@media (max-width: 600px) {
  .home-wrapper {
    grid-template-columns: 1fr;
    grid-template-areas:
      "right"
      "left"
      "center";
    gap: 12px;

    > * {
      min-height: unset;
    }
  }
}
</style>
