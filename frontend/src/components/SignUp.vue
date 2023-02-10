<template>
  <div class="container mt-3 col-10 col-sm-8 col-md-7 col-lg-5 col-xxl-4 border ">
    <div class="mt-4 mb-3">
      <h3>간편 회원가입</h3>
    </div>
    <div class="row justify-content-center">
      <div class="col-9 ">
        닉네임
        <div class="col-9 d-flex">
          <div class="col-12">
            <input v-bind:value="nickName" @input="inputNickName" type="text" class="form-control mb-2" id="nickName" placeholder="닉네임 (5자 이내)" maxlength="5">
          </div>
          <div class="col-5" v-if="nickNameCheck === false">
            <button @click="checkNick" type="button" class="btn btn-danger" style="font-weight:bold;">중복검사</button>
          </div>
          <div class="col-5" v-if="nickNameCheck === true">
            <button type="button" class="btn btn-success" style="font-weight:bold;">중복검사</button>
          </div>
        </div>
        <div style="float:left; color:red;" v-if="existNickName">이미 존재하는 닉네임입니다.</div>
      </div>

      <div class="col-9">
        아이디
        <div class="col-9 d-flex">
          <div class="col-12">
            <input v-bind:value="id" @input="inputId" type="text" class="form-control mb-2" id="id" placeholder="아이디" maxlength="15">
          </div>
          <div class="col-5" v-if="idCheck === false">
            <button @click="checkId" type="button" class="btn btn-danger" style="font-weight:bold;">중복검사</button>
          </div>
          <div class="col-5" v-if="idCheck === true">
            <button type="button" class="btn btn-success" style="font-weight:bold;">중복검사</button>
          </div>
        </div>
        <div style="float:left; color:red;" v-if="existId">이미 존재하는 아이디입니다.</div>
      </div>
      <div class="col-9 mb-2">
        비밀번호
        <input type="password" class="form-control" id="pw" placeholder="비밀번호 (8~20자)" v-model="pw" autocomplete="off" maxlength="20">
        <div class="ms-1" style="float:left; color:red;" v-if="pwValid === false && pw !== ''">8~20자 입력</div>
      </div>
      
      <div class="col-9 mb-4">
        <input type="password" class="form-control" id="pwCheck" placeholder="비밀번호 확인" v-model="pwCheck" autocomplete="off" maxlength="20">
        <div class="ms-1" style="float:left; color:red;" v-if="pwCheckValid === false && pwCheck !== ''">비밀번호 불일치</div>
      </div>


      <h5>기본 배송지 정보</h5>
      <div class="col-9 ">
        성명
        <input v-bind:value="name" @input="inputName" type="text" class="form-control mb-2" id="name" placeholder="성명" maxlength="6">
        휴대폰 번호
        <input v-bind:value="phoneNum" @input="inputPhoneNum" type="tel" class="form-control mb-2" id="phoneNum" placeholder="휴대폰 번호 (10~11자)" maxlength="11">
      </div>
      <div class="col-9 mt-3">
        <div class="d-flex">
          <div class="col-6">
            <input type="text" class="form-control mb-2" id="address-num" v-model="addressNum" placeholder="우편번호" readonly>
          </div>
          <div class="col-6">
            <button  type="button" class="btn btn-light border" @click="inputAddress">우편번호 찾기</button>
          </div>
        </div>
        <div class="d-flex">
          <div class="col-9 pe-1">
            <input type="text" class="form-control mb-2" id="address1" v-model="address" placeholder="주소"  readonly>
          </div>
          <div class="col-3 ps-1" >
            <input type="text" class="form-control mb-2" id="address3" v-model="addressName" placeholder="" readonly>
          </div>
        </div>
        <div class="d-flex">
          <div class="col-12">
            <input type="text" class="form-control mb-2" id="detailAddress" v-model="detailAddress" placeholder="상세주소" maxlength="25">
          </div>
          
        </div>
        <button @click="sendInf" type="button" class="btn btn-danger col-12 mt-3 mb-3" style="font-weight:bold;">간편 회원가입</button>
      </div>
      
      
    </div>
    
   
    

  </div>
  
</template>

