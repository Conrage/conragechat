<template>
  <div id="app">
    <div class="contacts-list">
      <div @click="isChatting = false" class="top-nav">
        <div style="width:30px;margin-top:2px">
          <span style="color:rgb(197, 89, 26)" class="material-icons">
            arrow_backwards
          </span>
        </div>
        <a class="nav-text">Welcome page</a>
      </div>
      <div class="switch-aligner">
        <div class="switch-text light">Light Mode</div>
        <label class="switch">
          <input type="checkbox" @change="darkMode()">
          <span class="slider round"></span>
        </label>
        <div class="switch-text dark">Dark Mode</div>
      </div>
      <div class="search-box">
        <div class="icon-aligner">
          <span ref="iconSearch" class="material-icons input-icon">
            search
          </span>
          <span 
            ref="iconClose"
            style="opacity:0;display:none;margin-bottom:30px;font-size:18px" 
            class="material-icons input-icon">
            close
          </span>
          <input @blur="resetIcon" @focus="animateIcon" placeholder="Procurar contato..." class="input-search">
        </div>
      </div>
      <div v-for="(data, index) in friends" :key="index" @click="openChat(data.id)" class="user-card">
        <a class="friend-name">{{data.id}}</a>
      </div>
    </div>
    <div v-if="!isChatting" class="home-landing">
      <div class="home-landing-header">
        <img style="width:20%;height:80%" src="../assets/LogoOficial.svg" />
      </div>
      <div class="welcome-text">Bem vindo! Para começar a bater papo <a style="color:rgb(252, 158, 103)">clique</a> em uma das conversas ao lado!</div>
    </div>
    <div v-else-if="isChatting" class="messages-holder">
      <div class="send-message" @click="logout()">Sair</div>
      <div class="scrollstyle" ref="message-scroll" style="overflow:auto;width:100%;">
        <div :ref="'message-container'" style="width:100%;" v-for="(data, index) in messages" :key="index">
          <SendMessageBody v-if="data.from==id" :message="data"/>
          <MessageBody v-else :message="data"/>
        </div>
      </div>
      <div class="input-body">
        <input @keydown.enter="sendMessage()" v-model="inputValue" class="input" placeholder="Envie uma mensagem...">
        <button :disabled="disabled" ref="sendButton" @click="sendMessage()" class="send-message">
          <span class="material-icons">
            send
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import colors from '../../src/color.json'
import 'material-icons'
import firebase from '@firebase/app';
import '@firebase/firestore';
export const db = firebase.firestore();
import MessageBody from './MessageBody.vue'
import SendMessageBody from './SendMessageBody.vue'
import io from 'socket.io-client';
export default {
  name: 'App',
  components: {
    MessageBody,
    SendMessageBody,
  },
  data(){
    return{
      socket:{},
      messages:[],
      sendmessages:[],
      inputValue:"",
      id:null,
      disabled:true,
      currentUser:null,
      currentChat:"",
      friends:[],
      isDark:false,
      isChatting:false,
    }
  },
  methods:{
    sendMessage(){
      var message = {
        message:this.inputValue,
        from:this.id,
        to:this.currentChat,
      }
      this.storeHighScore(message);
      this.socket.emit('message',message)
      this.inputValue = "";
    },
    storeHighScore(message) {
      db.collection('Users')
      .doc(firebase.auth().currentUser.uid)
      .collection('messageHistory')
      .add(message)
    },
    darkMode(){
      if(this.isDark){
        document.body.style.setProperty('--invert','invert(none)');
        document.body.style.setProperty('--main-color',colors.lightPrimary);
        document.body.style.setProperty('--invert-white',colors.white);
        document.body.style.setProperty('--background',colors.invertWhite);
        document.body.style.setProperty('--manterwhite','white');
        document.body.style.setProperty('--manterblack','black');
        document.body.style.setProperty('--orange',colors.orange);
        document.body.style.setProperty('--blue',colors.blue);  
        this.isDark = false;
      }else{
        document.body.style.setProperty('--invert','invert(1)');
        document.body.style.setProperty('--main-color',colors.darkPrimary);
        document.body.style.setProperty('--invert-white',colors.invertWhite);
        document.body.style.setProperty('--background',colors.background);
        document.body.style.setProperty('--manterwhite','black');
        document.body.style.setProperty('--manterblack','white');
        document.body.style.setProperty('--orange',colors.blue);
        document.body.style.setProperty('--blue',colors.orange);
        this.isDark = true;
      }
      
    },
    openChat(id){
      this.currentChat = id;
      this.messages = [];
      db.collection('Users').get()
      .then((data)=>{
        for(var i = 0; i < data.docs.length; i++){
          if(data.docs[i].data().id == id){
            db.collection('Users')
            .doc(data.docs[i].id)
            .collection('messageHistory')
            .where('to','==',this.currentUser.id)
            .get().then((datas)=>{
              for(var o = 0; o < datas.docs.length; o++){
                if(datas.docs[o].data().from == id){
                  console.log(datas.docs[o])
                  this.messages.push(datas.docs[o].data());
                }
              }
            })
          }
        }
      })
      db.collection('Users')
          .doc(firebase.auth().currentUser.uid)
          .collection('messageHistory')
          .where('to','==',id)
          .get().then((datas)=>{
            console.log(datas)
            for(var o = 0; o < datas.docs.length; o++){
              if(datas.docs[o].data().from == this.currentUser.id){
                
                this.messages.push(datas.docs[o].data());
              }
            }
          })
      this.isChatting = true
    },
    logout(){
      firebase.auth().signOut().then(() => {
        console.log("Sign-out successful.");
        this.$router.replace({
          name:"login",
        })
      }).catch((error) => {
        console.log(error);
      });
    },
    getData(){
      db.collection('Users')
      .doc(firebase.auth().currentUser.uid)
      .get().then((data)=>{
        this.id = data.data().id;
        this.currentUser = data.data(); 
      })
      db.collection('Users').get().then((data)=>{
        for(var i = 0; i < data.docs.length; i++){
          db.collection('Users')
          .doc(data.docs[i].id).get()
          .then((data)=>{
            if(data.data().id != this.id){
              this.friends.push(data.data());
            }
          })
        }
      })
    },
    animateIcon(){
      this.$refs['iconSearch'].style.marginTop = '30px';
      this.$refs['iconSearch'].style.opacity = '0';
      this.$refs['iconClose'].style.display = 'flex';
      setTimeout(()=>{
        this.$refs['iconSearch'].style.display = 'none';
        this.$refs['iconClose'].style.marginBottom = '0px';
        this.$refs['iconClose'].style.opacity = '1';
      },100)
    },
   resetIcon(){
      this.$refs['iconClose'].style.marginBottom = '30px';
      this.$refs['iconClose'].style.opacity = '0';
      this.$refs['iconSearch'].style.display = 'flex';
      setTimeout(()=>{
        this.$refs['iconClose'].style.display = 'none';
        this.$refs['iconSearch'].style.marginTop = '0px';
        this.$refs['iconSearch'].style.opacity = '1';
      },100)
    }
  },
  created(){
    this.socket = io('http://localhost:3000');
    this.socket.on('message',(data)=>{
        this.messages.push(data);
        if(data.id != this.id){
          this.storeHighScore(data)
        }
    })
  },
  mounted(){
    this.getData();
  },
  watch:{
    inputValue: function(text){
      if(text.length > 0){
        this.$refs['sendButton'].style.color = "rgb(255 168 66)"
        this.$refs['sendButton'].style.backgroundColor = "rgb(255 255 255)"
        this.disabled = false;
      }else{
        this.$refs['sendButton'].style.color = "rgba(49, 49, 49, 0.2)"
        this.disabled = true;
      }
    }
  }
}
</script>

