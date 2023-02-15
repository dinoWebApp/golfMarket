<template>
  <div class="container px-4 px-lg-5 my-5">
    <div class="row gx-4 gx-lg-5 align-items-center">
      <div class="col-md-6 col-xl-5">
        <img :src='imagePath' alt="product" class="card-img-top mb-5 mb-md-0">
      </div>
      <div align="left" class="col-md-6 col-xl-7 border">
        <div class="small mb-4 mt-1">상품 코드: {{product.id}} </div>
        <h3 v-if="product.deliverOut" style="font-weight:bold; color:red;">[해외 직구]</h3>
        <h2 class="fw-bolder mb-4"> {{product.productName}} </h2>
        <div class="fs-5 mb-3">
          <span class="text-decoration-line-through">{{filter(product.beforeDiscount * 1 + optionPrice * 1)}} 원</span>
          <div>
            <span style="font-weight:900; font-size:40px; color:red;"> {{discount(product.beforeDiscount, product.productPrice, optionPrice)}}% </span>
            <span style="font-weight:900; font-size:30px;"> {{filter(product.productPrice * 1 + optionPrice * 1)}} 원 </span>
          </div>
        </div>
        
        <div class="mb-3" align="left">
          <div class="mb-1" style="font-size:19px">무료 배송</div>
          <div v-if="product.deliverKor" style="font-size:19px">당일 배송 (16시 이전 주문 건)</div> 
          <div v-if="product.deliverOut" style="font-size:19px">발송 완료까지 최대 2주 소요</div>
        </div>
      
        <select id="optionText" @change="selectOption" class="form-select mb-2" aria-label="Default select example">
          <option selected>옵션 선택</option>
          <option v-for="(item, index) in product.optionData" :key="index" :value="item.optionPrice"> 
            {{item.optionText}}(+{{item.optionPrice}}원)
          </option>
        </select>
         <select id="optionText" class="form-select mb-5" aria-label="Default select example">
          <option selected>결제 방법</option>
          <option> 무통장입금 </option>
          <option> 일반 카드 결제 </option>
          <option> 카카오페이 </option>
          <option> 네이버페이 </option>
        </select>
        <div class="d-flex mb-3">
          <span class="me-3" style="font-size:25px; font-weight:900; color:red;">최종 금액:</span>
          <span class="me-1" style="font-size:25px; font-weight:900"> {{filter((product.productPrice * 1 + optionPrice * 1)*optionSelected*orderNum)}} </span>
          <span style="font-size:25px; font-weight:900"> 원 </span>
          
        </div>  
        <div class="d-flex">
          <span class="ms-2" style="font-size:15px;">주문 개수</span>
        </div>
        <div class="d-flex mb-2">
          
          <select @change="selectNum" id="orderNum" class="form-select me-2 ms-1" aria-label="Default select example" style="max-width: 4rem">
            <option selected>0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <!-- <input class="form-control text-center me-3 ms-1" id="inputQuantity" type="num" value="1" style="max-width: 3rem"> -->
          <button class="btn btn-outline-success flex-shrink-0 me-1" style="font-weight:bold;" type="button">
              <i class="bi-cart-fill me-1"></i>
              장바구니 담기
          </button>
          <button class="btn btn-danger" style="font-weight:bold;">구매하기</button>
        </div>
      </div>
      
      <div class="border mt-3">
        <ul class="nav nav-pills nav-fill" id="pills-tab" role="tablist">
          <li class="nav-item" role="presentation">
            <button @click="clickProdInfo" class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" type="button" role="tab" aria-selected="true">상품정보</button>
          </li>
          <li class="nav-item" role="presentation">
            <button @click="clickRelProd" class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">관련상품</button>
          </li>
          <li class="nav-item" role="presentation">
            <button @click="clickReview" class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">상품후기</button>
          </li>
          <li class="nav-item" role="presentation">
            <button @click="clickQna" class="nav-link" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">상품문의</button>
          </li>
        </ul>
      </div>
      <div class="col-12 border">
        <div v-if="productInfo" class="col-12 d-flex">
          <div class="d-none d-md-block col-md-1 col-xl-2"></div>
          <div class="col-12 col-md-10 col-xl-8">
            <img :src='infoImage' alt="product" class="img-fluid mt-5">
          </div>
          <div class="d-none d-md-block col-md-1 col-xl-2"></div>
        </div>

        <div v-if="relatedProduct" class="container mt-5">
          <div class="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4 g-4">
            <div class="col" v-for="item in relatedList" :key="item">
              <div @click="clickCard" style="cursor:pointer;" class="card shadow-sm">
                <div id="img-border">
                  <img id="image" :src='`http://localhost:3000/static/image/${item.thumbnail}`' alt="logo" class="img-fluid img-thumbnail">
                </div>
                <div class="d-flex">
                  <span class="ms-1" style="font-size:11px;">상품 코드: </span>
                  <span class="ms-1" style="font-size:11px;">{{item.id}}</span>
                  <span v-if="item.deliverOut" class="ms-2" style="font-size:11px; color:red; font-weight:bold;">[해외직구]</span>
                </div>
                
                <div class="card-body">
                  
                  <div id="text-border1" class="d-lg-none">
                    <p id="product-text" class="card-text" style="font-weight:600;"> {{item.productName}} </p>
                  </div>
                  <div id="text-border2" class="d-none d-lg-block">
                    <p id="product-text" class="card-text" style="font-weight:600;"> {{item.productName}} </p>
                  </div>
                  
                  <span class="text-decoration-line-through" style="font-weight:bold; color:gray">{{filter(item.beforeDiscount)}} 원</span>
                  <div>
                    <span style="font-weight:900; font-size:30px; color:red;"> {{discount(item.beforeDiscount, item.productPrice, 0)}}% </span>
                    <span style="font-weight:900; font-size:22px;"> {{filter(item.productPrice)}} 원 </span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        <div class="mb-3" align="left" v-if="review" >
          <div v-for="item in reviews" :key="item" align='left'>
            <hr/>
            <div>
              <span> 작성자 : {{item.user}}</span>
            </div>
            <div style="display:inline-block;">
              <star-rating :inline="true" :star-size="20" :read-only="true" :show-rating="false" v-model:rating="item.stars"></star-rating>
              <span style="font-size:12px" class="ms-1">{{item.date}} </span>
            </div>
            <div class="mt-4">
              {{item.comment}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRoute, useRouter, } from 'vue-router'
