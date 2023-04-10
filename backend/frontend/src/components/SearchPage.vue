<template>
  <div class="container mt-5">
    <div class="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4 g-4">
      <div class="col" v-for="item in searchedList" :key="item">
        <div @click="clickCard" style="cursor:pointer;" class="card shadow-sm">
          <div id="img-border">
            <img id="image" :src='`http://localhost:8080/static/image/${item.thumbnail}`' alt="logo" class="img-fluid img-thumbnail">
          </div>
          <div class="d-flex">
            <span class="ms-1" style="font-size:11px;">상품 코드: </span>
            <span class="ms-1" style="font-size:11px;">{{item.id}}</span>
            <span v-if="item.deliverOut" class="ms-2" style="font-size:11px; color:red; font-weight:bold;">[해외직구]</span>
          </div>
          
          <div class="card-body">
            
            <div id="text-border1" class="d-lg-none">
              <p id="product-text" class="card-text" style="font-weight: 600;"> {{item.productName}} </p>
            </div>
            <div id="text-border2" class="d-none d-lg-block">
              <p id="product-text" class="card-text" style="font-weight:600; font-size:20px"> {{item.productName}} </p>
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
</template>

<script>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios';
export default {
  name:'SearchPage',
  setup() {
    let searchedList = ref([]);
    const route = useRoute();
    const router = useRouter();
    axios.get('/api/search?searchText=' + route.query.searchText)
    .then(result=>{
      if(result.data.length === 0) {
        alert('일치하는 검색결과가 없습니다.');
        router.go(-1);
      } else {
        searchedList.value = result.data;
      }
    })
    .catch(err=>{
      console.log(err);
    })

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
    return {clickCard, filter, discount, searchedList};
  }

}
</script>

<style>

</style>