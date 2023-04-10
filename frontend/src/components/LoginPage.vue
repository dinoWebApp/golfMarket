<template>
  <div v-if="loginModal" class="container mt-3 col-9 col-sm-7 col-md-6 col-lg-5 col-xxl-4 border">
    <div class="mt-5">
      <img class="mb-4 col-6 col-md-6" src="../assets/tgolshop.png" alt="dd">
    </div>
    <h1 class="h3 mb-3 fw-normal">로그인</h1>
    <div class="form-floating mb-2">
      <input type="text" class="form-control" id="floatingIdInput" placeholder="아이디" @keyup.enter="login" v-model="id">
      <label for="floatingIdInput">아이디</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="패스워드" autocomplete="off" @keyup.enter="login" v-model="pw">
      <label for="floatingPassword">패스워드</label>
    </div>
    <div align="left" class="mt-1">
      <span @click="findId" id="find-id" class="ms-1"> 아이디 찾기 </span> <span style="color:darkgray; font-size: small;">/</span> <span @click="clickFindPw" id="find-pw"> 비밀번호 재설정 </span>
    </div>
    <button @click="login" class="w-100 btn btn-lg btn-success mt-3 mb-2" style="font-weight:bold;">로그인</button>
    <button class="w-100 btn btn-lg mb-3" @click="signUp" id="naver" style="color:white; font-weight:bold; background-color:#12D308;">간편 회원가입</button>
  </div>

  <div v-if="findIdModal">
    <div class="container mt-3 col-9 col-sm-7 col-md-6 col-lg-5 col-xxl-4 border">
      <div class="mt-3 mb-3">
        <h1 class="h3 mb-3 fw-normal">아이디 찾기</h1>
        <div class="form-floating mb-2">
          <input type="text" class="form-control" id="floatingNickName" placeholder="닉네임" @keyup.enter="findIdSubmit" v-bind:value="nickName" @input="inputNickName">
          <label for="floatingNickName">닉네임</label>
        </div>
        <div class="form-floating">
          <input type="text" class="form-control" id="floatingPhoneNum" placeholder="휴대폰번호" autocomplete="off" @keyup.enter="findIdSubmit" v-model="phoneNum">
          <label for="floatingPhoneNum">휴대폰번호</label>
        </div>
        <button @click="findIdSubmit" class=" btn btn-danger mt-3 mb-2" style="font-weight:bold;">아이디 찾기</button>
        <button @click="backPage" class="btn btn-success mt-3 mb-2 ms-1" style="font-weight:bold;">이전 페이지</button>
      </div>
    </div>
  </div>

  <div v-if="getIdModal">
    <div class="container mt-3 col-9 col-sm-7 col-md-6 col-lg-5 col-xxl-4 border">
      <div class="mt-3 mb-3">
        <h1 class="h3 mb-3 fw-normal">아이디 찾기</h1>
        <div class="mt-3 mb-2">
          <span>고객님의 아이디는 {{ getId }} 입니다.</span>
        </div>
        <button @click="clickLoginModal" class=" btn btn-danger mt-3 mb-2" style="font-weight:bold;">로그인</button>
        <button @click="clickFindPw" class="btn btn-success mt-3 mb-2 ms-1" style="font-weight:bold;">비밀번호 재설정</button>
      </div>
    </div>
  </div>
  <div v-if="changePwModal">
    <div class="container mt-3 col-9 col-sm-7 col-md-6 col-lg-5 col-xxl-4 border">
      <div class="mt-3 mb-3">
        <h1 class="h3 mb-3 fw-normal">비밀번호 재설정</h1>
        <div class="form-floating mb-2">
          <input type="password" class="form-control" id="newPw" placeholder="새로운 비밀번호 (8~20자)" v-model="changedPw" autocomplete="off" maxlength="20">
          <label for="newPw">새로운 비밀번호 (8~20자)</label>
          <div class="ms-1" style="float:left; color:red;" v-if="pwValid === false && changedPw !== ''">8~20자 입력</div>
        </div>
        
        <div class="form-floating">
          <input type="password" class="form-control" id="newPwCheck" placeholder="비밀번호 확인" v-model="changedPwCheck" autocomplete="off" maxlength="20">
          <label for="newPwCheck">비밀번호 확인</label>
          <div class="ms-1" style="float:left; color:red;" v-if="pwCheckValid === false && changedPwCheck !== ''">비밀번호 불일치</div>
        </div>
        <button @click="changePw" class=" btn btn-danger mt-3 mb-2" style="font-weight:bold;">비밀번호 재설정</button>
        <button @click="backPage" class="btn btn-success mt-3 mb-2 ms-1" style="font-weight:bold;">이전 페이지</button>
      </div>
    </div>
  </div>
  <div v-if="infoCheckModal">
    <div class="container mt-3 col-9 col-sm-7 col-md-6 col-lg-5 col-xxl-4 border">
      <div class="mt-3 mb-3">
        <h1 class="h3 mb-3 fw-normal">비밀번호 재설정</h1>
        <div class="form-floating mb-2">
          <input type="text" class="form-control" id="floatingId" placeholder="아이디" @keyup.enter="findPwSubmit" v-model="checkId" >
          <label for="floatingId">아이디</label>
        </div>
        <div class="form-floating mb-2">
          <input type="text" class="form-control" id="floatingNickName2" placeholder="닉네임" @keyup.enter="findPwSubmit" v-bind:value="nickName" @input="inputNickName">
          <label for="floatingNickName2">닉네임</label>
        </div>
        <div class="form-floating">
          <input type="text" class="form-control" id="floatingPhoneNum2" placeholder="휴대폰번호" autocomplete="off" @keyup.enter="findPwSubmit" v-model="phoneNum">
          <label for="floatingPhoneNum2">휴대폰번호</label>
        </div>
        <button @click="findPwSubmit" class=" btn btn-danger mt-3 mb-2" style="font-weight:bold;">비밀번호 재설정</button>
        <button @click="backPage" class="btn btn-success mt-3 mb-2 ms-1" style="font-weight:bold;">이전 페이지</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { watch } from 'vue';
