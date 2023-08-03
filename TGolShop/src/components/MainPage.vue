<template>
  <div>
    <div class="container mt-3 mb-3">
      <div id="second" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active" data-bs-interval="3000" style="cursor:pointer;">
            <img src="../assets/sign-up-event.jpg" class="d-block w-100" alt="회원가입 이벤트">
          </div>
          <div class="carousel-item" data-bs-interval="3000" style="cursor:pointer;">
            <img src="../assets/review-event.png" class="d-block w-100" alt="리뷰이벤트">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#second" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#second" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <div id="carouselExampleIndicators" class="carousel slide mt-1" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div @click="clickG430" class="carousel-item active" data-bs-interval="3000" style="cursor:pointer;">
            <img src="../assets/G430.png" class="d-block w-100" alt="골프클럽">
          </div>
          <div @click="clickParadaim" class="carousel-item" data-bs-interval="3000" style="cursor:pointer;">
            <img src="../assets/패러다임.png" class="d-block w-100" alt="골프클럽">
          </div>
          <div @click="clickPeruga" class="carousel-item" data-bs-interval="3000" style="cursor:pointer;">
            <img src="../assets/페루가샤프트.png" class="d-block w-100" alt="골프클럽">
          </div>
          <div @click="clickStealth2" class="carousel-item" data-bs-interval="3000" style="cursor:pointer;">
            <img src="../assets/stealth2Driver.png" class="d-block w-100" alt="골프클럽">
          </div>
          <div @click="clickMavrik" class="carousel-item" data-bs-interval="3000" style="cursor:pointer;">
            <img src="../assets/mavrik.png" class="d-block w-100" alt="드라이버">
          </div>
          <div @click="clickG410" class="carousel-item" data-bs-interval="3000" style="cursor:pointer;">
            <img src="../assets/g410Plus.png" class="d-block w-100" alt="샤프트">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    
    
  <!-- Blog preview section-->
  
    <div class="container px-5 my-5">
      <hr/>
      <div class="row gx-5 justify-content-center">
        <div class="col-lg-8 col-xl-6">
          <div class="text-center">
            <h2 class="fw-bolder mt-2">추천 상품</h2>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-5">
      <div class="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-4">
        <div class="col" v-for="item in productList" :key="item">
          <div @click="clickCard" style="cursor:pointer;" class="card shadow-sm">
            <div id="img-border">
              <img id="image" :src='`${item.thumbnail}`' alt="골프용품" class="img-fluid img-thumbnail">
            </div>
            <div class="d-flex">
              <span class="ms-1" style="font-size:11px;">상품 코드: </span>
              <span class="ms-1" style="font-size:11px;">{{item.id}}</span>
              <span v-if="item.deliverOut" class="ms-2" style="font-size:11px; color:red; font-weight:bold;">[해외직구]</span>
            </div>
            
            <div class="card-body">
              
              <div id="text-border1" class="d-block d-lg-none">
                <p id="product-text" class="card-text" style="font-weight: 600; font-size: 13px;"> {{item.productName}} </p>
              </div>
              <div id="text-border1" class="d-none d-lg-block">
                <p id="product-text" class="card-text" style="font-weight: 600; font-size: 22px;"> {{item.productName}} </p>
              </div>
              
              <span class="text-decoration-line-through" style="font-weight:bold; color:gray">{{filter(item.beforeDiscount)}} 원</span>
              <div class="d-block d-sm-none">
                <span style="font-weight:900; font-size:24px; color:red;"> {{discount(item.beforeDiscount, item.productPrice, 0)}}% </span>
                <span style="font-weight:900; font-size:18px;"> {{filter(item.productPrice)}} 원 </span>
              </div>
              <div class="d-none d-sm-block">
                <span style="font-weight:900; font-size:30px; color:red;"> {{discount(item.beforeDiscount, item.productPrice, 0)}}% </span>
                <span style="font-weight:900; font-size:22px;"> {{filter(item.productPrice)}} 원 </span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  
  </div>
  
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
export default {
  name: 'MainPage',
  setup() {
    let productList = ref([]);
    const router = useRouter();

    axios.get('/api')
    .then(result=>{
      productList.value = result.data;
    })
    .catch(err=>{
      console.log(err);
    });

    function clickG430() {
      router.push({path:'/product/purchase/28'});
    }

    function clickG410() {
      router.push({path : '/product/purchase/18'});
    }

    function clickMavrik() {
      router.push({path : '/product/purchase/20'});
    }

    function clickStealth2() {
      router.push({path : '/product/purchase/25'})
    }

    function clickParadaim() {
      router.push({path : '/product/purchase/41'})
    }

    function clickPeruga() {
      router.push({path : '/product/purchase/49'});
    }

    function clickCard(e) {
      let productId = e.currentTarget.children[1].children[1].innerText;
      
      router.push({name : 'PurchasePage', params : {id : productId}});
    }

    function filter(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function discount(before, after, optionPrice) {
      let answer = 100 * (1 - (after*1 + optionPrice*1) / (before*1 + optionPrice*1));
      return Math.round(answer);
    }
    return {clickG430, productList, clickCard, filter, discount, clickG410, clickMavrik, clickStealth2, clickParadaim, clickPeruga};
  }
}
</script>

<style>
#banner {
  background-color: #98d464;
}
</style>