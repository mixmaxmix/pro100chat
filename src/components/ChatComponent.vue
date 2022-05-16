<script>
import axios from "axios";

export default {
  data() {
    return {
      messagesArray: [],
      currentUser: null,
      disabled: true,
      messageVal: "",
      currentChat: null,
      refresh: setInterval(this.getMessages, 10000, this.$route.params.id),
      router: this.$router.currentRoute.value,
    };
  },
  methods: {
    async getMessages(id) {
      return axios
        .get(`chats/${id}/messages`, {
          params: {
            page: 0,
            size: 1000,
          },
          headers: {
            Authorization: localStorage.getItem("authToken"),
          },
        })
        .then((res) => {
          const loader = document.querySelector(".loader");
          this.messagesArray = res.data.result.content;
          loader.style.display = "none";
          return true;
        })
        .catch((error) => {
          console.log(error);
          return false;
        });
    },
    async sendMessage(id) {
      this.disabled = true;
      return axios
        .post(
          `chats/${id}/send`,
          {
            id: this.currentUser,
            chatId: id,
            content: this.messageVal,
          },
          {
            headers: {
              Authorization: localStorage.getItem("authToken"),
            },
          }
        )
        .then((res) => {
          this.messageVal = "";
          this.disabled = false;
          this.getMessages(id);
          return true;
        })
        .catch((error) => {
          console.log(error);
          return false;
        });
    },
    // Александра Дмитриевна, простите за этот говнокод, но я хочу быстрее сдать :c
    async scrollDown(id) {
      if (!this.validateVal(this.messageVal)) {
        let success = await this.sendMessage(id);
        let refreshSuccess = await this.getMessages(id);
        if (success && refreshSuccess) {
          let messagesList = document.querySelector(".messagesContainer");
          messagesList.scrollTo({
            top: messagesList.scrollHeight,
            behavior: "smooth",
          });
        } else {
          console.log("error");
        }
      } else {
        let refreshSuccess = await this.getMessages(id);
        if (refreshSuccess) {
          let messagesList = document.querySelector(".messagesContainer");
          messagesList.scrollTo({
            top: messagesList.scrollHeight,
            behavior: "smooth",
          });
        }
      }
    },
    validateVal(val) {
      return (this.disabled = val === null || val.match(/^ *$/) !== null);
    },
    backToChannels() {
      this.$router.push("/");
    },
  },
  computed: {
    displayMessanges() {
      let messagesArray = this.messagesArray;
      return messagesArray.reverse();
    },
  },
  watch: {
    messageVal(val) {
      this.validateVal(val);
    },
  },
  mounted() {
    this.currentUser = localStorage.getItem("userId");
    this.currentChat = this.$route.params.id;
    this.scrollDown(this.currentChat);
    !localStorage.getItem("authToken") && this.$router.push("/");
  },
  unmounted() {
    clearInterval(this.refresh);
  },
};
</script>

<template>
  <div class="chatContainer">
    <header class="chatHeader">
      <div class="chatHeaderBackContainer" @click="backToChannels">
        <div class="chatHeaderBack"></div>
        <h3>
          {{
            this.$route.params.channelName
              ? this.$route.params.channelName
              : "Чат:"
          }}
        </h3>
      </div>
    </header>
    <ul class="messagesContainer">
      <li
        class="messageElement"
        :class="{
          currentUserMessageContainer: message.createdBy.id == currentUser,
        }"
        v-for="message in displayMessanges"
        :key="message.id"
      >
        <p
          class="currentUserMessage messageText"
          v-if="message.createdBy.id == currentUser"
        >
          {{ message.content }}
        </p>
        <div class="message" v-else>
          <p class="nickname">{{ message.createdBy.username }}</p>
          <p class="messageText">{{ message.content }}</p>
        </div>
      </li>
      <div class="loader"></div>
    </ul>
    <footer class="newMessageContainer">
      <input
        v-model="messageVal"
        class="messageInput"
        type="text"
        placeholder="Сообщение"
        @keypress.enter="!this.disabled && scrollDown(currentChat)"
      />
      <button
        class="messageSend"
        title="Отправить"
        @click="!this.disabled && scrollDown(currentChat)"
        :disabled="disabled"
      ></button>
    </footer>
  </div>
</template>

<style scoped>
.chatContainer {
  position: relative;
  z-index: 1;
  background-color: var(--black);
  transition: 0.2s;
  width: 500px;
  height: 600px;
}
.chatHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--darkGreen);
  height: 45px;
  padding: 10px 20px;
}
.currentUserMessage {
  position: relative;
  color: var(--white);
  padding: 10px;
  margin: 15px 10px;
  max-width: 70%;
  background-color: var(--darkGreen);
}
.currentUserMessage::after {
  content: "";
  position: absolute;
  width: 15px;
  height: 15px;
  background: url(@/assets/current-triangle.svg) center center / cover;
  right: 0;
  bottom: -15px;
}
.messagesContainer {
  height: 500px;
  overflow: hidden;
  overflow-y: scroll;
}
.loader {
  top: 45%;
  transform: translateY(-50%);
  right: calc(50% - 40px);
}
.newMessageContainer {
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
}
.messageInput {
  padding: 14px 20px;
  color: var(--gray);
  outline: none;
  background-color: var(--black);
  border: none;
  border-top: 1px solid var(--black);
  font-size: 16px;
  transition: 0.2s;
  transition-property: color, border-color;
  width: 100%;
}
.messageInput:focus {
  color: var(--white);
  border-top-color: var(--darkGreen);
}
.messageSend {
  background: url(@/assets/send.svg) center center;
  background-repeat: no-repeat;
  background-color: var(--darkGreen);
  width: 24px;
  height: 24px;
  padding: 24px;
  border: none;
  cursor: pointer;
  transition: 0.2s;
  transition-property: background-color, border-color;
  border-top: 1px solid var(--black);
}
.messageSend:hover {
  background-color: var(--green);
}
.messageSend:disabled {
  background-color: var(--black);
}
.messageInput:focus ~ .messageSend {
  border-top-color: var(--darkGreen);
}
.messageElement {
  display: flex;
}
.currentUserMessageContainer {
  justify-content: flex-end;
}
.message {
  position: relative;
  color: var(--white);
  padding: 10px;
  margin: 15px 10px;
  max-width: 70%;
  background-color: var(--blue);
}
.message::after {
  content: "";
  position: absolute;
  width: 15px;
  height: 15px;
  background: url(@/assets/triangle.svg) center center / cover;
  left: 0;
  bottom: -15px;
}
.nickname {
  font-size: 12px;
  font-weight: 700;
  color: var(--green);
  margin-bottom: 5px;
}
.messageText {
  word-break: break-word;
}
.chatHeaderBack {
  background: url(@/assets/arrow.svg) center center / cover;
  width: 12px;
  height: 24px;
  transform: rotate(180deg);
  border: none;
  margin-right: 10px;
}
.chatHeaderBackContainer:hover {
  filter: invert(52%) sepia(96%) saturate(733%) hue-rotate(117deg)
    brightness(94%) contrast(99%);
  cursor: pointer;
  transition: 0.2s filter;
}
.chatHeaderBackContainer {
  display: flex;
  align-content: center;
  justify-content: center;
}
</style>