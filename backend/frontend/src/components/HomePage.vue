<template>
  <div v-if="profileModal" id="profile-xs" class="list-group d-block d-sm-none">
    <a @click="mypage" class="list-group-item list-group-item-action">마이페이지</a>
    <a @click="cart" class="list-group-item list-group-item-action">장바구니</a>
    <a @click="profileLogout" class="list-group-item list-group-item-action">로그아웃</a>
    <a @click="profileDelete" id="mypageDelete" class="list-group-item list-group-item-action" style="background-color:red; color:white; font-weight:bold;">닫기</a>
  </div>
  <div v-if="profileModal" id="profile-sm" class="list-group d-none d-sm-block d-md-none">
    <a @click="mypage" class="list-group-item list-group-item-action">마이페이지</a>
    <a @click="cart" class="list-group-item list-group-item-action">장바구니</a>
    <a @click="profileLogout" class="list-group-item list-group-item-action">로그아웃</a>
    <a @click="profileDelete" id="mypageDelete" class="list-group-item list-group-item-action" style="background-color:red; color:white; font-weight:bold;">닫기</a>
  </div>
  <header class="p-3 text-bg-white">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="col-lg-3 col-md-3 col-sm-4 col-5 col-xl-2 me-lg-4">
          <div>
            <img src="../assets/tgolshop1.jpeg" class="img-fluid" alt="logo">
          </div>
          
        </a>


        <div class="col-10 col-lg-6 col-xl-7 col-sm-6 col-md-6 mb-3 mb-lg-0 me-lg-3">
          <div class="search_inner">
            <div class="search_box container-fluid">
              <input @keyup.enter="clickSearch" type="text" name="keyword" v-bind:value="searchText" @input="inputSearch" placeholder="쇼핑몰 검색창입니다." class="search_in col-10" maxlength="30">
              <button @click="clickSearch" style="float:right" type="button" class="btn btn-outline-white col-1"><i class="bi bi-search"></i></button>
            </div>
          </div>
        </div>

        <div v-if="loginInfo === false && myInfo === false" class="text-end col-md-3 col-lg-auto d-none d-md-block ms-xl-5" >
          <button @click="login" type="button" class="btn btn-out-secondary me-2" style="color:white; font-weight:bold; background-color:white;">로그인</button>
          <button @click="signUp" type="button" id="sign-up" class="btn " style="background-color:#009300; color:white; font-weight:bold; background-color:white;">회원가입</button>
        </div>
        <div v-if="loginInfo" class="text-end col-md-3 col-lg-auto d-none d-md-block ms-xl-5" >
          <button @click="login" type="button" class="btn btn-outline-secondary me-2" style="font-weight:bold;">로그인</button>
          <button @click="signUp" type="button" id="sign-up" class="btn " style="background-color:#009300; color:white; font-weight:bold;">회원가입</button>
        </div>
        <div v-if="myInfo" class="text-end col-md-3 col-lg-auto d-none d-md-block ms-xl-5">
          <h6> {{nickName}} 님, 환영합니다!</h6>
          <button @click="mypage" type="button" class="btn btn-warning btn-sm me-1" style="color:white; font-weight:bold;">마이페이지</button>
          <button @click="logout" type="button" class="btn btn-danger btn-sm" style=" color:white; font-weight:bold;">로그아웃</button>
        </div>
        <div class="d-block d-md-none col-sm-2 col-2">
          <i @click="profileClick" id="mypage" class="bi bi-person ms-4" style=""></i>
        </div>
        
        
        
      </div>
    </div>
  </header>
  
  <nav class="container navbar navbar-dark navbar-expand-lg" aria-label="Eighth navbar example">
    <div class="container">
      <!-- <a class="navbar-brand" href="#">Container</a> -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-center" id="navbarsExample07">
        <ul class="navbar-nav mb-2 mb-lg-0 " style="align-items : center;">
          <li class="nav-item">
            <a @click="clickDivide" class="menu nav-link active" aria-current="page" >드라이버</a>
          </li>
          <div class="updown d-none d-lg-block"></div>
          <li class="nav-item">
            <a @click="clickDivide"  class="menu nav-link active" aria-current="page">우드/유틸</a>
          </li>
          <div class="updown d-none d-lg-block"></div>
          <li class="nav-item">
            <a @click="clickDivide" class="menu nav-link active" aria-current="page">아이언</a>
          </li>
          <div class="updown d-none d-lg-block"></div>
          <li class="nav-item">
            <a @click="clickDivide" class="menu nav-link active" aria-current="page">웨지</a>
          </li>
          <div class="updown d-none d-lg-block"></div>
          <li class="nav-item">
            <a @click="clickDivide" class="menu nav-link active" aria-current="page">퍼터</a>
          </li>
          <div class="updown d-none d-lg-block"></div>
          <li class="nav-item">
            <a @click="clickDivide" class="menu nav-link active" aria-current="page">골프백/볼/기타</a>
          </li>
          <div class="updown d-none d-lg-block"></div>
          <li class="nav-item">
            <a @click="clickDivide" class="menu nav-link active" aria-current="page">헤드/샤프트</a>
          </li>
          <div class="updown d-none d-lg-block"></div>
          <li class="nav-item">
            <a @click="clickDivide" class="menu nav-link active" aria-current="page">풀세트</a>
          </li>
          <div class="updown d-none d-lg-block"></div>
          <li class="nav-item ms-2">
            <a @click="nonMemberOrder" style="font-size:14px" class="menu nav-link active" aria-current="page">비회원 주문조회</a>
          </li>
          
        </ul>
        
      </div>
    </div>
  </nav>
  <router-view :key="$route.fullPath" @loginData='loginUpdate'></router-view>
 
