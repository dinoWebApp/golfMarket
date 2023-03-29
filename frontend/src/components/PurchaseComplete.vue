<template>
  
  <div class="container d-flex justify-content-center">
    <div style="width:80%;" class="border mt-5">
      <div style="font-size: x-large;" class="mt-5 mb-3">
        구매를 성공적으로 완료하였습니다.
      </div>

      <button @click="clickHome" style="font-weight: bold; font-size: large;" class="btn btn-danger me-1 mb-5 mt-2">홈으로</button>
      <button @click="clickPurchaseList" style="font-weight: bold; font-size: large;" class="btn btn-success ms-1 mb-5 mt-2">주문목록</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router'
import { ref } from 'vue';
export default {
  name:'PurchaseComplete',
  setup() {
    const router = useRouter();
    let nickName = ref('');
    axios.get('/api/product/submit')
    .then(result=>{
      nickName.value = result.data;
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
    return {clickHome, clickPurchaseList};
  }
}
</script>

<style>

</style>