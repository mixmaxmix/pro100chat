<script setup>
  import Header from '@/components/Header.vue'
  import ChatComponent from '@/components/ChatComponent.vue'
</script>

<template>
  <main class="container">
    <Header/>
    <ChatComponent/>
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
