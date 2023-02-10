<template>
  <div class="container mt-3 col-9 col-sm-7 col-md-6 col-lg-5 col-xxl-4 border">
    
      <div class="mt-5">
        <img class="mb-4 col-6 col-md-6" src="../assets/tgolshop.png" alt="dd">
      </div>
      
      <h1 class="h3 mb-3 fw-normal">로그인</h1>

      <div class="form-floating mb-2">
        <input type="text" class="form-control" id="floatingInput" placeholder="아이디" @keyup.enter="login" v-model="id">
        <label for="floatingInput">아이디</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="패스워드" autocomplete="off" @keyup.enter="login" v-model="pw">
        <label for="floatingPassword">패스워드</label>
      </div>

      
      <button @click="login" class="w-100 btn btn-lg btn-success mt-4 mb-3" style="font-weight:bold;">로그인</button>
      <button class="w-100 btn btn-lg mb-3" @click="signUp" id="naver" style="color:white; font-weight:bold; background-color:#12D308;">간편 회원가입</button>

      
      <!-- <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div> -->

    
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import axios from 'axios';
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

    axios.get('/api/customer/login-check')
    .then(res=>{
      console.log(res.data);
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
        console.log(res.data);
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



    return{signUp, login, id, pw};
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
</style>