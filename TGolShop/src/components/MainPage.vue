<template>
  <div>
    <div class="container mt-3 mb-3">
      <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
        <!-- <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div> -->
        <div class="carousel-inner">
          <div class="carousel-item active" data-bs-interval="3000" style="cursor:pointer;">
            <img src="../assets/g430-banner.jpeg" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item" data-bs-interval="3000" style="cursor:pointer;">
            <img src="../assets/i230-banner.jpeg" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item" data-bs-interval="3000" style="cursor:pointer;">
            <img src="../assets/i525-banner.jpeg" class="d-block w-100" alt="...">
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
      <div id="second" class="carousel slide mt-1" data-bs-ride="carousel">
        <!-- <div class="carousel-indicators">
          <button type="button" data-bs-target="#second" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#second" data-bs-slide-to="1" aria-label="Slide 2"></button>
        </div> -->
        <div class="carousel-inner">
          <div class="carousel-item active" data-bs-interval="3000" style="cursor:pointer;">
            <img src="../assets/sign-up-event.jpg" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item" data-bs-interval="3000" style="cursor:pointer;">
            <img src="../assets/review-event.png" class="d-block w-100" alt="...">
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
              <img id="image" :src='`${item.thumbnail}`' alt="logo" class="img-fluid img-thumbnail">
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
      router.push({path:'/product/purchase/15'});
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
    return {clickG430, productList, clickCard, filter, discount};
  }
}
</script>

<style>
#banner {
  background-color: #98d464;
}
</style>