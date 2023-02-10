<template>
  <div class="container d-flex">
    <div id="admin" v-if="adminData === false">
      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="패스워드" autocomplete="off" @keyup.enter="login" v-model="pw">
        <label for="floatingPassword">패스워드</label>
      </div>
      <button @click="submit" class="w-100 btn btn-lg btn-danger mt-2 mb-3" style="font-weight:bold;">승인</button>
    </div>

    <div class="col-3 col-md-2" id="sidebar" v-if="adminData === true">
      <img src="../../assets/tgolshop.png" class="img-fluid" alt="">
      <div class="list-group">
        <a href="#" class="list-group-item list-group-item-action">회원관리</a>
        <a href="#" class="list-group-item list-group-item-action">상품관리</a>
        <a href="#" class="list-group-item list-group-item-action">상품등록</a>
        <a href="#" class="list-group-item list-group-item-action">주문조회</a>
        <a href="#" class="list-group-item list-group-item-action">배송관리</a>
        <a href="#" class="list-group-item list-group-item-action">반품관리</a>
        <a href="#" class="list-group-item list-group-item-action">A second link item</a>
        <a href="#" class="list-group-item list-group-item-action">A third link item</a>
        <a href="#" class="list-group-item list-group-item-action">A fourth link item</a>
        <a href="#" class="list-group-item list-group-item-action">A second link item</a>
        <a href="#" class="list-group-item list-group-item-action">A third link item</a>
        <a href="#" class="list-group-item list-group-item-action">A fourth link item</a>
        <a href="#" class="list-group-item list-group-item-action">A second link item</a>
        <a href="#" class="list-group-item list-group-item-action">A third link item</a>
        <a href="#" class="list-group-item list-group-item-action">A fourth link item</a>
      </div>
    </div>
    <div class="col-10 mt-5" v-if="productEnroll === true">
      <div class="container mt-3 col-11 col-sm-11 col-md-11 col-lg-9 col-xxl-7 border ">
        <div class="mt-4 mb-3">
          <h3>상품 등록 하기</h3>
        </div>
        <div class="row justify-content-center">
          <div class="col-9 ">
            분류
          
            <div class="dropdown">
              <button id="divide" class="btn btn-light border dropdown-toggle col-12" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                선택
              </button>
              <ul class="dropdown-menu">
                <li><a @click="productDivide" class="dropdown-item" href="#">드라이버</a></li>
                <li><a @click="productDivide" class="dropdown-item" href="#">우드/유틸</a></li>
                <li><a @click="productDivide" class="dropdown-item" href="#">아이언</a></li>
                <li><a @click="productDivide" class="dropdown-item" href="#">퍼터</a></li>
                <li><a @click="productDivide" class="dropdown-item" href="#">여성클럽</a></li>
                <li><a @click="productDivide" class="dropdown-item" href="#">골프백/볼/기타</a></li>
                <li><a @click="productDivide" class="dropdown-item" href="#">풀세트</a></li>
              </ul>
            </div>
            
          </div>

          <div class="col-9 mt-2">
            브랜드 선택
            <div class="dropdown">
              <button id="brand" class="btn btn-light border dropdown-toggle col-12" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                선택
              </button>
              <ul class="dropdown-menu">
                <li><a @click="brandChoice" class="dropdown-item" href="#">핑</a></li>
                <li><a @click="brandChoice" class="dropdown-item" href="#">테일러메이드</a></li>
                <li><a @click="brandChoice" class="dropdown-item" href="#">PXG</a></li>
                <li><a @click="brandChoice" class="dropdown-item" href="#">타이틀리스트</a></li>
                <li><a @click="brandChoice" class="dropdown-item" href="#">혼마</a></li>
                <li><a @click="brandChoice" class="dropdown-item" href="#">젝시오</a></li>
                <li><a @click="brandChoice" class="dropdown-item" href="#">야마하</a></li>
                <li><a @click="brandChoice" class="dropdown-item" href="#">미즈노</a></li>
                <li><a @click="brandChoice" class="dropdown-item" href="#">포틴</a></li>
                <li><a @click="brandChoice" class="dropdown-item" href="#">마제스티</a></li>
              </ul>
            </div>
          </div>
          
          <div class="col-9 mt-2">
            상품명
            <input v-bind:value="productName" @input="inputProductName" type="text" class="form-control mb-2" id="productName" placeholder="브랜드와 모델명 모두 입력해주세요.">
            판매 가격
            <input v-bind:value="productPrice" @input="inputProductPrice" type="text" class="form-control mb-2" id="productName" placeholder="판매가격">
          </div>
          
          <div class="col-9 mt-2">
            배송 방법
            <div class="border mb-3">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" @click="selectKor">
                <label class="form-check-label" for="inlineRadio1">국내 배송</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" @click="selectOut">
                <label class="form-check-label" for="inlineRadio2">해외 배송</label>
              </div>
            </div>

            제품 사진
            <div class="input-group mb-3">           
              <input type="file" class="form-control" id="inputGroupFile01" accept="image/*" @change="selectThum">
              <label class="input-group-text" for="inputGroupFile01">썸네일</label>
            </div>
            <div class="input-group mb-3">
              <input type="file" class="form-control" id="inputGroupFile02" accept="image/*" @change="selectInfo">
              <label class="input-group-text" for="inputGroupFile02">상품 정보</label>
            </div>
            
            <button @click="posting" type="button" class="btn btn-danger col-12 mt-3 mb-3" style="font-weight:bold;">상품 등록 하기</button>
          </div>
          
        </div>
      </div>
  
    </div>
  </div>
  
  
 