import { ref } from '@vue/reactivity'
import StarRating from 'vue-star-rating'

export default {
  name: 'PurchasePage',
  components: {
    StarRating
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    let imagePath = ref('');
    let infoImage = ref('');
    let product = ref({});
    let productId = ref(0);
    let optionText = ref('');
    let optionPrice = ref(0);
    let orderNum = ref(0);
    let optionSelected = ref(0);
    let productInfo = ref(true);
    let relatedProduct = ref(false);
    let review = ref(false);
    let qna = ref(false);
    let relatedList = ref([]);
    let reviews = ref([]);


    axios.get('/api/product/purchase/' + route.params.id)
    .then(res=>{
      console.log(res.data);
      product.value = res.data.product;
      imagePath.value = 'http://localhost:3000/static/image/' + res.data.product.thumbnail;
      infoImage.value = 'http://localhost:3000/static/image/' + res.data.product.infoImage;
      relatedList.value = res.data.relatedList;
      reviews.value = res.data.reviews
    })
    .catch(err=>{
      console.log(err);
    })


    function filter(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    function discount(before, after, optionPrice) {
      let answer = 100 * (1 - (after*1 + optionPrice*1) / (before*1 + optionPrice*1));
      return Math.round(answer);
    }

    function selectOption() {
      let optionSelect = document.getElementById('optionText');
      if (optionSelect.options[document.getElementById('optionText').selectedIndex].text === '옵션 선택') {
        optionText.value = '';
        optionPrice.value = 0;
        optionSelected.value = 0;
        console.log(optionText.value);
        console.log(optionPrice.value);
      } else {
        optionText.value = optionSelect.options[document.getElementById('optionText').selectedIndex].text;
        optionPrice.value = optionSelect.options[document.getElementById('optionText').selectedIndex].value;
        optionSelected.value = 1;
        console.log(optionText.value);
        console.log(optionPrice.value);
      }
    }

    function selectNum() {
      let numberSelect = document.getElementById('orderNum');
      if (numberSelect.options[document.getElementById('orderNum').selectedIndex].text === '0') {
        orderNum.value = 0;
        console.log(orderNum.value);
      } else {
        orderNum.value = numberSelect.options[document.getElementById('orderNum').selectedIndex].value;
        console.log(orderNum.value);
      }
    }

    function clickProdInfo() {
      productInfo.value = true;
      relatedProduct.value = false;
      review.value = false;
      qna.value = false;
    }
    function clickRelProd() {
      
      productInfo.value = false;
      relatedProduct.value = true;
      review.value = false;
      qna.value = false;
    }
    function clickReview() {
      productInfo.value = false;
      relatedProduct.value = false;
      review.value = true;
      qna.value = false;
    }
    function clickQna() {
      productInfo.value = false;
      relatedProduct.value = false;
      review.value = false;
      qna.value = true;
    }

    function clickCard(e) {
      let productId = e.currentTarget.children[1].children[1].innerText;
      console.log(productId);
      router.push({name : 'PurchasePage', params : {id : productId}});
      
    }

    
    

    return{productId, product, filter, discount, selectOption, imagePath, optionPrice, selectNum, optionSelected, orderNum, infoImage,
    productInfo, relatedProduct, review, qna, clickProdInfo, clickRelProd,clickReview, clickQna, relatedList, clickCard, reviews};
  }
}
</script>

<style>
.nav-pills > .nav-item > button.active {
  background-color:rgb(49, 178, 2);
}
.nav-pills > .nav-item > button{
  color:darkgray;
}
</style>