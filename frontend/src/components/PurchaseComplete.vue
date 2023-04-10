<template>
  
  <div class="container d-flex justify-content-center">
    <div style="width:80%;" class="border mt-5">
      
      <div style="font-size: x-large;" class="mt-5 mb-3">
        구매를 성공적으로 완료하였습니다.
      </div>
      <div class="mb-3" v-if="login === false">
        <span>주문 번호: {{orderId}}</span> <span style="color:red">(비회원께서는 주문 조회를 위해 반드시 숙지하셔야 합니다.)</span>
      </div>
      <button @click="clickHome" style="font-weight: bold; font-size: large;" class="btn btn-danger me-1 mb-5 mt-2">홈으로</button>
      <button v-if="login" @click="clickPurchaseList" style="font-weight: bold; font-size: large;" class="btn btn-success ms-1 mb-5 mt-2">주문목록</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue';
export default {
  name:'PurchaseComplete',
  setup() {
    const router = useRouter();
    const route = useRoute();
    let nickName = ref('');
    let login = ref(true);
    let orderId = ref(route.query.orderId)
    axios.get('/api/product/submit')
    .then(result=>{
      if(result.data === 'need login') {
        login.value = false;
      } else nickName.value = result.data;
    })
    .catch(err=>{
      console.log(err);
    });

    function clickHome() {
      router.push({path : '/'});
    }
    function clickPurchaseList() {
      router.push({name : 'MyPage', query : {nickName : nickName.value, cart : 0}});
    }
    return {clickHome, clickPurchaseList, orderId, login};
  }
}
</script>

<style>

</style>