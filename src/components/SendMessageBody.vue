<template>
<div class="right-side">
    <div ref="message" class="message">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
        <a class="message-text">{{message.message}}</a>
    </div>
</div>
</template>

<script>
export default {
  props:{
    message:Object
  },
  data(){
    return{
      width:'0px',
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .message{
    max-width: 30%;
    word-break: break-all;
    width:auto;
    background: rgb(213, 255, 232);
    padding:10px;
    border-radius: 10px;
    margin-right: 100px;
    transition: 0.3s;
    margin-bottom: 20px;
  }
  .message-text{
    color: black;
    font-family: 'Open Sans',sans-serif;
  }
</style>
