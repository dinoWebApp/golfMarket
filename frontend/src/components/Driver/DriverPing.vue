<template>
  <div>
    <div class="container">
      <ul class="nav nav-tabs justify-content-center">
        <li class="nav-item">
          <a id="side" class="nav-link"  href="/product/driver">전체보기</a>
        </li>
        <li class="nav-item">
          <a id="active" class="nav-link active" aria-current="page" href="/product/driver/ping">핑</a>
        </li>
        <li class="nav-item">
          <a id="side" class="nav-link" href="/product/driver/taylormade">테일러메이드</a>
        </li>
        <li class="nav-item">
          <a id="side" class="nav-link" href="/product/driver/pxg">PXG</a>
        </li>
        <li class="nav-item">
          <a id="side" class="nav-link" href="/product/driver/titleist">타이틀리스트</a>
        </li>
        <li class="nav-item">
          <a id="side" class="nav-link" href="/product/driver/honma">혼마</a>
        </li>
        <li class="nav-item">
          <a id="side" class="nav-link" href="/product/driver/xxio">젝시오</a>
        </li>
        <li class="nav-item">
          <a id="side" class="nav-link" href="/product/driver/yamaha">야마하</a>
        </li>
        <li class="nav-item">
          <a id="side" class="nav-link" href="/product/driver/mizuno">미즈노</a>
        </li>
        <li class="nav-item">
          <a id="side" class="nav-link" href="/product/driver/fourteen">포틴</a>
        </li>
        <li class="nav-item">
          <a id="side" class="nav-link" href="/product/driver/majesty">마제스티</a>
        </li>
      </ul>
    </div>
    <div class="container">

      <div class="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4 g-4">
        <div class="col" v-for="item in products" :key="item">
          <div class="card shadow-sm">
            <div id="img-border">
              <img id="image" :src='`http://localhost:3000/${item.thumbnail}`' alt="logo" class="img-fluid img-thumbnail">
            </div>
            
            <div class="card-body">
              <p class="card-text">This is a wider card </p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                  <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                </div>
                <small class="text-muted">9 mins</small>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
  
  

</template>

<script>
import { ref } from '@vue/reactivity'
import axios from 'axios';
export default {
  name: 'DriverPing',
  setup() {
    let array = ref([1, 2, 3]);
    let products = ref([]);
    axios.get('/api/product/driver/ping').then(res=>{
      console.log(res.data);
      products.value = res.data;
    }). catch(err=>{
      console.log(err);
    })
    return {array, products}
  }
}
</script>

<style>
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


</style>