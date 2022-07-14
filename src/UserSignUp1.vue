<template>
  <div id="app">
  <router-view>
      <form id=UserSignUp1 v-if="level" v-on:submit.prevent>
      <div class="input_group">
        <label for="email">이메일</label>
        <input type="text" name="email" id="email" v-model="email"><br>
        <label for="pw">비밀번호</label>
        <input type="password" name="pw" id="pw" v-model="PassWord"><br>
        <label for="pw_confirm">비밀번호 확인</label>
        <input type="password" name="pw_confirm" id="email" v-model="pwCheck">
      </div>
      <button id='next' @click="close1()">다 음</button>
    </form>

    <form id=UserSignUp2 v-if="NextLevel2" v-on:submit.prevent>
      <div class="input_group">
        <label for="user_name">이름</label>
        <input type="text" name="user_name" id="user_name" v-model="userName"><br>
        <label for="contact">연락처</label>
        <input type="text" name="contact" id="contact" v-model="contact"><br>
        <label for="address">주소</label>
        <input type="text" v-model="postcode" placeholder="우편번호" name="address">
        <input type="button" @click="execDaumPostcode()" value="우편번호 찾기" id="post"><br>
        <input type="text" id="address" placeholder="주소" v-model="Address"><br>
        <input type="text" id="detailAddress" placeholder="상세주소" v-model="detailAddress">
        <input type="text" id="extraAddress" placeholder="참고항목">
      </div>
      <button id="before" @click="close2_2()">이 전</button>
      <button id="next" @click="close2()">다 음</button>
    </form>

    <form id=SignEnd v-if="NextLevel3" v-on:submit.prevent>
      <div class="input_group">
      <p>카드 번호</p>
        <input type="text" class="moveNumber" onKeyup="inputMoveNumber(this);" maxlength="4" v-model="cardVal">&nbsp;-&nbsp;
        <input type="text" class="moveNumber" onKeyup="inputMoveNumber(this);" maxlength="4" v-model="cardVal">&nbsp;-&nbsp; 
        <input type="text" class="moveNumber" onKeyup="inputMoveNumber(this);" maxlength="4" v-model="cardVal">&nbsp;-&nbsp; 
        <input type="text" class="moveNumber" maxlength="4" v-model="cardVal">
      </div>
      <button id="next" @click="close3()">완료</button>
    </form>
    <form v-if="NextLevel4" v-on:submit.prevent>
      <p id='completion'> 회원가입이 완료되었습니다.</p>
    </form>
  </router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    
  },
  data() {
    return {
      level: true,
      NextLevel2 : false,
      NextLevel3 : false,
      NextLevel4 : false,
      passwordCheck: '',
      passwordCheckFlag: true,
      //우편번호
      postcode: "",
      address: "",
      extraAddress: "",
    }
    },
  computed: {
    emailValid() {
      return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(this.email);
    },
    passwordValid(){
      return /(?=.*[a-zA-ZS])(?=.*?[#?!@$%^&*-]).{8,24}/.test(this.PassWord);
    },
    contactValid(){
      return /^01([0|1|6|7|8|9 ])-?([0-9 ]{3,4})-?([0-9 ]{4})$/.test(this.contact);
    },
    usernameValid(){
      return /^([가-힣]{2,}|[a-zA-z]{3,})$/.test(this.userName);
    },
    cardValid(){
      return /^[0-9]{4}$/.test(this.cardVal);
    },
  },
  methods: {
    fn_submit() {
      var text = document.getElementById('contact').value;
      var regNumber = /[^0-9]/g;
      text.replace(regNumber, "");
    },
    close1(){
      if(this.emailValid == false){
        alert('이메일 형식을 지켜주세요');
      } else if(this.passwordValid == false){
        alert('영문대문자, 소문자, 특수문자 포함 8자 이상으로 해주세요')
      } else if(this.PassWord != this.pwCheck) {
        alert('비밀번호가 다릅니다')
      } else {
        this.level = false,
        this.NextLevel2 = true
      }
    },
    close2(){
      if(this.usernameValid == false) {
        alert('이름 형식이 맞지 않습니다')
      }
      if(this.contactValid == false){
        alert('연락처 형식에 맞지 않습니다.')
      } 
      if(this.usernameValid == true || this.contactValid == true) {
        this.NextLevel2 = false,
        this.NextLevel3 = true
      }
    },
    close2_2(){
      this.level = true,
      this.NextLevel2 = false
    },
    close3(){
      if(this.cardValid == false){
        alert("번호 입력이 잘못되었습니다");
      } else {
      this.NextLevel3 = false,
      this.NextLevel4 = true
      }
    },


    //주소
    execDaumPostcode() {
    new window.daum.Postcode({
      oncomplete: (data) => {
        if (this.extraAddress !== "") {
          this.extraAddress = "";
        }
        if (data.userSelectedType === "R") {
          // 사용자가 도로명 주소를 선택했을 경우
          this.address = data.roadAddress;
        } else {
          // 사용자가 지번 주소를 선택했을 경우(J)
          this.address = data.jibunAddress;
        }
 
        // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
        if (data.userSelectedType === "R") {
          // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            this.extraAddress += data.bname;
          }
          // 건물명이 있고, 공동주택일 경우 추가한다.
          if (data.buildingName !== "" && data.apartment === "Y") {
            this.extraAddress +=
              this.extraAddress !== ""
                ? `, ${data.buildingName}`
                : data.buildingName;
          }
          // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if (this.extraAddress !== "") {
            this.extraAddress = `(${this.extraAddress})`;
          }
        } else {
          this.extraAddress = "";
        }
        // 우편번호를 입력한다.
        this.postcode = data.zonecode;
        this.Address = data.roadAddress || data.jibunAddress;
        this.detailAddress = data.buildingName || data.apartment;
      },
      }).open();
    },
  },
}
</script>

<style>
* {margin:0; padding:0; box-sizing: border-box;}
body {overflow: hidden;position:relative;}
form {width:300px; height:400px; border:1px solid #000; position:relative; position:absolute; top:50vh; left:50%; transform: translate(-50%, -50%);}
label {width:100px; display: inline-block; text-align: left; padding-right:10px; padding-bottom: 5px; font-size: 13px;}
.input_group {margin:auto; text-align: center; transform: translateY(90px);}
input {display: inline-block; width:140px; height: 20px;}
.moveNumber {width: 50px;}
button {position:absolute; bottom: 30px; right:30px; padding:5px;}
#before {position:absolute; bottom: 30px; left:30px; padding:5px; width:50px;}
#next {position:absolute; bottom: 30px; right:30px; padding:5px;}
p {font-size: 20px; font-weight: bold; text-align: center; margin-bottom: 15px;}
#UserSignUp2 .input_group {text-align: left;}
#UserSignUp2 label {width:60px; margin:0 5px 0 20px;}
#UserSignUp2 input {margin-right:5px;}
#user_name,#contact {width:190px;}
input[name=address] {width:85px;}
#post {width:95px; margin-left: 5px;}
#address,#detailAddress,#extraAddress {width:255px; margin-left: 20px;}
#completion {line-height:400px;}
</style>