<style>
.search-box{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  border-bottom:2px solid rgb(252, 158, 103);
}
.icon-aligner{
  width:100%;
  margin-left:5%;
  display: flex;
  align-items: center;
}
.input-search{
  height: 40px;
  border-radius: 10px;
  transition: 0.3s;
  width: 95%;
  border: 2px solid rgb(248, 229, 217);
  outline:none;
  text-indent: 35px;
  background: rgb(248, 229, 217);
}
.input-search::placeholder{
  color: rgb(219, 193, 173);
}
.input-search:focus{
  background: rgb(255, 255, 255);
  border: 2px solid rgb(252, 158, 103);
}
.input-icon{
  user-select: none;
  position:absolute;
  font-size: 16px;
  transition: 0.1s;
  cursor: pointer;
  font-weight: bold;
  margin-left: 10px;
  color: rgb(252, 158, 103);
}
.switch-text{
  color: #464646;
  font-family: 'Montserrat',sans-serif;
  font-weight: 700;
}
.light{
  color: var(--orange);
}
.dark{
  color: var(--blue);
}
.switch-aligner{
  height: 100px;
  align-items: center;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.switch {
  margin-left: 10px;
  margin-right: 10px;
  position: relative;
  display: inline-block;
  width: 60px;
  height: 22px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(255, 112, 29);
  -webkit-transition: .4s;
  transition: .4s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 1px;
  bottom: 1px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}
input:checked + .slider {
  background-color: rgb(255, 112, 29);
}
input:focus + .slider {
  background:rgb(255, 112, 29);
}
input:checked + .slider:before {
  -webkit-transform: translateX(38px);
  -ms-transform: translateX(38px);
  transform: translateX(38px);
}
.slider.round {
  border-radius: 34px;
}
.slider.round:before {
  border-radius: 50%;
}
body{
  filter:var(--invert);
  background: var(--background);
}
.welcome-text{
  font-size: 36px;
  color: #666666;
  font-family: 'Poppins',sans-serif;
  width: 70%;
  margin-top:6%;
  font-weight: lighter;
  word-wrap: break-word;
  text-align: center;
}
.friend-name{
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 1px;
  font-family: 'Poppins',sans-serif;
  color:rgb(255, 112, 29);
}
.user-card{
  padding: 15px;
  height: 60px;
  transition: 0.2s;
  cursor: pointer;
  border-bottom: 1px solid rgb(252, 158, 103);
}
.user-card:hover{
  box-shadow: inset 0px 0px 7px -2px;
}
.scrollstyle::-webkit-scrollbar {
  width: 10px;
}

.scrollstyle::-webkit-scrollbar-track {
  background: rgb(255, 204, 175);
}

.scrollstyle::-webkit-scrollbar-thumb {
  background-color: rgb(250, 189, 153);
  border-radius: 20px;
}
#app{
  display: flex;
  align-items: center;
  justify-content: center;
}
.contacts-list{
  width:20vw;
  height: 99.5%;
  background-color: var(--main-color);
  border:2px solid rgb(252, 158, 103);
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
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 20px;
  background: var(--borw);
  border-radius: 40px;
  width: 40px;
  height: 40px;
  outline: none;
  border:none;
  color: rgba(49, 49, 49, 0.2);
  transition: 0.3s;
  font-size: 30px;
}
.send-message:hover{
  background: rgb(250, 249, 249);
}
.messages-holder {
  background: linear-gradient(rgba(49, 49, 49, 0.2), rgba(0, 0, 0, 0.1)), url("../assets/background.png");
  background-size: contain;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
  border:2px solid rgb(252, 158, 103);
  border-left: 0px;
  width: 80vw;
  height: 99.5%;
}
.home-landing{
  width: 80vw;
  height: 99.5%;
  border:2px solid rgb(252, 158, 103);
  border-left: 0px;
  display: flex;
  background: var(--invert-white);
  flex-direction: column;
  align-items: center;
}
.home-landing-header{
  height: 40%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.input-body{
  border-radius: 0px 0px 10px 0px;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 70px;
  display: flex;
  flex-direction: row;
  height: 70px;
  background: var(--secondary-color);
}
.input{
  height: 40px;
  width: 70%;
  border-radius: 12px;
  outline: none;
  color: rgb(82, 82, 82);
  text-indent: 10px;
  border: 2px solid rgb(255, 245, 239);
  background: rgb(255, 204, 175);
  transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
}
  .input::placeholder{
    color: rgb(255, 242, 234);
  }
  .input:focus{
    border: 2px solid rgb(250, 172, 126);
    background: rgb(255, 224, 206);
  }
  .top-nav{
    width: 100%;
    cursor: pointer;
    height:20px;
    display: flex;
    flex-direction: row;
    padding: 15px;
    border-bottom: 2px solid rgb(252, 158, 103);
    align-items: center;
  }
  .nav-text{
    font-size: 16px;
    font-family: 'Montserrat',sans-serif;
  }
</style>
