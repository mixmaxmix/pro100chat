<script>
export default {
  methods: {
    home() {
      this.$router.push("/channels");
    },
    logout() {
      localStorage.clear();
      !localStorage.getItem("authToken") && this.$router.push("/");
    }
  },
  mounted() {
    this.username = localStorage.getItem("username");
    document.querySelector('.logoutButton').dataset.content = this.username;
  }
};
</script>

<template>
  <header class="header">
    <button title="Домой" class="headerLogo" @click="home"></button>
    <button @click="logout" id="logout" title="Выйти из аккаунта" class="logoutButton"></button>
  </header>
</template>

<style scoped>
.header {
  position: absolute;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 30vw;
}
.headerLogo {
  width: 47px;
  height: 50px;
  border: none;
  cursor: pointer;
  background: url(@/assets/logo.svg) center center / cover;
}
.logoutButton {
  position: relative;
  width: 24px;
  height: 24px;
  border: none;
  outline: none;
  cursor: pointer;
  background: url(@/assets/log-out.svg) center center / cover;
  transition: .2s filter;
}
.logoutButton:hover {
  filter: invert(52%) sepia(96%) saturate(733%) hue-rotate(117deg) brightness(94%) contrast(99%);
}
.logoutButton::before {
  content: attr(data-content);
  position: absolute;
  color: var(--white);
  font-size: 16px;
  text-align: right;
  font-weight: 600;
  top: 50%;
  transform: translateY(-50%);
  right: calc(50% - -20px);
}
</style>