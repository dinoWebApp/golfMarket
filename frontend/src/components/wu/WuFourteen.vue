<template>
  <div class="container">
    <ul class="nav nav-tabs justify-content-center">
      <li class="nav-item">
        <a id="side" class="nav-link"  href="/products/wu">전체보기</a>
      </li>
      <li class="nav-item">
        <a id="side" class="nav-link"  href="/products/wu/ping">핑</a>
      </li>
      <li class="nav-item">
        <a id="side" class="nav-link"  href="/products/wu/taylormade">테일러메이드</a>
      </li>
      <li class="nav-item">
        <a id="side" class="nav-link" href="/products/wu/pxg">PXG</a>
      </li>
      <li class="nav-item">
        <a id="side" class="nav-link"  href="/products/wu/titleist">타이틀리스트</a>
      </li>
      <li class="nav-item">
        <a id="side" class="nav-link" href="/products/wu/honma">혼마</a>
      </li>
      <li class="nav-item">
        <a id="side" class="nav-link" href="/products/wu/xxio">젝시오</a>
      </li>
      <li class="nav-item">
        <a id="side" class="nav-link" href="/products/wu/yamaha">야마하</a>
      </li>
      <li class="nav-item">
        <a id="side" class="nav-link" aria-current="page" href="/products/wu/mizuno">미즈노</a>
      </li>
      <li class="nav-item">
        <a id="active" class="nav-link active" aria-current="page" href="/products/wu/fourteen">포틴</a>
      </li>
      <li class="nav-item">
        <a id="side" class="nav-link" href="/products/wu/majesty">마제스티</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name:'WuFourteen',

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