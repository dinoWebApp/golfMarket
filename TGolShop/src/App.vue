<template>
  
  <router-view></router-view>
  
  <div class="container mt-5">
    <footer class="py-3 my-4">
      <ul class="nav justify-content-center border-bottom pb-3 mb-3">
        <li class="nav-item"><a href="#" @click="termsOfUse" class="nav-link px-2 text-muted">이용약관</a></li>
        <li class="nav-item"><a href="#" @click="privateinfo" class="nav-link px-2 text-muted">개인정보처리방침</a></li>
        <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">고객센터</a></li>
      </ul>
      <p style="font-size: 11px;" class="text-center text-muted">©TGOLSHOP,ALL RIGHTS RESERVED.티골프 피팅/대구광역시 동구 신서로22길 2, 1층 102호/대표:김수환/사업자등록번호:874-18-01201 소매업/통신판매업신고번호:2023-대구동구-0516/개인정보관리자:김수환/대표메일:sh7633@daum.net/대표전화:010-9184-1077</p>
    </footer>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';


export default {
  name: 'App',

  setup() {
    const router = useRouter();
    function termsOfUse() {
      router.push({path:'/termsofuse'});
    }
    
    function privateinfo() {
      router.push({path:'/privateinfo'});
    }

    return {termsOfUse, privateinfo};
  },
  components: {

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
 
}




</style>
