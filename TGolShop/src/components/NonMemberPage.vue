<template>
  <div>
    <!-- 주문번호로 주문조회 -->
    <div v-if="inputInfo">
      <div class="container mt-3 col-9 col-sm-7 col-md-6 col-lg-5 col-xxl-4 border">
        <div class="mt-3 mb-3">
          <h1 class="h3 mb-3 fw-normal">비회원 주문조회</h1>
          <div class="form-floating mb-2">
            <input type="text" class="form-control" id="floatingOrderId" placeholder="주문번호" @keyup.enter="submit" v-model="orderId">
            <label for="floatingOrderId">주문번호</label>
          </div>
          <div class="form-floating">
            <input type="text" class="form-control" id="floatingName" placeholder="성명" autocomplete="off" @keyup.enter="submit" v-bind:value="name" @input="inputName">
            <label for="floatingName">성명</label>
          </div>
          <button @click="submit" class=" btn btn-danger mt-3 mb-2 me-2" style="font-weight:bold;">조회</button>
          <button @click="home" class=" btn btn-success mt-3 mb-2" style="font-weight:bold;">홈으로</button>
        </div>
      </div>
    </div>

    <!-- 주문 내역 -->
    <div v-if="orderInfo">
      <div class="container mt-3 col-9 col-sm-7 col-md-6 col-lg-5 col-xxl-4 border mb-3">
        <h3 class="mt-3 mb-3">비회원 주문조회</h3>
        <hr/>
        <div class="row">
          <div class="col-4"> 상품명: </div>
          <div class="col-auto"> {{orderData.productName}} </div>
        </div>
        <hr/>
        <div class="row">
          <div class="col-4"> 옵션: </div>
          <div class="col-auto"> {{orderData.optionText}} </div>
        </div>
        <hr/>
        <div class="row">
          <div class="col-4"> 상품 개수: </div>
          <div class="col-auto"> {{orderData.orderNum}} </div>
        </div>
        <hr/>
        <div class="row">
          <div class="col-4"> 결제 가격: </div>
          <div class="col-auto"> {{orderData.totalPrice}} </div>
        </div>
        <hr/>
        <div class="row">
          <div class="col-4"> 성명: </div>
          <div class="col-auto"> {{orderData.name}} </div>
        </div>
        <hr/>
        <div class="row">
          <div class="col-4"> 배송지 주소: </div>
          <div class="col-auto" style="font-size: small;"> {{orderData.address}}, {{orderData.detailAddress}} </div>
        </div>
        <hr/>
        <div class="row">
          <div class="col-4"> 상품 상태: </div>
          <div class="col-auto"> {{orderData.currentState}} </div>
        </div>
        <hr/>
        <div class="row mb-3">
          <div class="col-4"> 운송장 번호: </div>
          <div class="col-auto"> {{orderData.deliNum}} </div>
        </div>
      </div>
      <button @click="deliCheck" style="font-weight:bold;" class="btn btn-danger me-2">배송조회</button>
      <button @click="backPage" style="font-weight:bold;" class="btn btn-success">이전 페이지</button>
    </div>
  </div>
  

</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
export default {
  name:'NonMemberPage',
  setup() {
    const router = useRouter();
    let orderId = ref();
    let name = ref('');
    let orderData = ref({});
    let inputInfo = ref(true);
    let orderInfo = ref(false);

    function inputName(e) {
      name.value = e.target.value;
    }


    // 주문번호 입력
    function submit() {
      if(orderId.value === '' || name.value === '') {
        alert('정보를 모두 입력하여 주십시오');
      } else {
        axios.get('/api/nonMemberOrder?orderId=' + orderId.value + '&name=' + name.value)
        .then(result=>{
          if(result.data === 'wrong') {
            alert('일치하는 주문정보가 없습니다.')
          } else {
            orderData.value = result.data;
            inputInfo.value = false;
            orderInfo.value = true;
          }
        })
        .catch(err=>{
          console.log(err);
        });
      }
    }

    function backPage() {
      inputInfo.value = true;
      orderInfo.value = false;
    }

    function home() {
      router.push({path : '/'});
    }

    function deliCheck() {
      let deliNum = orderData.value.deliNum;
      if(deliNum === 0) {
        alert('아직 운송장 정보가 등록되지 않았습니다.');
      } else {
        window.open('https://www.ilogen.com/m/personal/trace/' + deliNum);
      }
    }

    return {orderId, name, inputName, submit, orderData, inputInfo, orderInfo, home, backPage, deliCheck};
  }
}
</script>

<style>

</style>