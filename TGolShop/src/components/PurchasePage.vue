<template>
  <div>
    <div v-if="cartModal" align="center" class="black-bg d-none d-sm-block">
      <div class="white-bg border">
        <h4>장바구니 담기 완료</h4>
        <p class="d-sm-block d-lg-none" style="font-size:15px">장바구니로 이동하시겠습니까?</p>
        <p class="d-sm-none d-lg-block" style="font-size:20px">장바구니로 이동하시겠습니까?</p>
        <div align='center'>
          <button @click="deleteCart" class="btn btn-light btn-sm border me-2">닫기</button>
          <button @click="moveCart" style="font-weight:bold;" class="btn btn-danger btn-sm ms-2">장바구니로 이동</button>
        </div>
      </div>
    </div>
    <div v-if="cartModal" align="center" class="black-bg2 d-block d-sm-none">
      <div class="white-bg2 border">
        <h4>장바구니 담기 완료</h4>
        <p  style="font-size:15px">장바구니로 이동하시겠습니까?</p>
        <div align='center'>
          <button @click="deleteCart" class="btn btn-light btn-sm border me-2">닫기</button>
          <button @click="moveCart" style="font-weight:bold;" class="btn btn-danger btn-sm ms-2">장바구니로 이동</button>
        </div>
      </div>
    </div>

    <!-- 상품 구매 상세 정보 -->
    <div v-if="purchaseDetail === false" class="container px-4 px-lg-5 my-5">
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
            <div v-if="product.deliverKor" style="font-size:19px">당일 배송 (15시 이전 주문 건)</div> 
            <div v-if="product.deliverOut" style="font-size:19px">배송 완료까지 최대 2주 소요</div>
          </div>
        
          <select id="optionText" @change="selectOption" class="form-select mb-2" aria-label="Default select example">
            <option>옵션 선택</option>
            <option v-for="(item, index) in product.optionData" :key="index" :value="item.optionPrice" :selected="index === 0"> 
              {{item.optionText}}({{item.optionPrice}}원 추가)
            </option>
          </select>
          <select id="orderNum" @change="selectNum" class="form-select mb-4" aria-label="Default select example">
            <option value="0">상품 수량</option>
            <option selected value="1">1개</option>
            <option value="2">2개</option>
            <option value="3">3개</option>
          </select>
          <div class="d-flex mb-3">
            <span class="me-3" style="font-size:25px; font-weight:900; color:red;">최종 금액:</span>
            <span class="me-1" style="font-size:25px; font-weight:900"> {{filter(calTotal(product.productPrice, optionPrice, optionSelected, orderNum))}} </span>
            <span style="font-size:25px; font-weight:900"> 원 </span>
            
          </div>  
          <div v-if="loginCheck === false" class="mb-2">
            <span style="font-weight: bold; color:red;">회원가입 시 3000 포인트 지급</span>
          </div>
          
          <div class="d-flex mb-2">
            
            <button @click="addCart" class="btn btn-outline-success flex-shrink-0 me-1" style="font-weight:bold;" type="button">
                <i class="bi-cart-fill me-1"></i>
                장바구니 담기
            </button>
            <button v-if="loginCheck" @click="clickPurchase" class="btn btn-danger" style="font-weight:bold;">구매하기</button>
            <button v-if="loginCheck === false" @click="clickPurchase" class="btn btn-danger" style="font-weight:bold;">비회원 주문</button>
          </div>
        </div>
        

        <!-- 상품 상세 정보 -->
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

        <!-- 상세 정보 -->
        <div class="col-12 border">
          <div v-if="productInfo" class="col-12 d-flex">
            <div class="d-none d-md-block col-md-1 col-xl-2"></div>
            <div class="col-12 col-md-10 col-xl-8">
              <img :src='infoImage' alt="product" class="img-fluid mt-5">
            </div>
            <div class="d-none d-md-block col-md-1 col-xl-2"></div>
          </div>

          <!-- 관련 상품 -->
          <div v-if="relatedProduct" class="container mt-5">
            <div class="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4 g-4">
              <div class="col" v-for="item in relatedList" :key="item">
                <div @click="clickCard" style="cursor:pointer;" class="card shadow-sm">
                  <div id="img-border">
                    <img id="image" :src='`${item.thumbnail}`' alt="드라이버" class="img-fluid img-thumbnail">
                  </div>
                  <div class="d-flex">
                    <span class="ms-1" style="font-size:11px;">상품 코드: </span>
                    <span class="ms-1" style="font-size:11px;">{{item.id}}</span>
                    <span v-if="item.deliverOut" class="ms-2" style="font-size:11px; color:red; font-weight:bold;">[해외직구]</span>
                  </div>
                  
                  <div class="card-body">
                    
                    <div id="text-border1" class="d-lg-none">
                      <p id="product-text" class="card-text" style="font-weight:600; font-size: 13px;"> {{item.productName}} </p>
                    </div>
                    <div id="text-border2" class="d-none d-lg-block">
                      <p id="product-text" class="card-text" style="font-weight:600; font-size: 17px;"> {{item.productName}} </p>
                    </div>
                    
                    <span class="text-decoration-line-through" style="font-weight:bold; color:gray">{{filter(item.beforeDiscount)}} 원</span>
                    <div class="d-none d-lg-block">
                      <span style="font-weight:900; font-size:30px; color:red;"> {{discount(item.beforeDiscount, item.productPrice, 0)}}% </span>
                      <span style="font-weight:900; font-size:22px;"> {{filter(item.productPrice)}} 원 </span>
                    </div>
                    <div class="d-block d-lg-none">
                      <span style="font-weight:900; font-size:24px; color:red;"> {{discount(item.beforeDiscount, item.productPrice, 0)}}% </span>
                      <span style="font-weight:900; font-size:21px;"> {{filter(item.productPrice)}} 원 </span>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>

          <!-- 상품 리뷰 -->
          <div class="mb-3" v-if="review" >
            <div class="row p-5 bg-light rounded-3 mt-3">
              <div class="row col-6">
                <div class="col-0 col-md-2 col-xl-3"></div>
                <div class="col-12 col-md-10 col-xl-9" align='left'>
                  <div class="d-none d-lg-block ms-2 mb-2" style="font-size:30px; font-weight:bold;">상품후기({{product.reviews}})</div>
                  <div class="d-block d-lg-none ms-2 mb-2" style="font-size:19px; font-weight:bold;">상품후기({{product.reviews}})</div>
                  <star-rating class="d-none d-lg-block" :rating="totalReview.average" :show-rating="false" :read-only="true" :increment="0.01"></star-rating>
                  <star-rating class="d-block d-lg-none" :star-size="30" :rating="totalReview.average" :show-rating="false" :read-only="true" :increment="0.01"></star-rating>
                  <div class="d-none d-lg-block ms-5 mt-3" style="font-size:20px">
                    평점 평균 : {{totalReview.average}}/5
                  </div>
                  <div class="d-block d-lg-none ms-2 mt-3" style="font-size:14px">
                    평점 평균 : {{totalReview.average}}/5
                  </div>
                </div>
                
              </div>
              <div class="row col-6">
                <div class="col-lg-1 col-0"></div>
                <div class="col-lg-10 col-xl-9 col-12 ms-5">
                  <div class="d-flex mb-3 ">
                    <div class="col-3 col-lg-1" style="font-size:15px">5점</div>
                    <div class="col-lg-9 col-8 progress">
                      <div class="progress-bar bg-warning" role="progressbar" aria-label="Success example" :style="`width: ${totalReview.fivePer}%`" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div class="col-2 ms-1" style="font-size:15px">{{totalReview.fivePer}}%</div>
                  </div>
                  <div class="d-flex mb-3">
                    <div class="col-3 col-lg-1" style="font-size:15px">4점</div>
                    <div class="col-lg-9 col-8 progress">
                      <div class="progress-bar bg-warning" role="progressbar" aria-label="Success example" :style="`width: ${totalReview.fourPer}%`" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div class="col-2 ms-1" style="font-size:15px">{{totalReview.fourPer}}%</div>
                  </div>
                  <div class="d-flex mb-3">
                    <div class="col-3 col-lg-1" style="font-size:15px">3점</div>
                    <div class="col-lg-9 col-8 progress">
                      <div class="progress-bar bg-warning" role="progressbar" aria-label="Success example" :style="`width: ${totalReview.threePer}%`" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div class="col-2 ms-1" style="font-size:15px">{{totalReview.threePer}}%</div>
                  </div>
                  <div class="d-flex mb-3">
                    <div class="col-3 col-lg-1" style="font-size:15px">2점</div>
                    <div class="col-lg-9 col-8 progress">
                      <div class="progress-bar bg-warning" role="progressbar" aria-label="Success example" :style="`width: ${totalReview.twoPer}%`" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div class="col-2 ms-1" style="font-size:15px">{{totalReview.twoPer}}%</div>
                  </div>
                  <div class="d-flex mb-3">
                    <div class="col-3 col-lg-1" style="font-size:15px">1점</div>
                    <div class="col-lg-9 col-8 progress">
                      <div class="progress-bar bg-warning" role="progressbar" aria-label="Success example" :style="`width: ${totalReview.onePer}%`" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div class="col-2 ms-1" style="font-size:15px">{{totalReview.onePer}}%</div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 리뷰 목록 -->
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

          <!-- 상품 문의 -->
          <div class="mb-3" v-if="qna">
            <div class="row p-5 bg-light rounded-3 mt-3">
              <div class="row d-block d-sm-none" align="left" style="font-weight:30; font-size:17px;">
                상품에 관하여 궁금한 것을 물어보세요.
              </div>
              <div class="row d-none d-sm-block" align="left" style="font-weight:30; font-size:23px;">
                상품에 관하여 궁금한 것을 물어보세요.
              </div>
              <li class="row mb-4 d-block d-sm-none" align="left" style="color:darkgray; font-size: 13px;">
                상품 문의를 통한 교환, 반품은 처리되지 않습니다.
              </li>
              <li class="row mb-4 d-none d-sm-block" align="left" style="color:darkgray;">
                상품 문의를 통한 교환, 반품은 처리되지 않습니다.
              </li>

              <div class="row">
                <textarea v-bind:value="qnaText" @input="inputQna" class="col-12 d-block d-sm-none" id="qna" cols="30" rows="3"></textarea>
                <textarea v-bind:value="qnaText" @input="inputQna" class="col-10 d-none d-sm-block" id="qna" cols="30" rows="3"></textarea>
                <button @click="qnaSubmit" class="btn btn-secondary btn-sm col-2 d-none d-sm-block" style="font-weight:bold;">등록</button>
              </div>
              <div align="right" class="mt-1 d-block d-sm-none">
                <span>{{ qnaText.length }}/100</span>
                <button @click="qnaSubmit" class="btn btn-secondary btn-sm col-2 me-2 ms-1" style="font-weight:bold;">등록</button>
              </div>
              <div align="left" class="d-none d-sm-block">
                <span>{{ qnaText.length }}/100</span>
              </div>
            </div>

            <!-- 문의 목록 -->
            <div v-for="item in qnaList" :key="item" align='left'>
              <hr/>
              <div>
                <span> 작성자 : {{item.nickName}}</span>
                <span style="font-size:12px" class="ms-2">{{item.date}} </span>
              </div>
              <div class="mt-3">
                {{item.text}}
              </div>
              <div style="color:red;" v-if="item.reply === false" class="mt-3">
                답변 미등록
              </div>
              <div style="font-weight:bold;" v-if="item.reply" class="mt-3">
                관리자의 답변: {{item.adminText}}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- 결제 상세 정보 -->
    <div v-if="purchaseDetail" class="container">
      <div class="mt-4 mb-4">
        <h1 align='left'>주문/결제</h1>
      </div>
      <hr/>
      <div class="mt-3 mb-3">
        <h4 v-if="loginCheck" style="font-weight:bold;" align="left">배송지 입력 (수정 가능)</h4>
      </div>
      <div class="mt-3 mb-3">
        <h4 v-if="loginCheck === false" style="font-weight:bold;" align="left">배송지 입력</h4>
      </div>
      <div class="border">
        <div class="col-6 col-lg-3 ms-1 me-1 mt-3 mb-3">
          <div align='left' class="ms-1 mb-1">성명</div>
          <input v-bind:value="name" @input="inputName" type="text" class="form-control mb-2" id="name" placeholder="성명" maxlength="6">
          <div align='left' class="ms-1 mb-1">휴대폰 번호</div>
          <input v-bind:value="phoneNum" @input="inputPhoneNum" type="tel" class="form-control mb-2" id="phoneNum" placeholder="휴대폰 번호 (10~11자)" maxlength="11">
        </div>
        <div class="ms-1 col-11 col-lg-7 mt-3">
          <div class="d-flex">
            <div class="col-6">
              <input type="text" class="form-control mb-2" id="address-num" v-model="addressNum" placeholder="우편번호" readonly>
            </div>
            <div class="col-auto ms-1">
              <button  type="button" class="btn btn-light border" @click="inputAddress">우편번호 찾기</button>
            </div>
          </div>
          <div class="d-flex">
            <div class="col-9 pe-1">
              <input type="text" class="form-control mb-2" id="address1" v-model="address" placeholder="주소"  readonly>
            </div>
            <div class="col-3 ps-1" >
              <input type="text" class="form-control mb-2" id="address3" v-model="addressName" placeholder="" readonly>
            </div>
          </div>
          <div class="d-flex">
            <div class="col-12">
              <input type="text" class="form-control mb-2" id="detailAddress" v-model="detailAddress" placeholder="상세주소" maxlength="25">
            </div>
          </div>
          <div v-if="product.deliverOut" class="mt-2">
            <div align='left' class="ms-1 mb-1">개인통관고유부호</div>
            <input v-model="personalNum" type="text" class="form-control mb-2" id="personalNum" placeholder="개인통관고유부호" maxlength="13">
          </div>
        </div>
      </div>

      <!-- 주문 정보 -->
      <div class="mt-4 mb-3">
        <h4 style="font-weight:bold;" align='left'>주문상품</h4>
      </div>
      <hr/>
      <div class="border">
        <div class="row mt-4">
          <div class="col-6"> <h6>주문상품 및 옵션</h6></div>
          <div class="col-2"><h6>수량</h6></div>
          <div class="col-4"> <h6>상품금액</h6></div>
        </div>
        <hr/>
        <div class="row">
          <div class="col-6">
            <div class="d-none d-lg-block"> <h5>{{product.productName}}</h5> </div>
            <div class="d-block d-lg-none"> <h6>{{product.productName}}</h6> </div>
            <div style="color:darkgray">{{optionText}}</div>
          </div>
          <div class="col-2 d-none d-lg-block"><h5> {{orderNum}} </h5></div>
          <div class="col-2 d-block d-lg-none"><h6> {{orderNum}} </h6></div>
          <div class="col-4">
            <div class="d-none d-lg-block" style="font-weight:bold;"> <h5>{{filter(totalPrice)}} 원</h5>  </div>
            <div class="d-block d-lg-none" style="font-weight:bold;"> <h6>{{filter(totalPrice)}} 원</h6>  </div>
          </div>
        </div>
      </div>

      <!-- 포인트 사용 -->
      <div v-if="tossModal === false">
        <div class="mt-4" align="left">
          <span>보유 중인 포인트 : {{ leavedPoint }} P</span>
        </div>
        <div class="mt-2" align="left">
          <span>사용할 포인트 : </span>
          <input v-bind:value="usePoint" @input="inputPoint" type="text">
        </div>
      </div>


      <!-- 결제 방식 선택 -->
      <div class="mt-2 d-flex" v-if="payMethodModal">
        <div align="left" class="me-2">
          <span>결제 방식 : </span> 
        </div>
        <div align="left">
          <select id="payMethod" @change="selectPay" aria-label="Default select example">
            <option selected value="선택">선택</option>
            <option value="무통장입금">무통장입금</option>
            <option value="일반결제">일반결제</option>
          </select>
        </div>
      </div>
      
      <!-- 결제 모달창 -->
      <div class="d-flex mt-4" v-if="tossModal === false">
        <h3 class="d-none d-sm-block" style="color:red; font-weight:bold;">결제 금액:</h3>
        <h5 class="d-block d-sm-none" style="color:red; font-weight:bold;">결제 금액:</h5>
        <h3 class="ms-3 d-none d-sm-block"> {{filter(leavedPrice)}} 원 </h3>
        <h5 class="ms-3 d-block d-sm-none"> {{filter(leavedPrice)}} 원 </h5>
        <button @click="clickToss" class="btn btn-danger btn-sm ms-4 d-block d-sm-none" style="font-weight:bold;">결제하기</button>
        <button @click="backPage" class="btn btn-outline-success btn-sm flex-shrink-0 ms-1 d-block d-sm-none" style="font-weight:bold;" type="button">이전페이지</button>
        <button @click="clickToss" class="btn btn-danger d-none d-sm-block ms-4 " style="font-weight:bold;">결제하기</button>
        <button @click="backPage" class="btn btn-outline-success d-none d-sm-block flex-shrink-0 ms-1" style="font-weight:bold;" type="button">이전페이지</button>
      </div>
      <hr/>
      <div id="payment-method"></div>
      <div class="mt-2 d-flex" v-if="tossModal">
        <h3 class="d-none d-sm-block" style="color:red; font-weight:bold;">결제 금액:</h3>
        <h5 class="d-block d-sm-none" style="color:red; font-weight:bold;">결제 금액:</h5>
        <h3 class="ms-3 d-none d-sm-block"> {{filter(leavedPrice)}} 원 </h3>
        <h5 class="ms-3 d-block d-sm-none"> {{filter(leavedPrice)}} 원 </h5>
        <button @click="clickFinal" class="btn btn-danger btn-sm ms-4 d-block d-sm-none" style="font-weight:bold;">결제하기</button>
        <button @click="backPage" class="btn btn-outline-success btn-sm flex-shrink-0 ms-1 d-block d-sm-none" style="font-weight:bold;" type="button">이전페이지</button>
        <button @click="clickFinal" class="btn btn-danger d-none d-sm-block ms-4 " style="font-weight:bold;">결제하기</button>
        <button @click="backPage" class="btn btn-outline-success d-none d-sm-block flex-shrink-0 ms-1" style="font-weight:bold;" type="button">이전페이지</button>
      </div>
    </div>
    
  </div>
  
  
