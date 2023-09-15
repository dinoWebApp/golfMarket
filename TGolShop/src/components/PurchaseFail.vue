<template>

  <!-- 결제 실패 페이지 -->
  <div class="container d-flex justify-content-center">
    <div style="width:80%;" class="border mt-5">
      
      <div style="font-size:large;" class="d-none d-sm-block mt-5 mb-3">
        결제를 실패하였습니다.
      </div>
      <div style="font-size:medium;" class="d-block d-sm-none mt-5 mb-3">
        결제를 실패하였습니다.
      </div>
      
      <button @click="clickHome" style="font-weight: bold; font-size: large;" class="btn btn-danger me-1 mb-5 mt-2">홈으로</button>
      <button @click="clickBack" style="font-weight: bold; font-size: large;" class="btn btn-success ms-1 mb-5 mt-2">이전페이지</button>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name:'PurchaseFail',
  setup() {
    const router = useRouter();

    function clickHome() {
      router.push({path : '/'});
    }

    function clickBack() {
      router.go(-1);
    }
    return {clickHome, clickBack}
  }
}
</script>

<style>

</style>