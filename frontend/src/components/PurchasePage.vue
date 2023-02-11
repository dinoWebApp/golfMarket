<template>
  <div class="container px-4 px-lg-5 my-5">
    <div class="row gx-4 gx-lg-5 align-items-center">
      <div class="col-md-6 col-xl-5"><img class="card-img-top mb-5 mb-md-0" :src='`http://localhost:3000/static/image/${imagePath}`' alt="product"></div>
      <div class="col-md-6 col-xl-7">
        <div class="small mb-1">상품 코드: {{product.id}} </div>
          <h1 class="display-5 fw-bolder"> {{product.productName}} </h1>
          <div class="fs-5 mb-3">
            <span class="text-decoration-line-through">{{filter(product.beforeDiscount)}} 원</span>
            <div>
              <span style="font-weight:900; font-size:40px; color:red;"> {{discount(product.beforeDiscount, product.productPrice)}}% </span>
              <span style="font-weight:900; font-size:30px;"> {{filter(product.productPrice)}} 원 </span>
            </div>
          </div>

          <select id="optionText" class="form-select mb-5" aria-label="Default select example">
            <option selected>옵션 선택</option>
            <option @click="selectOption" v-for="(item, index) in product.optionData" :key="index" :value="item.optionPrice"> 
              {{item.optionText}}(+{{item.optionPrice}}원)
            </option>
          </select>

        <div class="d-flex">
          <input class="form-control text-center me-3" id="inputQuantity" type="num" value="1" style="max-width: 3rem">
          <button class="btn btn-outline-dark flex-shrink-0" type="button">
              <i class="bi-cart-fill me-1"></i>
              Add to cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRoute } from 'vue-router'
import { ref } from '@vue/reactivity';

export default {
  name: 'PurchasePage',
  setup() {
    const route = useRoute();
    let imagePath = ref('');
    let product = ref({});
    let productId = ref(0);
    let optionText = ref('');
    let optionPrice = ref('');


    axios.get('/api/product/purchase/' + route.params.id)
    .then(res=>{
      console.log(res.data);
      product.value = res.data;
      imagePath.value = product.value.thumbnail;
    })
    .catch(err=>{
      console.log(err);
    })

    function filter(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    function discount(before, after) {
      let answer = 100 * (1 - after / before);
      return Math.round(answer);
    }

    function selectOption() {
      optionText.value = document.getElementById('optionText').innerText;
      optionPrice.value = document.getElementById('optionText').value;
      console.log(optionText.value);
      console.log(optionPrice.value);
    }

    return{productId, product, filter, discount, selectOption, imagePath};
  }
}
</script>

<style>

</style>