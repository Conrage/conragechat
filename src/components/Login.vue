<template>
  <div class="login-body">
      <input v-model="email" class="input-login" placeholder="E-mail">
      <input v-model="password" class="input-login" placeholder="Senha">
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
.button-login{
    cursor: pointer;
    margin-top:10%;
    width: 50%;
    background: rgb(189, 130, 238);
    border: none;
    outline: none;
    color: white;
    border-radius: 10px;
    height: 35px;
    transition: 0.3s;
}
.button-login:hover{
    background: rgb(208, 167, 245);
}
.login-body{
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    flex-direction: column;
    width: 80%;
    height: 90vh;
    background: rgb(235, 220, 247);
}
.input-login{
    height: 35px;
    width: 50%;
    margin-top: 30px;
    color: seashell;
    border-radius: 20px;
    text-indent: 15px;
    border: 1px solid white;
    background: rgb(172, 171, 171);
    outline: none;
    transition: 0.3s;
}
.input-login:hover{
    background: rgb(97, 97, 97);
}
.input-login:focus{
    border-radius: 4px;
    width: 53%;
    background: rgb(97, 97, 97);
}
.input-login::placeholder{
    color: rgba(255, 255, 255, 0.863);
}
</style>