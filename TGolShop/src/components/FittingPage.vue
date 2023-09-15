<template>
  <div>
    <div class="container">
      <h2 class="mt-3 mb-3" style="text-align:left;">피팅문의</h2>
      <hr/>
    </div>
    <div class="mb-3 container">
      <div class="row p-5 bg-light rounded-3 mt-3">
        <div class="row d-block d-sm-none" align="left" style="font-weight:30; font-size:17px;">
          원하시는 피팅 내용을 상세하게 작성해 주세요.
        </div>
        <div class="row d-none d-sm-block" align="left" style="font-weight:30; font-size:23px;">
          원하시는 피팅 내용을 상세하게 작성해 주세요
        </div>
        <li class="row mb-4 d-block d-sm-none" align="left" style="color:darkgray; font-size: 13px;">
          피팅 내용에 따라 상세한 피팅 견적 전달을 위해 개별 연락을 드릴 수도 있습니다.
        </li>
        <li class="row mb-4 d-none d-sm-block" align="left" style="color:darkgray;">
          피팅 내용에 따라 상세한 피팅 견적 전달을 위해 개별 연락을 드릴 수도 있습니다.
        </li>

        <!-- 피팅 문의 내용 -->
        <div class="row">
          <textarea v-bind:value="fittingText" @input="inputText" class="col-12 d-block d-sm-none"  cols="30" rows="3"></textarea>
          <textarea v-bind:value="fittingText" @input="inputText" class="col-10 d-none d-sm-block"  cols="30" rows="3"></textarea>
          <button @click="fittingSubmit" class="btn btn-secondary btn-sm col-2 d-none d-sm-block" style="font-weight:bold;">등록</button>
        </div>
        <div align="right" class="mt-1 d-block d-sm-none">
          <span>{{ fittingText.length }}/100</span>
          <button @click="fittingSubmit" class="btn btn-secondary btn-sm col-2 me-2 ms-1" style="font-weight:bold;">등록</button>
        </div>
        <div align="left" class="d-none d-sm-block">
          <span>{{ fittingText.length }}/100</span>
        </div>
      </div>

      <!-- 문의 목록 -->
      <div v-for="item in fittingList" :key="item" align='left'>
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
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
export default {
  name:'FittingPage',
  setup() {
    const router = useRouter()
    let fittingText = ref('');
    let fittingList = ref([]);
    

    // 권한 확인
    axios.get('/api/fitting')
    .then(res=>{
      if(res.data === 'not login') {
        alert('로그인이 필요합니다.');
        router.push({path : '/customer/login'});
      } else fittingList.value = res.data;
    })
    

    function inputText(e) {
      if(e.target.value.length <= 100) {
        fittingText.value = e.target.value;
      } else {
        alert('100자 이내로 입력하시기 바랍니다.');
        e.target.value = fittingText.value;
      }
    }

    function fittingSubmit() {
      if(fittingText.value === '') {
        alert('문의 내용을 입력해주십시오.');
      } else {
        let fittingData = {
          text : fittingText.value
        }
        axios.post('/api/fitting/submit', fittingData)
        .then((result)=>{
            fittingText.value = '';
            alert('등록되었습니다.');
            fittingList.value = result.data;
        })
        .catch(err=>{
          console.log(err);
        })
      }
    }
    return {fittingText, inputText, fittingSubmit, fittingList};
  }

}
</script>

<style>

</style>