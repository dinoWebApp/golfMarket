<template>
  <div >
    <div class="container d-block d-sm-none" v-if="korDivide === '골프클럽'">
      <nav>
        <div class="nav nav-tabs justify-content-center" id="nav-tab" role="tablist">
          <button style="font-size: small;" @click="clickedTotal" class="nav-link check active" data-bs-toggle="tab" type="button" role="tab"  aria-selected="true">전체 보기</button>
          <button style="font-size: small;" @click="clickedBrand" class="nav-link check" data-bs-toggle="tab" type="button" role="tab" aria-selected="false">핑</button>
          <button style="font-size: small;" @click="clickedBrand" class="nav-link check" data-bs-toggle="tab" type="button" role="tab" aria-selected="false">캘러웨이</button>
          <button style="font-size: small;" @click="clickedBrand" class="nav-link check" data-bs-toggle="tab" type="button" role="tab" aria-selected="false">테일러메이드</button>
          <button style="font-size: small;" @click="clickedBrand" class="nav-link check" data-bs-toggle="tab" type="button" role="tab" aria-selected="false">PXG</button>
          <button style="font-size: small;" @click="clickedBrand" class="nav-link check" data-bs-toggle="tab" type="button" role="tab" aria-selected="false">타이틀리스트</button>
        </div>
      </nav>
    </div>
    <div class="container d-none d-sm-block" v-if="korDivide === '골프클럽'">
      <nav>
        <div class="nav nav-tabs justify-content-center" id="nav-tab" role="tablist">
          <button @click="clickedTotal" class="nav-link check active" data-bs-toggle="tab" type="button" role="tab"  aria-selected="true">전체 보기</button>
          <button @click="clickedBrand" class="nav-link check" data-bs-toggle="tab" type="button" role="tab" aria-selected="false">핑</button>
          <button @click="clickedBrand" class="nav-link check" data-bs-toggle="tab" type="button" role="tab" aria-selected="false">캘러웨이</button>
          <button @click="clickedBrand" class="nav-link check" data-bs-toggle="tab" type="button" role="tab" aria-selected="false">테일러메이드</button>
          <button @click="clickedBrand" class="nav-link check" data-bs-toggle="tab" type="button" role="tab" aria-selected="false">PXG</button>
          <button @click="clickedBrand" class="nav-link check" data-bs-toggle="tab" type="button" role="tab" aria-selected="false">타이틀리스트</button>
          
        </div>
      </nav>
    </div>

    <div class="container">
      <h2 class="mt-3 mb-3" style="text-align:left;">{{ korDivide }}</h2>
      <hr/>
    </div>
  
    
    <div class="container">
      <div class="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4 g-4">
        <div class="col" v-for="item in products" :key="item">
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
              
              <div id="text-border1" class="d-block d-sm-none">
                <p id="product-text" class="card-text" style="font-weight:600; font-size: 13px;"> {{item.productName}} </p>
              </div>
              <div id="text-border1" class="d-none d-sm-block d-lg-none">
                <p id="product-text" class="card-text" style="font-weight:600; font-size: 15px;"> {{item.productName}} </p>
              </div>
             
              <div id="text-border2" class="d-none d-lg-block">
                <p id="product-text" class="card-text" style="font-weight:600; font-size: 17px;"> {{item.productName}} </p>
              </div>
              
              <span class="text-decoration-line-through" style="font-weight:bold; color:gray">{{filter(item.beforeDiscount)}} 원</span>
              <div class="d-block d-sm-none">
                <span style="font-weight:900; font-size:24px; color:red;"> {{discount(item.beforeDiscount, item.productPrice)}}% </span>
                <span style="font-weight:900; font-size:18px;"> {{filter(item.productPrice)}} 원 </span>
              </div>
              <div class="d-none d-sm-block">
                <span style="font-weight:900; font-size:30px; color:red;"> {{discount(item.beforeDiscount, item.productPrice)}}% </span>
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
import axios from 'axios'
import { ref } from '@vue/reactivity';
import { useRoute, useRouter } from 'vue-router';
export default {
  name:'ProductsPage',
  
  setup() {
    const router = useRouter();
    const route = useRoute();
    let products = ref([]);
    let korDivide = ref(route.query.korDivide);
    let engDivide = ref(route.query.engDivide);
    axios.get('/api/product/?engDivide=' + engDivide.value + '&korDivide=' + korDivide.value).then(res=>{
      products.value = res.data;
    }). catch(err=>{
      console.log(err);
    })

    function filter(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function discount(before, after) {
      let answer = 100 * (1 - after / before);
      return Math.round(answer);
    }

    function clickedBrand(e) {
      let brandName = e.target.innerHTML;
      let brandEng;
      
      switch(brandName) {
        case '핑':
          brandEng = 'ping';
          break;
        case '캘러웨이':
          brandEng = 'callaway';
          break;
        case '테일러메이드':
          brandEng = 'taylormade';
          break;
        case 'PXG':
          brandEng = 'pxg';
          break;
        case '타이틀리스트':
          brandEng = 'titleist'
          break;
      }
      axios.get('/api/product/brand?brandName=' + brandEng + '&divide=' + korDivide.value)
      .then(res=>{
        products.value = res.data;
      })
      .catch(err=>{
        console.log(err);
      })
    }

    function clickedTotal() {
      axios.get('/api/product/?korDivide=' + korDivide.value).then(res=>{
        
        products.value = res.data;
      }). catch(err=>{
        console.log(err);
      });
    }

    function purchase(e) {
      
      let productId = e.target.value;
      router.push({name : 'PurchasePage', params : {id : productId}});
    }

    function clickCard(e) {
      let productId = e.currentTarget.children[1].children[1].innerText;
      
      router.push({name : 'PurchasePage', params : {id : productId}});
    }
    return {products, filter, clickedBrand, clickedTotal, purchase, clickCard, discount, korDivide};

  }
}
</script>

<style>

.nav-link.active{
  font-weight: bold;
}

.nav-link.check {
  color:darkgray ;
}


.nav-item .nav-link{
  font-weight: bold;
}

#side{
  color: darkgrey;
}

#image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  
}

#img-border {
  position: relative;
  width: 100%;
}

#img-border::after {
  display: block;
  content: '';
  padding-bottom: 100%;
}

#text-border1 {
  position: relative;
  width: 100%;
}

#text-border1::after {
  display: block;
  content: '';
  padding-bottom: 70%;
}

#text-border2 {
  position: relative;
  width: 100%;
}

#text-border2::after {
  display: block;
  content: '';
  padding-bottom: 47%;
}

#product-text {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  
}
  
</style>