<script>
import { ref } from '@vue/reactivity';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { watch } from '@vue/runtime-core';
export default {
  name: 'SignUp',

  setup() {
    const router = useRouter();
    let nickNameCheck = ref(false);
    let existNickName = ref(false);
    let idCheck = ref(false);
    let existId = ref(false);
    let addressNum = ref('');
    let address = ref('');
    let addressName = ref('');
    let detailAddress = ref('');
    let phoneNum = ref(null);
    let phoneNumValid = ref(false);
    let nickName = ref('');
    let id = ref('');
    let pw = ref('');
    let pwCheck = ref('');
    let pwValid = ref(false);
    let pwCheckValid = ref(false);
    let name = ref('');
    let signUpData = ref({
      nickName : nickName,
      id : id,
      pw : pw,
      name : name,
      phoneNum : phoneNum,
      addressNum : addressNum,
      address : address,
      addressName : addressName,
      detailAddress : detailAddress
    });

    function inputAddress() {
      new window.daum.Postcode({
        oncomplete: function(data) {
          let addr = '';
          let extraAddr = '';
          if (data.userSelectedType === 'R') {
            addr = data.roadAddress;
          } else {
            addr = data.jibunAddress;
          }

          if (data.userSelectedType === 'R') {
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
              extraAddr += data.bname;
            }

            if(data.buildingName !== '' && data.apartment === 'Y') {
              extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }

            if(extraAddr !== '') {
              extraAddr = ' (' + extraAddr + ')';
            }

            addressName.value = extraAddr;
          } else {
            addressName.value = '';
          }

          addressNum.value = data.zonecode;
          address.value = addr;
          document.getElementById('detailAddress').focus();
        }
      }).open();
    }

    function sendInf() {
      if (nickName.value === '' || id.value === '' || pw.value === '' || name.value === '' ||
      phoneNum.value === null || address.value === '') {
        alert('입력되지 않은 항목이 있습니다.');
      } else if (nickNameCheck.value === false) {
        alert('닉네임 중복검사를 하지 않았습니다.');
      } else if (idCheck.value === false) {
        alert('아이디 중복검사를 하지 않았습니다.');
      } else if (pwValid.value === false) {
        alert('비밀번호는 8~20자를 입력해야 합니다.')
      } else if (pwCheckValid.value === false) {
        alert("'비밀번호'와 '비밀번호 확인'이 일치하지 않습니다.");
      } else if (phoneNumValid.value === false) {
        alert('휴대폰 번호는 10~11자를 입력해야 합니다.')
      } else if (detailAddress.value === '') {
        alert('상세주소가 입력되지 않았습니다.');
      } else {
        axios.post('/api/customer/sign-up', signUpData.value)
        .then(res=>{
          console.log(res.data);
          if(res.data === 'sign-up success') {
            router.push({path : '/customer/login'});
          } else alert('이미 등록된 휴대폰 번호입니다.')
        }).catch(err=>{
          console.log(err);
        });
      }
      
    }

    function checkNick() {
      if (nickName.value === '') {
        alert('닉네임이 입력되지 않았습니다.');
      } else {
        console.log(nickName.value);
        axios.get('/api/customer/sign-up/nick-check?nick=' + nickName.value)
        .then(res=>{
          console.log(res.data);
          if (res.data === 'existed') {
            existNickName.value = true;
          } else {
            existNickName.value = false;
            nickNameCheck.value = true;
          }
        }).catch(err=>{
          console.log(err);
        });
      }
     
    }

    function checkId() {
      if (id.value === '') {
        alert('아이디가 입력되지 않았습니다.');
      } else {
        console.log(id.value);
        axios.get('/api/customer/sign-up/id-check?id=' + id.value)
        .then(res=>{
          console.log(res.data);
          if (res.data === 'existed') {
            existId.value = true;
          } else {
            existNickName.value = false;
            idCheck.value = true;
          }
        }).catch(err=>{
          console.log(err);
        });
      }
     
    }

    function inputNickName(e) {
      nickNameCheck.value = false;
      existNickName.value = false;
      nickName.value = e.target.value;
    }

    function inputName(e) {
      name.value = e.target.value;
    }

    function inputId(e) {
      idCheck.value = false;
      existId.value = false;
      id.value = e.target.value;
    }

    function inputPhoneNum(e) {
      phoneNum.value = e.target.value;
    }

    watch(phoneNum, (newValue, oldValue)=>{
      console.log({newValue, oldValue});
      let blank_pattern = /[\s]/g;
      if (isNaN(newValue) || blank_pattern.test(newValue) ) {
        phoneNum.value = oldValue;
      }
      if (newValue.length === 10 || newValue.length === 11) {
        phoneNumValid.value = true;
      } else phoneNumValid.value = false;

      if (newValue === '') {
        document.getElementById('phoneNum').style.borderColor = '';
        document.getElementById('phoneNum').style.borderWidth = '';
      } else if (phoneNumValid.value === true) {
        document.getElementById('phoneNum').style.borderColor = 'green';
        document.getElementById('phoneNum').style.borderWidth = '2px';
      } else if (phoneNumValid.value === false) {
        document.getElementById('phoneNum').style.borderColor = 'red';
        document.getElementById('phoneNum').style.borderWidth = '2px';
      }

    });

    watch(nickName, (newValue, oldValue)=>{
      console.log({newValue, oldValue});
      let blank_pattern = /[\s]/g;
      let special_pattern = /[~!@#$%^&*()_+|<>?:{}]/;
      if(blank_pattern.test(newValue) || special_pattern.test(newValue)){
        alert('특수문자 또는 공백은 포함될 수 없습니다.');
        nickName.value = oldValue;
      }
    })

    watch(id, (newValue, oldValue)=>{
      console.log({newValue, oldValue});
      let blank_pattern = /[\s]/g;
      let special_pattern = /[~!@#$%^&*()_+|<>?:{}]/;
      let kor_pattern = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
      if(blank_pattern.test(newValue) || special_pattern.test(newValue) ||
      kor_pattern.test(newValue)){
        alert('한글, 특수문자, 공백은 포함될 수 없습니다.');
        id.value = oldValue;
      }
    });

    watch(pw, (newValue, oldValue)=>{
      console.log({newValue, oldValue});
      if (newValue.length >= 8 && newValue.length <= 20) {
        pwValid.value = true;
      } else pwValid.value = false;
      if (newValue === '') {
        document.getElementById('pw').style.borderColor = '';
        document.getElementById('pw').style.borderWidth = '';
        pwCheckValid.value = false;
        document.getElementById('pwCheck').style.borderColor = '';
        document.getElementById('pwCheck').style.borderWidth = '';
      } else if(pwValid.value === true) {
        document.getElementById('pw').style.borderColor = 'green';
        document.getElementById('pw').style.borderWidth = '2px';
      } else if(pwValid.value === false) {
        document.getElementById('pw').style.borderColor = 'red';
        document.getElementById('pw').style.borderWidth = '2px';
      }

      if (newValue === pwCheck.value && newValue !== '') {
        pwCheckValid.value = true;
        document.getElementById('pwCheck').style.borderColor = 'green';
        document.getElementById('pwCheck').style.borderWidth = '2px';
      } else if(newValue !== pwCheck.value){
        pwCheckValid.value = false;
        document.getElementById('pwCheck').style.borderColor = 'red';
        document.getElementById('pwCheck').style.borderWidth = '2px';
      }
    });

    watch(pwCheck, (newValue, oldValue)=>{
      console.log({newValue, oldValue});

      if (newValue === '') {
        pwCheckValid.value = false;
        document.getElementById('pwCheck').style.borderColor = '';
        document.getElementById('pwCheck').style.borderWidth = '';
      } else if(newValue === pw.value) {
        pwCheckValid.value = true;
        document.getElementById('pwCheck').style.borderColor = 'green';
        document.getElementById('pwCheck').style.borderWidth = '2px';
      } else if(newValue !== pw.value) {
        pwCheckValid.value = false;
        document.getElementById('pwCheck').style.borderColor = 'red';
        document.getElementById('pwCheck').style.borderWidth = '2px';
      }
    });

    watch(name, (newValue, oldValue)=>{
      console.log({newValue, oldValue});
      let blank_pattern = /[\s]/g;
      let special_pattern = /[~!@#$%^&*()_+|<>?:{}]/;
      let num_pattern = /[0-9]/;
      if(blank_pattern.test(newValue) || special_pattern.test(newValue) ||
      num_pattern.test(newValue)){
        alert('특수문자, 공백, 숫자는 포함될 수 없습니다.');
        name.value = oldValue;
      }
    })

    

    


    return {phoneNum, addressNum, address, addressName, detailAddress, sendInf, inputAddress, nickName, id, pw, pwCheck, pwValid,
    pwCheckValid, name, nickNameCheck, existNickName, idCheck, existId, checkNick, inputNickName, inputPhoneNum, inputName, inputId, checkId};
  }

}
</script>

<style>

</style>