<template>
  <div class="container">
    <div align='left' class="mt-4">
      <h1>마이페이지</h1>
      <span style="color:darkgray">나의 주문 정보 및 개인 정보를 관리할 수 있습니다</span>
    </div>
    <hr/>

    <div class="border mt-3" v-if="updateKey === 0">
      <ul class="nav nav-pills nav-fill" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button @click="clickPurchaseData" class="nav-link mypage-option active" id="purchase-data" data-bs-toggle="pill" type="button" role="tab" aria-selected="true">주문목록</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickDeliInfo" class="nav-link mypage-option" id="deliInfo" data-bs-toggle="pill" type="button" role="tab" aria-selected="true">배송조회</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickCart" class="nav-link mypage-option" id="cart" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">장바구니</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickReviews" class="nav-link mypage-option" id="reviews" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">리뷰관리</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickQna" class="nav-link mypage-option" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">1:1문의</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickPoint" class="nav-link mypage-option" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">포인트</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickInfo" class="nav-link mypage-option col-3" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">정보수정</button>
        </li>
      </ul>
    </div>
    <div class="border mt-3" v-if="updateKey === 1">
      <ul class="nav nav-pills nav-fill" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button @click="clickPurchaseData" class="nav-link mypage-option" id="purchase-data" data-bs-toggle="pill" type="button" role="tab" aria-selected="true">주문목록</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickDeliInfo" class="nav-link mypage-option" id="deliInfo" data-bs-toggle="pill" type="button" role="tab" aria-selected="true">배송조회</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickCart" class="nav-link mypage-option active" id="cart" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">장바구니</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickReviews" class="nav-link mypage-option" id="reviews" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">리뷰관리</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickQna" class="nav-link mypage-option" id="Qna" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">1:1문의</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickPoint" class="nav-link mypage-option" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">포인트</button>
        </li>
        <li class="nav-item" role="presentation">
          <button @click="clickInfo" class="nav-link mypage-option col-3" data-bs-toggle="pill" type="button" role="tab" aria-selected="false">정보수정</button>
        </li>
      </ul>
    </div>
    <div v-if="purchaseList">
      <div class="mt-3" align="left">
        <span style="color:darkgray">결제취소, 반품은 1:1문의로 문의 부탁드립니다.</span>
      </div>  
      
      <div>
        <div>
          <hr/>
          <div class="row mt-4">
            <div class="col-5"> <h6>주문상품 및 옵션</h6></div>
            <div class="col-2"><h6>수량</h6></div>
            <div class="col-3"> <h6>상품금액</h6></div>
            <div class="col-2"><h6>상태</h6></div>
          </div>
          <div class="row" v-for="item in mypageData.purchaseData" :key="item">
            <hr/>
            <div class="col-5">
              <div class="d-none d-lg-block"> <h5>{{item.productName}}</h5> </div>
              <div class="d-block d-lg-none"> <h6>{{item.productName}}</h6> </div>
              <div style="color:darkgray; font-size: 14px;">{{item.optionText}}</div>
            </div>
            <div class="col-2 d-none d-lg-block"><h5> {{item.orderNum}} </h5></div>
            <div class="col-2 d-block d-lg-none"><h6> {{item.orderNum}} </h6></div>
            <div class="col-3">
              <div class="d-none d-lg-block" style="font-weight:bold;"> <h5>{{filter(item.totalPrice)}} 원</h5>  </div>
              <div class="d-block d-lg-none" style="font-weight:bold;"> <h6>{{filter(item.totalPrice)}} 원</h6>  </div>
            </div>
            <div class="col-2">
              <div style="font-size: small;" class="d-block d-md-none"> {{ item.currentState }} </div>
              <div class="d-none d-md-block"> {{ item.currentState }} </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    <div v-if="cart">
      <div>
        <div>
          <div class="row mt-4">
            <div class="col-5"> <h6>상품 및 옵션</h6></div>
            <div class="col-2"><h6>수량</h6></div>
            <div class="col-3"> <h6>상품금액</h6></div>
            <div class="col-2"><h6></h6></div>
          </div>
          <div class="row" v-for="item in mypageData.cart" :key="item">
            <hr/>
            <div class="col-5">
              <div class="d-none d-lg-block"> <h5>{{item.productName}}</h5> </div>
              <div class="d-block d-lg-none"> <h6>{{item.productName}}</h6> </div>
              <div style="color:darkgray">{{item.productOption}}</div>
            </div>
            <div class="col-2 d-none d-lg-block"><h5> {{item.productNum}} </h5></div>
            <div class="col-2 d-block d-lg-none"><h6> {{item.productNum}} </h6></div>
            <div class="col-3">
              <div class="d-none d-lg-block" style="font-weight:bold;"> <h5>{{filter(item.totalPrice)}} 원</h5>  </div>
              <div class="d-block d-lg-none" style="font-weight:bold;"> <h6>{{filter(item.totalPrice)}} 원</h6>  </div>
            </div>
            <div class="col-2">
              <button @click="deleteCart" class="btn btn-danger btn-sm">삭제</button>
              <!-- <div style="font-size: small;" class="d-block d-md-none"> {{ item.currentState }} </div>
              <div class="d-none d-md-block"> {{ item.currentState }} </div> -->
            </div>
          </div>
        </div>
        
      </div>
      <hr/>
      <div class="mt-4 d-flex">
        <h3 style="color:red; font-weight:bold;">총 결제 금액:</h3>
        <h3 class="ms-3"> {{filter(totalPrice)}} 원 </h3>
        <button @click="clickPurchase" class="btn btn-danger ms-4" style="font-weight:bold;">결제하기</button>
      </div>
    </div>

    <!-- purchase detail -->
    <div v-if="purchaseDetail" class="container">
      <div class="mt-4 mb-4">
        <h1 align='left'>주문/결제</h1>
      </div>
      <hr/>
      <div class="mt-3 mb-3">
        <h4 style="font-weight:bold;" align="left">배송지 입력 (수정 가능)</h4>
      </div>
      <div class="border">
        <div class="col-5 col-lg-3 ms-1 me-1 mt-3 mb-3">
          <div align='left' class="ms-1 mb-1">성명</div>
          <input v-bind:value="mypageData.name" @input="inputName" type="text" class="form-control mb-2" id="name" placeholder="성명" maxlength="6">
          <div align='left' class="ms-1 mb-1">휴대폰 번호</div>
          <input v-bind:value="mypageData.phoneNum" @input="inputPhoneNum" type="tel" class="form-control mb-2" id="phoneNum" placeholder="휴대폰 번호 (10~11자)" maxlength="11">
        </div>
        <div class="ms-1 col-11 col-lg-7 mt-3">
          <div class="d-flex">
            <div class="col-6">
              <input type="text" class="form-control mb-2" id="address-num" v-model="mypageData.addressNum" placeholder="우편번호" readonly>
            </div>
            <div class="col-auto ms-1">
              <button  type="button" class="btn btn-light border" @click="inputAddress">우편번호 찾기</button>
            </div>
          </div>
          <div class="d-flex">
            <div class="col-9 pe-1">
              <input type="text" class="form-control mb-2" id="address1" v-model="mypageData.address" placeholder="주소"  readonly>
            </div>
            <div class="col-3 ps-1" >
              <input type="text" class="form-control mb-2" id="address3" v-model="mypageData.addressName" placeholder="" readonly>
            </div>
          </div>
          <div class="d-flex">
            <div class="col-12">
              <input type="text" class="form-control mb-2" id="detailAddress" v-model="mypageData.detailAddress" placeholder="상세주소" maxlength="25">
            </div>
            
          </div>
        </div>
      </div>
      <div class="mt-4 mb-3">
        <h4 style="font-weight:bold;" align='left'>주문상품</h4>
      </div>
      <hr/>
      <div>
        <div class="row mt-4">
          <div class="col-6"> <h6>주문상품 및 옵션</h6></div>
          <div class="col-2"><h6>수량</h6></div>
          <div class="col-4"> <h6>상품금액</h6></div>
        </div>
        <div class="row" v-for="item in mypageData.cart" :key="item">
          <hr/>
          <div class="col-6">
            <div class="d-none d-lg-block"> <h5>{{item.productName}}</h5> </div>
            <div class="d-block d-lg-none"> <h6>{{item.productName}}</h6> </div>
            <div style="color:darkgray">{{item.productOption}}</div>
          </div>
          <div class="col-2 d-none d-lg-block"><h5> {{item.productNum}} </h5></div>
          <div class="col-2 d-block d-lg-none"><h6> {{item.productNum}} </h6></div>
          <div class="col-4">
            <div class="d-none d-lg-block" style="font-weight:bold;"> <h5>{{filter(item.totalPrice)}} 원</h5>  </div>
            <div class="d-block d-lg-none" style="font-weight:bold;"> <h6>{{filter(item.totalPrice)}} 원</h6>  </div>
          </div>
        </div>
      </div>
      <div class="mt-4 d-flex">
        <h3 style="color:red; font-weight:bold;">총 결제 금액:</h3>
        <h3 class="ms-3"> {{filter(totalPrice)}} 원 </h3>
        <button @click="clickFinal" class="btn btn-danger ms-4" style="font-weight:bold;">결제하기</button>
        <button @click="clickBack" class="btn btn-outline-success flex-shrink-0 ms-1" style="font-weight:bold;" type="button">이전페이지</button>
      </div>
    </div>

    <!-- 배송조회 -->
    <div v-if="deliInfo">
      <div>
        <div>
          <div class="row mt-4">
            <div class="col-5"> <h6>상품 및 옵션</h6></div>
            <div class="col-4"><h6>운송장번호</h6></div>
            <div class="col-3"> <h6>조회</h6></div>
          </div>
          <div class="row" v-for="item in mypageData.purchaseData" :key="item">
            <hr/>
            <div class="col-5">
              <div class="d-none d-lg-block"> <h5>{{item.productName}}</h5> </div>
              <div class="d-block d-lg-none"> <h6>{{item.productName}}</h6> </div>
              <div style="color:darkgray">{{item.optionText}}</div>
            </div>
            <div class="col-4 d-none d-lg-block"><h5> {{item.deliNum}} </h5></div>
            <div class="col-4 d-block d-lg-none"><h6> {{item.deliNum}} </h6></div>
            <div class="col-3">
              <button @click="clickDeliNum" class="btn btn-light btn-sm border">배송조회</button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    <div v-if="reviews">
      <div>
        <div>
          <div class="row mt-4">
            <div class="col-5"> <h6>상품 및 옵션</h6></div>
            <div class="col-4"><h6>구매 날짜</h6></div>
            <div class="col-3"> <h6></h6></div>
          </div>
          <div class="row" v-for="item in mypageData.purchaseData" :key="item">
            <hr/>
            <div class="col-5">
              <div class="d-none d-lg-block"> <h5>{{item.productName}}</h5> </div>
              <div class="d-block d-lg-none"> <h6>{{item.productName}}</h6> </div>
              <div style="color:darkgray">{{item.optionText}}</div>
            </div>
            <div class="col-4 d-none d-lg-block"><h5> {{item.purchaseDate}} </h5></div>
            <div class="col-4 d-block d-lg-none"><h6> {{item.purchaseDate}} </h6></div>
            <div class="col-3">
              <button class="btn btn-light btn-sm border">리뷰쓰기</button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useRoute, useRouter} from 'vue-router'
