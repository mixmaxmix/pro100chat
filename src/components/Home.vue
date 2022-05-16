<script>
import axios from 'axios';

export default {
  data() {
    return {
      formValue: {
        username: '',
        password: '',
      },
      showPass: false,
      disabled: true,
    };
  },
  methods: {
    signIn() {
      const authContainer = document.querySelector('.authContainer');
      authContainer.style.opacity = 0;
      authContainer.style.transform = 'scale(.5)';
      axios
        .post('/auth/signin', {
          password: this.formValue.password,
          username: this.formValue.username,
        })
        .then(res => {
          localStorage.setItem('authToken', `Bearer ${res.data.result.token}`);
          localStorage.setItem('username', res.data.result.username);
          localStorage.setItem('userId', res.data.result.id);
          this.$router.push('channels');
        })
        .catch(() => {
          alert('Проверьте данные');
          authContainer.style.opacity = 1;
          authContainer.style.transform = 'scale(1)';
        })
    },
    signUp() {
      const authContainer = document.querySelector('.authContainer');
      authContainer.style.opacity = 0;
      authContainer.style.transform = 'scale(.5)';
      axios
        .post('/auth/signup', {
          firstName: 'Чачер',
          lastName: 'Чучер',
          middleName: 'Чачирович',
          password: this.formValue.password,
          username: this.formValue.username,
        }
        )
        .then((res) => {
          localStorage.setItem('authToken', `Bearer ${res.data.result.token}`);
          localStorage.setItem('username', res.data.result.username);
          localStorage.setItem('userId', res.data.result.id);
          this.$router.push('channels');
        })
        .catch((error) => {
          if(error.response.data.result) {
            alert(error.response.data.result[0]);
          } else {
            alert('Неизвестная ошибка');
          }
          authContainer.style.opacity = 1;
          authContainer.style.transform = 'scale(1)';
        })
    },
    showPassword() {
      const passInput = this.$el.querySelector(".authInputPassword");
      this.showPass ? passInput.type = 'text' : passInput.type = 'password';
    }
  },
  watch: {
    formValue: {
      deep: true,
      immediate: true,
      handler(val) {
        if(val.username && val.password) {
          this.disabled = false;
        } else {
          this.disabled = true;
        }
      }
    }
  },
  mounted() {
    localStorage.getItem('authToken') && this.$router.push('channels');
  }
};
</script>

<template>
  <div class="authContainer">
    <img alt="PRO100CHAT" class="authLogo" src="@/assets/logo.svg" />
    <div class="authForm">
      <input class="authInput authInputUsername" v-model="formValue.username" type="text" placeholder="Никнейм" title="Никнейм">
      <div class="authPassContainer">
        <input class="authInput authInputPassword" v-model="formValue.password" type="password" placeholder="Пароль" title="Пароль">
        <input class="authShowPass" v-model="showPass" @change="showPassword" type="checkbox" title="Видимость пароля">
      </div>
      <div class="authFormBtns">
        <button class="authButton authSignIn" title="Войти" @click="signIn" :disabled='disabled'>Продолжить чатиться</button>
        <button class="authButton authSignUp" title="Зарегистрироваться" @click="signUp" :disabled='disabled'>Начать чатиться</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .authContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    width: 500px;
    transition: .2s;
    transition-property: opacity, transform;
  }
  .authLogo {
    width: 80px;
  }
  .authForm {
    display: flex;
    flex-direction: column;
  }
  .authInput {
    padding: 14px 20px;
    color: var(--gray);
    outline: none;
    background-color: var(--black);
    border: none;
    font-size: 16px;
    transition: .2s color;
    width: 100%;
  }
  .authInput:focus {
    color: var(--white);
  }
  .authInputUsername {
    margin-bottom: 15px;
    margin-top: 40px;
  }
  .authFormBtns {
    margin-top: 50px;
  }
  .authButton {
    padding: 15px 20px;
    cursor: pointer;
    outline: none;
    border: none;
    background-color: var(--black);
    color: var(--white);
    font-size: 16px;
    font-weight: 600;
    transition: .2s filter;
  }
  .authButton:disabled {
    filter: brightness(0.8);
    cursor: default;
  }
  .authButton:first-child {
    margin-right: 15px;
  }
  .authButton:not(:disabled):hover {
    filter: brightness(0.9);
  }
  .authButton:focus {
    filter: brightness(0.9);
  }
  .authSignIn {
    background-color: var(--green);
  }
  .authSignUp {
    background-color: var(--blue);
  }
  .authPassContainer {
    display: flex;
    position: relative;
  }
  .authShowPass {
    appearance: none;
    cursor: pointer;
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    transition: .2s filter;
  }
  .authShowPass:after {
    content: '';
    position: absolute;
    width: 24px;
    height: 24px;
    background: url(@/assets/eye-off.svg) center center / cover;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }
  .authShowPass:checked:after {
    background: url(@/assets/eye.svg) center center / cover;
  }
  .authShowPass:hover {
    filter: brightness(.8);
  }
</style>