</template>

<script>
import { ref } from '@vue/reactivity';
import { useRouter } from 'vue-router'
import axios from 'axios';
export default {
  name: 'HomePage',

  setup() {
    const router = useRouter();
    let loginInfo = ref(false);
    let myInfo = ref(false);
    let nickName = ref('');
    let profileModal = ref(false);
    let searchText = ref('');

    axios.get('/api/customer/login-check')
    .then(res=>{
      
      if(res.data === 'not login') {
        loginInfo.value = true;
        myInfo.value = false;
      } else {
        nickName.value = res.data;
        loginInfo.value = false;
        myInfo.value = true;
      }
    });

    function login() {
      router.push({path:'/customer/login'});
    }

    function signUp() {
      router.push({path:'/customer/sign-up'});
    }

    function logout() {
      axios.get('/api/customer/logout')
      .then(res=>{
        
        if(res.data === 'logout success') {
          alert('로그아웃 되었습니다.');
          loginInfo.value = true;
          myInfo.value = false;
          router.push({path:'/'});
        }
      }).catch(err=>{
        console.log(err);
      })
    }

    function profileLogout() {
      axios.get('/api/customer/logout')
      .then(res=>{
       
        if(res.data === 'logout success') {
          alert('로그아웃 되었습니다.')
          loginInfo.value = true;
          myInfo.value = false;
          router.push({path:'/'});
          profileModal.value = false;
        }
      }).catch(err=>{
        console.log(err);
      })
    }

    function loginUpdate(loginData) {
      nickName.value = loginData[0]
      loginInfo.value = loginData[1];
      myInfo.value = loginData[2];
    }

    function profileClick() {
      axios.get('/api/customer/login-check')
      .then(res=>{
        if (res.data === 'not login') {
          alert('로그인이 필요합니다.');
          router.push({path:'/customer/login'});
        } else profileModal.value = true;
      })
    }

    function profileDelete() {
      profileModal.value = false;
    }

    function mypage() {
      profileModal.value = false;
      router.push({name:'MyPage', query:{nickName:nickName.value, cart: 0}});
    }

    function cart() {
      profileModal.value = false;
      router.push({name:'MyPage', query:{nickName:nickName.value, cart: 1}});
    }

    function inputSearch(e) {
      searchText.value = e.target.value;
    }

    function clickSearch() {
      router.push({name : 'SearchPage', query : {searchText : searchText.value}});
    }

    function clickDivide(e) {
      let korDivide = e.target.innerText;
      let engDivide = '';
      switch(e.target.innerText) {
        case '드라이버' :
          engDivide = 'driver';
          break;
        case '우드/유틸' :
          engDivide = 'wu';
          break;
        case '아이언' :
          engDivide = 'iron';
          break;
        case '웨지' :
          engDivide = 'wedge';
          break;
        case '퍼터' :
          engDivide = 'putter';
          break;
        case '골프백/볼/기타' :
          engDivide = 'etc';
          break;
        case '헤드/샤프트' :
          engDivide = 'headShaft';
          break;
        case '풀세트' :
          engDivide = 'fullSet';
          break;
      }
      router.push({name : 'ProductsPage', query : {korDivide : korDivide, engDivide : engDivide}});

    }

    function nonMemberOrder() {
      router.push({name : 'NonMemberPage'});
    }



    return {login, signUp, loginInfo, myInfo, nickName, logout, loginUpdate, profileClick, profileModal, profileDelete,
    profileLogout, mypage, searchText, inputSearch, clickSearch, clickDivide, nonMemberOrder, cart};
  
  }
}
</script>

<style>
#mypageDelete:hover{
  background-color:crimson !important;
}

#mypageDelete:active{
  background-color:firebrick !important;
}

#profile-xs{
  width: 30%;
  position: fixed;
  left: 65%;
  top: 15%;
  z-index: 999;
}

#profile-sm{
  width: 25%;
  position: fixed;
  left: 65%;
  top: 8%;
  z-index: 999;
}

#sign-up:hover{
  background-color:green !important;
}

#mypage{
  color:darkgrey;
  font-size:40px;
  cursor: pointer;
  /* float:right; */
}

/* #mypage-click:active{
  border-style: none !important;
} */

.nav-item .menu {
  color:white;
  font-weight:bold;
  font-size:18px;
}

.nav-item:hover a{
  color: #2c3e50 !important;
  cursor: pointer;
}

.nav-item:visited a{
  color: #2c3e50 !important;
}

.navbar{
  background-color: #53B300;
}

.updown {
  background-color: white;
  width: 1px;
  height: 20px;
}
/* .dropdown:hover .dropdown-menu {
  display: block;
  margin-top: 0;
} */
.search_box {
  /* position: relative; */
  width: 470px;
  height: 38px;
  background-color: #FFFFFF;
}

.search_in {
  float: left;
  height: 37px;
  line-height: 37px;
  background: transparent;
  outline: none;
  /* padding: 0px 14px; */
  /* width: 300px; */
  color: black;
  border: 0px;
  font-size: 15px;
}

.search_inner {
  border-bottom: solid 3px #33cc00;
}

</style>