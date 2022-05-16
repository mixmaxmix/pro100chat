<script setup>
  import Channels from '@/components/Channels.vue'
  import Header from '@/components/Header.vue'
</script>

<template>
  <main class="container">
    <Header/>
    <Channels/>
  </main>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 100vh;
}
</style>