import axios from 'axios';
import { watch } from 'vue';
export default {
  name: 'MyPage',
  setup() {
    const route = useRoute();
    const router = useRouter();
    let nickName = ref(route.query.nickName);
    let mypageData = ref({});
    let updateKey = ref(0);
    let purchaseList = ref(true);
    let cart = ref(false);
    let deliInfo = ref(false);
    let qna = ref(false);
    let point = ref(false);
    let info = ref(false);
    let reviews = ref(false);
    let totalPrice = ref(0);
    let purchaseDetail = ref(false);


    axios.get('/api/customer/mypage?nickName=' + route.query.nickName)
    .then(res=>{
      mypageData.value = res.data;
      if(route.query.cart === '1') {
        purchaseList.value = false;
        deliInfo.value = false;
        cart.value = true;
        reviews.value = false;
        qna.value = false;
        point.value = false;
        info.value = false;
        updateKey.value++;
      }
      for(let i = 0 ; i < res.data.cart.length; i++) {
        totalPrice.value += res.data.cart[i].totalPrice;
      }
    })
    .catch(err=>{
      console.log(err);
    })

    function filter(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    function clickPurchaseData() {
      purchaseList.value = true;
      deliInfo.value = false;
      cart.value = false;
      reviews.value = false;
      qna.value = false;
      point.value = false;
      info.value = false;
    }

    function clickDeliInfo() {
      purchaseList.value = false;
      deliInfo.value = true;
      cart.value = false;
      reviews.value = false;
      qna.value = false;
      point.value = false;
      info.value = false;
    }

    function clickCart() {
      purchaseList.value = false;
      deliInfo.value = false;
      cart.value = true;
      reviews.value = false;
      qna.value = false;
      point.value = false;
      info.value = false;
    }

    function clickReviews() {
      purchaseList.value = false;
      deliInfo.value = false;
      cart.value = false;
      reviews.value = true;
      qna.value = false;
      point.value = false;
      info.value = false;
    }

    function clickQna() {
      purchaseList.value = false;
      deliInfo.value = false;
      cart.value = false;
      reviews.value = false;
      qna.value = true;
      point.value = false;
      info.value = false;
    }

    function clickPoint() {
      purchaseList.value = false;
      deliInfo.value = false;
      cart.value = false;
      reviews.value = false;
      qna.value = false;
      point.value = true;
      info.value = false;
    }

    function clickInfo() {
      purchaseList.value = false;
      deliInfo.value = false;
      cart.value = false;
      reviews.value = false;
      qna.value = false;
      point.value = false;
      info.value = true;
    }

    function clickPurchase() {
      if(totalPrice.value === 0) {
        alert('결제할 상품이 없습니다.');
      } else {
        purchaseDetail.value = true;
        purchaseList.value = false;
        deliInfo.value = false;
        cart.value = false;
        reviews.value = false;
        qna.value = false;
        point.value = false;
        info.value = false;
      }
    }

    function clickBack() {
      purchaseDetail.value = false;
      purchaseList.value = false;
      deliInfo.value = false;
      cart.value = true;
      reviews.value = false;
      qna.value = false;
      point.value = false;
      info.value = false;
    }

    function inputName(e) {
      mypageData.value.name = e.target.value;
    }

    function inputPhoneNum(e) {
      mypageData.value.phoneNum = e.target.value;
    }

    watch(mypageData.value.phoneNum, (newValue, oldValue)=>{
      console.log({newValue, oldValue});
      let blank_pattern = /[\s]/g;
      if (isNaN(newValue) || blank_pattern.test(newValue) ) {
        mypageData.value.phoneNum = oldValue;
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

            mypageData.value.addressName = extraAddr;
          } else {
            mypageData.value.addressName = '';
          }

          mypageData.value.addressNum = data.zonecode;
          mypageData.value.address = addr;
          document.getElementById('detailAddress').focus();
        }
      }).open();
    }

    function deleteCart(e) {
      const nodes = [...e.target.parentElement.parentElement.parentElement.children];
      let cartIndex = nodes.indexOf(e.target.parentElement.parentElement) - 1;
      let cartId = mypageData.value.cart[cartIndex].cartId;
      axios.delete('/api/customer/mypage/deleteCart?nickName=' + nickName.value
      + '&cartId=' + cartId)
      .then(result=>{
        totalPrice.value -= mypageData.value.cart[cartIndex].totalPrice;
        console.log(result.data);
        mypageData.value.cart = result.data;
      })
      .catch(err=>{
        console.log(err);
      })
    }

    function clickFinal() {
      if(
        mypageData.value.name === '' ||
        mypageData.value.phoneNum === '' ||
        mypageData.value.addressNum === '' ||
        mypageData.value.address === '' ||
        mypageData.value.addressName === '' ||
        mypageData.value.detailAddress === ''
      ) alert('배송지 정보를 모두 입력해 주십시오.');
      else {
        let purchaseInfo = [];
        for(let i = 0; i < mypageData.value.cart.length; i++) {
          purchaseInfo.push(
            {
              nickName : mypageData.value.nickName,
              name : mypageData.value.name,
              phoneNum :mypageData.value.phoneNum,
              addressNum : mypageData.value.addressNum,
              address : mypageData.value.address,
              addressName : mypageData.value.addressName,
              detailAddress : mypageData.value.detailAddress,
              productName : mypageData.value.cart[i].productName,
              productId : mypageData.value.cart[i].productId,
              orderNum : mypageData.value.cart[i].productNum,
              optionText : mypageData.value.cart[i].productOption,
              totalPrice : mypageData.value.cart[i].totalPrice,
              cartId : mypageData.value.cart[i].cartId
            }
          )
        }
        console.log(purchaseInfo);
        axios.post('/api/product/cartPurchase', purchaseInfo)
        .then(result=>{
          console.log(result.data);
          router.push({name: 'PurchaseComplete'});
        })
        .catch(err=>{
          console.log(err);
        })
      }
    }

    function clickDeliNum() {
      window.open('https://www.ilogen.com/m/personal/trace/1234556712');
    }
    
  
    return {nickName, updateKey, purchaseList, cart, mypageData, filter, deliInfo, reviews, qna, point, info, clickPurchaseData, clickDeliInfo,
    clickCart, clickReviews, clickQna, clickPoint, clickInfo, totalPrice, deleteCart, clickPurchase, purchaseDetail, inputName, inputPhoneNum,
    inputAddress, clickFinal, clickBack, clickDeliNum};
  }
}
</script>

<style>
.mypage-option {
  font-size: 15px !important;
  padding: 5px !important;
}
</style>