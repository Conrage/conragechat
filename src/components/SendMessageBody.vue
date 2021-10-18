<template>
<div class="right-side">
    <a class="date-text">{{message.formatedData}}</a>
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
  .date-text{
    color: rgb(66, 66, 66);
    font-family: 'Poppins',sans-serif;
    font-size: 10px;
    margin-right: 10%;
    font-weight: bold;
  }
  .message{
    max-width: 30%;
    word-break: break-all;
    width:auto;
    background: rgb(213, 255, 232);
    padding:10px;
    border-radius: 10px;
    margin-right: 10%;
    transition: 0.3s;
    margin-bottom: 20px;
  }
  .message-text{
    color: black;
    font-size: 1.5em;
    font-family: 'Open Sans',sans-serif;
  }
</style>
