<template>
  <div id="app">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
    <router-view></router-view>
  </div>
</template>

<script>
import fb from "@firebase/app";
var firebaseConfig = {
    apiKey: "AIzaSyAJ-I4MVHwx24TXqx5WZkzqFflgOT-z-WU",
    authDomain: "vuewebapp-1225d.firebaseapp.com",
    projectId: "vuewebapp-1225d",
    storageBucket: "vuewebapp-1225d.appspot.com",
    messagingSenderId: "107850347206",
    appId: "1:107850347206:web:419f8496d7b96969b85dc7",
    measurementId: "G-NPZ5SSMG4J"
  };
export const firebase = !fb.apps.length ? fb.initializeApp(firebaseConfig) : fb.app();
import '@firebase/firestore';
export const db = firebase.firestore();
export default {
  name: 'App',
  data(){
    return{
      messages:[],
      sendmessages:[],
      inputValue:"",
      id:1,
    }
  },
  created(){
    if(firebase.auth().currentUser){
      this.$router.replace({
        name:"Home",
      })
    }else{
      this.$router.replace({
        name:"login",
      })
    }
  },
}
</script>

<style>
*{
  border: none;
  padding: 0px;
  margin: 0px;
  overflow: hidden;
}
:root{
  --manterblack:black;
  --main-color:rgb(255, 248, 244);
  --invert:invert(none);
  --background:rgb(255, 254, 254);
  --invert-white:rgb(255, 254, 254);
  --manterwhite:rgb(255, 254, 254);
  --orange:rgb(255, 112, 29);
  --blue:#0384CF;
}
#app{
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.left-side{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.right-side{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.send-message{
  cursor: pointer;
  margin-left: 20px;
  background: white;
  border-radius: 40px;
  width: 40px;
  height: 40px;
  outline: none;
  border:none;
  color: rgb(151, 128, 172);
  transition: 0.3s;
  font-size: 30px;
}
.send-message:hover{
  background: rgb(247, 245, 245);
}
.input-body{
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 70px;
  display: flex;
  flex-direction: row;
  height: 70px;
  background: rgb(151, 128, 172);
}
.input{
  height: 40px;
  width: 70%;
  border-radius: 30px;
  outline: none;
  color: rgb(68, 65, 65);
  text-indent: 30px;
  border: 1px solid rgb(156, 154, 154);
  background: rgb(182, 157, 206);
  transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
}
  .input::placeholder{
    color: rgb(92, 91, 89);
  }
  .input:focus{
    border: 1px solid white;
    background: rgb(198, 174, 211);
  }
</style>
