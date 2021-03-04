<template>
  <div class="left-side">
    <a class="date-text">{{message.formatedData}}</a>
    <div class="message">
      <link rel="preconnect" href="https://fonts.gstatic.com">
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
      <a class="username-text">{{message.from}}</a>
      <a class="message-text">{{message.message}}</a>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    message:Object
  },
  created(){
      console.log(this.message)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .date-text{
    color: rgb(66, 66, 66);
    font-family: 'Poppins',sans-serif;
    font-size: 10px;
    margin-left: 10%;
    font-weight: bold;
  }
  .message{
    width:auto;
    display: flex;
    flex-direction: column;
    background: var(--manterwhite);
    padding:10px;
    border-radius: 10px;
    max-width: 30%;
    margin-left: 10%;
    margin-bottom: 20px;
  }
  .message-text{
    white-space: pre-wrap;
    color: var(--manterblack);
    font-family: 'Open Sans',sans-serif;
  }
  .username-text{
    color: rgb(34, 202, 118);
    font-family: 'Open Sans',sans-serif;
    font-size: 13px;
    font-weight: bold;
  }
</style>