export default {
  name:'LoginPage',
  emits:['loginData'],
  setup(props, {emit}) {
    const router = useRouter();
    let id = ref();
    let pw = ref();
    let loginData = ref({
      id : id,
      pw : pw
    });
    let loginModal = ref(true);
    let findIdModal = ref(false);
    let findPwModal = ref(false);
    let nickName = ref('');
    let phoneNum = ref('');
    let getId = ref('');
    let getIdModal = ref(false);
    let changedPw = ref('');
    let changedPwCheck = ref('');
    let changePwModal = ref(false);
    let pwValid = ref(false);
    let pwCheckValid = ref(false);
    let infoCheckModal = ref(false);
    let checkId = ref('');

    axios.get('/api/customer/login-check')
    .then(res=>{
      
      if(res.data !== 'not login') {
        router.push({path:'/'});
      }
    })

    function signUp() {
      router.push({path:'/customer/sign-up'});
    }

    function login() {
      axios.post('/api/customer/login', loginData.value)
      .then(res=>{
        
        if (res.data === 'login fail') {
          alert('아이디 또는 비밀번호가 일치하지 않습니다.')
        } else {
          emit('loginData', [res.data, false, true]);
          router.push({path:'/'});
        }
      }).catch(err=>{
        console.log(err);
      })
    }

    function findId() {
      findIdModal.value = true;
      findPwModal.value = false;
      loginModal.value = false;
    }

    function inputNickName(e) {
      nickName.value = e.target.value;
    }

    function findIdSubmit() {
      if(nickName.value === '' || phoneNum.value === '') {
        alert('정보를 모두 입력해 주십시오');
      } else {
        axios.get('/api/customer/findId?nickName=' + nickName.value + "&phoneNum=" + phoneNum.value)
        .then(result=>{
          if(result.data === 'wrong nickName') {
            alert('존재하지 않는 닉네임입니다.');
          } else if(result.data === 'wrong phoneNum') {
            alert('휴대폰 번호가 일치하지 않습니다.');
          } else {
            getId.value = result.data;
            findIdModal.value = false;
            getIdModal.value = true;
            nickName.value = '';
            phoneNum.value = '';
          }
        })
        .catch(err=>{
          console.log(err);
        })
      }
    }

    function findPwSubmit() {
      if(nickName.value === '' || phoneNum.value === '' || checkId.value === '') {
        alert('정보를 모두 입력해 주십시오');
      } else {
        axios.get('/api/customer/findPw?nickName=' + nickName.value + "&phoneNum=" + phoneNum.value + '&id=' + checkId.value)
        .then(result=>{
          if(result.data === 'wrong id') {
            alert('존재하지 않는 아이디입니다.');
          }
          else if(result.data === 'wrong nickName') {
            alert('닉네임이 일치하지 않습니다.');
          } else if(result.data === 'wrong phoneNum') {
            alert('휴대폰 번호가 일치하지 않습니다.');
          } else {
            changePwModal.value = true;
            infoCheckModal.value = false;
            findIdModal.value = false;
            getIdModal.value = false;
          }
        })
        .catch(err=>{
          console.log(err);
        })
      }
    }

    function backPage() {
      findIdModal.value = false;
      loginModal.value = true;
      changePwModal.value = false;
      infoCheckModal.value = false;
    }

    function clickLoginModal() {
      loginModal.value = true;
      getIdModal.value = false;
      changePwModal.value = false;
    }

    function changePw() {
      if (pwValid.value === false) {
        alert('비밀번호는 8~20자를 입력해야 합니다.')
      } else if (pwCheckValid.value === false) {
        alert("'비밀번호'와 '비밀번호 확인'이 일치하지 않습니다.");
      } else {
        let data = {
          pw : changedPw.value,
          nickName : nickName.value
        };
        axios.put('/api/customer/changePw', data)
        .then(()=>{
          alert('비밀번호가 재설정되었습니다.');
          changePwModal.value = false;
          loginModal.value = true;
        })
        .catch(err=>{
          console.log(err);
        })
      }
    }

    function clickChangePw() {
      changePwModal.value = true;
      loginModal.value = false;
      getIdModal.value = false;
      infoCheckModal.value = false;
    }
     
    function clickFindPw() {
      infoCheckModal.value = true;
      changePwModal.value = false;
      loginModal.value = false;
      getIdModal.value = false;
    }

    watch(changedPw, (newValue, oldValue)=>{
      console.log({newValue, oldValue});
      if (newValue.length >= 8 && newValue.length <= 20) {
        pwValid.value = true;
      } else pwValid.value = false;
      if (newValue === '') {
        document.getElementById('newPw').style.borderColor = '';
        document.getElementById('newPw').style.borderWidth = '';
        pwCheckValid.value = false;
        document.getElementById('newPwCheck').style.borderColor = '';
        document.getElementById('newPwCheck').style.borderWidth = '';
      } else if(pwValid.value === true) {
        document.getElementById('newPw').style.borderColor = 'green';
        document.getElementById('newPw').style.borderWidth = '2px';
      } else if(pwValid.value === false) {
        document.getElementById('newPw').style.borderColor = 'red';
        document.getElementById('newPw').style.borderWidth = '2px';
      }

      if (newValue === changedPwCheck.value && newValue !== '') {
        pwCheckValid.value = true;
        document.getElementById('newPwCheck').style.borderColor = 'green';
        document.getElementById('newPwCheck').style.borderWidth = '2px';
      } else if(newValue !== changedPwCheck.value){
        pwCheckValid.value = false;
        document.getElementById('newPwCheck').style.borderColor = 'red';
        document.getElementById('newPwCheck').style.borderWidth = '2px';
      }
    });

    watch(changedPwCheck, (newValue, oldValue)=>{
      console.log({newValue, oldValue});

      if (newValue === '') {
        pwCheckValid.value = false;
        document.getElementById('newPwCheck').style.borderColor = '';
        document.getElementById('newPwCheck').style.borderWidth = '';
      } else if(newValue === changedPw.value) {
        pwCheckValid.value = true;
        document.getElementById('newPwCheck').style.borderColor = 'green';
        document.getElementById('newPwCheck').style.borderWidth = '2px';
      } else if(newValue !== changedPw.value) {
        pwCheckValid.value = false;
        document.getElementById('newPwCheck').style.borderColor = 'red';
        document.getElementById('newPwCheck').style.borderWidth = '2px';
      }
    });



    return{signUp, login, id, pw, findIdModal, findPwModal, loginModal, findId, nickName, phoneNum, inputNickName, findIdSubmit, backPage,
    getId, getIdModal, changedPw, changePwModal, clickLoginModal, changePw, clickChangePw, changedPwCheck, pwValid, pwCheckValid, infoCheckModal,
    checkId, findPwSubmit, clickFindPw};
  }
}
</script>

<style>
  #naver:hover{
    background-color: #07B70D !important;
  }
  #kakao:hover{
    background-color: #d8b208!important;
  }

  #find-id {
    text-decoration: none;
    color:darkgray;
    font-size: small;
  }

  #find-id:hover {
    color:black;
    cursor: pointer;
  }

  #find-pw {
    text-decoration: none;
    color:darkgray;
    font-size: small;
  }

  #find-pw:hover {
    color:black;
    cursor: pointer;
  }
</style>