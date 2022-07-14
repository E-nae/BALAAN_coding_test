<template>
  <form>
    <div class="input_group">
      <label for="email">이메일</label>
      <input type="text" name="email" id="email"><br>
      <label for="pw">비밀번호</label>
      <input type="pw" name="pw" id="pw"><br>
      <label for="pw_confirm">비밀번호 확인</label>
      <input type="pw_confirm" name="pw_confirm" id="email">
    </div>
    <button @click="Research()">다 음</button>
  </form>
    <div id="app">
    <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    
  },
  methods: {
    Research() {
      this.$router.replace('UserSignUp2')
    }
  },
}
</script>

<style>
* {margin:0; padding:0; box-sizing: border-box;}
form {width:300px; height:400px; border:1px solid #000; margin: 25vh auto 0; position:relative; }
label {width:100px; display: inline-block; text-align: left; padding-right:10px; padding-bottom: 5px; font-size: 13px;}
.input_group {margin:auto; text-align: center; transform: translateY(100px);}
input {display: inline-block; width:140px; height: 20px;}
button {position:absolute; bottom: 30px; right:30px; padding:5px;}
</style>