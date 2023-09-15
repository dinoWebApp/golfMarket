<template>
  <div>
    <div class="container">
      <h2 class="mt-3 mb-3" style="text-align:left;">고객센터</h2>
      <hr/>
    </div>

    <!-- 고객 센터 메뉴 -->
    <div class="border mt-3 container d-none d-sm-block">
      <ul class="nav nav-pills nav-fill" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button @click="clickAbout" class="nav-link mypage-option active" data-bs-toggle="pill" type="button" role="tab" aria-selected="true">매장 소개</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickRule" class="nav-link mypage-option" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">배송/환불/수리 규정</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickCredit" class="nav-link mypage-option" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">무통장 입금 계좌</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickQna" class="nav-link mypage-option" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">비회원 문의</button>
        </li>
      </ul>
    </div>


    <!-- 고객 센터 메뉴 모바일 -->
    <div class="border mt-3 container d-block d-sm-none">
      <ul class="nav nav-pills nav-fill" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button style="font-size: small !important;" @click="clickAbout" class="nav-link mypage-option active" data-bs-toggle="pill" type="button" role="tab" aria-selected="true">매장 소개</button>
        </li>
        <li class="nav-item" role="presentation">
          <button style="font-size: small !important;" @click="clickRule" class="nav-link mypage-option" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">배송/환불/수리 규정</button>
        </li>
        <li class="nav-item" role="presentation">
          <button style="font-size: small !important;" @click="clickCredit" class="nav-link mypage-option" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">무통장 입금 계좌</button>
        </li>
        <li class="nav-item" role="presentation">
          <button style="font-size: small !important;" @click="clickQna" class="nav-link mypage-option" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">비회원 문의</button>
        </li>
      </ul>
    </div>

    <!-- 매장 소개 -->
    <div class="container border" align="left" v-if="about">
      <div class="mt-4">
        저희 TGOLSHOP은 고객님의 만족을 최우선으로 생각하는 쇼핑몰입니다.
      </div>
      <div class="mt-4">
        저희 매장에서는 필요하다면 언제든지 문의하실 수 있는 서비스를 운영하고 있습니다.
      </div>
      <div class="mt-4">
        저희 매장은 맞춤 피팅 서비스를 제공하며,
      </div>
      <div class="mt-4">
        항상 경쟁 업체와 가격 비교를 통해 합리적인 가격으로 최고의 제품을 제공하고자 노력하고 있습니다.
      </div>
      <div class="mt-4">
        대표전화 : 070-7738-2077
      </div>
      <div class="mt-4">
        매장 주소 : 대구광역시 동구 신서로22길 2, 1층
      </div>

      <div style="font-size: large;" class="mt-4">
        오시는길
      </div>

      <div class="col-12 col-lg-8 col-xl-6">
        <img src="../assets/오시는길.png" alt="rule" class="img-fluid mt-2">
      </div>
  
    </div>

    <!-- 배송 정책 -->
    <div v-if="rule" class="container border">
      <div class="col-12">
        <img src="../assets/edittedRule.png" alt="rule" class="img-fluid mt-2">
      </div>
    </div>

    <!-- 무통장 입금 계좌 -->
    <div v-if="credit" class="container border">
      <div class="mt-5 mb-5">
        <div class="mb-2">무통장 입금 계좌: 대구은행 508-10-844784-5 티골프 피팅(김수환)</div>
        <div class="mb-2" style="color:red;">입금자 명과 주문정보가 일치해야 합니다.</div>
        <div style="color:red;">주문 날짜로부터 3일 내에 입금 처리가 되지 않으면 자동으로 주문 취소 처리됩니다.</div>
      </div>
      
    </div>


    <!-- 문의 사항 -->
    <div class="mb-3 container" v-if="qna">
      <div class="row p-5 bg-light rounded-3 mt-3">
        <div class="row d-block d-sm-none" align="left" style="font-weight:30; font-size:17px;">
          쇼핑몰 이용에 관한 문의 사항을 작성해 주십시오.
        </div>
        <div class="row d-none d-sm-block" align="left" style="font-weight:30; font-size:23px;">
          쇼핑몰 이용에 관한 문의 사항을 작성해 주십시오.
        </div>
        <li class="row mb-4 d-block d-sm-none" align="left" style="color:darkgray; font-size: 13px;">
          회원 문의는 마이페이지 1:1문의로 문의 주시기 바랍니다.
        </li>
        <li class="row mb-4 d-none d-sm-block" align="left" style="color:darkgray;">
          회원 문의는 마이페이지 1:1문의로 문의 주시기 바랍니다.
        </li>
        <div class="mb-2" align="left">
          <input type="text" placeholder="닉네임" maxlength="5" v-bind:value="nickName" @input="inputNick">
        </div>
        <div class="row">
          <textarea v-bind:value="qnaText" @input="inputText" class="col-12 d-block d-sm-none"  cols="30" rows="3"></textarea>
          <textarea v-bind:value="qnaText" @input="inputText" class="col-10 d-none d-sm-block"  cols="30" rows="3"></textarea>
          <button @click="qnaSubmit" class="btn btn-secondary btn-sm col-2 d-none d-sm-block" style="font-weight:bold;">등록</button>
        </div>
        <div align="right" class="mt-1 d-block d-sm-none">
          <span>{{ qnaText.length }}/100</span>
          <button @click="qnaSubmit" class="btn btn-secondary btn-sm col-2 me-2 ms-1" style="font-weight:bold;">등록</button>
        </div>
        <div align="left" class="d-none d-sm-block">
          <span>{{ qnaText.length }}/100</span>
        </div>
      </div>
      <div v-for="item in qnaList" :key="item" align='left'>
        <hr/>
        <div>
          <span> 작성자 : {{item.nickName}}</span>
          <span style="font-size:12px" class="ms-2">{{item.date}} </span>
        </div>
        <div class="mt-3">
          {{item.text}}
        </div>
        <div style="color:red;" v-if="item.reply === false" class="mt-3">
          답변 미등록
        </div>
        <div style="font-weight:bold;" v-if="item.reply" class="mt-3">
          관리자의 답변: {{item.adminText}}
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
export default {
  name: 'CustomerCenter',
  setup() {
    let about = ref(true);
    let rule = ref(false);
    let qna = ref(false);
    let credit = ref(false);
    let qnaText = ref('');
    let qnaList = ref([]);
    let nickName = ref('');


    axios.get('/api/customerCenter/nonMemberQna')
    .then(res=>{
      qnaList.value = res.data;
    })
    .catch(err=>{
      console.log(err);
    })
    function clickAbout() {
      credit.value = false;
      about.value = true;
      rule.value = false;
      qna.value = false;
    }

    function clickRule() {
      credit.value = false;
      about.value = false;
      rule.value = true;
      qna.value = false;
    }

    function clickQna() {
      credit.value = false;
      about.value = false;
      rule.value = false;
      qna.value = true;
    }

    function clickCredit() {
      credit.value = true;
      about.value = false;
      rule.value = false;
      qna.value = false;
    }

    function inputNick(e) {
      nickName.value = e.target.value;
    }

    function inputText(e) {
      if(e.target.value.length <= 100) {
        qnaText.value = e.target.value;
      } else {
        alert('100자 이내로 입력하시기 바랍니다.');
        e.target.value = qna.value;
      }
    }

    function qnaSubmit() {
      if(nickName.value === '') {
        alert('닉네임을 입력해 주십시오');
      } else if(qnaText.value === '') {
        alert('문의 내용을 입력해주십시오.');
      } else {
        let qnaData = {
          nickName : nickName.value,
          text : qnaText.value
        }
        axios.post('/api/customerCenter/qnaSubmit', qnaData)
        .then((result)=>{
            qnaText.value = '';
            alert('등록되었습니다.');
            qnaList.value = result.data;
        })
        .catch(err=>{
          console.log(err);
        })
      }
    }

    return {clickAbout, clickRule, clickQna, about, qna, rule, qnaText, qnaList, nickName, qnaSubmit, inputText, inputNick, credit, clickCredit};
  }
}
</script>

<style>

</style>