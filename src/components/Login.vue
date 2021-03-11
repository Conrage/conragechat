<template>
  <div class="login-body">
      <div class="logo-floating"></div>
      <div class="align-text-login">
          <div class="box-effect"></div>
          <div class="box-effect-2"></div>
          <div class="box-effect-3"></div>
          <div class="box-effect-4"></div>
          <a class="text-login">Login</a>
      </div>
      <input v-model="email" class="input-login" placeholder="E-mail">
      <input type="password" v-model="password" class="input-login" placeholder="Senha">
      <button role="button" @click="login()" class="button-login">FAZER LOGIN!</button>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
    data(){
        return{
            email:"",
            password:"",
        }
    },
    methods:{
        login(){
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then((user) => {
                    console.log("logged "+user)
                })
                .catch((error) => {
                    console.log(error)
                });
        }
    },
    mounted(){
        console.log(firebase)
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    console.log(user)
                    this.$router.replace({
                        name:"Home"
                    })
                } else {
                    // User is signed out
                    // ...
                }
            });
    }
}
</script>

<style>
body{
    font-size: 62.5%;
}
.logo-floating{
    background-image: url('../assets/LogoOficial.svg');
    width: 10%;
    height: 20%;
    background-size: 100% 100%;
}
.box-effect{
    position: absolute;
    width: 110px;
    border-right: 5px solid rgb(97, 97, 97);
    height: 25px;
    animation: box 2s infinite;
}
@keyframes box {
    50%{
        height: 50px;
    }
}
.align-text-login{
    display: flex;
    justify-content: center;
}
.button-login{
    cursor: pointer;
    margin-top:10%;
    width: 30%;
    background: transparent;
    border: none;
    outline: none;
    color: rgb(97, 97, 97);
    font-size: 1.5em;
    font-family: 'Poppins',sans-serif;
    font-weight: bold;
    border: 5px solid rgb(252, 158, 103);
    height: 55px;
    transition: 0.3s;
}
.button-login:hover{
    background: rgb(252, 158, 103);
    color: white;
}
.login-body{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background: rgb(255, 247, 241);
}
.input-login{
    height: 35px;
    width: 35%;
    margin-top: 30px;
    color: rgb(252, 158, 103);
    border-radius: 0px;
    text-indent: 15px;
    font-family: 'Poppins',sans-serif;
    border: none;
    border-bottom: 5px solid rgb(252, 158, 103);
    background: none;
    outline: none;
    transition: 0.3s;
}
.text-login{
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Montserrat',sans-serif;
    font-size: 35px;
    width: 120px;
    height: 50px;
    border: 5px solid rgb(252, 158, 103);
    color: rgb(252, 158, 103);
}
.input-login:hover{
    background: rgb(97, 97, 97);
}
.input-login:focus{
    border-radius: 4px;
    width: 36%;
    color: seashell;
    background: rgb(97, 97, 97);
}
.input-login::placeholder{
    color: rgb(252, 158, 103);
}
</style>