</template>

<script>
import axios from 'axios';
import { useRoute, useRouter, } from 'vue-router'
import { ref } from '@vue/reactivity'
import StarRating from 'vue-star-rating'
import { watch } from 'vue';
import { loadPaymentWidget, ANONYMOUS } from '@tosspayments/payment-widget-sdk'

export default {
  name: 'PurchasePage',
  components: {
    StarRating
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const paymentMethod = ref(null);
    let paymentWidget = ref(null);
    let imagePath = ref('');
    let infoImage = ref('');
    let product = ref({});
    let productId = ref(0);
    let optionText = ref('');
    let optionPrice = ref(0);
    let orderNum = ref('1');
    let optionSelected = ref(1);
    let productInfo = ref(true);
    let relatedProduct = ref(false);
    let review = ref(false);
    let qna = ref(false);
    let relatedList = ref([]);
    let reviews = ref([]);
    let totalReview = ref({});
    let purchaseDetail = ref(false);
    let id = ref('');
    let nickName = ref('');
    let name = ref('');
    let phoneNum = ref('');
    let addressNum = ref('');
    let address = ref('');
    let addressName = ref('');
    let detailAddress = ref('');
    let totalPrice = ref(0);
    let loginCheck = ref(false);
    let cartModal = ref(false);
    let qnaText = ref('');
    let qnaList = ref([]);
    let point = ref(0);
    let usePoint = ref(0);
    let leavedPoint = ref(0);
    let leavedPrice = ref(0);
    let tossModal = ref(false);
    let payMethod = ref('선택');
    let payMethodModal = ref(true);
    let personalNum = ref('');
    


    axios.get('/api/product/purchase/' + route.params.id)
    .then(res=>{
      //사진사용
      if(res.data.userInfo !== 'not login') loginCheck.value = true;
      product.value = res.data.product;
      imagePath.value = res.data.product.thumbnail;
      infoImage.value = res.data.product.infoImage;
      relatedList.value = res.data.relatedList;
      reviews.value = res.data.reviews
      totalReview.value = res.data.totalReview;
      qnaList.value = res.data.qna;
      
      optionPrice.value = product.optionData[0].optionPrice;
      optionText.value = product.optionData[0].optionText;
    })
    .catch(err=>{
      console.log(err);
    });

  
    


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
      } else {
        optionText.value = optionSelect.options[document.getElementById('optionText').selectedIndex].text;
        optionPrice.value = optionSelect.options[document.getElementById('optionText').selectedIndex].value;
        optionSelected.value = 1;
      }
    }

    // 주문 개수
    function selectNum() {
      let numberSelect = document.getElementById('orderNum');
      orderNum.value = numberSelect.options[document.getElementById('orderNum').selectedIndex].value;
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
      router.push({name : 'PurchasePage', params : {id : productId}});
    }

    function clickPurchase() {
      if(optionSelected.value === 0) {
        alert('옵션을 선택하여 주십시오.');
      } else if(orderNum.value === '0') {
        alert('주문 개수를 선택하여 주십시오.')
      } else {
        axios.get('/api/product/purchase-detail')
        .then(res=>{
          if(res.data !== 'need login') {
            id.value = res.data.id;
            nickName.value = res.data.nickName;
            name.value = res.data.name;
            phoneNum.value = res.data.phoneNum;
            addressNum.value = res.data.addressNum;
            address.value = res.data.address;
            addressName.value = res.data.addressName;
            detailAddress.value = res.data.detailAddress;
            point.value = res.data.point;
            leavedPoint.value = res.data.point;
          }
          purchaseDetail.value = true;
        })
        .catch(err=>{
          console.log(err);
        });
      }
    }

    function inputName(e) {
      name.value = e.target.value;
    }

    function inputPhoneNum(e) {
      phoneNum.value = e.target.value;
    }

    watch(phoneNum, (newValue, oldValue)=>{
      
      let blank_pattern = /[\s]/g;
      if (isNaN(newValue) || blank_pattern.test(newValue) ) {
        phoneNum.value = oldValue;
      }
    });

    function inputAddress() {
      new window.daum.Postcode({
        oncomplete: function(data) {
          let addr = '';
          let extraAddr = '';
          if (data.userSelectedType === 'R') {
            addr = data.roadAddress;
          } else {
            addr = data.jibunAddress;
          }

          if (data.userSelectedType === 'R') {
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
              extraAddr += data.bname;
            }

            if(data.buildingName !== '' && data.apartment === 'Y') {
              extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }

            if(extraAddr !== '') {
              extraAddr = ' (' + extraAddr + ')';
            }

            addressName.value = extraAddr;
          } else {
            addressName.value = '';
          }

          addressNum.value = data.zonecode;
          address.value = addr;
          document.getElementById('detailAddress').focus();
        }
      }).open();
    }

  


    // 결제 방식 선택
    function selectPay() {
      let numberSelect = document.getElementById('payMethod');
      payMethod.value = numberSelect.options[document.getElementById('payMethod').selectedIndex].value;
    }

    // 결제 입력
    function clickToss() {
      if(payMethod.value === '선택') {
        alert('결제 방식을 선택해 주십시오.');
      } else if(payMethod.value === '무통장입금') {
        if(
          name.value === '' ||
          phoneNum.value === '' ||
          addressNum.value === '' ||
          address.value === '' ||
          detailAddress.value === ''
        ) alert('배송지 정보를 모두 입력해 주십시오.');
        else if(product.value.deliverOut === true && personalNum.value === '') alert('해외직구 상품 주문 시 개인통관고유부호를 필히 입력하셔야 합니다.');
        else {
          
          let date = new Date()
          let year = date.getFullYear();
          let month = date.getMonth() + 1;
          let day = date.getDate();
          let hour = date.getHours();
          let minuite = date.getMinutes();
          let second = date.getSeconds();
          let orderId = year.toString() 
            + (("00" + month.toString()).slice(-2)) 
            + (("00" + day.toString()).slice(-2))
            + (("00" + hour.toString()).slice(-2)) 
            + (("00" + minuite.toString()).slice(-2)) 
            + (("00" + second.toString()).slice(-2));
          
          let purchaseInfo = {
            nickName : nickName.value,
            name : name.value,
            phoneNum : phoneNum.value,
            addressNum : addressNum.value,
            address : address.value,
            addressName : addressName.value,
            detailAddress : detailAddress.value,
            productId : product.value.id,
            productName : product.value.productName,
            orderNum : orderNum.value,
            optionText : optionText.value,
            totalPrice : totalPrice.value,
            payPrice : leavedPrice.value,
            payMethod : payMethod.value,
            leavedPoint : leavedPoint.value,
            orderId : orderId,
            personalNum : personalNum.value,
            deliverOut : product.value.deliverOut
          }
          axios.post('/api/product/purchase', purchaseInfo)
          .then(()=>{
            router.push({name : 'PurchaseComplete', query : {payMethod : payMethod.value, price : leavedPrice.value, cashOrderId : orderId}});
          })
          .catch(err=>{
            console.log(err);
          });
        }
        
      } else if(payMethod.value === '일반결제') {
        payMethodModal.value = false;
        tossModal.value = true;

        if(loginCheck.value === true) {
          loadPaymentWidget(process.env.VUE_APP_CLIENT_KEY, id.value)
          .then(payment=>{
            paymentWidget.value = payment;
            paymentWidget.value.renderPaymentMethods('#payment-method', leavedPrice.value);
          })
          .catch(err=>{
            console.log(err);
          })
        } else {
          loadPaymentWidget(process.env.VUE_APP_CLIENT_KEY, ANONYMOUS)
          .then(payment=>{
            paymentWidget.value = payment;
            paymentWidget.value.renderPaymentMethods('#payment-method', leavedPrice.value);
          })
          .catch(err=>{
            console.log(err);
          })
        }
      }
    }


    // 최종 결제
    function clickFinal() {
      if(
        name.value === '' ||
        phoneNum.value === '' ||
        addressNum.value === '' ||
        address.value === '' ||
        detailAddress.value === ''
      ) alert('배송지 정보를 모두 입력해 주십시오.');
      else if(product.value.deliverOut === true && personalNum.value === '') alert('해외직구 상품 주문 시 개인통관고유부호를 필히 입력하셔야 합니다.');
      else {
        
        
        let date = new Date()
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minuite = date.getMinutes();
        let second = date.getSeconds();
        let orderId = year.toString() 
          + (("00" + month.toString()).slice(-2)) 
          + (("00" + day.toString()).slice(-2))
          + (("00" + hour.toString()).slice(-2)) 
          + (("00" + minuite.toString()).slice(-2)) 
          + (("00" + second.toString()).slice(-2));
        
        let purchaseInfo = {
          nickName : nickName.value,
          name : name.value,
          phoneNum : phoneNum.value,
          addressNum : addressNum.value,
          address : address.value,
          addressName : addressName.value,
          detailAddress : detailAddress.value,
          productId : product.value.id,
          productName : product.value.productName,
          orderNum : orderNum.value,
          optionText : optionText.value,
          totalPrice : totalPrice.value,
          payPrice : leavedPrice.value,
          payMethod : payMethod.value,
          leavedPoint : leavedPoint.value,
          personalNum : personalNum.value,
          deliverOut : product.value.deliverOut
        }
        let data = 'info=' + encodeURIComponent(JSON.stringify(purchaseInfo));

        const redirectUrl = process.env.VUE_APP_TGOLSHOP + '/product/submit?' + data;

        paymentWidget.value.requestPayment({
          orderId: orderId,
          orderName: product.value.productName,
          successUrl: redirectUrl,
          failUrl: process.env.VUE_APP_TGOLSHOP + '/product/submitFail',
          customerName: name.value
        });
      
      }
    }

    // 총 금액
    function calTotal(productPrice, optionPrice, optionSelected, orderNum) {
      totalPrice.value = (productPrice * 1 + optionPrice * 1)*optionSelected*orderNum;
      leavedPrice.value = (productPrice * 1 + optionPrice * 1)*optionSelected*orderNum;
      return totalPrice.value;
    }

    function backPage() {
      router.go(0);
    }

    function deleteCart() {
      cartModal.value = false;
    }

    // 장바구니 담기
    function addCart() {
      if(loginCheck.value === false) {
        alert('로그인이 필요합니다.');
        router.push({path:'/customer/login'});
      } else if(optionSelected.value === 0) {
        alert('옵션을 선택하여 주십시오.');
      } else if(orderNum.value === '0') {
        alert('주문 개수를 선택하여 주십시오.')
      }else{
        let cartData = {
          productId : product.value.id,
          productName : product.value.productName,
          option : optionText.value,
          deliverOut : product.value.deliverOut,
          orderNum : orderNum.value,
          totalPrice : totalPrice.value
        }
        axios.put('/api/product/addCart', cartData)
        .then(()=>{
          
          cartModal.value = true;
        })
        .catch(err=>{
          console.log(err);
        });
      }
    }

    function mypage() {
      router.push({path:'/customer/mypage'});
    }


    // 장바구니로 이동
    function moveCart() {
      axios.get('/api/customer/mypage/getNick')
      .then(result=>{
        let nick = result.data;
        router.push({name:'MyPage', query:{nickName:nick, cart: 1}});
      })
      .catch(err=>{
        console.log(err);
      });
    }

    function inputQna(e) {
      if(e.target.value.length <= 100) {
        qnaText.value = e.target.value;
      } else {
        alert('100자 이내로 입력하시기 바랍니다.');
        e.target.value = qnaText.value;
      }
    }

    function qnaSubmit() {
      if(qnaText.value === '') {
        alert('문의 내용을 입력해주십시오.');
      } else {
        let qnaData = {
          productName : product.value.productName,
          productId : product.value.id,
          text : qnaText.value
        }
        axios.post('/api/product/qnaSubmit', qnaData)
        .then((result)=>{
          if(result.data === 'need login') {
            alert('로그인이 필요합니다.');
            qnaText.value = '';
          } else {
            qnaText.value = '';
            alert('등록되었습니다.');
            qnaList.value = result.data;
          }
        })
        .catch(err=>{
          console.log(err);
        })
      }
    }

    function inputPoint(e) {
      usePoint.value = e.target.value;
      leavedPoint.value = point.value - e.target.value;
      leavedPrice.value = totalPrice.value - e.target.value;
    }
    watch(usePoint, (newValue, oldValue)=>{
      let blank_pattern = /[\s]/g;
      if (isNaN(newValue) || blank_pattern.test(newValue) ) {
        usePoint.value = oldValue;
        leavedPoint.value = point.value - oldValue;
        leavedPrice.value = totalPrice.value - oldValue;
      } else if(newValue > point.value) {
        alert('보유한 포인트까지만 사용가능합니다.');
        usePoint.value = oldValue;
        leavedPoint.value = point.value - oldValue;
        leavedPrice.value = totalPrice.value - oldValue;
      }
    });



    
    

    return{productId, product, filter, discount, selectOption, imagePath, optionPrice, optionText, selectNum, optionSelected, orderNum, infoImage,
    productInfo, relatedProduct, review, qna, clickProdInfo, clickRelProd,clickReview, clickQna, relatedList, clickCard, reviews,
    totalReview, purchaseDetail, clickPurchase, id, name, phoneNum, addressNum, address, addressName, detailAddress, calTotal, totalPrice, backPage, loginCheck,
    clickFinal, inputName, inputPhoneNum, cartModal, deleteCart, addCart, mypage, moveCart, inputAddress, inputQna, qnaText, qnaSubmit, qnaList,
    point, usePoint, inputPoint, leavedPoint, leavedPrice, paymentMethod, tossModal, clickToss, payMethod, selectPay, payMethodModal, personalNum};
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

body {
  margin : 0;
}
div {
  box-sizing: border-box;
}
.black-bg {
  width: 100%; height:100%;
  position: fixed; padding: 20px;
}
.white-bg {
  width: 50%; background: white;
  border-radius: 8px;
  padding: 20px;
} 

.black-bg2 {
  width: 100%; height:100%;
  position: fixed; padding: 20px;
}
.white-bg2 {
  width: 80%; background: white;
  border-radius: 8px;
  padding: 20px;
} 
</style>