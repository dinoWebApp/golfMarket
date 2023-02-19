<template>
  <div class="container">
    <div align='left' class="mt-4">
      <h1>마이페이지</h1>
      <span style="color:darkgray">나의 주문 정보 및 개인 정보를 관리할 수 있습니다</span>
    </div>
    <hr/>

    <div class="border mt-3">
      <ul class="nav nav-pills nav-fill" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button @click="clickProdInfo" class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" type="button" role="tab" aria-selected="true">주문목록</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickRelProd" class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">장바구니</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickReview" class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">리뷰관리</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickQna" class="nav-link" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">1:1문의</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickQna" class="nav-link" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">환불계좌관리</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickQna" class="nav-link" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">포인트</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickQna" class="nav-link" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">정보수정</button>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useRoute } from 'vue-router'
export default {
  name: 'MyPage',
  setup() {
    const route = useRoute();
    let nickName = ref(route.query.nickName);
    
    
    return {nickName}
  }
}
</script>

<style>

</style>