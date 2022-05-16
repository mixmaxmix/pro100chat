<script>
export default {
  props: {
    channelName: "",
    channelId: 0,
  },
  methods: {
    openChat(name, id) {
      this.$router.push({
        name: 'channel',
        params: {
          channelName: name,
          id: id
        }
      });
    }
  },
};
</script>

<template>
  <div @click="openChat(this.channelName, this.channelId)" class="channelContainer" >
    <p class="channelName">{{channelName}}</p>
    <div class="channelArrow"></div>
  </div>
</template>

<style scoped>
  .channelContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    cursor: pointer;
    border-bottom: 1px solid var(--blue);
    transition: .2s;
    transition-property: color, border;
  }
  .channelContainer:hover {
    color: var(--green);
    border-bottom-color: var(--green);
  }
  .channelName {
    position: relative;
    font-size: 16px;
    margin-left: 15px;
  }
  .channelName::before {
    content: '#';
    position: absolute;
    left: -15px;
    color: var(--gray);
  }
  .channelArrow {
    width: 24px;
    height: 24px;
    background: url(@/assets/arrow.svg) center center / cover;
    transition: .2s filter;
  }
  .channelContainer:hover > .channelArrow {
    filter: invert(52%) sepia(96%) saturate(733%) hue-rotate(117deg) brightness(94%) contrast(99%);
  }
</style>