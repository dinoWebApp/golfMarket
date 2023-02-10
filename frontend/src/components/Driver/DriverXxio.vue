<template>
  <div class="container">
    <ul class="nav nav-tabs justify-content-center">
      <li class="nav-item">
        <a id="side" class="nav-link"  href="/products/driver">전체보기</a>
      </li>
      <li class="nav-item">
        <a id="side" class="nav-link"  href="/products/driver/ping">핑</a>
      </li>
      <li class="nav-item">
        <a id="side" class="nav-link"  href="/products/driver/taylormade">테일러메이드</a>
      </li>
      <li class="nav-item">
        <a id="side" class="nav-link" href="/products/driver/pxg">PXG</a>
      </li>
      <li class="nav-item">
        <a id="side" class="nav-link"  href="/products/driver/titleist">타이틀리스트</a>
      </li>
      <li class="nav-item">
        <a id="side" class="nav-link" href="/products/driver/honma">혼마</a>
      </li>
      <li class="nav-item">
        <a id="active" class="nav-link active" aria-current="page" href="/products/driver/xxio">젝시오</a>
      </li>
      <li class="nav-item">
        <a id="side" class="nav-link" href="/products/driver/yamaha">야마하</a>
      </li>
      <li class="nav-item">
        <a id="side" class="nav-link" href="/products/driver/mizuno">미즈노</a>
      </li>
      <li class="nav-item">
        <a id="side" class="nav-link" href="/products/driver/fourteen">포틴</a>
      </li>
      <li class="nav-item">
        <a id="side" class="nav-link" href="/products/driver/majesty">마제스티</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name:'DriverHonma',

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