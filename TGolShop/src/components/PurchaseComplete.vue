<template>
  
  <div class="container d-flex justify-content-center">
    <div style="width:80%;" class="border mt-5">
      <div class="ms-1 me-1">
        <div style="font-size:large;" class="d-none d-sm-block mt-5 mb-3">
          구매를 성공적으로 완료하였습니다.
        </div>
        <div style="font-size:medium;" class="d-block d-sm-none mt-5 mb-3">
          구매를 성공적으로 완료하였습니다.
        </div>
        <div class="mb-3" v-if="login === false">
          <div style="font-size: small;">주문 번호: {{orderId}}</div> <div style="color:red; font-size: small;">(비회원께서는 주문 조회를 위해 반드시 숙지하셔야 합니다.)</div>
        </div>
        <div class="mb-3" v-if="payMethod === '무통장입금'">
          <div style="font-size: small;">무통장 입금 계좌: 대구은행 508-10-844784-5 티골프 피팅(김수환)</div>
          <div style="font-size: small;">입금 금액: {{ filter(parseInt(price)) }}원</div>
          <div style="color:red; font-size: small;">입금자 명과 주문정보가 일치해야 합니다.</div>
          <div style="color:red; font-size: small;">주문 날짜로부터 3일 내에 입금 처리가 되지 않으면 자동으로 주문 취소 처리됩니다.</div>
        </div>
        <button @click="clickHome" style="font-weight: bold; font-size: large;" class="btn btn-danger me-1 mb-5 mt-2">홈으로</button>
        <button v-if="login" @click="clickPurchaseList" style="font-weight: bold; font-size: large;" class="btn btn-success ms-1 mb-5 mt-2">주문목록</button>
      </div>
      
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
    let paymentKey = new URLSearchParams(window.location.search).get('paymentKey');
    let orderId = ref(route.query.orderId);
    let amount = new URLSearchParams(window.location.search).get('amount');
    let payMethod = ref(route.query.payMethod);
    let price = ref(route.query.price);
    
    let info = new URLSearchParams(window.location.search).get('info');
    let purchaseInfo = JSON.parse(info);
    const headers = {
      'Authorization': 'Basic dGVzdF9za196WExrS0V5cE5BcldtbzUwblgzbG1lYXhZRzVSOg==',
      'Content-Type': 'application/json'
    };

    // 결제승인 API 호출
    const data = {
      paymentKey: paymentKey,
      amount: amount,
      orderId: orderId.value
    };

    axios.get('/api/product/submit')
    .then(result=>{
      if(result.data === 'need login') {
        login.value = false;
        if(route.query.cashOrderId) {
          orderId.value = route.query.cashOrderId;
        }
      } else nickName.value = result.data;
    })
    .catch(error => {
      console.error(error);
    });

    if (paymentKey) {
      axios.post('https://api.tosspayments.com/v1/payments/confirm', data, { headers })
      .then(response => {
        return axios.post('/api/product/submitReport', response.data);
      })
      .then(()=>{

        if(Array.isArray(purchaseInfo)) {
          for(let i = 0; i < purchaseInfo.length; i++) {
            purchaseInfo[i].realPay = amount;
            purchaseInfo[i].orderId = parseInt(orderId.value);
           }
          return axios.post('/api/product/cartPurchase', purchaseInfo)
        } else {
          purchaseInfo.realPay = amount;
          purchaseInfo.orderId = parseInt(orderId.value);
          return axios.post('/api/product/purchase', purchaseInfo);
        }
      })
      .catch(error => {
        console.error(error);
      });
    }
    
    
   
    

    function clickHome() {
      router.push({path : '/'});
    }
    function clickPurchaseList() {
      router.push({name : 'MyPage', query : {nickName : nickName.value, cart : 0}});
    }

    function filter(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    return {clickHome, clickPurchaseList, orderId, login, payMethod, price, filter};
  }
}
</script>

<style>

</style>