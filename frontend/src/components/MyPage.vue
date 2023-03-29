<template>
  <div class="container">
    <div align='left' class="mt-4">
      <h1>마이페이지</h1>
      <span style="color:darkgray">나의 주문 정보 및 개인 정보를 관리할 수 있습니다</span>
    </div>
    <hr/>

    <div class="border mt-3" v-if="updateKey === 0">
      <ul class="nav nav-pills nav-fill" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button @click="clickProdInfo" class="nav-link mypage-option active" id="purchase-data" data-bs-toggle="pill" type="button" role="tab" aria-selected="true">주문목록</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickRelProd" class="nav-link mypage-option" id="cart" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">장바구니</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickReview" class="nav-link mypage-option" id="reviews" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">리뷰관리</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickQna" class="nav-link mypage-option" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">1:1문의</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickQna" class="nav-link mypage-option" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">환불계좌관리</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickQna" class="nav-link mypage-option" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">포인트</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickQna" class="nav-link mypage-option col-3" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">정보수정</button>
        </li>
      </ul>
    </div>
    <div class="border mt-3" v-if="updateKey === 1">
      <ul class="nav nav-pills nav-fill" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button @click="clickProdInfo" class="nav-link mypage-option" id="purchase-data" data-bs-toggle="pill" type="button" role="tab" aria-selected="true">주문목록</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickRelProd" class="nav-link mypage-option active" id="cart" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">장바구니</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickReview" class="nav-link mypage-option" id="reviews" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">리뷰관리</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickQna" class="nav-link mypage-option" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">1:1문의</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickQna" class="nav-link mypage-option" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">환불계좌관리</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickQna" class="nav-link mypage-option" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">포인트</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickQna" class="nav-link mypage-option col-3" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">정보수정</button>
        </li>
      </ul>
    </div>

    <div v-if="purchaseList">
      <div>
        <div class="row mt-4">
          <div class="col-5"> <h6>주문상품 및 옵션</h6></div>
          <div class="col-2"><h6>수량</h6></div>
          <div class="col-3"> <h6>상품금액</h6></div>
          <div class="col-2"><h6>상태</h6></div>
        </div>
        <div class="row" v-for="item in mypageData.purchaseData" :key="item">
          <hr/>
          <div class="col-5">
            <div class="d-none d-lg-block"> <h5>{{item.productName}}</h5> </div>
            <div class="d-block d-lg-none"> <h6>{{item.productName}}</h6> </div>
            <div style="color:darkgray">{{item.optionText}}</div>
          </div>
          <div class="col-2 d-none d-lg-block"><h5> {{item.orderNum}} </h5></div>
          <div class="col-2 d-block d-lg-none"><h6> {{item.orderNum}} </h6></div>
          <div class="col-3">
            <div class="d-none d-lg-block" style="font-weight:bold;"> <h5>{{filter(item.totalPrice)}} 원</h5>  </div>
            <div class="d-block d-lg-none" style="font-weight:bold;"> <h6>{{filter(item.totalPrice)}} 원</h6>  </div>
          </div>
          <div class="col-2">
            <div style="font-size: small;" class="d-block d-md-none"> {{ item.currentState }} </div>
            <div class="d-none d-md-block"> {{ item.currentState }} </div>
          </div>
        </div>
      </div>
      
    </div>

  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useRoute} from 'vue-router'
import axios from 'axios';
export default {
  name: 'MyPage',
  setup() {
    const route = useRoute();
    let nickName = ref(route.query.nickName);
    let mypageData = ref({});
    let updateKey = ref(0);
    let purchaseList = ref(true);
    let cart = ref(false);

    axios.get('/api/customer/mypage?nickName=' + route.query.nickName)
    .then(res=>{
      mypageData.value = res.data;
      if(route.query.cart === '1') {
        updateKey.value++;
      }
    })
    .catch(err=>{
      console.log(err);
    })

    function filter(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
  
    return {nickName, updateKey, purchaseList, cart, mypageData, filter};
  }
}
</script>

<style>
.mypage-option {
  font-size: 15px !important;
  padding: 5px !important;
}
</style>