</template>

<script>
import axios from 'axios'
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
export default {
  name: 'AdminPage',
  setup() {
    let divide = ref('');
    let brand = ref('');
    let productEnroll = ref(true);
    let productName = ref('');
    let productPrice = ref('');
    let adminData = ref(true);
    let pw = ref('');
    let thumbnail = ref();
    let infoImage = ref();
    let deliverKor = ref(false);
    let deliverOut = ref(false);
    let dataSet = ref({
      divide : divide,
      brand : brand,
      productName : productName,
      productPrice : productPrice,
      deliverKor : deliverKor,
      deliverOut : deliverOut
    })
    let checkData = ref({
      pw : pw
    });
    const router = useRouter();
    axios.get('/api/admin-check').then(res=>{
      console.log(res.data);
      if(res.data === 'not login') {
        router.push({path:'/'});
        alert('권한이 없습니다.');
      // } else if(res.data[0] === 'admin' && res.data[1] === 'admin') {
      //   alert('관리자 페이지에 접속하셨습니다.');
      // } else {
      //   alert('권한이 없습니다.');
      //   router.push({path:'/'});
      }
    }).catch(err=>{
      console.log(err);
    });

    function submit() {
      axios.post('/api/admin-pw', checkData.value)
      .then(res=>{
        if(res.data === 'ok') {
          adminData.value = true;
        } else {
          alert('패스워드 불일치');
        }
      }).catch(err=>{
        console.log(err);
      });
    }
    
    function productDivide(e) {
      document.getElementById('divide').innerText = e.target.innerHTML;
      divide.value = e.target.innerHTML;
      console.log(divide.value);
      console.log(dataSet.value.divide);
    }

    function brandChoice(e) {
      document.getElementById('brand').innerText = e.target.innerHTML;
      brand.value = e.target.innerHTML;
      console.log(brand.value);
    }

    function inputProductName(e) {
      productName.value = e.target.value;
      console.log(productName.value);
    }

    function inputProductPrice(e) {
      productPrice.value = e.target.value;
      console.log(productPrice.value);
    }

    function selectThum(e) {
      thumbnail.value = e.target.files[0];
      console.log(thumbnail.value);
    }

    function selectInfo(e) {
      infoImage.value = e.target.files[0];
      console.log(infoImage.value);
    }

    function selectKor() {
      deliverKor.value = true;
      deliverOut.value = false;
      console.log(deliverKor.value, deliverOut.value);
    }

    function selectOut() {
      deliverKor.value = false;
      deliverOut.value = true;
      console.log(deliverKor.value, deliverOut.value);
    }

    function posting() {
      const formData = new FormData();
      
      formData.append('thumbnail', thumbnail.value);
      formData.append('infoImage', infoImage.value);
      formData.append('data', JSON.stringify(dataSet.value));
      console.log(dataSet.value);
      axios.post('/api/product/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res=>{
        console.log(res.data);
      })
      .catch(err=>{
        console.log(err);
      });
    }

    return {adminData, pw, submit, productEnroll, divide, productDivide, productPrice ,brandChoice, productName, inputProductName, inputProductPrice,
    selectThum, selectInfo, posting, selectKor, selectOut};
  }
}
</script>

<style>
#admin {
  position: fixed;
  left: 40%;
  right: 40%;
  top: 40%;
}

#sidebar{
  height: 100vh !important;
}



</style>