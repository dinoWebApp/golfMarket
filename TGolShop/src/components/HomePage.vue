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


        <div class="col-8 col-lg-5 col-xl-6 col-sm-4 col-md-4">
          <input @keyup.enter="clickSearch" type="text" name="keyword" v-bind:value="searchText" @input="inputSearch" placeholder="쇼핑몰 검색창입니다." class="col-5 form-control border-success" maxlength="30">
        </div>
        <button @click="clickSearch" style="font-weight: bold;" class="btn btn-light col-1 d-block d-sm-none border btn-sm ms-1"><i class="bi bi-search"></i></button>
        <button @click="clickSearch" style="font-weight: bold;" class="btn btn-light col-sm-1 d-none d-sm-block col-md-1 ms-1 me-lg-3 border"><i class="bi bi-search"></i></button>
        

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
        <div class="d-block d-md-none col-sm-1 col-1">
          <i @click="profileClick" id="mypage" class="bi bi-person ms-4" style=""></i>
        </div>
        
        
        
      </div>
    </div>
  </header>
  
  <nav class="container navbar navbar-dark navbar-expand-lg" aria-label="Eighth navbar example">
    <div class="container">
      <button class="navbar-toggler" id="menuToggle" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-center" id="navbarsExample07">
        <ul class="navbar-nav mb-2 mb-lg-0 " style="align-items : center;">
          <li class="nav-item">
            <a @click="clickDivide" class="menu nav-link active me-3 ms-3" aria-current="page" >전체 상품</a>
          </li>
          <!-- <div class="updown d-none d-lg-block"></div> -->
          <li class="nav-item">
            <a @click="clickDivide"  class="menu nav-link active me-3 ms-3" aria-current="page">골프클럽</a>
          </li>
          <li class="nav-item">
            <a @click="clickDivide" class="menu nav-link active me-3 ms-3" aria-current="page">헤드</a>
          </li>
          <li class="nav-item">
            <a @click="clickDivide" class="menu nav-link active me-3 ms-3" aria-current="page">샤프트/그립</a>
          </li>
          <li class="nav-item">
            <a @click="clickDivide" class="menu nav-link active me-3 ms-3" aria-current="page">골프공/골프백</a>
          </li>
          <li class="nav-item">
            <a class="menu nav-link active me-3 ms-3" href="/fitting" aria-current="page">피팅문의</a>
          </li>
          <li class="nav-item">
            <a @click="clickDivide" class="menu nav-link active me-3 ms-3" href="/customerCenter" aria-current="page">고객센터</a>
          </li>
          <li class="nav-item ms-2">
            <a @click="nonMemberOrder" style="font-size:14px" class="nav-link active ms-3 me-3" aria-current="page">비회원 주문조회</a>
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
import { onMounted} from 'vue';
export default {
  name: 'HomePage',

  setup() {
    const router = useRouter();
    let loginInfo = ref(false);
    let myInfo = ref(false);
    let nickName = ref('');
    let profileModal = ref(false);
    let searchText = ref('');
    const navbarToggler = ref(null);
    const navbarContent = ref(null);

   

    onMounted(()=>{
      navbarToggler.value = document.querySelector('.navbar-toggler');
      navbarContent.value = document.querySelector('#navbarsExample07');
    })

    
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
      navbarToggler.value.setAttribute('aria-expanded', 'false');
      navbarToggler.value.classList.remove('show');
      navbarContent.value.classList.remove('show');
      axios.get('/api/customer/login-check')
      .then(res=>{
        if (res.data === 'not login') {
          alert('로그인이 필요합니다.');
          router.push({path:'/customer/login'});
        } else profileModal.value = true;
      })
    }

    function profileDelete() {
      navbarToggler.value.setAttribute('aria-expanded', 'false');
      navbarToggler.value.classList.remove('show');
      navbarContent.value.classList.remove('show');
      profileModal.value = false;
    }

    function mypage() {
      navbarToggler.value.setAttribute('aria-expanded', 'false');
      navbarToggler.value.classList.remove('show');
      navbarContent.value.classList.remove('show');
      profileModal.value = false;
      router.push({name:'MyPage', query:{nickName:nickName.value, cart: 0}});
    }

    function cart() {
      navbarToggler.value.setAttribute('aria-expanded', 'false');
      navbarToggler.value.classList.remove('show');
      navbarContent.value.classList.remove('show');
      profileModal.value = false;
      router.push({name:'MyPage', query:{nickName:nickName.value, cart: 1}});
    }

    function inputSearch(e) {
      searchText.value = e.target.value;
    }

    function clickSearch() {
      navbarToggler.value.setAttribute('aria-expanded', 'false');
      navbarToggler.value.classList.remove('show');
      navbarContent.value.classList.remove('show');
      router.push({name : 'SearchPage', query : {searchText : searchText.value}});
    }

    function clickDivide(e) {
      let korDivide = e.target.innerText;
      let engDivide = '';
      navbarToggler.value.setAttribute('aria-expanded', 'false');
      navbarToggler.value.classList.remove('show');
      navbarContent.value.classList.remove('show');
      switch(e.target.innerText) {
        case '전체 상품' :
          engDivide = 'totalProducts';
          break;
        case 'club' :
          engDivide = 'club';
          break;
        case '헤드' :
          engDivide = 'head';
          break;
        case '샤프트/그립' :
          engDivide = 'shaftGrip';
          break;
        case '골프공/골프백' :
          engDivide = 'ballBag'
          break;
      }
      router.push({name : 'ProductsPage', query : {korDivide : korDivide, engDivide : engDivide}});

    }

    function nonMemberOrder() {
      navbarToggler.value.setAttribute('aria-expanded', 'false');
      navbarToggler.value.classList.remove('show');
      navbarContent.value.classList.remove('show');
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
}


.nav-item .menu {
  color:white;
  font-weight:bold;
  font-size:17px;
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


</style>