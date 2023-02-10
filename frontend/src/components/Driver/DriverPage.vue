<template>
  <div class="container">
    <ul class="nav nav-tabs justify-content-center">
      <li class="nav-item">
        <a id="active" class="nav-link active" aria-current="page" href="/product/driver">전체보기</a>
      </li>
      <li class="nav-item">
        <a id="side" class="nav-link" href="/product/driver/ping">핑</a>
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
  
</template>

<script>
import axios from 'axios'
export default {
  name:'DriverPage',
  
  setup() {
    axios.get('/api/product/driver').then(res=>{
      console.log(res.data);
    }).catch(err=>{
      console.log(err);
    })
    

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

  
</style>