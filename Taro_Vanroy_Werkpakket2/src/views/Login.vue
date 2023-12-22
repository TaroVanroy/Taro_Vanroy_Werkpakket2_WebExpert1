<script>
import { useShopStore } from '@/store/shop.js';

export default {
  data() {
    return {
      username: '',
      password: '',
      titel1: 'Username',
      titel2: 'Password',
      titel3: 'Forgot password?',
      button1: 'Login',
      button2: 'Logout',
      intro: 'Welkom, ',
    };
  },

  computed: {
    loggedInUser() {
      return useShopStore().loggedInUser;
    },
  },

  methods: {
    login() {
      const user = useShopStore().users.find(
          (u) => u.username === this.username && u.password === this.password
      );

      if (user) {
        useShopStore().setLoggedInUser(user);
        this.$router.push('/Cart');
      } else {
        alert('Invalid username or password, please try again');
      }
    },
    logout() {
      useShopStore().setLoggedInUser(null);
      console.log('User logged out.');
    },
  },
};
</script>

<template>
  <div class="center">
    <h1 v-if="loggedInUser">{{ intro }} {{ loggedInUser.username }}!</h1>
    <h1 v-else>{{ button1 }}</h1>
    <form v-if="!loggedInUser" @submit.prevent="login">
      <div class="txt_field">
        <label for="naam"></label>
        <input v-model="username" type="text" id="naam" required>
        <span></span>
        <label>{{ titel1 }}</label>
      </div>
      <div class="txt_field">
        <label for="wachtwoord"></label>
        <input v-model="password" type="password" id="wachtwoord" required>
        <span></span>
        <label>{{ titel2 }}</label>
      </div>
      <div class="pass">{{ titel3 }}</div>
      <input type="submit" value="Login">
    </form>
    <div id="logout">
      <button v-if="loggedInUser" @click="logout" class="uitloggen">{{ button2 }}</button>
    </div>
  </div>
</template>

<style>
*
{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "inter", sans-serif;
}

h1
{
  color: #fff;
}

.center{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  border-radius: 10px;
  border-width: 10px;
  box-shadow: 10px 10px 15px rgba(0,0,0,0.05);
  background: rgb(188,91,237);
  background: linear-gradient(270deg, rgba(188,91,237,1) 0%, rgba(112,141,255,1) 100%, rgba(2,0,36,1) 202124%);
}
.center h1{
  text-align: center;
  padding: 20px 0;
  border-bottom: 1px solid silver;
}
.center form{
  padding: 0 40px;
  box-sizing: border-box;
}
form .txt_field{
  position: relative;
  border-bottom: 2px solid #fff;
  margin: 30px 0;
}
.txt_field input{
  width: 100%;
  padding: 0 5px;
  height: 40px;
  font-size: 16px;
  border: none;
  background: none;
  outline: none;
  color: #fff;
}
.txt_field label{
  position: absolute;
  top: 50%;
  left: 5px;
  color: #fff;
  transform: translateY(-50%);
  font-size: 16px;
  pointer-events: none;
  transition: .5s;
}
.txt_field span::before{
  content: '';
  position: absolute;
  top: 40px;
  left: 0;
  width: 0;
  height: 2px;
  transition: .5s;
}
.txt_field input:focus ~ label,
.txt_field input:valid ~ label{
  top: -5px;
  color: #fff;
}
.txt_field input:focus ~ span::before,
.txt_field input:valid ~ span::before{
  width: 100%;
}
.pass{
  margin: -5px 0 20px 5px;
  color: #fff;
  cursor: pointer;
}
.pass:hover{
  text-decoration: underline;
}
input[type="submit"]{
  width: 100%;
  height: 50px;
  border: 0;
  background: #fff;
  font-size: 18px;
  color: #2691d9;
  font-weight: 700;
  cursor: pointer;
  outline: none;
  border-radius: 10px;
}

#logout button {
  background-color: white;
  width: 10rem;
  height: 3rem;
  color: #2691d9;
  border-radius: 10px;
  border: 0;
  font-weight: bold;
  font-size: 20px;
  display: block;
  margin: 7rem auto 20px;
}

@media screen and (max-width: 600px)
{
  div.center
  {
    width: 350px;
  }
}

</style>
