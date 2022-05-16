<script>
import axios from "axios";
import ChannelComponent from "@/components/ChannelComponent.vue";

export default {
  data() {
    return {
      channels: null,
      username: null,
      openCreateModal: false,
      channelValue: '',
      disabled: true,
    };
  },
  components: {
    ChannelComponent,
  },
  methods: {
    appear() {
      const channelsContainer = document.querySelector(".channelsContainer");
      const loader = document.querySelector(".loader");
      channelsContainer.style.opacity = 1;
      channelsContainer.style.transform = "scale(1)";
      loader.style.display = 'none'
    },
    getChannels() {
      axios
        .get("/chats", {
          params: {
            page: 0,
            size: 100,
          },
          headers: {
            Authorization: localStorage.getItem("authToken"),
          },
        })
        .then((res) => {
          this.channels = res.data.result.content;
          this.appear();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createChannel() {
      axios
        .post(
          "/chats",
          {
            name: this.channelValue,
          },
          {
            headers: {
              Authorization: localStorage.getItem("authToken"),
            },
          }
        )
        .then((res) => {
          this.channels = res.data.result.content;
          this.getChannels();
          this.openCreateModal = false;
          this.channelValue = '';
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getChannels();
    let refresh = setInterval(this.getChannels, 300000);
    this.$router.currentRoute.value.name != 'channels' && clearInterval(refresh)
    this.username = localStorage.getItem("username");
    !localStorage.getItem("authToken") && this.$router.push("/");
  },
  watch: {
    channelValue(val) {
      val.length == 0 ? this.disabled = true : this.disabled = false;
    }
  }
};
</script>

<template>
  <Teleport to="body">
    <div class="modalBg" v-if="openCreateModal">
      <div class="modalContainer">
        <div class="modalHeader">
          <h2>Создать канал</h2>
          <button @click="openCreateModal = false" class="closeButton"></button>
        </div>
        <div class="modalContent">
          <input v-model="channelValue" class="modalInput" type="text" placeholder="Название канала" />
          <button @click="createChannel" class="modalCreate" :disabled='disabled'>Создать канал</button>
        </div>
      </div>
    </div>
  </Teleport>
  <div class="channelsContainer">
    <header class="channelsHeader">
      <h3>Каналы:</h3>
      <button
        @click="openCreateModal = true"
        title="Создать канал"
        class="createButton"
      ></button>
    </header>
    <ul>
      <li v-for="channel in channels" :key="channel.id">
        <ChannelComponent
          :channel-name="channel.name"
          :channel-id="channel.id"
        />
      </li>
    </ul>
  </div>
  <div class="loader"></div>
</template>

<style scoped>
.channelsContainer {
  position: relative;
  z-index: 1;
  background-color: var(--black);
  opacity: 0;
  transition: 0.2s;
  transform: scale(0.5);
  width: 500px;
  height: 600px;
}
.channelsHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--darkGreen);
  padding: 10px 20px;
}
.createButton {
  position: relative;
  width: 24px;
  height: 24px;
  border: none;
  outline: none;
  cursor: pointer;
  background: url(@/assets/plus.svg) center center / cover;
  transition: 0.2s filter;
}
.createButton:hover {
  filter: invert(52%) sepia(96%) saturate(733%) hue-rotate(117deg)
    brightness(94%) contrast(99%);
}
.createButton::before {
  content: "Создать канал";
  position: absolute;
  color: var(--white);
  font-size: 16px;
  text-align: right;
  white-space: nowrap;
  top: 50%;
  transform: translateY(-50%);
  right: calc(50% - -20px);
}
li {
  list-style: none;
}
ul {
  overflow: hidden;
  overflow-y: scroll;
  height: 555px;
}
.modalContainer {
  width: 400px;
  background: var(--black);
  position: relative;
  z-index: 5;
}
.modalBg {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 4;
  top: 0;
  width: 100vw;
  height: 100vh;
}
.modalHeader {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--darkGreen);
  padding: 15px;
}
.closeButton {
  width: 24px;
  height: 24px;
  border: none;
  outline: none;
  cursor: pointer;
  background: url(@/assets/x.svg) center center / cover;
  transition: 0.2s filter;
}
.closeButton:hover {
  filter: invert(52%) sepia(96%) saturate(733%) hue-rotate(117deg)
    brightness(94%) contrast(99%);
}
.modalContent {
  padding: 30px 15px;
}
.modalInput {
  padding: 14px 0;
  color: var(--gray);
  outline: none;
  background-color: var(--black);
  border: none;
  border-bottom: 1px solid var(--black);
  font-size: 16px;
  transition: 0.2s;
  transition-property: color, border-color;
  width: 100%;
}
.modalInput:focus {
  color: var(--white);
  border-bottom-color: var(--darkGreen);
}
.modalCreate {
  padding: 15px 20px;
  margin-top: 20px;
  width: 100%;
  cursor: pointer;
  outline: none;
  border: none;
  background-color: var(--darkGreen);
  color: var(--white);
  font-size: 16px;
  font-weight: 600;
  transition: 0.2s filter;
}
.modalCreate:disabled {
  filter: brightness(0.8);
  cursor: default;
}
.modalCreate:first-child {
  margin-right: 15px;
}
.modalCreate:not(:disabled):hover {
  filter: brightness(0.9);
}
</style>